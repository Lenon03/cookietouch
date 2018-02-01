import HumanOption from "./HumanOption";
import IndexedEntityLook from "./IndexedEntityLook";

export default class HumanOptionFollowers extends HumanOption {
  public followingCharactersLook: IndexedEntityLook[];

  constructor(followingCharactersLook: IndexedEntityLook[] = null) {
    super();
    this.followingCharactersLook = followingCharactersLook;

  }
}
