import * as React from "react";

interface ILeftMenuProps {
  //
}

interface ILeftMenuStates {
  //
}

export default class LeftMenu extends React.Component<ILeftMenuProps, ILeftMenuStates> {

  constructor(props: ILeftMenuProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item">Account 1</li>
          <li className="list-group-item list-group-item-primary">Account 1</li>
          <li className="list-group-item list-group-item-secondary">Account 1</li>
          <li className="list-group-item list-group-item-success">Account 1</li>
          <li className="list-group-item list-group-item-danger">Account 1</li>
          <li className="list-group-item list-group-item-warning">Account 1</li>
          <li className="list-group-item list-group-item-info">Account 1</li>
          <li className="list-group-item list-group-item-light">Account 1</li>
          <li className="list-group-item list-group-item-dark">Account 1</li>
        </ul>
      </div>
    );
  }
}
