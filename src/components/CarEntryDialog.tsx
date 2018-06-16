import * as React from "react";
import { Car } from "../data/models";

// Properties to get from Redux Store
interface StoreProps {
  // No properties
}

// Properties to get for Redux Dispatch
interface DispatchProps {
  insertCar: (car: Car) => void;
}

// Properties external to Redux Store
export interface OwnProps {
  title : string;
  description : string;
}

// State inside (if stateful) component
interface OwnState {
  car: Car;
}

type CombinedProps = StoreProps & DispatchProps & OwnProps;


export default class CarEntryDialog extends React.Component<CombinedProps,OwnState> {
  constructor(props: CombinedProps) {
    super(props);
    // Initially set all variables to empty
    this.state = {
      car: { manufacturer: "", make: "", model: "", year: undefined }
    };
  }
  
  render() {
    return (
      <div className="modal" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{this.props.description}</p>
              {/* Input fields for each property should come here */}
              <table>
                <tbody>
                  <tr>
                    <td>Manufacturer</td>
                    <td><input type="text" value={this.state.car.manufacturer.toString()}/></td>
                  </tr>
                  <tr>
                    <td>Make</td>
                    <td><input type="text" value={this.state.car.make.toString()}/></td>
                  </tr>
                  <tr>
                    <td>Model</td>
                    <td><input type="text" value={this.state.car.model.toString()}/></td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td><input type="text" value={this.state.car.year.toString()}/></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                <i className="fas fa-save fa-sm fa-fw"></i>
              </button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" >
                <i className="fas fa-window-close fa-sm fa-fw"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
