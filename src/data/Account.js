import DofusTouchClient from '../dofus/DofusTouchClient'
import HaapiConnection from '../dofus/HaapiConnection'
import Character from './Character'
import ConnectionFrame from '../frames/ConnectionFrame'
import MovementsManager from '../utils/MovementsManager'

export default class Account {
  constructor (username, password) {
    this.movementsManager = new MovementsManager(this)
    this.character = new Character
    this.username = username
    this.password = password
    this.client = new DofusTouchClient(this)
    this.haapi = new HaapiConnection

    this.salt = null
    this.key = null

    this.ticket = null

    this.accountCreation = null
    this.accountId = null
    this.communityId = null
    this.hasRights = null
    this.login = null
    this.nickname = null
    this.secretQuestion = null
    this.subscriptionEndDate = null
    this.wasAlreadyConnected = null

    this.server = null

    this.Frames()
  }

  Frames () {
    this.connectionFrame = new ConnectionFrame()
  }

  connect () {
    this.haapi.processHaapi(this.username, this.password)
      .then(() => {
        console.log('Haapi : ', this.haapi)
        this.client.connect(this.haapi.config.sessionId, this.haapi.config.dataUrl)
      })
  }

  disconnect () {
    this.client.close()
  }
}
