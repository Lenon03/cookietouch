import LanguageManager from "@/configurations/language/LanguageManager";
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

interface IProps {
  dialogOpen: boolean;
  closeDialog: () => void;
}

type Props = IProps & WithStyles<style>;

class AccountsManager extends React.Component<Props, {}> {
  public render() {
    const { classes, dialogOpen, closeDialog } = this.props;

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
              <Grid item xs={12}>
                <CharacterCreator />
              </Grid>
              <Grid item xs={12}>
                <PlanningConfig />
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
}

export default withStyles(styles)<IProps>(AccountsManager);
