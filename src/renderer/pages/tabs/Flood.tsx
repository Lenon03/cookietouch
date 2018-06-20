import LanguageManager from "@/configurations/language/LanguageManager";
import FloodSentence from "@/extensions/flood/FloodSentence";
import { ChatActivableChannelsEnum } from "@/protocol/enums/ChatActivableChannelsEnum";
import Account from "@account";
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
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { List } from "linqts";
import * as React from "react";

type style = "root" | "table" | "formControl" | "card" | "title";

const styles: StyleRulesCallback<style> = theme => ({
  card: {
    minWidth: 275
  },
  formControl: {
    margin: theme.spacing.unit
  },
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2,
    maxHeight: 500,
    overflowY: "auto",
    padding: 10
  },
  table: {
    minWidth: 700
  },
  title: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    marginBottom: 16
  }
});

interface IProps {
  account: Account;
}

interface IAddSentenceForm {
  content: string;
  channel: number;
  onPlayerJoined: boolean;
  onPlayerLeft: boolean;
}

interface IState {
  addSentenceForm: IAddSentenceForm;
  characterConnected: boolean;
  generalChannelInterval: number;
  running: boolean;
  salesChannelInterval: number;
  seekChannelInterval: number;
  sentences: FloodSentence[];
}

type Props = IProps & WithStyles<style>;

class Flood extends React.Component<Props, IState> {
  public state: IState = {
    addSentenceForm: {
      channel: ChatActivableChannelsEnum.CHANNEL_GLOBAL,
      content: "",
      onPlayerJoined: true,
      onPlayerLeft: true
    },
    characterConnected: false,
    generalChannelInterval: -1,
    running: false,
    salesChannelInterval: -1,
    seekChannelInterval: -1,
    sentences: []
  };

  public componentDidMount() {
    this.props.account.game.character.CharacterSelected.on(
      this.characterSelected
    );
    this.props.account.extensions.flood.config.Changed.on(this.configChanged);
    this.props.account.extensions.flood.RunningChanged.on(this.runningChanged);
  }

