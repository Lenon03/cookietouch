import { IMessage } from "@/core/logger";
import { ChatChannelsMultiEnum } from "@/protocol/enums/ChatChannelsMultiEnum";
import { PlayerStatusEnum } from "@/protocol/enums/PlayerStatusEnum";
import Account from "@account";
import * as moment from "moment";
import * as React from "react";
import {
  Button, Card, CardTitle, Col, Container, FormGroup, Input,
  InputGroup, InputGroupAddon, Label, Row,
} from "reactstrap";

interface IConsoleProps {
  account: Account;
  max?: number;
}

interface IConsoleStates {
  messages: IMessage[];
  channel: ChatChannelsMultiEnum;
  content: string;
  characterConnected: boolean;
  status: PlayerStatusEnum;
  showGeneralMessages: boolean;
  showPartyMessages: boolean;
  showGuildMessages: boolean;
  showAllianceMessages: boolean;
  showSaleMessages: boolean;
  showSeekMessages: boolean;
  showNoobMessages: boolean;
}

export default class Console extends React.Component<IConsoleProps, IConsoleStates> {

  constructor(props: IConsoleProps) {
    super(props);
    this.state = {
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
      status: PlayerStatusEnum.PLAYER_STATUS_UNKNOWN,
    };
  }

  public componentDidMount() {
    this.props.account.game.character.CharacterSelected.on(this.characterSelected.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.CharacterSelected.off(this.characterSelected.bind(this));
  }

  public componentWillMount() {
    if (!this.props.account) {
      return;
    }
    this.props.account.logger.OnLog.on((message) => {
      const newMessages = this.state.messages;
      newMessages.push(message);
      if (newMessages.length > (this.props.max ? this.props.max : 200)) {
        newMessages.shift();
      }
      this.setState((prevState, props) => ({
        messages: newMessages,
      }));
      const div = document.getElementById("consoleTabDiv");
      if (div) {
        div.scrollTop = div.scrollHeight - div.clientHeight;
      }
    });
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <div id="consoleTabDiv">
                  {this.state.messages.map((m, index) => {
                    if (m.source) {
                      return <span style={{ color: m.color }} key={index}>{`[${moment(m.time).format("LTS")}][${m.source}] ${m.content}`}</span>;
                    }
                    return <span style={{ color: m.color }} key={index}>{`[${moment(m.time).format("LTS")}] ${m.content}`}</span>;
                  })}
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="3">
                <Input
                  disabled={this.state.characterConnected ? "" : "disabled"}
                  type="select" className="form-control-sm" style={{ width: "50" }} value={this.state.channel}
                  onChange={(event) => {
                    const value = parseInt(event.target.value, 10);
                    this.setState({ channel: value });
                  }}>
                  <option value={ChatChannelsMultiEnum.CHANNEL_GLOBAL}>{ChatChannelsMultiEnum[ChatChannelsMultiEnum.CHANNEL_GLOBAL]}</option>
                  <option value={ChatChannelsMultiEnum.CHANNEL_GUILD}>{ChatChannelsMultiEnum[ChatChannelsMultiEnum.CHANNEL_GUILD]}</option>
                  <option value={ChatChannelsMultiEnum.CHANNEL_NOOB}>{ChatChannelsMultiEnum[ChatChannelsMultiEnum.CHANNEL_NOOB]}</option>
                  <option value={ChatChannelsMultiEnum.CHANNEL_PARTY}>{ChatChannelsMultiEnum[ChatChannelsMultiEnum.CHANNEL_PARTY]}</option>
                  <option value={ChatChannelsMultiEnum.CHANNEL_SALES}>{ChatChannelsMultiEnum[ChatChannelsMultiEnum.CHANNEL_SALES]}</option>
                  <option value={ChatChannelsMultiEnum.CHANNEL_SEEK}>{ChatChannelsMultiEnum[ChatChannelsMultiEnum.CHANNEL_SEEK]}</option>
                  <option value={ChatChannelsMultiEnum.CHANNEL_GUILD}>{ChatChannelsMultiEnum[ChatChannelsMultiEnum.CHANNEL_GUILD]}</option>
                  <option value={ChatChannelsMultiEnum.CHANNEL_ALLIANCE}>{ChatChannelsMultiEnum[ChatChannelsMultiEnum.CHANNEL_ALLIANCE]}</option>
                  <option value={ChatChannelsMultiEnum.CHANNEL_ARENA}>{ChatChannelsMultiEnum[ChatChannelsMultiEnum.CHANNEL_ARENA]}</option>
                  <option value={ChatChannelsMultiEnum.CHANNEL_TEAM}>{ChatChannelsMultiEnum[ChatChannelsMultiEnum.CHANNEL_TEAM]}</option>
                </Input>
              </Col>
              <Col>
                <InputGroup>
                  <Input disabled={this.state.characterConnected ? "" : "disabled"}
                    type="text" className="form-control-sm" value={this.state.content}
                    onChange={(event) => {
                      this.setState({ content: event.target.value });
                    }} />
                  <InputGroupAddon addontype="append">
                    <Button color="secondary" size="sm" onClick={() => {
                      if (this.state.content !== "") {
                        this.props.account.game.chat.sendMessage(this.state.content, this.state.channel);
                        this.setState({ content: "" });
                      }
                    }}>Send</Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>
          </Col>
          <Col xs="3">
            <Card body inverse color="dark">
              <CardTitle>Divers</CardTitle>
              <Input
                disabled={this.state.characterConnected ? "" : "disabled"}
                type="select" className="form-control-sm" value={this.state.status}
                onChange={(event) => {
                  const value = parseInt(event.target.value, 10);
                  this.setState({ status: value });
                  this.props.account.game.character.changeStatus(this.state.status);
                }}>
                <option value={PlayerStatusEnum.PLAYER_STATUS_AFK}>{PlayerStatusEnum[PlayerStatusEnum.PLAYER_STATUS_AFK]}</option>
                <option value={PlayerStatusEnum.PLAYER_STATUS_AVAILABLE}>{PlayerStatusEnum[PlayerStatusEnum.PLAYER_STATUS_AVAILABLE]}</option>
                <option value={PlayerStatusEnum.PLAYER_STATUS_PRIVATE}>{PlayerStatusEnum[PlayerStatusEnum.PLAYER_STATUS_PRIVATE]}</option>
                <option value={PlayerStatusEnum.PLAYER_STATUS_SOLO}>{PlayerStatusEnum[PlayerStatusEnum.PLAYER_STATUS_SOLO]}</option>
                <option value={PlayerStatusEnum.PLAYER_STATUS_OFFLINE}>{PlayerStatusEnum[PlayerStatusEnum.PLAYER_STATUS_OFFLINE]}</option>
                <option value={PlayerStatusEnum.PLAYER_STATUS_IDLE}>{PlayerStatusEnum[PlayerStatusEnum.PLAYER_STATUS_IDLE]}</option>
              </Input>
              <FormGroup check>
                <Label check>
                  <Input
                    disabled={this.state.characterConnected ? "" : "disabled"}
                    type="checkbox"
                    checked={this.state.showGeneralMessages}
                    onChange={(event) => {
                      this.setState({ showGeneralMessages: event.target.checked });
                      this.props.account.config.showGeneralMessages = event.target.checked;
                      this.props.account.config.save();
                    }} />
                  Show General messages
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    disabled={this.state.characterConnected ? "" : "disabled"}
                    type="checkbox"
                    checked={this.state.showAllianceMessages}
                    onChange={(event) => {
                      this.setState({ showAllianceMessages: event.target.checked });
                      this.props.account.config.showAllianceMessages = event.target.checked;
                      this.props.account.config.save();
                    }} />
                  Show Alliance messages
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    disabled={this.state.characterConnected ? "" : "disabled"}
                    type="checkbox"
                    checked={this.state.showGuildMessages}
                    onChange={(event) => {
                      this.setState({ showGuildMessages: event.target.checked });
                      this.props.account.config.showGuildMessages = event.target.checked;
                      this.props.account.config.save();
                    }} />
                  Show Guild messages
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    disabled={this.state.characterConnected ? "" : "disabled"}
                    type="checkbox"
                    checked={this.state.showNoobMessages}
                    onChange={(event) => {
                      this.setState({ showNoobMessages: event.target.checked });
                      this.props.account.config.showNoobMessages = event.target.checked;
                      this.props.account.config.save();
                    }} />
                  Show Noob messages
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    disabled={this.state.characterConnected ? "" : "disabled"}
                    type="checkbox"
                    checked={this.state.showPartyMessages}
                    onChange={(event) => {
                      this.setState({ showPartyMessages: event.target.checked });
                      this.props.account.config.showPartyMessages = event.target.checked;
                      this.props.account.config.save();
                    }} />
                  Show Party messages
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    disabled={this.state.characterConnected ? "" : "disabled"}
                    type="checkbox"
                    checked={this.state.showSaleMessages}
                    onChange={(event) => {
                      this.setState({ showSaleMessages: event.target.checked });
                      this.props.account.config.showSaleMessages = event.target.checked;
                      this.props.account.config.save();
                    }} />
                  Show Sales messages
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    disabled={this.state.characterConnected ? "" : "disabled"}
                    type="checkbox"
                    checked={this.state.showSeekMessages}
                    onChange={(event) => {
                      this.setState({ showSeekMessages: event.target.checked });
                      this.props.account.config.showSeekMessages = event.target.checked;
                      this.props.account.config.save();
                    }} />
                  Show Seek messages
                </Label>
              </FormGroup>
              <Button size="sm" outline color="danger" onClick={() => this.setState({ messages: [] })} >
                Clear console
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  private characterSelected() {
    this.setState({
      characterConnected: true,
      showAllianceMessages: this.props.account.config.showAllianceMessages,
      showGeneralMessages: this.props.account.config.showGeneralMessages,
      showGuildMessages: this.props.account.config.showGuildMessages,
      showNoobMessages: this.props.account.config.showNoobMessages,
      showPartyMessages: this.props.account.config.showPartyMessages,
      showSaleMessages: this.props.account.config.showSaleMessages,
      showSeekMessages: this.props.account.config.showSeekMessages,
      status: this.props.account.game.character.status,
    });
  }
}
