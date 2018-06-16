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
  car: Car;
  onConfirm: (car: Car) => void;
}

// State inside (if stateful) component
interface OwnState {
  // No properties
}

type CombinedProps = StoreProps & DispatchProps & OwnProps;

class CarRemoveDialog extends React.Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
  }

  handleConfirm = event => {
    this.props.onConfirm(this.props.car);
  };

  title = "Remove Item";
  subtitle = "Are you sure you want to remove this item?";

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
              <h5 className="modal-title">{this.title}</h5>
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
              <p>{this.subtitle}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.handleConfirm}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                No
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

export default wrapper(CarRemoveDialog);
