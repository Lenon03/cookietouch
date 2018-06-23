import Account from "@/account";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { CharacterStatsTabStyle } from "@renderer/pages/tabs/Character/Stats/styles";

export interface ICharacterStatsTabProps {
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

export type CharacterStatsTabProps = ICharacterStatsTabProps &
  WithStyles<CharacterStatsTabStyle>;
