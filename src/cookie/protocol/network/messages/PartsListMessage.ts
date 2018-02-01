import ContentPart from "@protocol/network/types/ContentPart";
import Message from "./Message";

export default class PartsListMessage extends Message {
  public parts: ContentPart[];

  constructor(parts: ContentPart[]) {
    super();
    this.parts = parts;

  }
}
