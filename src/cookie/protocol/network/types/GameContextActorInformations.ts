import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";

export default class GameContextActorInformations {
    public contextualId: number;
    public look: EntityLook;
    public disposition: EntityDispositionInformations;

    constructor(contextualId = 0, look: EntityLook = null, disposition: EntityDispositionInformations = null) {
      this.contextualId = contextualId;
      this.look = look;
      this.disposition = disposition;
    }
}
