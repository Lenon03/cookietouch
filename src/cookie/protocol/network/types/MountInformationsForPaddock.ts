export default class MountInformationsForPaddock {
  public modelId: number;
  public name: string;
  public ownerName: string;
  constructor(modelId = 0, name = "", ownerName = "") {

    this.modelId = modelId;
    this.name = name;
    this.ownerName = ownerName;

  }
}
