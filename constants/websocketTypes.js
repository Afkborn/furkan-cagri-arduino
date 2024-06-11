const Messages = require("../constants/Messages");

// function TEMPERATURE_HIGH(value) {
//   return {
//     type: "TEMPERATURE_HIGH",
//     value: value,
//     message: Messages.TEMPERATURE_HIGH_NOTIFICATION(value),
//     title : "Yüksek Sıcaklık"
//   };
// }

// function HUMIDITY_HIGH(value) {
//   return {
//     type: "HUMIDITY_HIGH",
//     value: value,
//     message: Messages.HUMIDITY_HIGH_NOTIFICATION(value),
//     title : "Yüksek Nem"

//   };
// }


function GAS_HIGH(value) {
  return {
    type: "GAS_HIGH",
    value: value,
    message: Messages.GAS_HIGH_NOTIFICATION,
    title : "Yüksek Gaz"
  };
}


function FLAME_HIGH(value){
  return {
    type : "FLAME_HIGH",
    value : value,
    message : Messages.FLAME_HIGH_NOTIFICATION,
    title : "Yüksek Alev"
  }
}


function WATER_HIGH(value){
  return {
    type : "WATER_HIGH",
    value : value,
    message : Messages.WATER_HIGH_NOTIFICATION,
    title : "Yüksek Su"
  }
}


function SENSOR_DATA(date, temperaute, humidity, gas, flame, water) {
  return {
    type: "SENSOR_DATA",
    date, 
    temperaute,
    humidity,
    gas,
    flame,
    water,
  };
}



module.exports = {
  // TEMPERATURE_HIGH,
  // HUMIDITY_HIGH,
  SENSOR_DATA,
  GAS_HIGH, 
  FLAME_HIGH,
  WATER_HIGH

};
