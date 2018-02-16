import Group from "@/groups/Group";
import Account from "@account";
import { List } from "linqts";
import * as React from "react";
import { Container, ListGroup } from "reactstrap";
import CookieMain from "../CookieMain";
import AccountItem from "./AccountItem";

interface IAccountsMenuProps {
  //
}

interface IAccountsMenuStates {
  connectedAccounts: List<Account>;
}

export default class AccountsMenu extends React.Component<IAccountsMenuProps, IAccountsMenuStates> {

  constructor(props: IAccountsMenuProps) {
    super(props);
    this.state = {
      connectedAccounts: CookieMain.connectedAccounts,
    };
  }

  public componentDidMount() {
    CookieMain.EntitiesUpdated.on(this.entitiesUpdated.bind(this));
  }

  public componentWillUnmount() {
    CookieMain.EntitiesUpdated.off(this.entitiesUpdated.bind(this));
  }

  public render() {
    let mydata = null;
    {
      mydata = this.state.connectedAccounts.ToArray().map((e, index) => {
        if (e.hasGroup) {
          return <Container key={index} fluid={true}>
            <AccountItem account={e.group.chief} />
            {e.group.members.ToArray().map((m, idx) => (
              <AccountItem key={idx} account={m} />
            ))}
          </Container>;
        } else {
          return <AccountItem key={index} account={e} />;
        }
      });
    }

    return (
      <Container fluid={true}>
        <ListGroup>
          {mydata}
        </ListGroup>
      </Container>
    );
  }

  private entitiesUpdated() {
    this.setState({ connectedAccounts: CookieMain.connectedAccounts });
  }
}
