import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import Group from "@/groups/Group";
import IEntity from "@/utils/IEntity";
import { sleep } from "@/utils/Time";
import Account from "@account";
import classnames from "classnames";
import { List } from "linqts";
import * as React from "react";
import {
  Button, Col, Collapse, Container, DropdownItem, DropdownMenu,
  DropdownToggle, Form, FormGroup, Input, Label,
  ListGroup, ListGroupItem, Modal, ModalBody,
  ModalFooter, ModalHeader, Nav, Navbar, NavbarBrand,
  NavbarToggler, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledDropdown,
} from "reactstrap";
import ConfigurationG from "./Configuration";
import Infos from "./Infos";
import Bid from "./tabs/Bid";
import Character from "./tabs/Character";
import Configuration from "./tabs/Configuration";
import Console from "./tabs/Console";
import Fights from "./tabs/Fights";
import Flood from "./tabs/Flood";
import Inventory from "./tabs/Inventory";
import Jobs from "./tabs/Jobs";
import Map from "./tabs/Map";
import Statistics from "./tabs/Statistics";

interface IMainProps {
  //
}

interface IMainStates {
  activeAccount: string;
  activeTab: string;
  selectedAccount: Account;
  entities: List<IEntity>;
  isOpen: boolean;
  modal: boolean;
  modalConfig: boolean;
  modalItem: string;
}

export default class Main extends React.Component<IMainProps, IMainStates> {

  constructor(props: IMainProps) {
    super(props);

    this.state = {
      activeAccount: "0",
      activeTab: "0",
      entities: new List(),
      isOpen: false,
      modal: false,
      modalConfig: false,
      modalItem: "0",
      selectedAccount: null,
    };
  }

