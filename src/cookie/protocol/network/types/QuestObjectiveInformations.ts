import Type from "./Type";

export default class QuestObjectiveInformations extends Type {
  public dialogParams: string[];
  public objectiveId: number;
  public objectiveStatus: boolean;
  constructor(objectiveId = 0, objectiveStatus = false, dialogParams: string[] = null) {
    super();
    this.dialogParams = dialogParams;
    this.objectiveId = objectiveId;
    this.objectiveStatus = objectiveStatus;
  }
}
