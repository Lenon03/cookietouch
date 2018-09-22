import LanguageManager from "@/configurations/language/LanguageManager";
import CommandProcessor from "@/core/commands/CommandProcessor";
import SendMessageCommand from "@/core/commands/handlers/SendMessageCommand";
import { IMessage } from "@/core/logger";
import { ChatChannelsMultiEnum } from "@/protocol/enums/ChatChannelsMultiEnum";
import { PlayerStatusEnum } from "@/protocol/enums/PlayerStatusEnum";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch";
import {
  consoleTabStyles,
  IConsoleTabProps,
  IConsoleTabState
} from "@renderer/pages/tabs/Console/types";
import moment from "moment";
import * as React from "react";

class Console extends React.Component<IConsoleTabProps, IConsoleTabState> {
  public state: IConsoleTabState = {
    channel: ChatChannelsMultiEnum.CHANNEL_GLOBAL,
    characterConnected: false,
    content: "",
    messages: [],
    showAllianceMessages: true,
    showGeneralMessages: true,
    showGuildMessages: true,
    showNoobMessages: true,
    showPartyMessages: true,
    showSaleMessages: true,
    showSeekMessages: true,
    status: PlayerStatusEnum.PLAYER_STATUS_UNKNOWN
  };

  private commandProcessor: CommandProcessor;

  constructor(props: IConsoleTabProps) {
    super(props);

    this.commandProcessor = new CommandProcessor("/");
    this.commandProcessor.registerCommandHandler("w", new SendMessageCommand());
  }

  public componentDidMount() {
    this.props.account.config.Updated.on(this.configUpdated);
    this.props.account.game.character.CharacterSelected.on(
      this.characterSelected
    );
    this.props.account.logger.OnLog.on(this.onMessage);
  }

