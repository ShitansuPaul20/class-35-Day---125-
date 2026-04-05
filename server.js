const app = import("./src/app.js");
const { createServer } = require("http");
const { Server } = require("socket.io");



const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
    socket.on("message", (msg) => {
        console.log("Message: " + msg);
        io.emit("message", msg);
    });
});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});