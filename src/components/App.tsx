import * as React from "react";
import CarContainer from "./CarContainer";

export interface AppProps {
  title: string;
}

export class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">
          {this.props.title}
        </h1>
        <div className="row">
            <CarContainer/>
        </div>
        {this.props.children}
      </div>
    );
  }
}
