import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import { List } from "linqts";
import * as React from "react";
import { Button, ListGroup, ListGroupItem, NavLink } from "reactstrap";
import CookieMain from "../CookieMain";

interface IAccountsListProps {
  toggleModal: () => void;
}

interface IAccountsListStates {
  accountsList: AccountConfiguration[];
}

export default class AccountsList extends React.Component<IAccountsListProps, IAccountsListStates> {

  constructor(props: IAccountsListProps) {
    super(props);

    this.state = {
      accountsList: GlobalConfiguration.accountsList,
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
      <ListGroup>
        {this.state.accountsList.map((elem, index) => (
          // TODO: see for groups...
          <ListGroupItem className="clearfix" key={index}>
            <NavLink className="float-left" onClick={(e) => {
              CookieMain.connectAccounts(new List([elem]));
              this.props.toggleModal();
            }}>
              {elem.username}
            </NavLink>
            <Button size="sm" className="float-right" onClick={() => {
              GlobalConfiguration.removeAccount(elem);
              GlobalConfiguration.save();
              this.setState({ accountsList: GlobalConfiguration.accountsList });
            }} outline color="danger">X</Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }

  private entitiesUpdated() {
    this.setState({ accountsList: GlobalConfiguration.accountsList });
  }
}
