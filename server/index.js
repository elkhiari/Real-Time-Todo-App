const app = require("express")();
const server = require("http").createServer(app);
const { allSocket } = require("./socket/index");
const connection = require("./db/config.db");
require("dotenv").config();
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
  },
});

allSocket(io);

connection(process.env.MONGO_URI);
server.listen(3000, () => {
  console.log("listening on *:3000");
});
