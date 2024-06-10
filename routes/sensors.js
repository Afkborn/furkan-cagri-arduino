const express = require("express");
const router = express.Router();
const { sendJsonObjectToAllClients } = require("./sensor-websocket");
const Messages = require("../constants/Messages");
const config = require("../constants/config.json");
const {
  TEMPERATURE_HIGH,
  HUMIDITY_HIGH,
  TEMPERATURE_LOW,
  HUMIDITY_LOW,
} = require("../constants/websocketTypes");
const Logger = require("../middleware/logger");
const db = require("../db/db");

// set Temperature sensor data
// use params to get the temperature value
// const requestPostTemperatue = "post_temperature";
// router.post(
//   "/temperature/:celsius",
//   Logger(requestPostTemperatue),
//   (request, response) => {
//     let temperature = request.params.celsius;

//     if (temperature === undefined) {
//       response.status(400).send({
//         status: false,
//         message: Messages.TEMPERATURE_REQUIRED,
//       });
//       return;
//     }

//     temperature = parseFloat(temperature);
//     if (isNaN(temperature)) {
//       response.status(400).send({
//         status: false,
//         message: Messages.INVALID_TEMPERATURE,
//       });
//       return;
//     }

//     db.insertTemperature(temperature);

//     response.status(200).send({
//       status: true,
//       message: Messages.TEMPERATURE_SET + temperature,
//     });

//     if (temperature > config.HIGH_TEMPERATURE_THRESHOLD) {
//       sendJsonObjectToAllClients(TEMPERATURE_HIGH(temperature));
//     } else if (temperature < config.LOW_TEMPERATURE_THRESHOLD) {
//       sendJsonObjectToAllClients(TEMPERATURE_LOW(temperature));
//     }
//   }
// );

const requestPostSensorData = "post_sensor_data";
// get data with params  humidity and temperature
router.post(
  "/sensor-data",
  Logger(requestPostSensorData),
  (request, response) => {
    let temperature = request.query.temperature;
    let humidity = request.query.humidity;

    if (temperature === undefined || humidity === undefined) {
      response.status(400).send({
        status: false,
        message: Messages.TEMPERATURE_HUMIDITY_REQUIRED,
      });
      return;
    }
 
    temperature = parseFloat(temperature);
    humidity = parseFloat(humidity);

    if (isNaN(temperature) || isNaN(humidity)) {
      response.status(400).send({
        status: false,
        message: Messages.INVALID_TEMPERATURE_HUMIDITY,
      });
      return;
    }

    db.insertTemperature(temperature);
    db.insertHumidity(humidity);

    response.status(200).send({
      status: true,
      message: Messages.TEMPERATURE_HUMIDITY_SET(temperature, humidity),
    });

    if (temperature > config.HIGH_TEMPERATURE_THRESHOLD) {
      sendJsonObjectToAllClients(TEMPERATURE_HIGH(temperature));
    } else if (temperature < config.LOW_TEMPERATURE_THRESHOLD) {
      sendJsonObjectToAllClients(TEMPERATURE_LOW(temperature));
    }

    if (humidity > config.HIGH_HUMIDITY_THRESHOLD) {
      sendJsonObjectToAllClients(HUMIDITY_HIGH(humidity));
    } else if (humidity < config.LOW_HUMIDITY_THRESHOLD) {
      sendJsonObjectToAllClients(HUMIDITY_LOW(humidity));
    }
  }
);

// get last Temperature sensor data
const requestGetTemperatue = "get_temperature";
router.get(
  "/temperature",
  Logger(requestGetTemperatue),
  (request, response) => {
    db.getLastTemperature((err, temperature) => {
      if (err) {
        response.status(500).send({
          status: false,
          message: Messages.INTERNAL_SERVER_ERROR,
        });
        return;
      }

      response.status(200).send({
        status: true,
        date: temperature.date,
        value: temperature.value,
      });
    });
  }
);

// get all Temperature sensor data
const requestGetAllTemperatue = "get_all_temperature";
router.get(
  "/temperature/all",
  Logger(requestGetAllTemperatue),
  (request, response) => {
    db.getAllTemperature((err, temperatures) => {
      if (err) {
        response.status(500).send({
          status: false,
          message: Messages.INTERNAL_SERVER_ERROR,
        });
        return;
      }

      response.status(200).send({
        status: true,
        data: temperatures,
      });
    });
  }
);

// set Humidity sensor data
// const requestPostHumidty = "post_humidty";
// router.post("/humidty", Logger(requestPostHumidty), (request, response) => {
//   let humidty = request.body.humidty;

//   if (humidty === undefined) {
//     response.status(400).send({
//       status: false,
//       message: Messages.HUMIDITY_REQUIRED,
//     });
//     return;
//   }

//   humidty = parseFloat(humidty);
//   if (isNaN(humidty)) {
//     response.status(400).send({
//       status: false,
//       message: Messages.INVALID_HUMIDITY,
//     });
//     return;
//   }

//   db.insertHumidity(humidty);

//   response.status(200).send({
//     status: true,
//     message: Messages.HUMIDITY_SET + humidty,
//   });

//   if (humidty > config.HIGH_HUMIDITY_THRESHOLD) {
//     sendJsonObjectToAllClients(HUMIDITY_HIGH(humidty));
//   } else if (humidty < config.LOW_HUMIDITY_THRESHOLD) {
//     sendJsonObjectToAllClients(HUMIDITY_LOW(humidty));
//   }
// });

module.exports = router;
