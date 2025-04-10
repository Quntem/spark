rendercontext = document.getElementById("mainview")
navigatepos = document.getElementById("mainview")

var latestevent = ""

var hash = window.location.hash;
if (window.location.hash == "") {
    window.location.hash = "#nav"
}
setInterval(function(){
    if (window.location.hash != hash) {
        hash = window.location.hash;
        if (window.location.hash == "#nav") {
            $(navigatepos).animate({
                left: "100vw"
            }, 150)
        }
    }
}, 10);

class UIDrawView {
    constructor(view, opt) {
        this.options = opt
        this.view = view
    }

    render() {
        this.view()
    }

    renderel(element) {
        rendercontext = element
        this.view()
    }

    navigateto() {
        // navigatepos.style.left = 0
        navigatepos = $(latestevent.srcElement).closest(".navigateable-element").find(".navigatepos")[0]
        navigatepos.innerHTML = ""
        this.oldrc = rendercontext
        rendercontext = navigatepos
        this.view()
        rendercontext = this.oldrc
        window.location.hash = "#page"
        $(navigatepos).animate({
            left: "0vw"
        }, 100)
    }
}

class UIDrawComponent {
    constructor(definition, options) {
        const Component = function (...params) {
            if (!(this instanceof Component)) {
                return new Component(...params);
            }
            this.params = params;
            this.oldrc = rendercontext;
            this.element = document.createElement("div");
            rendercontext = this.element;
            definition(...params);
            rendercontext = this.oldrc;
            this.style = deepBindFunctions(styleoperations, this);
            this.universal = deepBindFunctions(universaloperations, this);
            this.oldrc.append(this.element);
        };

        if (options.type === "stateful") {
            Component.prototype.render = function () {
                this.element.innerHTML = "";
                this.oldrc = rendercontext;
                rendercontext = this.element;
                definition(...this.params);
                rendercontext = this.oldrc;
            };

            Component.prototype.bindstate = function (statevar) {
                this.bindedstateval = statevar.content;
                statevar.bindelement(this);
                this.render();
                return this
            };
        }

        return Component;
    }
}

// Example usage:
// Stateless component:
// var MyComponent = new UIDrawComponent((title, content) => {
//     UDVerStack(() => {
//         UDTextNode(title);
//         content();
//     });
// }, {
//     type: "stateless"
// });

// Usage:
// MyComponent("Test", () => {
//     UDButton("button title");
// });

// Stateful component:
// var MyStatefulComponent = new UIDrawComponent(function (title, content) {
//     UDVerStack(() => {
//         UDTextNode(title);
//         content();
//     });
// }, {
//     type: "stateful"
// });

// const state = new StateVar("Initial Title");
// const statefulInstance = MyStatefulComponent(state.content, () => {
//     UDButton("button title");
// });
// statefulInstance.bindstate(state);
// state.update("Updated Title");

function deepBindFunctions(obj, context) {
    const result = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];

        if (typeof value === "function") {
            result[key] = value.bind(context);
        } else if (typeof value === "object" && value !== null) {
            result[key] = deepBindFunctions(value, context);
        } else {
            result[key] = value;
        }
    }

    return result;
}


