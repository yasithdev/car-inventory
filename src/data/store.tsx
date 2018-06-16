import { createStore, Store } from "redux";
import { getInventory } from "./actions";
import { ADD_CAR, DELETE_CAR, GET_INVENTORY, UPDATE_CAR } from "./constants";
import { ApplicationState, Car, StoreAction } from "./models";
import * as req from "./req";

const initialState: ApplicationState = {
  cars: []
};

// Root Reducer for all actions in the application
function reduce(
  state: ApplicationState = initialState,
  action: StoreAction
): ApplicationState {
  let nextState = state;
  switch (action.type) {
    case ADD_CAR: {
      // Return all cars plus the new one
      nextState = {
        ...state,
        cars: [...state.cars, action.payload]
      };
      req.addItem(action.payload);
      break;
    }
    case UPDATE_CAR: {
      // Return all cars along with the updated (merged) car
      let current = state.cars.filter(c => c.id === action.payload.id)[0];
      if (current) {
        let index = state.cars.indexOf(current);
        let newCars = [...state.cars];
        newCars[index] = action.payload;
        nextState = {
          ...state,
          cars: newCars
        };
        req.updateItem(action.payload);
      }
      break;
    }
    case DELETE_CAR: {
      // Return all cars except the deleted one
      let current = state.cars.filter(c => c.id === action.payload.id)[0];
      if (current) {
        let index = state.cars.indexOf(current);
        let newCars = [...state.cars];
        newCars.splice(index, 1);
        nextState = {
          ...state,
          cars: newCars
        };
        req.removeItem(action.payload);
      }
      break;
    }
    case GET_INVENTORY: {
      // Get Inventory from remote// Return all cars plus the new one
      nextState = {
        ...state,
        cars: action.payload
      };
      break;
    }
  }
  return nextState;
}

const store: Store<ApplicationState, StoreAction<String, any>> = createStore(
  reduce
);

export const init = () => {
  req.getInventory((cars) => {
    store.dispatch(getInventory(cars))
  });
}

init();
export default store;
