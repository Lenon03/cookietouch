import Dispatcher from '../utils/dispatcher'
import { CharacterState } from './Enums'

export default class Map {
  constructor () {
    this.actors = null
    this.fights = null
    this.houses = null
    this.interactiveElements = null
    this.mapId = null
    this.statedElements = null
    this.obstacles = null
    this.subAreaId = null

    this.Register()
    this.Events()
  }

  Events () {
    Dispatcher.register('GameMapMovementConfirmMessage', (account, data) => {
      account.character.state = CharacterState.IDLE

      console.log('CHARACTER STATE (confirm): ', account.character.state)
    }, this)
  }

  Register () {
    Dispatcher.register('MapComplementaryInformationsDataMessage', this.HandleMapComplementaryInformationsDataMessage, this)
    Dispatcher.register('CurrentMapMessage', this.HandleCurrentMapMessage, this)
    Dispatcher.register('GameMapMovementMessage', this.HandleGameMapMovementMessage, this)
  }

  HandleGameMapMovementMessage (account, data) {
    if (data.actorId === account.character.infos.id) {
      var last = data.keyMovements[data.keyMovements.length - 1]
      account.character.cellId = last
      account.character.state = CharacterState.MOVING

      console.log('CHARACTER STATE (moving): ', account.character.state)
    }
  }

  HandleCurrentMapMessage (account, data) {
    account.client.sendMessage('MapInformationsRequestMessage', {
      mapId: data.mapId
    })

    account.movementsManager.updateMap(data.mapId)
  }

  HandleMapComplementaryInformationsDataMessage (account, data) {
    account.character.map.actors = data.actors
    account.character.map.fights = data.fights
    account.character.map.houses = data.houses
    account.character.map.interactiveElements = data.interactiveElements
    account.character.map.mapId = data.mapId
    account.character.map.statedElements = data.statedElements
    account.character.map.obstacles = data.obstacles
    account.character.map.subAreaId = data.subAreaId

    account.character.cellId = data.actors[0].disposition.cellId

    account.movementsManager.moveToCellId(450)
  }
}
