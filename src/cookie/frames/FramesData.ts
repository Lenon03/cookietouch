import IClearable from "@/utils/IClearable";

export default class FramesData implements IClearable {
  public sequence: number = 0;
  public captchasCounter: number = 0;
  public key: number[] | null = null;
  public salt: string | null = null;
  public ticket: string | null = null;
  public initialized: boolean = false;
  public serverToAutoConnectTo: number = 0;

  constructor() {
    this.clear();
  }

  public clear() {
    this.sequence = 0;
    this.captchasCounter = 0;
    this.key = null;
    this.salt = null;
    this.ticket = null;
    this.initialized = false;
    this.serverToAutoConnectTo = 0;
  }
}
