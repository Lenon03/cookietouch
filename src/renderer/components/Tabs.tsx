import * as React from "react";

interface ITabsProps {
  //
}

interface ITabsStates {
  //
}

export default class Tabs extends React.Component<ITabsProps, ITabsStates> {

  constructor(props: ITabsProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="#">Active</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>
      </div>
    );
  }
}
