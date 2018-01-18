import * as React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

interface ILeftMenuProps {
  //
}

interface ILeftMenuStates {
  //
}

export default class LeftMenu extends React.Component<ILeftMenuProps, ILeftMenuStates> {

  constructor(props: ILeftMenuProps) {
    super(props);
  }

  public render() {
    return (
      <ListGroup>
        <ListGroupItem active>Account 1</ListGroupItem>
        <ListGroupItem color="primary">Account 2</ListGroupItem>
        <ListGroupItem color="secondary">Account 3</ListGroupItem>
        <ListGroupItem color="success">Account 4</ListGroupItem>
        <ListGroupItem color="danger">Account 5</ListGroupItem>
        <ListGroupItem color="warning">Account 6</ListGroupItem>
        <ListGroupItem color="info">Account 7</ListGroupItem>
        <ListGroupItem color="light">Account 8</ListGroupItem>
        <ListGroupItem color="dark">Account 9</ListGroupItem>
      </ListGroup>
    );
  }
}
