import QuestActiveInformations from "@protocol/network/types/QuestActiveInformations";
import Message from "./Message";

export default class QuestListMessage extends Message {
  public finishedQuestsIds: number[];
  public finishedQuestsCounts: number[];
  public activeQuests: QuestActiveInformations[];

  constructor(finishedQuestsIds: number[], finishedQuestsCounts: number[], activeQuests: QuestActiveInformations[]) {
    super();
    this.finishedQuestsIds = finishedQuestsIds;
    this.finishedQuestsCounts = finishedQuestsCounts;
    this.activeQuests = activeQuests;

  }
}
