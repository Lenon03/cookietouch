import { WithStyles } from "@material-ui/core/styles/withStyles";
import { LoginFormDialogStyle } from "@renderer/pages/LoginFormDialog/styles";

export interface ILoginFormDialogProps {
  dialogOpen: boolean;
  closeDialog: () => void;
}

export interface ILoginFormDialogState {
  email: string;
  password: string;
  showPassword: boolean;
}

export type LoginFormDialogProps = ILoginFormDialogProps &
  WithStyles<LoginFormDialogStyle>;
