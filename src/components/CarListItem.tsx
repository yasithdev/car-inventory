import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";
import * as UUID from "uuid";
import { updateCar, deleteCar } from "../data/actions";
import { Car, ApplicationState } from "../data/models";

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
}

type CombinedProps = StoreProps & DispatchProps & OwnProps;

class CarListItem extends React.Component<CombinedProps, {}> {
  constructor(props: CombinedProps) {
    super(props);
  }

  handleDelete(event) {
    const { manufacturer, make, model, year } = this.props.car;
    const id = UUID.v4();
  }

  render(): JSX.Element {
    const { manufacturer, make, model, year } = this.props.car;
    return (
      <tr>
        <td><span>{manufacturer}</span></td>
        <td><span>{make}</span></td>
        <td><span>{model}</span></td>
        <td><span>{year}</span></td>
        <td><span><button className="btn btn-success btn-sm"><i className="fas fa-pencil fa-sm fa-fw" /></button></span></td>
        <td><span><button className="btn btn-success btn-sm"><i className="fas fa-trash fa-sm fa-fw" /></button></span></td>
      </tr>
    );
  }
}

function mapStateToProps(state: ApplicationState, ownProps: OwnProps): StoreProps {
  return {
    // Nothing to map
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch, ownProps: OwnProps ): DispatchProps {
  return {
    updateCar: car => dispatch(updateCar(car)),
    deleteCar: car => dispatch(deleteCar(car))
  };
}

const wrapper = connect<StoreProps, DispatchProps, OwnProps>( mapStateToProps, mapDispatchToProps )

export default wrapper(CarListItem);