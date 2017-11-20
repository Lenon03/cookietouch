import { ipcRenderer } from "electron";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { iframe } from "../iframe";

export default class Game extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
  }

  public componentDidMount() {
    const doc = ReactDOM.findDOMNode(this) as HTMLIFrameElement;
    (doc.contentWindow as any).process = process;
  }

  public render() {
    return (
      <iframe src={"./game.html?appVersion=1.12.0"} style={iframe} />
    );
  }
}
