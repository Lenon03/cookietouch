import DataManager from "@/protocol/data";
import Npcs from "@/protocol/data/classes/Npcs";
import { DataTypes } from "@/protocol/data/DataTypes";
import GameRolePlayNpcInformations from "@/protocol/network/types/GameRolePlayNpcInformations";

export default class NpcEntry {
  public static async setup(
    infos: GameRolePlayNpcInformations
  ): Promise<NpcEntry> {
    const data = await DataManager.get<Npcs>(DataTypes.Npcs, infos.npcId);
    return new NpcEntry(
      infos.contextualId,
      infos.npcId,
      infos.disposition.cellId,
      data[0].object
    );
  }

  constructor(
    public id: number,
    public npcId: number,
    public cellId: number,
    public data: Npcs
  ) {}

  get name() {
    return this.data.nameId;
  }
}
