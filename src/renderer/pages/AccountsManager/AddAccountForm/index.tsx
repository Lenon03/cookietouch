import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import DataManager from "@/protocol/data";
import Servers from "@/protocol/data/classes/Servers";
import { DataTypes } from "@/protocol/data/DataTypes";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CookieMain from "@renderer/CookieMain";
import {
  addAccountFormStyles,
  IAddAccountFormProps,
  IAddAccountFormState
} from "@renderer/pages/AccountsManager/AddAccountForm/types";
import * as React from "react";

class AddAccountForm extends React.Component<
  IAddAccountFormProps,
  IAddAccountFormState
> {
  public state: IAddAccountFormState = {
    character: "",
    password: "",
    server: -1,
    servers: new Map<number, string>(),
    showPassword: false,
    username: ""
  };

  public componentDidMount() {
    this.getServers();
  }

  public render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="title" align="center">
          {LanguageManager.trans("addAccount")}
        </Typography>
        <br />
        <Typography variant="caption" align="left">
          {LanguageManager.trans("addAccountInfo")}
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="username">
            {LanguageManager.trans("username")}
          </InputLabel>
          <Input
            autoFocus={true}
            id="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange("username")}
            fullWidth={true}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password">
            {LanguageManager.trans("password")}
          </InputLabel>
          <Input
            id="password"
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.password}
            onChange={this.handleChange("password")}
            fullWidth={true}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleClickShowPasssword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
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
              <em>{LanguageManager.trans("none")}</em>
            </MenuItem>
            {Array.from(this.state.servers.keys()).map(key => (
              <MenuItem key={key} value={key}>
                {this.state.servers.get(key)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="character">
            {LanguageManager.trans("character")}
          </InputLabel>
          <Input
            autoFocus={true}
            id="character"
            type="text"
            value={this.state.character}
            onChange={this.handleChange("character")}
            fullWidth={true}
          />
          <br />
          <Button
            disabled={
              this.state.username.length === 0 ||
              this.state.password.length === 0
            }
            style={{ float: "right" }}
            onClick={this.addAccount}
            variant="raised"
            color="primary"
          >
            {LanguageManager.trans("add")}
          </Button>
        </FormControl>
      </Paper>
    );
  }

  private handleChange = (prop: any) => (event: any) => {
    this.setState({ [prop]: event.target.value } as Pick<
      IAddAccountFormState,
      keyof IAddAccountFormState
    >);
  };

  private handleSelectChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value } as Pick<
      IAddAccountFormState,
      keyof IAddAccountFormState
    >);
  };

  private handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  private handleClickShowPasssword = () => {
    this.setState(prev => ({ showPassword: !prev.showPassword }));
  };

  private addAccount = () => {
    const { character, username, password, server } = this.state;
    GlobalConfiguration.addAccountAndSave(
      username,
      password,
      server,
      character
    );
    CookieMain.refreshEntities();
    this.setState({
      character: "",
      password: "",
      server: -1,
      showPassword: false,
      username: ""
    });
  };

  private getServers = async () => {
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
}

export default withStyles(addAccountFormStyles)(AddAccountForm);
