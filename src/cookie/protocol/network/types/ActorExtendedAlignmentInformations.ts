import ActorAlignmentInformations from "./ActorAlignmentInformations";

export default class ActorExtendedAlignmentInformations extends ActorAlignmentInformations {

  public honor: number;
  public honorGradeFloor: number;
  public honornextGradeFloor: number;
  public aggressable: number;

  constructor(alignmentSide = 0, alignmentValue = 0, alignmentGrade = 0, characterPower = 0,
              honor = 0, honorGradeFloor = 0, honornextGradeFloor = 0, aggressable = 0) {
    super(alignmentSide, alignmentValue, alignmentGrade, characterPower);
    this.honor = honor;
    this.honorGradeFloor = honorGradeFloor;
    this.honornextGradeFloor = honornextGradeFloor;
    this.aggressable = aggressable;
  }
}
