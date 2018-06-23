import Account from "@/account";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { CharacterTabStyle } from "@renderer/pages/tabs/Character/styles";

export interface ICharacterTabProps {
  account: Account;
}

export interface ICharacterTabState {
  value: number;
}

export type CharacterTabProps = ICharacterTabProps &
  WithStyles<CharacterTabStyle>;
