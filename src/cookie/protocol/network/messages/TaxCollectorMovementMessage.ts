import TaxCollectorBasicInformations from "@protocol/network/types/TaxCollectorBasicInformations";
import Message from "./Message";
export default class TaxCollectorMovementMessage extends Message {
public hireOrFire: boolean;
public basicInfos: TaxCollectorBasicInformations;
public playerId: number;
public playerName: string;
constructor(hireOrFire = false, basicInfos: TaxCollectorBasicInformations, playerId = 0, playerName = "") {
super();
this.hireOrFire = hireOrFire;
this.basicInfos = basicInfos;
this.playerId = playerId;
this.playerName = playerName;

}
}
