import AnimDuration from "@/core/pathfinder/AnimDuration";
import MapPoint from "@/core/pathfinder/MapPoint";
import Dictionary from "@/utils/Dictionary";

enum AnimDurationTypes {
  MOUNTED,
  PARABLE,
  RUNNING,
  WALKING,
  SLIDE
}

export default class PathDuration {
  private static animDurations = new Dictionary<
    AnimDurationTypes,
    AnimDuration
  >([
    { key: AnimDurationTypes.MOUNTED, value: new AnimDuration(135, 200, 120) },
    { key: AnimDurationTypes.PARABLE, value: new AnimDuration(400, 500, 450) },
    { key: AnimDurationTypes.RUNNING, value: new AnimDuration(170, 255, 150) },
    { key: AnimDurationTypes.WALKING, value: new AnimDuration(480, 510, 425) },
    { key: AnimDurationTypes.SLIDE, value: new AnimDuration(57, 85, 50) }
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
      motionScheme = this.animDurations.getValue(AnimDurationTypes.SLIDE);
    } else if (riding) {
      motionScheme = this.animDurations.getValue(AnimDurationTypes.MOUNTED);
    } else {
      motionScheme =
        path.length > 3
          ? this.animDurations.getValue(AnimDurationTypes.RUNNING)
          : this.animDurations.getValue(AnimDurationTypes.WALKING);
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
