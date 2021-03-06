export default class HouseInformations {
    public doorsOnMap: any[];
    public houseId: number;
    public isOnSale: boolean;
    public isSaleLocked: boolean;
    public modelId: number;
    public ownerName: string;
    // public specialArtworkId: number;
    constructor(houseid = 0, ownername = "", isOnSale = false, isSaleLocked = false,
                modelId = 0, doorsOnMap: any[] = null) {
        this.doorsOnMap = doorsOnMap;
        this.houseId = houseid;
        this.isOnSale = isOnSale;
        this.isSaleLocked = isSaleLocked;
        this.modelId = modelId;
    }
}
