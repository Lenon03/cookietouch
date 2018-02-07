export const RGB_COLOR_REGEX = /\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d*.\d*))?\)/;

export default class Color {
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(colorStr?: string)
  constructor(r?: string | number, g?: number, b?: number)
  constructor(r?: string | number, g?: number, b?: number, a?: number) {
    if (typeof r === "string") {
      r = r.trim();
      if (r.indexOf("#") === 0) {
        r = r.substr(r.indexOf("#") + 1);
        this.r = parseInt(r.substr(0, 2), 16);
        this.g = parseInt(r.substr(2, 2), 16);
        this.b = parseInt(r.substr(4, 2), 16);
      } else if (r.indexOf("rgb") === 0) {
        const res = RGB_COLOR_REGEX.exec(r);
        this.r = parseInt(res[1], 10);
        this.g = parseInt(res[2], 10);
        this.b = parseInt(res[3], 10);
        this.a = res[5] ? parseFloat(res[5]) : 1;
        if (this.a > 1) {
          this.a /= 255;
        }
      }
    } else {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a || 1;
    }
  }

  public toHex() {
    let r = this.r.toString(16);
    if (r.length === 1) {
      r = r.padStart(2, "0");
    }
    let g = this.g.toString(16);
    if (g.length === 1) {
      g = g.padStart(2, "0");
    }
    let b = this.b.toString(16);
    if (b.length === 1) {
      b = b.padStart(2, "0");
    }
    return "#" + r + g + b;
  }

  public toRgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  public toRgba() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}
