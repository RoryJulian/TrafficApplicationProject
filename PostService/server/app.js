var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/post.proto"
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH
)
var post_proto = grpc.loadPackageDefinition(packageDefinition).post

function add(call, callback){
    try{
        var number1 = parseInt(call.request.number1)
        var number2 = parseInt(call.request.number2)
        if(!isNaN(number1) && !isNan(number2)){
            var result = number1 + number2
            callback(null, {
                message: undefined,
                result: result
            })
        } else{
            callback(null, {
                message: "Please specify two numbers"
            })
        }
    } catch(e) {
        callback(null, {
            message: "Thank you for submitting, your post was successful."
        })
    }
}

var server = new grpc.Server()
server.addService(post_proto.PostService.service, {add: add})
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function(){
    server.start()
})





