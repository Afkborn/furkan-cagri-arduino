const Messages = require("../constants/Messages");

function TEMPERATURE_HIGH(value) {
  return {
    type: "TEMPERATURE_HIGH",
    value: value,
    message: Messages.TEMPERATURE_HIGH_NOTIFICATION(value),
    title : "Yüksek Sıcaklık"
  };
}

function TEMPERATURE_LOW(value) {
  return {
    type: "TEMPERATURE_LOW",
    value: value,
    message: Messages.TEMPERATURE_LOW_NOTIFICATION(value),
    title : "Düşük Sıcaklık"
  };
}

function HUMIDITY_HIGH(value) {
  return {
    type: "HUMIDITY_HIGH",
    value: value,
    message: Messages.HUMIDITY_HIGH_NOTIFICATION(value),
    title : "Yüksek Nem"

  };
}

function HUMIDITY_LOW(value) {
  return {
    type: "HUMIDITY_LOW",
    value: value,
    message: Messages.HUMIDITY_LOW_NOTIFICATION(value),
    title : "Düşük Nem"
  };
}

module.exports = {
  TEMPERATURE_HIGH,
  HUMIDITY_HIGH,
  TEMPERATURE_LOW,
  HUMIDITY_LOW,
};
