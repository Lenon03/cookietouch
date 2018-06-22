import ActorRestrictionsInformations from "@/protocol/network/types/ActorRestrictionsInformations";
import HumanOption from "@/protocol/network/types/HumanOption";
import Type from "@/protocol/network/types/Type";

export default class HumanInformations extends Type {
  public options: HumanOption[];
  public restrictions: ActorRestrictionsInformations;
  public sex: boolean;

  constructor(restrictions: ActorRestrictionsInformations = null, sex = false, options: HumanOption[] = null) {
    super();
    this.restrictions = restrictions;
    this.sex = sex;
    this.options = options;
  }
}
