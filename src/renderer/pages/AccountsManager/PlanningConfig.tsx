import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
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
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CookieMain from "@renderer/CookieMain";
import { Enumerable } from "linqts";
import * as React from "react";

type style =
  | "root"
  | "heading"
  | "formControl"
  | "chips"
  | "chip"
  | "list"
  | "expansionpanel"
  | "regroupall";

const styles: StyleRulesCallback<style> = theme => ({
  chip: {
    margin: theme.spacing.unit / 4
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  expansionpanel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 150
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  list: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row"
  },
  regroupall: {
    display: "flex",
    flexDirection: "column"
  },
  root: {
    flexGrow: 1
  }
});

interface IState {
  accountsList: AccountConfiguration[];
  active: boolean;
  planning: boolean[];
  selectedAccounts: AccountConfiguration[];
}

class PlanningConfig extends React.Component<WithStyles<style>, IState> {
  public readonly state: IState = {
    accountsList: GlobalConfiguration.accountsList,
    active: false,
    planning: Enumerable.Repeat(false, 24).ToArray(),
    selectedAccounts: []
  };

  constructor(props) {
    super(props);
  }

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
                    multiple
                    value={this.state.selectedAccounts.map(a => a.username)}
                    onChange={this.handleChangeAccounts}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                      <div className={classes.chips}>
                        {(selected as React.ReactText[]).map(value => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
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
                    button
                    onClick={event => this.itemClicked(index)}
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

  private itemClicked = (index: number) => {
    const planning = this.state.planning;
    planning[index] = !planning[index];
    this.setState({ planning });
  };

  private activeChanged = event => {
    this.setState({ active: event.target.checked });
  };

  private validate = () => {
    for (const acc of this.state.selectedAccounts) {
      const account = GlobalConfiguration._accounts.First(
        a => a.username === acc.username
      );
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

  private handleChangeAccounts = event => {
    const accounts = this.state.accountsList.filter(a =>
      event.target.value.includes(a.username)
    );
    this.setState({ selectedAccounts: accounts });
  };
}

export default withStyles(styles)<{}>(PlanningConfig);
