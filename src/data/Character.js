import Dispatcher from '../utils/dispatcher'
import Map from './Map'
import { CharacterState } from './Enums'

export default class Character {
  constructor () {
    this.state = CharacterState.IDLE
    this.map = new Map
    this.infos = null
    this.restrictions = null
    this.stats = null
    this.cellId = null

    this.Register()
  }

  Register () {
    Dispatcher.register('SetCharacterRestrictionsMessage', this.HandleSetCharacterRestrictionsMessage, this)
    Dispatcher.register('CharacterStatsListMessage', this.HandleCharacterStatsListMessage, this)
  }

  HandleSetCharacterRestrictionsMessage (account, data) {
    account.character.restrictions = data.restrictions
  }

  HandleCharacterStatsListMessage (account, data) {
    account.character.stats = data.stats
  }
}
