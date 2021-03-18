import Message from "@/protocol/network/messages/Message";
import ContentPart from "@/protocol/network/types/ContentPart";

export default class PartsListMessage extends Message {
  public parts: ContentPart[];

  constructor(parts: ContentPart[]) {
    super();
    this.parts = parts;

  }
}
