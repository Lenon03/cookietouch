import Type from "./Type";

export default class ActorAlignmentInformations extends Type {
  public alignmentSide: number;
  public alignmentValue: number;
  public alignmentGrade: number;
  public characterPower: number;

  constructor(alignmentSide = 0, alignmentValue = 0, alignmentGrade = 0, characterPower = 0) {
    super();
    this.alignmentSide = alignmentSide;
    this.alignmentValue = alignmentValue;
    this.alignmentGrade = alignmentGrade;
    this.characterPower = characterPower;
  }
}
