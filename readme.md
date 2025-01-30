# Intro
This page will introduce the basics of UIDraw and Spark Framework
  
## UIDraw
UIDraw is a simple way to create UI without any complexity. It is designed to be simlar to SwiftUI, but it is not exactly the same. Below is an example snippet.

```javascript
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
```

## Spark Framework  
Spark Framework is a simple backend that intergrates with UIDraw. It provides simple backend functionality through server functions.  

```javascript
// backend/api.js

// define the server function with a name
sparkbe.serverfunction("files", (sf) => {
    fs.readdir("files", (err, files) => {
        if(!err) {
            // send a JSON object back to the client
            sf.response.SendJson({
                "files": files
            })
        } else {
            throw err 
        }
    })
})
```
Calling this function can then easily be done from the frontend  
```javascript
// frontend/index.js

// wait for the page to load
window.onload = async () => {
    // call the server function and await the response
    filelist = await sparkutils.serverfunctions.call("files")
    // render the page
    newview.render()
}
```
Spark Framework makes it easier to get started with web development because it provides an easy to understand relationship between the client and server.  
this repo also contains collabKit, an easy way to add live cursors to your UIDraw app