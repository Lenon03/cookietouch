import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "material-ui/Dialog";
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from "material-ui/ExpansionPanel";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import withStyles, { StyleRulesCallback, WithStyles } from "material-ui/styles/withStyles";
import Typography from "material-ui/Typography";
import * as React from "react";
import AccountsList from "./AccountsList";
import AddAccountForm from "./AddAccountForm";
import CharacterCreator from "./CharacterCreator";

type style = "root";

const styles: StyleRulesCallback<style> = (theme) => ({
  root: {
    flexGrow: 1,
  },
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
          <DialogTitle id="form-dialog-title">{LanguageManager.trans("accountsManager")}</DialogTitle>
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeDialog()} variant="raised" color="primary">
              {LanguageManager.trans("close")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)<IProps>(AccountsManager);
