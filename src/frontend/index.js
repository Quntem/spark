var newstack = ""
var splitview = ""

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

var x = 0
var celement = ""

var state = StateVar(0)

var headertest = new UIDrawView(() => {
    UDNavView(() => {
        // UDHeader("test")
        //     .headerstyle("center")
        //     .leading(() => UDIconNode("navigation"))
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
            celement = MyComponent(state.content, () => {
                UDButton("button title")
            })
                .bindstate(state)
            UDVerStack(() => {

            })
                .style.height(100)
                .style.width(150)
                .style.radius.all(8)
                .style.border.all({
                    width: 1,
                    color: "#e4e4e7"
                })
                .style.backgroundColor("white")
        })
            .style.padding.top(20)
    })
        .style.backgroundColor("rgb(245, 245, 245)")
        .title("Header Testing")
        // .header.leading(() => UDIconNode("navigation"))
        .header.leading(() => {
            sidebartoggle.headerinst = sidebartoggle.header()
        })
        .trailing(() => UDIconNode("navigation"))
        // .headerstyle("min")
        .style.border.bottom({
            width: 1,
            color: "#e4e4e7"
        })
        .style.backgroundColor("white")
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

var showpopup = StateVar(false)

var mainView = new UIDrawView(() => {
    splitview = UDSplitView(() => {
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
        .header.leading(() => {
            sidebartoggle.sidebarinst = sidebartoggle.sidebar()
                UDIconNode("star")
                    .universal.elementclick(() => {
                        showpopup.update(true)
                    })
        })
        // .header.headerstyle("min")
    UDPopOver(() => {
        UDTextNode("Test")
            .universal.elementclick(() => {
                showpopup.update(false)
            })
    }, showpopup)
})

window.onload = () => {
    mainView.render()
}

//define the custom component

var MyComponent = new UIDrawComponent((title, component) => {
    UDVerStack(() => {
        UDTextNode(state.content)
        UDHorStack(component)
            .gap(10)
    })
}, {
    params: 2,
    type: "stateful"
})

//usage example
var newview = new UIDrawView(() => {
    UDNavView(() => {
        //use the custom component just like any other
        MyComponent("Test", () => {
            UDButton("button title")
        })
    })
        .title("Title Text")
})

var sidebartoggle = {}

sidebartoggle.sidebar = new UIDrawComponent(() => {
    if($("splitviews1").is(":visible")) {
        UDIconNode("panel-left")
            .universal.elementclick(() => {
                $("splitviews1").animate({
                    width: 0,
                    minWidth: 0,
                    maxWidth: 0
                }, animduration, () => {
                    $("splitviews1").hide()
                    sidebartoggle.sidebarinst.render()
                    sidebartoggle.headerinst.render()
                })
            })
    }
}, {
    params: 0,
    type: "stateful"
})

sidebartoggle.header = new UIDrawComponent(() => {
    if(!$("splitviews1").is(":visible")) {
        UDIconNode("panel-left")
            .universal.elementclick(() => {
                $("splitviews1").show()
                sidebartoggle.sidebarinst.render()
                sidebartoggle.headerinst.render()
                $("splitviews1").animate({
                    width: 275,
                    minWidth: 275,
                    maxWidth: 275
                }, animduration, () => {
                })
            })
    }
}, {
    params: 0,
    type: "stateful"
})