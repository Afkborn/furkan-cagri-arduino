const express = require("express");
const router = express.Router();
const { sendJsonObjectToAllClients } = require("./sensor-websocket");
const Messages = require("../constants/Messages");
const config = require("../constants/config.json");
const {
  SENSOR_DATA,
  FLAME_HIGH,
  GAS_HIGH,
  WATER_HIGH,
} = require("../constants/websocketTypes");
const Logger = require("../middleware/logger");
const db = require("../db/db");
const getTimeForLog = require("../common/time");

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

// post limit data
const requestPostLimitData = "post_limit_data";
router.post(
  "/limit-data",
  Logger(requestPostLimitData),
  (request, response) => {
    let highGas = request.query.highGas;
    let highFlame = request.query.highFlame;
    let highWater = request.query.highWater;

    if (
      highGas === undefined ||
      highFlame === undefined ||
      highWater === undefined
    ) {
      console.log(getTimeForLog() + "Undefined value");
      response.status(400).send({
        status: false,
        message: Messages.VALUE_REQUIRED,
      });
      return;
    }

    highGas = parseFloat(highGas);
    highFlame = parseFloat(highFlame);
    highWater = parseFloat(highWater);

    if (isNaN(highGas) || isNaN(highFlame) || isNaN(highWater)) {
      console.log(getTimeForLog() + "Invalid value");
      response.status(400).send({
        status: false,
        message: Messages.INVALID_VALUE,
      });
      return;
    }

    config.HIGH_GAS_THRESHOLD = highGas;
    config.HIGH_FLAME_THRESHOLD = highFlame;
    config.HIGH_WATER_THRESHOLD = highWater;

    console.log(
      getTimeForLog() +
        `New limit values: High Gas: ${highGas}, High Flame: ${highFlame}, High Water: ${highWater}`
    );

    response.status(200).send({
      status: true,
      message: Messages.VALUE_SET,
    });
  }
);

// get limit data
const requestGetLimitData = "get_limit_data";
router.get("/limit-data", Logger(requestGetLimitData), (request, response) => {
  response.status(200).send({
    status: true,
    data: {
      highGas: config.HIGH_GAS_THRESHOLD,
      highFlame: config.HIGH_FLAME_THRESHOLD,
      highWater: config.HIGH_WATER_THRESHOLD,
    },
  });
});

const requestPostSensorData = "post_sensor_data";
// get data with params  humidity and temperature
router.post(
  "/sensor-data",
  Logger(requestPostSensorData),
  (request, response) => {
    let temperature = request.query.temperature;
    let humidity = request.query.humidity;
    let gas = request.query.gas;
    let flame = request.query.flame;
    let water = request.query.water;

    if (
      temperature === undefined ||
      humidity === undefined ||
      gas === undefined ||
      flame === undefined ||
      water === undefined
    ) {
      console.log(getTimeForLog() + "Undefined value");
      response.status(400).send({
        status: false,
        message: Messages.VALUE_REQUIRED,
      });
      return;
    }

    temperature = parseFloat(temperature);
    humidity = parseFloat(humidity);
    gas = parseFloat(gas);
    flame = parseFloat(flame);
    water = parseFloat(water);

    if (
      isNaN(temperature) ||
      isNaN(humidity) ||
      isNaN(gas) ||
      isNaN(flame) ||
      isNaN(water)
    ) {
      console.log(getTimeForLog() + "Invalid value");
      response.status(400).send({
        status: false,
        message: Messages.INVALID_VALUE,
      });
      return;
    }

    db.insertTemperature(temperature);
    db.insertHumidity(humidity);
    db.insertGas(gas);
    db.insertFlame(flame);
    db.insertWater(water);

    response.status(200).send({
      status: true,
      message: Messages.VALUE_SET,
    });
    let date = new Date().toISOString();
    sendJsonObjectToAllClients(
      SENSOR_DATA(date, temperature, humidity, gas, flame, water)
    );

    // GAZ değeri eşikten fazla ise uyarı gönder
    if (gas > config.HIGH_GAS_THRESHOLD) {
      sendJsonObjectToAllClients(GAS_HIGH(gas));
    }

    if (flame < config.HIGH_FLAME_THRESHOLD) {
      sendJsonObjectToAllClients(FLAME_HIGH(flame));
    }

    if (water > config.HIGH_WATER_THRESHOLD) {
      sendJsonObjectToAllClients(WATER_HIGH(water));
    }

    // if (temperature > config.HIGH_TEMPERATURE_THRESHOLD) {
    //   sendJsonObjectToAllClients(TEMPERATURE_HIGH(temperature));
    // } else if (temperature < config.LOW_TEMPERATURE_THRESHOLD) {
    //   sendJsonObjectToAllClients(TEMPERATURE_LOW(temperature));
    // }

    // if (humidity > config.HIGH_HUMIDITY_THRESHOLD) {
    //   sendJsonObjectToAllClients(HUMIDITY_HIGH(humidity));
    // } else if (humidity < config.LOW_HUMIDITY_THRESHOLD) {
    //   sendJsonObjectToAllClients(HUMIDITY_LOW(humidity));
    // }
  }
);

// get last sensor data
const requestGetTemperatue = "get_sensor_data";
router.get(
  "/sensor_data",
  Logger(requestGetTemperatue),
  (request, response) => {
    db.getLastSensorData((err, data) => {
      if (err) {
        response.status(500).send({
          status: false,
          message: Messages.INTERNAL_SERVER_ERROR,
        });
        return;
      }

      response.status(200).send({
        status: true,
        data: data,
      });
    });
  }
);

// get all Temperature sensor data
// const requestGetAllTemperatue = "get_all_temperature";
// router.get(
//   "/temperature/all",
//   Logger(requestGetAllTemperatue),
//   (request, response) => {
//     db.getAllTemperature((err, temperatures) => {
//       if (err) {
//         response.status(500).send({
//           status: false,
//           message: Messages.INTERNAL_SERVER_ERROR,
//         });
//         return;
//       }

//       response.status(200).send({
//         status: true,
//         data: temperatures,
//       });
//     });
//   }
// );

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
