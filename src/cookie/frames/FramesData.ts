import IClearable from "@utils/IClearable";

export default class FramesData implements IClearable {
  public sequence: number;
  public captchasCounter: number;
  public key: number[];
  public salt: string;
  public ticket: string;
  public initialized: boolean;

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
  }
}
