import ObjectObtainedEntry from "@/statistics/ObjectObtainedEntry";
import Account from "@account";
import * as React from "react";
import { Col, Container, Row } from "reactstrap";

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
      <Container>
        <Row>
          <Col>
            Achievements Finished: {this.state.achievementsFinished}
            <br />
            Average fight time: {this.state.averageFightTime}
            <br />
            Experience gained: {this.state.experienceGained}
            <br />
            Fights Count: {this.state.fightsCount}
            <br />
            Fights Lost: {this.state.fightsLost}
            <br />
            Fights Won: {this.state.fightsWon}
            <br />
            Gathers Count: {this.state.gathersCount}
            <br />
            Kamas Gained: {this.state.kamasGained}
            <br />
            Levels Gained: {this.state.levelsGained}
            <br />
            Total fights time: {this.state.totalFightsTime}
            <br />
            Total gathers time: {this.state.totalGathersTime}
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
      levelsGained: this.props.account.statistics.kamasGained,
      objectsObtainedInFights: this.props.account.statistics.objectsObtainedInFights.ToArray(),
      objectsObtainedInGathers: this.props.account.statistics.objectsObtainedInGathers.ToArray(),
      totalFightsTime: this.props.account.statistics.totalFightsTime,
      totalGathersTime: this.props.account.statistics.totalGathersTime,
    });
  }
}
