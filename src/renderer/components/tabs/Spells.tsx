import SpellEntry from "@/game/character/SpellEntry";
import Account from "@account";
import * as React from "react";
import {Button, Col, Container, Row, Table} from "reactstrap";

interface ISpellsProps {
  account: Account;
}

interface ISpellsStates {
  spells: SpellEntry[];
  spellsPoints: number;
}

export default class Spells extends React.Component<ISpellsProps, ISpellsStates> {

  constructor(props: ISpellsProps) {
    super(props);

    this.state = {
      spells: [],
      spellsPoints: -1,
    };
  }

  public componentDidMount() {
    this.props.account.game.character.StatsUpdated.on(this.StatsUpdated.bind(this));
    this.props.account.game.character.SpellsUpdated.on(this.spellsUpdated.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.StatsUpdated.off(this.StatsUpdated.bind(this));
    this.props.account.game.character.SpellsUpdated.off(this.spellsUpdated.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <h4>You have {this.state.spellsPoints} points to level up your spells.</h4>
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
                  <td><img width="25" height="25" src={s.iconUrl} alt={s.name}/></td>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.level}</td>
                  <td>
                    <Button size="sm"
                            disabled={this.state.spellsPoints > 0 ? this.state.spellsPoints < s.level : true}
                            color="dark"
                            onClick={() => this.props.account.game.character.levelUpSpell(s)}>Monter</Button>
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

  private StatsUpdated() {
    this.setState({spellsPoints: this.props.account.game.character.stats.spellsPoints});
  }

  private spellsUpdated() {
    this.setState({spells: this.props.account.game.character.spells});
  }

}
