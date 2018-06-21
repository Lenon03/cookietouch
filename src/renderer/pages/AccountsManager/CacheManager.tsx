import LanguageManager from "@/configurations/language/LanguageManager";
import DTConstants from "@/protocol/DTConstants";
import { deleteFolderRecursive } from "@/utils/rmdir";
import { getCacheSize } from "@/utils/Sizes";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { remote } from "electron";
import { mkdirSync } from "fs";
import { join } from "path";
import * as React from "react";

type style = "root" | "paper";

const styles: StyleRulesCallback<style> = theme => ({
  paper: {
    padding: 16
  },
  root: {
    flexGrow: 1
  }
});

interface IState {
  cacheSize: number;
}

type Props = WithStyles<style>;

class CacheManager extends React.Component<Props, IState> {
  public readonly state: IState = {
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
            disabled={!DTConstants.assetsVersion}
            onClick={() => {
              const path = join(
                remote.app.getPath("userData"),
                DTConstants.assetsVersion
              );
              deleteFolderRecursive(path);
              mkdirSync(path);
              this.updateCacheSize();
            }}
          >
            {LanguageManager.trans("delete")}
          </Button>
        </Paper>
      </div>
    );
  }

  private updateCacheSize = () => {
    const cacheSize = getCacheSize();
    console.log(cacheSize);
    this.setState({ cacheSize });
  };
}

export default withStyles(styles)<{}>(CacheManager);
