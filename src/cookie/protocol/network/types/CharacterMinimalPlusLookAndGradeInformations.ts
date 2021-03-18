import CharacterMinimalPlusLookInformations from "@/protocol/network/types/CharacterMinimalPlusLookInformations";
import EntityLook from "@/protocol/network/types/EntityLook";

export default class CharacterMinimalPlusLookAndGradeInformations extends CharacterMinimalPlusLookInformations {
  public grade: number;

  constructor(id = 0, level = 0, name = "", entitylook: EntityLook, grade = 0) {
    super(id, level, name, entitylook);
    this.grade = grade;
  }
}
