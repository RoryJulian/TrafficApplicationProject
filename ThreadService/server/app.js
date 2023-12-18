var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/thread.proto"
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH
)
var thread_proto = grpc.loadPackageDefinition(packageDefinition).thread

//The below function is used to take mutiple inputs from the user and when they confirm, a single output is provided 
function calculateThread(call, callback) {
  var count = 0
  var total = 0

  call.on('data', function(request) {
    total += request.number
    count += 1;
  })


call.on("end", function() {
  callback(null, {
    mean: total / count
  })
})

call.on('error', function(e) {
  console.log("An error occurred")
})

}

var server = new grpc.Server()
server.addService(thread_proto.ThreadService.service, {calculateThread: calculateThread})
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
  server.start()
})