  public render() {
    return (
      <Container fluid={true}>
        <Navbar dark expand="md">
          <NavbarBrand href="#">CookieTouch</NavbarBrand>
          <NavbarToggler onClick={() => this.toggleOpen()} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#" onClick={() => {
                  this.toggleModal();
                }}>Accounts Manager</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={() => {
                  this.toggleModalConfig();
                }}>Configuration</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Modal isOpen={this.state.modal} size="lg" toggle={() => this.toggleModal()}>
          <ModalHeader toggle={() => this.toggleModal()}>Accounts Manager</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="3">
                <ListGroup>
                  <ListGroupItem
                    color="primary"
                    className={classnames({ active: this.state.modalItem === "0" })}
                  >
                    <NavLink onClick={() => { this.toggleModalItem("0"); }}>
                      Connect Accounts
                    </NavLink>
                  </ListGroupItem>
                  <ListGroupItem
                    color="primary"
                    className={classnames({ active: this.state.modalItem === "1" })}
                  >
                    <NavLink onClick={() => { this.toggleModalItem("1"); }}>
                      Add accounts
                    </NavLink>
                  </ListGroupItem>
                  <ListGroupItem
                    color="primary"
                    className={classnames({ active: this.state.modalItem === "2" })}
                  >
                    <NavLink onClick={() => { this.toggleModalItem("2"); }}>
                      Character Creator
                    </NavLink>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <TabContent activeTab={this.state.modalItem}>
                  <TabPane tabId="0">
                    <ListGroup>
                      {GlobalConfiguration.getAccountsList(this.state.entities).map((elem, index) => (
                        <ListGroupItem onClick={(e) => {
                          this.connectAccounts(new List([elem]));
                        }} key={index}>
                          {elem.username}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </TabPane>
                  <TabPane tabId="1">
                    <Form onSubmit={(event) => {
                      event.preventDefault();
                      const username = (document.getElementById("username") as HTMLInputElement).value;
                      const password = (document.getElementById("examplePassword") as HTMLInputElement).value;
                      const server = (document.getElementById("server") as HTMLInputElement).value;
                      const character = (document.getElementById("character") as HTMLInputElement).value;
                      GlobalConfiguration.addAccountAndSave(username, password, server, character);
                    }}>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="username" className="mr-sm-2">Nom de compte</Label>
                        <Input type="text" name="text" id="username" />
                      </FormGroup>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">Mot de passe</Label>
                        <Input type="password" name="password" id="examplePassword" />
                      </FormGroup>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="server" className="mr-sm-2">Serveur</Label>
                        <Input type="text" name="text" id="server" />
                      </FormGroup>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="character" className="mr-sm-2">Personnage</Label>
                        <Input type="text" name="text" id="character" />
                      </FormGroup>
                      <br />
                      <Button>Submit</Button>
                    </Form>
                  </TabPane>
                  <TabPane tabId="2">
                    form to add characters to create
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggleModal()}>Do Something</Button>
            <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalConfig} size="lg" toggle={() => this.toggleModalConfig()}>
          <ModalHeader toggle={() => this.toggleModalConfig()}>Configuration</ModalHeader>
          <ModalBody>
            <ConfigurationG />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggleModalConfig()}>Close</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col xs="2">
            <ListGroup>
              {this.state.entities.ToArray().map((item, index) => (
                <ListGroupItem
                  key={index}
                  color="primary"
                  className={classnames({ active: this.state.activeAccount === `${index}` })}
                >
                  <NavLink onClick={() => { this.toggleAccount(`${index}`); }}>
                    {(item as Account).accountConfig.username}
                  </NavLink>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <TabContent activeTab={this.state.activeAccount}>
              {this.state.entities.ToArray().map((item, index) => (
                <TabPane key={index} tabId={`${index}`}>
                  <Infos removeSelectedAccount={this.removeSelectedAccount.bind(this)} account={this.state.selectedAccount} />
                  <br />
                  <Nav pills>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "0" })}
                        onClick={() => { this.toggle("0"); }}
                      >
                        Console
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "1" })}
                        onClick={() => { this.toggle("1"); }}
                      >
                        Character
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "2" })}
                        onClick={() => { this.toggle("2"); }}
                      >
                        Jobs
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "3" })}
                        onClick={() => { this.toggle("3"); }}
                      >
                        Inventory
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "4" })}
                        onClick={() => { this.toggle("4"); }}
                      >
                        Map
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "5" })}
                        onClick={() => { this.toggle("5"); }}
                      >
                        Combat
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "6" })}
                        onClick={() => { this.toggle("6"); }}
                      >
                        Flood
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "7" })}
                        onClick={() => { this.toggle("7"); }}
                      >
                        HDV
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "8" })}
                        onClick={() => { this.toggle("8"); }}
                      >
                        Stats
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === "9" })}
                        onClick={() => { this.toggle("9"); }}
                      >
                        Configuration
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="0">
                      <Console account={this.state.selectedAccount} />
                    </TabPane>
                    <TabPane tabId="1">
                      <Character account={this.state.selectedAccount} />
                    </TabPane>
                    <TabPane tabId="2">
                      <Jobs account={this.state.selectedAccount} />
                    </TabPane>
                    <TabPane tabId="3">
                      <Inventory account={this.state.selectedAccount} />
                    </TabPane>
                    <TabPane tabId="4">
                      <Map account={this.state.selectedAccount} />
                    </TabPane>
                    <TabPane tabId="5">
                      <Fights account={this.state.selectedAccount} />
                    </TabPane>
                    <TabPane tabId="6">
                      <Flood account={this.state.selectedAccount} />
                    </TabPane>
                    <TabPane tabId="7">
                      <Bid account={this.state.selectedAccount} />
                    </TabPane>
                    <TabPane tabId="8">
                      <Statistics account={this.state.selectedAccount} />
                    </TabPane>
                    <TabPane tabId="9">
                      <Configuration account={this.state.selectedAccount} />
                    </TabPane>
                  </TabContent>
                </TabPane>
              ))}
            </TabContent>
          </Col>
        </Row>
      </Container>
    );
  }

  public get connectedAccounts(): List<Account> {
    return this.state.entities.Select((e) => {
      if (e instanceof Account) {
        return e;
      }
      return (e as Group).chief;
    });
  }

  public connectAccounts(accountConfigs: List<AccountConfiguration>) {
    accountConfigs.ForEach((accountConfig) => {
      const account = new Account(accountConfig);
      this.state.entities.Add(account);
      this.setState({
        selectedAccount: account,
      });
      account.start();
    });
  }

  public connectGroup(chief: AccountConfiguration, members: List<AccountConfiguration>) {
    const group = new Group(new Account(chief));
    members.ForEach((m) => group.addMember(new Account(m)));
    this.state.entities.Add(group);
    this.setState({
      selectedAccount: group.chief,
    });
    group.connect();
  }

  public async removeSelectedAccount() {
    if (!this.state.selectedAccount) {
      return;
    }
    let account = this.state.selectedAccount;
    let index = -1;

    // Remove the account from the list
    for (let i = this.state.entities.Count() - 1; i >= 0; i--) {
      const entity = this.state.entities.ElementAt(i);
      if (entity instanceof Account && entity === account) {
        index = i;
        await this.disconnectAccount(account);
        this.state.entities.RemoveAt(i);
        break;
      }
      if (entity instanceof Group) {
        // In case the user wants to remove the chief, remove the whole group
        if (entity.chief === account) {
          await this.removeGroup(entity, i);
          return;
        }
        for (let j = entity.members.Count(); j >= 0; j--) {
          if (entity.members.ElementAt(j) !== account) {
            continue;
          }
          index = i;
          await this.disconnectAccount(account);
          entity.members.RemoveAt(j);
          break;
        }
      }
    }
    // Set another account as a selectedAccount
    this.refreshSelectedAccount(index);
    // Dispose
    account = null;
  }

  public async removeGroup(group: Group, index: number) {
    // Disconnect the chief
    await this.disconnectAccount(group.chief);
    // Disconnect the members
    for (let i = group.members.Count() - 1; i >= 0; i--) {
      await this.disconnectAccount(group.members.ElementAt(i));
    }
    // Remove the group from entities
    this.state.entities.RemoveAt(index);
    // Set another account as a selectedAccount
    this.refreshSelectedAccount(index);
    // Dispose
    group = null;
  }

  public async disconnectAccount(account: Account) {
    if (account.network.connected) {
      account.network.close();
      await sleep(400);
    }
  }

  private refreshSelectedAccount(index: number) {
    // If there are no account left, set it to null
    if (this.state.entities.Count() === 0 || index === -1) {
      this.setState({
        selectedAccount: null,
      });
    } else {
      // Otherwise look for another one
      index = index > this.state.entities.Count() - 1 ? this.state.entities.Count() - 1 : index;
      const entity = this.state.entities.ElementAt(index);
      if (entity instanceof Group) {
        this.setState({
          selectedAccount: entity.chief,
        });
      } else {
        this.setState({
          selectedAccount: entity as Account,
        });
      }
    }
  }

  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  private toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  private toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  private toggleModalConfig() {
    this.setState({
      modalConfig: !this.state.modalConfig,
    });
  }

  private toggleModalItem(tab: string) {
    if (this.state.modalItem !== tab) {
      this.setState({
        modalItem: tab,
      });
    }
  }

  private toggleAccount(tab: string) {
    if (this.state.activeAccount !== tab) {
      this.refreshSelectedAccount(parseInt(tab, 10));
      this.setState({
        activeAccount: tab,
      });
    }
  }
}
