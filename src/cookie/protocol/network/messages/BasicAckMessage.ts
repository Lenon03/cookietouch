import Message from "@/protocol/network/messages/Message";

export default class BasicAckMessage extends Message {
  public seq: number;
  public lastPacketId: number;

  constructor(seq = 0, lastPacketId = 0) {
    super();
    this.seq = seq;
    this.lastPacketId = lastPacketId;

  }
}
