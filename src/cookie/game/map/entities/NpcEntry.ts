import { DataTypes } from "@/protocol/data/DataTypes";
import DataManager from "@protocol/data";
import Npcs from "@protocol/data/classes/Npcs";
import GameRolePlayNpcInformations from "@protocol/network/types/GameRolePlayNpcInformations";

export default class NpcEntry {
  public id: number;
  public npcId: number;
  public cellId: number;
  public data: Npcs;

  get name() {
    return this.data.nameId;
  }

  constructor(infos: GameRolePlayNpcInformations) {
    this.id = infos.contextualId;
    this.npcId = infos.npcId;
    this.cellId = infos.disposition.cellId;
    DataManager.get<Npcs>(DataTypes.Npcs, this.npcId).then((data) => {
      this.data = data[0].object;
    });
  }
}
