import AnimDuration from "@/core/pathfinder/AnimDuration";
import MapPoint from "@/core/pathfinder/MapPoint";

enum AnimDurationTypes {
  MOUNTED,
  PARABLE,
  RUNNING,
  WALKING,
  SLIDE
}

export default class PathDuration {
  private static animDurations = new Map<AnimDurationTypes, AnimDuration>([
    [AnimDurationTypes.MOUNTED, new AnimDuration(135, 200, 120)],
    [AnimDurationTypes.PARABLE, new AnimDuration(400, 500, 450)],
    [AnimDurationTypes.RUNNING, new AnimDuration(170, 255, 150)],
    [AnimDurationTypes.WALKING, new AnimDuration(480, 510, 425)],
    [AnimDurationTypes.SLIDE, new AnimDuration(57, 85, 50)]
  ]);

  public static calculate(
    path: number[],
    isFight = false,
    slide = false,
    riding = false
  ): number {
    let duration = 20; // TODO: Adding 20ms just in case, need tests, to see if its gonna cause problems

    if (path.length === 1) {
      return duration;
    }

    let motionScheme: AnimDuration;

    if (slide) {
      motionScheme = this.animDurations.get(AnimDurationTypes.SLIDE);
    } else if (riding) {
      motionScheme = this.animDurations.get(AnimDurationTypes.MOUNTED);
    } else {
      motionScheme =
        path.length > 3
          ? this.animDurations.get(AnimDurationTypes.RUNNING)
          : this.animDurations.get(AnimDurationTypes.WALKING);
    }

    let prevX = -1;
    let prevY = -1;

    for (let i = 0; i < path.length; i++) {
      const coord = MapPoint.fromCellId(path[i]);

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

    console.log(
      "[PathDuration] The duration for your movement is: " + duration + " ms."
    );
    return duration;
  }
}
