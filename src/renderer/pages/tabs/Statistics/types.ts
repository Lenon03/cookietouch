import Account from "@/account";
import ObjectObtainedEntry from "@/statistics/ObjectObtainedEntry";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const statisticsTabStyles = (theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    root: {
      flexGrow: 1,
      padding: 10
    },
    table: {
      maxHeight: 300,
      minWidth: 300,
      overflowY: "auto"
    }
  });

export interface IStatisticsTabProps
  extends WithStyles<typeof statisticsTabStyles> {
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