var styleoperations = {
    padding: {
        all: function(val) {
            if (typeof val === "number") {
                this.element.style.padding = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.padding = val
                return this
            } else if (val == undefined) {
                return this.element.style.padding
            }
        },
        left: function(val) {
            if (typeof val === "number") {
                this.element.style.paddingLeft = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.paddingLeft = val
                return this
            } else if (val == undefined) {
                return this.element.style.paddingLeft
            }
        },
        right: function(val) {
            if (typeof val === "number") {
                this.element.style.paddingRight = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.paddingRight = val
                return this
            } else if (val == undefined) {
                return this.element.style.paddingRight
            }
        },
        top: function(val) {
            if (typeof val === "number") {
                this.element.style.paddingTop = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.paddingTop = val
                return this
            } else if (val == undefined) {
                return this.element.style.paddingTop
            }
        },
        bottom: function(val) {
            if (typeof val === "number") {
                this.element.style.paddingBottom = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.paddingBottom = val
                return this
            } else if (val == undefined) {
                return this.element.style.paddingBottom
            }
        },
    },
    margin: {
        all: function(val) {
            if (typeof val === "number") {
                this.element.style.margin = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.margin = val
                return this
            } else if (val == undefined) {
                return this.element.style.margin
            }
        },
        left: function(val) {
            if (typeof val === "number") {
                this.element.style.marginLeft = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.marginLeft = val
                return this
            } else if (val == undefined) {
                return this.element.style.marginLeft
            }
        },
        right: function(val) {
            if (typeof val === "number") {
                this.element.style.marginRight = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.marginRight = val
                return this
            } else if (val == undefined) {
                return this.element.style.marginRight
            }
        },
        top: function(val) {
            if (typeof val === "number") {
                this.element.style.marginTop = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.marginTop = val
                return this
            } else if (val == undefined) {
                return this.element.style.marginTop
            }
        },
        bottom: function(val) {
            if (typeof val === "number") {
                this.element.style.marginBottom = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.marginBottom = val
                return this
            } else if (val == undefined) {
                return this.element.style.marginBottom
            }
        },
    },
    radius: {
        all: function(val) {
            if (typeof val === "number") {
                this.element.style.borderRadius = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.borderRadius = val
                return this
            } else if (val == undefined) {
                return this.element.style.borderRadius
            }
        },
        topLeft: function(val) {
            if (typeof val === "number") {
                this.element.style.borderTopLeftRadius = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.borderTopLeftRadius = val
                return this
            } else if (val == undefined) {
                return this.element.style.borderTopLeftRadius
            }
        },
        topRight: function(val) {
            if (typeof val === "number") {
                this.element.style.bordertopRightRadius = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.bordertopRightRadius = val
                return this
            } else if (val == undefined) {
                return this.element.style.bordertopRightRadius
            }
        },
        BottomLeft: function(val) {
            if (typeof val === "number") {
                this.element.style.borderBottomLeftRadius = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.borderBottomLeftRadius = val
                return this
            } else if (val == undefined) {
                return this.element.style.borderBottomLeftRadius
            }
        },
        bottomRight: function(val) {
            if (typeof val === "number") {
                this.element.style.BorderBottomRightRadius = val + "px"
                return this
            } else if (typeof val === "string") {
                this.element.style.BorderBottomRightRadius = val
                return this
            } else if (val == undefined) {
                return this.element.style.BorderBottomRightRadius
            }
        },
    },
    border: {
        all: function(val) {
            this.element.style.borderStyle = "solid"
            if (typeof val.width === "number") {
                this.element.style.borderWidth = val.width + "px"
            } else if (typeof val.width === "string") {
                this.element.style.borderWidth = val.width
            }
            if (typeof val.color === "string") {
                this.element.style.borderColor = val.color
            }
            if (val == undefined) {
                return {
                    width: this.element.style.borderWidth,
                    color: this.element.style.borderColor
                }
            } else {
                return this
            }
        },
        bottom: function(val) {
            this.element.style.borderBottomStyle = "solid"
            if (typeof val.width === "number") {
                this.element.style.borderBottomWidth = val.width + "px"
            } else if (typeof val.width === "string") {
                this.element.style.borderBottomWidth = val.width
            }
            if (typeof val.color === "string") {
                this.element.style.borderBottomColor = val.color
            }
            if (val == undefined) {
                return {
                    width: this.element.style.borderBottomWidth,
                    color: this.element.style.borderBottomColor
                }
            } else {
                return this
            }
        },
        top: function(val) {
            this.element.style.borderTopStyle = "solid"
            if (typeof val.width === "number") {
                this.element.style.borderTopWidth = val.width + "px"
            } else if (typeof val.width === "string") {
                this.element.style.borderTopWidth = val.width
            }
            if (typeof val.color === "string") {
                this.element.style.borderTopColor = val.color
            }
            if (val == undefined) {
                return {
                    width: this.element.style.borderTopWidth,
                    color: this.element.style.borderTopColor
                }
            } else {
                return this
            }
        },
        left: function(val) {
            this.element.style.borderLeftStyle = "solid"
            if (typeof val.width === "number") {
                this.element.style.borderLeftWidth = val.width + "px"
            } else if (typeof val.width === "string") {
                this.element.style.borderLeftWidth = val.width
            }
            if (typeof val.color === "string") {
                this.element.style.borderLeftColor = val.color
            }
            if (val == undefined) {
                return {
                    width: this.element.style.borderLeftWidth,
                    color: this.element.style.borderLeftColor
                }
            } else {
                return this
            }
        },
        right: function(val) {
            this.element.style.borderRightStyle = "solid"
            if (typeof val.width === "number") {
                this.element.style.borderRightWidth = val.width + "px"
            } else if (typeof val.width === "string") {
                this.element.style.borderRightWidth = val.width
            }
            if (typeof val.color === "string") {
                this.element.style.borderRightColor = val.color
            }
            if (val == undefined) {
                return {
                    width: this.element.style.borderRightWidth,
                    color: this.element.style.borderRightColor
                }
            } else {
                return this
            }
        },
    },
    height: function(val) {
        if (typeof val === "number") {
            this.element.style.height = val + "px"
            return this
        } else if (typeof val === "string") {
            this.element.style.height = val
            return this
        } else if (val == undefined) {
            return this.element.style.height
        }
    },
    width: function(val) {
        if (typeof val === "number") {
            this.element.style.width = val + "px"
            return this
        } else if (typeof val === "string") {
            this.element.style.width = val
            return this
        } else if (val == undefined) {
            return this.element.style.width
        }
    },
    backgroundColor: function(val) {
        if (typeof val === "string") {
            this.element.style.backgroundColor = val
            return this
        } else if (val == undefined) {
            return this.element.style.backgroundColor
        }
    },
    contentColor: function(val) {
        if (typeof val === "string") {
            this.element.style.color = val
            return this
        } else if (val == undefined) {
            return this.element.style.color
        }
    }
}

