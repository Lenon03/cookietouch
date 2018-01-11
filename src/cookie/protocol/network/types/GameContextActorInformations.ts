import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import Type from "./Type";

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
