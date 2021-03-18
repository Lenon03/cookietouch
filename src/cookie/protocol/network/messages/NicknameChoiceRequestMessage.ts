import Message from "@/protocol/network/messages/Message";

export default class NicknameChoiceRequestMessage extends Message {
  public nickname: string;

  constructor(nickname = "") {
    super();
    this.nickname = nickname;

  }
}
