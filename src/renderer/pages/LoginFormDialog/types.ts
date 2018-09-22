import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const loginFormDialogStyles = (theme: Theme) =>
  createStyles({
    formControl: { margin: theme.spacing.unit },
    root: { flexGrow: 1 }
  });

export interface ILoginFormDialogProps
  extends WithStyles<typeof loginFormDialogStyles> {
  dialogOpen: boolean;
  closeDialog: () => void;
}

export interface ILoginFormDialogState {
  email: string;
  password: string;
  showPassword: boolean;
}
