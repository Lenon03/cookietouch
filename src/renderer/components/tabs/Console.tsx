import { IMessage } from "@/core/logger";
import Account from "@account";
import * as React from "react";

interface IConsoleProps {
  account: Account;
  max?: number;
}

interface IConsoleStates {
  messages: IMessage[];
}

export default class Console extends React.Component<IConsoleProps, IConsoleStates> {

  constructor(props: IConsoleProps) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  public componentWillMount() {
    if (!this.props.account) {
      return;
    }
    this.props.account.logger.OnLog.on((message) => {
      const newMessages = this.state.messages;
      newMessages.push(message);
      if (newMessages.length > (this.props.max ? this.props.max : 200)) {
        newMessages.shift();
      }
      this.setState((prevState, props) => ({
        messages: newMessages,
      }));
    });
  }

  public render() {
    return (
      <div>
        <textarea rows={10} readOnly className="form-control" value={this.state.messages.map((m) => `${m.content}\n`)} />
      </div>
    );
  }
}
