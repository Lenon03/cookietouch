import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CookieMain from "@renderer/CookieMain";
import {
  IPlanningConfigProps,
  IPlanningConfigState,
  planningConfigStyles
} from "@renderer/pages/AccountsManager/PlanningConfig/types";
import { Enumerable } from "linqts";
import * as React from "react";

class PlanningConfig extends React.Component<
  IPlanningConfigProps,
  IPlanningConfigState
> {
  public readonly state: IPlanningConfigState = {
    accountsList: GlobalConfiguration.accountsList,
    active: false,
    planning: Enumerable.Repeat(false, 24).ToArray(),
    selectedAccounts: []
  };

  public componentDidMount() {
    CookieMain.EntitiesUpdated.on(this.entitiesUpdated);
  }

  public componentWillUnmount() {
    CookieMain.EntitiesUpdated.off(this.entitiesUpdated);
  }

  public render() {
    const { classes } = this.props;

    const ITEM_HEIGHT = 25;
    const ITEM_PADDING_TOP = 8;
    const menuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250
        }
      }
    };

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {LanguageManager.trans("planningConfig")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.regroupall}>
              <div className={classes.expansionpanel}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={this.state.active}
                        onChange={this.activeChanged}
                      />
                    }
                    label={LanguageManager.trans("planningActivate")}
                  />
                </FormGroup>

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-chip">
                    Accounts
                  </InputLabel>
                  <Select
                    multiple={true}
                    value={this.state.selectedAccounts.map(a => a.username)}
                    onChange={this.handleChangeAccounts}
                    input={<Input id="select-multiple-chip" />}
                    // @ts-ignore
                    renderValue={this.renderSelect}
                    MenuProps={menuProps}
                  >
                    {this.state.accountsList.map((acc, idx) => (
                      <MenuItem
                        key={idx}
                        value={acc.username}
                        // style={{
                        //   fontWeight:
                        //     this.state.name.indexOf(name) === -1
                        //       ? theme.typography.fontWeightRegular
                        //       : theme.typography.fontWeightMedium,
                        // }}
                      >
                        {acc.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  onClick={this.validate}
                  variant="raised"
                  color="primary"
                >
                  {LanguageManager.trans("validate")}
                </Button>
              </div>
              <List className={classes.list} component="nav">
                {this.state.planning.map((act, index) => (
                  <ListItem
                    key={index}
                    button={true}
                    onClick={this.itemClicked(index)}
                    style={{
                      backgroundColor: act ? "green" : "red",
                      height: 80,
                      paddingLeft: 12,
                      width: 55
                    }}
                  >
                    <ListItemText primary={`${index}h`} />
                  </ListItem>
                ))}
              </List>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  private itemClicked = (index: number) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const planning = this.state.planning;
    planning[index] = !planning[index];
    this.setState({ planning });
  };

  private activeChanged = (event: any) => {
    this.setState({ active: event.target.checked });
  };

  private validate = () => {
    for (const acc of this.state.selectedAccounts) {
      const account = GlobalConfiguration._accounts.find(
        a => a.username === acc.username
      )!;
      account.planificationActivated = this.state.active;
      account.planification = this.state.planning;
    }
    GlobalConfiguration.save();
    CookieMain.refreshEntities();
  };

  private entitiesUpdated = () => {
    this.setState({
      accountsList: GlobalConfiguration.accountsList,
      selectedAccounts: []
    });
  };

  private handleChangeAccounts = (event: any) => {
    const accounts = this.state.accountsList.filter(a =>
      event.target.value.includes(a.username)
    );
    this.setState({ selectedAccounts: accounts });
  };

  private renderSelect = (selected: string[]): React.ReactNode => {
    return (
      <div className={this.props.classes.chips}>
        {selected &&
          selected.map(value => (
            <Chip
              key={value}
              label={value}
              className={this.props.classes.chip}
            />
          ))}
      </div>
    );
  };
}

export default withStyles(planningConfigStyles)(PlanningConfig);
