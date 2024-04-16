const express = require("express");
const cors = require('cors')
const grpcServer = require('./grpc/server');

require("@opentelemetry/api");

const app = express();

app.use(cors());

app.all("/", (req, res) => {
  res.json({ method: req.method, message: "You are accessing Micro App", ...req.body });
});

app.all("/command", async (req, res) => {
  try {
    res.json({ success: "true", message: "Success execute command" });
  } catch (error) {
      console.error('Error:', error);
  }
});

// run grpc server
grpcServer();

const port = process.env.APP_PORT || "3002";
app.listen(port, function() {
    console.log('server running on port ' + port + '.');
});