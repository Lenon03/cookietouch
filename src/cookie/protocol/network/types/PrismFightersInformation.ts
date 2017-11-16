import CharacterMinimalPlusLookInformations from "./CharacterMinimalPlusLookInformations";
import ProtectedEntityWaitingForHelpInfo from "./ProtectedEntityWaitingForHelpInfo";

export default class PrismFightersInformation {

  public allycharactersinformations: CharacterMinimalPlusLookInformations[];
  public enemycharactersinformations: CharacterMinimalPlusLookInformations[];
  public subareaid: number;
  public waitingforhelpinfo: ProtectedEntityWaitingForHelpInfo;

  constructor(subareaid = 0, waitingforhelpinfo: ProtectedEntityWaitingForHelpInfo,
              allycharactersinformations: CharacterMinimalPlusLookInformations[],
              enemycharactersinformations: CharacterMinimalPlusLookInformations[]) {
    this.allycharactersinformations = allycharactersinformations;
    this.enemycharactersinformations = enemycharactersinformations;
    this.subareaid = subareaid;
    this.waitingforhelpinfo = waitingforhelpinfo;
  }
}
