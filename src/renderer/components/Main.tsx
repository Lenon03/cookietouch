import LanguageManager from "@/configurations/language/LanguageManager";
import * as React from "react";
import {
  Button, Col, Collapse, Container, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter,
  ModalHeader, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,
  Row, TabContent, TabPane, UncontrolledDropdown,
} from "reactstrap";
import CookieMain from "../CookieMain";
import AccountsManager from "./AccountsManager";
import AccountsMenu from "./AccountsMenu";
import AccountTab from "./AccountTab";
import ConfigurationG from "./Configuration";

interface IMainProps {
  //
}

interface IMainStates {
  accountsManagerModal: boolean;
  isOpen: boolean;
  modalConfig: boolean;
}

export default class Main extends React.Component<IMainProps, IMainStates> {

  constructor(props: IMainProps) {
    super(props);

    this.state = {
      accountsManagerModal: false,
      isOpen: false,
      modalConfig: false,
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
            <ConfigurationG />
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="dark" onClick={() => this.toggleModalConfig()}>{LanguageManager.trans("close")}</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col xs="2">
            <AccountsMenu />
          </Col>
          <Col>
            <AccountTab />
          </Col>
        </Row>
      </Container>
    );
  }

  private toggleAccountsManagerModal() {
    this.setState({ accountsManagerModal: !this.state.accountsManagerModal });
  }

  private toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  private toggleModalConfig() {
    this.setState({ modalConfig: !this.state.modalConfig });
  }
}