var universaloperations = {
    elementclick: function(fn) {
        console.log("onclick is now set")
        this.element.addEventListener("click", (event) => {latestevent = event})
        this.element.addEventListener("click", fn)
        return this
    }
}

function UDVerStack(el) {
    if(this instanceof UDVerStack) {
        this.el = el
        this.oldrc = rendercontext
        this.element = document.createElement("vstack")
        rendercontext = this.element
        this.oldrc.append(this.element)
        this.el()
        rendercontext = this.oldrc
        this.gap = function(gap) {
            if (typeof gap === "number") {
                this.element.style.gap = gap + "px"
                return this
            } else if (typeof gap === "string") {
                this.element.style.gap = gap
                return this
            } else if (gap == undefined) {
                return this.element.style.gap
            }
        }
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDVerStack(el);
    }
}

function UDAnchorPoint(el) {
    if(this instanceof UDAnchorPoint) {
        this.el = el
        this.oldrc = rendercontext
        this.element = document.createElement("vstack")
        rendercontext = this.element
        this.oldrc.append(this.element)
        this.udcode = el
        this.render = function() {
            this.oldrc = rendercontext
            rendercontext = this.element
            rendercontext.innerHTML = ""
            this.udcode()
            rendercontext = this.oldrc
            return this
        }
        this.bindstate = function(statevar) {
            statevar.bindelement(this)
            return this
        }
        rendercontext = this.oldrc
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDAnchorPoint(el);
    }
}

function UDInnerPadding(el) {
    if(this instanceof UDInnerPadding) {
        this.el = el
        this.oldrc = rendercontext
        this.element = document.createElement("innerpaddingnode")
        rendercontext = this.element
        this.oldrc.append(this.element)
        this.el()
        rendercontext = this.oldrc
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDInnerPadding(el);
    }
}


function UDPopOver(el, binding) {
    if(this instanceof UDPopOver) {
        this.el = el
        this.binding = binding
        binding.bindelement(this)
        this.oldrc = rendercontext
        this.element = document.createElement("popover")
        this.selfinner = document.createElement("popovercontent")
        rendercontext = this.element
        rendercontext.append(this.selfinner)
        rendercontext = this.selfinner
        this.oldrc.append(this.element)
        this.el()
        rendercontext = this.oldrc
        $(this.element).hide()
        this.render = function() {
            // console.log(this.binding)
            if (this.binding.content == true) {
                $(this.element).show()
            } else {
                $(this.element).hide()
            }
            return this
        }
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDPopOver(el, binding);
    }
}


