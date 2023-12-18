var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/post.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var post_proto = grpc.loadPackageDefinition(packageDefinition).post
var client = new post_proto.PostService("0.0.0.0:40000", grpc.credentials.createInsecure());

//Welcome message and questions for user interaction
console.log("Welcome to the Trip Cost Calculator. Please input the below required details and we will confirm the total cost of your journey.\n")
var number1 = readlineSync.question("How much in Euro did you spend on tolled roads?\n\n")
var number2 = readlineSync.question("How much in Euro did you spend on Parking?\n\n")

//Implementation of the add function to take input from the user and provide output 
try{
    client.add({number1: number1, number2: number2}, function(error, response) {
       try{
        if(response.message){
            console.log(response.message)
        }else {
            console.log("\nThe total amount spent on your journey came to " + response.result + " Euro.\n")
        } 
        //Custom error messaging can be seen below for when users are not connected to the server
       } catch(e) {
        console.log("Uh-Oh, an error occured, it appears you are not connected to the server!")
       }
    })

} catch(e) {
    console.log("An error occured")
}