import Message from "@/protocol/network/messages/Message";
import CharacterMinimalPlusLookAndGradeInformations from "@/protocol/network/types/CharacterMinimalPlusLookAndGradeInformations";

export default class PrismFightDefendersStateMessage extends Message {
  public mainFighters: CharacterMinimalPlusLookAndGradeInformations[];
  public reserveFighters: CharacterMinimalPlusLookAndGradeInformations[];
  public fightId: number;

  constructor(fightId = 0, mainFighters: CharacterMinimalPlusLookAndGradeInformations[],
              reserveFighters: CharacterMinimalPlusLookAndGradeInformations[]) {
    super();
    this.mainFighters = mainFighters;
    this.reserveFighters = reserveFighters;
    this.fightId = fightId;

  }
}
