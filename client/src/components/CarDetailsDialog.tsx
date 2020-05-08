import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";
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
  car?: Car;
}

// State inside (if stateful) component
interface OwnState {
  // No properties
}

type CombinedProps = StoreProps & DispatchProps & OwnProps;

class CarEntryDialog extends React.Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
  }

  getTitle = () => "Car Details";
  getSubtitle = () => "The car details are given below";

  render(): JSX.Element {
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
                        disabled
                        id="manufacturer"
                        ref="manufacturer"
                        type="text"
                        value={
                          this.props.car
                            ? this.props.car.manufacturer.toString()
                            : ""
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Make</td>
                    <td>
                      <input
                        disabled
                        id="make"
                        ref="make"
                        type="text"
                        value={
                          this.props.car ? this.props.car.make.toString() : ""
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Model</td>
                    <td>
                      <input
                        disabled
                        id="model"
                        ref="model"
                        type="text"
                        value={
                          this.props.car ? this.props.car.model.toString() : ""
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>
                      <input
                        disabled
                        id="year"
                        ref="year"
                        type="number"
                        value={
                          this.props.car ? this.props.car.year.toString() : ""
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary px-3"
                data-dismiss="modal"
              >
                OK
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
    // No properties
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

export default wrapper(CarEntryDialog);