  public componentWillUnmount() {
    this.props.account.game.character.CharacterSelected.off(
      this.characterSelected
    );
    this.props.account.extensions.flood.config.Changed.off(this.configChanged);
    this.props.account.extensions.flood.RunningChanged.off(this.runningChanged);
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          disabled={this.state.characterConnected === false}
          onClick={() => {
            if (this.state.running) {
              this.props.account.extensions.flood.stop();
            } else {
              this.props.account.extensions.flood.start();
            }
          }}
          variant="raised"
          color={this.state.running ? "secondary" : "primary"}
        >
          {this.state.running
            ? LanguageManager.trans("pause")
            : LanguageManager.trans("start")}
        </Button>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>{LanguageManager.trans("content")}</TableCell>
              <TableCell>{LanguageManager.trans("channel")}</TableCell>
              <TableCell>{LanguageManager.trans("onPlayerJoined")}</TableCell>
              <TableCell>{LanguageManager.trans("onPlayerLeft")}</TableCell>
              <TableCell>{LanguageManager.trans("actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.sentences.map((s, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{s.content}</TableCell>
                  <TableCell>{ChatActivableChannelsEnum[s.channel]}</TableCell>
                  <TableCell>
                    {s.onPlayerJoined
                      ? LanguageManager.trans("yes")
                      : LanguageManager.trans("no")}
                  </TableCell>
                  <TableCell>
                    {s.onPlayerLeft
                      ? LanguageManager.trans("yes")
                      : LanguageManager.trans("no")}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => this.deleteSentence(s)}
                      variant="raised"
                      color="primary"
                    >
                      {LanguageManager.trans("delete")}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Grid container spacing={8}>
          <Grid item xs={2}>
            <TextField
              disabled={this.state.characterConnected === false}
              autoFocus
              margin="dense"
              id="generalChannelInterval"
              name="generalChannelInterval"
              label={LanguageManager.trans("generalChannelInterval")}
              value={this.state.generalChannelInterval}
              fullWidth
              onChange={this.handleInputChange}
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              disabled={this.state.characterConnected === false}
              autoFocus
              margin="dense"
              id="seekChannelInterval"
              name="seekChannelInterval"
              label={LanguageManager.trans("seekChannelInterval")}
              value={this.state.seekChannelInterval}
              fullWidth
              onChange={this.handleInputChange}
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              disabled={this.state.characterConnected === false}
              autoFocus
              margin="dense"
              id="salesChannelInterval"
              name="salesChannelInterval"
              label={LanguageManager.trans("salesChannelInterval")}
              value={this.state.salesChannelInterval}
              fullWidth
              onChange={this.handleInputChange}
              type="number"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={10}>
            <form onSubmit={this.submit}>
              <TextField
                disabled={this.state.characterConnected === false}
                autoFocus
                margin="dense"
                id="content"
                name="content"
                onChange={this.handleSelectChangeForm}
                value={this.state.addSentenceForm.content}
                label={LanguageManager.trans("content")}
                fullWidth
                type="text"
                InputLabelProps={{ shrink: true }}
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="channel">
                  {LanguageManager.trans("channel")}
                </InputLabel>
                <Select
                  value={this.state.addSentenceForm.channel}
                  onChange={this.handleSelectChangeForm}
                  inputProps={{ id: "channel", name: "channel" }}
                >
                  <MenuItem value={ChatActivableChannelsEnum.CHANNEL_GLOBAL}>
                    {LanguageManager.trans("global")}
                  </MenuItem>
                  <MenuItem value={ChatActivableChannelsEnum.CHANNEL_SEEK}>
                    {LanguageManager.trans("seek")}
                  </MenuItem>
                  <MenuItem value={ChatActivableChannelsEnum.CHANNEL_SALES}>
                    {LanguageManager.trans("sales")}
                  </MenuItem>
                  <MenuItem
                    value={ChatActivableChannelsEnum.PSEUDO_CHANNEL_PRIVATE}
                  >
                    {LanguageManager.trans("private")}
                  </MenuItem>
                </Select>
              </FormControl>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      id="onPlayerJoined"
                      name="onPlayerJoined"
                      color="primary"
                      checked={this.state.addSentenceForm.onPlayerJoined}
                      onChange={this.handleSwitchChangeForm}
                    />
                  }
                  label={LanguageManager.trans("onPlayerJoined")}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      id="onPlayerLeft"
                      name="onPlayerLeft"
                      color="primary"
                      checked={this.state.addSentenceForm.onPlayerLeft}
                      onChange={this.handleSwitchChangeForm}
                    />
                  }
                  label={LanguageManager.trans("onPlayerLeft")}
                />
              </FormGroup>
              <Button
                disabled={this.state.addSentenceForm.content === ""}
                type="submit"
                variant="raised"
                color="primary"
              >
                {LanguageManager.trans("add")}
              </Button>
            </form>
          </Grid>
        </Grid>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title}>
              {LanguageManager.trans("infos")}
            </Typography>
            <Typography>{LanguageManager.trans("infoFlood1")}</Typography>
            <Typography>{LanguageManager.trans("infoFlood2")}</Typography>
            <Typography>{LanguageManager.trans("infoFloodnbr")}</Typography>
            <Typography>{LanguageManager.trans("infoFloodsmiley")}</Typography>
            <Typography>{LanguageManager.trans("infoFlood3")}</Typography>
            <Typography>{LanguageManager.trans("infoFloodname")}</Typography>
            <Typography>{LanguageManager.trans("infoFloodlevel")}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  private submit = event => {
    event.preventDefault();

    const infos = this.state.addSentenceForm;

    this.props.account.extensions.flood.config.sentences.Add(
      new FloodSentence(
        infos.content,
        infos.channel,
        infos.onPlayerJoined,
        infos.onPlayerLeft
      )
    );
    this.props.account.extensions.flood.config.save();
  };

  private handleSwitchChangeForm = (event, checked) => {
    const addSentenceForm = { ...this.state.addSentenceForm };
    addSentenceForm[event.target.name] = checked;
    this.setState({ addSentenceForm });
  };

  private handleSelectChangeForm = event => {
    const addSentenceForm = { ...this.state.addSentenceForm };
    addSentenceForm[event.target.name] = event.target.value;
    this.setState({ addSentenceForm });
  };

  private handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value } as Pick<
      IState,
      keyof IState
    >);
    this.props.account.extensions.flood.config[event.target.name] =
      event.target.value;
    this.props.account.extensions.flood.config.save();
  };

  private deleteSentence = (sentence: FloodSentence) => {
    const sentences = this.state.sentences.filter(
      s => s.content !== sentence.content
    );
    this.props.account.extensions.flood.config.sentences = new List(sentences);
    this.props.account.extensions.flood.config.save();
  };

  private characterSelected = () => {
    this.setState({ characterConnected: true });
  };

  private configChanged = () => {
    this.setState({
      generalChannelInterval: this.props.account.extensions.flood.config
        .generalChannelInterval,
      running: this.props.account.extensions.flood.running,
      salesChannelInterval: this.props.account.extensions.flood.config
        .salesChannelInterval,
      seekChannelInterval: this.props.account.extensions.flood.config
        .seekChannelInterval,
      sentences: this.props.account.extensions.flood.config.sentences.ToArray()
    });
  };

  private runningChanged = () => {
    this.setState({ running: this.props.account.extensions.flood.running });
  };
}

export default withStyles(styles)<IProps>(Flood);
