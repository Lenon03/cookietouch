export enum IFlagType {
  ChangeMapFlag = 1,
  CustomFlag = 2,
  DoorFlag = 3,
  FightFlag = 4,
  GatherFlag = 5,
  NpcBankFlag = 6,
  PhenixFlag = 7,
}

export interface IFlag {
  type: IFlagType;
}
