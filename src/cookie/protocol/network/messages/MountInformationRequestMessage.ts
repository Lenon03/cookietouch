import Message from "@/protocol/network/messages/Message";

export default class MountInformationRequestMessage extends Message {
  public id: number;
  public time: number;

  constructor(id = 0, time = 0) {
    super();
    this.id = id;
    this.time = time;

  }
}
