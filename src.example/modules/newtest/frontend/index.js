var testview = new UIDrawView(() => {
    var loadanchor = ""
    var response = ""
    UDButton("Run Server Function", "server")
        .onclick(async () => {
            response = await sparkutils.serverfunctions.call("newtest/testfunction")
            console.log(response)
            loadanchor.render()
        })

    loadanchor = UDAnchorPoint(() => {
        UDTextNode(response)
    })
})