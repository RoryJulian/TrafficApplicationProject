var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/newsfeed.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var newsfeed_proto = grpc.loadPackageDefinition(packageDefinition).newsfeed
var client = new newsfeed_proto.NewsfeedService("0.0.0.0:40000", grpc.credentials.createInsecure());

//Welcome message and prompt for user to select information that is relevant for them 
console.log("Welcome to the Smart Traffic Newsfeed, where you can get all the updates you need to arrive safe and on time!")
var amount = parseInt(readlineSync.question("Indicate using a number the information that would be most helpful to you\n\n 1. Postcodes containing roadworks/diversions\n 2. Postcodes containing tolled roads \n 3. Postcodes with high current traffic levels\n \n"))
var call = client.generateNewsfeed({amount: amount})


console.log("\nPlease see below results based on your desired information:\n")
call.on('data', function(response) {
    console.log("\nPostcode = Dublin: " + response.value + "\n")
})

call.on('end', function() {

})
//Custom error message created to show when users are no longer connected to the server 
call.on('error', function(e){
    console.log("Uh-oh, an error occured, you are no longer connected to the server.")
})