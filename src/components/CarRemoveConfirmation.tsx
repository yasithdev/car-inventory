import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";
import * as UUID from "uuid";
import { ApplicationState, Car } from "../data/models";

// Properties to get from Redux Store
interface StoreProps {
  // No properties
}

// Properties to get for Redux Dispatch
interface DispatchProps {
  // No properties
}

// Properties external to Redux Store
export interface OwnProps {
  id: string;
  mode: "insert" | "update";
  car?: Car;
  onSave: (car: Car) => void;
}

// State inside (if stateful) component
interface OwnState {
  newCar: Car;
}

type CombinedProps = StoreProps & DispatchProps & OwnProps;

class CarRemoveConfirmation extends React.Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
    // Initially set all variables to empty
    this.state = {
      newCar: this.props.car
        ? { ...this.props.car }
        : { id: UUID.v4(), manufacturer: "", make: "", model: "", year: 2018 }
    };
  }

  handleEntry = (event) => {
    let manufacturer = this.refs.manufacturer["value"];
    let make = this.refs.make["value"];
    let model = this.refs.model["value"];
    let year = this.refs.year["value"];
    this.setState(
      { newCar: { ...this.state.newCar, manufacturer, make, model, year } },
      () => this.props.onSave(this.state.newCar)
    );
  }

  getTitle = () =>
    this.props.mode == "insert" ? "Add New Item" : "Update Item";
  getSubtitle = () =>
    this.props.mode == "insert"
      ? "Enter item details and click on Save to Add."
      : "Please update the details and click on Save.";

  render() {
    return (
      <div
        id={this.props.id}
        className="modal fade"
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.getTitle()}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{this.getSubtitle()}</p>
              {/* Input fields for each property should come here */}
              <table>
                <tbody>
                  <tr>
                    <td>Manufacturer</td>
                    <td>
                      <input
                        ref="manufacturer"
                        type="text"
                        defaultValue={this.state.newCar.manufacturer.toString()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Make</td>
                    <td>
                      <input
                        ref="make"
                        type="text"
                        defaultValue={this.state.newCar.make.toString()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Model</td>
                    <td>
                      <input
                        ref="model"
                        type="text"
                        defaultValue={this.state.newCar.model.toString()}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>
                      <input
                        ref="year"
                        type="number"
                        defaultValue={this.state.newCar.year.toString()}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.handleEntry}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(
  state: ApplicationState,
  ownProps: OwnProps
): StoreProps {
  return {
    cars: state.cars
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
    // No properties
  };
}

const wrapper = connect<StoreProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
);

export default wrapper(CarRemoveConfirmation);
