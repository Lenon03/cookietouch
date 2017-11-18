import PresetItem from "./PresetItem";
export default class Preset {
  public objects: PresetItem[];
  public presetId: number;
  public symbolId: number;
  public mount: boolean;
  constructor(presetId = 0, symbolId = 0, mount = false, objects: PresetItem[] = null) {

    this.objects = objects;
    this.presetId = presetId;
    this.symbolId = symbolId;
    this.mount = mount;

  }
}
