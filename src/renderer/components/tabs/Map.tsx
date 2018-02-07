import LanguageManager from "@/configurations/language/LanguageManager";
import { MovementRequestResults } from "@/game/managers/movements/MovementRequestResults";
import Account from "@account";
import * as React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import MapViewer from "./MapViewer";

interface IMapProps {
  account: Account;
}

interface IMapStates {
  //
}

export default class Map extends React.Component<IMapProps, IMapStates> {

  constructor(props: IMapProps) {
    super(props);
    this.state = {
      //
    };
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <Button size="sm" color="danger" onClick={() => this.attack()}>{LanguageManager.trans("attack")}</Button>
          </Col>
        </Row>
        <Row>
          <MapViewer account={this.props.account} />
        </Row>
      </Container>
    );
  }

  private attack() {
    const group = this.props.account.game.map.getMonstersGroup()[0];
    if (!group) {
      return;
    }
    const movementResult = this.props.account.game.managers.movements.moveToCell(group.cellId);
    if (movementResult === MovementRequestResults.ALREADY_THERE || movementResult === MovementRequestResults.MOVED) {
      this.props.account.network.sendMessageFree("GameRolePlayAttackMonsterRequestMessage", {
        monsterGroupId: group.id,
      });
    }
  }
}
