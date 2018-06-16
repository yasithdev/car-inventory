import * as React from "react";
import CarContainer from "./CarContainer";

export interface AppProps {
  compiler: string;
  framework: string;
}

export class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className="container">
        <h1>
          Hello from {this.props.compiler} and {this.props.framework}!
        </h1>
        <div className="row">
            <CarContainer/>
        </div>
      </div>
    );
  }
}
