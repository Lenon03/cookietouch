interface IBarJSON {
  time: string;
}

class Bar {
  public static fromJSON(json: IBarJSON): Bar {
    const bar = Object.create(Bar.prototype);
    return Object.assign(bar, {
      time: Date.parse(json.time),
    });
  }

  private time: Date;

  public getTime(): Date {
    return this.time;
  }

  public toJSON(): IBarJSON {
    return Object.assign({}, this, {
      time: this.time.toJSON(),
    });
  }
}

interface IFooJSON {
  bars: IBarJSON[];
}

class Foo {
  public static fromJSON(json: IFooJSON): Foo {
    const foo = Object.create(Foo.prototype);
    return Object.assign(foo, {
      bars: json.bars.map(Bar.fromJSON),
    });
  }

  private bars: Bar[];

  public getBar(index: number): Bar {
    return this.bars[index];
  }

  public toJSON(): IFooJSON {
    return Object.assign({}, this, {
      bars: this.bars.map((bar) => bar.toJSON()),
    });
  }
}
