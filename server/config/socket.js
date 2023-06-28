const socketIO = require("socket.io");

function initializeSocket(server) {
  const io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.ORIGIN,
    },
  });

  io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData);
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
      if (!chat.users) return console.log("chat.users not defined");
      chat.users.forEach((user) => {
        if (user.refId == newMessageRecieved.sender.refId) return;
        socket.in(user.refId).emit("message recieved", newMessageRecieved);
      });
    });

    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData);
    });
  });

  return io;
}

module.exports = initializeSocket;
