import * as React from "react";
import { Container, Row } from "reactstrap";

interface ICharacterCreationProps {
  //
}

interface ICharacterCreationStates {
  //
}

export default class CharacterCreation extends React.Component<ICharacterCreationProps, ICharacterCreationStates> {

  constructor(props: ICharacterCreationProps) {
    super(props);

    this.state = {
      //
    };
  }
  public render() {
    return (
      <Container>
        <Row>
          CharacterCreation
        </Row>
      </Container>
    );
  }
}
