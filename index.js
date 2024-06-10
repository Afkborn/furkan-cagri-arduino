const express = require("express");
const app = express();
const expressPort = 8080;
const wsPort = 3232;
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const { handleWebSocketConnection } = require("./routes/sensor-websocket");
const getTimeForLog = require("./common/time");


// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// parse application/json
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// WebSocket Server
const wss = new WebSocket.Server({ port: wsPort });
wss.on("connection", handleWebSocketConnection);
console.log(getTimeForLog() + `WebSocket server started on port ${wsPort}`);

const sensors = require("./routes/sensors");
app.use("/sensors", sensors);
console.log(getTimeForLog() + "Sensors route added");

app.listen(expressPort, () => {
  console.log(
    getTimeForLog() + `Express server started on port ${expressPort}`
  );
});
 