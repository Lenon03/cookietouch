import ObjectEffect from "@/protocol/network/types/ObjectEffect";
import Message from "@/protocol/network/messages/Message";

export default class SetUpdateMessage extends Message {
  public setObjects: number[];
  public setEffects: ObjectEffect[];
  public setId: number;

  constructor(setId = 0, setObjects: number[], setEffects: ObjectEffect[]) {
    super();
    this.setObjects = setObjects;
    this.setEffects = setEffects;
    this.setId = setId;

  }
}
