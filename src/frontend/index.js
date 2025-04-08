var newstack = ""

// var loadanchor = ""

sparkutils.loadmodule("newtest")

var sftest = new UIDrawView(() => {
    UDNavView(() => {
        UDInnerPadding(() => {
            newstack = UDVerStack(() => {
                UDButton("Function 1", "server")
                    .onclick(() => {
                        console.log(sparkutils.serverfunctions.call("test1"))
                    })
                UDButton("Function 2", "server")
                    .onclick(() => {
                        console.log(sparkutils.serverfunctions.call("test2"))
                    })
            })
                .gap(10)
            testview.render()
        })
    })
        .title("SF Testing")
})

var betest = new UIDrawView(() => {
    UDNavView(() => {
        UDInnerPadding(() => {
            newstack = UDVerStack(() => {
                UDButton("Log button Event", "mouse")
                    .onclick(() => {
                        console.log(latestevent)
                    })
                UDButton("In Place Navigation", "navigation")
                    .onclick(() => {
                        betest_navtest.navigateto()
                    })
            })
                .gap(10)
        })
    })
        .title("Event Testing")
})

var headertest = new UIDrawView(() => {
    UDNavView(() => {
        UDHeader("test")
            .headerstyle("center")
            .leading(() => UDIconNode("navigation"))
        UDInnerPadding(() => {
            newstack = UDVerStack(() => {
                UDButton("Log button Event", "mouse")
                    .onclick(() => {
                        console.log(latestevent)
                    })
                UDButton("In Place Navigation", "navigation")
                    .onclick(() => {
                        betest_navtest.navigateto()
                    })
            })
                .gap(10)
        })
    })
        // .title("Header Testing")
        // .header.leading(() => UDIconNode("navigation"))
})

var betest_navtest = new UIDrawView(() => {
    UDNavView(() => {
        UDInnerPadding(() => {
            newstack = UDVerStack(() => {
                UDTextNode("New Page")
                UDButton("Go Back", "navigation")
                    .onclick(() => {
                        betest.navigateto()
                    })
            })
                .gap(10)
        })
    })
        .title("New Page")
        .header.leading(() => {
            UDButton("Back", "arrow-left")
                .color("#ffffff00")
                .onclick(() => {
                    betest.navigateto()
                })
                .fgcolor("#666666")
        })
})

var mainView = new UIDrawView(() => {
    UDSplitView(() => {
        UDNavItem("Server Functions", "server")
            .onclick(() => {
                sftest.navigateto()
            })
        UDNavItem("button Events", "mouse")
            .onclick(() => {
                betest.navigateto()
            })
        UDNavItem("Header Testing", "panel-top")
            .onclick(() => {
                headertest.navigateto()
            })
        UDNavItem("recursion", "file")
            .onclick(() => {
                mainView.navigateto()
            })
    }, () => {
        sftest.render()
    })
        .title("Testing App")
        // .header.headerstyle("min")
})

window.onload = () => {
    mainView.render()
}