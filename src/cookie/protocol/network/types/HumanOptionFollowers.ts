import HumanOption from "@/protocol/network/types/HumanOption";
import IndexedEntityLook from "@/protocol/network/types/IndexedEntityLook";

export default class HumanOptionFollowers extends HumanOption {
  public followingCharactersLook: IndexedEntityLook[];

  constructor(followingCharactersLook: IndexedEntityLook[] = null) {
    super();
    this.followingCharactersLook = followingCharactersLook;

  }
}
