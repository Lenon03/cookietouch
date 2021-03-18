import Account from "@/account";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import MapViewer from "@renderer/pages/tabs/Map/MapViewer";
import * as React from "react";

export const mapStyles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

interface IMapProps extends WithStyles<typeof mapStyles> {
  account: Account;
}

// tslint:disable-next-line:variable-name
export const Map = withStyles(mapStyles)(({ account, classes }: IMapProps) => (
  <div className={classes.root}>
    <MapViewer account={account} />
  </div>
));
