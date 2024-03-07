const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.get("/socket", (req, res) => {
    res.send("<h1>Socket</h1>")
})

io.on("connection", (socket) => {
   // console.log("connection", socket)

    socket.emit("chat", {message: "Hello world", user: "BOT"})

    socket.on("chat", (arg) => {
        console.log("incoming chat", arg);
        io.emit("chat", arg);
    })

})

server.listen(process.env.PORT || '3000');