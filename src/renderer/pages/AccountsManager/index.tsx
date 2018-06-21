import LanguageManager from "@/configurations/language/LanguageManager";
import { getCacheSize } from "@/utils/Sizes";
import { staticPath } from "@/utils/staticPath";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import { rmdirSync } from "fs";
import * as React from "react";
import AccountsList from "./AccountsList";
import AddAccountForm from "./AddAccountForm";
import CharacterCreator from "./CharacterCreator";
import PlanningConfig from "./PlanningConfig";

type style = "root";

const styles: StyleRulesCallback<style> = theme => ({
  root: {
    flexGrow: 1
  }
});

interface IState {
  cacheSize: number;
}

interface IProps {
  dialogOpen: boolean;
  closeDialog: () => void;
}

type Props = IProps & WithStyles<style>;

class AccountsManager extends React.Component<Props, IState> {
  public state: IState = {
    cacheSize: 0
  };

  public componentDidMount() {
    console.log("OOKOKOK");
    this.updateCacheSize();
  }

  public render() {
    const { classes, dialogOpen, closeDialog } = this.props;
    const { cacheSize } = this.state;

    return (
      <div className={classes.root}>
        <Dialog
          open={dialogOpen}
          onClose={() => closeDialog()}
          aria-labelledby="form-dialog-title"
          fullScreen
        >
          <DialogTitle id="form-dialog-title">
            {LanguageManager.trans("accountsManager")}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={0}>
              <Grid item xs={7}>
                <AccountsList closeDialog={() => closeDialog()} />
              </Grid>
              <Grid item xs={5}>
                <AddAccountForm />
              </Grid>
              <Grid container spacing={0}>
                <CharacterCreator />
              </Grid>
              <Grid container spacing={0}>
                <PlanningConfig />
              </Grid>
              <Grid container spacing={0}>
                {(cacheSize / 1024).toFixed(2)} Ko
                <Button
                  color="primary"
                  variant="raised"
                  onClick={() => {
                    rmdirSync(staticPath);
                    this.updateCacheSize();
                  }}
                >
                  DELETE
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => closeDialog()}
              variant="raised"
              color="primary"
            >
              {LanguageManager.trans("close")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  private updateCacheSize = () => {
    const cacheSize = getCacheSize();
    console.log(cacheSize);
    this.setState({ cacheSize });
  };
}

export default withStyles(styles)<IProps>(AccountsManager);
