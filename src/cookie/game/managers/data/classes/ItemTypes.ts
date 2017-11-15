import Data from "../Data";

export default class ItemTypes extends Data {
    public nameId: string;
    public superTypeId: number;
    public plural: boolean;
    public gender: number;
    public rawZone: string;
    public needUseConfirm: boolean;
}
