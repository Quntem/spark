var express = require("express")
var app = express()
const fs = require('fs');
const vm = require('vm');
var socket = require('socket.io')

var cat = ""

var fnlistpos = 0

var globfolder = ""

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

var loadServerFunctions = function() {
    sparkbe.serverfunction = function(namea, fna) {
        serverfunctions.push({
            fn: fna,
            name: namea,
        })
    }

    serverfunctions = [
        
    ]

    const befolder = fs.readdirSync("./src/backend")

    befolder.forEach(item => {
        code = fs.readFileSync('./src/backend/' + item, 'utf8');
        eval(code);
    })

    sparkbe.serverfunction = function(namea, fna) {
        serverfunctions.push({
            fn: fna,
            name: globfolder + "/" + namea,
        })
    }

    try {
        const sfmodules = fs.readdirSync("./src/modules")
        sfmodules.forEach(item => {
            globfolder = item
            const innerfiles = fs.readdirSync("./src/modules/" + globfolder + "/backend")
            //console.log(innerfiles)
            innerfiles.forEach(item => {
                code = fs.readFileSync("./src/modules/" + globfolder + "/backend/" + item, 'utf8');
                eval(code);
            })
        })
    } catch {

    }
    //console.log(serverfunctions)
}

loadServerFunctions()

fs.watch(("./src/backend"), (eventType, fileName) => {
    //console.log(fileName + " was modified: reloading server functions")
    loadServerFunctions()
})

app.use(express.json())

app.get("/serverfunction/:fnname(*)", (req, res) => {
    const fnname = req.params.fnname;

    
    serverfunctions.forEach(el => {
        //console.log(el)
        //console.log(fnname)
        if (el.name == fnname) {
            //console.log("activated")
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
            el.fn(sf);
        }
    });
});

app.use(express.static("./"))

var server = app.listen(5500, () => {
    console.log("Spark Framework Server:")
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
            //console.log(err)
        }
    })
});
