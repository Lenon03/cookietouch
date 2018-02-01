import LanguageManager from "@/configurations/language/LanguageManager";
import ObjectEntry from "@/game/character/inventory/ObjectEntry";
import Account from "@account";
import {CharacterInventoryPositionEnum} from "@protocol/enums/CharacterInventoryPositionEnum";
import * as React from "react";
import {Col, Container, Row, Table} from "reactstrap";

interface IEquipmentsProps {
  account: Account;
}

interface IEquipmentsStates {
  equippedItems: ObjectEntry[];
}

export default class Equipments extends React.Component<IEquipmentsProps, IEquipmentsStates> {

  constructor(props: IEquipmentsProps) {
    super(props);
    this.state = {
      equippedItems: [],
    };
  }

  public componentDidMount() {
    this.props.account.game.character.inventory.InventoryUpdated.on(this.itemsUpdated.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.inventory.InventoryUpdated.off(this.itemsUpdated.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <Table striped bordered size="sm" responsive>
              <thead>
              <tr>
                <th>{LanguageManager.trans("items")}</th>
                <th>{LanguageManager.trans("name")}</th>
              </tr>
              </thead>
              <tbody>
              {this.state.equippedItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td><img width="25" height="25" src={item.iconUrl} alt={item.name}/></td>
                    <td>{item.name}</td>
                  </tr>
                );
              })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }

  private itemsUpdated() {
    this.setState({
      equippedItems: this.props.account.game.character.inventory.equipments.Where((e) =>
        e.position !== CharacterInventoryPositionEnum.ACCESSORY_POSITION_NOT_EQUIPED).ToArray(),
    });
  }
}
