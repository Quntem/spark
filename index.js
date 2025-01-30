var express = require("express")
var app = express()
const fs = require('fs');
const vm = require('vm');
var socket = require('socket.io')
app.use(express.json())

var cat = ""

var fnlistpos = 0

var serverfunctions = [
    
]

var sparkbe = {
    serverfunction: function(namea, fna) {
        serverfunctions.push({
            fn: fna,
            name: namea,
        })
    }
}

const code = fs.readFileSync('./src/backend/api.js', 'utf8');
eval(code);

app.get("/serverfunction/:fnname", (req, res) => {
    fnname = req.params.fnname
    serverfunctions.forEach(el => {
        if (el.name == fnname) {
            sf = {
                "inputs": req.body,
                "response": {
                    "SendJson": function(response) {
                        res.json(response)
                    },
                    "SendText": function(response) {
                        res.send(response)
                    },
                }
            }
            el.fn(sf)
        }
    })
})

app.use(express.static("./"))

var server = app.listen(5500, () => {
    console.log("listening on 5500")
})

const io = socket(server)

io.on("connection", (socket) => {
    socket.on("Collabkit.EnterRoom", (data) => {
        payload = JSON.parse(data)
        socket.join(payload.room)
        socket.emit("Collabkit.EnterRoom.Response", "joined " + payload.room)
    })
    socket.on("Collabkit.MouseUpdate", (data) => {
        try {
            var payload = JSON.parse(data)
            // var res = {
            //     "user": payload.user,
            //     "room": payload.room,
            //     "x": payload.x,
            //     "y": payload.y
            // }
            io.to(payload.room).emit("Collabkit.MouseUpdate.Message", JSON.stringify({
                "user": payload.user,
                "room": payload.room,
                "x": payload.x,
                "y": payload.y
            }))
        } catch(err) {
            console.log(err)
        }
    })
});
