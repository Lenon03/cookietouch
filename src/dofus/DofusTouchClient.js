import { Primus } from '../../static/primus'
import Dispatcher from '../utils/dispatcher'
import EventHub from '../utils/event'
import axios from 'axios'

export default class DofusTouchClient {
  constructor (account) {
    this.account = account
    this.socket = null
    this.sessionId = null
    this.migrating = false

    this.appVersion = null
    DofusTouchClient.getAppVersion().then(version => (this.appVersion = version))
    this.buildVersion = null
    DofusTouchClient.getBuildVersion().then(version => (this.buildVersion = version))

    this.server = null
  }

  static getAppVersion () {
    return new Promise((resolve, reject) => {
      axios.get('https://itunes.apple.com/lookup?id=1041406978').then(response => {
        resolve(response.data.results[0].version)
      })
    })
  }

  static getBuildVersion () {
    return new Promise((resolve, reject) => {
      axios.get('https://proxyconnection.touch.dofus.com/build/script.js').then(response => {
        const regex = /.*buildVersion=("|')([0-9]*\.[0-9]*\.[0-9]*)("|')/g
        const m = regex.exec(response.data.substring(1, 10000))
        resolve(m[2])
      })
    })
  }

  connect (sessionId, url) {
    this.sessionId = sessionId
    var currentUrl = this.makeSticky(url, this.sessionId)
    console.log('Connecting to login server (' + currentUrl + ') ...')

    this.socket = new Primus(currentUrl, {
      transformer: 'engine.io',
      strategy: 'disconnect,timeout',
      reconnect: {
        max: Infinity,
        min: 500,
        retries: 10
      },
      manual: true
    })

    this.setCurrentConnection()
    this.socket.open()
  }

  close () {
    this.socket.destroy()
  }

  migrate (url) {
    this.migrating = true
    this.send('disconnecting', 'SWITCHING_TO_GAME')
    this.socket.destroy()

    EventHub.$emit('logs', {
      action: 'WARNING',
      data: 'Switching to game.'
    })

    var currentUrl = this.makeSticky(url, this.sessionId)
    console.log('Connecting to game server (' + currentUrl + ') ...')
    this.socket = new Primus(currentUrl, {
      transformer: 'engine.io',
      strategy: 'disconnect,timeout',
      reconnect: {
        max: Infinity,
        min: 500,
        retries: 10
      },
      manual: true
    })

    this.setCurrentConnection()
    this.socket.open()
  }

  send (callName, data) {
    var msg = { call: callName, data: data }
    console.log('Message Sent: ', msg)
    var test = msg.call === 'sendMessage' ? msg.data.type : msg.call
    EventHub.$emit('logs', {
      action: 'SND',
      data: test
    })
    Dispatcher.emit(test, this.account, data)
    this.socket.write(msg)
  }

  sendMessage (messageName, data) {
    this.send('sendMessage', { type: messageName, data: data })
  }

  setCurrentConnection () {
    this.socket.on('open', () => {
      console.log('Connection opened')

      console.log("MIGRATING: ", this.migrating);

      if (this.migrating === false) {
        this.send('connecting', {
          language: 'fr',
          server: 'login',
          client: 'android',
          appVersion: this.appVersion,
          buildVersion: this.buildVersion
        })
      } else {
        this.migrating = false
        this.send('connecting', {
          language: 'fr',
          server: this.server,
          client: 'android',
          appVersion: this.appVersion,
          buildVersion: this.buildVersion
        })
      }
    })

    this.socket.on('data', (data) => {
      console.log('Data Received: ', data)
      EventHub.$emit('logs', {
        action: 'RCV',
        data: data._messageType
      })
      Dispatcher.emit(data._messageType, this.account, data)
    })

    this.socket.on('error', function error (err) {
      console.error('Something horrible has happened', err.stack)
    })

    this.socket.on('reconnect', function (opts) {
      console.log('Reconnection attempt started')
    })

    this.socket.on('reconnect scheduled', function (opts) {
      console.log('Reconnecting in %d ms', opts.scheduled)
      console.log('This is attempt %d out of %d', opts.attempt, opts.retries)
    })

    this.socket.on('reconnected', function (opts) {
      console.log('It took %d ms to reconnect', opts.duration)
    })

    this.socket.on('reconnect timeout', function (err, opts) {
      console.log('Timeout expired: %s', err.message)
    })

    this.socket.on('reconnect failed', function (err, opts) {
      console.log('The reconnection failed: %s', err.message)
    })

    this.socket.on('timeout', function () {
      console.log('Connection timeout')
    })

    this.socket.on('online', function () {
      console.log('Connection goes online')
    })

    this.socket.on('readyStateChange', function (state) {
      console.log('Connection readyStateChange: ', state)
    })

    this.socket.on('offline', function () {
      console.log('Connection goes offline')
    })

    this.socket.on('end', function () {
      console.log('Connection ended')
    })

    this.socket.on('close', function () {
      console.log('Connection closed')

      EventHub.$emit('logs', {
        action: 'WARNING',
        data: 'Déconnecté.'
      })
    })

    this.socket.on('destroy', function () {
      console.log('Connection destroyed')
    })
  }

  makeSticky (url, sessionId) {
    var seperator = url.indexOf('?') === -1 ? '?' : '&'
    return url + seperator + 'STICKER' + '=' + encodeURIComponent(sessionId)
  }
}
