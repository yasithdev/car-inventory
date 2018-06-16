import * as Request from "request";
import { Car } from "./models";
import { init } from "./store";

const options = (url: string, json) => {
  return {
    url,
    headers: {
      Origin: "http://localhost:8080",
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Access-Control-Allow-Headers": "Content-Type"
    },
    json
  };
};

export const getInventory = (callback: (cars: Car[]) => void): void => {
  Request.get(
    options("http://localhost:5000/api/car", true),
    (err, res, body) => {
      callback(body);
    }
  );
};

export const addItem = (car: Car): void => {
  console.log(car);
  Request.post(options("http://localhost:5000/api/car", car), (err, res, body) => {
    init();
  });
};

export const updateItem = (car: Car): void => {
  Request.put(options(`http://localhost:5000/api/car/${car.id}`, car));
};

export const removeItem = (car: Car): void => {
  Request.delete(options(`http://localhost:5000/api/car/${car.id}`, true));
};
