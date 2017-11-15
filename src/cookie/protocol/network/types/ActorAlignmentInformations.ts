export default class ActorAlignmentInformations {
  public alignmentSide: number;
  public alignmentValue: number;
  public alignmentGrade: number;
  public characterPower: number;

  constructor(alignmentSide = 0, alignmentValue = 0, alignmentGrade = 0, characterPower = 0) {
    this.alignmentSide = alignmentSide;
    this.alignmentValue = alignmentValue;
    this.alignmentGrade = alignmentGrade;
    this.characterPower = characterPower;
  }
}
