![GitHub Repo stars](https://img.shields.io/github/stars/Quntem/spark?style=for-the-badge)
![GitHub Release](https://img.shields.io/github/v/release/Quntem/spark?include_prereleases&display_name=tag&style=for-the-badge)

### This repository is shared between the Spark Framework and UIDraw.

# Overview
## What is Spark Framework?
Spark Framework is a simple backend that intergrates with UIDraw. It provides simple backend functionality through server functions.

## What is UIDraw?
UIDraw is a simple way to create UI without any complexity. It is designed to be simlar to SwiftUI, but it is not exactly the same. Below is an example snippet for UIDraw.

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

// Finally, render the view to the browser.
newview.render()
```

# Spark & UIDraw Documentation
This page will introduce the basics of UIDraw and Spark Framework.

## Spark Framework
Spark Framework is a simple backend that intergrates with UIDraw. It provides simple backend functionality through server functions.

### Elements
Elements are JavaScript functions. Here's an example for text elements:
```javascript
    UDTextNode("text")
```

Some elements accept more elements as a parameter. Here's an example for ```UDHorStack```. The following code displays how it works.
```javascript
    UDHorStack(() => {
        // Child Elements
        UDTextNode("Text")
        UDTextNode("Text2")
    })
```

Elements use modiers to modify themselves. A number of them should be shown by your IDE when you type a ".".

You can chain modifiers as shown below:
```javascript
    UDHorStack(() => {
        UDTextNode("Text")
        UDTextNode("Text2")
    })
        // Parameters
        .gap(10)
        .style.backgroundColor("red")
```

Some modifiers may take JS code as a parameter.
```javascript
    UDButton("Test", "star")
        .onclick(() => {
            //JS code
            console.log("Test")
        })
```

### Adding Classes
You can add classes by using .customCode which was introduced in version 0.2.1.
```javascript
    UDHeader("Header").universal.customCode((el) => {
        $(el.ement).addClass("classname")
    })
```

Then, you can use the class for styling.
```javascript
var mainUIDrawView = new UIDrawView(() => {
    UDCustomCSS(`
        .classname {
            color: white !important;
        }
    `)

    UDAnchorPoint(() => {
        UDHeader("Header").universal.customCode((el) => {
            $(el.ement).addClass("classname")
        })
    })
})
```
This will make the text white via CSS.

### Rendering with UIDraw

To render the UI, you must use a ```UIDrawView```, and then render it when the page loads.

```javascript
    var mainView = new UIDrawView(() => {
        Text("demo")
    })

    // You don't need to wait until the page is loaded, but it's recommended to do so.
    window.addEventListener("load" => {
        mainView.render()
    })
```

> There may be unexpected effects using this code, but is recommended to use it.

### Common Usage

We’re still working on this section of the documentation. Take a look at [this document](https://gist.github.com/OscarMayReal/406c9d84f02718b45b1fccb0abab9953#common-usage) for now.

## Installation
To create a new project with the Spark Framework. Run ```npx create-spark-app```. This will create a new folder with your

> More information will be given soon!
