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
    function TNode_Element() {
        _super.call(this);
        this.childNodes = [];
        this.nodeType = 2 /* ELEMENT */;
        this.nodeName = '';
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
    TNode_Element.prototype.evaluateLayout = function (left, center, right, argIndex) {
        if (argIndex === void 0) { argIndex = 0; }
        var i = 0, len = this.childNodes.length, oldArgIndex = argIndex, currentArgIndex = argIndex, j = 0, n = 0, layoutType = '', lblock, lchar;
        for (i = 0, len = this.childNodes.length; i < len; i++) {
            if (this.childNodes[i].nodeType == 1 /* TEXT */) {
                currentArgIndex = 1;
                layoutType = 'Layout_BlockChar';
            }
            else {
                switch (true) {
                    case this.childNodes[i].style.display() == 'block' && ['left', 'right'].indexOf(this.childNodes[i].style.float()) == -1:
                        layoutType = 'Layout_Block';
                        currentArgIndex = 1;
                        break;
                    case this.childNodes[i].style.float() == 'left':
                        layoutType = 'Layout_Block';
                        currentArgIndex = 0;
                        break;
                    case this.childNodes[i].style.float() == 'right':
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
                    if (this.childNodes[i].nodeType == 1 /* TEXT */) {
                        lchar.addTextNode(this.childNodes[i]);
                    }
                    else {
                        currentArgIndex = this.childNodes[i].evaluateLayout(left, center, right, currentArgIndex);
                    }
                    break;
                case 'Layout_Block':
                    lblock = new Layout_Block(this.childNodes[i]);
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
            throw "node.innerHTML: Setter not implemented yet!";
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
    return TNode_Element;
})(TNode);
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
            default:
                node = new TNode_Element();
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
        this._layout.paint(this.viewport.context);
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
        this._layout.offsetWidth = this.viewport.width();
        this._layout.innerWidth = this._layout.offsetWidth - this.style.paddingLeft() - this.style.paddingRight() - (this.style.borderWidth() * 2);
        this._layout.innerTop = this._layout.offsetTop + this.style.paddingTop() + this.style.borderWidth();
        this._layout.innerLeft = this._layout.offsetLeft + this.style.paddingLeft() + this.style.borderWidth();
        this.style._width.value = String(this._layout.offsetWidth);
        this.style._width.isSet = true;
        this._layout.computeWidths();
        this._layout.computeHeights(this.style.marginTop());
        console.log('relayout completed in ' + (Date.now() - now) + ' ms.');
        console.log(this._layout.serialize());
        this._needRelayout = false;
    };
    return HTML_Body;
})(TNode_Element);
var HTML_Paragraph = (function (_super) {
    __extends(HTML_Paragraph, _super);
    function HTML_Paragraph() {
        _super.call(this);
        this.nodeName = 'p';
        this.style.display('block');
        this.style.padding('25');
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
    return HTML_Image;
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
    return TStyle;
})();
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
        this.wordGap = this.words.length > 2 ? ((this.maxWidth - this.size[0]) / (this.words.length - 1)) : 0;
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
    Layout.prototype.paint = function (ctx) {
        if (this.node) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = .5;
            ctx.rect(~~this.offsetLeft + .5, ~~this.offsetTop + .5, ~~this.offsetWidth - 1, ~~this.offsetHeight);
            ctx.stroke();
            ctx.fillStyle = 'blue';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'hanging';
            ctx.fillText(this.node.nodeName + ' ' + this.layoutType[0], this.offsetLeft + 1, this.offsetTop + 1);
        }
        if (this.children) {
            for (var i = 0, len = this.children.length; i < len; i++) {
                this.children[i].paint(ctx);
            }
        }
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
    Layout_Horizontal.prototype.computeWidths = function () {
        /* on horizontal layouts, we set the widths for the layouts which have nodes.
           the rest of the widths is computed as the average undefined widths */
        var widthLeft = this.innerWidth, computeAfter = [], leftPosition = this.innerLeft, i = 0, len = 0, averageWidth = 0, sumWidths = 0;
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
                computeAfter.push(this.children[i]);
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
        var topPlacementBegin = 0, contentHeight = 0, topPlacementMax = 0, i = 0, len;
        if (this.node) {
            topPlacement += this.node.style.marginTop();
            this.offsetTop = topPlacement;
            this.innerTop = this.offsetTop + this.node.style.borderWidth() + this.node.style.paddingTop();
            topPlacement += this.node.style.paddingTop();
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
        this.offsetHeight = this.innerHeight;
        if (this.node) {
            topPlacement += (this.node.style.paddingBottom() + this.node.style.borderWidth() + this.node.style.marginBottom());
            this.offsetHeight += this.innerHeight + (this.node.style.paddingTop() + this.node.style.paddingBottom()) + (this.node.style.borderWidth() * 2);
        }
        console.log(this.tab(indent) + 'layout horizontal: [' + topPlacementBegin + ',' + topPlacement + ']');
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
        var contentHeight = 0, i = 0, len = 0, addHeight = 0;
        if (this.node) {
            topPlacement += this.node.style.marginTop();
            this.offsetTop = topPlacement;
            this.innerTop = this.offsetTop + this.node.style.borderWidth() + this.node.style.paddingTop();
            console.log('add ' + (this.node.style.paddingTop() + this.node.style.borderWidth()) + 'padding...');
            topPlacement += this.node.style.paddingTop() + this.node.style.borderWidth();
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
                console.log(this.tab(indent) + 'layout vertical (' + (this.node ? this.node.nodeName : 'void') + '): topplacement become: ' + topPlacement + ', due to added height: ' + addHeight);
            }
        }
        this.innerHeight = contentHeight;
        this.offsetHeight = this.innerHeight;
        if (this.node) {
            this.offsetHeight += this.node.style.paddingBottom() + this.node.style.borderWidth();
            topPlacement += this.node.style.paddingBottom() + this.node.style.borderWidth() + this.node.style.marginBottom();
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
            console.log('computeWidths of a block');
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
        console.log(this.tab(indent) + 'blockheight (' + this.node.nodeName + '): ' + contentHeight);
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
        console.log(this.tab(indent) + 'layoutblock: [' + topPlacementBegin + ',' + topPlacement + ']');
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
        var contents = this.textContents(), contentsWithWords = contents.replace(/([\S]+)([\s]+)?/g, '$1$2|'), i = 0, len = contentsWithWords.length, j = 0, n = 0, word = [], words = [], line;
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
        var topPlacementBegin = topPlacement;
        this.offsetTop = this.innerTop = topPlacement;
        this.offsetHeight = this.innerHeight = 0;
        for (var i = 0, len = this.lines.length; i < len; i++) {
            topPlacement += this.lines[i].size[1];
            console.log(this.tab(indent) + 'added line height: ' + this.lines[i].size[1], this.lines[i]);
            this.offsetHeight += this.lines[i].size[1];
            this.innerHeight = this.offsetHeight;
        }
        console.log(this.tab(indent) + 'layout blocktext [' + topPlacementBegin + ',' + topPlacement + ']');
        return topPlacement;
    };
    return Layout_BlockChar;
})(Layout);
var Viewport = (function (_super) {
    __extends(Viewport, _super);
    function Viewport(_width, _height) {
        if (_width === void 0) { _width = null; }
        if (_height === void 0) { _height = null; }
        _super.call(this);
        this._width = 500;
        this._height = 500;
        this.canvas = document.createElement('canvas');
        this.context = null;
        this.document = null;
        this.painter = null;
        this.context = this.canvas.getContext('2d');
        this.canvas.tabIndex = 0;
        (function (me) {
            me.painter = new Throttler(function () {
                if (me.document)
                    me.document.repaint();
            }, 10);
        })(this);
        this.document = new HTML_Body(this);
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
    return Viewport;
})(Events);
/// <reference path="Types.ts" />
/// <reference path="Events.ts" />
/// <reference path="Throttler.ts" />
/// <reference path="TNode.ts" />
/// <reference path="./TNode/Text.ts" />
/// <reference path="./TNode/Element.ts" />
/// <reference path="./HTML/Body.ts" />
/// <reference path="./HTML/Paragraph.ts" />
/// <reference path="./HTML/Image.ts" />
/// <reference path="TStyle.ts" />
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
/// <reference path="Viewport.ts" />
var viewport = new Viewport(), body = viewport.document, p, img, img2, img3;
body.appendChild(body.createTextNode('text before p'));
body.appendChild(p = body.createElement('p'));
body.appendChild(body.createTextNode('text after p'));
p.appendChild(body.createTextNode('The quick brown fox jumps over the lazy dog.'));
p.appendChild(img = body.createElement('img', '_assets/pic1.jpg'));
p.appendChild(body.createTextNode('The quick brown fox jumps over the lazy dog.'));
p.appendChild(img2 = body.createElement('img', '_assets/pic1.jpg'));
p.appendChild(img3 = body.createElement('img', '_assets/pic1.jpg'));
img.style.float('left');
img2.style.float('right');
img3.style.float('right');
img.width(40);
img2.width(20);
img3.width(50);
window.addEventListener('load', function () {
    document.body.appendChild(viewport.canvas);
    viewport.canvas.focus();
});
