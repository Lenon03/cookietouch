import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import classnames from "classnames";
import { List } from "linqts";
import * as React from "react";
import {
  Button, Col, Container, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Modal,
  ModalBody, ModalFooter, ModalHeader, NavLink, Row, TabContent, TabPane } from "reactstrap";
import CookieMain from "../CookieMain";
import CharacterCreation from "./CharacterCreation";

interface IAccountsManagerProps {
  toggleModal: () => void;
  isOpen: boolean;
}

interface IAccountsManagerStates {
  accountsList: AccountConfiguration[];
  modalItem: string;
}

export default class AccountsManager extends React.Component<IAccountsManagerProps, IAccountsManagerStates> {

  constructor(props: IAccountsManagerProps) {
    super(props);
    this.state = {
      accountsList: GlobalConfiguration.accountsList,
      modalItem: "0",
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
      <Modal isOpen={this.props.isOpen} size="lg" toggle={() => this.props.toggleModal()}>
          <ModalHeader toggle={() => this.props.toggleModal()}>{LanguageManager.trans("accountsManager")}</ModalHeader>
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
                  </TabPane>
                  <TabPane tabId="1">
                    <Form onSubmit={(event) => {
                      event.preventDefault();
                      const username = (document.getElementById("username") as HTMLInputElement).value;
                      const password = (document.getElementById("examplePassword") as HTMLInputElement).value;
                      const server = (document.getElementById("server") as HTMLInputElement).value;
                      const character = (document.getElementById("character") as HTMLInputElement).value;
                      GlobalConfiguration.addAccountAndSave(username, password, server, character);
                      this.setState({ accountsList: GlobalConfiguration.accountsList });
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
            <Button size="sm" color="secondary" onClick={() => this.props.toggleModal()}>{LanguageManager.trans("cancel")}</Button>
          </ModalFooter>
        </Modal>
    );
  }

  private toggleModalItem(tab: string) {
    if (this.state.modalItem !== tab) {
      this.setState({ modalItem: tab });
    }
  }

  private entitiesUpdated() {
    this.setState({  accountsList: GlobalConfiguration.accountsList });
  }
}
