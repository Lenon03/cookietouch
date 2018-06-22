import Message from "@/protocol/network/messages/Message";
import ActorRestrictionsInformations from "@/protocol/network/types/ActorRestrictionsInformations";

export default class SetCharacterRestrictionsMessage extends Message {
  public restrictions: ActorRestrictionsInformations;

  constructor(restrictions: ActorRestrictionsInformations) {
    super();
    this.restrictions = restrictions;

  }
}
