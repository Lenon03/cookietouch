import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import Type from "@/protocol/network/types/Type";

export default class GameContextActorInformations extends Type {
  public contextualId: number;
  public look: EntityLook;
  public disposition: EntityDispositionInformations;

  constructor(contextualId = 0, look: EntityLook = null, disposition: EntityDispositionInformations = null) {
    super();
    this.contextualId = contextualId;
    this.look = look;
    this.disposition = disposition;
  }
}