  public componentWillUnmount() {
    this.props.account.config.Updated.off(this.configUpdated);
    this.props.account.game.character.CharacterSelected.off(
      this.characterSelected
    );
    this.props.account.logger.OnLog.off(this.onMessage);
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container={true} spacing={24}>
          <Grid item={true} xs={9}>
            <Grid container={true} spacing={16}>
              <div id="consoleTabDiv" className={classes.console}>
                {this.state.messages.map((m, index) => {
                  if (m.source) {
                    return (
                      <span
                        className={classes.consoleSpan}
                        style={{ color: m.color }}
                        key={index}
                      >
                        {`[${moment(m.time).format("LTS")}][${m.source}] ${
                          m.content
                        }`}
                      </span>
                    );
                  }
                  return (
                    <span
                      className={classes.consoleSpan}
                      style={{ color: m.color }}
                      key={index}
                    >
                      {`[${moment(m.time).format("LTS")}] ${m.content}`}
                    </span>
                  );
                })}
              </div>
              <Grid item={true} xs={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="channel">
                    {LanguageManager.trans("channel")}
                  </InputLabel>
                  <Select
                    disabled={this.state.characterConnected === false}
                    value={this.state.channel}
                    onChange={this.handleChannelChange}
                    inputProps={{ id: "channel", name: "channel" }}
                  >
                    <MenuItem value={ChatChannelsMultiEnum.CHANNEL_GLOBAL}>
                      {LanguageManager.trans("global")}
                    </MenuItem>
                    <MenuItem value={ChatChannelsMultiEnum.CHANNEL_GUILD}>
                      {LanguageManager.trans("guild")}
                    </MenuItem>
                    <MenuItem value={ChatChannelsMultiEnum.CHANNEL_NOOB}>
                      {LanguageManager.trans("noob")}
                    </MenuItem>
                    <MenuItem value={ChatChannelsMultiEnum.CHANNEL_PARTY}>
                      {LanguageManager.trans("party")}
                    </MenuItem>
                    <MenuItem value={ChatChannelsMultiEnum.CHANNEL_SALES}>
                      {LanguageManager.trans("sales")}
                    </MenuItem>
                    <MenuItem value={ChatChannelsMultiEnum.CHANNEL_SEEK}>
                      {LanguageManager.trans("seek")}
                    </MenuItem>
                    <MenuItem value={ChatChannelsMultiEnum.CHANNEL_ALLIANCE}>
                      {LanguageManager.trans("alliance")}
                    </MenuItem>
                    <MenuItem value={ChatChannelsMultiEnum.CHANNEL_ARENA}>
                      {LanguageManager.trans("arena")}
                    </MenuItem>
                    <MenuItem value={ChatChannelsMultiEnum.CHANNEL_TEAM}>
                      {LanguageManager.trans("team")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item={true} xs={9}>
                <FormControl className={classes.formControl}>
                  {/* <InputLabel htmlFor="content">{LanguageManager.trans("name")}</InputLabel> */}
                  <Input
                    className={classes.inputConsoleChat}
                    disabled={this.state.characterConnected === false}
                    autoFocus={true}
                    id="content"
                    type="text"
                    value={this.state.content}
                    onChange={this.handleChange("content")}
                    onKeyDown={this.inputKeyDown}
                    fullWidth={true}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={3}>
            <FormControl className={classes.status}>
              <InputLabel htmlFor="status">
                {LanguageManager.trans("status")}
              </InputLabel>
              <Select
                disabled={this.state.characterConnected === false}
                value={this.state.status}
                onChange={this.handleStatusChange}
                inputProps={{ id: "status", name: "status" }}
              >
                <MenuItem value={PlayerStatusEnum.PLAYER_STATUS_AFK}>
                  {LanguageManager.trans("afk")}
                </MenuItem>
                <MenuItem value={PlayerStatusEnum.PLAYER_STATUS_AVAILABLE}>
                  {LanguageManager.trans("available")}
                </MenuItem>
                <MenuItem value={PlayerStatusEnum.PLAYER_STATUS_PRIVATE}>
                  {LanguageManager.trans("private")}
                </MenuItem>
                <MenuItem value={PlayerStatusEnum.PLAYER_STATUS_SOLO}>
                  {LanguageManager.trans("solo")}
                </MenuItem>
              </Select>
            </FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    disabled={this.state.characterConnected === false}
                    checked={this.state.showGeneralMessages}
                    onChange={this.showGeneralMessages}
                  />
                }
                label={LanguageManager.trans("showGeneral")}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    disabled={this.state.characterConnected === false}
                    checked={this.state.showAllianceMessages}
                    onChange={this.showAllianceMessages}
                  />
                }
                label={LanguageManager.trans("showAlliance")}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    disabled={this.state.characterConnected === false}
                    checked={this.state.showGuildMessages}
                    onChange={this.showGuildMessages}
                  />
                }
                label={LanguageManager.trans("showGuild")}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    disabled={this.state.characterConnected === false}
                    checked={this.state.showNoobMessages}
                    onChange={this.showNoobMessages}
                  />
                }
                label={LanguageManager.trans("showNoob")}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    disabled={this.state.characterConnected === false}
                    checked={this.state.showPartyMessages}
                    onChange={this.showPartyMessages}
                  />
                }
                label={LanguageManager.trans("showParty")}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    disabled={this.state.characterConnected === false}
                    checked={this.state.showSaleMessages}
                    onChange={this.showSaleMessages}
                  />
                }
                label={LanguageManager.trans("showSales")}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    disabled={this.state.characterConnected === false}
                    checked={this.state.showSeekMessages}
                    onChange={this.showSeekMessages}
                  />
                }
                label={LanguageManager.trans("showSeek")}
              />
            </FormGroup>
            <Button
              className={classes.cleanConsole}
              onClick={this.clearConsole}
              variant="raised"
              color="primary"
            >
              {LanguageManager.trans("clearConsole")}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  private inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (this.state.content === "") {
        return;
      }

      if (
        !this.commandProcessor.processCommand(
          this.state.content,
          this.props.account
        )
      ) {
        this.props.account.game.chat.sendMessage(
          this.state.content,
          this.state.channel
        );
      }

      this.setState({ content: "" });
    }
  };

  private clearConsole = () => {
    this.setState({ messages: [] });
  };

  private handleChange = (name: any) => (event: any) => {
    this.setState({ [name]: event.target.value } as Pick<
      IConsoleTabState,
      keyof IConsoleTabState
    >);
  };

  private characterSelected = () => {
    this.setState({
      characterConnected: true,
      showAllianceMessages: this.props.account.config.showAllianceMessages,
      showGeneralMessages: this.props.account.config.showGeneralMessages,
      showGuildMessages: this.props.account.config.showGuildMessages,
      showNoobMessages: this.props.account.config.showNoobMessages,
      showPartyMessages: this.props.account.config.showPartyMessages,
      showSaleMessages: this.props.account.config.showSaleMessages,
      showSeekMessages: this.props.account.config.showSeekMessages,
      status: this.props.account.game.character.status
    });
  };

  private handleChannelChange = (event: any) => {
    this.setState({ channel: event.target.value });
  };

  private handleStatusChange = (event: any) => {
    const status = parseInt(event.target.value, 10);
    this.setState({ status });
    this.props.account.game.character.changeStatus(status);
  };

  private onMessage = (message?: IMessage) => {
    if (!message) {
      return;
    }
    const newMessages = this.state.messages;
    newMessages.push(message);
    if (newMessages.length > (this.props.max ? this.props.max : 200)) {
      newMessages.shift();
    }
    this.setState((prevState, props) => ({
      messages: newMessages
    }));
    const div = document.getElementById("consoleTabDiv");
    if (div) {
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }
  };

  private showGeneralMessages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      showGeneralMessages: event.target.checked
    });
    this.props.account.config.showGeneralMessages = event.target.checked;
    await this.props.account.config.save();
  };

  private showAllianceMessages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      showAllianceMessages: event.target.checked
    });
    this.props.account.config.showAllianceMessages = event.target.checked;
    await this.props.account.config.save();
  };

  private showGuildMessages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      showGuildMessages: event.target.checked
    });
    this.props.account.config.showGuildMessages = event.target.checked;
    await this.props.account.config.save();
  };

  private showNoobMessages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ showNoobMessages: event.target.checked });
    this.props.account.config.showNoobMessages = event.target.checked;
    await this.props.account.config.save();
  };

  private showPartyMessages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      showPartyMessages: event.target.checked
    });
    this.props.account.config.showPartyMessages = event.target.checked;
    await this.props.account.config.save();
  };

  private showSaleMessages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ showSaleMessages: event.target.checked });
    this.props.account.config.showSaleMessages = event.target.checked;
    await this.props.account.config.save();
  };

  private showSeekMessages = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ showSeekMessages: event.target.checked });
    this.props.account.config.showSeekMessages = event.target.checked;
    await this.props.account.config.save();
  };

  private configUpdated = () => {
    this.setState({
      showAllianceMessages: this.props.account.config.showAllianceMessages,
      showGeneralMessages: this.props.account.config.showGeneralMessages,
      showGuildMessages: this.props.account.config.showGuildMessages,
      showNoobMessages: this.props.account.config.showNoobMessages,
      showPartyMessages: this.props.account.config.showPartyMessages,
      showSaleMessages: this.props.account.config.showSaleMessages,
      showSeekMessages: this.props.account.config.showSeekMessages
    });
  };
}

export default withStyles(consoleTabStyles)(Console);
