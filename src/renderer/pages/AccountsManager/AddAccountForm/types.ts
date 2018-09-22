import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const addAccountFormStyles = (theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing.unit
    },
    root: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
      margin: theme.spacing.unit,
      padding: theme.spacing.unit * 2
    }
  });

export interface IAddAccountFormProps
  extends WithStyles<typeof addAccountFormStyles> {
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
