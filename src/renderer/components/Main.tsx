import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import Group from "@/groups/Group";
import IEntity from "@/utils/IEntity";
import { sleep } from "@/utils/Time";
import Account from "@account";
import classnames from "classnames";
import { List } from "linqts";
import * as React from "react";
import { Button, Col, Container, ListGroup, ListGroupItem, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import Console from "./tabs/Console";
import Infos from "./tabs/Infos";

interface IMainProps {
  //
}

interface IMainStates {
  activeAccount: string;
  activeTab: string;
  selectedAccount: Account;
  entities: List<IEntity>;
}

export default class Main extends React.Component<IMainProps, IMainStates> {

  constructor(props: IMainProps) {
    super(props);

    this.state = {
      activeAccount: "0",
      activeTab: "0",
      entities: new List(),
      selectedAccount: null,
    };
  }

  public componentDidMount() {
    setTimeout(() => {
      this.connectAccounts(new List(GlobalConfiguration.getAccountsList(this.state.entities)));
    }, 2000);
  }

  public render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col xs="3">
            <ListGroup>
              {this.state.entities.ToArray().map((item, index) => (
                <ListGroupItem
                  key={index}
                  color="secondary"
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
                  <h4>{(item as Account).accountConfig.username}</h4>
                  <Button onClick={() => this.toggleConnect()}>
                    {this.state.selectedAccount.network.connected ? "Disconnect" : "Connect" }
                  </Button>
                  <Nav tabs>
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
                        Infos
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="0">
                      <Console account={this.state.selectedAccount} />
                    </TabPane>
                    <TabPane tabId="1">
                      <Infos account={this.state.selectedAccount} />
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

  private toggleAccount(tab: string) {
    if (this.state.activeAccount !== tab) {
      this.setState({
        activeAccount: tab,
      });
    }
  }

  private toggleConnect() {
    if (this.state.selectedAccount.network.connected) {
      this.state.selectedAccount.stop();
    } else {
      this.state.selectedAccount.start();
    }
  }
}
