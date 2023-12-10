var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/newsfeed.proto"
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH
)
var newsfeed_proto = grpc.loadPackageDefinition(packageDefinition).newsfeed

function generateNewsfeed(call, callback){
  for(var i=0; i < call.request.amount; i++){
    call.write({
      value: Math.round(Math.random() * 10)
    })
  }
  call.end()
}

var server = new grpc.Server()
server.addService(newsfeed_proto.NewsfeedService.service, {generateNewsfeed: generateNewsfeed})
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
  server.start()
})
