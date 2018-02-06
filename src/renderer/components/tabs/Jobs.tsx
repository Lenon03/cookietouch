import LanguageManager from "@/configurations/language/LanguageManager";
import JobEntry from "@/game/character/jobs/JobEntry";
import Account from "@account";
import * as React from "react";
import {Col, Container, Progress, Row, Table} from "reactstrap";

interface IJobsProps {
  account: Account;
}

interface IJobsStates {
  jobs: JobEntry[];
}

export default class Jobs extends React.Component<IJobsProps, IJobsStates> {

  constructor(props: IJobsProps) {
    super(props);
    this.state = {
      jobs: [],
    };
  }

  public componentDidMount() {
    this.props.account.game.character.jobs.JobsUpdated.on(this.jobsUpdated.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.jobs.JobsUpdated.off(this.jobsUpdated.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <Table striped bordered size="sm" responsive>
              <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>{LanguageManager.trans("name")}</th>
                <th>{LanguageManager.trans("level")}</th>
                <th>Experience</th>
              </tr>
              </thead>
              <tbody>
              {this.state.jobs.map((j, index) => (
                <tr key={index}>
                  <td><img width="25" height="25" src={j.iconUrl} alt={j.name}/></td>
                  <td>{j.id}</td>
                  <td>{j.name}</td>
                  <td>{j.level}</td>
                  <td>
                    <Progress value={j.experience} max={j.experienceNextLevelFloor}>
                      {j.experience} / {j.experienceNextLevelFloor}
                    </Progress>
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

  private jobsUpdated() {
    this.setState({
      jobs: this.props.account.game.character.jobs.jobs.ToArray(),
    });
  }
}
