import Type from "./Type";

export default class KrosmasterFigure extends Type {
  public uid: string;
  public figure: number;
  public pedestal: number;
  public bound: boolean;
  constructor(uid = "", figure = 0, pedestal = 0, bound = false) {
    super();
    this.uid = uid;
    this.figure = figure;
    this.pedestal = pedestal;
    this.bound = bound;
  }
}
