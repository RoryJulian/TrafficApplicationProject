var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/newsfeed.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var newsfeed_proto = grpc.loadPackageDefinition(packageDefinition).newsfeed
var client = new newsfeed_proto.NewsfeedService("0.0.0.0:40000", grpc.credentials.createInsecure());

var amount = parseInt(readlineSync.question("Indicate using a number the information that would be most helpful to you\n\n 1. Postcodes containing roadworks\n 2. Postcodes containing tolled roads \n 3. Postcodes with high traffic levels\n \n"))
var call = client.generateNewsfeed({amount: amount})

call.on('data', function(response) {
    console.log("Postcode = Dublin: " + response.value)
})

call.on('end', function() {

})

call.on('error', function(e){
    console.log("An error occured")
})