function UDHorStack(el) {
    if(this instanceof UDHorStack) {
        this.el = el
        this.oldrc = rendercontext
        this.element = document.createElement("hstack")
        rendercontext = this.element
        this.oldrc.append(this.element)
        this.el()
        rendercontext = this.oldrc
        this.gap = function(gap) {
            if (typeof gap === "number") {
                this.element.style.gap = gap + "px"
                return this
            } else if (typeof gap === "string") {
                this.element.style.gap = gap
                return this
            } else if (gap == undefined) {
                return this.element.style.gap
            }
        }
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDHorStack(el);
    }
}

function UDNavView(v) {
    if(this instanceof UDNavView) {
        this.contentsrun = v
        this.title = function(title) {
            console.log("title is now " + title)
            this.titletext = title
            this.titleel = document.createElement("headercont")
            this.oldrc = rendercontext
            rendercontext = this.titleel
            this.header = UDHeader(title)
            rendercontext = this.oldrc
            this.contentel.prepend(this.titleel)
            return this
        }
        this.titlestyle = function(title) {
            this.header.headerstyle(title)
            return this
        }
        this.background = function(col) {
            console.log("bg color is now set" + col)
            this.contentel.style.backgroundColor = col
            return this
        }
        this.oldrc = rendercontext
        rendercontext = document.createElement("navview")
        this.contentel = rendercontext
        this.element = rendercontext
        this.oldrc.append(rendercontext)
        this.contentsrun()
        rendercontext = this.oldrc
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDNavView(v);
    }
}

function UDHeader(text) {
    if(this instanceof UDHeader) {
        this.headertitle = text
        this.oldrc = rendercontext
        this.element = document.createElement("udheader")
        this.titleel = document.createElement("udtitle")
        this.headerrow = document.createElement("udheaderrow")
        this.largetitleholder = document.createElement("udlargetitleholder")
        this.titleholder = document.createElement("udtitleholder")
        this.leadingelement = document.createElement("udheaderleading")
        this.trailingelement = document.createElement("udheadertrailing")
        this.titleel.innerText = this.headertitle
        this.headerrow.append(this.leadingelement)
        this.headerrow.append(this.titleholder)
        this.headerrow.append(this.trailingelement)
        this.element.append(this.headerrow)
        this.largetitleholder.append(this.titleel)
        this.element.append(this.largetitleholder)
        rendercontext = this.element
        this.oldrc.append(this.element)
        rendercontext = this.oldrc
        this.title = function(title) {
            console.log("title is now " + title)
            this.titleel.innerHTML = title
            this.titleel.setAttribute("style", "color: #666666;")
            return this
        }
        this.leading = function(el) {
            console.log("Leading is now set")
            this.oldrc = rendercontext
            rendercontext = this.leadingelement
            el()
            rendercontext = this.oldrc
            this.leadingelement.style.display = "flex"
            return this
        }
        this.trailing = function(el) {
            console.log("Leading is now set")
            this.oldrc = rendercontext
            rendercontext = this.trailingelement
            el()
            rendercontext = this.oldrc
            this.trailingelement.style.display = "flex"
            return this
        }
        this.headerstyle = function(title) {
            if (title == "expanded") {
                this.largetitleholder.innerHTML = ""
                this.titleholder.innerHTML = ""
                this.titleel = document.createElement("udtitle")
                this.titleel.innerText = this.headertitle
                this.largetitleholder.append(this.titleel)
            } else if (title == "min") {
                this.largetitleholder.innerHTML = ""
                this.titleholder.innerHTML = ""
                this.titleel = document.createElement("udtitlemin")
                this.titleel.innerText = this.headertitle
                this.titleholder.append(this.titleel)
            } else if (title == "center") {
                this.largetitleholder.innerHTML = ""
                this.titleholder.innerHTML = ""
                this.titleel = document.createElement("udtitlecenter")
                this.titleel.innerText = this.headertitle
                this.titleholder.append(this.titleel)
            }
            return this
        }
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDHeader(text);
    }
}

