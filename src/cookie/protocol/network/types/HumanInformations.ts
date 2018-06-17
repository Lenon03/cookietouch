import ActorRestrictionsInformations from "./ActorRestrictionsInformations";
import HumanOption from "./HumanOption";
import Type from "./Type";

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
