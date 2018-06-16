import { ADD_CAR, DELETE_CAR, LOAD_INVENTORY, UPDATE_CAR } from "./constants";
import { Car, StoreAction } from "./models";

// Template Add New Car to Redux Store
export const addCar = function(car: Car): StoreAction {
  return {
    type: ADD_CAR,
    payload: car
  };
};

// Template Update Existing Car in Redux Store
export const updateCar = function(car: Car): StoreAction {
  return {
    type: UPDATE_CAR,
    payload: car
  };
};

// Template Delete Existing Car in Redux Store
export const deleteCar = function(car: Car): StoreAction {
  return {
    type: DELETE_CAR,
    payload: car
  };
};

// Template that gets remote inventory and updates current
export const loadInventory = function(cars: Car[]): StoreAction {
  return {
    type: LOAD_INVENTORY,
    payload: cars
  };
};
