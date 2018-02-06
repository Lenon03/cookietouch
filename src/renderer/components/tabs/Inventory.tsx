import LanguageManager from "@/configurations/language/LanguageManager";
import ObjectEntry from "@/game/character/inventory/ObjectEntry";
import {CharacterInventoryPositionEnum} from "@/protocol/enums/CharacterInventoryPositionEnum";
import Account from "@account";
import classnames from "classnames";
import * as React from "react";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane,
} from "reactstrap";

enum DeleteDropUseChoice { Delete, Drop, Use }

interface IInventoryProps {
  account: Account;
}

interface IInventoryStates {
  activeTab: string;
  deleteDropUseChoice: DeleteDropUseChoice;
  consumables: ObjectEntry[];
  equipments: ObjectEntry[];
  quantity: number;
  questObjects: ObjectEntry[];
  object: ObjectEntry;
  resources: ObjectEntry[];
  modal: boolean;
}

export default class Inventory extends React.Component<IInventoryProps, IInventoryStates> {

  constructor(props: IInventoryProps) {
    super(props);
    this.state = {
      activeTab: "0",
      consumables: [],
      deleteDropUseChoice: DeleteDropUseChoice.Delete,
      equipments: [],
      modal: false,
      object: null,
      quantity: -1,
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
                className={classnames({active: this.state.activeTab === "0"})}
                onClick={() => {
                  this.toggle("0");
                }}
              >
                {LanguageManager.trans("equipments")}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({active: this.state.activeTab === "1"})}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                {LanguageManager.trans("consumables")}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({active: this.state.activeTab === "2"})}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Resources
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({active: this.state.activeTab === "3"})}
                onClick={() => {
                  this.toggle("3");
                }}
              >
                {LanguageManager.trans("questobjects")}
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        <hr/>
        <Row>
          <Col>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="0">
                <Table striped bordered size="sm" responsive>
                  <thead>
                  <tr>
                    <th></th>
                    <th>GID</th>
                    <th>{LanguageManager.trans("name")}</th>
                    <th>{LanguageManager.trans("quantity")}</th>
                    <th>Position</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.equipments.map((c, index) => (
                    <tr key={index}>
                      <td><img width="25" height="25" src={c.iconUrl} alt={c.name}/></td>
                      <td>{c.gid}</td>
                      <td>{c.name}</td>
                      <td>{c.quantity}</td>
                      <td>{CharacterInventoryPositionEnum[c.position]}</td>
                      <td>
                        <Button size="sm" color="dark" onClick={() => this.equipUnEquipItem(c)}>
                          {c.position !== CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED
                            ? LanguageManager.trans("unequip") : LanguageManager.trans("equip")}
                        </Button>
                        <Button size="sm" color="dark" onClick={() => this.dropItem(c)}>
                          {LanguageManager.trans("drop")}
                        </Button>
                        <Button size="sm" color="danger" onClick={() => this.deleteItem(c)}>
                          {LanguageManager.trans("delete")}
                        </Button>
                      </td>
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
                    <th>{LanguageManager.trans("name")}</th>
                    <th>{LanguageManager.trans("quantity")}</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.consumables.map((c, index) => (
                    <tr key={index}>
                      <td><img width="25" height="25" src={c.iconUrl} alt={c.name}/></td>
                      <td>{c.gid}</td>
                      <td>{c.name}</td>
                      <td>{c.quantity}</td>
                      <td>
                        <Button size="sm" color="dark" onClick={() => this.useObject(c)}>
                          {LanguageManager.trans("use")}
                        </Button>
                        <Button size="sm" color="dark" onClick={() => this.dropItem(c)}>
                          {LanguageManager.trans("drop")}
                        </Button>
                        <Button size="sm" color="danger" onClick={() => this.deleteItem(c)}>
                          {LanguageManager.trans("delete")}
                        </Button>
                      </td>
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
                    <th>{LanguageManager.trans("name")}</th>
                    <th>{LanguageManager.trans("quantity")}</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.resources.map((c, index) => (
                    <tr key={index}>
                      <td><img width="25" height="25" src={c.iconUrl} alt={c.name}/></td>
                      <td>{c.gid}</td>
                      <td>{c.name}</td>
                      <td>{c.quantity}</td>
                      <td>
                        <Button size="sm" color="dark" onClick={() => this.dropItem(c)}>
                          {LanguageManager.trans("drop")}
                        </Button>
                        <Button size="sm" color="danger" onClick={() => this.deleteItem(c)}>
                          {LanguageManager.trans("delete")}
                        </Button>
                      </td>
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
                    <th>{LanguageManager.trans("name")}</th>
                    <th>{LanguageManager.trans("quantity")}</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.questObjects.map((c, index) => (
                    <tr key={index}>
                      <td><img width="25" height="25" src={c.iconUrl} alt={c.name}/></td>
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
        <Modal isOpen={this.state.modal} toggle={() => this.toggleModal()}>
          <ModalHeader toggle={() => this.toggleModal()}>{DeleteDropUseChoice[this.state.deleteDropUseChoice]} ?</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="qty">Combien voulez vous {DeleteDropUseChoice[this.state.deleteDropUseChoice]} ?</Label>
              <Input
                id="qty"
                type="number" className="form-control-sm" value={this.state.quantity}
                onChange={(event) => {
                  const value = parseInt(event.target.value, 10);
                  if (!value) {
                    return;
                  }
                  this.setState({quantity: value});
                }}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => {
              if (this.state.deleteDropUseChoice === DeleteDropUseChoice.Delete) {
                this.props.account.game.character.inventory.deleteObject(this.state.object, this.state.quantity);
              } else if (this.state.deleteDropUseChoice === DeleteDropUseChoice.Drop) {
                this.props.account.game.character.inventory.dropObject(this.state.object, this.state.quantity);
              } else if (this.state.deleteDropUseChoice === DeleteDropUseChoice.Use) {
                this.props.account.game.character.inventory.useObject(this.state.object, this.state.quantity);
              }
              this.setState({quantity: -1, object: null});
              this.toggleModal();
            }}>{DeleteDropUseChoice[this.state.deleteDropUseChoice]}</Button>
            <Button color="danger" onClick={() => this.toggleModal()}>{LanguageManager.trans("cancel")}</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }

  private equipUnEquipItem(obj: ObjectEntry) {
    if (obj.position !== CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED) {
      this.props.account.game.character.inventory.unEquipObject(obj);
    } else {
      this.props.account.game.character.inventory.equipObject(obj);
    }
  }

  private dropItem(obj: ObjectEntry) {
    this.setState({
      deleteDropUseChoice: DeleteDropUseChoice.Drop,
      object: obj,
    });
    this.toggleModal();
  }

  private deleteItem(obj: ObjectEntry) {
    this.setState({
      deleteDropUseChoice: DeleteDropUseChoice.Delete,
      object: obj,
    });
    this.toggleModal();
  }

  private useObject(obj: ObjectEntry) {
    this.setState({
      deleteDropUseChoice: DeleteDropUseChoice.Use,
      object: obj,
    });
    this.toggleModal();
  }

  private toggleModal() {
    this.setState({modal: !this.state.modal});
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
