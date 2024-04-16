const express = require("express");
const cors = require('cors')
const fetch = require('node-fetch');
const grpcClient = require('./grpc/client');

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

const port = process.env.APP_PORT || "3002";
app.listen(port, function() {
    console.log('server running on port ' + port + '.');
});