import Data from "../Data";

export default class SubAreas extends Data {
    public _type: string;
    public nameId: string;
    public areaId: number;
    public ambientSounds: any[];
    public mapIds: number[];
    public bounds: any;
    public shape: number[];
    public customWorldMap: object[];
    public packId: number;
    public level: number;
    public isConquestVillage: boolean;
    public displayOnWorldMap: boolean;
    public monsters: number[];
    public entranceMapIds: object[];
    public exitMapIds: object[];
    public capturable: boolean;
}
