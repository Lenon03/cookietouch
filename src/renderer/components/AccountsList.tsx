import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import { List } from "linqts";
import * as React from "react";
import { Button, Container, ListGroup, ListGroupItem, NavLink, Row, Table } from "reactstrap";
import CookieMain from "../CookieMain";

interface IAccountsListProps {
  toggleModal: () => void;
}

interface IAccountsListStates {
  accountsList: AccountConfiguration[];
  accountsToConnect: AccountConfiguration[];
}

export default class AccountsList extends React.Component<IAccountsListProps, IAccountsListStates> {

  constructor(props: IAccountsListProps) {
    super(props);

    this.state = {
      accountsList: GlobalConfiguration.accountsList,
      accountsToConnect: [],
    };
  }

  public componentDidMount() {
    CookieMain.EntitiesUpdated.on(this.entitiesUpdated.bind(this));
  }

  public componentWillUnmount() {
    CookieMain.EntitiesUpdated.off(this.entitiesUpdated.bind(this));
  }

  public render() {
    return (
      <Container fluid={true}>
        <Row>
          <Table striped bordered size="sm" responsive>
            <thead>
              <tr>
                <th>{LanguageManager.trans("name")}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.accountsList.map((ac, index) => (
                <tr key={index}
                  onClick={() => this.accountClicked(ac)}
                  className={this.state.accountsToConnect.includes(ac) ? "table-primary" : ""}
                >
                  <td>{ac.username}</td>
                  <td>
                    <Button size="sm" onClick={() => this.removeAccount(ac)} outline color="danger">X</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button size="sm"
            onClick={() => this.connectSelectedAccounts()}
            disabled={this.state.accountsToConnect.length > 0 ? false : true}
            color="primary"
          >
            {LanguageManager.trans("connect")}
          </Button>
        </Row>
      </Container>
    );
  }

  private entitiesUpdated() {
    this.setState({ accountsList: GlobalConfiguration.accountsList });
  }

  private removeAccount(accountConfig: AccountConfiguration) {
    GlobalConfiguration.removeAccount(accountConfig);
    GlobalConfiguration.save();
    this.setState({ accountsList: GlobalConfiguration.accountsList });
  }

  private connectSelectedAccounts() {
    if (this.state.accountsToConnect.length > 1 && this.state.accountsToConnect.length <= 8) {
      // Ask for connect as groups
      const asGroup = true;
      // Choose the chief and others
      const chief = this.state.accountsToConnect[0];
      const members = this.state.accountsToConnect.filter((a) => a.username !== chief.username);

      if (asGroup) {
        CookieMain.connectGroup(chief, new List(members));
      } else {
        CookieMain.connectAccounts(new List(this.state.accountsToConnect));
      }
    } else {
      CookieMain.connectAccounts(new List(this.state.accountsToConnect));
    }

    this.setState({ accountsToConnect: [] });
    this.props.toggleModal();
  }

  private accountClicked(account: AccountConfiguration) {
    this.setState((prevState) => ({
      accountsToConnect: prevState.accountsToConnect.includes(account)
        ? prevState.accountsToConnect.filter((a) => a.username !== account.username)
        : prevState.accountsToConnect.concat([account]),
    }));
  }
}
