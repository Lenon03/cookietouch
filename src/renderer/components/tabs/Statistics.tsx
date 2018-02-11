import LanguageManager from "@/configurations/language/LanguageManager";
import ObjectObtainedEntry from "@/statistics/ObjectObtainedEntry";
import Account from "@account";
import * as React from "react";
import {Col, Container, Row} from "reactstrap";

interface IStatisticsProps {
  account: Account;
}

interface IStatisticsStates {
  objectsObtainedInFights: ObjectObtainedEntry[];
  objectsObtainedInGathers: ObjectObtainedEntry[];
  achievementsFinished: number;
  averageFightTime: number;
  experienceGained: number;
  fightsCount: number;
  fightsLost: number;
  fightsWon: number;
  gathersCount: number;
  kamasGained: number;
  levelsGained: number;
  totalFightsTime: number;
  totalGathersTime: number;
}

export default class Statistics extends React.Component<IStatisticsProps, IStatisticsStates> {

  constructor(props: IStatisticsProps) {
    super(props);

    this.state = {
      achievementsFinished: 0,
      averageFightTime: 0,
      experienceGained: 0,
      fightsCount: 0,
      fightsLost: 0,
      fightsWon: 0,
      gathersCount: 0,
      kamasGained: 0,
      levelsGained: 0,
      objectsObtainedInFights: [],
      objectsObtainedInGathers: [],
      totalFightsTime: 0,
      totalGathersTime: 0,
    };
  }

  public componentDidMount() {
    this.props.account.statistics.StatisticsUpdated.on(this.statisticsUpdated.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.statistics.StatisticsUpdated.off(this.statisticsUpdated.bind(this));
  }

  public render() {
    return (
      <Container fluid>
        <Row>
          <Col xs="4">
            {LanguageManager.trans("achievementsFinished")} {this.state.achievementsFinished}
            <br/>
            {LanguageManager.trans("averageFightTime")} {this.state.averageFightTime}
            <br/>
            {LanguageManager.trans("experienceGained")} {this.state.experienceGained}
            <br/>
            {LanguageManager.trans("fightsCount")} {this.state.fightsCount}
            <br/>
            {LanguageManager.trans("fightsLost")} {this.state.fightsLost}
            <br/>
            {LanguageManager.trans("fightsWon")} {this.state.fightsWon}
            <br/>
            {LanguageManager.trans("gathersCount")} {this.state.gathersCount}
            <br/>
            {LanguageManager.trans("kamasGained") + ":"} {this.state.kamasGained}
            <br/>
            {LanguageManager.trans("levelsGained")} {this.state.levelsGained}
            <br/>
            {LanguageManager.trans("totalFightsTime")} {this.state.totalFightsTime}
            <br/>
            {LanguageManager.trans("totalGathersTime")} {this.state.totalGathersTime}
          </Col>
          <Col>
            {this.state.objectsObtainedInFights.length} {LanguageManager.trans("objectsObtainedInFights")}<br/>
            {this.state.objectsObtainedInGathers.length} {LanguageManager.trans("objectsObtainedInGathers")}
          </Col>
        </Row>
      </Container>
    );
  }

  private statisticsUpdated() {
    this.setState({
      achievementsFinished: this.props.account.statistics.achievementsFinished,
      averageFightTime: this.props.account.statistics.averageFightTime,
      experienceGained: this.props.account.statistics.experienceGained,
      fightsCount: this.props.account.statistics.fightsCount,
      fightsLost: this.props.account.statistics.fightsLost,
      fightsWon: this.props.account.statistics.fightsWon,
      gathersCount: this.props.account.statistics.gathersCount,
      kamasGained: this.props.account.statistics.kamasGained,
      levelsGained: this.props.account.statistics.levelsGained,
      objectsObtainedInFights: this.props.account.statistics.objectsObtainedInFights.ToArray(),
      objectsObtainedInGathers: this.props.account.statistics.objectsObtainedInGathers.ToArray(),
      totalFightsTime: this.props.account.statistics.totalFightsTime,
      totalGathersTime: this.props.account.statistics.totalGathersTime,
    });
  }
}
