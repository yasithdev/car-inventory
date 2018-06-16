import { createStore, Reducer, Store } from "redux";

import { ADD_CAR, UPDATE_CAR, DELETE_CAR } from "./constants";
import { ApplicationState, StoreAction } from "./models";

const initialState: ApplicationState = {
  cars: []
};

// Root Reducer for all actions in the application
function reduce (state: ApplicationState = initialState, action: StoreAction) : ApplicationState {
  let nextState;
  switch (action.type) {
    case ADD_CAR: {
      // Return all cars plus the new one
      nextState = {
        ...state,
        cars: [...state.cars, action.payload]
      };
      break;
    }
    case UPDATE_CAR: {
      // Return all cars along with the updated (merged) car
      nextState = {
        ...state,
        cars: [...state.cars, action.payload]
      };
      break;
    }
    case DELETE_CAR: {
      // Return all cars except the deleted one
      nextState = {
        ...state,
        cars: [...state.cars, action.payload]
      };
      break;
    }
    default: {
      nextState = state;
      break;
    }
  }
  return nextState;
}

const store : Store<ApplicationState, StoreAction<String, any>> = createStore(reduce);

export default store;
