import Message from "./Message";
export default class PauseDialogMessage extends Message {
public dialogType: number;
constructor(dialogType = 0) {
super();
this.dialogType = dialogType;

}
}
