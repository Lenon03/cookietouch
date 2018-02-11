import LanguageManager from "@/configurations/language/LanguageManager";
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
    this.props.account.logger.logDofus("TESTING", "ON StatsUpdated");
    this.props.account.game.character.StatsUpdated.on(this.statsUpdated.bind(this));
    this.props.account.game.character.SpellsUpdated.on(this.spellsUpdated.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.logger.logDofus("TESTING", "OFF StatsUpdated");
    this.props.account.game.character.StatsUpdated.off(this.statsUpdated.bind(this));
    this.props.account.game.character.SpellsUpdated.off(this.spellsUpdated.bind(this));
  }

  public render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h4>{LanguageManager.trans("spellsPoints", this.state.spellsPoints)}</h4>
            <Table striped bordered size="sm" responsive>
              <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>{LanguageManager.trans("name")}</th>
                <th>{LanguageManager.trans("level")}</th>
                <th>{LanguageManager.trans("up")}</th>
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
                            onClick={() => this.props.account.game.character.levelUpSpell(s)}>{LanguageManager.trans("up")}</Button>
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

  private statsUpdated() {
    this.props.account.logger.logDofus("TESTING", "IN StatsUpdated");
    this.setState({spellsPoints: this.props.account.game.character.stats.spellsPoints});
  }

  private spellsUpdated() {
    this.setState({spells: this.props.account.game.character.spells});
  }

}
