const express = require("express");
const cors = require('cors')
const grpcServer = require('./grpc/server');
const kafka = require('kafka-node');

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

const kafkaClient = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
const kafkaTopics = [{ topic: 'booking' }];
const kafkaConsumer = new kafka.Consumer(kafkaClient, kafkaTopics, { autoCommit: true });

// Set up the event handlers
kafkaConsumer.on('message', function (message) {
  console.log('Received message:', message);
});

kafkaConsumer.on('error', function (error) {
  console.error('Error in consumer:', error);
});


const port = process.env.APP_PORT || "3002";
app.listen(port, function() {
    console.log('server running on port ' + port + '.');
});