import LanguageManager from "@/configurations/language/LanguageManager";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import AccountsList from "@renderer/pages/AccountsManager/AccountsList";
import AddAccountForm from "@renderer/pages/AccountsManager/AddAccountForm";
import CacheManager from "@renderer/pages/AccountsManager/CacheManager";
import CharacterCreator from "@renderer/pages/AccountsManager/CharacterCreator";
import PlanningConfig from "@renderer/pages/AccountsManager/PlanningConfig";
import {
  accountsManagerStyles,
  IAccountsManagerProps,
  IAccountsManagerState
} from "@renderer/pages/AccountsManager/types";
import * as React from "react";

class AccountsManager extends React.Component<
  IAccountsManagerProps,
  IAccountsManagerState
> {
  public render() {
    const { classes, dialogOpen, closeDialog } = this.props;

    return (
      <div className={classes.root}>
        <Dialog
          open={dialogOpen}
          onClose={closeDialog}
          aria-labelledby="form-dialog-title"
          fullScreen={true}
        >
          <DialogTitle id="form-dialog-title">
            {LanguageManager.trans("accountsManager")}
          </DialogTitle>
          <DialogContent>
            <Grid container={true} spacing={0}>
              <Grid item={true} xs={7}>
                <AccountsList closeDialog={closeDialog} />
              </Grid>
              <Grid item={true} xs={5}>
                <AddAccountForm />
              </Grid>
              <Grid item={true} xs={12}>
                <CharacterCreator />
              </Grid>
              <Grid item={true} xs={12}>
                <PlanningConfig />
              </Grid>
              <Grid item={true} xs={12}>
                <CacheManager />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} variant="raised" color="primary">
              {LanguageManager.trans("close")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(accountsManagerStyles)(AccountsManager);
