import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import IEntity from "@/utils/IEntity";
import Account from "@account";
import classnames from "classnames";
import {List} from "linqts";
import * as React from "react";
import {
  Button,
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
} from "reactstrap";
import CookieMain from "renderer/CookieMain";
import CharacterCreation from "./CharacterCreation";
import ConfigurationG from "./Configuration";
import Infos from "./Infos";
import Bid from "./tabs/Bid";
import Character from "./tabs/Character";
import Configuration from "./tabs/Configuration";
import Console from "./tabs/Console";
import Fights from "./tabs/Fights";
import Flood from "./tabs/Flood";
import Inventory from "./tabs/Inventory";
import Map from "./tabs/Map";
import Statistics from "./tabs/Statistics";

interface IMainProps {
  //
}

interface IMainStates {
  accountsList: AccountConfiguration[];
  activeAccount: string;
  activeTab: string;
  selectedAccount: Account;
  connectedAccounts: List<IEntity>;
  isOpen: boolean;
  modal: boolean;
  modalConfig: boolean;
  modalItem: string;
}

export default class Main extends React.Component<IMainProps, IMainStates> {

  constructor(props: IMainProps) {
    super(props);

    this.state = {
      accountsList: GlobalConfiguration.accountsList,
      activeAccount: "0",
      activeTab: "0",
      connectedAccounts: CookieMain.connectedAccounts,
      isOpen: false,
      modal: false,
      modalConfig: false,
      modalItem: "0",
      selectedAccount: CookieMain.selectedAccount,
    };
  }

  public componentDidMount() {
    CookieMain.SelectedAccountChanged.on(this.selectedAccountChanged.bind(this));
    CookieMain.EntitiesUpdated.on(this.entitiesUpdated.bind(this));
  }

  public componentWillUnmount() {
    CookieMain.SelectedAccountChanged.off(this.selectedAccountChanged.bind(this));
    CookieMain.EntitiesUpdated.off(this.entitiesUpdated.bind(this));
  }

