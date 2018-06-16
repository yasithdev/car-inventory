import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";
import { Car, ApplicationState } from "../data/models";
import { addCar } from "../data/actions";
import CarListItem from "./CarListItem";
import CarEntryDialog from "./CarEntryDialog";

// Properties to get from Redux Store
interface StoreProps {
  cars: Car[];
}

// Properties to get for Redux Dispatch
interface DispatchProps {
  insertCar: (car: Car) => void;
}

// Properties external to Redux Store
export interface OwnProps {
  // No properties
}

// State inside (if stateful) Component
interface OwnState {
  // No properties
}

type CombinedProps = StoreProps & DispatchProps & OwnProps;

class CarContainer extends React.Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="container">
      {/* Table showing the contents */}
      <button data-target="#carInsertModal" data-toggle="modal" className="btn btn-sm btn-success float-right">Add</button>
      <table className="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cars.map(car => <CarListItem key={`${car.manufacturer}${car.model}${car.make}${car.year}`} car={car} />)}
          {this.props.children}
        </tbody>
      </table>
      <CarEntryDialog id="carInsertModal" mode="insert" onSave={this.props.insertCar}/>
      <CarEntryDialog id="carUpdateModal" mode="update" onSave={this.props.insertCar}/>
      </div>
    );
  }
}

function mapStateToProps( state: ApplicationState, ownProps: OwnProps ): StoreProps {
  return {
    cars: state.cars
  };
}

function mapDispatchToProps( dispatch: Redux.Dispatch, ownProps: OwnProps ): DispatchProps {
  return {
    insertCar: car => dispatch(addCar(car))
  };
}

const wrapper = connect<StoreProps, DispatchProps, OwnProps>( mapStateToProps, mapDispatchToProps );

export default wrapper(CarContainer);
