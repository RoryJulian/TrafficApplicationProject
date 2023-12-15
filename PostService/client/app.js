var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/post.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var post_proto = grpc.loadPackageDefinition(packageDefinition).post
var client = new post_proto.PostService("0.0.0.0:40000", grpc.credentials.createInsecure());

console.log("Welcome to the Trip Cost Calculator. Please input the below required details and we will confirm the total cost of your journey.\n")
var number1 = readlineSync.question("How much in Euro did you spend on tolled roads?\n\n")
var number2 = readlineSync.question("How much in Euro did you spend on Parking?\n\n")

try{
    client.add({number1: number1, number2: number2}, function(error, response) {
       try{
        if(response.message){
            console.log(response.message)
        }else {
            console.log("The total amount spent on your journey came to " + response.result + " Euro.")
        }
       } catch(e) {
        console.log("Could not connect to server")
       }
    })

} catch(e) {
    console.log("An error occured")
}