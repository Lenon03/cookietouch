import CharacterMinimalPlusLookInformations from "@/protocol/network/types/CharacterMinimalPlusLookInformations";
import Type from "@/protocol/network/types/Type";

export default class TaxCollectorFightersInformation extends Type {
  public allyCharactersInformations: CharacterMinimalPlusLookInformations[];
  public enemyCharactersInformations: CharacterMinimalPlusLookInformations[];
  public collectorId: number;

  constructor(
    collectorId = 0,
    allyCharactersInformations: CharacterMinimalPlusLookInformations[] = [],
    enemyCharactersInformations: CharacterMinimalPlusLookInformations[] = []
  ) {
    super();
    this.allyCharactersInformations = allyCharactersInformations;
    this.enemyCharactersInformations = enemyCharactersInformations;
    this.collectorId = collectorId;
  }
}
