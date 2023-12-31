var readlineSync = require('readline-sync')
var readline = require('readline')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/chat.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var chat_proto = grpc.loadPackageDefinition(packageDefinition).chat
var client = new chat_proto.ChatService("0.0.0.0:40000", grpc.credentials.createInsecure());

var call = client.makeChat()
call.on('data', function(resp){
    console.log("\n" + resp.name + " has an estimated delay time of " + resp.chat + " minutes. " + resp.name + " has been reported " + resp.chatNo + " time(s). " + resp.message + "\n")
})

call.on('end', function(){

})
//Custom error message included for when users are no longer connected to the server 
call.on("error", function(e){
    console.log("\nUh-Oh, an error occured, you are no longer connected to the server.\n")
})

var user = readlineSync.question("Welcome to the Incident Report Chat Service. Please enter the Road Name and County experiencing delays. \n\n")

console.log("\nWhat is your estimated delay time in minutes? (q to Quit) \n\n")
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', function(chat){
    if(chat.toLowerCase() === "q"){
        call.end()
        rl.close()
    } else{
        call.write({
            chat: parseFloat(chat),
            name: user
        })
    }
})
