var CollabKit = {
    JoinRoom: function(roomname) {
        socket.on("Collabkit.EnterRoom.Response", (ev) => {
            console.log(ev)
            CollabKit.AutoSendCursor = true
        });
        socket.on("Collabkit.MouseUpdate.Message", (ev) => {
            res = JSON.parse(ev)
            if (res.user != CollabKit.CurrentUser) {
                console.log(ev)
                if ($('#' + res.user + ".CollabKitMousePointer").length > 0) {
                    // $('#' + res.user + ".CollabKitMousePointer").offset({ top: res.y, left: res.x })
                    $('#' + res.user + ".CollabKitMousePointer").stop()
                    $('#' + res.user + ".CollabKitMousePointer").animate({
                        top: res.y,
                        left: res.x
                    }, 50)
                } else {
                    $("body").append(`<div id="` + res.user + `" class="CollabKitMousePointer"></div>`)
                    $('#' + res.user + ".CollabKitMousePointer").offset({ top: res.y, left: res.x })
                }
            }
        });
        socket.emit("Collabkit.EnterRoom", JSON.stringify({
            "room": roomname,
        }))
        CollabKit.CurrentRoom = roomname
    },
    CurrentRoom: "",
    CurrentUser: "",
    UpdateCursor: function(x, y) {
        socket.emit("Collabkit.MouseUpdate", JSON.stringify({
            "room": CollabKit.CurrentRoom,
            "user": CollabKit.CurrentUser,
            "x": x,
            "y": y
        }))
    },
    AutoSendCursor: false,
    LastMousePos: {
        x: 0,
        y: 0,
    },
    CurrentMousePos: {
        x: 0,
        y: 0,
    },
    MouseMoveFreshold: 10,
    mousealg: "interval"
}

window.onmousemove = function(event) {
    CollabKit.CurrentMousePos.x = event.clientX
    CollabKit.CurrentMousePos.y = event.clientY
    if (CollabKit.AutoSendCursor == true && CollabKit.mousealg == "move") {
        if (event.clientX > CollabKit.LastMousePos.x + CollabKit.MouseMoveFreshold || event.clientX < CollabKit.LastMousePos.x - CollabKit.MouseMoveFreshold || event.clientY > CollabKit.LastMousePos.y + CollabKit.MouseMoveFreshold || event.clientY < CollabKit.LastMousePos.y - CollabKit.MouseMoveFreshold) {
            CollabKit.UpdateCursor(event.clientX, event.clientY)
            CollabKit.LastMousePos.x = event.clientX
            CollabKit.LastMousePos.y = event.clientY
        }
    }
}

setInterval(() => {
    if (CollabKit.AutoSendCursor == true && CollabKit.mousealg == "interval") {
        if (CollabKit.CurrentMousePos.x != CollabKit.LastMousePos.x || CollabKit.CurrentMousePos.y != CollabKit.LastMousePos.y) {
            CollabKit.UpdateCursor(CollabKit.CurrentMousePos.x, CollabKit.CurrentMousePos.y)
            CollabKit.LastMousePos.x = CollabKit.CurrentMousePos.x
            CollabKit.LastMousePos.y = CollabKit.CurrentMousePos.y
        }
    }
}, 100);