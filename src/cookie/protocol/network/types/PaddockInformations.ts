import Type from "./Type";

export default class PaddockInformations extends Type {
  public maxOutdoorMount: number;
  public maxItems: number;

  constructor(maxOutdoorMount = 0, maxItems = 0) {
    super();
    this.maxOutdoorMount = maxOutdoorMount;
    this.maxItems = maxItems;
  }
}
