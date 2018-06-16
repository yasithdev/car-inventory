import { createStore, Reducer, Store } from "redux";

import { ADD_CAR, UPDATE_CAR, DELETE_CAR } from "./constants";
import { ApplicationState, StoreAction } from "./models";

const initialState: ApplicationState = {
  cars: []
};

// Root Reducer for all actions in the application
function reduce (state: ApplicationState = initialState, action: StoreAction) : ApplicationState {
  let nextState = state;
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
      let current = state.cars.filter(c => c.id === action.payload.id)[0];
      if(current){
        let index = state.cars.indexOf(current);
        let newCars = [...state.cars];
        newCars[index] = action.payload;
        nextState = {
          ...state,
          cars: newCars
        };
      }
      break;
    }
    case DELETE_CAR: {
      // Return all cars except the deleted one
      let current = state.cars.filter(c => c.id === action.payload.id)[0];
      if(current){
        let index = state.cars.indexOf(current);
        let newCars = [...state.cars];
        newCars.splice(index, 1);
        nextState = {
          ...state,
          cars: newCars
        };
      }
      break;
    }
  }
  return nextState;
}

const store : Store<ApplicationState, StoreAction<String, any>> = createStore(reduce);

export default store;
