import LanguageManager from "@/configurations/language/LanguageManager";
import IEntity from "@/utils/IEntity";
import Account from "@account";
import classnames from "classnames";
import {List} from "linqts";
import * as React from "react";
import { Button, Col, Collapse, Container, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter,
  ModalHeader, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,
  Row, TabContent, TabPane, UncontrolledDropdown } from "reactstrap";
import CookieMain from "../CookieMain";
import AccountsManager from "./AccountsManager";
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
  activeAccount: string;
  activeTab: string;
  selectedAccount: Account;
  connectedAccounts: List<IEntity>;
  isOpen: boolean;
  accountsManagerModal: boolean;
  modalConfig: boolean;
}

export default class Main extends React.Component<IMainProps, IMainStates> {

  constructor(props: IMainProps) {
    super(props);

    this.state = {
      accountsManagerModal: false,
      activeAccount: "0",
      activeTab: "0",
      connectedAccounts: CookieMain.connectedAccounts,
      isOpen: false,
      modalConfig: false,
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
                <NavLink href="#" onClick={() => this.toggleAccountsManagerModal()}>{LanguageManager.trans("accountsManager")}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={() => { this.toggleModalConfig(); }}>Configuration</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <AccountsManager isOpen={this.state.accountsManagerModal} toggleModal={this.toggleAccountsManagerModal.bind(this)} />
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
    this.setState({ selectedAccount: account });
    const index = CookieMain.connectedAccounts.ToArray().indexOf(account);
    if (index === -1) {
      return;
    }
    this.setState({ activeAccount: `${index}` });
  }

  private entitiesUpdated() {
    this.setState({ connectedAccounts: CookieMain.connectedAccounts });
  }

  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  private toggleAccountsManagerModal() {
    this.setState({ accountsManagerModal: !this.state.accountsManagerModal });
  }

  private toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  private toggleModalConfig() {
    this.setState({  modalConfig: !this.state.modalConfig });
  }

  private toggleAccount(tab: string) {
    if (this.state.activeAccount !== tab) {
      CookieMain.refreshSelectedAccount(parseInt(tab, 10));
      this.setState({ activeAccount: tab });
    }
  }
}
