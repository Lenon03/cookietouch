import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Jobs from "@renderer/pages/tabs/Character/Jobs";
import Spells from "@renderer/pages/tabs/Character/Spells";
import Stats from "@renderer/pages/tabs/Character/Stats";
import { characterTabStyles } from "@renderer/pages/tabs/Character/styles";
import {
  CharacterTabProps,
  ICharacterTabProps,
  ICharacterTabState
} from "@renderer/pages/tabs/Character/types";
import * as React from "react";

class Character extends React.Component<CharacterTabProps, ICharacterTabState> {
  public state: ICharacterTabState = {
    value: 0
  };

  public render() {
    const { account, classes } = this.props;
    const { value } = this.state;

    return (
      <Paper className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Tabs value={value} onChange={this.handleChange} fullWidth={true}>
            <Tab
              className={classes.tab}
              label={LanguageManager.trans("stats")}
            />
            <Tab
              className={classes.tab}
              label={LanguageManager.trans("spells")}
            />
            <Tab
              className={classes.tab}
              label={LanguageManager.trans("jobs")}
            />
          </Tabs>
        </AppBar>

        <div style={{ display: value !== 0 ? "none" : "" }}>
          <Stats account={account} />
        </div>
        <div style={{ display: value !== 1 ? "none" : "" }}>
          <Spells account={account} />
        </div>
        <div style={{ display: value !== 2 ? "none" : "" }}>
          <Jobs account={account} />
        </div>

        {/* {value === 0 && <Stats account={account} />}
        {value === 1 && <Spells account={account} />}
        {value === 2 && <Jobs account={account} />} */}
      </Paper>
    );
  }

  private handleChange = (event, value) => {
    this.setState({ value });
  };
}

export default withStyles(characterTabStyles)<ICharacterTabProps>(Character);
