import Account from "@account";
import * as React from "react";
import { Col, Container, Row } from "reactstrap";

interface IFightsProps {
  account: Account;
}

interface IFightsStates {
  //
}

export default class Fights extends React.Component<IFightsProps, IFightsStates> {

  constructor(props: IFightsProps) {
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
            fights
          </Col>
        </Row>
      </Container>
    );
  }
}
