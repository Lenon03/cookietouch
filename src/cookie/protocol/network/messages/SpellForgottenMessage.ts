import Message from "@/protocol/network/messages/Message";

export default class SpellForgottenMessage extends Message {
  public spellsId: number[];
  public boostPoint: number;

  constructor(boostPoint = 0, spellsId: number[]) {
    super();
    this.spellsId = spellsId;
    this.boostPoint = boostPoint;

  }
}
