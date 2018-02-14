import LanguageManager from "@/configurations/language/LanguageManager";
import classnames from "classnames";
import * as React from "react";
import {
  Button, Col, Container, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Modal,
  ModalBody, ModalFooter, ModalHeader, NavLink, Row, TabContent, TabPane } from "reactstrap";
import AccountsList from "./AccountsList";
import AddAccountForm from "./AddAccountForm";
import CharacterCreation from "./CharacterCreation";

interface IAccountsManagerProps {
  toggleModal: () => void;
  isOpen: boolean;
}

interface IAccountsManagerStates {
  modalItem: string;
}

export default class AccountsManager extends React.Component<IAccountsManagerProps, IAccountsManagerStates> {

  constructor(props: IAccountsManagerProps) {
    super(props);
    this.state = {
      modalItem: "0",
    };
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
                    <NavLink onClick={() => { this.toggleModalItem("0"); }}>
                      Connect Accounts
                    </NavLink>
                  </ListGroupItem>
                  <ListGroupItem
                    color="dark"
                    className={classnames({active: this.state.modalItem === "1"})}
                  >
                    <NavLink onClick={() => { this.toggleModalItem("1"); }}>
                      Add Accounts
                    </NavLink>
                  </ListGroupItem>
                  <ListGroupItem
                    color="dark"
                    className={classnames({active: this.state.modalItem === "2"})}
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
                    <AccountsList toggleModal={this.props.toggleModal} />
                  </TabPane>
                  <TabPane tabId="1">
                    <AddAccountForm />
                  </TabPane>
                  <TabPane tabId="2">
                    <CharacterCreation />
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
}
