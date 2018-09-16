import DataManager from "@/protocol/data";
import Npcs from "@/protocol/data/classes/Npcs";
import { DataTypes } from "@/protocol/data/DataTypes";
import GameRolePlayNpcInformations from "@/protocol/network/types/GameRolePlayNpcInformations";

export default class NpcEntry {
  public id: number;
  public npcId: number;
  public cellId: number;
  public data: Npcs;

  public static async setup(
    infos: GameRolePlayNpcInformations
  ): Promise<NpcEntry> {
    const npc = new NpcEntry();
    npc.id = infos.contextualId;
    npc.npcId = infos.npcId;
    npc.cellId = infos.disposition.cellId;
    const data = await DataManager.get<Npcs>(DataTypes.Npcs, npc.npcId);
    npc.data = data[0].object;
    return npc;
  }

  get name() {
    return this.data.nameId;
  }
}
