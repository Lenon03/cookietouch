import DTConstants from "@/protocol/DTConstants";
import Color from "@/utils/Color";
import Point from "@/utils/Point";

export default class MapViewerCell {
  public points: Point[];

  constructor(points: Point[]) {
    this.points = points;
  }

  get mid(): Point {
    const p = new Point(0, 0);
    p.x = this.points[0].x;
    p.y = this.points[1].y;
    return p;
  }

  public Draw(drawingContext: CanvasRenderingContext2D, brush: Color) {
    this.DrawPolygonOrPolyline(drawingContext, this.points, brush);
  }

  public DrawObstacle(drawingContext: CanvasRenderingContext2D, brush: Color) {
    const newPoints = [];

    newPoints[0] = new Point(this.points[3].x, this.points[3].y - 10);
    newPoints[1] = new Point(this.points[0].x, this.points[0].y - 10);
    newPoints[2] = new Point(this.points[1].x, this.points[1].y - 10);
    newPoints[3] = new Point(this.points[2].x, this.points[2].y - 10);
    newPoints[4] = new Point(this.points[3].x, this.points[3].y - 10);

    newPoints[5] = new Point(this.points[3].x, this.points[3].y - 10);
    newPoints[6] = new Point(this.points[2].x, this.points[2].y - 10);
    newPoints[7] = this.points[2];
    newPoints[8] = this.points[3];
    newPoints[9] = new Point(this.points[3].x, this.points[3].y - 10);

    newPoints[10] = new Point(this.points[2].x, this.points[2].y - 10);
    newPoints[11] = new Point(this.points[1].x, this.points[1].y - 10);
    newPoints[12] = this.points[1];
    newPoints[13] = this.points[2];
    newPoints[14] = new Point(this.points[2].x, this.points[2].y - 10);

    this.DrawPolygonOrPolyline(
      drawingContext,
      newPoints,
      brush,
      new Color(100, 100, 100)
    );
  }

  public DrawPie(drawingContext: CanvasRenderingContext2D, brush: Color) {
    if (brush) {
      drawingContext.fillStyle = brush.toRgba();
    }

    drawingContext.beginPath();
    drawingContext.arc(
      this.mid.x,
      this.mid.y,
      DTConstants.TILE_HEIGHT / 3,
      0,
      Math.PI * 2,
      false
    );
    drawingContext.closePath();

    if (brush) {
      drawingContext.fill();
    }
  }

  public DrawRectangle(drawingContext: CanvasRenderingContext2D, brush: Color) {
    if (brush) {
      drawingContext.fillStyle = brush.toRgba();
    }

    drawingContext.beginPath();
    const s = DTConstants.TILE_HEIGHT * 0.6;
    drawingContext.fillRect(this.mid.x - s / 2, this.mid.y - s / 2, s, s);
    drawingContext.closePath();

    if (brush) {
      drawingContext.fill();
    }
  }

  public DrawCross(drawingContext: CanvasRenderingContext2D) {
    drawingContext.lineWidth = 1;
    drawingContext.strokeStyle = "red";
    drawingContext.beginPath();
    drawingContext.moveTo(this.mid.x - 4, this.mid.y + 8);
    drawingContext.lineTo(this.mid.y + 4, this.mid.y + 2);
    drawingContext.stroke();
    drawingContext.beginPath();
    drawingContext.moveTo(this.mid.x + 4, this.mid.y + 8);
    drawingContext.lineTo(this.mid.y - 4, this.mid.y + 2);
    drawingContext.stroke();
  }

  public DrawImage(drawingContext: CanvasRenderingContext2D, name: string) {
    const img = new Image();
    img.src = require("../../../img/" + name);
    if (name === "21000.png") {
      drawingContext.drawImage(img, this.mid.x - 7, this.mid.y - 7, 14, 14);
    } else {
      drawingContext.drawImage(img, this.mid.x - 30, this.mid.y - 60, 80, 80);
    }
  }

  public IsPointInside(pos: Point): boolean {
    let inside = false;

    let j = this.points.length - 1;
    for (let i = 0; i < this.points.length; i++) {
      if (
        (this.points[i].y < pos.y && this.points[j].y >= pos.y) ||
        (this.points[j].y < pos.y && this.points[i].y >= pos.y)
      ) {
        if (
          this.points[i].x +
            ((pos.y - this.points[i].y) /
              (this.points[j].y - this.points[i].y)) *
              (this.points[j].x - this.points[i].x) <
          pos.x
        ) {
          inside = !inside;
        }
      }
      j = i;
    }

    return inside;
  }

  private DrawPolygonOrPolyline(
    target: CanvasRenderingContext2D,
    points: Point[],
    color?: Color,
    borderColor?: Color
  ) {
    if (color) {
      target.fillStyle = color.toRgba();
    }

    if (borderColor) {
      target.strokeStyle = borderColor.toRgba();
      target.lineWidth = 0.5;
    }

    target.beginPath();
    target.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      target.lineTo(points[i].x, points[i].y);
    }

    target.lineTo(points[0].x, points[0].y);

    if (color) {
      target.fill();
    }

    if (borderColor) {
      target.stroke();
    }
  }
}
