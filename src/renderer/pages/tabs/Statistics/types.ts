import Account from "@/account";
import ObjectObtainedEntry from "@/statistics/ObjectObtainedEntry";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { StatisticsTabStyle } from "@renderer/pages/tabs/Statistics/styles";

export interface IStatisticsTabProps {
  account: Account;
}

export interface IStatisticsTabState {
  objectsObtainedInFights: ObjectObtainedEntry[];
  objectsObtainedInGathers: ObjectObtainedEntry[];
  achievementsFinished: number;
  averageFightTime: number;
  experienceGained: number;
  fightsCount: number;
  fightsLost: number;
  fightsWon: number;
  gathersCount: number;
  kamasGained: number;
  levelsGained: number;
  totalFightsTime: number;
  totalGathersTime: number;
}

export type StatisticsTabProps = IStatisticsTabProps &
  WithStyles<StatisticsTabStyle>;
