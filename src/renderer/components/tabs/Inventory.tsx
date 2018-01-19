import ObjectEntry from "@/game/character/inventory/ObjectEntry";
import Account from "@account";
import classnames from "classnames";
import * as React from "react";
import {
  Col, Container,
  Nav, NavItem, NavLink, Row, TabContent,
  Table, TabPane,
} from "reactstrap";

interface IInventoryProps {
  account: Account;
}

interface IInventoryStates {
  activeTab: string;
  consumables: ObjectEntry[];
  equipments: ObjectEntry[];
  questObjects: ObjectEntry[];
  resources: ObjectEntry[];
}

export default class Inventory extends React.Component<IInventoryProps, IInventoryStates> {

  constructor(props: IInventoryProps) {
    super(props);
    this.state = {
      activeTab: "0",
      consumables: [],
      equipments: [],
      questObjects: [],
      resources: [],
    };
  }

  public componentDidMount() {
    this.props.account.game.character.inventory.InventoryUpdated.on(this.inventoryUpdated.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.inventory.InventoryUpdated.off(this.inventoryUpdated.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Nav pills>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "0" })}
                onClick={() => { this.toggle("0"); }}
              >
                Equipments
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => { this.toggle("1"); }}
              >
                Consumables
              </NavLink>
            </NavItem>
            <NavItem color="warning">
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => { this.toggle("2"); }}
              >
                Resources
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "3" })}
                onClick={() => { this.toggle("3"); }}
              >
                Quest Objects
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        <Row>
          <Col>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="0">
                <Table striped bordered size="sm" responsive>
                  <thead>
                    <tr>
                      <th></th>
                      <th>GID</th>
                      <th>Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.equipments.map((c, index) => (
                      <tr key={index}>
                        <td><img width="40" height="40" src={c.iconUrl} alt={c.name} /></td>
                        <td>{c.gid}</td>
                        <td>{c.name}</td>
                        <td>{c.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TabPane>
              <TabPane tabId="1">
              <Table striped bordered size="sm" responsive>
                  <thead>
                    <tr>
                      <th></th>
                      <th>GID</th>
                      <th>Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.consumables.map((c, index) => (
                      <tr key={index}>
                        <td><img width="40" height="40" src={c.iconUrl} alt={c.name} /></td>
                        <td>{c.gid}</td>
                        <td>{c.name}</td>
                        <td>{c.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TabPane>
              <TabPane tabId="2">
              <Table striped bordered size="sm" responsive>
                  <thead>
                    <tr>
                      <th></th>
                      <th>GID</th>
                      <th>Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.resources.map((c, index) => (
                      <tr key={index}>
                        <td><img width="40" height="40" src={c.iconUrl} alt={c.name} /></td>
                        <td>{c.gid}</td>
                        <td>{c.name}</td>
                        <td>{c.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TabPane>
              <TabPane tabId="3">
              <Table striped bordered size="sm" responsive>
                  <thead>
                    <tr>
                      <th></th>
                      <th>GID</th>
                      <th>Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.questObjects.map((c, index) => (
                      <tr key={index}>
                        <td><img width="40" height="40" src={c.iconUrl} alt={c.name} /></td>
                        <td>{c.gid}</td>
                        <td>{c.name}</td>
                        <td>{c.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    );
  }

  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  private inventoryUpdated(withObject: boolean) {
    this.setState({
      consumables: this.props.account.game.character.inventory.consumables.ToArray(),
      equipments: this.props.account.game.character.inventory.equipments.ToArray(),
      questObjects: this.props.account.game.character.inventory.questObjects.ToArray(),
      resources: this.props.account.game.character.inventory.resources.ToArray(),
    });
  }
}
