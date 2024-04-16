var PROTO_PATH = __dirname + '/protos/news.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var news_proto = grpc.loadPackageDefinition(packageDefinition).news;

/**
 * Implements the SayNews RPC method.
 */
function sayNews(call, callback) {
  callback(null, {content: 'News with title: ' + call.request.title, priority: 10});
}

/**
 * Starts an RPC server that receives requests for the News service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(news_proto.News.service, {sayNews: sayNews});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

module.exports = main;