function UDSplitView(s1, s2) {
    if(this instanceof UDSplitView) {
        this.side1 = s1
        this.side2 = s2
        this.title = function(title) {
            console.log("title is now " + title)
            this.titletext = title
            this.titleel = document.createElement("headercont")
            this.titleel.style.boxSizing = "border-box"
            this.oldrc = rendercontext
            rendercontext = this.titleel
            this.header = UDHeader(title)
            rendercontext = this.oldrc
            this.side1el.prepend(this.titleel)
            return this
        }
        this.vtitle = function(title) {
            console.log("title is now " + title)
            this.titletextv = title
            this.titleelv = document.createElement("headercont")
            this.titleelv.style.boxSizing = "border-box"
            this.oldrc = rendercontext
            rendercontext = this.titleelv
            this.headers2 = UDHeader(title)
            rendercontext = this.oldrc
            this.side2el.prepend(this.titleel)
            return this
        }
        this.vtitlestyle = function(title) {
            this.headers2.headerstyle(title)
            return this
        }
        this.titlestyle = function(title) {
            this.header.headerstyle(title)
            return this
        }
        this.vbackground = function(col) {
            console.log("view bg color is now " + col)
            this.side2el.style.backgroundColor = col
            return this
        }
        this.background = function(col) {
            console.log("bg color is now " + col)
            this.side1el.style.backgroundColor = col
            return this
        }
        this.oldrc = rendercontext
        this.element = document.createElement("splitview")
        this.element.classList.add("navigateable-element")
        this.oldrc.append(this.element)
        rendercontext = document.createElement("splitviews1")
        this.side1el = rendercontext
        this.element.append(rendercontext)
        this.side1()
        rendercontext = document.createElement("splitviews2")
        this.side2el = rendercontext
        rendercontext.classList.add("navigatepos")
        // navigatepos = rendercontext
        this.element.append(rendercontext)
        this.side2()
        rendercontext = this.oldrc
    } else {
        return new UDSplitView(s1, s2);
    }
}

function UDTextNode(text) {
    if(this instanceof UDTextNode) {
        this.textcontent = text
        this.element = document.createElement("p")
        this.element.setAttribute("textstyle", "paragraph")
        this.element.innerHTML = this.textcontent
        rendercontext.append(this.element)
        this.type = function(type) {
            console.log("type is now " + type)
            this.element.setAttribute("textstyle", type)
            return this
        }
        this.color = function(color) {
            console.log("color is now " + color)
            this.element.setAttribute("style", "color: " + color + ";")
            return this
        }
        this.margin = function(bool) {
            if (bool == false) {
                $(this.element).addClass("textnodenomargin")
            } else {
                $(this.element).removeClass("textnodenomargin")
            }
        }
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDTextNode(text);
    }
}

function UDCustomHTML(content) {
    if(this instanceof UDCustomHTML) {
        this.content = content
        this.element = document.createElement("div")
        this.element.innerHTML = this.content
        rendercontext.append(this.element)
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDCustomHTML(content);
    }
}

function UDImageNode(url) {
    if(this instanceof UDImageNode) {
        this.url = url
        this.element = document.createElement("img")
        this.element.src = url
        rendercontext.append(this.element)
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDImageNode(url);
    }
}

function UDMarkdownBlock(md) {
    if(this instanceof UDMarkdownBlock) {
        this.textcontent = md
        this.element = document.createElement("md-block")
        this.element.innerHTML = this.textcontent
        rendercontext.append(this.element)
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDMarkdownBlock(md);
    }
}

function UDListSection(items) {
    if(this instanceof UDListSection) {
        this.items = items
        this.oldrc = rendercontext
        this.element = document.createElement("listsection")
        rendercontext = this.element
        this.oldrc.append(this.element)
        this.elementinner = document.createElement("listsectioninner")
        rendercontext = this.elementinner
        this.element.append(this.elementinner)
        this.items()
        rendercontext = this.oldrc
        this.title = function(text) {
            console.log("type is now " + text)
            this.stitle = text
            this.textcontent = text
            this.titleel = document.createElement("p")
            this.titleel.setAttribute("textstyle", "listsection")
            this.titleel.innerHTML = this.textcontent
            this.element.prepend(this.titleel)
            return this
        }
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDListSection(items);
    }
}

// var vartoudvar = function(varname) {
//     oldvarcont = varname
//     newvar = {
//         aInternal: oldvarcont,
//         aListener: function(val) {},
//         set a(val) {
//           this.aInternal = val;
//           this.aListener(val);
//         },
//         get a() {
//           return this.aInternal;
//         },
//         registerListener: function(listener) {
//           this.aListener = listener;
//         }
//     }
//     return newvar
// }

