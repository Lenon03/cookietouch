import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const cacheManagerStyles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: 16
    },
    root: {
      flexGrow: 1
    }
  });

export interface ICacheManagerProps
  extends WithStyles<typeof cacheManagerStyles> {
  //
}

export interface ICacheManagerState {
  cacheSize: number;
}
