import Account from "@account";
import * as React from "react";

interface IConsoleProps {
  account: Account;
}

interface IConsoleStates {
  messages: IMessages[];
}

export interface IMessages {
  message: string;
  time: Date;
  sent: boolean;
}

export default class Console extends React.Component<IConsoleProps, IConsoleStates> {

  constructor(props: IConsoleProps) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  public render() {
    return (
      <div>
        <textarea className="form-control" rows={3}></textarea>
      </div>
    );
  }
}
