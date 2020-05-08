import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";
import { addCar, deleteCar, updateCar } from "../data/actions";
import { ApplicationState, Car } from "../data/models";
import CarDetailsDialog from "./CarDetailsDialog";
import CarEntryDialog from "./CarEntryDialog";
import CarListItem from "./CarListItem";
import CarRemoveDialog from "./CarRemoveDialog";

// Properties to get from Redux Store
interface StoreProps {
  cars: Car[];
}

// Properties to get for Redux Dispatch
interface DispatchProps {
  insertCar: (car: Car) => void;
  updateCar: (car: Car) => void;
  deleteCar: (car: Car) => void;
}

// Properties external to Redux Store
export interface OwnProps {
  // No properties
}

// State inside (if stateful) Component
interface OwnState {
  selectedCar?: Car;
}

type CombinedProps = StoreProps & DispatchProps & OwnProps;

class CarContainer extends React.Component<CombinedProps, OwnState> {
  constructor(props: CombinedProps) {
    super(props);
    this.state = { selectedCar: null };
  }

  handleCarSelected = (selectedCar: Car) => {
    this.setState({ selectedCar });
  };

  render(): JSX.Element {
    return (
      <div className="container">
        {/* Table showing the contents */}
        <button
          data-target="#carInsertModal"
          data-toggle="modal"
          className="btn btn-success float-right px-3"
        >
          Add New
        </button>
        <table className="mt-5 table table-sm table-striped table-hover">
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
            {this.props.cars.map(car => (
              <CarListItem
                key={`${car.id}`}
                car={car}
                notifySelected={this.handleCarSelected}
                editTarget="#carUpdateModal"
                deleteTarget="#carRemoveModal"
                viewTarget="#carDetailsModal"
              />
            ))}
            {this.props.children}
          </tbody>
        </table>
        <CarEntryDialog
          id="carInsertModal"
          mode="insert"
          onSave={this.props.insertCar}
        />
        <CarEntryDialog
          id="carUpdateModal"
          mode="update"
          onSave={this.props.updateCar}
          car={this.state.selectedCar}
        />
        <CarRemoveDialog
          id="carRemoveModal"
          onConfirm={this.props.deleteCar}
          car={this.state.selectedCar}
        />
        <CarDetailsDialog id="carDetailsModal" car={this.state.selectedCar} />
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
    insertCar: car => dispatch(addCar(car)),
    updateCar: car => dispatch(updateCar(car)),
    deleteCar: car => dispatch(deleteCar(car))
  };
}

const wrapper = connect<StoreProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
);

export default wrapper(CarContainer);
