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
import { consoleTabStyles } from "@renderer/pages/tabs/Console/styles";
import {
  ConsoleTabProps,
  IConsoleTabProps,
  IConsoleTabState
} from "@renderer/pages/tabs/Console/types";
import moment from "moment";
import * as React from "react";

class Console extends React.Component<ConsoleTabProps, IConsoleTabState> {
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

  constructor(props) {
    super(props);

    this.commandProcessor = new CommandProcessor("/");
    this.commandProcessor.registerCommandHandler(
      "sendMessage",
      new SendMessageCommand()
    );
  }

  public componentDidMount() {
    this.props.account.game.character.CharacterSelected.on(
      this.characterSelected
    );
    this.props.account.logger.OnLog.on(this.onMessage);
  }

  public componentWillUnmount() {
    this.props.account.game.character.CharacterSelected.off(
      this.characterSelected
    );
    this.props.account.logger.OnLog.off(this.onMessage);
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <Grid container spacing={0}>
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
              <Grid item xs={3}>
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
              <Grid item xs={9}>
                <FormControl className={classes.formControl}>
                  {/* <InputLabel htmlFor="content">{LanguageManager.trans("name")}</InputLabel> */}
                  <Input
                    disabled={this.state.characterConnected === false}
                    autoFocus
                    id="content"
                    type="text"
                    value={this.state.content}
                    onChange={this.handleChange("content")}
                    onKeyDown={this.inputKeyDown}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
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
                    onChange={event => {
                      this.setState({
                        showGeneralMessages: event.target.checked
                      });
                      this.props.account.config.showGeneralMessages =
                        event.target.checked;
                      this.props.account.config.save();
                    }}
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
                    onChange={event => {
                      this.setState({
                        showAllianceMessages: event.target.checked
                      });
                      this.props.account.config.showAllianceMessages =
                        event.target.checked;
                      this.props.account.config.save();
                    }}
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
                    onChange={event => {
                      this.setState({
                        showGuildMessages: event.target.checked
                      });
                      this.props.account.config.showGuildMessages =
                        event.target.checked;
                      this.props.account.config.save();
                    }}
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
                    onChange={event => {
                      this.setState({ showNoobMessages: event.target.checked });
                      this.props.account.config.showNoobMessages =
                        event.target.checked;
                      this.props.account.config.save();
                    }}
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
                    onChange={event => {
                      this.setState({
                        showPartyMessages: event.target.checked
                      });
                      this.props.account.config.showPartyMessages =
                        event.target.checked;
                      this.props.account.config.save();
                    }}
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
                    onChange={event => {
                      this.setState({ showSaleMessages: event.target.checked });
                      this.props.account.config.showSaleMessages =
                        event.target.checked;
                      this.props.account.config.save();
                    }}
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
                    onChange={event => {
                      this.setState({ showSeekMessages: event.target.checked });
                      this.props.account.config.showSeekMessages =
                        event.target.checked;
                      this.props.account.config.save();
                    }}
                  />
                }
                label={LanguageManager.trans("showSeek")}
              />
            </FormGroup>
            <Button
              onClick={() => this.setState({ messages: [] })}
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

  private handleChange = name => event => {
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

  private handleChannelChange = event => {
    this.setState({ channel: event.target.value });
  };

  private handleStatusChange = event => {
    this.setState({ status: event.target.value });
    this.props.account.game.character.changeStatus(this.state.status);
  };

  private onMessage = (message: IMessage) => {
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
}

export default withStyles(consoleTabStyles)<IConsoleTabProps>(Console);
