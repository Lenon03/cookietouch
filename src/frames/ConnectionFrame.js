import Dispatcher from '../utils/dispatcher'
import EventHub from '../utils/event'

export default class ConnectionFrame {
  constructor () {
    this.access = null
    this.sequenceNumber = 0

    this.Register()
  }

  Register () {
    Dispatcher.register('HelloConnectMessage', this.HandleHelloConnectMessage, this)
    Dispatcher.register('assetsVersionChecked', this.HandleassetsVersionChecked, this)
    Dispatcher.register('ServersListMessage', this.HandleServersListMessage, this)
    Dispatcher.register('IdentificationSuccessMessage', this.HandleIdentificationSuccessMessage, this)
    Dispatcher.register('SelectedServerDataMessage', this.HandleSelectedServerDataMessage, this)
    Dispatcher.register('serverDisconnecting', this.HandleserverDisconnecting, this)
    Dispatcher.register('HelloGameMessage', this.HandleHelloGameMessage, this)
    Dispatcher.register('AuthenticationTicketAcceptedMessage', this.HandleAuthenticationTicketAcceptedMessage, this)
    Dispatcher.register('AuthenticationTicketRefusedMessage', this.HandleAuthenticationTicketRefusedMessage, this)
    Dispatcher.register('CharactersListMessage', this.HandleCharactersListMessage, this)
    Dispatcher.register('CharacterSelectedSuccessMessage', this.HandleCharacterSelectedSuccessMessage, this)

    Dispatcher.register('SequenceNumberRequestMessage', this.HandleSequenceNumberRequestMessage, this)
    Dispatcher.register('ChatServerMessage', this.HandleChatServerMessage, this)
    Dispatcher.register('SystemMessageDisplayMessage', this.HandleSystemMessageDisplayMessage, this)
    Dispatcher.register('TextInformationMessage', this.HandleTextInformationMessage, this)
  }

  HandleTextInformationMessage(account, data) {
    EventHub.$emit('logs', {
      action: 'CHAT',
      data: '[MESSAGE] ' + data.text
    })
  }

  HandleSystemMessageDisplayMessage(account, data) {
    EventHub.$emit('logs', {
      action: 'CHAT',
      data: '[IMPORTANT] ' + data.text
    })
  }

  HandleChatServerMessage (account, data) {
    EventHub.$emit('logs', {
      action: 'CHAT',
      data: '[' + data.senderName + '] ' + data.content
    })
  }

  HandleSequenceNumberRequestMessage (account, data) {
    this.sequenceNumber++
    account.client.sendMessage('SequenceNumberMessage', {
      number: this.sequenceNumber
    })
  }

  HandleHelloConnectMessage (account, data) {
    account.key = data.key
    account.salt = data.salt

    EventHub.$emit('logs', {
      action: 'INFO',
      data: "Hey, t'es connecté!"
    })

    const regex = /[^/]+$/
    var m = regex.exec(account.haapi.config.assetsUrl)

    account.client.send('checkAssetsVersion', {
      staticDataVersion: '45b',
      assetsVersion: m[0]
    })
  }

  HandleassetsVersionChecked (account, data) {
    account.client.send('login', {
      username: account.username,
      token: account.haapi.token,
      salt: account.salt,
      key: account.key
    })
  }

  HandleServersListMessage (account, data) {
    account.client.sendMessage('ServerSelectionMessage', {
      serverId: data.servers[0].id
    })
  }

  HandleIdentificationSuccessMessage (account, data) {
    account.accountCreation = data.accountCreation
    account.accountId = data.accountId
    account.communityId = data.communityId
    account.hasRights = data.hasRights
    account.login = data.login
    account.nickname = data.nickname
    account.secretQuestion = data.secretQuestion
    account.subscriptionEndDate = data.subscriptionEndDate
    account.wasAlreadyConnected = data.wasAlreadyConnected
  }

  HandleserverDisconnecting (account, data) {
    switch (data.reason) {
      case "SERVER_GONE":
        account.client.migrate(this.access)
        break;
      case "CONNECTION_FAILED":
        break;
      default:
        //
    }
  }

  HandleSelectedServerDataMessage (account, data) {
    account.ticket = data.ticket
    this.access = data._access

    account.client.server = {
      address: data.address,
      port: data.port,
      id: data.serverId
    }
  }

  HandleHelloGameMessage (account, data) {
    account.client.sendMessage('AuthenticationTicketMessage', {
      lang: 'fr',
      ticket: account.ticket
    })
  }

  HandleAuthenticationTicketAcceptedMessage (account, data) {
    account.client.sendMessage('CharactersListRequestMessage', null)
  }

  HandleAuthenticationTicketRefusedMessage (account, data) {
    account.disconnect()
  }

  HandleCharactersListMessage (account, data) {
    account.client.sendMessage('CharacterSelectionMessage', {
      id: data.characters[0].id
    })
  }

  HandleCharacterSelectedSuccessMessage (account, data) {
    account.character.infos = data.infos

    account.client.sendMessage('kpiStartSession', {
      accountSessionId: account.login,
      isSubscriber: account.subscriptionEndDate !== 0
    })
    account.client.send('moneyGoultinesAmountRequest', null)
    account.client.sendMessage('QuestListRequestMessage', null)
    account.client.sendMessage('FriendsGetListMessage', null)
    account.client.sendMessage('IgnoredGetListMessage', null)
    account.client.sendMessage('SpouseGetInformationsMessage', null)
    account.client.send('bakSoftToHardCurrentRateRequest', null)
    account.client.send('bakHardToSoftCurrentRateRequest', null)
    account.client.send('restoreMysteryBox', null)
    account.client.sendMessage('ClientKeyMessage', { key: this.randomString(21) })
    account.client.sendMessage('GameContextCreateRequestMessage', null)
  }

  randomString (len, bits) {
    bits = bits || 36;
    var outStr = "", newStr;
    while (outStr.length < len)
    {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toUpperCase();
  }
}
