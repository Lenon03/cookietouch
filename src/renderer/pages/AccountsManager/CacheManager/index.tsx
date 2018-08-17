import LanguageManager from "@/configurations/language/LanguageManager";
import { deleteFolderRecursive } from "@/utils/rmdir";
import { getCacheSize } from "@/utils/Sizes";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { cacheManagerStyles } from "@renderer/pages/AccountsManager/CacheManager/styles";
import {
  CacheManagerProps,
  ICacheManagerProps,
  ICacheManagerState
} from "@renderer/pages/AccountsManager/CacheManager/types";
import { remote } from "electron";
import { mkdirSync } from "fs";
import { join } from "path";
import * as React from "react";

class CacheManager extends React.Component<
  CacheManagerProps,
  ICacheManagerState
> {
  public readonly state: ICacheManagerState = {
    cacheSize: 0
  };

  public componentDidMount() {
    this.updateCacheSize();
  }

  public render() {
    const { classes } = this.props;
    const { cacheSize } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="title">
            {(cacheSize / 1024).toFixed(2)} kb
          </Typography>
          <Button
            color="primary"
            variant="raised"
            disabled={cacheSize === 0}
            onClick={this.deleteCache}
          >
            {LanguageManager.trans("delete")}
          </Button>
        </Paper>
      </div>
    );
  }

  private updateCacheSize = async () => {
    const cacheSize = await getCacheSize();
    this.setState({ cacheSize });
  };

  private deleteCache = (event: React.MouseEvent<HTMLElement>) => {
    const path = join(remote.app.getPath("userData"), "assets");
    deleteFolderRecursive(path);
    mkdirSync(path);
    this.updateCacheSize();
  };
}

export default withStyles(cacheManagerStyles)<ICacheManagerProps>(CacheManager);
