var views = {
    MainLayout: new UIDrawView(() => {
        UDTabView([
            {
                name: "Home",
                icon: "home",
                view: () => {views.HomeView.render()}
            },
            {
                name: "Download",
                icon: "download",
                view: () => {views.DownloadView.render()}
            }
        ])
    }),
    HomeView: new UIDrawView(() => {
        UDNavView(() => {
            UDInnerPadding(() => {
                UDTextNode("What is UIDraw?")
                    .type("h3")
                UDTextNode("UIDraw is a simple UI framework that allows you to build you app fully with JS")
                UDTextNode("Example:")
                UDMarkdownBlock(`
                    \`\`\`
                    //defining the base view
                    var newview = new UIDrawView(() => {
                        //splitview creates a 2 pane design for your applications
                        UDSplitView(() => {
                            UDListSection(() => {
                                //Label and an icon are passed into this element
                                UDNavItem("Home", "home")
                                    //Modifiers are used to add extra functionality or design to an element
                                    .onclick(() => {
                                        //views can be navigated to, this will render the view in the current navigationcontext
                                        homepage.navigateto()
                                    })
                                UDNavItem("Library", "library")
                                    .onclick(() => {
                                        librarypage.navigateto()
                                    })
                            })
                                .title("App")
                        }, () => {
                            //rendering another view within this view
                            homepage.render()
                        })
                            .title("App Title")
                    })

                    var homepage = new UIDrawView(() => {
                        //a NavView can have a title assigned to it
                        UDNavView(() => {
                            //JS code can be run inside the render loop
                            newlist = ["item1", "item2", "item3"]
                            newlist.forEach(item => {
                                UDTextNode(item)
                                    .color("red")
                            });
                        })
                        .title("Home")
                    })

                    var librarypage = new UIDrawView(() => {
                        UDNavView(() => {
                            newlist = ["item1 page2", "item2 page2", "item3 page2"]
                            newlist.forEach(item => {
                                UDTextNode(item)
                                    .color("green")
                            });
                        })
                        .title("Library")
                    })

                    //finally render the view to the browser
                    newview.render()
                    \`\`\`
                `)
            })
        })
        .title("UiDraw (Alpha)")
    }),
    DownloadView: new UIDrawView(() => {
        UDNavView(() => {
            UDInnerPadding(() => {
                UDTextNode("You can download UIDraw from its github repo")
                UDButton("Github", "github")
                    .color("black")
                    .onclick(() => {
                        window.location.assign("https://www.github.com/oscarmayreal/UIDraw")
                })
            })
        })
        .title("Download")
    })
}

views.MainLayout.render()