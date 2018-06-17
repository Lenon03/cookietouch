import PaddockContentInformations from "@protocol/network/types/PaddockContentInformations";
import Message from "./Message";

export default class GuildPaddockBoughtMessage extends Message {
  public paddockInfo: PaddockContentInformations;

  constructor(paddockInfo: PaddockContentInformations) {
    super();
    this.paddockInfo = paddockInfo;

  }
}
