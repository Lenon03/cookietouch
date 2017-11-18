import Message from "./Message";
export default class DownloadSetSpeedRequestMessage extends Message {
public downloadSpeed: number;
constructor(downloadSpeed = 0) {
super();
this.downloadSpeed = downloadSpeed;

}
}
