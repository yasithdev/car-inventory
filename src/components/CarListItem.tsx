import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";
import { deleteCar, updateCar } from "../data/actions";
import { ApplicationState, Car } from "../data/models";

// Properties to get from Redux Store
interface StoreProps {
  // No properties
}

// Properties to get for Redux Dispatch
interface DispatchProps {
  updateCar: (car: Car) => void;
  deleteCar: (car: Car) => void;
}

// Properties external to Redux Store
export interface OwnProps {
  car: Car;
  editTarget : String;
  deleteTarget : String;
  notifySelected : (car : Car) => void;
}

// State inside (if stateful) component
interface OwnState {
  // No properties
}

type CombinedProps = StoreProps & DispatchProps & OwnProps;

class CarListItem extends React.Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
  }

  notifyEditSelect = (event) => {
    // Notify that this car was selected for edit
    this.props.notifySelected(this.props.car);
  }

  notifyDeleteSelect = (event) => {
    // Notify that this car was selected for delete
    this.props.notifySelected(this.props.car);
  }

  render(): JSX.Element {
    const { manufacturer, make, model, year } = this.props.car;
    return (
      <tr>
        <td>
          <span>{manufacturer}</span>
        </td>
        <td>
          <span>{make}</span>
        </td>
        <td>
          <span>{model}</span>
        </td>
        <td>
          <span>{year}</span>
        </td>
        <td>
          <span>
            <button className="btn btn-secondary btn-sm w-100" onClick={this.notifyEditSelect} data-target={this.props.editTarget} data-toggle="modal">
              <i className="fas fa-edit fa-sm fa-fw" />
            </button>
          </span>
        </td>
        <td>
          <span>
            <button className="btn btn-secondary btn-sm w-100" onClick={this.notifyDeleteSelect} data-target={this.props.deleteTarget} data-toggle="modal">
              <i className="fas fa-trash fa-sm fa-fw" />
            </button>
          </span>
        </td>
      </tr>
    );
  }
}

function mapStateToProps(
  state: ApplicationState,
  ownProps: OwnProps
): StoreProps {
  return {
    // Nothing to map
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
    updateCar: car => dispatch(updateCar(car)),
    deleteCar: car => dispatch(deleteCar(car))
  };
}

const wrapper = connect<StoreProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
);

export default wrapper(CarListItem);
