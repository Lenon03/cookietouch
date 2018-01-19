import Account from "@account";
import * as React from "react";
import { Col, Container, Row } from "reactstrap";

interface IBidProps {
  account: Account;
}

interface IBidStates {
  //
}

export default class Bid extends React.Component<IBidProps, IBidStates> {

  constructor(props: IBidProps) {
    super(props);

    this.state = {
      //
    };
  }

  public componentDidMount() {
    // this.props.account.statistics. .on(this.characterSelected.bind(this));
  }

  public componentWillUnmount() {
    // this.props.account.game.character.CharacterSelected.off(this.characterSelected.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            bid
          </Col>
        </Row>
      </Container>
    );
  }
}
