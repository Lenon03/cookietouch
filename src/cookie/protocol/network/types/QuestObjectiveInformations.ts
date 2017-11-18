export default class QuestObjectiveInformations {
  public dialogParams: string[];
  public objectiveId: number;
  public objectiveStatus: boolean;
  constructor(objectiveId = 0, objectiveStatus = false, dialogParams: string[] = null) {

    this.dialogParams = dialogParams;
    this.objectiveId = objectiveId;
    this.objectiveStatus = objectiveStatus;

  }
}
