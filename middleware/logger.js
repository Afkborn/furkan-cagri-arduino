const getTimeForLog = require("../common/time");

module.exports = async = (reqID) => (request, _, next) => {
  const clientIP =
    request.headers["x-forwarded-for"] || request.socket.remoteAddress;
  console.log(getTimeForLog() + `Request Type: ${reqID}, [IP:${clientIP}]`);
  next();
};
