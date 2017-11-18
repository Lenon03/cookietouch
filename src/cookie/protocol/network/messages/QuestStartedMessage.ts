import Message from "./Message";
export default class QuestStartedMessage extends Message {
public questId: number;
constructor(questId = 0) {
super();
this.questId = questId;

}
}
