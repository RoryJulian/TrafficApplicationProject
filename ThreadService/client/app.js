var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/thread.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var thread_proto = grpc.loadPackageDefinition(packageDefinition).thread
var client = new thread_proto.ThreadService("0.0.0.0:40000", grpc.credentials.createInsecure());

var call = client.calculateThread(function(error, response){
    if(error){
        console.log("An error occured")
    } else {
        console.log("The mean is " + response.mean)
    }
})

var user_input 

while(true){
    user_input = readlineSync.question("Enter a number (q to Quit):")
    if(user_input.toLowerCase() === "q") {
        break
    }
    call.write({number: parseFloat(user_input)})
}
call.end()