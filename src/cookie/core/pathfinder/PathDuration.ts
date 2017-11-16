import Dictionary from "@utils/Dictionary";
import AnimDuration from "./AnimDuration";
import Extensions, { ICoord } from "./Extensions";

enum AnimDurationTypes { MOUNTED, PARABLE, RUNNING, WALKING, SLIDE }

export default class PathDuration {

  public static calculate(path: number[], isFight = false, slide = false, riding = false): number {
    let duration = 20; // TODO: Adding 20ms just in case, need tests, to see if its gonna cause problems

    if (path.length === 1) {
      return duration;
    }

    let motionScheme: AnimDuration;

    if (slide) {
      motionScheme = this.animDurations.getValue(AnimDurationTypes.SLIDE);
    } else if (riding) {
      motionScheme = this.animDurations.getValue(AnimDurationTypes.MOUNTED);
    } else {
      motionScheme = path.length > 3 ?
        this.animDurations.getValue(AnimDurationTypes.RUNNING)
        : this.animDurations.getValue(AnimDurationTypes.WALKING);
    }

    let prevX = -1;
    let prevY = -1;

    for (let i = 0; i < path.length; i++) {
      const coord: ICoord = { x: 0, y: 0 };
      Extensions.tryGetCoord(path[i], coord);

      if (i !== 0) {
        if (coord.y === prevY) {
          duration += motionScheme.horizontal;
        } else if (coord.x === prevX) {
          duration += motionScheme.vertical;
        } else {
          duration += motionScheme.linear;
        }
      }

      prevX = coord.x;
      prevY = coord.y;
    }

    console.log("[PathDuration] The duration for your movement is: " + duration + " ms.");
    return duration;
  }

  public static init() {
    this.animDurations.add(AnimDurationTypes.MOUNTED, new AnimDuration(135, 200, 120));
    this.animDurations.add(AnimDurationTypes.PARABLE, new AnimDuration(400, 500, 450));
    this.animDurations.add(AnimDurationTypes.RUNNING, new AnimDuration(170, 255, 150));
    this.animDurations.add(AnimDurationTypes.WALKING, new AnimDuration(480, 510, 425));
    this.animDurations.add(AnimDurationTypes.SLIDE, new AnimDuration(57, 85, 50));
  }

  private static animDurations = new Dictionary<AnimDurationTypes, AnimDuration>();
}
