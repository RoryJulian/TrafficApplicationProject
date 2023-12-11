var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/chat.proto"
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH
)
var chat_proto = grpc.loadPackageDefinition(packageDefinition).chat

var chats = {

}

var clients = {

}

var highestChat = 0
var message = null 

function makeChat(call){

    call.on('data', function(chat) {
      if(!(chat.name in clients)) {
        clients[chat.name] = {
          name: chat.name,
          call: call
        }
      }

      if(!(chat.name in chats)){
        chats[chat.name] = 0
      }
      chats[chat.name] += 1 
      if(chat.chat > highestChat || !message){
        highestChat = chat.chat
        message = "Current highest expected delay is on " + chat.name + " with an estimated delay time of " + highestChat + " minutes."
      }

      for(var client in clients){
        clients[client].call.write(
          {
            chat: chat.chat,
            name: chat.name,
            chatNo: chats[chat.name],
            message: message
          }
        )
      }
    })

    call.on('end', function(){
      call.end()
    })
    call.on("error", function(e){
      console.log(e)
    })
}

var server = new grpc.Server()
server.addService(chat_proto.ChatService.service, {makeChat: makeChat})
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
  server.start()
})
