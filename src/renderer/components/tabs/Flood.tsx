import FloodSentence from "@/extensions/flood/FloodSentence";
import { ChatActivableChannelsEnum } from "@/protocol/enums/ChatActivableChannelsEnum";
import Account from "@account";
import * as React from "react";
import { Button, Col, Container, Row } from "reactstrap";

interface IFloodProps {
  account: Account;
}

interface IFloodStates {
  //
}

export default class Flood extends React.Component<IFloodProps, IFloodStates> {

  constructor(props: IFloodProps) {
    super(props);

    this.state = {
      //
    };
  }

  public componentDidMount() {
    // this.props.account.statistics. .on(this.characterSelected.bind(this));
  }

  public componentWillUnmount() {
    // this.props.account.game.character.CharacterSelected.off(this.characterSelected.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <Button color="info" onClick={() => this.flood()}>Flood</Button>
          </Col>
        </Row>
      </Container>
    );
  }

  private flood() {
    this.props.account.extensions.flood.config.generalChannelInterval = 30;
    this.props.account.extensions.flood.config.salesChannelInterval = 120;
    this.props.account.extensions.flood.config.seekChannelInterval = 60;
    this.props.account.extensions.flood.config.sentences.AddRange([
      new FloodSentence("Salut %name% tu es level %level% ?", null, true, false),
      new FloodSentence("Bonjour à tous les amis! %smiley%", ChatActivableChannelsEnum.CHANNEL_SEEK, false, false),
      new FloodSentence("Le nombre %nbr% est fascinant non?", ChatActivableChannelsEnum.CHANNEL_SALES, false, false),
    ]);
    this.props.account.extensions.flood.start();
  }

}
