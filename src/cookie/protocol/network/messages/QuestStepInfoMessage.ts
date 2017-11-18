import QuestActiveInformations from "@protocol/network/types/QuestActiveInformations";
import Message from "./Message";
export default class QuestStepInfoMessage extends Message {
public infos: QuestActiveInformations;
constructor(infos: QuestActiveInformations) {
super();
this.infos = infos;

}
}
