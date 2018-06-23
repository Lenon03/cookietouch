import SpellToBoostEntry from "@/account/configurations/SpellToBoostEntry";
import LanguageManager from "@/configurations/language/LanguageManager";
import { BoostableStats } from "@/game/character/BoostableStats";
import DataManager from "@/protocol/data";
import Breeds from "@/protocol/data/classes/Breeds";
import Spells from "@/protocol/data/classes/Spells";
import { DataTypes } from "@/protocol/data/DataTypes";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { configurationTabStyles } from "@renderer/pages/tabs/Configuration/styles";
import {
  ConfigurationTabProps,
  IConfigurationTabProps,
  IConfigurationTabState,
  SpellLevels
} from "@renderer/pages/tabs/Configuration/types";
import * as React from "react";

class Configuration extends React.Component<
  ConfigurationTabProps,
  IConfigurationTabState
> {
  public state: IConfigurationTabState = {
    acceptAchievements: true,
    authorizedTradesFrom: [],
    autoMount: true,
    autoRegenAccepted: false,
    characterConnected: false,
    disconnectUponFightsLimit: false,
    enableSpeedHack: false,
    ignoreNonAuthorizedTrades: false,
    spellId: -1,
    spellLevel: SpellLevels.SIX,
    spells: [],
    statToBoost: BoostableStats.NONE,
    toAddToAuthorized: -1
  };

  public componentDidMount() {
    this.props.account.game.character.CharacterSelected.on(
      this.characterSelected
    );
  }

  public componentWillUnmount() {
    this.props.account.game.character.CharacterSelected.off(
      this.characterSelected
    );
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title}>
                  {LanguageManager.trans("automaticIncreases")}
                </Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="statToBoost">
                    {LanguageManager.trans("statToBoost")}
                  </InputLabel>
                  <Select
                    disabled={this.state.characterConnected === false}
                    value={this.state.statToBoost}
                    onChange={this.handleSelectChange}
                    inputProps={{ id: "statToBoost", name: "statToBoost" }}
                  >
                    <MenuItem value={BoostableStats.NONE}>
                      {LanguageManager.trans("none")}
                    </MenuItem>
                    <MenuItem value={BoostableStats.VITALITY}>
                      {LanguageManager.trans("vitality")}
                    </MenuItem>
                    <MenuItem value={BoostableStats.WISDOM}>
                      {LanguageManager.trans("wisdom")}
                    </MenuItem>
                    <MenuItem value={BoostableStats.STRENGTH}>
                      {LanguageManager.trans("strength")}
                    </MenuItem>
                    <MenuItem value={BoostableStats.AGILITY}>
                      {LanguageManager.trans("agility")}
                    </MenuItem>
                    <MenuItem value={BoostableStats.CHANCE}>
                      {LanguageManager.trans("chance")}
                    </MenuItem>
                    <MenuItem value={BoostableStats.INTELLIGENCE}>
                      {LanguageManager.trans("intelligence")}
                    </MenuItem>
                  </Select>
                </FormControl>
                <hr />
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell numeric>ID</TableCell>
                      <TableCell>{LanguageManager.trans("name")}</TableCell>
                      <TableCell numeric>
                        {LanguageManager.trans("level")}
                      </TableCell>
                      <TableCell>{LanguageManager.trans("actions")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.spells.map((s, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell style={{ maxWidth: 20 }} numeric>
                            {s.id}
                          </TableCell>
                          <TableCell style={{ maxWidth: 60 }}>
                            {s.name}
                          </TableCell>
                          <TableCell style={{ maxWidth: 20 }} numeric>
                            {s.level}
                          </TableCell>
                          <TableCell style={{ maxWidth: 50 }}>
                            <Button
                              disabled={this.state.characterConnected === false}
                              onClick={() => {
                                this.props.account.config.spellsToBoost = this.props.account.config.spellsToBoost.filter(
                                  sp => sp.id !== s.id
                                );
                                this.props.account.config.save();
                                this.setState({
                                  spells: this.props.account.config
                                    .spellsToBoost
                                });
                              }}
                              size="small"
                              variant="raised"
                              color="primary"
                            >
                              X
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <TextField
                  disabled={this.state.characterConnected === false}
                  autoFocus
                  margin="dense"
                  id="spellId"
                  name="spellId"
                  label={LanguageManager.trans("spell")}
                  value={this.state.spellId}
                  fullWidth
                  onChange={this.handleSelectChange}
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="spellLevel">
                    {LanguageManager.trans("level")}
                  </InputLabel>
                  <Select
                    disabled={this.state.characterConnected === false}
                    value={this.state.spellLevel}
                    onChange={this.handleSelectChange}
                    inputProps={{ id: "spellLevel", name: "spellLevel" }}
                  >
                    <MenuItem value={SpellLevels.ONE}>1</MenuItem>
                    <MenuItem value={SpellLevels.TWO}>2</MenuItem>
                    <MenuItem value={SpellLevels.THREE}>3</MenuItem>
                    <MenuItem value={SpellLevels.FOUR}>4</MenuItem>
                    <MenuItem value={SpellLevels.FIVE}>5</MenuItem>
                    <MenuItem value={SpellLevels.SIX}>6</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  disabled={this.state.characterConnected === false}
                  onClick={this.addSpell}
                  size="small"
                  variant="raised"
                  color="primary"
                >
                  {LanguageManager.trans("add")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title}>
                  {LanguageManager.trans("divers")}
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="enableSpeedHack"
                        name="enableSpeedHack"
                        disabled={this.state.characterConnected === false}
                        color="primary"
                        checked={this.state.enableSpeedHack}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("speedhack")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="autoMount"
                        name="autoMount"
                        disabled={this.state.characterConnected === false}
                        color="primary"
                        checked={this.state.autoMount}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("autoMount")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="acceptAchievements"
                        name="acceptAchievements"
                        disabled={this.state.characterConnected === false}
                        color="primary"
                        checked={this.state.acceptAchievements}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("acceptAchievements")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="disconnectUponFightsLimit"
                        name="disconnectUponFightsLimit"
                        disabled={this.state.characterConnected === false}
                        color="primary"
                        checked={this.state.disconnectUponFightsLimit}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("disconnectFightsLimit")}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="autoRegenAccepted"
                        name="autoRegenAccepted"
                        disabled={this.state.characterConnected === false}
                        color="primary"
                        checked={this.state.autoRegenAccepted}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("autoRegenObjects")}
                  />
                </FormGroup>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title}>
                  {LanguageManager.trans("exchanges")}
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        id="ignoreNonAuthorizedTrades"
                        name="ignoreNonAuthorizedTrades"
                        disabled={this.state.characterConnected === false}
                        color="primary"
                        checked={this.state.ignoreNonAuthorizedTrades}
                        onChange={this.handleSwitchChange}
                      />
                    }
                    label={LanguageManager.trans("ignoreNonAuthorizedTrades")}
                  />
                </FormGroup>
                <hr />
                <Typography>
                  {LanguageManager.trans("authorizedPlayers")}
                </Typography>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell numeric>ID</TableCell>
                      <TableCell>{LanguageManager.trans("actions")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.authorizedTradesFrom.map((a, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell numeric>{a}</TableCell>
                          <TableCell>
                            <Button
                              disabled={this.state.characterConnected === false}
                              onClick={() => {
                                this.props.account.config.authorizedTradesFrom = this.props.account.config.authorizedTradesFrom.filter(
                                  s => s !== a
                                );
                                this.props.account.config.save();
                                this.setState({
                                  authorizedTradesFrom: this.props.account
                                    .config.authorizedTradesFrom
                                });
                              }}
                              size="small"
                              variant="raised"
                              color="primary"
                            >
                              X
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <TextField
                  disabled={this.state.characterConnected === false}
                  autoFocus
                  margin="dense"
                  id="toAddToAuthorized"
                  name="toAddToAuthorized"
                  label="ID"
                  value={this.state.toAddToAuthorized}
                  fullWidth
                  onChange={this.handleSelectChange}
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  disabled={this.state.characterConnected === false}
                  onClick={() => {
                    this.props.account.config.authorizedTradesFrom.push(
                      this.state.toAddToAuthorized
                    );
                    this.props.account.config.save();
                    this.setState({
                      authorizedTradesFrom: this.props.account.config
                        .authorizedTradesFrom
                    });
                  }}
                  size="small"
                  variant="raised"
                  color="primary"
                >
                  {LanguageManager.trans("add")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }

  private characterSelected = () => {
    this.setState({
      acceptAchievements: this.props.account.config.acceptAchievements,
      authorizedTradesFrom: this.props.account.config.authorizedTradesFrom,
      autoMount: this.props.account.config.autoMount,
      autoRegenAccepted: this.props.account.config.autoRegenAccepted,
      characterConnected: true,
      disconnectUponFightsLimit: this.props.account.config
        .disconnectUponFightsLimit,
      enableSpeedHack: this.props.account.config.enableSpeedHack,
      ignoreNonAuthorizedTrades: this.props.account.config
        .ignoreNonAuthorizedTrades,
      spells: this.props.account.config.spellsToBoost,
      statToBoost: this.props.account.config.statToBoost
    });
  };

  private addSpell = async () => {
    const resp = await DataManager.get<Spells>(
      DataTypes.Spells,
      this.state.spellId
    );
    if (resp.length === 0) {
      return;
    }
    const name = resp[0].object.nameId;
    const spellsAdded = this.props.account.config.spellsToBoost.map(s => s.id);
    if (spellsAdded.includes(this.state.spellId)) {
      alert(LanguageManager.trans("alreadyAddSpell"));
      return;
    }
    const respBreeds = await DataManager.get<Breeds>(
      DataTypes.Breeds,
      this.props.account.game.character.breed
    );
    const spellsIds = respBreeds[0].object.breedSpellsId;
    if (!spellsIds.includes(this.state.spellId)) {
      alert(LanguageManager.trans("spellNotBreed"));
      console.log(spellsIds, this.state.spellId);
      return;
    }
    this.props.account.config.spellsToBoost.push(
      new SpellToBoostEntry(this.state.spellId, name, this.state.spellLevel)
    );
    this.props.account.config.save();
    this.setState({ spells: this.props.account.config.spellsToBoost });
  };

  private handleSwitchChange = (event, checked) => {
    this.setState({ [event.target.name]: checked } as Pick<
      IConfigurationTabState,
      keyof IConfigurationTabState
    >);
    this.props.account.config[event.target.name] = checked;
    this.props.account.config.save();
  };

  private handleSelectChange = event => {
    const value = parseInt(event.target.value, 10);
    this.setState({ [event.target.name]: value } as Pick<
      IConfigurationTabState,
      keyof IConfigurationTabState
    >);
    this.props.account.config[event.target.name] = value;
    this.props.account.config.save();
  };
}

export default withStyles(configurationTabStyles)<IConfigurationTabProps>(
  Configuration
);
