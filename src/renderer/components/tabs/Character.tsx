import SpellEntry from "@/game/character/SpellEntry";
import Account from "@account";
import * as React from "react";
import { Button, Col, Container, Row, Table } from "reactstrap";

interface IInventoryProps {
  account: Account;
}

interface IInventoryStates {
  skinUrl: string;
  spells: SpellEntry[];
}

export default class Inventory extends React.Component<IInventoryProps, IInventoryStates> {

  constructor(props: IInventoryProps) {
    super(props);
    this.state = {
      skinUrl: "",
      spells: [],
    };
  }

  public componentDidMount() {
    this.props.account.game.character.SpellsUpdated.on(this.spellsUpdated.bind(this));
    this.props.account.game.character.CharacterSelected.on(this.characterSelected.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.SpellsUpdated.off(this.spellsUpdated.bind(this));
    this.props.account.game.character.CharacterSelected.off(this.characterSelected.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col md="3">
            <img src={this.state.skinUrl} />
          </Col>
          <Col>
            <Table striped bordered size="sm" responsive>
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Monter</th>
                </tr>
              </thead>
              <tbody>
                {this.state.spells.map((s, index) => (
                  <tr key={index}>
                    <td><img width="40" height="40" src={s.iconUrl} alt={s.name} /></td>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.level}</td>
                    <td>
                      <Button
                        disabled={this.props.account.game.character.stats.spellsPoints > 0 ? false : true}
                        color="primary"
                        onClick={() => this.upSpell(s)}>Monter</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }

  private upSpell(spell: SpellEntry) {
    if (this.props.account.game.character.levelUpSpell(spell)) {
      alert("true");
    } else {
      alert("false");
    }
  }

  private spellsUpdated() {
    this.setState({
      spells: this.props.account.game.character.spells,
    });
  }

  private characterSelected() {
    this.setState({
      skinUrl: this.props.account.game.character.skinUrl,
    });
  }
}
