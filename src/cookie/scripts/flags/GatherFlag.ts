import { IFlag, IFlagType } from "@/scripts/flags/IFlag";

export default class GatherFlag implements IFlag {
  public type = IFlagType.GatherFlag;
}