  public render() {
    return (
      <Container fluid={true}>
        <Navbar dark expand="md">
          <NavbarBrand href="#">CookieTouch</NavbarBrand>
          <NavbarToggler onClick={() => this.toggleOpen()}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#" onClick={() => {
                  this.toggleModal();
                }}>{LanguageManager.trans("accountsManager")}</NavLink>
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
          <ModalHeader toggle={() => this.toggleModal()}>{LanguageManager.trans("accountsManager")}</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="3">
                <ListGroup>
                  <ListGroupItem
                    color="dark"
                    className={classnames({active: this.state.modalItem === "0"})}
                  >
                    <NavLink onClick={() => {
                      this.toggleModalItem("0");
                    }}>
                      Connect Accounts
                    </NavLink>
                  </ListGroupItem>
                  <ListGroupItem
                    color="dark"
                    className={classnames({active: this.state.modalItem === "1"})}
                  >
                    <NavLink onClick={() => {
                      this.toggleModalItem("1");
                    }}>
                      Add Accounts
                    </NavLink>
                  </ListGroupItem>
                  <ListGroupItem
                    color="dark"
                    className={classnames({active: this.state.modalItem === "2"})}
                  >
                    <NavLink onClick={() => {
                      this.toggleModalItem("2");
                    }}>
                      Character Creator
                    </NavLink>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <TabContent activeTab={this.state.modalItem}>
                  <TabPane tabId="0">
                    <ListGroup>
                      {this.state.accountsList.map((elem, index) => (
                        // TODO: see for groups...
                        <ListGroupItem className="clearfix" key={index}>
                          <NavLink className="float-left" onClick={(e) => {
                            CookieMain.connectAccounts(new List([elem]));
                            this.toggleModal();
                          }}>
                            {elem.username}
                          </NavLink>
                          <Button size="sm" className="float-right" onClick={() => {
                            GlobalConfiguration.removeAccount(elem);
                            GlobalConfiguration.save();
                            this.setState({
                              accountsList: GlobalConfiguration.accountsList,
                            });
                          }} outline color="danger">X</Button>
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
                      this.setState({
                        accountsList: GlobalConfiguration.accountsList,
                      });
                    }}>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="username" className="mr-sm-2">{LanguageManager.trans("username")}</Label>
                        <Input type="text" name="text" id="username"/>
                      </FormGroup>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">{LanguageManager.trans("password")}</Label>
                        <Input type="password" name="password" id="examplePassword"/>
                      </FormGroup>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="server" className="mr-sm-2">{LanguageManager.trans("server")}</Label>
                        <Input type="text" name="text" id="server"/>
                      </FormGroup>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="character" className="mr-sm-2">{LanguageManager.trans("character")}</Label>
                        <Input type="text" name="text" id="character"/>
                      </FormGroup>
                      <br/>
                      <Button size="sm">{LanguageManager.trans("add")}</Button>
                    </Form>
                  </TabPane>
                  <TabPane tabId="2">
                    <CharacterCreation/>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="secondary" onClick={() => this.toggleModal()}>{LanguageManager.trans("cancel")}</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalConfig} size="lg" toggle={() => this.toggleModalConfig()}>
          <ModalHeader toggle={() => this.toggleModalConfig()}>Configuration</ModalHeader>
          <ModalBody>
            <ConfigurationG/>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="dark" onClick={() => this.toggleModalConfig()}>{LanguageManager.trans("close")}</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col xs="2">
            <ListGroup>
              {this.state.connectedAccounts.ToArray().map((item, index) => (
                <ListGroupItem
                  key={index}
                  color="dark"
                  className={classnames({active: this.state.activeAccount === `${index}`})}
                >
                  <NavLink onClick={() => {
                    this.toggleAccount(`${index}`);
                  }}>
                    {(item as Account).accountConfig.username}
                  </NavLink>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <TabContent activeTab={this.state.activeAccount}>
              {this.state.connectedAccounts.ToArray().map((item, index) => (
                <TabPane key={index} tabId={`${index}`}>
                  <Infos removeSelectedAccount={this.removeSelectedAccount.bind(this)} account={this.state.selectedAccount}/>
                  <Nav pills justified>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === "0"})}
                        onClick={() => { this.toggle("0"); }}
                      >
                        Console
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === "1"})}
                        onClick={() => { this.toggle("1"); }}
                      >
                        {LanguageManager.trans("character")}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === "2"})}
                        onClick={() => { this.toggle("2"); }}
                      >
                        {LanguageManager.trans("inventory")}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === "3"})}
                        onClick={() => { this.toggle("3"); }}
                      >
                        Map
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === "4"})}
                        onClick={() => { this.toggle("4"); }}
                      >
                        {LanguageManager.trans("fight")}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === "5"})}
                        onClick={() => { this.toggle("5"); }}
                      >
                        Flood
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === "6"})}
                        onClick={() => { this.toggle("6"); }}
                      >
                        {LanguageManager.trans("bid")}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === "7"})}
                        onClick={() => { this.toggle("7"); }}
                      >
                        Stats
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === "8"})}
                        onClick={() => { this.toggle("8"); }}
                      >
                        Configuration
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <hr/>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="0">
                      <Console account={this.state.selectedAccount}/>
                    </TabPane>
                    <TabPane tabId="1">
                      <Character account={this.state.selectedAccount}/>
                    </TabPane>
                    <TabPane tabId="2">
                      <Inventory account={this.state.selectedAccount}/>
                    </TabPane>
                    <TabPane tabId="3">
                      <Map account={this.state.selectedAccount}/>
                    </TabPane>
                    <TabPane tabId="4">
                      <Fights account={this.state.selectedAccount}/>
                    </TabPane>
                    <TabPane tabId="5">
                      <Flood account={this.state.selectedAccount}/>
                    </TabPane>
                    <TabPane tabId="6">
                      <Bid account={this.state.selectedAccount}/>
                    </TabPane>
                    <TabPane tabId="7">
                      <Statistics account={this.state.selectedAccount}/>
                    </TabPane>
                    <TabPane tabId="8">
                      <Configuration account={this.state.selectedAccount}/>
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

  private removeSelectedAccount() {
    CookieMain.removeSelectedAccount();
  }

  private selectedAccountChanged(account: Account) {
    this.setState({
      selectedAccount: account,
    });
  }

  private entitiesUpdated() {
    this.setState({
      accountsList: GlobalConfiguration.accountsList,
      connectedAccounts: CookieMain.connectedAccounts,
    });
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
      CookieMain.refreshSelectedAccount(parseInt(tab, 10));
      this.setState({
        activeAccount: tab,
      });
    }
  }
}
