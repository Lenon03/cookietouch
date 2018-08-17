import * as React from "react";
import { SpinnerService, spinnerService } from "./Service";

export interface ISpinnerProps {
  name: string;
  group?: string;
  loadingImage?: string;
  show?: boolean;
  spinnerService?: SpinnerService;
  style?: object;
}

export interface ISpinnerState {
  show: boolean;
}

export class Spinner extends React.Component<ISpinnerProps, ISpinnerState> {
  private spinnerService = spinnerService;

  get name() {
    return this.props.name;
  }

  get group() {
    return this.props.group;
  }

  get show() {
    return this.state.show;
  }

  set show(show: boolean) {
    this.setState({ show });
  }

  public componentWillMount() {
    this.setState({
      show: this.props.hasOwnProperty("show") ? this.props.show : false
    });

    if (this.props.hasOwnProperty("spinnerService")) {
      this.spinnerService = this.props.spinnerService;
    }

    this.spinnerService.register(this);
  }

  public componentWillUnmount() {
    this.spinnerService.unregister(this);
  }

  public render() {
    if (this.state.show) {
      const { loadingImage } = this.props;
      return (
        <div style={{ display: "inline-block" }}>
          {loadingImage && <img src={loadingImage} />}
          {this.props.children}
        </div>
      );
    }
    return <div style={{ display: "inline-block" }} />;
  }
}
