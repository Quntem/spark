sparkbe.serverfunction("test1", (sf) => {
    sf.response.SendJson({"test":"test"})
})