import CharacterCreation from "@/configurations/accounts/CharacterCreation";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import BreedsUtility from "@/core/BreedsUtility";
import DataManager from "@/protocol/data";
import Servers from "@/protocol/data/classes/Servers";
import { DataTypes } from "@/protocol/data/DataTypes";
import Color from "@/utils/Color";
import { getRandomInt } from "@/utils/Random";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CookieMain from "@renderer/CookieMain";
import {
  characterCreatorStyles,
  ICharacterCreatorProps,
  ICharacterCreatorState
} from "@renderer/pages/AccountsManager/CharacterCreator/types";
import ColorPicker from "@renderer/pages/AccountsManager/ColorPicker";
import * as React from "react";

class CharacterCreator extends React.Component<
  ICharacterCreatorProps,
  ICharacterCreatorState
> {
  public state: ICharacterCreatorState = {
    accountsList: GlobalConfiguration.accountsList,
    breed: -1,
    color1: "#000000",
    color2: "#000000",
    color3: "#000000",
    color4: "#000000",
    color5: "#000000",
    create: false,
    head: -1,
    name: "",
    selectedAccounts: [],
    server: -1,
    servers: new Map<number, string>(),
    sex: -1,
    tutorial: true
  };

  public componentDidMount() {
    CookieMain.EntitiesUpdated.on(this.entitiesUpdated);

    this.setup();
  }

  public componentWillUnmount() {
    CookieMain.EntitiesUpdated.off(this.entitiesUpdated);
  }

  public render() {
    const { classes } = this.props;

    const ITEM_HEIGHT = 48;
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
              {LanguageManager.trans("characterCreator")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={this.state.create}
                    onChange={this.createChanged}
                  />
                }
                label={LanguageManager.trans("createCharacter")}
              />
            </FormGroup>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-chip">Accounts</InputLabel>
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
            <FormControl
              className={classes.formControl}
              aria-describedby="name-helper-text"
            >
              <InputLabel htmlFor="username">
                {LanguageManager.trans("name")}
              </InputLabel>
              <Input
                autoFocus={true}
                id="username"
                type="text"
                value={this.state.name}
                onChange={this.handleChange("name")}
              />
              <FormHelperText id="name-helper-text">
                {LanguageManager.trans("emptyRandomName")}
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="server">
                {LanguageManager.trans("server")}
              </InputLabel>
              <Select
                value={this.state.server}
                onChange={this.handleSelectChange}
                inputProps={{ id: "server", name: "server" }}
              >
                <MenuItem value={-1}>
                  <em>{LanguageManager.trans("random")}</em>
                </MenuItem>
                {Array.from(this.state.servers.keys()).map(key => (
                  <MenuItem key={key} value={key}>
                    {this.state.servers.get(key)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="breed">
                {LanguageManager.trans("breed")}
              </InputLabel>
              <Select
                value={this.state.breed}
                onChange={this.handleSelectChange}
                inputProps={{ id: "breed", name: "breed" }}
              >
                <MenuItem value={-1}>
                  <em>{LanguageManager.trans("random")}</em>
                </MenuItem>
                {BreedsUtility.breeds.ToArray().map(key => (
                  <MenuItem key={key.id} value={key.id}>
                    {key.shortNameId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="sex">
                {LanguageManager.trans("sex")}
              </InputLabel>
              <Select
                value={this.state.sex}
                onChange={this.handleSelectChange}
                inputProps={{ id: "sex", name: "sex" }}
              >
                <MenuItem value={-1}>
                  <em>{LanguageManager.trans("random")}</em>
                </MenuItem>
                <MenuItem value={0}>
                  <FontAwesomeIcon
                    className={classes.icon}
                    size="lg"
                    icon="venus"
                  />{" "}
                  {LanguageManager.trans("male")}
                </MenuItem>
                <MenuItem value={1}>
                  <FontAwesomeIcon
                    className={classes.icon}
                    size="lg"
                    icon="mars"
                  />{" "}
                  {LanguageManager.trans("female")}
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="head">
                {LanguageManager.trans("head")}
              </InputLabel>
              <Select
                disabled={this.state.sex === -1 || this.state.breed === -1}
                value={this.state.head}
                onChange={this.handleSelectChange}
                inputProps={{ id: "head", name: "head" }}
              >
                <MenuItem value={-1}>
                  <em>{LanguageManager.trans("random")}</em>
                </MenuItem>
                {BreedsUtility.getBreedHeads(this.state.breed, this.state.sex)
                  .ToArray()
                  .map((key, idx) => (
                    <MenuItem key={idx} value={idx + 1}>
                      <Avatar src={key} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <ColorPicker
              disableAlpha={true}
              color={this.state.color1}
              onChangeComplete={this.handleChangeColor("color1")}
            />
            <ColorPicker
              disableAlpha={true}
              color={this.state.color2}
              onChangeComplete={this.handleChangeColor("color2")}
            />
            <ColorPicker
              disableAlpha={true}
              color={this.state.color3}
              onChangeComplete={this.handleChangeColor("color3")}
            />
            <ColorPicker
              disableAlpha={true}
              color={this.state.color4}
              onChangeComplete={this.handleChangeColor("color4")}
            />
            <ColorPicker
              disableAlpha={true}
              color={this.state.color5}
              onChangeComplete={this.handleChangeColor("color5")}
            />
            <Button
              onClick={this.randomizeColors}
              variant="raised"
              color="primary"
            >
              {LanguageManager.trans("random")}
            </Button>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={this.state.tutorial}
                    onChange={this.tutorialChanged}
                  />
                }
                label={LanguageManager.trans("doTutorial")}
              />
            </FormGroup>
            <Button onClick={this.validate} variant="raised" color="primary">
              {LanguageManager.trans("validate")}
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  private setup = async () => {
    const data = await DataManager.get<Servers>(
      DataTypes.Servers,
      ...[401, 403, 404, 405, 406, 407]
    );

    const servers = new Map<number, string>();
    for (const server of data) {
      servers.set(server.id, server.object.nameId);
    }
    this.setState({ servers });
  };

  private refreshColors = () => {
    if (this.state.breed === -1 || this.state.sex === -1) {
      this.setState({ head: -1 });
      return;
    }
    const breed = BreedsUtility.breeds.First(
      b => (b && b.id === this.state.breed) || false
    );
    const colors = BreedsUtility.getBreedBaseColors(breed, this.state.sex);
    this.setState(
      {
        color1: colors[0].toHex(),
        color2: colors[1].toHex(),
        color3: colors[2].toHex(),
        color4: colors[3].toHex(),
        color5: colors[4].toHex()
      },
      () => this.forceUpdate()
    );
  };

  private randomizeColors = () => {
    const color1 = new Color(
      getRandomInt(0, 255),
      getRandomInt(0, 255),
      getRandomInt(0, 255)
    );
    const color2 = new Color(
      getRandomInt(0, 255),
      getRandomInt(0, 255),
      getRandomInt(0, 255)
    );
    const color3 = new Color(
      getRandomInt(0, 255),
      getRandomInt(0, 255),
      getRandomInt(0, 255)
    );
    const color4 = new Color(
      getRandomInt(0, 255),
      getRandomInt(0, 255),
      getRandomInt(0, 255)
    );
    const color5 = new Color(
      getRandomInt(0, 255),
      getRandomInt(0, 255),
      getRandomInt(0, 255)
    );
    this.setState(
      {
        color1: color1.toHex(),
        color2: color2.toHex(),
        color3: color3.toHex(),
        color4: color4.toHex(),
        color5: color5.toHex()
      },
      () => this.forceUpdate()
    );
  };

  private entitiesUpdated = () => {
    this.setState({
      accountsList: GlobalConfiguration.accountsList,
      selectedAccounts: []
    });
  };

  private handleChangeColor = (name: any) => (color: any) => {
    this.setState({ [name]: color.hex } as Pick<
      ICharacterCreatorState,
      keyof ICharacterCreatorState
    >);
  };

  private tutorialChanged = (event: any) => {
    this.setState({ tutorial: event.target.checked });
  };

  private createChanged = (event: any) => {
    this.setState({ create: event.target.checked });
  };

  private handleSelectChange = (event: any) => {
    this.setState(
      { [event.target.name]: event.target.value } as Pick<
        ICharacterCreatorState,
        keyof ICharacterCreatorState
      >,
      () => {
        this.refreshColors();
      }
    );
  };

  private handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value } as Pick<
      ICharacterCreatorState,
      keyof ICharacterCreatorState
    >);
  };

  private handleChangeAccounts = (event: any) => {
    const accounts = this.state.accountsList.filter(a =>
      event.target.value.includes(a.username)
    );
    this.setState({ selectedAccounts: accounts });
  };

  private validate = () => {
    const crea = this.getCharacterCreation();
    for (const acc of this.state.selectedAccounts) {
      GlobalConfiguration._accounts.find(
        a => a.username === acc.username
      )!.characterCreation = crea;
    }
    GlobalConfiguration.save();
    CookieMain.refreshEntities();
  };

  private getCharacterCreation = () => {
    if (!this.state.create) {
      return new CharacterCreation();
    }

    const crea = new CharacterCreation();

    crea.create = true;
    crea.name = this.state.name;
    crea.server = this.state.server;
    crea.breed = this.state.breed;
    crea.sex = this.state.sex;
    crea.head = this.state.head;
    crea.completeTutorial = this.state.tutorial;
    crea.colors = [
      BreedsUtility.getIndexedColor(1, new Color(this.state.color1)),
      BreedsUtility.getIndexedColor(2, new Color(this.state.color2)),
      BreedsUtility.getIndexedColor(3, new Color(this.state.color3)),
      BreedsUtility.getIndexedColor(4, new Color(this.state.color4)),
      BreedsUtility.getIndexedColor(5, new Color(this.state.color5))
    ];

    return crea;
  };

  private renderSelect = (selected: string[]): React.ReactNode => {
    return (
      <div className={this.props.classes.chips}>
        {selected.map(value => (
          <Chip key={value} label={value} className={this.props.classes.chip} />
        ))}
      </div>
    );
  };
}

export default withStyles(characterCreatorStyles)(CharacterCreator);
