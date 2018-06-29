import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { accountMainStyles } from "@renderer/pages/AccountMain/styles";
import {
  AccountMainProps,
  IAccountMainProps,
  IAccountMainState
} from "@renderer/pages/AccountMain/types";
import Bid from "@renderer/pages/tabs/Bid";
import Character from "@renderer/pages/tabs/Character";
import Configuration from "@renderer/pages/tabs/Configuration";
import Console from "@renderer/pages/tabs/Console";
import Fights from "@renderer/pages/tabs/Fights";
import Flood from "@renderer/pages/tabs/Flood";
import Inventory from "@renderer/pages/tabs/Inventory";
import Map from "@renderer/pages/tabs/Map";
import Statistics from "@renderer/pages/tabs/Statistics";
import * as React from "react";

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
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={this.handleChange}
            fullWidth={true}
            scrollable={true}
            scrollButtons="auto"
          >
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon="coffee" />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon="user" />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon="shopping-bag" />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon="map" />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon="chess" />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon="bullhorn" />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon="money-bill-alt" />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon="chart-line" />}
            />
            <Tab
              className={classes.tab}
              icon={<FontAwesomeIcon icon="cogs" />}
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
