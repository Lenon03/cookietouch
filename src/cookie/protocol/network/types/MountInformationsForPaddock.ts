import Type from "./Type";

export default class MountInformationsForPaddock extends Type {
  public modelId: number;
  public name: string;
  public ownerName: string;
  constructor(modelId = 0, name = "", ownerName = "") {
    super();
    this.modelId = modelId;
    this.name = name;
    this.ownerName = ownerName;
  }
}
