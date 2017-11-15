import ActorRestrictionsInformations from "./ActorRestrictionsInformations";
import HumanOption from "./HumanOption";

export default class HumanInformations {
  public options: HumanOption[];
  public restrictions: ActorRestrictionsInformations;
  public sex: boolean;

  constructor(restrictions: ActorRestrictionsInformations = null, sex = false, options: HumanOption[] = null) {
    this.restrictions = restrictions;
    this.sex = sex;
    this.options = options;
  }
}
