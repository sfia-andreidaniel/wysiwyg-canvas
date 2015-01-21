var TNode_Type;
(function (TNode_Type) {
    TNode_Type[TNode_Type["UNKNOWN"] = 0] = "UNKNOWN";
    TNode_Type[TNode_Type["TEXT"] = 1] = "TEXT";
    TNode_Type[TNode_Type["ELEMENT"] = 2] = "ELEMENT";
})(TNode_Type || (TNode_Type = {}));
var Events = (function () {
    function Events() {
    }
    Events.prototype.on = function (eventName, callback) {
        this.$EVENTS_QUEUE = this.$EVENTS_QUEUE || {};
        if (!this.$EVENTS_QUEUE[eventName])
            this.$EVENTS_QUEUE[eventName] = [];
        this.$EVENTS_QUEUE[eventName].push(callback);
    };
    Events.prototype.off = function (eventName, callback) {
        if (this.$EVENTS_QUEUE && this.$EVENTS_QUEUE[eventName]) {
            for (var i = 0, len = this.$EVENTS_QUEUE[eventName].length; i < len; i++) {
                if (this.$EVENTS_QUEUE[eventName][i] == callback) {
                    this.$EVENTS_QUEUE[eventName].splice(i, 1);
                    return;
                }
            }
        }
    };
    Events.prototype.fire = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.$EVENTS_QUEUE && this.$EVENTS_QUEUE[eventName]) {
            for (var i = 0, len = this.$EVENTS_QUEUE[eventName].length; i < len; i++) {
                this.$EVENTS_QUEUE[eventName][i].apply(this, args);
            }
        }
    };
    return Events;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Throttler = (function (_super) {
    __extends(Throttler, _super);
    function Throttler(callbackFunction, frequency) {
        if (frequency === void 0) { frequency = 1; }
        _super.call(this);
        this.lastRun = 0;
        this.nextRun = null;
        this.frequency = 1;
        this.callback = null;
        this.frequency = frequency;
        this.nextRun = null;
        this.lastRun = Date.now();
        this.callback = callbackFunction;
    }
    Throttler.prototype.run = function () {
        var now = 0, self = this;
        if (this.nextRun != null) {
            // a run is already scheduled in the future.
            return;
        }
        else {
            now = Date.now();
            this.lastRun += this.frequency;
            if (this.lastRun < now) {
                // run immediately
                this.lastRun = now;
                this.nextRun = null;
                this.callback();
            }
            else {
                // run in the future
                this.nextRun = this.lastRun + this.frequency;
                setTimeout(function () {
                    self.callback();
                    self.nextRun = null;
                }, this.nextRun - this.lastRun);
            }
        }
    };
    return Throttler;
})(Events);
var TNode = (function (_super) {
    __extends(TNode, _super);
    function TNode() {
        _super.apply(this, arguments);
        this.parentNode = null;
        this.siblingIndex = 0;
        this.nodeType = 0 /* UNKNOWN */;
        this.documentElement = null;
    }
    // dettach the node from it's parent
    TNode.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
        return this;
    };
    TNode.prototype.nextSibling = function () {
        if (this.parentNode) {
            return this.parentNode.childNodes[this.siblingIndex + 1] || null;
        }
        else {
            return null;
        }
    };
    TNode.prototype.previousSibling = function () {
        if (this.parentNode) {
            return this.parentNode.childNodes[this.siblingIndex - 1] || null;
        }
        else {
            return null;
        }
    };
    return TNode;
})(Events);
var TNode_Text = (function (_super) {
    __extends(TNode_Text, _super);
    function TNode_Text(textContents) {
        _super.call(this);
        this._text = '';
        this.nodeType = 1 /* TEXT */;
        this._text = String(textContents || '');
    }
    TNode_Text.prototype.textContents = function (c) {
        if (c === null) {
            return this._text;
        }
        else {
            this._text = String(c || '');
            if (this.parentNode) {
                this.parentNode.fire('relayout');
            }
        }
    };
    // escapes the text for HTML exporting
    TNode_Text.prototype.escape = function () {
        var out = '', i = 0, len = this._text.length;
        for (i = 0; i < len; i++) {
            if (TNode_Text.$SpecialChars[this._text[i]]) {
                out += TNode_Text.$SpecialChars[this._text[i]];
            }
            else {
                out += this._text[i];
            }
        }
        return out;
    };
    TNode_Text.$SpecialChars = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot'
    };
    return TNode_Text;
})(TNode);
var TNode_Element = (function (_super) {
    __extends(TNode_Element, _super);
    function TNode_Element(postStyleInit) {
        if (postStyleInit === void 0) { postStyleInit = false; }
        _super.call(this);
        this.childNodes = [];
        this.nodeType = 2 /* ELEMENT */;
        this.nodeName = '';
        this.id = '';
        this.className = '';
        if (!postStyleInit)
            this.style = new TStyle(this);
    }
    TNode_Element.prototype.appendChild = function (node, index) {
        if (index === void 0) { index = null; }
        if (index === null) {
            node.remove();
            index = this.childNodes.length;
            this.childNodes.push(node.remove());
        }
        else {
            if (index < 0) {
                index = 0;
            }
            else if (index > this.childNodes.length) {
                index = this.childNodes.length;
            }
            node.remove();
            this.childNodes.splice(index, 0, node);
        }
        node.parentNode = this;
        for (var i = index, len = this.childNodes.length; i < len; i++) {
            this.childNodes[i].siblingIndex = i;
        }
        this.requestRelayout();
        return node;
    };
    TNode_Element.prototype.removeChild = function (node) {
        for (var i = 0, len = this.childNodes.length; i < len; i++) {
            if (this.childNodes[i] == node) {
                this.childNodes.splice(i, 1);
                for (var j = i; j < len; j++) {
                    this.childNodes[j].siblingIndex = j;
                }
                this.requestRelayout();
                return node;
            }
        }
        throw "ERR_NODE_NOT_FOUND";
    };
    /* Weather painting this element is inside of a box, or this element
       is painted as a text line */
    TNode_Element.prototype.hasLayout = function () {
        return this.style.display() == 'block' || this.style.float() != '';
    };
    TNode_Element.prototype.createLayout = function (useParentLayout) {
        if (useParentLayout === void 0) { useParentLayout = null; }
        var left = [], center = [], right = [], argIndex = 0, i, len, returnValue;
        this.evaluateLayout(left, center, right, argIndex);
        switch (true) {
            case center.length == 0 && left.length == 0 && right.length == 0:
                /* The node is empty */
                if (this.hasLayout()) {
                    returnValue = new Layout_Block(this);
                }
                else {
                    returnValue = new Layout_BlockChar();
                }
                break;
            case center.length > 0 && left.length == 0 && right.length == 0:
                /* Return a Layout_Vertical if center.length > 1 or center[0] if center.length == 1; */
                returnValue = new Layout_Vertical(this, center);
                break;
            case (left.length > 0 || right.length > 0) && center.length == 0:
                for (i = 0, len = right.length; i < len; i++) {
                    left.push(right[i]);
                }
                returnValue = new Layout_Horizontal(this, left);
                break;
            case (left.length > 0 || right.length > 0) && center.length > 0:
                var cells = [];
                if (left.length) {
                    cells.push(left.length == 1 ? left[0] : new Layout_Horizontal(null, left));
                }
                if (center.length) {
                    cells.push(new Layout_Vertical(null, center));
                }
                if (right.length) {
                    cells.push(right.length == 1 ? right[0] : new Layout_Horizontal(null, right));
                }
                returnValue = new Layout_Horizontal(this, cells);
                break;
            default:
                throw "Unhandled layout variant!";
                break;
        }
        if (useParentLayout) {
            returnValue.parent = useParentLayout;
        }
        returnValue.buildAhead(useParentLayout);
        return returnValue;
    };
    TNode_Element.prototype.childNodesSortedByFloatValues = function () {
        var out1 = [], out2 = [], i = 0, len = 0;
        for (i = 0, len = this.childNodes.length; i < len; i++) {
            if (this.childNodes[i].nodeType == 1 /* TEXT */) {
                out2.push(this.childNodes[i]);
            }
            else {
                if (['left', 'right'].indexOf(this.childNodes[i].style.float()) > -1) {
                    out1.push(this.childNodes[i]);
                }
                else {
                    out2.push(this.childNodes[i]);
                }
            }
        }
        for (i = 0, len = out2.length; i < len; i++) {
            out1.push(out2[i]);
        }
        return out1;
    };
    TNode_Element.prototype.evaluateLayout = function (left, center, right, argIndex) {
        if (argIndex === void 0) { argIndex = 0; }
        var i = 0, len = this.childNodes.length, oldArgIndex = argIndex, currentArgIndex = argIndex, j = 0, n = 0, layoutType = '', lblock, lchar, children;
        for (i = 0, children = this.childNodesSortedByFloatValues(), len = children.length; i < len; i++) {
            if (children[i].nodeType == 1 /* TEXT */) {
                currentArgIndex = 1;
                layoutType = 'Layout_BlockChar';
            }
            else {
                switch (true) {
                    case children[i].style.display() == 'block' && ['left', 'right'].indexOf(children[i].style.float()) == -1:
                        layoutType = 'Layout_Block';
                        currentArgIndex = 1;
                        break;
                    case children[i].style.float() == 'left':
                        layoutType = 'Layout_Block';
                        currentArgIndex = 0;
                        break;
                    case children[i].style.float() == 'right':
                        layoutType = 'Layout_Block';
                        currentArgIndex = 2;
                        break;
                    default:
                        layoutType = 'Layout_BlockChar';
                        currentArgIndex = 1;
                        break;
                }
            }
            switch (layoutType) {
                case 'Layout_BlockChar':
                    if (currentArgIndex != oldArgIndex) {
                        lchar = new Layout_BlockChar();
                        center.push(lchar);
                    }
                    else {
                        lchar = ((function () {
                            if (center[center.length - 1] && center[center.length - 1].hasChars) {
                                return center[center.length - 1];
                            }
                            else {
                                return null;
                            }
                        })() || (function () {
                            lchar = new Layout_BlockChar();
                            center.push(lchar);
                            return lchar;
                        })());
                    }
                    if (children[i].nodeType == 1 /* TEXT */) {
                        lchar.addTextNode(children[i]);
                    }
                    else {
                        currentArgIndex = children[i].evaluateLayout(left, center, right, currentArgIndex);
                    }
                    break;
                case 'Layout_Block':
                    lblock = new Layout_Block(children[i]);
                    switch (currentArgIndex) {
                        case 0:
                            left.push(lblock);
                            break;
                        case 1:
                            center.push(lblock);
                            break;
                        case 2:
                            right.push(lblock);
                            break;
                    }
                    break;
            }
            oldArgIndex = currentArgIndex;
        }
        return currentArgIndex;
    };
    TNode_Element.prototype.innerHTML = function (setter) {
        if (setter === void 0) { setter = null; }
        if (setter === null) {
            // getter
            if (!this.childNodes.length) {
                return '';
            }
            else {
                var out = [];
                for (var i = 0, len = this.childNodes.length; i < len; i++) {
                    if (this.childNodes[i].nodeType == 1 /* TEXT */) {
                        out.push(this.childNodes[i].escape());
                    }
                    else {
                        out.push(this.childNodes[i].outerHTML());
                    }
                }
                return out.join('');
            }
        }
        else {
            var nodes = (new HTMLParser(this.documentElement, setter)).NODES;
            this.setInnerNodes(nodes);
        }
    };
    TNode_Element.prototype.outerHTML = function (setter) {
        if (setter === void 0) { setter = null; }
        if (setter === null) {
            // getter
            if (this.childNodes.length) {
                return '<' + this.nodeName + '>' + this.innerHTML() + '</' + this.nodeName + '>';
            }
            else {
                return '<' + this.nodeName + ' />';
            }
        }
        else {
            throw "node.outerHTML: Setter not implemented yet!";
        }
    };
    TNode_Element.prototype.requestRelayout = function () {
        if (this.documentElement) {
            this.documentElement.needRelayout = true;
        }
    };
    TNode_Element.prototype.requestRepaint = function (originatingElement) {
        if (originatingElement === void 0) { originatingElement = null; }
        if (this.documentElement) {
            this.documentElement.requestRepaint();
        }
    };
    /* Paints the node according to layout configuration */
    TNode_Element.prototype.paint = function (ctx, layout, scrollLeft, scrollTop) {
        // paint border
        var borderColor, borderWidth, backgroundColor;
        if (borderWidth = this.style.borderWidth()) {
            borderColor = this.style.borderColor();
            if (borderColor) {
                ctx.strokeStyle = borderColor;
                ctx.lineWidth = borderWidth;
                ctx.beginPath();
                ctx.strokeRect(layout.offsetLeft + (borderWidth / 2) - scrollLeft, layout.offsetTop + (borderWidth / 2) - scrollTop, layout.offsetWidth - borderWidth, layout.offsetHeight - borderWidth);
                ctx.closePath();
            }
        }
        if (backgroundColor = this.style.backgroundColor()) {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(layout.offsetLeft + borderWidth - scrollLeft, layout.offsetTop + borderWidth - scrollTop, layout.offsetWidth - 2 * borderWidth, layout.offsetHeight - 2 * borderWidth);
        }
    };
    // makes the array of nodes @nodesList childNodes of this element.
    // if @scope is null, the contents of this element will be erased before.
    // if @scope is NOT null, the setInnerNodes method will be executed on
    //    @scope instead of this element.
    TNode_Element.prototype.setInnerNodes = function (nodesList, scope) {
        if (scope === void 0) { scope = null; }
        var len = this.childNodes.length, i = 0, j = 0, n = 0, clearNodes = scope === null, node = null, nodeName = '';
        scope = scope || this;
        if (clearNodes)
            scope.childNodes.splice(0, len); // clear the child nodes of this element
        for (i = 0, len = nodesList.length; i < len; i++) {
            switch (nodesList[i].type) {
                case 'node':
                    nodeName = nodesList[i].nodeName;
                    if (HTML_Body.IGNORE_ELEMENTS.indexOf(nodeName) == -1) {
                        if (HTML_Body.TRAVERSE_ELEMENTS.indexOf(nodeName) == -1) {
                            node = scope.documentElement.createElement(nodeName);
                            scope.appendChild(node);
                            if (nodesList[i].attributes && (n = nodesList[i].attributes.length)) {
                                for (j = 0; j < n; j++) {
                                    node.setAttribute(nodesList[i].attributes[j].name, nodesList[i].attributes[j].value);
                                }
                            }
                        }
                        else {
                            node = scope;
                        }
                        if (nodesList[i].children && nodesList[i].children.length) {
                            node.setInnerNodes(nodesList[i].children, node);
                        }
                    }
                    break;
                case '#text':
                    scope.appendChild(scope.documentElement.createTextNode(nodesList[i].value));
                    break;
                default:
                    break;
            }
        }
    };
    TNode_Element.prototype.setAttribute = function (attributeName, attributeValue) {
        if (attributeName === void 0) { attributeName = ''; }
        if (attributeValue === void 0) { attributeValue = null; }
        switch (attributeName) {
            case 'id':
                this.id = String(attributeValue || '');
                break;
            case 'class':
                this.className = String(attributeValue || '');
                break;
            case 'align':
                this.style.textAlign(String(attributeValue || ''));
                break;
            case 'color':
                this.style.color(String(attributeValue || ''));
                break;
            case 'width':
                this.style.width(String(attributeValue || ''));
                break;
            case 'height':
                this.style.height(String(attributeValue || ''));
                break;
            case 'bgcolor':
                this.style.backgroundColor(String(attributeValue || ''));
                break;
        }
    };
    TNode_Element.prototype.satisfiesQuery = function (query) {
        var cond, cursor;
        for (var k in query) {
            if (query[k] === true) {
                cond = !!query[k] == this[k];
            }
            else {
                switch (true) {
                    case k == 'parentNode':
                        cond = !!this.parentNode && this.parentNode.satisfiesQuery(query.parentNode) ? true : false;
                        break;
                    case k == 'anyParentNode':
                        cond = false;
                        cursor = this.parentNode;
                        while (cursor) {
                            if (cursor.satisfiesQuery(query.anyParentNode)) {
                                cond = true;
                                break;
                            }
                            cursor = cursor.parentNode;
                        }
                        break;
                    default:
                        cond = query[k] == this[k];
                        break;
                }
            }
            if (cond == false)
                return false;
        }
        return true;
    };
    /* queryElements( {
            "nodeName": "p",
            "childNodes": true
       } )
    */
    TNode_Element.prototype.queryAll = function (query, pushIn) {
        if (pushIn === void 0) { pushIn = null; }
        pushIn = pushIn || new TNode_Collection();
        query = query || {};
        for (var i = 0, len = this.childNodes.length; i < len; i++) {
            if (this.childNodes[i].nodeType == 2 /* ELEMENT */) {
                if (this.childNodes[i].satisfiesQuery(query)) {
                    pushIn.add(this.childNodes[i]);
                }
                this.childNodes[i].queryAll(query, pushIn);
            }
        }
        return pushIn;
    };
    TNode_Element.prototype.query = function (query) {
        var sub;
        query = query || {};
        if (this.satisfiesQuery(query)) {
            return this;
        }
        else {
            for (var i = 0, len = this.childNodes.length; i < len; i++) {
                if (this.childNodes[i].nodeType == 2 /* ELEMENT */) {
                    if (sub = this.childNodes[i].query(query)) {
                        return sub;
                    }
                }
            }
        }
        return null;
    };
    return TNode_Element;
})(TNode);
var TNode_Collection = (function () {
    function TNode_Collection(addNodes) {
        if (addNodes === void 0) { addNodes = null; }
        this.nodes = [];
        if (addNodes !== null) {
            for (var i = 0, len = addNodes.length; i < len; i++) {
                this.nodes.push(addNodes[i]);
            }
        }
    }
    Object.defineProperty(TNode_Collection.prototype, "length", {
        get: function () {
            return this.nodes.length;
        },
        enumerable: true,
        configurable: true
    });
    TNode_Collection.prototype.each = function (callback) {
        if (callback) {
            for (var i = 0, len = this.nodes.length; i < len; i++) {
                if (this.nodes[i]) {
                    callback.call(this.nodes[i]);
                }
            }
        }
        return this;
    };
    TNode_Collection.prototype.add = function (node) {
        this.nodes.push(node);
    };
    return TNode_Collection;
})();
var HTMLParser = (function () {
    function HTMLParser(document, data) {
        this.document = document;
        this.NODES = [];
        this.loops = 0;
        if (data)
            this.parse(data, null);
    }
    HTMLParser.READ_TEXT = function (data) {
        var matches = /^[^\<]+/.exec(data);
        if (matches) {
            return matches[0];
        }
        else
            return null;
    };
    HTMLParser.READ_ATTRIBUTE = function (data) {
        if (/^[\s]+$/.test(data))
            return null;
        var out = {
            "name": null,
            "value": null,
            "clearBuffer": null
        }, matches;
        if (matches = /^([\s]+)?([^\"\'\=]+)(\=([^\"\'\s]+|\"[^\"]+\"|\'[^\']+')?)?([\s]+)?/.exec(data)) {
            out.name = matches[2];
            out.value = matches[4];
            out.clearBuffer = matches[0];
            if (out.value.length >= 2 && ((out.value[0] == '"' && out.value[out.value.length - 1] == '"') || (out.value[0] == "'" && out.value[out.value.length - 1] == "'"))) {
                out.value = out.value.substr(1, out.value.length - 2);
            }
            return out;
        }
        else
            return null;
    };
    HTMLParser.READ_NODE = function (data, doc) {
        var out = {
            "nodeName": "",
            "autoClose": false,
            "clearBuffer": "",
            "attributes": [],
            "children": []
        }, matches, matches1, attribute, textContents = '', r, insensitive = true;
        if (matches = /^\<([^\s\>\/]+)([^\>]+)?\>/.exec(data)) {
            out.clearBuffer = matches[0];
            if (matches[1] && /\/$/.test(matches[1])) {
                matches[1] = matches[1].substr(0, matches[1].length - 1);
                out.autoClose = true;
            }
            out.nodeName = insensitive ? matches[1].toLowerCase() : matches[1];
            if (!out.autoClose && HTML_Body.AUTOCLOSE_TAGS.indexOf(out.nodeName) >= 0)
                out.autoClose = true;
            if (matches[2]) {
                if (/\/$/.test(matches[2]))
                    matches[2] = matches[2].substr(0, matches[2].length - 1);
                while (matches[2] && (attribute = HTMLParser.READ_ATTRIBUTE(matches[2]))) {
                    matches[2] = matches[2].substr(attribute.clearBuffer.length);
                    out.attributes.push({ "name": attribute.name, "value": attribute.value });
                }
            }
            /* If the node is one of type with unescaped text, read it's text content,
               append a child text node inside it, set autoClose to false, and return up
               to the close tag
            */
            if (HTML_Body.FORCE_TEXT_NODES.indexOf(out.nodeName) >= 0 && !out.autoClose) {
                r = new RegExp('([\\s\\S]+)?<\\/' + out.nodeName + '([\s]+)?>', insensitive ? 'i' : '');
                matches1 = r.exec(data.substr(matches[0].length));
                if (matches1) {
                    textContents = matches1[1];
                    out.clearBuffer = out.clearBuffer.concat(textContents);
                    out.children.push({
                        "type": "#text",
                        "value": textContents
                    });
                }
                else {
                    // consider all the text upto the end of the string is the text contents of this node
                    out.clearBuffer = data;
                }
            }
            return out;
        }
        else
            return null;
    };
    HTMLParser.READ_END_NODE = function (data, nodeName, doc) {
        if (!data)
            throw "ERR_UNEXPECTED_END_OF_BUFFER";
        var matches;
        if (matches = (new RegExp('^<\\/' + nodeName + '([\\s]+)?>', 'i')).exec(data)) {
            return matches[0];
        }
        else
            return null;
    };
    HTMLParser.READ_COMMENT = function (data) {
        var matches;
        if (matches = /^<\!--([\s\S]+)?\-\-\>/.exec(data)) {
            return {
                "value": matches[1] || '',
                "clearBuffer": matches[0]
            };
        }
        else
            return null;
    };
    HTMLParser.READ_CDATA = function (data) {
        var matches;
        if (matches = /^\<\!\[CDATA\[([\s\S]+)?\]\]\>/.exec(data)) {
            return {
                "value": matches[1] || '',
                "clearBuffer": matches[0]
            };
        }
        else
            return null;
    };
    HTMLParser.prototype.parse = function (data, pushIn) {
        this.loops++;
        if (this.loops > 1000000)
            throw "ERR_DOCUMENT_TOO_BIG";
        var token1 = '', token2 = {}, token3 = '', subData = '';
        pushIn = pushIn || null;
        if (pushIn === null) {
            this.NODES = [];
            this.loops = 1;
            pushIn = this.NODES;
            data = data.replace(/(^[\s]+|[\s]+$)/g, '').replace(/\>[\s]+\</g, '><');
        }
        while (data) {
            if ((token1 = HTMLParser.READ_TEXT(data)) !== null) {
                pushIn.push({
                    "type": "#text",
                    "value": token1
                });
                data = data.substr(token1.length);
            }
            else {
                if ((token2 = HTMLParser.READ_COMMENT(data)) !== null) {
                    token2.type = 'comment';
                    data = data.substr(token2.clearBuffer.length);
                    delete token2.clearBuffer;
                    pushIn.push(token2);
                }
                else {
                    if ((token2 = HTMLParser.READ_CDATA(data)) !== null) {
                        token2.type = 'cdata';
                        data = data.substr(token2.clearBuffer.length);
                        delete token2.clearBuffer;
                        pushIn.push(token2);
                    }
                    else {
                        if ((token2 = HTMLParser.READ_NODE(data, this.document)) !== null) {
                            token2.type = 'node';
                            pushIn.push(token2);
                            data = data.substr(token2['clearBuffer'].length);
                            delete token2.clearBuffer;
                            if (!token2['autoClose']) {
                                while (!(token3 = HTMLParser.READ_END_NODE(data, token2.nodeName, this.document))) {
                                    subData = this.parse(data, token2.children);
                                    if (subData != data) {
                                        data = subData;
                                    }
                                    else {
                                        token3 = '';
                                        break;
                                    }
                                }
                                data = data.substr(token3.length);
                            }
                        }
                        else
                            return data;
                    }
                }
            }
        }
        return data;
    };
    return HTMLParser;
})();
var HTML_Body = (function (_super) {
    __extends(HTML_Body, _super);
    function HTML_Body(viewport) {
        _super.call(this);
        this._needRelayout = true;
        this._needRepaint = true;
        this._layout = null;
        this.viewport = null;
        this.viewport = viewport;
        this.nodeName = 'body';
        this.documentElement = this;
        this.parentNode = null;
        this.style.display('block');
        this.style.width('100%');
        this.style.height('100%');
        this.style.fontFamily('Arial');
        this.style.fontSize('12');
        this.style.fontWeight('normal');
        this.style.fontStyle('normal');
        this.style.textDecoration('none');
        this.style.lineHeight('1.2');
        this.style.padding('5');
        this.style.color('black');
        this.style.verticalAlign('normal');
        this.style.textAlign('left');
        this.relayout();
    }
    HTML_Body.prototype.createTextNode = function (textContents) {
        var node = new TNode_Text(textContents);
        node.documentElement = this;
        return node;
    };
    HTML_Body.prototype.createElement = function (elementName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var node;
        elementName = String(elementName || '').toLowerCase();
        switch (elementName) {
            case 'p':
                node = new HTML_Paragraph();
                break;
            case 'img':
                node = new HTML_Image(String(args[0] || '') || null);
                break;
            case 'h1':
                node = new HTML_Heading1();
                break;
            case 'h2':
                node = new HTML_Heading2();
                break;
            case 'h3':
                node = new HTML_Heading3();
                break;
            case 'h4':
                node = new HTML_Heading4();
                break;
            case 'h5':
                node = new HTML_Heading5();
                break;
            case 'b':
                node = new HTML_Bold();
                break;
            case 'i':
                node = new HTML_Italic();
                break;
            case 'u':
                node = new HTML_Underline();
                break;
            case 'a':
                node = new HTML_Anchor();
                break;
            case 'ul':
                node = new HTML_BulletedList();
                break;
            case 'ol':
                node = new HTML_OrderedList();
                break;
            case 'li':
                node = new HTML_ListItem();
                break;
            case 'sup':
                node = new HTML_Superscript();
                break;
            case 'sub':
                node = new HTML_Subscript();
                break;
            case 'table':
                node = new HTML_Table();
                break;
            case 'tr':
                node = new HTML_TableRow();
                break;
            case 'td':
                node = new HTML_TableCell();
                break;
            default:
                node = new TNode_Element();
                node.nodeName = elementName;
                break;
        }
        node.nodeName = elementName;
        node.documentElement = this;
        return node;
    };
    Object.defineProperty(HTML_Body.prototype, "needRelayout", {
        get: function () {
            return this._needRelayout;
        },
        set: function (v) {
            if (!this._needRelayout) {
                this._needRelayout = !!v;
                this.requestRepaint();
            }
        },
        enumerable: true,
        configurable: true
    });
    HTML_Body.prototype.requestRelayout = function () {
        this.needRelayout = true;
        this.fire('relayout');
        this.requestRepaint();
    };
    HTML_Body.prototype.requestRepaint = function () {
        this._needRepaint = true;
        this.fire('repaint');
        this.viewport.painter.run();
    };
    HTML_Body.prototype.repaint = function () {
        // repaints the document
        var now = Date.now();
        if (this._needRepaint == false && this._needRelayout == false) {
            return;
        }
        if (this._needRelayout) {
            this.relayout();
        }
        this.viewport.context.clearRect(0, 0, this.viewport.width() - this.viewport._scrollbarSize, this.viewport.height() - this.viewport._scrollbarSize);
        this._layout.paint(this.viewport.context, this.viewport.scrollLeft(), this.viewport.scrollTop(), this.viewport);
        this._needRepaint = false;
        console.log('repaint ended in ' + (Date.now() - now) + ' ms.');
    };
    // full document relayout. this function computes where to draw
    // objects in the canvas.
    HTML_Body.prototype.relayout = function () {
        if (!this._needRelayout) {
            console.log('body.relayout: up to date.');
            return;
        }
        var now = Date.now();
        if (!this.viewport) {
            return;
        }
        this._layout = this.createLayout();
        this._layout.offsetTop = -this.style.marginTop();
        this._layout.offsetLeft = -this.style.marginLeft();
        this._layout.offsetWidth = this.viewport.width() - this.viewport._scrollbarSize;
        this._layout.innerWidth = this._layout.offsetWidth - this.style.paddingLeft() - this.style.paddingRight() - (this.style.borderWidth() * 2);
        this._layout.innerTop = this._layout.offsetTop + this.style.paddingTop() + this.style.borderWidth();
        this._layout.innerLeft = this._layout.offsetLeft + this.style.paddingLeft() + this.style.borderWidth();
        this.style._width.value = String(this._layout.offsetWidth);
        this.style._width.isSet = true;
        this._layout.computeWidths();
        this._layout.computeHeights(this.style.marginTop());
        this.viewport.scrollTop(this.viewport.scrollTop());
        console.log('relayout completed in ' + (Date.now() - now) + ' ms.');
        //console.log( this._layout.serialize() );
        this._needRelayout = false;
    };
    HTML_Body.AUTOCLOSE_TAGS = [
        'br',
        'canvas',
        'input',
        'hr',
        'img'
    ];
    HTML_Body.FORCE_TEXT_NODES = [
        'pre',
        'script',
        'textarea',
        'style',
        'code'
    ];
    HTML_Body.IGNORE_ELEMENTS = [
        'head',
        'style',
        'script',
        'iframe'
    ];
    HTML_Body.TRAVERSE_ELEMENTS = [
        'html',
        'body',
        'span'
    ];
    return HTML_Body;
})(TNode_Element);
var HTML_Paragraph = (function (_super) {
    __extends(HTML_Paragraph, _super);
    function HTML_Paragraph() {
        _super.call(this);
        this.nodeName = 'p';
        this.style.display('block');
        this.style.marginTop('5');
        this.style.marginBottom('10');
    }
    return HTML_Paragraph;
})(TNode_Element);
var HTML_Image = (function (_super) {
    __extends(HTML_Image, _super);
    function HTML_Image(src) {
        if (src === void 0) { src = null; }
        _super.call(this);
        this.node = document.createElement('img');
        this.loaded = false; // is the image loaded successfully
        this.error = false; // an error occured after loading
        this.nodeName = 'img';
        this.style.display('block');
        (function (me) {
            me.node.addEventListener('load', function () {
                me.loaded = true;
                me.error = false;
                me.style.aspectRatio(String((me.node.width / me.node.height)));
                if (!me.style._width.isSet && !me.style._height.isSet) {
                    me.style.width(String(me.node.width));
                }
                me.requestRelayout();
            }, false);
            me.node.addEventListener('erorr', function () {
                me.loaded = true;
                me.error = true;
                me.style.aspectRatio('1');
                me.requestRelayout();
            }, false);
        })(this);
        if (src !== null) {
            this.src(src);
        }
    }
    HTML_Image.prototype.src = function (source) {
        if (source === void 0) { source = null; }
        if (source === null) {
            // getter
            return this.node.getAttribute('src') || '';
        }
        else {
            // setter
            this.loaded = false;
            this.error = false;
            this.node.setAttribute('src', String(source || ''));
            this.requestRelayout();
        }
    };
    HTML_Image.prototype.setAttribute = function (attributeName, attributeValue) {
        switch (attributeName) {
            case 'src':
                this.src(attributeValue || null);
                break;
            case 'align':
                this.style.float(attributeValue || '');
                break;
            default:
                _super.prototype.setAttribute.call(this, attributeName, attributeValue);
                break;
        }
    };
    HTML_Image.prototype.width = function (size) {
        if (size === void 0) { size = null; }
        if (size === null) {
            // getter
            return String(this.style.width() || '');
        }
        else {
            if (size == '') {
                this.style._width.isSet = false;
            }
            else {
                this.style.width(size);
            }
            return size;
        }
    };
    HTML_Image.prototype.height = function (size) {
        if (size === void 0) { size = null; }
        if (size === null) {
            //getter
            return String(this.style.height() || '');
        }
        else {
            if (size == '') {
                this.style._height.isSet = false;
            }
            else {
                this.style.height(size);
            }
            return size;
        }
    };
    HTML_Image.prototype.align = function (align) {
        if (align === void 0) { align = null; }
        if (align === null) {
            // getter
            return this.style.float();
        }
        else {
            if (align == '') {
                this.style._float.isSet = false;
            }
            else {
                this.style.float(align);
            }
            return align;
        }
    };
    HTML_Image.prototype.paint = function (ctx, layout, scrollLeft, scrollTop) {
        _super.prototype.paint.call(this, ctx, layout, scrollLeft, scrollTop);
        if (this.loaded) {
            if (this.error) {
            }
            else {
                ctx.drawImage(this.node, 0, 0, this.node.width, this.node.height, layout.innerLeft - scrollLeft, layout.innerTop - scrollTop, layout.innerWidth, layout.innerHeight);
            }
        }
    };
    return HTML_Image;
})(TNode_Element);
var HTML_Heading1 = (function (_super) {
    __extends(HTML_Heading1, _super);
    function HTML_Heading1() {
        _super.call(this);
        this.nodeName = 'h1';
        this.style.display('block');
        this.style.fontSize('18');
        this.style.fontWeight('bold');
    }
    return HTML_Heading1;
})(TNode_Element);
var HTML_Heading2 = (function (_super) {
    __extends(HTML_Heading2, _super);
    function HTML_Heading2() {
        _super.call(this);
        this.nodeName = 'h2';
        this.style.display('block');
        this.style.fontSize('17');
        this.style.fontWeight('bold');
    }
    return HTML_Heading2;
})(TNode_Element);
var HTML_Heading3 = (function (_super) {
    __extends(HTML_Heading3, _super);
    function HTML_Heading3() {
        _super.call(this);
        this.nodeName = 'h3';
        this.style.display('block');
        this.style.fontSize('17');
        this.style.fontWeight('bold');
        this.style.fontStyle('italic');
    }
    return HTML_Heading3;
})(TNode_Element);
var HTML_Heading4 = (function (_super) {
    __extends(HTML_Heading4, _super);
    function HTML_Heading4() {
        _super.call(this);
        this.nodeName = 'h4';
        this.style.display('block');
        this.style.fontSize('16');
        this.style.fontWeight('bold');
    }
    return HTML_Heading4;
})(TNode_Element);
var HTML_Heading5 = (function (_super) {
    __extends(HTML_Heading5, _super);
    function HTML_Heading5() {
        _super.call(this);
        this.nodeName = 'h5';
        this.style.display('block');
        this.style.fontSize('15');
        this.style.fontWeight('bold');
    }
    return HTML_Heading5;
})(TNode_Element);
var HTML_Bold = (function (_super) {
    __extends(HTML_Bold, _super);
    function HTML_Bold() {
        _super.call(this);
        this.nodeName = 'b';
        this.style.display('inline');
        this.style.fontWeight('bold');
    }
    return HTML_Bold;
})(TNode_Element);
var HTML_Italic = (function (_super) {
    __extends(HTML_Italic, _super);
    function HTML_Italic() {
        _super.call(this);
        this.nodeName = 'i';
        this.style.display('inline');
        this.style.fontStyle('italic');
    }
    return HTML_Italic;
})(TNode_Element);
var HTML_Underline = (function (_super) {
    __extends(HTML_Underline, _super);
    function HTML_Underline() {
        _super.call(this);
        this.nodeName = 'u';
        this.style.display('inline');
        this.style.textDecoration('underline');
    }
    return HTML_Underline;
})(TNode_Element);
var HTML_Anchor = (function (_super) {
    __extends(HTML_Anchor, _super);
    function HTML_Anchor() {
        _super.call(this);
        this.nodeName = 'a';
        this.style.display('inline');
        this.style.color('blue');
        this.style.textDecoration('underline');
    }
    return HTML_Anchor;
})(TNode_Element);
var HTML_BulletedList = (function (_super) {
    __extends(HTML_BulletedList, _super);
    function HTML_BulletedList() {
        _super.call(this);
        this.nodeName = 'ul';
        this.style.display('block');
        this.style.paddingLeft('30');
    }
    return HTML_BulletedList;
})(TNode_Element);
var HTML_OrderedList = (function (_super) {
    __extends(HTML_OrderedList, _super);
    function HTML_OrderedList() {
        _super.call(this);
        this.nodeName = 'ol';
        this.style.display('block');
        this.style.paddingLeft('30');
    }
    return HTML_OrderedList;
})(TNode_Element);
var HTML_ListItem = (function (_super) {
    __extends(HTML_ListItem, _super);
    function HTML_ListItem() {
        _super.call(this);
        this.nodeName = 'li';
        this.style.display('block');
    }
    HTML_ListItem.prototype.paint = function (ctx, layout, scrollLeft, scrollTop) {
        _super.prototype.paint.call(this, ctx, layout, scrollLeft, scrollTop);
        /* If the parent is a OL, paint my number,
           otherwise paint a disk.
         */
        ctx.fillStyle = this.style.color();
        ctx.textAlign = 'right';
        ctx.font = this.style.fontStyleText();
        ctx.textBaseline = 'alphabetic';
        if (this.parentNode.nodeName == 'ol') {
            ctx.fillText(String(this.siblingIndex + 1) + '.', layout.innerLeft - 5 - scrollLeft, layout.innerTop + this.style.fontSize() * this.style.lineHeight() - scrollTop);
        }
        else {
            ctx.fillText('\u25cf', layout.innerLeft - 5 - scrollLeft, layout.innerTop + this.style.fontSize() * this.style.lineHeight() - scrollTop);
        }
    };
    return HTML_ListItem;
})(TNode_Element);
var HTML_Superscript = (function (_super) {
    __extends(HTML_Superscript, _super);
    function HTML_Superscript() {
        _super.call(this);
        this.nodeName = 'sup';
        this.style.display('inline');
        this.style.verticalAlign('super');
        this.style.fontSize('80%');
    }
    return HTML_Superscript;
})(TNode_Element);
var HTML_Subscript = (function (_super) {
    __extends(HTML_Subscript, _super);
    function HTML_Subscript() {
        _super.call(this);
        this.nodeName = 'sub';
        this.style.display('inline');
        this.style.verticalAlign('sub');
        this.style.fontSize('80%');
    }
    return HTML_Subscript;
})(TNode_Element);
var HTML_Table = (function (_super) {
    __extends(HTML_Table, _super);
    function HTML_Table() {
        _super.call(this);
        this.needCompile = true;
        this.matrix = null;
        this._cellPadding = 0;
        this._cellSpacing = 0;
        this._border = 0;
        this.nodeName = 'table';
        this.style.display('block');
        this.style.marginTop('10');
    }
    HTML_Table.prototype.requestCompile = function () {
        this.needCompile = true;
        // request a relayout of the document
        if (this.documentElement) {
            this.documentElement.requestRelayout();
        }
    };
    // ignore other elements other than table row
    HTML_Table.prototype.appendChild = function (node, index) {
        if (index === void 0) { index = null; }
        var returnValue;
        if (node.nodeType == 2 /* ELEMENT */ && node.nodeName == 'tr') {
            returnValue = (_super.prototype.appendChild.call(this, node, index));
            returnValue.ownerTable = this;
            this.requestCompile();
            return returnValue;
        }
        else {
            //silently discard errors
            return node;
        }
    };
    HTML_Table.prototype.setAttribute = function (attributeName, attributeValue) {
        switch (attributeName) {
            case 'border':
                this.border(~~attributeValue);
                break;
            case 'bordercolor':
                this.style.borderColor(String(attributeValue || ''));
                break;
            case 'cellpadding':
                this.cellPadding(~~attributeValue);
                break;
            case 'cellspacing':
                this.cellSpacing(~~attributeValue);
                break;
            default:
                _super.prototype.setAttribute.call(this, attributeName, attributeValue);
                break;
        }
    };
    // builds the table matrix, needed for initializing the
    // layout.
    HTML_Table.prototype.compile = function () {
        if (!this.needCompile) {
            return;
        }
        console.log('compiling table...');
        var cellIndex = 0, i = 0, j = 0, k = 0, n = 0, o = 0, p = 0, cell, cells = [], matrix = new HTML_Table_Matrix(cells);
        this.matrix = matrix;
        for (i = 0, n = this.childNodes.length; i < n; i++) {
            for (j = 0, o = this.childNodes[i].childNodes.length; j < o; j++) {
                (cell = this.childNodes[i].childNodes[j]).tableIndex = cellIndex++;
                cell.edgeLeft = null;
                cell.edgeRight = null;
                cell.edgeTop = null;
                cell.edgeBottom = null;
                cell.rowIndex = j;
                cells.push(cell);
                matrix.writeAt(i, cell.tableIndex, cell.colSpan(), cell.rowSpan());
            }
        }
        matrix.compute();
        this.needCompile = false;
    };
    HTML_Table.prototype.createLayout = function (useParentLayout) {
        /* Creates a table layout, based on compiled information.
           This is a special layout, and is needed to display the cells of the table.
         */
        if (useParentLayout === void 0) { useParentLayout = null; }
        this.compile();
        return new Layout_Block_Table(this, this.matrix);
    };
    HTML_Table.prototype.cellPadding = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._cellPadding;
        }
        else {
            v = ~~v;
            if (v < 0)
                v = 0;
            if (this._cellPadding != v) {
                this._cellPadding = v;
                if (this.documentElement) {
                    this.documentElement.requestRelayout();
                }
            }
        }
    };
    HTML_Table.prototype.cellSpacing = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._cellSpacing;
        }
        else {
            v = ~~v;
            if (v < 0)
                v = 0;
            if (this._cellSpacing != v) {
                this._cellSpacing = v;
                if (this.documentElement) {
                    this.documentElement.requestRelayout();
                }
            }
        }
    };
    HTML_Table.prototype.border = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._border;
        }
        else {
            v = ~~v;
            if (v < 0)
                v = 0;
            if (this._border !== v) {
                this._border = v;
                if (this.documentElement) {
                    this.documentElement.requestRelayout();
                }
            }
        }
    };
    return HTML_Table;
})(TNode_Element);
var HTML_Table_Matrix = (function () {
    function HTML_Table_Matrix(cellsArray) {
        this.cellsArray = cellsArray;
        this.cols = 0;
        this.rows = 0;
        this.data = [];
        this.xEdges = new HTML_Table_EdgesCollection('x');
        this.yEdges = new HTML_Table_EdgesCollection('y');
    }
    HTML_Table_Matrix.prototype.setCols = function (numCols) {
        if (numCols > this.cols) {
            for (var y = 0, len = this.data.length; y < len; y++) {
                for (var x = this.cols; x < numCols; x++) {
                    this.data[y].push(null);
                }
            }
            this.cols = ~~numCols;
        }
    };
    HTML_Table_Matrix.prototype.setRows = function (numRows) {
        var row;
        if (numRows > this.rows) {
            for (var y = this.rows; y < numRows; y++) {
                row = [];
                for (var x = 0; x < this.cols; x++) {
                    row.push(null);
                }
                this.data.push(row);
            }
            this.rows = ~~numRows;
        }
    };
    HTML_Table_Matrix.prototype.writeAt = function (row, value, colSpan, rowSpan) {
        this.setRows(row + rowSpan);
        var index = 0;
        this.setCols(1);
        while (this.data[row][index] !== null) {
            index++;
            this.setCols(index + 1);
        }
        this.setCols(index + colSpan);
        for (var x = 0; x < colSpan; x++) {
            for (var y = 0; y < rowSpan; y++) {
                this.data[y + row][x + index] = value;
            }
        }
    };
    HTML_Table_Matrix.prototype.compute = function () {
        this.xEdges.setNumber(this.cols);
        this.yEdges.setNumber(this.rows);
        var row = 0, col = 0, lastCell = null, i = 0, len = 0;
        for (row = 0; row < this.rows; row++) {
            for (col = 0; col < this.cols; col++) {
                if (lastCell != this.data[row][col]) {
                    lastCell = this.data[row][col];
                    if (lastCell !== null) {
                        if (!this.cellsArray[lastCell].edgeLeft) {
                            this.cellsArray[lastCell].edgeLeft = this.cellsArray[lastCell].edgeLeft || this.xEdges.edges[col];
                            this.cellsArray[lastCell].edgeTop = this.cellsArray[lastCell].edgeTop || this.yEdges.edges[row];
                            for (i = col; i < this.cols; i++) {
                                if (this.data[row][i] == lastCell) {
                                    this.cellsArray[lastCell].edgeRight = this.xEdges.edges[i];
                                }
                                else
                                    break;
                            }
                            for (i = row; i < this.rows; i++) {
                                if (this.data[i][col] == lastCell) {
                                    this.cellsArray[lastCell].edgeBottom = this.yEdges.edges[i];
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    HTML_Table_Matrix.prototype.toString = function () {
        var lines = [], line = '';
        for (var y = 0; y < this.rows; y++) {
            line = '|';
            for (var x = 0; x < this.cols; x++) {
                line += String(this.data[y][x] == 0 ? this.data[y][x] : (this.data[y][x] || ' '));
            }
            lines.push(line + '|');
        }
        return lines.join('\n ');
    };
    return HTML_Table_Matrix;
})();
var HTML_Table_EdgesCollection = (function () {
    function HTML_Table_EdgesCollection(name) {
        this.name = name;
        this.edges = [];
        this.purposedSizes = {};
    }
    HTML_Table_EdgesCollection.prototype.setNumber = function (numEdges) {
        this.edges = [];
        for (var i = 0; i < numEdges; i++) {
            this.edges.push(new HTML_Table_Edge(i, this));
        }
    };
    HTML_Table_EdgesCollection.prototype.setSize = function (edgeStartIndex, edgeEndIndex, size) {
        var key;
        if (edgeStartIndex == edgeEndIndex) {
            key = ':' + String(edgeStartIndex);
        }
        else {
            key = '/' + String(edgeStartIndex + ' ' + edgeEndIndex);
        }
        if (this.purposedSizes[key]) {
            this.purposedSizes[key] = Math.max(this.purposedSizes[key], size);
        }
        else {
            this.purposedSizes[key] = size;
        }
    };
    HTML_Table_EdgesCollection.prototype.resetSizes = function () {
        this.purposedSizes = {};
    };
    HTML_Table_EdgesCollection.prototype.applyRangeSize = function (start, end, size) {
        var unset = [], i = 0, len = start - end, sum = 0, pieceWidth = 0;
        for (i = start; i <= end; i++) {
            if (this.edges[i].isSet) {
                sum += this.edges[i].value;
            }
            else {
                unset.push(this.edges[i]);
            }
        }
        if (len = unset.length) {
            if (size < sum)
                return;
            pieceWidth = (size - sum) / len;
            for (i = 0; i < len; i++) {
                this.edges[i].value = pieceWidth;
                this.edges[i].isSet = true;
                sum += pieceWidth;
            }
            return;
        }
        if (size - sum > 0) {
            pieceWidth = (size - sum) / (end - start + 1);
            for (i = start; i <= end; i++) {
                this.edges[i].value += pieceWidth;
            }
        }
    };
    HTML_Table_EdgesCollection.prototype.applySizes = function () {
        var i = 0, len = 0, k = '', iStart = 0, iStop = 0, rng;
        for (i = 0, len = this.edges.length; i < len; i++) {
            this.edges[i].value = 0;
            this.edges[i].isSet = false;
        }
        for (k in this.purposedSizes) {
            if (k[0] == ':') {
                iStart = ~~k.substr(1);
                this.edges[iStart].value = this.purposedSizes[k];
                this.edges[iStart].isSet = true;
            }
        }
        for (k in this.purposedSizes) {
            if (k[0] == '/') {
                rng = k.substr(1).split(' ');
                this.applyRangeSize(~~rng[0], ~~rng[1], this.purposedSizes[k]);
            }
        }
    };
    HTML_Table_EdgesCollection.prototype.toString = function () {
        var out = [];
        for (var i = 0, len = this.edges.length; i < len; i++) {
            out.push(String(this.edges[i].offsetIndexStart + '->' + this.edges[i].offsetIndexEnd));
        }
        return '|' + out.join('|,|') + '|';
    };
    HTML_Table_EdgesCollection.prototype.resizeToFit = function (totalWidth, border, padding, spacing, shiftLeft) {
        if (shiftLeft === void 0) { shiftLeft = 0; }
        var sumTotal = 0, unset = [], i = 0, len = 0, pieceWidth = 0, maxPieceWidth = 0, minPieceWidth = -1, scale = 0.00, lastEdgeIndex = this.edges.length - 1;
        if (totalWidth != null) {
            for (i = 0, len = this.edges.length; i < len; i++) {
                this.edges[i].scaledValue = this.edges[i].value;
                if (this.edges[i].value > 0) {
                    sumTotal += this.edges[i].value;
                    if (maxPieceWidth < this.edges[i].value) {
                        maxPieceWidth = this.edges[i].value;
                        if (minPieceWidth == -1) {
                            minPieceWidth = maxPieceWidth;
                        }
                    }
                    if (minPieceWidth < this.edges[i].value) {
                        minPieceWidth = this.edges[i].value;
                    }
                }
                else {
                    unset.push(this.edges[i]);
                }
            }
            if (unset.length) {
                if (sumTotal < totalWidth) {
                    pieceWidth = (totalWidth - sumTotal) / unset.length;
                    for (i = 0, len = unset.length; i < len; i++) {
                        unset[i].scaledValue = pieceWidth;
                        sumTotal += pieceWidth;
                    }
                }
                else {
                    for (i = 0, len = unset.length; i < len; i++) {
                        unset[i].scaledValue = minPieceWidth;
                        sumTotal += minPieceWidth;
                    }
                }
            }
            scale = totalWidth / sumTotal;
            for (i = 0, len = this.edges.length; i < len; i++) {
                this.edges[i].scaledValue *= scale;
            }
        }
        else {
            for (i = 0, len = this.edges.length; i < len; i++) {
                this.edges[i].scaledValue = this.edges[i].value;
            }
        }
        this.edges[0].indexStart = shiftLeft + spacing;
        this.edges[0].offsetIndexStart = shiftLeft + spacing;
        for (i = 0, len = this.edges.length; i < (len - 1); i++) {
            this.edges[i].indexEnd = this.edges[i].indexStart + this.edges[i].scaledValue + (2 * (padding + border)) + (spacing * .5);
            this.edges[i].offsetIndexEnd = this.edges[i].offsetIndexStart + 2 * border + 2 * padding + this.edges[i].scaledValue;
            this.edges[i + 1].indexStart = this.edges[i].indexEnd;
            this.edges[i + 1].offsetIndexStart = this.edges[i].indexEnd + spacing * .5;
        }
        this.edges[lastEdgeIndex].indexEnd = this.edges[lastEdgeIndex].indexStart + this.edges[lastEdgeIndex].scaledValue + padding * 2 + 2 * border + spacing * 1.5;
        this.edges[lastEdgeIndex].offsetIndexEnd = this.edges[lastEdgeIndex].indexEnd - spacing;
    };
    return HTML_Table_EdgesCollection;
})();
var HTML_Table_Edge = (function () {
    function HTML_Table_Edge(index, group) {
        this.index = index;
        this.group = group;
        this.value = 0;
        this.scaledValue = 0;
        this.isSet = false;
        this.indexStart = 0;
        this.indexEnd = 0;
        this.offsetIndexStart = 0;
        this.offsetIndexEnd = 0;
    }
    HTML_Table_Edge.prototype.setValue = function (amount) {
        amount = ~~amount;
        if (this.value < amount) {
            this.value = amount;
            this.scaledValue = amount;
        }
    };
    return HTML_Table_Edge;
})();
var HTML_TableRow = (function (_super) {
    __extends(HTML_TableRow, _super);
    function HTML_TableRow() {
        _super.call(this);
        this.ownerTable = null;
        this.nodeName = 'tr';
        this.style.display('block');
    }
    // ignore other elements other than table cell
    HTML_TableRow.prototype.appendChild = function (node, index) {
        if (index === void 0) { index = null; }
        var returnValue;
        if (node.nodeType == 2 /* ELEMENT */ && node.nodeName == 'td') {
            returnValue = (_super.prototype.appendChild.call(this, node, index));
            returnValue.ownerTable = this.ownerTable;
            if (this.ownerTable) {
                this.ownerTable.requestCompile();
            }
            return returnValue;
        }
        else {
            //silently discard errors
            return node;
        }
    };
    return HTML_TableRow;
})(TNode_Element);
var HTML_TableCell = (function (_super) {
    __extends(HTML_TableCell, _super);
    function HTML_TableCell() {
        _super.call(this, true);
        this.ownerTable = null;
        this.tableIndex = 0; // the index of the cell in it's table
        this.rowIndex = 0; // the index of the cell in it's row
        this._colSpan = 1;
        this._rowSpan = 1;
        this.edgeLeft = null;
        this.edgeRight = null;
        this.edgeTop = null;
        this.edgeBottom = null;
        this.style = new TStyle_TableCell(this);
        this.nodeName = 'td';
        this.style.display('block');
        this.style.borderWidth('1');
        this.style.borderColor('black');
        this.style.padding('5');
    }
    HTML_TableCell.prototype.colSpan = function (value) {
        if (value === void 0) { value = null; }
        if (value === null) {
            return this._colSpan;
        }
        else {
            value = ~~value;
            if (value < 1) {
                value = 1;
            }
            this._colSpan = value;
            if (this.ownerTable)
                this.ownerTable.requestCompile();
            return this._colSpan;
        }
    };
    HTML_TableCell.prototype.rowSpan = function (value) {
        if (value === void 0) { value = null; }
        if (value === null) {
            return this._rowSpan;
        }
        else {
            value = ~~value;
            if (value < 1) {
                value = 1;
            }
            this._rowSpan = value;
            if (this.ownerTable)
                this.ownerTable.requestCompile();
            return this._rowSpan;
        }
    };
    HTML_TableCell.prototype.setAttribute = function (attributeName, attributeValue) {
        switch (attributeName) {
            case 'colspan':
                this.colSpan(~~attributeValue);
                break;
            case 'rowspan':
                this.rowSpan(~~attributeValue);
                break;
            default:
                _super.prototype.setAttribute.call(this, attributeName, attributeValue);
                break;
        }
    };
    return HTML_TableCell;
})(TNode_Element);
var TStyle = (function () {
    function TStyle(node) {
        this.node = node;
        this._width = new TStyle_Dimension(this, 'width');
        this._height = new TStyle_Dimension(this, 'height');
        this._aspectRatio = new TStyle_Dimension(this, 'aspectRatio');
        this._paddingTop = new TStyle_Dimension(this, 'paddingTop');
        this._paddingRight = new TStyle_Dimension(this, 'paddingRight');
        this._paddingLeft = new TStyle_Dimension(this, 'paddingLeft');
        this._paddingBottom = new TStyle_Dimension(this, 'paddingBottom');
        this._marginTop = new TStyle_Dimension(this, 'marginTop');
        this._marginRight = new TStyle_Dimension(this, 'marginRight');
        this._marginLeft = new TStyle_Dimension(this, 'marginLeft');
        this._marginBottom = new TStyle_Dimension(this, 'marginBottom');
        this._borderWidth = new TStyle_Dimension(this, 'borderWidth');
        this._fontSize = new TStyle_Dimension(this, 'fontSize');
        this._fontFamily = new TStyle_String(this, 'fontFamily', TStyle.$FontFamily);
        this._fontStyle = new TStyle_String(this, 'fontStyle', TStyle.$FontStyle);
        this._fontWeight = new TStyle_String(this, 'fontWeight', TStyle.$FontWeight);
        this._textDecoration = new TStyle_String(this, 'textDecoration', TStyle.$TextDecoration);
        this._lineHeight = new TStyle_Dimension(this, 'lineHeight');
        this._textAlign = new TStyle_String(this, 'textAlign', TStyle.$TextAlign);
        this._verticalAlign = new TStyle_String(this, 'verticalAlign', TStyle.$VerticalAlign);
        this._display = new TStyle_String(this, 'display', TStyle.$Display);
        this._float = new TStyle_String(this, 'float', TStyle.$Floats);
        this._color = new TStyle_Color(this, 'color', true);
        this._backgroundColor = new TStyle_Color(this, 'backgroundColor', false);
        this._borderColor = new TStyle_Color(this, 'borderColor', false);
    }
    TStyle.prototype.width = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._width.get();
        }
        else {
            this._width.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.height = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._height.get();
        }
        else {
            this._height.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.aspectRatio = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._aspectRatio.get();
        }
        else {
            this._aspectRatio.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.paddingLeft = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._paddingLeft.get();
        }
        else {
            this._paddingLeft.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.paddingTop = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._paddingTop.get();
        }
        else {
            this._paddingTop.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.paddingRight = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._paddingRight.get();
        }
        else {
            this._paddingRight.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.paddingBottom = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._paddingBottom.get();
        }
        else {
            this._paddingBottom.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.marginLeft = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._marginLeft.get();
        }
        else {
            this._marginLeft.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.marginTop = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._marginTop.get();
        }
        else {
            this._marginTop.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.marginRight = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._marginRight.get();
        }
        else {
            this._marginRight.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.marginBottom = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._marginBottom.get();
        }
        else {
            this._marginBottom.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.borderWidth = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._borderWidth.get();
        }
        else {
            this._borderWidth.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.fontSize = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._fontSize.get();
        }
        else {
            this._fontSize.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.lineHeight = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._lineHeight.get();
        }
        else {
            this._lineHeight.set(v);
            this.node.requestRelayout();
            return null;
        }
    };
    TStyle.prototype.fontFamily = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._fontFamily.get();
        }
        else {
            this._fontFamily.set(v);
            this.node.requestRelayout();
            return v;
        }
    };
    TStyle.prototype.fontStyle = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._fontStyle.get();
        }
        else {
            this._fontStyle.set(v);
            this.node.requestRelayout();
            return v;
        }
    };
    TStyle.prototype.fontWeight = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._fontWeight.get();
        }
        else {
            this._fontWeight.set(v);
            this.node.requestRelayout();
            return v;
        }
    };
    // the text that is used on the canvas context for fontStyle
    TStyle.prototype.fontStyleText = function () {
        return (this.fontStyle() == 'italic' ? 'italic ' : '') + (this.fontWeight() == 'bold' ? 'bold ' : '') + (this.fontSize()) + 'px ' + this.fontFamily();
    };
    TStyle.prototype.textDecoration = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._textDecoration.get();
        }
        else {
            this._textDecoration.set(v);
            this.node.requestRepaint();
            return v;
        }
    };
    TStyle.prototype.display = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._display.get();
        }
        else {
            this._display.set(v);
            this.node.requestRelayout();
            return v;
        }
    };
    TStyle.prototype.color = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._color.get();
        }
        else {
            this._color.set(v);
            this.node.requestRepaint();
            return v;
        }
    };
    TStyle.prototype.backgroundColor = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._backgroundColor.get();
        }
        else {
            this._backgroundColor.set(v);
            this.node.requestRepaint();
            return v;
        }
    };
    TStyle.prototype.borderColor = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._borderColor.get();
        }
        else {
            this._borderColor.set(v);
            this.node.requestRepaint();
            return v;
        }
    };
    TStyle.prototype.float = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._float.get();
        }
        else {
            this._float.set(v);
            this.node.requestRelayout();
            return v;
        }
    };
    TStyle.prototype.padding = function (value) {
        this._paddingLeft.value = this._paddingRight.value = this._paddingTop.value = this._paddingBottom.value = (parseFloat(value || '0') || 0);
        this._paddingLeft.isSet = this._paddingRight.isSet = this._paddingBottom.isSet = this._paddingTop.isSet = true;
        this.node.requestRelayout();
    };
    TStyle.prototype.textAlign = function (value) {
        if (value === void 0) { value = null; }
        if (value === null) {
            //getter
            return this._textAlign.get();
        }
        else {
            //setter
            this._textAlign.set(value);
            this.node.requestRepaint();
            return value;
        }
    };
    TStyle.prototype.verticalAlign = function (value) {
        if (value === void 0) { value = null; }
        if (value === null) {
            return this._verticalAlign.get();
        }
        else {
            this._verticalAlign.set(value);
            this.node.requestRepaint();
            return value;
        }
    };
    TStyle.prototype.offsetWidth = function () {
        return this.borderWidth() + this.paddingLeft() + this.width() + this.paddingRight() + this.borderWidth();
    };
    TStyle.prototype.offsetHeight = function () {
        return this.borderWidth() + this.paddingTop() + this.height() + this.paddingRight() + this.borderWidth();
    };
    TStyle.$FontFamily = [
        "Arial",
        "Times",
        "Courier",
        "Impact"
    ];
    TStyle.$FontStyle = [
        "normal",
        "italic"
    ];
    TStyle.$FontWeight = [
        "normal",
        "bold"
    ];
    TStyle.$TextDecoration = [
        "none",
        "underline"
    ];
    TStyle.$Display = [
        "block",
        "inline",
        "none"
    ];
    TStyle.$Floats = [
        "none",
        "left",
        "right",
        "center"
    ];
    TStyle.$TextAlign = [
        'left',
        'right',
        'center',
        'justified'
    ];
    TStyle.$VerticalAlign = [
        'super',
        'sub',
        'normal'
    ];
    return TStyle;
})();
var TStyle_TableCell = (function (_super) {
    __extends(TStyle_TableCell, _super);
    function TStyle_TableCell(node) {
        _super.call(this, node);
        this.node = node;
    }
    // the padding of the table cell cannot be modified.
    TStyle_TableCell.prototype.paddingLeft = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            if (this.node.parentNode && this.node.parentNode.parentNode) {
                return this.node.parentNode.parentNode.cellPadding();
            }
            else {
                return 0;
            }
        }
        else
            return 0;
    };
    TStyle_TableCell.prototype.paddingTop = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            if (this.node.parentNode && this.node.parentNode.parentNode) {
                return this.node.parentNode.parentNode.cellPadding();
            }
            else {
                return 0;
            }
        }
        else
            return 0;
    };
    TStyle_TableCell.prototype.paddingRight = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            if (this.node.parentNode && this.node.parentNode.parentNode) {
                return this.node.parentNode.parentNode.cellPadding();
            }
            else {
                return 0;
            }
        }
        else
            return 0;
    };
    TStyle_TableCell.prototype.paddingBottom = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            if (this.node.parentNode && this.node.parentNode.parentNode) {
                return this.node.parentNode.parentNode.cellPadding();
            }
            else {
                return 0;
            }
        }
        else
            return 0;
    };
    // the margin of the table cell cannot be modified.
    TStyle_TableCell.prototype.marginLeft = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            if (this.node.parentNode && this.node.parentNode.parentNode) {
                return this.node.parentNode.parentNode.cellSpacing();
            }
            else {
                return 0;
            }
        }
        else
            return 0;
    };
    TStyle_TableCell.prototype.marginTop = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            if (this.node.parentNode && this.node.parentNode.parentNode) {
                return this.node.parentNode.parentNode.cellSpacing();
            }
            else {
                return 0;
            }
        }
        else
            return 0;
    };
    TStyle_TableCell.prototype.marginRight = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            if (this.node.parentNode && this.node.parentNode.parentNode) {
                return this.node.parentNode.parentNode.cellSpacing();
            }
            else {
                return 0;
            }
        }
        else
            return 0;
    };
    TStyle_TableCell.prototype.marginBottom = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            if (this.node.parentNode && this.node.parentNode.parentNode) {
                return this.node.parentNode.parentNode.cellSpacing();
            }
            else {
                return 0;
            }
        }
        else
            return 0;
    };
    // the border-width and border-color cannot be modified
    TStyle_TableCell.prototype.borderWidth = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            if (this.node.parentNode && this.node.parentNode.parentNode) {
                return this.node.parentNode.parentNode.border();
            }
            else {
                return 0;
            }
        }
        else
            return 0;
    };
    TStyle_TableCell.prototype.borderColor = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            if (this.node.parentNode && this.node.parentNode.parentNode) {
                return this.node.parentNode.parentNode.style.borderColor();
            }
            else
                return '';
        }
        else
            return '';
    };
    return TStyle_TableCell;
})(TStyle);
var TStyle_Property = (function () {
    function TStyle_Property(style, name) {
        this.style = style;
        this.name = name;
        // <constructor> public style: TStyle;
        // <constructor> public name: string;
        this.isSet = false;
        this.value = null;
    }
    TStyle_Property.prototype.get = function () {
        return this.isSet ? this.value : null;
    };
    TStyle_Property.prototype.set = function (v) {
        this.isSet = true;
        this.value = v;
    };
    return TStyle_Property;
})();
var TStyle_PropertyInheritable = (function (_super) {
    __extends(TStyle_PropertyInheritable, _super);
    function TStyle_PropertyInheritable() {
        _super.apply(this, arguments);
    }
    TStyle_PropertyInheritable.prototype.get = function () {
        if (!this.isSet && this.style.node.parentNode) {
            return this.style.node.parentNode.style[this.name]();
        }
        else
            return _super.prototype.get.call(this);
    };
    return TStyle_PropertyInheritable;
})(TStyle_Property);
var TStyle_Dimension = (function (_super) {
    __extends(TStyle_Dimension, _super);
    function TStyle_Dimension() {
        _super.apply(this, arguments);
    }
    TStyle_Dimension.prototype.set = function (v) {
        var matches;
        if (!(matches = /^(\-)?([\d\.]+)(%)?$/.exec(v))) {
            console.warn("bad value for css style: " + this.name + " (" + JSON.stringify(v) + "). Unsetting...");
            this.isSet = false;
            this.value = null;
        }
        else {
            _super.prototype.set.call(this, v);
        }
    };
    TStyle_Dimension.prototype.get = function () {
        if (this.isSet) {
            if (/%$/.test(this.value)) {
                if (this.style.node.parentNode) {
                    // this is a percent value. we must obtain it from the parent node
                    var percent = parseFloat(this.value.substr(0, this.value.length - 1));
                    return (this.style.node.parentNode.style[this.name]() / 100) * percent;
                }
                else {
                    // is a percent, but don't have from where to inherit. return 0.
                    return 0;
                }
            }
            else {
                return parseFloat(this.value);
            }
        }
        else {
            // is not set.
            if ((this.name == 'width' && this.style._height.isSet || this.name == 'height' && this.style._width.isSet) && this.style._aspectRatio.isSet) {
                if (this.name == 'width') {
                    return this.style._height.get() * this.style._aspectRatio.get();
                }
                else {
                    return this.style._width.get() / this.style._aspectRatio.get();
                }
            }
            else if (this.style.node.parentNode && ['width', 'height', 'fontSize', 'lineHeight'].indexOf(this.name) >= 0) {
                return this.style.node.parentNode.style[this.name]();
            }
            else {
                return 0;
            }
        }
    };
    return TStyle_Dimension;
})(TStyle_Property);
var TStyle_String = (function (_super) {
    __extends(TStyle_String, _super);
    function TStyle_String(style, name, allowedOptions) {
        _super.call(this, style, name);
        this.style = style;
        this.name = name;
        this.allowedOptions = allowedOptions;
    }
    TStyle_String.prototype.get = function () {
        return this.isSet ? this.value : _super.prototype.get.call(this);
    };
    TStyle_String.prototype.set = function (v) {
        if (!v || this.allowedOptions.indexOf(v) == -1) {
            this.isSet = false;
            this.value = '';
        }
        else {
            this.value = v;
            this.isSet = true;
        }
    };
    return TStyle_String;
})(TStyle_PropertyInheritable);
var TStyle_Color = (function (_super) {
    __extends(TStyle_Color, _super);
    function TStyle_Color(style, name, allowInheritance) {
        _super.call(this, style, name);
        this.style = style;
        this.name = name;
        this.allowInheritance = allowInheritance;
    }
    TStyle_Color.prototype.get = function () {
        if (this.isSet) {
            return this.value;
        }
        else {
            if (this.allowInheritance) {
                return _super.prototype.get.call(this);
            }
            else {
                return '';
            }
        }
    };
    TStyle_Color.prototype.set = function (v) {
        v = String(v || '').toLowerCase();
        if (TStyle_Color.$NamedColors[v]) {
            this.isSet = true;
            this.value = TStyle_Color.$NamedColors[v];
            return;
        }
        if (/^#([a-f\d]{3}|[a-f\d]{6})$/.test(v)) {
            this.isSet = true;
            this.value = v;
            return;
        }
        this.isSet = false;
    };
    TStyle_Color.$NamedColors = {
        "aliceblue": "#f0f8ff",
        "antiquewhite": "#faebd7",
        "aqua": "#00ffff",
        "aquamarine": "#7fffd4",
        "azure": "#f0ffff",
        "beige": "#f5f5dc",
        "bisque": "#ffe4c4",
        "black": "#000000",
        "blanchedalmond": "#ffebcd",
        "blue": "#0000ff",
        "blueviolet": "#8a2be2",
        "brown": "#a52a2a",
        "burlywood": "#deb887",
        "cadetblue": "#5f9ea0",
        "chartreuse": "#7fff00",
        "chocolate": "#d2691e",
        "coral": "#ff7f50",
        "cornflowerblue": "#6495ed",
        "cornsilk": "#fff8dc",
        "crimson": "#dc143c",
        "cyan": "#00ffff",
        "darkblue": "#00008b",
        "darkcyan": "#008b8b",
        "darkgoldenrod": "#b8860b",
        "darkgray": "#a9a9a9",
        "darkgreen": "#006400",
        "darkkhaki": "#bdb76b",
        "darkmagenta": "#8b008b",
        "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00",
        "darkorchid": "#9932cc",
        "darkred": "#8b0000",
        "darksalmon": "#e9967a",
        "darkseagreen": "#8fbc8f",
        "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f",
        "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3",
        "deeppink": "#ff1493",
        "deepskyblue": "#00bfff",
        "dimgray": "#696969",
        "dodgerblue": "#1e90ff",
        "firebrick": "#b22222",
        "floralwhite": "#fffaf0",
        "forestgreen": "#228b22",
        "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc",
        "ghostwhite": "#f8f8ff",
        "gold": "#ffd700",
        "goldenrod": "#daa520",
        "gray": "#808080",
        "green": "#008000",
        "greenyellow": "#adff2f",
        "honeydew": "#f0fff0",
        "hotpink": "#ff69b4",
        "indianred ": "#cd5c5c",
        "indigo  ": "#4b0082",
        "ivory": "#fffff0",
        "khaki": "#f0e68c",
        "lavender": "#e6e6fa",
        "lavenderblush": "#fff0f5",
        "lawngreen": "#7cfc00",
        "lemonchiffon": "#fffacd",
        "lightblue": "#add8e6",
        "lightcoral": "#f08080",
        "lightcyan": "#e0ffff",
        "lightgoldenrodyellow": "#fafad2",
        "lightgray": "#d3d3d3",
        "lightgreen": "#90ee90",
        "lightpink": "#ffb6c1",
        "lightsalmon": "#ffa07a",
        "lightseagreen": "#20b2aa",
        "lightskyblue": "#87cefa",
        "lightslategray": "#778899",
        "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0",
        "lime": "#00ff00",
        "limegreen": "#32cd32",
        "linen": "#faf0e6",
        "magenta": "#ff00ff",
        "maroon": "#800000",
        "mediumaquamarine": "#66cdaa",
        "mediumblue": "#0000cd",
        "mediumorchid": "#ba55d3",
        "mediumpurple": "#9370db",
        "mediumseagreen": "#3cb371",
        "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a",
        "mediumturquoise": "#48d1cc",
        "mediumvioletred": "#c71585",
        "midnightblue": "#191970",
        "mintcream": "#f5fffa",
        "mistyrose": "#ffe4e1",
        "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead",
        "navy": "#000080",
        "oldlace": "#fdf5e6",
        "olive": "#808000",
        "olivedrab": "#6b8e23",
        "orange": "#ffa500",
        "orangered": "#ff4500",
        "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa",
        "palegreen": "#98fb98",
        "paleturquoise": "#afeeee",
        "palevioletred": "#db7093",
        "papayawhip": "#ffefd5",
        "peachpuff": "#ffdab9",
        "peru": "#cd853f",
        "pink": "#ffc0cb",
        "plum": "#dda0dd",
        "powderblue": "#b0e0e6",
        "purple": "#800080",
        "red": "#ff0000",
        "rosybrown": "#bc8f8f",
        "royalblue": "#4169e1",
        "saddlebrown": "#8b4513",
        "salmon": "#fa8072",
        "sandybrown": "#f4a460",
        "seagreen": "#2e8b57",
        "seashell": "#fff5ee",
        "sienna": "#a0522d",
        "silver": "#c0c0c0",
        "skyblue": "#87ceeb",
        "slateblue": "#6a5acd",
        "slategray": "#708090",
        "snow": "#fffafa",
        "springgreen": "#00ff7f",
        "steelblue": "#4682b4",
        "tan": "#d2b48c",
        "teal": "#008080",
        "thistle": "#d8bfd8",
        "tomato": "#ff6347",
        "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3",
        "white": "#ffffff",
        "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00",
        "yellowgreen": "#9acd32"
    };
    return TStyle_Color;
})(TStyle_PropertyInheritable);
var Character = (function () {
    function Character(node, index) {
        this.node = node;
        this.index = index;
        //public node: TElement_Text = null;      // the text node containing the character
        //public index: number;					// the index of the character in it's text node
        this.size = null;
    }
    Character.prototype.letter = function () {
        return this.node._text[this.index];
    };
    /* Compute the width of the character based on the
       style of the element which contains the text
       node */
    Character.prototype.computeSize = function () {
        if (this.size) {
            return this.size;
        }
        else {
            if (!this.node.parentNode) {
                return (this.size = [0, 0]);
            }
            else {
                var fontSize, font = (this.node.parentNode.style.fontStyle() == 'italic' ? 'italic ' : '') + (this.node.parentNode.style.fontWeight() == 'bold' ? 'bold ' : '') + (fontSize = this.node.parentNode.style.fontSize()) + 'px ' + this.node.parentNode.style.fontFamily(), lineHeight = fontSize * this.node.parentNode.style.lineHeight();
                return (this.size = [Character_Metrics.measureCharWidth(font, this.letter()), lineHeight]);
            }
        }
    };
    return Character;
})();
var Character_Metrics = (function () {
    function Character_Metrics() {
    }
    Character_Metrics.measureCharWidth = function (fontFamily, letter) {
        var self = Character_Metrics;
        if (!self.FontMap[fontFamily]) {
            self.FontMap[fontFamily] = {};
            self.ctx.font = fontFamily;
            self.FontMap[fontFamily][letter] = self.ctx.measureText(letter).width;
            return self.FontMap[fontFamily][letter];
        }
        else {
            if (!self.FontMap[fontFamily][letter]) {
                self.ctx.font = fontFamily;
                self.FontMap[fontFamily][letter] = self.ctx.measureText(letter).width;
            }
            return self.FontMap[fontFamily][letter];
        }
    };
    Character_Metrics.ctx = document.createElement('canvas').getContext('2d');
    Character_Metrics.FontMap = {};
    return Character_Metrics;
})();
var Character_Line = (function () {
    function Character_Line(maxWidth) {
        this.maxWidth = maxWidth;
        this.words = [];
        // <constructor> public maxWidth       : number = 0;
        this.wordGap = 0.00;
        this.size = [0, 0];
    }
    // a line accepts a word either:
    // - if the line contains no words
    // - if the line width + the word width is smaller the the line max allowed physicalWidth
    Character_Line.prototype.acceptWord = function (w) {
        return !!!(this.words[0]) || (this.size[0] + w.computeSize()[0] < this.maxWidth);
    };
    Character_Line.prototype.addWord = function (w) {
        var size = w.computeSize();
        this.words.push(w);
        this.size[0] += size[0];
        this.size[1] = Math.max(size[1], this.size[1]);
        this.wordGap = this.words.length > 2 ? ((this.maxWidth - this.size[0]) / (this.words.length - 1)) : 0.00;
    };
    Character_Line.prototype.toString = function () {
        var i = 0, len = this.words.length, out = '';
        for (i = 0; i < len; i++) {
            out += this.words[i].toString();
        }
        return out;
    };
    return Character_Line;
})();
var Character_Word = (function () {
    function Character_Word(characters) {
        this.characters = characters;
        //<constructor> public characters: Character[];
        this.size = null;
    }
    Character_Word.prototype.computeSize = function () {
        var i, len, size = [0, 0], charSize;
        if (this.size) {
            return this.size;
        }
        else {
            for (i = 0, len = this.characters.length; i < len; i++) {
                charSize = this.characters[i].computeSize();
                size[0] += charSize[0];
                size[1] = Math.max(size[1], charSize[1]);
            }
            this.size = size;
            return size;
        }
    };
    Character_Word.prototype.toString = function () {
        var out = '';
        for (var i = 0, len = this.characters.length; i < len; i++) {
            out += this.characters[i].letter();
        }
        return out;
    };
    return Character_Word;
})();
// the layout class is responsible to render elements on the canvas.
var Layout = (function () {
    function Layout() {
        this.offsetTop = 0;
        this.offsetLeft = 0;
        this.offsetWidth = 0;
        this.offsetHeight = 0;
        this.innerTop = 0;
        this.innerLeft = 0;
        this.innerWidth = 0;
        this.innerHeight = 0;
        this.parent = null;
        this.children = [];
        this.node = null;
        this.hasChars = false;
        this.isBuilt = false;
        this.siblingIndex = 0;
        this.layoutType = 'abstract';
    }
    Layout.prototype.buildAhead = function (layout) {
        if (layout === void 0) { layout = null; }
        throw "Abstract method";
    };
    /* Even if the layout has the node property set to null,
       as implemented on Layout_BlockChar, it is a child of a node
       in the upper layout logic. This function returns that node
    */
    Layout.prototype.ownerNode = function () {
        if (this.node === null) {
            if (this.parent) {
                return this.parent.ownerNode();
            }
            else
                return null;
        }
        else
            return this.node;
    };
    Layout.prototype.serialize = function (tabIndex) {
        if (tabIndex === void 0) { tabIndex = 0; }
        var tab = '', i = 0, len, out = [];
        for (i = 0, len = tabIndex * 4; i < len; i++) {
            tab += ' ';
        }
        out.push(tab + '<' + this.layoutType + (this.node ? ' of=' + this.node.nodeName + ' ' : ' shadow=' + this.ownerNode().nodeName + ' ') + ('offsetWidth=' + this.offsetWidth + ' offsetHeight=' + this.offsetHeight + ' offsetTop=' + this.offsetTop + ' offsetLeft=' + this.offsetLeft + ' innerWidth=' + this.innerWidth + ' innerHeight=' + this.innerHeight + ' innerTop=' + this.innerTop + ' innerLeft=' + this.innerLeft + ' ') + '>');
        if (this.children && (len = this.children.length)) {
            for (i = 0; i < len; i++) {
                out.push(this.children[i].serialize(tabIndex + 1));
            }
        }
        out.push(tab + '</' + this.layoutType + '>');
        return out.join('\n');
    };
    Layout.prototype.computeOffset = function (parentInnerOffsetLeft, parentInnerOffsetTop, parentInnerOffsetWidth) {
        if (parentInnerOffsetLeft === void 0) { parentInnerOffsetLeft = 0; }
        if (parentInnerOffsetTop === void 0) { parentInnerOffsetTop = 0; }
        if (parentInnerOffsetWidth === void 0) { parentInnerOffsetWidth = 0; }
        throw "Abstract method";
    };
    // sets the innerHeight of the block.
    // automatially increases the offset height if needed
    Layout.prototype.setInnerHeight = function (amount) {
        var diffInnerOuter = this.offsetHeight - this.innerHeight;
        this.innerHeight = amount;
        this.offsetHeight = this.innerHeight + diffInnerOuter;
    };
    Layout.prototype.setInnerHeightIfSmaller = function (amount) {
        if (amount < this.innerHeight) {
            this.setInnerHeight(amount);
        }
    };
    Layout.prototype.computeWidths = function () {
    };
    /* @input: top placement position
       @output: top placement position */
    Layout.prototype.computeHeights = function (topPlacement, indent) {
        if (indent === void 0) { indent = 0; }
        throw "Abstract method!";
    };
    Layout.prototype.tab = function (num) {
        var out = '', i = 0;
        for (i = 0; i < num * 4; i++) {
            out += ' ';
        }
        return out;
    };
    Layout.prototype.isPaintable = function (viewport) {
        var x1 = this.offsetLeft, y1 = this.offsetTop, x2 = this.offsetLeft + this.offsetWidth, y2 = this.offsetTop + this.offsetHeight, xx1 = viewport.scrollLeft(), yy1 = viewport.scrollTop(), xx2 = viewport.scrollLeft() + viewport.width() - viewport._scrollbarSize, yy2 = viewport.scrollTop() + viewport.height() - viewport._scrollbarSize;
        return (x2 <= xx1 || x1 >= xx2 || y2 <= yy1 || y1 >= yy2) ? false : true;
    };
    Layout.prototype.increaseYBy = function (pixels) {
        this.offsetTop += pixels;
        this.innerTop += pixels;
        if (this.children && this.children.length) {
            for (var i = 0, len = this.children.length; i < len; i++)
                this.children[i].increaseYBy(pixels);
        }
    };
    Layout.prototype.increaseHeightBy = function (pixels) {
        this.offsetHeight += pixels;
        this.innerHeight += pixels;
    };
    // paints the node, and after that paints it's sub-children
    Layout.prototype.paint = function (ctx, scrollLeft, scrollTop, viewport) {
        if (!this.isPaintable(viewport)) {
            return;
        }
        if (this.node) {
            this.node.paint(ctx, this, scrollLeft, scrollTop);
        }
        if (this.children) {
            for (var i = 0, len = this.children.length; i < len; i++) {
                this.children[i].paint(ctx, scrollLeft, scrollTop, viewport);
            }
        }
    };
    Layout.prototype.getTargetAtXY = function (point, boundsChecking) {
        if (boundsChecking === void 0) { boundsChecking = true; }
        if (point.y < this.offsetTop || (point.y > (this.offsetTop + this.offsetHeight) && boundsChecking) || point.x < (this.offsetLeft) || (point.x > (this.offsetLeft + this.offsetWidth) && boundsChecking))
            return null; // click outside the layout.
        var bestTarget = {
            layout: this,
            target: this.ownerNode(),
            absolute: point,
            relative: {
                "x": point.x - this.offsetLeft,
                "y": point.y - this.offsetTop
            }
        }, childTarget;
        if (this.children && this.children.length) {
            for (var i = this.children.length - 1; i >= 0; i--) {
                childTarget = this.children[i].getTargetAtXY(point);
                if (childTarget !== null) {
                    return childTarget;
                }
            }
        }
        return bestTarget;
    };
    return Layout;
})();
var Layout_Horizontal = (function (_super) {
    __extends(Layout_Horizontal, _super);
    function Layout_Horizontal(node, children) {
        _super.call(this);
        this.layoutType = 'horizontal';
        this.node = node;
        this.children = children;
        for (var i = 0, len = this.children.length; i < len; i++) {
            this.children[i].parent = this;
            this.children[i].siblingIndex = i;
        }
    }
    Layout_Horizontal.prototype.buildAhead = function (layout) {
        if (layout === void 0) { layout = null; }
        var i, len;
        if (!this.isBuilt) {
            for (var i = 0, len = this.children.length; i < len; i++) {
                this.children[i].buildAhead(this);
            }
            this.isBuilt = true;
        }
    };
    Layout_Horizontal.prototype.getCellWidth = function (cellIndex) {
        var width = 0, i = 0, len = 0;
        if (this.children[cellIndex] && this.children[cellIndex].children) {
            for (i = 0, len = this.children[cellIndex].children.length; i < len; i++) {
                if (!this.children[cellIndex].children[i].node) {
                    return null;
                }
                else {
                    width += (this.children[cellIndex].children[i].node.style.offsetWidth() + this.children[cellIndex].children[i].node.style.marginLeft() + this.children[cellIndex].children[i].node.style.marginRight());
                }
            }
        }
        return width;
    };
    Layout_Horizontal.prototype.computeWidths = function () {
        /* on horizontal layouts, we set the widths for the layouts which have nodes.
           the rest of the widths is computed as the average undefined widths */
        var widthLeft = this.innerWidth, computeAfter = [], leftPosition = this.innerLeft, i = 0, len = 0, averageWidth = 0, sumWidths = 0, optimalWidth = 0;
        for (i = 0, len = this.children.length; i < len; i++) {
            if (this.children[i].node) {
                // the child has a node associated.
                // if the node has a width, we set it's width as the
                // node width, otherwise we set it's width automatically
                if (this.children[i].node.style._width.isSet) {
                    this.children[i].offsetWidth = this.children[i].node.style.width() + (this.children[i].node.style.borderWidth() * 2) + this.children[i].node.style.paddingLeft() + this.children[i].node.style.paddingRight();
                    sumWidths += this.children[i].offsetWidth;
                }
                else {
                    computeAfter.push(this.children[i]);
                }
            }
            else {
                optimalWidth = this.getCellWidth(i);
                if (optimalWidth === null) {
                    computeAfter.push(this.children[i]);
                }
                else {
                    sumWidths += optimalWidth;
                    this.children[i].offsetWidth = optimalWidth;
                }
            }
        }
        averageWidth = (this.innerWidth - sumWidths) / computeAfter.length;
        for (i = 0, len = computeAfter.length; i < len; i++) {
            computeAfter[i].offsetWidth = averageWidth;
        }
        leftPosition = this.innerLeft;
        for (i = 0, len = this.children.length; i < len; i++) {
            if (this.children[i].node) {
                this.children[i].offsetLeft = leftPosition - this.children[i].node.style.marginLeft();
                this.children[i].innerLeft = this.children[i].offsetLeft + this.children[i].node.style.paddingLeft() + this.children[i].node.style.borderWidth();
                this.children[i].innerWidth = this.children[i].offsetWidth - (this.children[i].node.style.borderWidth() * 2) - this.children[i].node.style.paddingLeft() - this.children[i].node.style.paddingRight();
                leftPosition += this.children[i].node.style.marginRight();
            }
            else {
                this.children[i].offsetLeft = leftPosition;
                this.children[i].innerLeft = this.children[i].offsetLeft;
                this.children[i].innerWidth = this.children[i].offsetWidth;
            }
            leftPosition += this.children[i].offsetWidth;
        }
        for (i = 0, len = this.children.length; i < len; i++) {
            this.children[i].computeWidths();
        }
    };
    Layout_Horizontal.prototype.computeHeights = function (topPlacement, indent) {
        if (indent === void 0) { indent = 0; }
        var topPlacementBegin = topPlacement, contentHeight = 0, topPlacementMax = 0, i = 0, len;
        this.offsetHeight = 0;
        this.innerHeight = 0;
        if (this.node) {
            topPlacement += this.node.style.marginTop();
            this.offsetHeight += (this.node.style.borderWidth() + this.node.style.paddingTop());
            this.offsetTop = topPlacement;
            this.innerTop = topPlacement + this.offsetHeight;
            topPlacement += this.node.style.borderWidth() + this.node.style.paddingTop();
        }
        else {
            this.offsetTop = topPlacement;
            this.innerTop = topPlacement;
        }
        topPlacementMax = topPlacement;
        if (this.children && (len = this.children.length)) {
            for (i = 0; i < len; i++) {
                topPlacementMax = Math.max(topPlacementMax, this.children[i].computeHeights(topPlacement, indent + 1));
            }
            contentHeight = topPlacementMax - topPlacement;
        }
        this.innerHeight = contentHeight;
        this.offsetHeight += this.innerHeight;
        topPlacement += this.innerHeight;
        if (this.node) {
            topPlacement += (this.node.style.paddingBottom() + this.node.style.borderWidth() + this.node.style.marginBottom());
            this.offsetHeight += this.node.style.paddingBottom() + this.node.style.borderWidth();
        }
        return topPlacement;
    };
    return Layout_Horizontal;
})(Layout);
var Layout_Vertical = (function (_super) {
    __extends(Layout_Vertical, _super);
    function Layout_Vertical(node, children) {
        _super.call(this);
        this.layoutType = 'vertical';
        this.node = node;
        this.children = children;
        for (var i = 0, len = this.children.length; i < len; i++) {
            this.children[i].parent = this;
            this.children[i].siblingIndex = i;
        }
    }
    Layout_Vertical.prototype.buildAhead = function (layout) {
        if (layout === void 0) { layout = null; }
        var i, len;
        if (!this.isBuilt) {
            for (var i = 0, len = this.children.length; i < len; i++) {
                this.children[i].buildAhead(this);
            }
            this.isBuilt = true;
        }
    };
    Layout_Vertical.prototype.computeWidths = function () {
        var i = 0, len = this.children.length;
        for (i = 0; i < len; i++) {
            if (this.children[i].node) {
                // the child is represented by a node
                // compute offsetleft and innerLeft
                this.children[i].offsetLeft = this.innerLeft + this.children[i].node.style.marginLeft() - this.children[i].node.style.borderWidth();
                this.children[i].innerLeft = this.children[i].offsetLeft + this.children[i].node.style.borderWidth() + this.children[i].node.style.paddingLeft();
                // if the child has a specified width, set the width to the layout,
                // otherwise determine it's width by this parent
                if (this.children[i].node.style._width.isSet) {
                    this.children[i].innerWidth = this.children[i].node.style.width();
                    this.children[i].offsetWidth = this.children[i].node.style.offsetWidth();
                }
                else {
                    this.children[i].innerWidth = this.innerWidth - (this.children[i].node.style.borderWidth() * 2) - this.children[i].node.style.paddingLeft() - this.children[i].node.style.paddingRight() - this.children[i].node.style.marginLeft() - this.children[i].node.style.marginRight();
                    this.children[i].offsetWidth = this.children[i].innerWidth + this.children[i].node.style.paddingLeft() + this.children[i].node.style.paddingRight() + (this.children[i].node.style.borderWidth() * 2);
                }
            }
            else {
                // the child is not represented by a node, so it doesn't have padding, margin, etc
                this.children[i].offsetLeft = this.children[i].innerLeft = this.innerLeft;
                this.children[i].offsetWidth = this.children[i].innerWidth = this.innerWidth;
            }
            this.children[i].computeWidths();
        }
    };
    Layout_Vertical.prototype.computeHeights = function (topPlacement, indent) {
        if (indent === void 0) { indent = 0; }
        var contentHeight = 0, i = 0, len = 0, addHeight = 0, nodeStyleMarginTop = 0, nodeStyleMarginBottom = 0, nodeStyleBorderWidth = 0, nodeStylePaddingTop = 0, nodeStylePaddingBottom = 0;
        this.offsetHeight = 0;
        if (this.node) {
            nodeStyleMarginTop = this.node.style.marginTop();
            nodeStyleMarginBottom = this.node.style.marginBottom();
            nodeStyleBorderWidth = this.node.style.borderWidth();
            nodeStylePaddingTop = this.node.style.paddingTop();
            nodeStylePaddingBottom = this.node.style.paddingBottom();
            topPlacement += nodeStyleMarginTop;
            this.offsetTop = topPlacement;
            topPlacement += (this.offsetHeight = nodeStylePaddingTop + nodeStyleBorderWidth);
            this.innerTop = topPlacement;
        }
        else {
            this.offsetTop = topPlacement;
            this.innerTop = topPlacement;
        }
        if (this.children && (len = this.children.length)) {
            for (i = 0; i < len; i++) {
                addHeight = (this.children[i].computeHeights(topPlacement, indent + 1) - topPlacement);
                contentHeight += addHeight;
                topPlacement += addHeight;
                this.offsetHeight += addHeight;
            }
        }
        this.innerHeight = contentHeight;
        if (this.node) {
            this.offsetHeight += nodeStylePaddingBottom + nodeStyleBorderWidth;
            topPlacement += nodeStylePaddingBottom + nodeStyleBorderWidth + nodeStyleMarginBottom;
        }
        return topPlacement;
    };
    return Layout_Vertical;
})(Layout);
var Layout_Block = (function (_super) {
    __extends(Layout_Block, _super);
    function Layout_Block(element) {
        _super.call(this);
        this.children = null;
        this.layoutType = 'block';
        this.node = element;
    }
    Layout_Block.prototype.buildAhead = function (layout) {
        if (layout === void 0) { layout = null; }
        var i, len, replaceLayout;
        if (!this.isBuilt) {
            // console.log( 'build ahead: block layout for ' + this.node.nodeName );
            if (this.node) {
                if (this.node.childNodes && this.node.childNodes.length) {
                    if (!this.parent) {
                        throw "unhandled scenario";
                    }
                    // console.log( 'replace layout @index: ' + this.siblingIndex );
                    replaceLayout = this.node.createLayout(this.parent);
                    this.parent.children[this.siblingIndex] = this.node.createLayout(this.parent);
                    this.parent.children[this.siblingIndex].node = this.node;
                }
            }
            else {
                throw "Unhandled scenario.";
            }
            this.isBuilt = true;
        }
    };
    Layout_Block.prototype.computeWidths = function () {
        if (this.node) {
            this.offsetLeft += this.node.style.marginLeft();
        }
        else {
            throw "Unhandled scenario while computing widths!";
        }
    };
    Layout_Block.prototype.computeHeights = function (topPlacement, indent) {
        if (indent === void 0) { indent = 0; }
        var contentHeight = 0, topPlacementBegin = topPlacement;
        if (this.node) {
            topPlacement += this.node.style.marginTop();
            this.offsetTop = topPlacement;
            this.innerTop = this.offsetTop + this.node.style.paddingTop() + this.node.style.borderWidth();
            contentHeight = this.node.style.height();
        }
        else {
            throw "invalid block scenario";
        }
        if (this.children && this.children.length) {
            throw "unexpected children!";
        }
        // a blockNode doesn't contain children anymore...
        topPlacement += contentHeight;
        this.innerHeight = contentHeight;
        this.offsetHeight = contentHeight;
        if (this.node) {
            this.offsetHeight += (this.node.style.paddingBottom() + this.node.style.borderWidth());
            topPlacement += (this.node.style.paddingBottom() + this.node.style.borderWidth() + this.node.style.marginBottom());
        }
        else {
            throw "invalid block scenario";
        }
        return topPlacement;
    };
    return Layout_Block;
})(Layout);
var Layout_BlockChar = (function (_super) {
    __extends(Layout_BlockChar, _super);
    function Layout_BlockChar() {
        _super.apply(this, arguments);
        this.chars = [];
        this.children = null;
        this.hasChars = true;
        this.layoutType = 'text';
        this.lines = [];
    }
    Layout_BlockChar.prototype.addTextNode = function (node) {
        for (var i = 0, len = node._text.length; i < len; i++) {
            this.chars.push(new Character(node, i));
        }
    };
    // the blockchar layout doesn't contain any sub-layouts, so
    // no building is needed
    Layout_BlockChar.prototype.buildAhead = function () {
        if (!this.isBuilt) {
            this.isBuilt = true;
        }
    };
    // routine to build the lines of the block.
    // it takes in consideration the words, etc.
    Layout_BlockChar.prototype.buildLines = function (lineWidthInPixels) {
        var contents = this.textContents(), contentsWithWords = contents.replace(/([\S]+)([\s]+)?/g, '$1$2|'), i = 0, len = contentsWithWords.length, j = 0, n = 0, word = [], words = [], line, ownerNode = this.ownerNode();
        for (i = 0; i < len; i++) {
            if (contentsWithWords[i] == contents[j]) {
                word.push(this.chars[j]);
                j++;
            }
            else {
                if (word.length) {
                    words.push(new Character_Word(word));
                    word = [];
                }
            }
        }
        if (word.length) {
            words.push(new Character_Word(word));
        }
        this.lines = [];
        if (!words.length)
            return;
        line = new Character_Line(lineWidthInPixels);
        for (i = 0, len = words.length; i < len; i++) {
            if (line.acceptWord(words[i])) {
                line.addWord(words[i]);
            }
            else {
                this.lines.push(line);
                line = new Character_Line(lineWidthInPixels);
                line.addWord(words[i]);
            }
        }
        if (line.words.length)
            this.lines.push(line);
        for (i = 0, len = this.lines.length; i < len; i++) {
            this.lines[i].size[1] *= ownerNode.style.lineHeight();
        }
        return this.lines;
    };
    // returns the text contents of block
    Layout_BlockChar.prototype.textContents = function () {
        var out = '', i = 0, len = 0;
        for (var i = 0, len = this.chars.length; i < len; i++) {
            out += this.chars[i].letter();
        }
        return out;
    };
    Layout_BlockChar.prototype.serialize = function (tabIndex) {
        if (tabIndex === void 0) { tabIndex = 0; }
        var out = _super.prototype.serialize.call(this, tabIndex).split('\n');
        return out[0] + this.textContents() + '</text>';
    };
    Layout_BlockChar.prototype.computeWidths = function () {
        this.buildLines(this.innerWidth);
    };
    Layout_BlockChar.prototype.computeHeights = function (topPlacement, indent) {
        if (indent === void 0) { indent = 0; }
        this.offsetTop = this.innerTop = topPlacement;
        this.offsetHeight = this.innerHeight = 0;
        for (var i = 0, len = this.lines.length; i < len; i++) {
            topPlacement += this.lines[i].size[1];
            //console.log( this.tab( indent ) + 'added line height: ' + this.lines[i].size[1], this.lines[i] );
            this.offsetHeight += this.lines[i].size[1];
            this.innerHeight = this.offsetHeight;
        }
        return topPlacement;
    };
    Layout_BlockChar.prototype.paint = function (ctx, scrollLeft, scrollTop, viewport) {
        if (!this.isPaintable(viewport)) {
            return;
        }
        ctx.fillStyle = '#ddd';
        ctx.fillRect(this.offsetLeft - scrollLeft, this.offsetTop - scrollTop, this.offsetWidth, this.offsetHeight);
        var i = 0, len = 0, node = this.ownerNode(), align = node.style.textAlign(), j = 0, n = 0, k = 0, l = 0, wordGap = (align == 'justified'), lineHeight = node.style.lineHeight(), lineDiff = 0, startY = this.offsetTop - scrollTop, startX = this.offsetLeft, currentNode = null, isUnderline = false, underlineWidth = 0.00, size, valign = 'normal', valignShift = 0;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        for (i = 0, len = this.lines.length; i < len; i++) {
            lineDiff = this.lines[i].size[1] / lineHeight;
            switch (align) {
                case 'right':
                    startX = this.offsetLeft + this.offsetWidth - (this.lines[i].size[0]);
                    break;
                case 'center':
                    startX = this.offsetLeft + (this.offsetWidth / 2) - (this.lines[i].size[0] / 2);
                    break;
                case 'justified':
                    startX = this.offsetLeft;
                    break;
                default:
                    startX = this.offsetLeft;
                    break;
            }
            startX -= scrollLeft;
            for (j = 0, n = this.lines[i].words.length; j < n; j++) {
                for (k = 0, l = this.lines[i].words[j].characters.length; k < l; k++) {
                    if (currentNode != this.lines[i].words[j].characters[k].node.parentNode) {
                        currentNode = this.lines[i].words[j].characters[k].node.parentNode;
                        ctx.font = currentNode.style.fontStyleText();
                        ctx.fillStyle = currentNode.style.color();
                        isUnderline = currentNode.style.textDecoration() == 'underline';
                        valign = currentNode.style.verticalAlign();
                        if (isUnderline) {
                            underlineWidth = ~~(currentNode.style.fontSize() * .15);
                            if (underlineWidth < 1) {
                                underlineWidth = 1;
                            }
                        }
                        switch (valign) {
                            case 'super':
                                valignShift = this.lines[i].size[1] * -.2;
                                break;
                            case 'sub':
                                valignShift = this.lines[i].size[1] * .1;
                                break;
                            default:
                                valignShift = 0;
                                break;
                        }
                    }
                    size = this.lines[i].words[j].characters[k].computeSize();
                    ctx.fillText(this.lines[i].words[j].characters[k].letter(), startX, startY + lineDiff + valignShift);
                    if (isUnderline) {
                        ctx.fillRect(startX, ~~((startY + lineDiff) + 2 + valignShift), size[0], underlineWidth);
                    }
                    startX += size[0];
                }
                startX += (wordGap ? this.lines[i].wordGap : 0);
            }
            startY += this.lines[i].size[1];
        }
    };
    Layout_BlockChar.prototype.getTargetAtXY = function (point, boundsChecking) {
        if (boundsChecking === void 0) { boundsChecking = true; }
        var target = _super.prototype.getTargetAtXY.call(this, point, false), i = 0, len = 0, j = 0, n = 0, line = 0, lines = 0, bestLine = null, bestLineIndex = 0, startX = 0, startY = 0, bestCharLineIndex = 0, bestCharTargetIndex = 0, bestNode, align, wordGap, size, breakFor = false;
        if (target !== null) {
            for (line = 0, lines = this.lines.length; line < lines; line++) {
                if (target.relative.y >= startY) {
                    bestLine = this.lines[line];
                    bestLineIndex = line;
                }
                else {
                    break;
                }
                startY += this.lines[line].size[1];
            }
            if (bestLine !== null) {
                align = target.target.style.textAlign();
                wordGap = align == 'justified';
                switch (align) {
                    case 'right':
                        startX = this.offsetLeft + this.offsetWidth - bestLine.size[0];
                        break;
                    case 'center':
                        startX = this.offsetLeft + (this.offsetWidth / 2) - (bestLine.size[0] / 2);
                        break;
                    default:
                        startX = this.offsetLeft;
                        break;
                }
                for (i = 0, len = bestLine.words.length; i < len; i++) {
                    for (j = 0, n = bestLine.words[i].characters.length; j < n; j++) {
                        size = bestLine.words[i].characters[j].computeSize();
                        if (wordGap && j == n - 1) {
                            size[0] += bestLine.wordGap;
                        }
                        if (((size[0] / 2) + startX < target.absolute.x)) {
                            bestCharLineIndex++;
                            bestNode = bestLine.words[i].characters[j].node;
                            bestCharTargetIndex = bestLine.words[i].characters[j].index + 1;
                            startX += size[0];
                        }
                        else {
                            bestNode = bestLine.words[i].characters[j].node;
                            bestCharTargetIndex = bestLine.words[i].characters[j].index;
                            breakFor = true;
                            break;
                        }
                    }
                    if (breakFor)
                        break;
                }
                target.line = bestLineIndex;
                target.target = bestNode;
                target.charLineIndex = bestCharLineIndex;
                target.charTargetIndex = bestCharTargetIndex;
                return target;
            }
            else
                return target;
        }
        else
            return null;
    };
    return Layout_BlockChar;
})(Layout);
var Layout_Block_Table = (function (_super) {
    __extends(Layout_Block_Table, _super);
    function Layout_Block_Table(element, matrix) {
        _super.call(this, element);
        this.matrix = matrix;
        this.children = null;
        this.layoutType = 'table';
        this.node = element;
        this.children = [];
        for (var i = 0, len = this.matrix.cellsArray.length; i < len; i++) {
            this.children.push(this.matrix.cellsArray[i].createLayout(this));
        }
    }
    Layout_Block_Table.prototype.computeWidths = function () {
        var i = 0, len = 0, table = this.node, node, totalCellsInnerWidths = 0, borderWidth = table.border() || 1, cellSpacing = table.cellSpacing(), cellPadding = table.cellPadding();
        this.offsetLeft += table.style.marginLeft();
        this.innerLeft = this.offsetLeft + table.style.borderWidth() + table.style.paddingLeft();
        this.matrix.xEdges.resetSizes();
        for (i = 0, len = this.matrix.cellsArray.length; i < len; i++) {
            if (this.matrix.cellsArray[i].style._width.isSet)
                this.matrix.xEdges.setSize(this.matrix.cellsArray[i].edgeLeft.index, this.matrix.cellsArray[i].edgeRight.index, this.matrix.cellsArray[i].style.width());
        }
        this.matrix.xEdges.applySizes();
        totalCellsInnerWidths = this.innerWidth - ((this.matrix.cols + 1) * cellSpacing) - (this.matrix.cols * 2 * (cellPadding + borderWidth));
        //console.warn( 'totalCellsInnerWidths: ' + this.innerWidth + '- (( ' + this.matrix.cols + ' + 1 ) * ' + cellSpacing + ') - ( ' + this.matrix.cols + ' * 2 * (' + cellPadding + '+' + borderWidth + ') ) = ' + totalCellsInnerWidths );
        // resize the colums in order to fit this layout
        this.matrix.xEdges.resizeToFit(totalCellsInnerWidths, borderWidth, cellPadding, cellSpacing, this.innerLeft);
        for (var i = 0, len = this.children.length; i < len; i++) {
            node = (this.children[i].node);
            this.children[i].offsetLeft = node.edgeLeft.offsetIndexStart;
            this.children[i].offsetWidth = node.edgeRight.offsetIndexEnd - node.edgeLeft.offsetIndexStart;
            this.children[i].innerWidth = this.children[i].offsetWidth - 2 * cellPadding - 2 * borderWidth;
            this.children[i].innerLeft = this.children[i].offsetLeft + cellPadding + borderWidth;
            this.children[i].computeWidths();
        }
    };
    Layout_Block_Table.prototype.computeHeights = function (topPlacement, indent) {
        if (indent === void 0) { indent = 0; }
        var i = 0, len = 0, table = this.node, borderWidth = table.border() || 1, cellSpacing = table.cellSpacing(), cellPadding = table.cellPadding();
        topPlacement += table.style.marginTop();
        this.offsetTop = topPlacement;
        topPlacement += (this.offsetHeight = (table.style.borderWidth() + this.node.style.paddingTop()));
        this.innerTop = topPlacement;
        this.innerHeight = 0;
        /* Compute the heights for all the sub-layouts, then hang them on
           top position.
           Set the line heights of the rows of the matrix
         */
        this.matrix.yEdges.resetSizes();
        for (i = 0, len = this.children.length; i < len; i++) {
            this.children[i].computeHeights(topPlacement);
            this.matrix.yEdges.setSize(this.children[i].node.edgeTop.index, this.children[i].node.edgeBottom.index, this.children[i].offsetHeight - 2 * cellPadding);
        }
        this.matrix.yEdges.applySizes();
        this.matrix.yEdges.resizeToFit(null, borderWidth, cellPadding, cellSpacing, -cellSpacing);
        for (i = 0, len = this.children.length; i < len; i++) {
            this.children[i].increaseYBy(this.children[i].node.edgeTop.offsetIndexStart);
            this.children[i].increaseHeightBy((this.children[i].node.edgeBottom.offsetIndexEnd - this.children[i].node.edgeTop.offsetIndexStart) - this.children[i].offsetHeight);
        }
        this.innerHeight = this.matrix.yEdges.edges[this.matrix.yEdges.edges.length - 1].offsetIndexEnd;
        topPlacement += this.innerHeight;
        this.offsetHeight += this.innerHeight;
        this.offsetHeight += (this.node.style.paddingBottom() + table.style.borderWidth() + 2 * cellSpacing);
        topPlacement += (this.node.style.paddingBottom() + table.style.borderWidth() + 2 * cellSpacing);
        topPlacement += this.node.style.marginBottom();
        return topPlacement;
    };
    return Layout_Block_Table;
})(Layout_Block);
var Viewport = (function (_super) {
    __extends(Viewport, _super);
    function Viewport(_width, _height) {
        if (_width === void 0) { _width = null; }
        if (_height === void 0) { _height = null; }
        _super.call(this);
        this._width = 500;
        this._height = 500;
        this._scrollbarSize = 10;
        this._scrollTop = 0;
        this._scrollLeft = 0;
        this.canvas = document.createElement('canvas');
        this.context = null;
        this.document = null;
        this.painter = null;
        this.selection = null;
        this.context = this.canvas.getContext('2d');
        this.canvas.tabIndex = 0;
        (function (me) {
            me.painter = new Throttler(function () {
                if (me.document)
                    me.document.repaint();
                me.paintScrollbars();
            }, 10);
            me.canvas.addEventListener('mousewheel', function (DOMEvent) {
                me.scrollTop(me.scrollTop() + (DOMEvent.wheelDelta < 0 ? 12 : -12));
                DOMEvent.preventDefault();
                DOMEvent.stopPropagation();
            }, true);
            me.canvas.addEventListener('mousedown', function (DOMEvent) {
                me.onmousedown(DOMEvent);
            }, true);
            me.canvas.addEventListener('mousemove', function (DOMEvent) {
                me.onmousemove(DOMEvent);
            }, true);
            me.canvas.addEventListener('mouseup', function (DOMEvent) {
                me.onmousemove(DOMEvent);
            }, true);
            me.canvas.addEventListener('click', function (DOMEvent) {
                me.onmouseclick(DOMEvent);
            }, true);
            me.canvas.addEventListener('dblclick', function (DOMEvent) {
                me.onmousedblclick(DOMEvent);
            }, true);
        })(this);
        this.document = new HTML_Body(this);
        this.selection = new DocSelection(this);
        this.width(_width === null ? this._width : _width);
        this.height(_height === null ? this._height : _height);
        (function (me) {
            /*
            me.document.on( 'relayout', function() {
                console.log( 'relayout request!' );
            } );
            me.document.on( 'repaint', function() {
                console.log( 'repaint request!' );
            });
            */
        })(this);
    }
    Viewport.prototype.width = function (newWidth) {
        if (newWidth === void 0) { newWidth = null; }
        if (newWidth === null) {
            //getter
            return this._width;
        }
        else {
            this._width = newWidth < 0 ? 0 : newWidth;
            this.canvas.width = this._width;
            this.document.requestRelayout();
            return this._width;
        }
    };
    Viewport.prototype.height = function (newHeight) {
        if (newHeight === void 0) { newHeight = null; }
        if (newHeight === null) {
            //getter
            return this._height;
        }
        else {
            this._height = newHeight < 0 ? 0 : newHeight;
            this.canvas.height = this._height;
            this.document.requestRelayout();
            return this._height;
        }
    };
    Viewport.prototype.scrollTop = function (value) {
        if (value === void 0) { value = null; }
        if (value === null) {
            //getter
            return this._scrollTop;
        }
        else {
            if (this.document && this.document._layout) {
                if ((value + this._height - this._scrollbarSize) > (this.document._layout.offsetHeight + this.document._layout.offsetTop)) {
                    value = this.document._layout.offsetHeight + this.document._layout.offsetTop - this._height + this._scrollbarSize;
                }
                if (value < 0) {
                    value = 0;
                }
                value = Math.round(value);
                if (value != this._scrollTop) {
                    this._scrollTop = value;
                    this.document.requestRepaint();
                }
            }
            return this._scrollTop;
        }
    };
    Viewport.prototype.scrollLeft = function (value) {
        if (value === void 0) { value = null; }
        if (value === null) {
            return this._scrollLeft;
        }
        else {
            throw "not implemented scrollLeft";
        }
    };
    // paints the scrollbars on the canvas context
    Viewport.prototype.paintScrollbars = function () {
        if (!this.document) {
            return;
        }
        var physScrollHeight = 0, physScrollWidth = 0, docWidth = 0, docHeight = this.document._layout.offsetHeight + this.document._layout.offsetTop, physScrollXShoe = 0, physScrollYShoe = 0, yScale = 0;
        this.context.fillStyle = '#ddd';
        this.context.fillRect(physScrollWidth = (this._width - this._scrollbarSize), 0, this._scrollbarSize, this._height - this._scrollbarSize + 1);
        this.context.fillRect(0, physScrollHeight = (this._height - this._scrollbarSize), this._width - this._scrollbarSize, this._scrollbarSize);
        docWidth = physScrollWidth;
        physScrollYShoe = yScale = physScrollHeight / docHeight;
        physScrollYShoe = physScrollYShoe <= 1 ? physScrollHeight * physScrollYShoe : 0;
        if (physScrollYShoe != 0) {
            physScrollYShoe = ~~physScrollYShoe;
        }
        this.context.fillStyle = "#888";
        if (physScrollYShoe) {
            this.context.fillRect(this._width - this._scrollbarSize, (this._scrollTop * yScale), this._scrollbarSize, physScrollYShoe);
        }
    };
    Viewport.prototype.value = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this.document.innerHTML();
        }
        else {
            this.document.innerHTML(v);
        }
    };
    Viewport.prototype.translateMouseEventXY = function (DOMEvent) {
        return {
            "x": DOMEvent.offsetX + this._scrollLeft,
            "y": DOMEvent.offsetY + this._scrollTop
        };
    };
    Viewport.prototype.getTargetAtXY = function (point) {
        if (this.document && this.document._layout) {
            return this.document._layout.getTargetAtXY(point);
        }
        else
            return null;
    };
    Viewport.prototype.onmousedown = function (DOMEvent) {
        console.log(this.getTargetAtXY(this.translateMouseEventXY(DOMEvent)));
    };
    Viewport.prototype.onmousemove = function (DOMEvent) {
    };
    Viewport.prototype.onmouseup = function (DOMEvent) {
    };
    Viewport.prototype.onmouseclick = function (DOMEvent) {
    };
    Viewport.prototype.onmousedblclick = function (DOMEvent) {
    };
    return Viewport;
})(Events);
var DocSelection = (function (_super) {
    __extends(DocSelection, _super);
    function DocSelection(viewport) {
        _super.call(this);
        this.viewport = viewport;
    }
    return DocSelection;
})(Events);
/// <reference path="Types.ts" />
/// <reference path="Events.ts" />
/// <reference path="Throttler.ts" />
/// <reference path="TNode.ts" />
/// <reference path="./TNode/Text.ts" />
/// <reference path="./TNode/Element.ts" />
/// <reference path="./TNode/Collection.ts" />
/// <reference path="./HTMLParser.ts" />
/// <reference path="./HTML/Body.ts" />
/// <reference path="./HTML/Paragraph.ts" />
/// <reference path="./HTML/Image.ts" />
/// <reference path="./HTML/Heading1.ts" />
/// <reference path="./HTML/Heading2.ts" />
/// <reference path="./HTML/Heading3.ts" />
/// <reference path="./HTML/Heading4.ts" />
/// <reference path="./HTML/Heading5.ts" />
/// <reference path="./HTML/Bold.ts" />
/// <reference path="./HTML/Italic.ts" />
/// <reference path="./HTML/Underline.ts" />
/// <reference path="./HTML/Anchor.ts" />
/// <reference path="./HTML/BulletedList.ts" />
/// <reference path="./HTML/OrderedList.ts" />
/// <reference path="./HTML/ListItem.ts" />
/// <reference path="./HTML/Superscript.ts" />
/// <reference path="./HTML/Subscript.ts" />
/// <reference path="./HTML/Table.ts" />
/// <reference path="./HTML/Table/Matrix.ts" />
/// <reference path="./HTML/Table/EdgesCollection.ts" />
/// <reference path="./HTML/Table/Edge.ts" />
/// <reference path="./HTML/TableRow.ts" />
/// <reference path="./HTML/TableCell.ts" />
/// <reference path="TStyle.ts" />
/// <reference path="./TStyle/TableCell.ts" />
/// <reference path="./TStyle/Property.ts" />
/// <reference path="./TStyle/PropertyInheritable.ts" />
/// <reference path="./TStyle/Dimension.ts" />
/// <reference path="./TStyle/String.ts" />
/// <reference path="./TStyle/Color.ts" />
/// <reference path="Character.ts" />
/// <reference path="./Character/Metrics.ts" />
/// <reference path="./Character/Line.ts" />
/// <reference path="./Character/Word.ts" />
/// <reference path="Layout.ts" />
/// <reference path="Layout/Horizontal.ts" />
/// <reference path="Layout/Vertical.ts" />
/// <reference path="Layout/Block.ts" />
/// <reference path="Layout/BlockChar.ts" />
/// <reference path="Layout/Block/Table.ts" />
/// <reference path="Viewport.ts" />
/// <reference path="DocSelection.ts" />
var viewport = new Viewport(), body = viewport.document, niceHTML = [
    '<h1 align="center">He<u>adi</u>ng 1</h1>',
    '<p align="justified">The element above this paragraph is a <b><u>Heading 1</u><sup>citat<u>io</u>n needed</sup></b>. The element above this paragraph is a <b><u>Heading 1</u><sup>citat<u>io</u>n needed</sup></b>. alksdjlak jslakjslkajsldasd asldjalsdkjalskdja</p>',
    '<h2>Heading 2</h2>',
    '<p>The element above this paragraph is a <b><i>Heading 2</i><sub>citation <i>need</i>ed</sub></b>.</p>',
    '<h3>Heading 3</h3>',
    '<h4>Heading 4</h4>',
    '<h5>Heading 5</h5>',
    '<p>The elements above this paragraph are representing a <b>H3</b>, <b>H4</b>, and a <b>H5</b>. </p>',
    '<h1>Table handling</h1>',
    '<table border=1 cellspacing=0 bordercolor=black cellpadding=5 > this should be ignored',
    '<tr>, this also,',
    '<td width="33%" rowspan="2">Cell 1 is the best cell in the world</td> and also this',
    '<td>Cell 2 is also good, but not the best. Because it\'s the second</td>',
    '</tr>',
    '<tr>',
    '<td>This is the last cell of the table</td>',
    '</tr>',
    '<tr>',
    '<td colspan=2>This is the last cell of the table</td>',
    '</tr>',
    '<tr>',
    '<td colspan=2>end<img align="right" src="./_assets/pic1.jpg" width="100" /></td>',
    '</tr>',
    '</table>',
    '<h1>Anchoring</h1>',
    '<p>This text contains an anchor to <a href="http://www.google.com">Google</a>. Anchoring painting should be rendered on the word Google.</p>',
    '<h1>Lists</h1>',
    '<p>Bulleted...</p>',
    '<ul>',
    '<li>Item 1</li>',
    '<li>Item 2</li>',
    '<li>And this is the third element inside the bulleted <b>UL</b> list. The items should be rendered with discs in their left.</li>',
    '</ul>',
    '<p>Ordered...</p>',
    '<ol>',
    '<li>Item 1</li>',
    '<li>Item 2</li>',
    '<li>Item 3</li>',
    '</ol>',
    '<h2>Image handling</h2>',
    '<p>This is a <img align="right" src="./_assets/pic1.jpg" width="100" /> very nice paragraph at the end of the document. Hope you enjoyed it.</p>',
    '<p>This is a <img align="left" src="./_assets/pic1.jpg" width="100" /> very nice paragraph at the end of the document. Hope you enjoyed it.</p>',
    '<p>This is a <img align="left" src="./_assets/pic1.jpg" width="100" /> very nice paragraph at <img align="right" src="./_assets/pic1.jpg" width="100" /> the end of the document. Hope you enjoyed it.</p>',
    '<p>This is a very nice paragraph at the end of the document. Hope you enjoyed it.</p>',
    '<p>This is a very nice paragraph at the end of the document. Hope you enjoyed it.</p>',
    '<p>This is a very nice paragraph at the end of the document. Hope you enjoyed it.</p>'
].join('');
body.innerHTML(niceHTML);
window.addEventListener('load', function () {
    document.body.appendChild(viewport.canvas);
    viewport.canvas.focus();
});
