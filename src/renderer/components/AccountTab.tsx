import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import classnames from "classnames";
import * as React from "react";
import {
  Col, Collapse, Container, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter,
  ModalHeader, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,
  Row, TabContent, TabPane, UncontrolledDropdown,
} from "reactstrap";
import CookieMain from "../CookieMain";
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

interface IAccountTabProps {
  //
}

interface IAccountTabStates {
  activeTab: string;
  selectedAccount: Account;
}

export default class AccountTab extends React.Component<IAccountTabProps, IAccountTabStates> {

  constructor(props: IAccountTabProps) {
    super(props);
    this.state = {
      activeTab: "0",
      selectedAccount: CookieMain.selectedAccount,
    };
  }

  public componentDidMount() {
    CookieMain.SelectedAccountChanged.on(this.selectedAccountChanged.bind(this));
  }

  public componentWillUnmount() {
    CookieMain.SelectedAccountChanged.off(this.selectedAccountChanged.bind(this));
  }

  public render() {
    if (!this.state.selectedAccount) {
      return "";
    }
    return (
      <Container fluid={true}>
        {this.state.selectedAccount.accountConfig.username}
        <Infos account={this.state.selectedAccount} />
        <Nav pills justified>
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
              {LanguageManager.trans("character")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => { this.toggle("2"); }}
            >
              {LanguageManager.trans("inventory")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => { this.toggle("3"); }}
            >
              Map
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => { this.toggle("4"); }}
            >
              {LanguageManager.trans("fight")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "5" })}
              onClick={() => { this.toggle("5"); }}
            >
              Flood
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "6" })}
              onClick={() => { this.toggle("6"); }}
            >
              {LanguageManager.trans("bid")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "7" })}
              onClick={() => { this.toggle("7"); }}
            >
              Stats
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "8" })}
              onClick={() => { this.toggle("8"); }}
            >
              Configuration
            </NavLink>
          </NavItem>
        </Nav>
        <hr />
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="0">
            <Console account={this.state.selectedAccount} />
          </TabPane>
          <TabPane tabId="1">
            <Character account={this.state.selectedAccount} />
          </TabPane>
          <TabPane tabId="2">
            <Inventory account={this.state.selectedAccount} />
          </TabPane>
          <TabPane tabId="3">
            <Map account={this.state.selectedAccount} />
          </TabPane>
          <TabPane tabId="4">
            <Fights account={this.state.selectedAccount} />
          </TabPane>
          <TabPane tabId="5">
            <Flood account={this.state.selectedAccount} />
          </TabPane>
          <TabPane tabId="6">
            <Bid account={this.state.selectedAccount} />
          </TabPane>
          <TabPane tabId="7">
            <Statistics account={this.state.selectedAccount} />
          </TabPane>
          <TabPane tabId="8">
            <Configuration account={this.state.selectedAccount} />
          </TabPane>
        </TabContent>
      </Container>
    );
  }

  private selectedAccountChanged(account: Account) {
    this.setState({ selectedAccount: account });
  }

  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }
}
