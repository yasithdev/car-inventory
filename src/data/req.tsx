import * as Request from "request";
import { SERVER_URL } from "./constants";
import { Car } from "./models";
import { init } from "./store";

const options = (url: string, json) => {
  return {
    url: `${SERVER_URL}${url}`,
    json
  };
};

export const getInventory = (callback: (cars: Car[]) => void): void => {
  Request.get(options("/api/car", true), (err, res, body) => {
    if (err) {
      callback([]);
    } else {
      callback(body);
    }
  });
};

export const addItem = (car: Car): void => {
  console.log(car);
  Request.post(options("/api/car", car), (err, res, body) => {
    init();
  });
};

export const updateItem = (car: Car): void => {
  Request.put(options(`/api/car/${car.id}`, car));
};

export const removeItem = (car: Car): void => {
  Request.delete(options(`/api/car/${car.id}`, true));
};
