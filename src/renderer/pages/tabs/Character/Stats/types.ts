import Account from "@/account";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const characterStatsTabStyles = (theme: Theme) =>
  createStyles({
    card: {
      minWidth: 275,
      padding: 20
    },
    iconStats: {
      float: "left",
      marginTop: "6px"
    },
    labelPointsStats: {
      marginLeft: 20,
      marginTop: 10
    },
    labelStats: {
      float: "left",
      marginLeft: 12,
      marginTop: "15px"
    },
    lineStats: {
      alignItems: "center",
      display: "flex",
      height: 50,
      justifyContent: "space-between",
      verticalAlign: "middle"
    },
    root: {
      flexGrow: 1,
      padding: 10
    },
    statsLabelSpan: {
      float: "right",
      justifyItems: "center",
      marginTop: 16
    },
    statsLabelSpanAdd: {
      float: "right",
      marginTop: 4
    }
  });

export interface ICharacterStatsTabProps
  extends WithStyles<typeof characterStatsTabStyles> {
  account: Account;
}

export interface ICharacterStatsTabState {
  level: number;
  skinUrl: string;
  lifePoints: number;
  maxLifePoints: number;
  actionPoints: number;
  movementPoints: number;
  initiative: number;
  prospecting: number;
  range: number;
  summonableCreaturesBoost: number;
  vitality: number;
  wisdom: number;
  strength: number;
  intelligence: number;
  chance: number;
  agility: number;
  statsPoints: number;
}
