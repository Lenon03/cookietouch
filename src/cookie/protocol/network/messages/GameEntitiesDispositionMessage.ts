import IdentifiedEntityDispositionInformations from "@protocol/network/types/IdentifiedEntityDispositionInformations";
import Message from "./Message";
export default class GameEntitiesDispositionMessage extends Message {
public dispositions: IdentifiedEntityDispositionInformations[];
constructor(dispositions: IdentifiedEntityDispositionInformations[]) {
super();
this.dispositions = dispositions;

}
}
