import SpellEntry from "@/game/character/SpellEntry";
import { MapChangeDirections } from "@/game/managers/movements/MapChangeDirections";
import { MovementRequestResults } from "@/game/managers/movements/MovementRequestResults";
import Account from "@account";
import * as React from "react";
import { Button, Col, Container, Row } from "reactstrap";

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

  public componentDidMount() {
    this.props.account.game.map.EntitiesUpdated.on(this.entitiesUpdated.bind(this));
    this.props.account.game.map.InteractivesUpdated.on(this.interactivesUpdated.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.map.EntitiesUpdated.off(this.entitiesUpdated.bind(this));
    this.props.account.game.map.InteractivesUpdated.off(this.interactivesUpdated.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <Button size="sm" color="danger" onClick={() => this.attack()}>Attack</Button>
            <Button size="sm"
              color="secondary"
              onClick={() => this.changeMap(MapChangeDirections.Top)}>Top</Button>
            <Button size="sm"
              color="secondary"
              onClick={() => this.changeMap(MapChangeDirections.Bottom)}>Bottom</Button>
            <Button size="sm"
              color="secondary"
              onClick={() => this.changeMap(MapChangeDirections.Left)}>Left</Button>
            <Button size="sm"
              color="secondary"
              onClick={() => this.changeMap(MapChangeDirections.Right)}>Right</Button>
          </Col>
        </Row>
      </Container>
    );
  }

  private changeMap(dir: MapChangeDirections) {
    const res = this.props.account.game.managers.movements.changeMap(dir);
    this.props.account.logger.logDebug("Map", `Movement Result: ${res}`);
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

  private entitiesUpdated() {
    this.setState({
      //
    });
  }

  private interactivesUpdated() {
    this.setState({
      //
    });
  }
}
