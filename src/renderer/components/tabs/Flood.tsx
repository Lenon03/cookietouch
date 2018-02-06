import LanguageManager from "@/configurations/language/LanguageManager";
import FloodSentence from "@/extensions/flood/FloodSentence";
import {ChatActivableChannelsEnum} from "@/protocol/enums/ChatActivableChannelsEnum";
import Account from "@account";
import {List} from "linqts";
import * as React from "react";
import {Button, Card, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row, Table} from "reactstrap";

interface IFloodProps {
  account: Account;
}

interface IFloodStates {
  characterConnected: boolean;
  generalChannelInterval: number;
  running: boolean;
  salesChannelInterval: number;
  seekChannelInterval: number;
  sentences: FloodSentence[];
}

export default class Flood extends React.Component<IFloodProps, IFloodStates> {

  constructor(props: IFloodProps) {
    super(props);

    this.state = {
      characterConnected: false,
      generalChannelInterval: -1,
      running: false,
      salesChannelInterval: -1,
      seekChannelInterval: -1,
      sentences: [],
    };
  }

  public componentDidMount() {
    this.props.account.game.character.CharacterSelected.on(this.characterSelected.bind(this));
    this.props.account.extensions.flood.config.Changed.on(this.configChanged.bind(this));
    this.props.account.extensions.flood.RunningChanged.on(this.runningChanged.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.CharacterSelected.off(this.characterSelected.bind(this));
    this.props.account.extensions.flood.config.Changed.off(this.configChanged.bind(this));
    this.props.account.extensions.flood.RunningChanged.off(this.runningChanged.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <Button
              size="sm" color={this.state.running ? "danger" : "success"}
              onClick={() => {
                if (this.state.running) {
                  this.props.account.extensions.flood.stop();
                } else {
                  this.props.account.extensions.flood.start();
                }
              }}>
              {this.state.running ? LanguageManager.trans("pause") : LanguageManager.trans("start")}
            </Button>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col>
            <Table striped bordered size="sm" responsive>
              <thead>
              <tr>
                <th>{LanguageManager.trans("content")}</th>
                <th>{LanguageManager.trans("channel")}</th>
                <th>OnPlayerJoined</th>
                <th>OnPlayerLeft</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {this.state.sentences.map((s, index) => (
                <tr key={index}>
                  <td>{s.content}</td>
                  <td>{ChatActivableChannelsEnum[s.channel]}</td>
                  <td>{s.onPlayerJoined ? "true" : "false"}</td>
                  <td>{s.onPlayerLeft ? "true" : "false"}</td>
                  <td>
                    <Button size="sm" color="danger" onClick={() => this.deleteSentence(s)}>
                      {LanguageManager.trans("delete")}
                    </Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs="2">
            <FormGroup>
              <Label for="generalChannelInterval">{LanguageManager.trans("generalChannelInterval")}</Label>
              <Input
                id="generalChannelInterval"
                disabled={this.state.characterConnected ? "" : "disabled"}
                type="number" className="form-control-sm" value={this.state.generalChannelInterval}
                onChange={(event) => {
                  const value = parseInt(event.target.value, 10);
                  if (!value || value < 0) {
                    return;
                  }
                  this.props.account.extensions.flood.config.generalChannelInterval = value;
                  this.props.account.extensions.flood.config.save();
                }}/>
            </FormGroup>
            <FormGroup>
              <Label for="seekChannelInterval">{LanguageManager.trans("seekChannelInterval")}</Label>
              <Input
                id="seekChannelInterval"
                disabled={this.state.characterConnected ? "" : "disabled"}
                type="number" className="form-control-sm" value={this.state.seekChannelInterval}
                onChange={(event) => {
                  const value = parseInt(event.target.value, 10);
                  if (!value || value < 0) {
                    return;
                  }
                  this.props.account.extensions.flood.config.seekChannelInterval = value;
                  this.props.account.extensions.flood.config.save();
                }}/>
            </FormGroup>
            <FormGroup>
              <Label for="salesChannelInterval">{LanguageManager.trans("salesChannelInterval")}</Label>
              <Input
                id="salesChannelInterval"
                disabled={this.state.characterConnected ? "" : "disabled"}
                type="number" className="form-control-sm" value={this.state.salesChannelInterval}
                onChange={(event) => {
                  const value = parseInt(event.target.value, 10);
                  if (!value || value < 0) {
                    return;
                  }
                  this.props.account.extensions.flood.config.salesChannelInterval = value;
                  this.props.account.extensions.flood.config.save();
                }}/>
            </FormGroup>
          </Col>
          <Col>
            <Form onSubmit={(event) => {
              event.preventDefault();
              const content = (document.getElementById("content") as HTMLInputElement).value;
              const channelString = (document.getElementById("channel") as HTMLInputElement).value;
              const channel = parseInt(channelString, 10);
              const onPlayerJoined = (document.getElementById("onplayerjoined") as HTMLInputElement).checked;
              const onPlayerLeft = (document.getElementById("onplayerleft") as HTMLInputElement).checked;

              this.props.account.extensions.flood.config.sentences.Add(
                new FloodSentence(content, channel, onPlayerJoined, onPlayerLeft),
              );
              this.props.account.extensions.flood.config.save();
            }}>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="content" className="mr-sm-2">{LanguageManager.trans("content")}</Label>
                <Input type="text" name="content" id="content"/>
              </FormGroup>
              <FormGroup>
                <Label for="channel">{LanguageManager.trans("channel")}</Label>
                <Input
                  id="channel"
                  type="select" className="form-control-sm">
                  <option value={ChatActivableChannelsEnum.CHANNEL_GLOBAL}>{LanguageManager.trans("global")}</option>
                  <option value={ChatActivableChannelsEnum.CHANNEL_SEEK}>{LanguageManager.trans("seek")}</option>
                  <option value={ChatActivableChannelsEnum.CHANNEL_SALES}>{LanguageManager.trans("sales")}</option>
                  <option value={ChatActivableChannelsEnum.PSEUDO_CHANNEL_PRIVATE}>{LanguageManager.trans("private")}</option>
                </Input>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" id="onplayerjoined"/>
                  On Player Joined
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" id="onplayerleft"/>
                  On Player Left
                </Label>
              </FormGroup>
              <br/>
              <Button size="sm">{LanguageManager.trans("add")}</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card body inverse color="dark">
              <CardTitle>Infos</CardTitle>
              <CardText>
                {LanguageManager.trans("infoFlood1")}<br/>
                {LanguageManager.trans("infoFlood2")}<br/>
                {LanguageManager.trans("infoFloodnbr")}<br/>
                {LanguageManager.trans("infoFloodsmiley")}<br/>
                {LanguageManager.trans("infoFlood3")}<br/>
                {LanguageManager.trans("infoFloodname")}<br/>
                {LanguageManager.trans("infoFloodlevel")}<br/>
              </CardText>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  private deleteSentence(sentence: FloodSentence) {
    const sentences = this.state.sentences.filter((s) => s.content !== sentence.content);
    this.props.account.extensions.flood.config.sentences = new List(sentences);
    this.props.account.extensions.flood.config.save();
  }

  private characterSelected() {
    this.setState({characterConnected: true});
  }

  private configChanged() {
    this.setState({
      generalChannelInterval: this.props.account.extensions.flood.config.generalChannelInterval,
      running: this.props.account.extensions.flood.running,
      salesChannelInterval: this.props.account.extensions.flood.config.salesChannelInterval,
      seekChannelInterval: this.props.account.extensions.flood.config.seekChannelInterval,
      sentences: this.props.account.extensions.flood.config.sentences.ToArray(),
    });
  }

  private runningChanged() {
    this.setState({running: this.props.account.extensions.flood.running});
  }
}
