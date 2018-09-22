import Type from "@/protocol/network/types/Type";

export default class QuestActiveInformations extends Type {
  public questId: number;

  constructor(questId = 0) {
    super();
    this.questId = questId;
  }
}
