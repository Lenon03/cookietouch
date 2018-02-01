import CharacterMinimalPlusLookInformations from "./CharacterMinimalPlusLookInformations";
import Type from "./Type";

export default class TaxCollectorFightersInformation extends Type {
  public allyCharactersInformations: CharacterMinimalPlusLookInformations[];
  public enemyCharactersInformations: CharacterMinimalPlusLookInformations[];
  public collectorId: number;

  constructor(collectorId = 0, allyCharactersInformations: CharacterMinimalPlusLookInformations[] = null,
              enemyCharactersInformations: CharacterMinimalPlusLookInformations[] = null) {
    super();
    this.allyCharactersInformations = allyCharactersInformations;
    this.enemyCharactersInformations = enemyCharactersInformations;
    this.collectorId = collectorId;
  }
}
