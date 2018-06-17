import Message from "./Message";

export default class BasicLatencyStatsMessage extends Message {
  public latency: number;
  public sampleCount: number;
  public max: number;

  constructor(latency = 0, sampleCount = 0, max = 0) {
    super();
    this.latency = latency;
    this.sampleCount = sampleCount;
    this.max = max;

  }
}
