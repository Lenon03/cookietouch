import GameRolePlayNpcQuestFlag from "@protocol/network/types/GameRolePlayNpcQuestFlag";
import Message from "./Message";

export default class MapNpcsQuestStatusUpdateMessage extends Message {
  public npcsIdsWithQuest: number[];
  public questFlags: GameRolePlayNpcQuestFlag[];
  public npcsIdsWithoutQuest: number[];
  public mapId: number;

  constructor(mapId = 0, npcsIdsWithQuest: number[], questFlags: GameRolePlayNpcQuestFlag[], npcsIdsWithoutQuest: number[]) {
    super();
    this.npcsIdsWithQuest = npcsIdsWithQuest;
    this.questFlags = questFlags;
    this.npcsIdsWithoutQuest = npcsIdsWithoutQuest;
    this.mapId = mapId;

  }
}
