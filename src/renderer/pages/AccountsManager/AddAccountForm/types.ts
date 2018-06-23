import { WithStyles } from "@material-ui/core/styles/withStyles";
import { AddAccountFormStyle } from "@renderer/pages/AccountsManager/AddAccountForm/styles";

export interface IAddAccountFormProps {
  //
}

export interface IAddAccountFormState {
  character: string;
  username: string;
  password: string;
  server: number;
  servers: Map<number, string>;
  showPassword: boolean;
}

export type AddAccountFormProps = IAddAccountFormProps &
  WithStyles<AddAccountFormStyle>;
