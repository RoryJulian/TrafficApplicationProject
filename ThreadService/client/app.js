var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/thread.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var thread_proto = grpc.loadPackageDefinition(packageDefinition).thread
var client = new thread_proto.ThreadService("0.0.0.0:40000", grpc.credentials.createInsecure());

var call = client.calculateThread(function(error, response){
    if(error){
        console.log("An error occured, it looks like you are no longer connected to the server")
    } else {
        console.log("We estimate that this journey on the M50 will take you " + response.mean + " minutes. Thank you for using the M50 Traffic Planner.")
    }
})

var user_input 
console.log("Welcome to the M50 Traffic Planner. Please enter the duration of your most recent trips (in minutes) on the M50 and we will collate this our realtime data to provide an accurate journey duration estimate!\n")
while(true){
    user_input = readlineSync.question("Please enter previous journey duration in minutes (q to Quit):\n\n")
    if(user_input.toLowerCase() === "q") {
        break
    }
    call.write({number: parseFloat(user_input)})
}
call.end()