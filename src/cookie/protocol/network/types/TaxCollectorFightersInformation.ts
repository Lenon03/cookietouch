import CharacterMinimalPlusLookInformations from "./CharacterMinimalPlusLookInformations";
export default class TaxCollectorFightersInformation {
  public allyCharactersInformations: CharacterMinimalPlusLookInformations[];
  public enemyCharactersInformations: CharacterMinimalPlusLookInformations[];
  public collectorId: number;
  constructor(collectorId = 0, allyCharactersInformations: CharacterMinimalPlusLookInformations[] = null,
              enemyCharactersInformations: CharacterMinimalPlusLookInformations[] = null) {

    this.allyCharactersInformations = allyCharactersInformations;
    this.enemyCharactersInformations = enemyCharactersInformations;
    this.collectorId = collectorId;

  }
}
