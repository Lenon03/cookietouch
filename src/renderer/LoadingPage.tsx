import { Spinner } from "@renderer/Spinner";
import { spinnerService } from "@renderer/Spinner/Service";
import * as React from "react";
import Loader from "react-loader-spinner";

export function LoadingPage() {
  return (
    <div
      style={{
        backgroundColor: "#444444",
        bottom: 0,
        height: "100%",
        left: 0,
        margin: "auto",
        position: "absolute",
        right: 0,
        top: 0,
        width: "100%"
      }}
    >
      <div
        style={{
          backgroundColor: "#444444",
          bottom: 0,
          height: "300px",
          left: 0,
          margin: "auto",
          position: "absolute",
          right: 0,
          top: 0,
          width: "300px"
        }}
      >
        <Spinner spinnerService={spinnerService} name="mySpinner" group="foo">
          <Loader type="Ball-Triangle" color="#FFF" height="300" width="300" />
        </Spinner>
      </div>
    </div>
  );
}
