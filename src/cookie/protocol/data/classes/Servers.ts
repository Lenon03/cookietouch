import Data from "../Data";

export default class Servers extends Data {
    public nameId: string;
    public commentId: string;
    public openingDate: number;
    public language: string;
    public populationId: number;
    public gameTypeId: number;
    public communityId: number;
    public restrictedToLanguages: object[];
}