function UDNavItem(text, icon) {
    if(this instanceof UDNavItem) {
        this.textcontent = text
        this.iconcontent = icon
        this.element = document.createElement("udnavitemex")
        this.iconelement = document.createElement("i")
        this.iconelement.setAttribute("data-lucide", icon)
        this.iconelement.style.height = 24
        this.iconelement.style.width = 24
        this.textelement = document.createElement("udnavitemextext")
        this.textelement.innerHTML = text
        this.element.append(this.iconelement)
        this.element.append(this.textelement)
        rendercontext.append(this.element)
        lucide.createIcons()
        this.color = function(color) {
            console.log("color is now " + color)
            this.element.setAttribute("style", "color: " + color + ";")
            return this
        }
        this.onclick = function(fn) {
            console.log("onclick is now set")
            this.element.addEventListener("click", (event) => {latestevent = event})
            this.element.addEventListener("click", fn)
            return this
        }
        this.navStyle = function(style) {
            console.log("style is now " + style)
            $(this.textelement).removeClass("udnavitemextextver")
            $(this.element).removeClass("udnavitemexver")
            $(this.element).removeClass("udnavitemexhti")
            if (style == "vertical") {
                $(this.textelement).addClass("udnavitemextextver")
                $(this.element).addClass("udnavitemexver")
            } else if (style == "tabitemhorizonantal") {
                $(this.element).addClass("udnavitemexhti")
            }
            return this
        }
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDNavItem(text, icon);
    }
}

function UDButton(text, icon) {
    if(this instanceof UDButton) {
        this.textcontent = text
        this.iconcontent = icon
        this.element = document.createElement("udbuttonfilled")
        this.iconelement = document.createElement("i")
        this.iconelement.setAttribute("data-lucide", icon)
        this.iconelement.style.height = 24
        this.iconelement.style.width = 24
        this.textelement = document.createElement("udbuttontext")
        this.textelement.innerHTML = text
        if (icon != undefined) {
            this.element.append(this.iconelement)
        }
        if (text != undefined) {
            this.element.append(this.textelement)
        }
        rendercontext.append(this.element)
        lucide.createIcons()
        this.color = function(color) {
            console.log("color is now " + color)
            this.element.style.backgroundColor = color
            return this
        }
        this.fgcolor = function(color) {
            console.log("fgcolor is now " + color)
            this.element.style.color = color
            return this
        }
        this.onclick = function(fn) {
            console.log("onclick is now set")
            this.element.addEventListener("click", (event) => {latestevent = event})
            this.element.addEventListener("click", fn)
            return this
        }
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDButton(text, icon);
    }
}

function UDTextBox(placeholder) {
    if(this instanceof UDTextBox) {
        this.placeholder = placeholder
        this.element = document.createElement("input")
        this.element.setAttribute("placeholder", this.placeholder)
        rendercontext.append(this.element)
        this.onchange = function(fn) {
            console.log("onchange is now set")
            this.element.addEventListener("change", fn)
            return this
        }
        this.bindstate = function(statevar) {
            this.bindedvar = statevar
            this.element.addEventListener("keydown", () => {
                setTimeout(() => {
                    statevar.update(this.element.value)
                }, 10);
            })
            return this
        }
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDTextBox(placeholder);
    }
}

function UDIconNode(icon) {
    if(this instanceof UDIconNode) {
        this.iconcontent = icon
        this.element = document.createElement("div")
        this.iconelement = document.createElement("i")
        this.iconelement.setAttribute("data-lucide", icon)
        this.iconelement.style.height = 20
        this.iconelement.style.width = 20
        this.element.append(this.iconelement)
        rendercontext.append(this.element)
        lucide.createIcons()
        this.color = function(color) {
            console.log("color is now " + color)
            this.element.setAttribute("style", "color: " + color + ";")
            lucide.createIcons()
            return this
        }
        this.style = deepBindFunctions(styleoperations, this)
        this.universal = deepBindFunctions(universaloperations, this)
    } else {
        return new UDIconNode(icon);
    }
}

