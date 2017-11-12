import Dispatcher from './dispatcher'
import EventHub from './event'
import axios from 'axios'
import PathFinder from './PathFinder'

export default class MovementsManager {

    constructor (account) {
        this.account = account
        this.jsonMap = null
        this.pathGrid = null
    }

    updateMap(mapId) {
        return new Promise((resolve, reject) => {
            axios.get(this.account.haapi.config.assetsUrl + '/maps/' + mapId + '.json')

            .then(response => this.jsonMap = response.data)
            .then(() => this.pathGrid = PathFinder.fillPathGrid(this.jsonMap))
            .then(() => resolve())
        })
    }

    moveToCellId (cellId) {
        if (this.account.character.cellID === cellId) return

        var path = PathFinder.getPath(this.account.character.cellId, cellId)
        PathFinder.logPath(path)

        this.account.client.sendMessage('GameMapMovementRequestMessage', {
            mapId: this.account.character.map.mapId,
            keyMovements: PathFinder.compressPath(path)
        })

        this.confirmMove(path)
    }

    confirmMove(path) {
        setTimeout(() => {
            this.account.client.sendMessage('GameMapMovementConfirmMessage', null)
        }, 250 * path.length)
    }
}
