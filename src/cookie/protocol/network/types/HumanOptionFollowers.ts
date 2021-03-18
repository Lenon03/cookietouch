import HumanOption from "@/protocol/network/types/HumanOption";
import IndexedEntityLook from "@/protocol/network/types/IndexedEntityLook";

export default class HumanOptionFollowers extends HumanOption {
  public followingCharactersLook: IndexedEntityLook[];

  constructor(followingCharactersLook: IndexedEntityLook[] = []) {
    super();
    this.followingCharactersLook = followingCharactersLook;
  }
}
