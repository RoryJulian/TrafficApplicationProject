var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/post.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var post_proto = grpc.loadPackageDefinition(packageDefinition).post
var client = new post_proto.PostService("0.0.0.0:40000", grpc.credentials.createInsecure());

var number1 = readlineSync.question("Please indicate your update type.\n1. High Traffic\n2. Roadworks/Diversions\n\n")
var number2 = readlineSync.question("What is the postcode you are currently in? (i.e. Dublin ___?)\n\n")

try{
    client.add({number1: number1, number2: number2}, function(error, response) {
        if(response.message){
            console.log(response.message)
        }else {
            console.log(response.result)
        }
    })

} catch(e) {
    console.log("An error occured")
}