function UDTabView(pages) {
    if(this instanceof UDTabView) {
        this.pagesinternal = pages
        this.title = function(title) {
            console.log("title is now " + title)
            this.titletext = title
            this.titleel = document.createElement("udtitle")
            this.titleel.innerHTML = title
            this.titleel.setAttribute("style", "color: #666666;")
            this.contentel.prepend(this.titleel)
            return this
        }
        this.titlestyle = function(title) {
            if (title == "expanded") {
                this.titleel.remove()
                this.titleel = document.createElement("udtitle")
                this.titleel.innerHTML = this.titletext
                this.titleel.setAttribute("style", "color: #666666;")
            } else if (title == "min") {
                this.titleel.remove()
                this.titleel = document.createElement("udtitlemin")
                this.titleel.innerHTML = this.titletext
                this.titleel.setAttribute("style", "color: #666666;")
            } else if (title == "center") {
                this.titleel.remove()
                this.titleel = document.createElement("udtitlecenter")
                this.titleel.innerHTML = this.titletext
                this.titleel.setAttribute("style", "color: #666666;")
            }
            this.contentel.prepend(this.titleel)
            return this
        }
        this.background = function(col) {
            console.log("bg color is now set" + col)
            this.contentel.style.backgroundColor = col
            return this
        }
        this.oldrc = rendercontext
        rendercontext = document.createElement("tabviewbg")
        this.contentel = rendercontext
        this.oldrc.append(rendercontext)
        pages.forEach(page => {
            rendercontext = document.createElement("tabviewtab")
            page.view()
            this.contentel.append(rendercontext)
        });
        $(this.contentel.firstElementChild).show()
        rendercontext = document.createElement("tabviewbar")
        this.contentel.append(rendercontext)
        pages.forEach(page => {
            tabitem = UDNavItem(page.name, page.icon)
                .navStyle("vertical")
                .onclick((ev) => {
                    ev.stopPropagation()
                    index = Array.prototype.slice.call($(ev.target).closest("udnavitemex").parent().children()).indexOf($(ev.target).closest("udnavitemex")[0]);
                    console.log(index)
                    $(ev.target).closest("tabviewbg").children().hide()
                    $(ev.target).closest("tabviewbg").children().last().show()
                    $($(ev.target).closest("tabviewbg").children()[index]).show()
                })
            if (screen.width > 600) {
                tabitem.navStyle("tabitemhorizonantal")
            }
        });
        rendercontext = this.oldrc
    } else {
        return new UDTabView(pages);
    }
}

var sparkutils = {
    load: function(url) {
        newscriptel = document.createElement("script")
        newscriptel.setAttribute("src", "src/frontend/" + url)
        document.head.append(newscriptel)
    },
    loadmodule: async function(module, file) {
        newscriptel = document.createElement("script")
        if (file != undefined) {
            newscriptel.setAttribute("src", "src/modules/" + module + "/frontend/" + file + ".js")
            // var res = await fetch("src/modules/" + module + "/frontend/" + url + ".js")
            // var newlib = await res.text()
            // eval(newlib)
        } else {
            newscriptel.setAttribute("src", "src/modules/" + module + "/frontend/index.js")
            // var res = await fetch("src/modules/" + module + "/frontend/index.js")
            // var newlib = await res.text()
            // eval(newlib)
        }
        document.head.append(newscriptel)
    },
    serverfunctions: {
        call: async function(name, input) {
            res = await fetch("serverfunction/" + name)
            var resdata = ""
            resdatatxt = await res.text()
            try {
                resdata = JSON.parse(resdatatxt)
            } catch {
                resdata = resdatatxt
            }
            return resdata
        }
    }
}

function StateVar(content) {
    if(this instanceof StateVar) {
        this.content = content
        this.boundlist = [

        ]
        this.bindelement = function(el) {
            this.boundlist.push(el)
        }
        this.update = function(content) {
            this.content = content
            this.boundlist.forEach(el => {
                el.render()
            })
        }
    } else {
        return new StateVar(content);
    }
}

function createUDComponent(name, definition) {
    function UDComponent(...args) {
        if (this instanceof UDComponent) {
            this.element = document.createElement(name);
            this.oldrc = rendercontext;
            rendercontext = this.element;
            definition.apply(this, args);
            rendercontext = this.oldrc;
            this.style = deepBindFunctions(styleoperations, this);
            this.universal = deepBindFunctions(universaloperations, this);
        } else {
            return new UDComponent(...args);
        }
    }

    return UDComponent;
}

// Example usage:
// const UDCard = createUDComponent("udcard", function (title, content) {
//     UDVerStack(() => {
//         UDHeader(title);
//         UDInnerPadding(() => {
//             UDTextNode(content);
//         });
//     });
// });

// Usage in code:
// const card = UDCard("Card Title", "This is the card content.");
// rendercontext.append(card.element);
