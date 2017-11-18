import CharacterCharacteristicsInformations from "@protocol/network/types/CharacterCharacteristicsInformations";
import SpellItem from "@protocol/network/types/SpellItem";
import Message from "./Message";
export default class SlaveSwitchContextMessage extends Message {
public slaveSpells: SpellItem[];
public summonerId: number;
public slaveId: number;
public slaveStats: CharacterCharacteristicsInformations;
constructor(summonerId = 0, slaveId = 0, slaveStats: CharacterCharacteristicsInformations, slaveSpells: SpellItem[]) {
super();
this.slaveSpells = slaveSpells;
this.summonerId = summonerId;
this.slaveId = slaveId;
this.slaveStats = slaveStats;

}
}
