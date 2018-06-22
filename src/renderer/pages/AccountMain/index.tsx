import {
  faBullhorn,
  faChartLine,
  faChess,
  faCoffee,
  faCogs,
  faMap,
  faMoneyBillAlt,
  faShoppingBag,
  faUser
} from "@fortawesome/fontawesome-free-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import * as React from "react";
import Bid from "../tabs/Bid";
import Character from "../tabs/Character";
import Configuration from "../tabs/Configuration";
import Console from "../tabs/Console";
import Fights from "../tabs/Fights";
import Flood from "../tabs/Flood";
import Inventory from "../tabs/Inventory";
import Map from "../tabs/Map";
import Statistics from "../tabs/Statistics";
import { accountMainStyles } from "./styles";
import {
  AccountMainProps,
  IAccountMainProps,
  IAccountMainState
} from "./types";

class AccountMain extends React.Component<AccountMainProps, IAccountMainState> {
  public state: IAccountMainState = {
    value: 0
  };

  public render() {
    const { account, classes } = this.props;
    const { value } = this.state;

    return (
      <Paper className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Tabs value={value} onChange={this.handleChange} fullWidth>
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon={faCoffee} />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon={faUser} />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon={faShoppingBag} />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon={faMap} />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon={faChess} />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon={faBullhorn} />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon={faMoneyBillAlt} />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon={faChartLine} />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon={faCogs} />}
            />
          </Tabs>
        </AppBar>

        <div style={{ display: value !== 0 ? "none" : "" }}>
          <Console account={account} />
        </div>
        <div style={{ display: value !== 1 ? "none" : "" }}>
          <Character account={account} />
        </div>
        <div style={{ display: value !== 2 ? "none" : "" }}>
          <Inventory account={account} />
        </div>
        <div style={{ display: value !== 3 ? "none" : "" }}>
          <Map account={account} />
        </div>
        <div style={{ display: value !== 4 ? "none" : "" }}>
          <Fights account={account} />
        </div>
        <div style={{ display: value !== 5 ? "none" : "" }}>
          <Flood account={account} />
        </div>
        <div style={{ display: value !== 6 ? "none" : "" }}>
          <Bid account={account} />
        </div>
        <div style={{ display: value !== 7 ? "none" : "" }}>
          <Statistics account={account} />
        </div>
        <div style={{ display: value !== 8 ? "none" : "" }}>
          <Configuration account={account} />
        </div>

        {/* {value === 0 && <Console account={account} />}
        {value === 1 && <Character account={account} />}
        {value === 2 && <Inventory account={account} />}
        {value === 3 && <Map account={account} />}
        {value === 4 && <Fights account={account} />}
        {value === 5 && <Flood account={account} />}
        {value === 6 && <Bid account={account} />}
        {value === 7 && <Statistics account={account} />}
        {value === 8 && <Configuration account={account} />} */}
      </Paper>
    );
  }

  private handleChange = (event, value) => {
    this.setState({ value });
  };
}

export default withStyles(accountMainStyles)<IAccountMainProps>(AccountMain);
