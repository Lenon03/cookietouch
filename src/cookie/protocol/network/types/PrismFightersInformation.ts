import CharacterMinimalPlusLookInformations from "@/protocol/network/types/CharacterMinimalPlusLookInformations";
import ProtectedEntityWaitingForHelpInfo from "@/protocol/network/types/ProtectedEntityWaitingForHelpInfo";
import Type from "@/protocol/network/types/Type";

export default class PrismFightersInformation extends Type {

  public allyCharactersInformations: CharacterMinimalPlusLookInformations[];
  public enemyCharactersInformations: CharacterMinimalPlusLookInformations[];
  public subAreaId: number;
  public waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo;

  constructor(subAreaId = 0, waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo,
              allyCharactersInformations: CharacterMinimalPlusLookInformations[],
              enemyCharactersInformations: CharacterMinimalPlusLookInformations[]) {
    super();
    this.allyCharactersInformations = allyCharactersInformations;
    this.enemyCharactersInformations = enemyCharactersInformations;
    this.subAreaId = subAreaId;
    this.waitingForHelpInfo = waitingForHelpInfo;
  }
}
