import LanguageManager from "@/configurations/language/LanguageManager";
import ObjectToSellEntry from "@/extensions/bid/ObjectToSellEntry";
import DataManager from "@/protocol/data";
import Items from "@/protocol/data/classes/Items";
import { DataTypes } from "@/protocol/data/DataTypes";
import Account from "@account";
import { remote } from "electron";
import { List } from "linqts";
import * as React from "react";
import { Button, Card, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row, Table } from "reactstrap";

interface IBidProps {
  account: Account;
}

interface IBidStates {
  characterConnected: boolean;
  kamasGained: number;
  kamasPaidOnTaxes: number;
  interval: number;
  objects: ObjectToSellEntry[];
  running: boolean;
  script: string;
}

export default class Bid extends React.Component<IBidProps, IBidStates> {

  constructor(props: IBidProps) {
    super(props);

    this.state = {
      characterConnected: false,
      interval: -1,
      kamasGained: -1,
      kamasPaidOnTaxes: -1,
      objects: [],
      running: false,
      script: "",
    };
  }

  public componentDidMount() {
    this.props.account.game.character.CharacterSelected.on(this.characterSelected.bind(this));
    this.props.account.extensions.bid.config.Changed.on(this.configChanged.bind(this));
    this.props.account.extensions.bid.Started.on(this.started.bind(this));
    this.props.account.extensions.bid.Stopped.on(this.stopped.bind(this));
    this.props.account.extensions.bid.StatisticsUpdated.on(this.statisticsUpdated.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.CharacterSelected.off(this.characterSelected.bind(this));
    this.props.account.extensions.bid.config.Changed.off(this.configChanged.bind(this));
    this.props.account.extensions.bid.Started.off(this.started.bind(this));
    this.props.account.extensions.bid.Stopped.off(this.stopped.bind(this));
    this.props.account.extensions.bid.StatisticsUpdated.off(this.statisticsUpdated.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      disabled={this.state.characterConnected ? "" : "disabled"}
                      checked={this.state.running}
                      onChange={(event) => {
                        if (this.state.running) {
                          this.props.account.extensions.bid.stop();
                        } else {
                          this.props.account.extensions.bid.start();
                        }
                      }} />
                    {LanguageManager.trans("active")}
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="interval">{LanguageManager.trans("interval")}</Label>
                  <Input
                    id="interval"
                    disabled={this.state.characterConnected ? "" : "disabled"}
                    type="number" className="form-control-sm" value={this.state.interval}
                    onChange={(event) => {
                      const value = parseInt(event.target.value, 10);
                      if (!value || value < 0) { return; }
                      this.props.account.extensions.bid.config.interval = value;
                      this.props.account.extensions.bid.config.save();
                    }} />
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <Table striped bordered size="sm" responsive>
              <thead>
                <tr>
                  <th>GID</th>
                  <th>{LanguageManager.trans("name")}</th>
                  <th>{LanguageManager.trans("lot")}</th>
                  <th>{LanguageManager.trans("quantity")}</th>
                  <th>{LanguageManager.trans("minPrice")}</th>
                  <th>{LanguageManager.trans("basePrice")}</th>
                  <th>{LanguageManager.trans("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {this.state.objects.map((o, index) => (
                  <tr key={index}>
                    <td>{o.gid}</td>
                    <td>{o.name}</td>
                    <td>{o.lot}</td>
                    <td>{o.quantity}</td>
                    <td>{o.minPrice}</td>
                    <td>{o.basePrice}</td>
                    <td>
                      <Button size="sm" color="danger" onClick={() => this.deleteObject(o)}>
                        {LanguageManager.trans("delete")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col>
            {LanguageManager.trans("kamasGained")}: {this.state.kamasGained}<br />
            {LanguageManager.trans("kamasTaxes")}: {this.state.kamasPaidOnTaxes}<br />
            Script: {this.state.script}
            <Button style={{
              marginLeft: "15px",
            }} size="sm" color="info" onClick={() => {
              remote.dialog.showOpenDialog({
                filters: [
                  { name: "Cookie Scripts Format", extensions: ["js"] },
                ],
                properties: ["openFile"],
              }, (filepaths) => {
                const filepath = filepaths[0];
                this.props.account.extensions.bid.config.scriptPath = filepath;
                this.props.account.extensions.bid.config.save();
              });
            }}>
              {LanguageManager.trans("load")}
            </Button>
            <Card body inverse color="dark">
              <CardTitle>{LanguageManager.trans("addItem")}</CardTitle>
              <Form onSubmit={async (event) => {
                event.preventDefault();
                const gidString = (document.getElementById("gid") as HTMLInputElement).value;
                const gid = parseInt(gidString, 10);
                if (!gid) { return; }
                const objResp = await DataManager.get<Items>(DataTypes.Items, gid);
                if (objResp.length === 0) { return; }
                const name = objResp[0].object.nameId;
                const lotString = (document.getElementById("lot") as HTMLInputElement).value;
                const lot = parseInt(lotString, 10);
                if (!lot) { return; }
                const quantityString = (document.getElementById("quantity") as HTMLInputElement).value;
                const quantity = parseInt(quantityString, 10);
                if (!quantity) { return; }
                const minPriceString = (document.getElementById("minPrice") as HTMLInputElement).value;
                const minPrice = parseInt(minPriceString, 10);
                if (!minPrice) { return; }
                const basePriceString = (document.getElementById("basePrice") as HTMLInputElement).value;
                const basePrice = parseInt(basePriceString, 10);
                if (!basePrice) { return; }

                this.props.account.extensions.bid.config.objectsToSell.Add(
                  new ObjectToSellEntry(name, gid, lot, quantity, minPrice, basePrice),
                );
                this.props.account.extensions.bid.config.save();
              }}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="gid" className="mr-sm-2">GID</Label>
                  <Input type="number" name="gid" id="gid" />
                </FormGroup>
                <FormGroup>
                  <Label for="lot">{LanguageManager.trans("lot")}</Label>
                  <Input
                    id="lot"
                    type="select" className="form-control-sm">
                    <option value="1">1</option>
                    <option value="10">10</option>
                    <option value="100">100</option>
                  </Input>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="quantity" className="mr-sm-2">{LanguageManager.trans("quantity")}</Label>
                  <Input type="number" name="quantity" id="quantity" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="minPrice" className="mr-sm-2">{LanguageManager.trans("minPrice")}</Label>
                  <Input type="number" name="minPrice" id="minPrice" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="basePrice" className="mr-sm-2">{LanguageManager.trans("basePrice")}</Label>
                  <Input type="number" name="basePrice" id="basePrice" />
                </FormGroup>
                <br />
                <Button size="sm">{LanguageManager.trans("add")}</Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  private deleteObject(obj: ObjectToSellEntry) {
    const objects = this.state.objects.filter((o) => o.gid !== obj.gid);
    this.props.account.extensions.bid.config.objectsToSell = new List(objects);
    this.props.account.extensions.bid.config.save();
  }

  private characterSelected() {
    this.setState({ characterConnected: true });
  }

  private configChanged() {
    this.setState({
      interval: this.props.account.extensions.bid.config.interval,
      objects: this.props.account.extensions.bid.config.objectsToSell.ToArray(),
      script: this.props.account.extensions.bid.config.scriptPath,
    });
  }

  private started() {
    this.setState({ running: true });
  }

  private stopped() {
    this.setState({ running: false });
  }

  private statisticsUpdated() {
    this.setState({
      kamasGained: this.props.account.extensions.bid.kamasGained,
      kamasPaidOnTaxes: this.props.account.extensions.bid.kamasPaidOnTaxes,
    });
  }
}
