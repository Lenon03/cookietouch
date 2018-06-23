import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { CharacterCreatorStyle } from "@renderer/pages/AccountsManager/CharacterCreator/styles";

export interface ICharacterCreatorProps {
  //
}

export interface ICharacterCreatorState {
  breed: number;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  create: boolean;
  tutorial: boolean;
  head: number;
  name: string;
  server: number;
  servers: Map<number, string>;
  sex: number;
  accountsList: AccountConfiguration[];
  selectedAccounts: AccountConfiguration[];
}

export type CharacterCreatorProps = ICharacterCreatorProps &
  WithStyles<CharacterCreatorStyle>;
