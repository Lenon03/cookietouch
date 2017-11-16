import CharacterMinimalPlusLookInformations from "./CharacterMinimalPlusLookInformations";
import ProtectedEntityWaitingForHelpInfo from "./ProtectedEntityWaitingForHelpInfo";

export default class PrismFightersInformation {

  public allyCharactersInformations: CharacterMinimalPlusLookInformations[];
  public enemyCharactersInformations: CharacterMinimalPlusLookInformations[];
  public subAreaId: number;
  public waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo;

  constructor(subAreaId = 0, waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo,
              allyCharactersInformations: CharacterMinimalPlusLookInformations[],
              enemyCharactersInformations: CharacterMinimalPlusLookInformations[]) {
    this.allyCharactersInformations = allyCharactersInformations;
    this.enemyCharactersInformations = enemyCharactersInformations;
    this.subAreaId = subAreaId;
    this.waitingForHelpInfo = waitingForHelpInfo;
  }
}
