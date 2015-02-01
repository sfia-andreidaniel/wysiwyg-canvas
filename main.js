var TNode_Type;
(function (TNode_Type) {
    TNode_Type[TNode_Type["UNKNOWN"] = 0] = "UNKNOWN";
    TNode_Type[TNode_Type["TEXT"] = 1] = "TEXT";
    TNode_Type[TNode_Type["ELEMENT"] = 2] = "ELEMENT";
})(TNode_Type || (TNode_Type = {}));
var FragmentItem;
(function (FragmentItem) {
    FragmentItem[FragmentItem["NODE_START"] = 0] = "NODE_START";
    FragmentItem[FragmentItem["NODE_END"] = 1] = "NODE_END";
    FragmentItem[FragmentItem["EOL"] = 2] = "EOL";
    FragmentItem[FragmentItem["CHARACTER"] = 3] = "CHARACTER";
    FragmentItem[FragmentItem["WHITE_SPACE"] = 4] = "WHITE_SPACE";
})(FragmentItem || (FragmentItem = {}));
// used in Fragment_Contextual_Item as type
var FragmentCItem;
(function (FragmentCItem) {
    FragmentCItem[FragmentCItem["NODE_START"] = 0] = "NODE_START";
    FragmentCItem[FragmentCItem["NODE_END"] = 1] = "NODE_END";
    FragmentCItem[FragmentCItem["TEXT"] = 2] = "TEXT";
})(FragmentCItem || (FragmentCItem = {}));
var TRange_Type;
(function (TRange_Type) {
    TRange_Type[TRange_Type["TEXT"] = 0] = "TEXT";
    TRange_Type[TRange_Type["ELEMENT"] = 1] = "ELEMENT";
})(TRange_Type || (TRange_Type = {}));
var FragmentPos;
(function (FragmentPos) {
    FragmentPos[FragmentPos["DOC_BEGIN"] = 0] = "DOC_BEGIN";
    FragmentPos[FragmentPos["DOC_END"] = 1] = "DOC_END";
})(FragmentPos || (FragmentPos = {}));
var KbEventSource;
(function (KbEventSource) {
    KbEventSource[KbEventSource["CANVAS"] = 0] = "CANVAS";
    KbEventSource[KbEventSource["PASTE_ADAPTER"] = 1] = "PASTE_ADAPTER";
})(KbEventSource || (KbEventSource = {}));
var CaretPos;
(function (CaretPos) {
    CaretPos[CaretPos["LINE_HORIZONTAL"] = 0] = "LINE_HORIZONTAL";
    CaretPos[CaretPos["LINE_VERTICAL"] = 1] = "LINE_VERTICAL";
    CaretPos[CaretPos["CHARACTER"] = 2] = "CHARACTER";
    CaretPos[CaretPos["WORD"] = 3] = "WORD";
    CaretPos[CaretPos["VIEWPORT"] = 4] = "VIEWPORT";
})(CaretPos || (CaretPos = {}));
var EditorCommand;
(function (EditorCommand) {
    EditorCommand[EditorCommand["INSERT_TEXT"] = 0] = "INSERT_TEXT";
    EditorCommand[EditorCommand["DELETE_TEXT"] = 1] = "DELETE_TEXT";
    EditorCommand[EditorCommand["NEW_LINE"] = 2] = "NEW_LINE";
    EditorCommand[EditorCommand["MOVE"] = 3] = "MOVE";
    EditorCommand[EditorCommand["BOLD"] = 4] = "BOLD";
    EditorCommand[EditorCommand["ITALIC"] = 5] = "ITALIC";
    EditorCommand[EditorCommand["UNDERLINE"] = 6] = "UNDERLINE";
    EditorCommand[EditorCommand["ALIGN"] = 7] = "ALIGN";
    EditorCommand[EditorCommand["COPY"] = 8] = "COPY";
    EditorCommand[EditorCommand["CUT"] = 9] = "CUT";
    EditorCommand[EditorCommand["PASTE"] = 10] = "PASTE";
    EditorCommand[EditorCommand["INDENT"] = 11] = "INDENT";
    EditorCommand[EditorCommand["UNINDENT"] = 12] = "UNINDENT";
    EditorCommand[EditorCommand["VALIGN"] = 13] = "VALIGN";
    EditorCommand[EditorCommand["FONT"] = 14] = "FONT";
    EditorCommand[EditorCommand["COLOR"] = 15] = "COLOR";
    EditorCommand[EditorCommand["BGCOLOR"] = 16] = "BGCOLOR";
    EditorCommand[EditorCommand["SIZE"] = 17] = "SIZE";
    EditorCommand[EditorCommand["BLOCK_LEVEL"] = 18] = "BLOCK_LEVEL";
    EditorCommand[EditorCommand["LIST"] = 19] = "LIST"; // sets the list level of the elements ( UL or LI )
})(EditorCommand || (EditorCommand = {}));
var TNewLinePolicy;
(function (TNewLinePolicy) {
    TNewLinePolicy[TNewLinePolicy["BR"] = 0] = "BR";
    TNewLinePolicy[TNewLinePolicy["SURGERY"] = 1] = "SURGERY";
})(TNewLinePolicy || (TNewLinePolicy = {}));
;
var TSurgeryHint;
(function (TSurgeryHint) {
    TSurgeryHint[TSurgeryHint["NONE"] = 0] = "NONE";
    TSurgeryHint[TSurgeryHint["LEFT"] = 1] = "LEFT";
    TSurgeryHint[TSurgeryHint["RIGHT"] = 2] = "RIGHT";
})(TSurgeryHint || (TSurgeryHint = {}));
var TListBreakResult;
(function (TListBreakResult) {
    TListBreakResult[TListBreakResult["NONE_BEFORE"] = 0] = "NONE_BEFORE";
    TListBreakResult[TListBreakResult["NONE_AFTER"] = 1] = "NONE_AFTER";
    TListBreakResult[TListBreakResult["AFTER"] = 2] = "AFTER";
    TListBreakResult[TListBreakResult["BEFORE"] = 3] = "BEFORE"; // created a list before this list
})(TListBreakResult || (TListBreakResult = {}));
var CaretLockDirection;
(function (CaretLockDirection) {
    CaretLockDirection[CaretLockDirection["FROM_BEGINNING_OF_DOCUMENT"] = 0] = "FROM_BEGINNING_OF_DOCUMENT";
    CaretLockDirection[CaretLockDirection["FROM_ENDING_OF_DOCUMENT"] = 1] = "FROM_ENDING_OF_DOCUMENT";
})(CaretLockDirection || (CaretLockDirection = {}));
var Events = (function () {
    function Events() {
        this.$EVENTS_ENABLED = true;
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
        if (this.$EVENTS_ENABLED) {
            if (this.$EVENTS_QUEUE && this.$EVENTS_QUEUE[eventName]) {
                for (var i = 0, len = this.$EVENTS_QUEUE[eventName].length; i < len; i++) {
                    this.$EVENTS_QUEUE[eventName][i].apply(this, args);
                }
            }
        }
    };
    // globally enables or disables all events fired.
    Events.prototype.setEventingState = function (enabled) {
        this.$EVENTS_ENABLED = !!enabled;
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
/* This class handles all the utility for dom working */
var DOM = (function () {
    function DOM() {
    }
    DOM.hasClass = function (DOMElement, className) {
        if (!className) {
            return false;
        }
        else {
            className = String(className);
        }
        var classes = String(DOMElement['className'] || '').split(/[\s]+/g), i = 0, len = classes.length;
        for (i = 0; i < len; i++) {
            if (classes[i] == className) {
                return true;
            }
        }
        return false;
    };
    DOM.addClass = function (DOMElement, className) {
        if (!className) {
            return;
        }
        else {
            className = String(className);
        }
        var classes = String(DOMElement['className'] || '').split(/[\s]+/g), i = 0, len = classes.length;
        for (i = 0; i < len; i++) {
            if (classes[i] == className) {
                return;
            }
        }
        classes.push(className);
        DOMElement['className'] = classes.join(' ');
    };
    DOM.removeClass = function (DOMElement, className) {
        if (!className) {
            return;
        }
        else {
            className = String(className);
        }
        var classes = String(DOMElement['className'] || '').split(/[\s]+/g), i = 0, len = classes.length;
        for (i = 0; i < len; i++) {
            if (classes[i] == className) {
                classes.splice(i, 1);
                break;
            }
        }
        DOMElement['className'] = classes.join(' ');
    };
    return DOM;
})();
var Helper = (function () {
    function Helper() {
    }
    Helper.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!Helper.dev) {
            console.log.apply(console, args);
        }
    };
    Helper.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!Helper.dev) {
            console.warn.apply(console, args);
        }
    };
    Helper.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (!Helper.dev) {
            console.error.apply(console, args);
        }
    };
    /* Array helpers */
    Helper.reverse = function (arr) {
        if (Array.prototype.reverse) {
            return Array.prototype.reverse.call(arr);
        }
        else {
            var out = [], i = arr.length - 1;
            while (i >= 0) {
                out.push(arr[i--]);
            }
            return out;
        }
    };
    Helper.filter = function (arr, callback) {
        var out = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (callback(arr[i])) {
                out.push(arr[i]);
            }
        }
        return out;
    };
    // a modified version of array splice, only that the adding elements are passed into an array but not as
    // function arguments.
    Helper.spliceApply = function (thisArray, startIndex, removeLength, addNodes) {
        if (addNodes === void 0) { addNodes = []; }
        var apply = [startIndex, removeLength], i = 0, len = addNodes.length;
        for (i = 0; i < len; i++) {
            apply.push(addNodes[i]);
        }
        Array.prototype.splice.apply(thisArray, apply);
        return thisArray;
    };
    /* Logging */
    Helper.dev = false;
    return Helper;
})();
var TNode = (function (_super) {
    __extends(TNode, _super);
    function TNode() {
        _super.apply(this, arguments);
        this.parentNode = null;
        this.siblingIndex = 0;
        this.nodeType = 0 /* UNKNOWN */;
        this.documentElement = null;
        this.FRAGMENT_START = 0;
        this.FRAGMENT_END = 0;
    }
    // dettach the node from it's parent
    TNode.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
            this.parentNode = null;
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
    TNode.prototype.bakeIntoFragment = function () {
        throw "ABSTRACT";
    };
    TNode.prototype.ownerBlockElement = function () {
        throw "ABSTRACT";
    };
    TNode.prototype.elementsBeforeMyself = function (includingMe) {
        if (!this.parentNode) {
            throw "Node not attached!";
        }
        else {
            return this.parentNode.childNodes.slice(0, includingMe ? this.siblingIndex + 1 : this.siblingIndex);
        }
    };
    TNode.prototype.elementsAfterMyself = function (includingMe) {
        if (!this.parentNode) {
            throw "Node not attached!";
        }
        else {
            return this.parentNode.childNodes.slice(includingMe ? this.siblingIndex : this.siblingIndex + 1);
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
        // on building layout, the EOL_POS will be computed. this is needed on bakeIntoFragment method
        this.EOL_POS = null;
        this._text = String(textContents || '');
    }
    TNode_Text.prototype.textContents = function (c, appendFirst) {
        if (c === void 0) { c = null; }
        if (appendFirst === void 0) { appendFirst = false; }
        if (c === null) {
            return this._text;
        }
        else {
            if (appendFirst) {
                this._text = String(c || '') + this._text;
            }
            else {
                this._text = String(c || '');
            }
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
    TNode_Text.prototype.bakeIntoFragment = function () {
        if (this.documentElement) {
            this.FRAGMENT_START = this.documentElement.fragment.length();
            for (var i = 0, len = this._text.length; i < len; i++) {
                this.documentElement.fragment.add(TNode_Text.$FragmentTypes[this._text[i]] || 3 /* CHARACTER */);
                if (this.EOL_POS && this.EOL_POS[i]) {
                    this.documentElement.fragment.add(2 /* EOL */);
                }
            }
            this.FRAGMENT_END = this.documentElement.fragment.length() - 1;
        }
    };
    /* Fixed bug. */
    TNode_Text.prototype.textContentsFragment = function (indexStart, indexEnd) {
        var out = '', i = 0, len = 0, j = 0, eols = 0;
        j = this.FRAGMENT_START;
        for (i = 0, len = this._text.length; i < len; i++) {
            if (j >= indexStart && j <= indexEnd) {
                out += this._text[i];
            }
            if (this.EOL_POS && this.EOL_POS[i]) {
                j += 2;
            }
            else {
                j += 1;
            }
            if (j > indexEnd) {
                break;
            }
        }
        return out;
    };
    TNode_Text.prototype.deleteTextContentsBetweenFragmentPositions = function (indexStart, indexEnd) {
        var out = [], returnValue = 0;
        if (indexStart > this.FRAGMENT_START) {
            out.push(this.textContentsFragment(this.FRAGMENT_START, indexStart - 1));
            returnValue = out[0].length;
        }
        if (indexEnd < this.FRAGMENT_END) {
            out.push(this.textContentsFragment(indexEnd + 1, this.FRAGMENT_END));
        }
        this.textContents(out.join(''));
        return returnValue;
    };
    /* Fragmentates the text node @ indexes, creating in the worst case scenario two additional
       siblings, one before and one after of text contents
     */
    /*

    public createFragmentationAtIndexes( indexStart: number, indexEnd: number ): TNode_Text {

        var out = {
            "before" : null,
            "after"  : null
        }, s: string;

        if ( indexStart > this.FRAGMENT_START ) {
            s = this.textContentsFragment( this.FRAGMENT_START, indexStart - 1);
            if ( s ) {
                out.before = this.documentElement.createTextNode( s );
            }
        }

        if ( indexEnd < this.FRAGMENT_END ) {
            s = this.textContentsFragment( indexEnd + 1, this.FRAGMENT_END );
            if ( s ) {
                out.after = this.documentElement.createTextNode( s );
            }
        }

        if ( out.before || out.after ) {

            this.textContents( this.textContentsFragment( indexStart, indexEnd ) );

            if ( out.before ) {
                this.parentNode.appendChild( out.before, this.siblingIndex );
            }

            if ( out.after ) {
                this.parentNode.appendChild( out.after, this.siblingIndex + 1 );
            }

            this.FRAGMENT_START = indexStart;
            this.FRAGMENT_END   = indexEnd;

        }

        return this;

    }

    */
    // I know it seems complicated, but that's 6 hours of work for this function (with empiric tests).
    // Don't even try to understand it, cause even I will not be able to understand it in a few hours
    // from now on
    TNode_Text.prototype.insertTextAtTargetOffset = function (offset, str) {
        var buff = [], buff1 = [offset - this.FRAGMENT_START, 0], i = 0, j = 0, len = this._text.length, out = '', args, eols = 0, returnValue = 0;
        for (i = 0; i < len; i++) {
            buff.push(this._text.charCodeAt(i));
            if (this.EOL_POS && this.EOL_POS[i]) {
                buff.push(0);
            }
        }
        for (i = 0, len = str.length; i < len; i++) {
            buff1.push(str.charCodeAt(i));
        }
        for (i = 0; i < offset - this.FRAGMENT_START; i++) {
            if (buff[i] != 0) {
                eols++;
            }
        }
        returnValue = eols + str.length;
        Array.prototype.splice.apply(buff, buff1);
        for (i = 0, len = buff.length; i < len; i++) {
            if (buff[i]) {
                out += String.fromCharCode(buff[i]);
            }
        }
        this.textContents(out);
        return returnValue;
    };
    // FIXED HOPEFULLY TO A MORE OPTIMIZED AND BUGLESS VERSION.
    TNode_Text.prototype.textIndexToFragmentPosition = function (index) {
        var i = 0, retVal = 0;
        for (var i = 0; i <= index; i++) {
            if (this.EOL_POS && this.EOL_POS[i]) {
                retVal += 2;
            }
            else {
                retVal++;
            }
        }
        retVal = this.FRAGMENT_START + retVal - 1 - (this.EOL_POS && this.EOL_POS[index] ? 1 : 0);
        while (retVal > 0 && [3 /* CHARACTER */, 4 /* WHITE_SPACE */, 2 /* EOL */].indexOf(this.documentElement.fragment.at(retVal)) == -1) {
            retVal--;
        }
        return retVal;
    };
    TNode_Text.prototype.ownerBlockElement = function () {
        return this.parentNode.ownerBlockElement();
    };
    TNode_Text.$FragmentTypes = {
        "\n": 4 /* WHITE_SPACE */,
        "\t": 4 /* WHITE_SPACE */,
        " ": 4 /* WHITE_SPACE */
    };
    TNode_Text.$SpecialChars = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot'
    };
    return TNode_Text;
})(TNode);
var TNode_TextBreak = (function (_super) {
    __extends(TNode_TextBreak, _super);
    function TNode_TextBreak(breakElement) {
        _super.call(this, "\r");
        this.isBR = true;
        this._parentNode = breakElement;
        this.siblingIndex = 0;
    }
    Object.defineProperty(TNode_TextBreak.prototype, "parentNode", {
        get: function () {
            return this._parentNode;
        },
        set: function (node) {
            if (node != this._parentNode) {
                throw "ERR_NO_MODIFICATION_ALLOWED";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TNode_TextBreak.prototype, "_text", {
        get: function () {
            return "\r";
        },
        set: function (s) {
            if (s == '' && this.parentNode) {
                this.parentNode.remove();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TNode_TextBreak.prototype, "documentElement", {
        get: function () {
            if (this.parentNode) {
                return this.parentNode.documentElement;
            }
            else {
                return null;
            }
        },
        set: function (body) {
        },
        enumerable: true,
        configurable: true
    });
    TNode_TextBreak.prototype.bakeIntoFragment = function () {
        if (this.parentNode && this.parentNode.documentElement) {
            this.FRAGMENT_START = this.parentNode.documentElement.fragment.length();
            this.documentElement.fragment.add(4 /* WHITE_SPACE */);
            if (this.EOL_POS && this.EOL_POS[0])
                this.documentElement.fragment.add(2 /* EOL */);
            this.FRAGMENT_END = this.documentElement.fragment.length() - 1;
        }
    };
    TNode_TextBreak.prototype.remove = function () {
        throw "ERR_NO_MODIFICATION_ALLOWED";
    };
    TNode_TextBreak.prototype.elementsBeforeMyself = function (includingMe) {
        throw "ERR_DENIED: TNode_TextBreak.elementsAfterMyself";
    };
    TNode_TextBreak.prototype.elementsAfterMyself = function (includingMe) {
        throw "ERR_DENIED: TNode_TextBreak.elementsAfterMyself";
    };
    TNode_TextBreak.prototype.insertTextAtTargetOffset = function (offset, str) {
        var nextTextNode = this.parentNode.nextAvailableTextNode();
        nextTextNode.textContents(str, true); // append text @ beginning
        return -str.length;
    };
    TNode_TextBreak.prototype.textIndexToFragmentPosition = function (index) {
        return this.parentNode.nextAvailableTextNode().textIndexToFragmentPosition(index);
    };
    return TNode_TextBreak;
})(TNode_Text);
var TNode_Element = (function (_super) {
    __extends(TNode_Element, _super);
    /* @postStyleInit: weather to initialize the style property on this constructor,
                       or if that style property will be initialized in ancestor classes
     */
    function TNode_Element(postStyleInit) {
        if (postStyleInit === void 0) { postStyleInit = false; }
        _super.call(this);
        this.childNodes = [];
        this.nodeType = 2 /* ELEMENT */;
        this.nodeName = '';
        this.id = '';
        this.className = '';
        this.isSelectable = false; // weather the element is rendered as selected when the user clicks on it
        this.isResizable = false; // weather the element is rendered with resize handles when it's focused
        this.isPaintedSelected = false; // weather during the last paint, the element was painted as outer selected.
        this.isBlockTextNode = false; // on elements in which user can write, this property must be set to true.
        // what happens when a user press enter, the element is "cutted", or a <br /> tag is inserted at cursor position
        this.insertLinePolicy = 1 /* SURGERY */;
        this.alternateInsertLinePolicy = 0 /* BR */;
        this.isMergeable = true; // weather the "mergeWith" method works with this or with another element.
        this.isDefragmentable = false; // Two neighbour siblings like <b>...</b><b>...</b> should be defragmented in a single <b>......</b>
        this.isNegation = false; // Wether the node is a negation node ( for a "b" node, it's negation is a "!b" node ).
        if (!postStyleInit)
            this.style = new TStyle(this);
    }
    /* Appends a node in the element. If arugment @index is mentioned ( not null ),
       the element will be inserted at position @index
     */
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
    /* Appends a collection of elements. If argument @siblingIndex is mentioned ( not null ),
       the collection of elements will be inserted starting with @siblingIndex, otherwise the
       insertion will be made at the end of this element
     */
    TNode_Element.prototype.appendCollection = function (collection, siblingIndex) {
        if (siblingIndex === void 0) { siblingIndex = null; }
        siblingIndex = siblingIndex === null ? this.childNodes.length : siblingIndex;
        var args = [siblingIndex, 0], i = 0, len = collection.nodes.length;
        for (i = 0; i < len; i++) {
            args.push(collection.nodes[i]);
            collection.nodes[i].remove();
        }
        this.childNodes.splice.apply(this.childNodes, args);
        for (i = 0, len = this.childNodes.length; i < len; i++) {
            this.childNodes[i].parentNode = this;
            this.childNodes[i].siblingIndex = i;
        }
        this.requestRelayout();
    };
    /* Removes a child ( if direct node ) of this element
     */
    TNode_Element.prototype.removeChild = function (node) {
        for (var i = 0, len = this.childNodes.length; i < len; i++) {
            if (this.childNodes[i] == node) {
                this.childNodes.splice(i, 1);
                for (var j = i, len = this.childNodes.length; j < len; j++) {
                    this.childNodes[j].siblingIndex = j;
                }
                this.requestRelayout();
                return node;
            }
        }
        throw "ERR_NODE_NOT_FOUND";
    };
    /* The hasLayout property of an element returns true if the width and height of the
       element are considered, otherwise returns false ( typically for inline elements)

       Basically, an element has layout in two main cases:
            1. It contains text (nodes) or inline elements inside
            2. It is rendered with width and height ( an image, video, or plugin for example )
    */
    TNode_Element.prototype.hasLayout = function () {
        return this.style.display() == 'block' || this.style.float() != '';
    };
    /* Returns an appropriate layout for this element. It should be invoked only with elements
       for which hasLayout() returns true.

       Not invocable directly by user.
    */
    TNode_Element.prototype.createLayout = function (useParentLayout) {
        if (useParentLayout === void 0) { useParentLayout = null; }
        if (this.documentElement) {
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
        }
        else {
            return null;
        }
    };
    /* Returns a modified "childNodes" property of the element, sorted in such a manner that the
       "float=left" and "float=right" elements are put at first, and the rest of
       the elements are put at last
    */
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
    /* Evaluates the possible layout type for the element.

       Not invocable by the user.
    */
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
    /* Returns or sets the concatenated outerHTML() of the child nodes
     */
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
    /* Returns the element header as string ( for example for a "<p>asda</p>" it returns "<p>")
     */
    TNode_Element.prototype.xmlBeginning = function () {
        return '<' + this.nodeName + (this.childNodes.length ? '' : '/') + '>';
    };
    /* Returns the element footer as a string ( for example for a "<p>asda</p>", it returns the "</p>" part )
     */
    TNode_Element.prototype.xmlEnding = function () {
        if (!this.childNodes.length) {
            return '';
        }
        else {
            return '</' + this.nodeName + '>';
        }
    };
    /* Returns or sets the outer HTML of a node. Setter is not implemented */
    TNode_Element.prototype.outerHTML = function (setter) {
        if (setter === void 0) { setter = null; }
        if (setter === null) {
            // getter
            return this.xmlBeginning() + this.innerHTML() + this.xmlEnding();
        }
        else {
            throw "node.outerHTML: Setter not implemented yet!";
        }
    };
    /* Notifies the document element containing this node that a relayout is
       needed. Relayout is scheduled with the help of a throttler.
     */
    TNode_Element.prototype.requestRelayout = function () {
        if (this.documentElement) {
            this.documentElement.needRelayout = true;
        }
    };
    /* Notifies the document element containing this node that a repaint is
       needed. Repainting is scheduled with the help of a throttler.
     */
    TNode_Element.prototype.requestRepaint = function (originatingElement) {
        if (originatingElement === void 0) { originatingElement = null; }
        if (this.documentElement) {
            this.documentElement.requestRepaint();
        }
    };
    /* Paints the node according to @layout settings (offsetLeft, offsetTop, etc.) */
    TNode_Element.prototype.paint = function (ctx, layout, scrollLeft, scrollTop) {
        // paint border
        var borderColor, borderWidth, backgroundColor, range = this.documentElement.viewport.selection.getRange(), isSelected = false;
        if ((range.equalsNode(this) && this.isSelectable) || (range.contains(this.FRAGMENT_START + 1) && range.contains(this.FRAGMENT_END - 1))) {
            isSelected = true;
            ctx.fillStyle = DocSelection.$Colors.focus;
            ctx.fillRect(~~(layout.innerLeft - scrollLeft), ~~(layout.innerTop - scrollTop), ~~layout.innerWidth, ~~layout.innerHeight);
        }
        this.isPaintedSelected = isSelected;
        if ((borderWidth = this.style.borderWidth())) {
            borderColor = this.style.borderColor();
            if (borderColor) {
                ctx.strokeStyle = borderColor;
                ctx.lineWidth = borderWidth;
                ctx.beginPath();
                ctx.strokeRect(layout.offsetLeft + (borderWidth / 2) - scrollLeft, layout.offsetTop + (borderWidth / 2) - scrollTop, layout.offsetWidth - borderWidth, layout.offsetHeight - borderWidth);
                ctx.closePath();
            }
        }
        if ((backgroundColor = this.style.backgroundColor()) && !isSelected) {
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
                    if (nodesList[i].value)
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
    TNode_Element.prototype.bakeIntoFragment = function () {
        if (this.documentElement) {
            this.FRAGMENT_START = this.documentElement.fragment.length();
            this.documentElement.fragment.add(0 /* NODE_START */);
            var i = 0, len = 0;
            if (this.childNodes && (len = this.childNodes.length)) {
                for (i = 0; i < len; i++) {
                    this.childNodes[i].bakeIntoFragment();
                }
            }
            this.FRAGMENT_END = this.documentElement.fragment.length();
            this.documentElement.fragment.add(1 /* NODE_END */);
        }
    };
    TNode_Element.prototype.containsNode = function (node) {
        if (node && this.documentElement && node.documentElement && this.documentElement == node.documentElement) {
            this.documentElement.requestRelayoutNowIfNeeded();
            return node.FRAGMENT_START > this.FRAGMENT_START && node.FRAGMENT_START < this.FRAGMENT_END;
        }
        else
            return false;
    };
    /* Compares the document position between 2 nodes in DOM.
       negative values means the node is Before, positive values means the
       node is after
     */
    TNode_Element.prototype.compareDocumentPosition = function (node) {
        if (node && this.documentElement && node.documentElement && this.documentElement == node.documentElement) {
            this.documentElement.requestRelayoutNowIfNeeded();
            return this.FRAGMENT_START - node.FRAGMENT_START;
        }
        else
            return -1;
    };
    /* Recursively finds a node that is mapped to the document fragment
       at position @index.
     */
    TNode_Element.prototype.findNodeAtIndex = function (index) {
        var i = 0, len = 0, match;
        if (this.documentElement) {
            this.documentElement.requestRelayoutNowIfNeeded();
            if (index == this.FRAGMENT_START || index == this.FRAGMENT_END) {
                return this;
            }
            else if (index < this.FRAGMENT_START || index > this.FRAGMENT_END) {
                return null;
            }
            else {
                for (i = 0, len = this.childNodes.length; i < len; i++) {
                    if (this.childNodes && (len = this.childNodes.length)) {
                        if (this.childNodes[i].nodeType == 1 /* TEXT */) {
                            if (index >= this.childNodes[i].FRAGMENT_START && index <= this.childNodes[i].FRAGMENT_END) {
                                return this.childNodes[i];
                            }
                        }
                        else {
                            match = this.childNodes[i].findNodeAtIndex(index);
                            if (match !== null) {
                                return match;
                            }
                        }
                    }
                }
                return this;
            }
        }
        else
            return null;
    };
    // removes the empty text nodes from the element or this element if it has
    // no nodes.
    TNode_Element.prototype.removeOrphanNodes = function () {
        if (this.childNodes) {
            if (!this.childNodes.length) {
                this.remove();
            }
            else {
                for (var i = this.childNodes.length - 1; i >= 0; i--) {
                    if (this.childNodes[i].nodeType == 2 /* ELEMENT */) {
                        this.childNodes[i].removeOrphanNodes();
                    }
                    else {
                        if (this.childNodes[i].textContents() == '') {
                            this.childNodes[i].remove();
                        }
                    }
                }
            }
        }
    };
    /* If this is an element in which the user can write (p, td, h*, etc, ) returns
       this element, otherwise scans recursive the parents until it find one and
       returns it.
     */
    TNode_Element.prototype.ownerBlockElement = function () {
        if (this.isBlockTextNode) {
            return this;
        }
        else {
            if (this.parentNode) {
                return this.parentNode.ownerBlockElement();
            }
            else {
                return null;
            }
        }
    };
    /* A very special function. It cuts the element sub-tree until or deeper this element.
       This function is needed for inserting BR's, and for executing the "bold", "italic", etc commands.

       This function is executed on elements which contains text nodes or inline elements.

       @fragmentIndex: an index somewhere *between* node fragment start and node fragment end.

       @createNodeAfter: boolean: weather to create a node after this node, or to make the
                         surgery inside of the node

       @nodeNameAfter argument is taken in consideration only if 2nd argument is true:
            - if nodeNameAfter === null, a node with the same name as this node will be used.
            - otherwise, a node with a nodeNameAfter will be appended in this document.

        returns the FRAGMENT_START of the right cutted part.

        Note that some aspects of this function are hardcoded.

        Not invocable by the user.

        returns the fragment position of the surgeried position.

        The @hint setting should not be used by the user

    */
    TNode_Element.prototype.createSurgery = function (atFragmentIndex, createNodeAfter, nodeNameAfter, hint) {
        //console.info( 'surgery in ' + this.xmlBeginning() + " " + atFragmentIndex + ", bounds are: " + this.FRAGMENT_START + "," + this.FRAGMENT_END );
        if (createNodeAfter === void 0) { createNodeAfter = true; }
        if (nodeNameAfter === void 0) { nodeNameAfter = null; }
        if (hint === void 0) { hint = 0 /* NONE */; }
        var splitNode, lParent, rParent = null, t1 = '', t2 = '', leftCol, rightCol, rNode, whiteSpace = hint == 0 /* NONE */ ? ' ' : '';
        if (atFragmentIndex <= this.FRAGMENT_START || atFragmentIndex >= this.FRAGMENT_END) {
            if (atFragmentIndex <= this.FRAGMENT_START) {
                atFragmentIndex = this.FRAGMENT_START + 1;
            }
            else if (atFragmentIndex >= this.FRAGMENT_END) {
                atFragmentIndex = this.FRAGMENT_END - 1;
            }
        }
        if ((atFragmentIndex == this.FRAGMENT_START + 1) && createNodeAfter === false) {
            return atFragmentIndex;
        }
        if ((atFragmentIndex == this.FRAGMENT_END - 1)) {
            if (createNodeAfter === false) {
                return atFragmentIndex;
            }
            else {
                if (nodeNameAfter === null) {
                    rParent = this.documentElement.createElement(nodeNameAfter);
                }
                else {
                    rParent = this.clone();
                }
                rParent.appendChild(this.documentElement.createTextNode(whiteSpace));
                this.parentNode.appendChild(rParent, this.siblingIndex + 1);
                this.documentElement.relayout(true);
                return rParent.FRAGMENT_START;
            }
        }
        // find the exact element which has the atFragmentIndex position
        splitNode = this.findNodeAtIndex(atFragmentIndex);
        // avoid spliting the TNodeText inside br tags. ( split after ).
        if (splitNode.nodeType == 1 /* TEXT */ && splitNode.isBR) {
            splitNode = splitNode.parentNode;
            atFragmentIndex = splitNode.FRAGMENT_END;
        }
        if (splitNode.nodeType == 1 /* TEXT */ && splitNode.FRAGMENT_START != atFragmentIndex && splitNode.FRAGMENT_END + 1 != atFragmentIndex) {
            // we split at text
            t1 = splitNode.textContentsFragment(splitNode.FRAGMENT_START, atFragmentIndex - 1);
            t2 = splitNode.textContentsFragment(atFragmentIndex, splitNode.FRAGMENT_END);
            leftCol = new TNode_Collection([splitNode]);
            rightCol = new TNode_Collection(splitNode.elementsAfterMyself(true));
            rightCol.addFirst(this.documentElement.createTextNode(t2 || whiteSpace));
            splitNode.textContents(t1 || whiteSpace);
            splitNode.parentNode.appendChild(rightCol.at(0), splitNode.siblingIndex + 1);
            lParent = splitNode.parentNode;
            rParent = lParent.clone();
            rightCol = rightCol.wrapIn(rParent);
            leftCol = leftCol.wrapIn(lParent);
        }
        else {
            // we split before or after an element
            if (atFragmentIndex == splitNode.FRAGMENT_START) {
                //before
                leftCol = new TNode_Collection(splitNode.elementsBeforeMyself(false));
                rightCol = new TNode_Collection(splitNode.elementsAfterMyself(true));
            }
            else {
                leftCol = new TNode_Collection(splitNode.elementsBeforeMyself(true));
                rightCol = new TNode_Collection(splitNode.elementsAfterMyself(false));
            }
            lParent = splitNode.parentNode;
            rParent = lParent.clone();
            rightCol.wrapIn(rParent);
        }
        while (lParent != this) {
            leftCol = new TNode_Collection(lParent.elementsBeforeMyself(true));
            rightCol = new TNode_Collection(lParent.elementsAfterMyself(false));
            rightCol.addFirst(rParent);
            rParent = lParent.parentNode.clone();
            rightCol.wrapIn(rParent);
            lParent = lParent.parentNode;
        }
        //console.log( rightCol );
        if (createNodeAfter) {
            if (nodeNameAfter === null || nodeNameAfter == this.nodeName) {
            }
            else {
                (rightCol = new TNode_Collection(rParent.childNodes)).wrapIn(rParent = this.documentElement.createElement(nodeNameAfter));
                rightCol.wrapIn(rParent);
            }
            this.parentNode.appendChild(rParent, this.siblingIndex + 1);
            if (rParent.innerHTML() == '') {
                rParent.appendChild(this.documentElement.createTextNode(whiteSpace));
            }
        }
        else {
            rightCol = new TNode_Collection(rParent.childNodes);
            //console.log( rightCol.innerHTML() );
            // append all the contents of the rParent to myself
            rightCol.wrapIn(this);
            this.documentElement.relayout(true);
            if (rightCol.length) {
                return rightCol.at(0).FRAGMENT_START;
            }
            else {
                return this.FRAGMENT_END - 1;
            }
        }
        if (this.innerHTML() == '') {
            this.innerHTML('');
            this.appendChild(this.documentElement.createTextNode(whiteSpace));
        }
        // force a document relayout, mandatory!
        this.documentElement.relayout(true);
        return rParent.FRAGMENT_START;
    };
    /* Takes moves the contents of the @element inside this element, and removes the @element afterwards
     */
    TNode_Element.prototype.mergeWith = function (element) {
        if (this.isMergeable && element.isMergeable) {
            if (element.nodeName != 'br' && element.childNodes && element.childNodes.length) {
                var nodes = Array.prototype.slice.call(element.childNodes, 0), i = 0, len = nodes.length;
                for (i = 0; i < len; i++) {
                    this.appendChild(nodes[i]);
                }
            }
            element.remove();
        }
        else {
            throw "ERR_CANNOT_MERGE_ELEMENTS";
        }
    };
    /* Returns the last child Node of the element */
    TNode_Element.prototype.lastChild = function () {
        return !this.childNodes ? null : (this.childNodes[this.childNodes.length - 1] || null);
    };
    /* Returns the first child Node of the element */
    TNode_Element.prototype.firstChild = function () {
        return !this.childNodes ? null : (this.childNodes[0] || null);
    };
    /* When the user press Delete or Backspace key, and this element is Focused,
       and selection is of type NODE, this function implements what happens then
     */
    TNode_Element.prototype.removeFromDOMAtUserCommand = function () {
        if (this.style.display() == 'block' && this != this.documentElement) {
            this.remove();
            return true;
        }
    };
    /* Removes all the child nodes of the element */
    TNode_Element.prototype.removeAllChildNodes = function () {
        if (this.childNodes) {
            for (var i = this.childNodes.length - 1; i >= 0; i--) {
                this.removeChild(this.childNodes[i]);
            }
        }
    };
    /* Moves all the direct child nodes of this element in the element parent, insertion
       being made after the element.

       After the unwrapping, the element (this) is removed from the DOM.
     */
    TNode_Element.prototype.unwrap = function () {
        var collection = new TNode_Collection([]);
        //append my child nodes after me...
        this.parentNode.appendCollection(collection = new TNode_Collection(this.childNodes), this.siblingIndex + 1);
        this.remove();
        return collection;
    };
    /* Returns the node name minus the "!" sign at is's beginning, if it's the case */
    TNode_Element.prototype.nodeNameWithoutNegation = function () {
        if (this.nodeName[0] == '!') {
            return this.nodeName.slice(1);
        }
        else {
            return this.nodeName;
        }
    };
    /* Returns true if element negates other element */
    TNode_Element.prototype.negates = function (node) {
        return ((~~this.isNegation + ~~node.isNegation) == 1) && (node.nodeNameWithoutNegation() == this.nodeNameWithoutNegation());
    };
    /* - Attempts to create an optized version of DOM for a node.
       - Remove unnecessary negation nodes
       @param removeOrphans should not be used.
     */
    TNode_Element.prototype.defragment = function (removeOrphans) {
        if (removeOrphans === void 0) { removeOrphans = true; }
        if (!this.childNodes) {
            return;
        }
        if (removeOrphans) {
            this.removeOrphanNodes();
        }
        var i = 0, len = this.childNodes.length, returnValue = 0;
        if (this.childNodes.length == 1 && this.childNodes[0].nodeType == 2 /* ELEMENT */) {
            if (this.childNodes[0].negates(this)) {
                returnValue = this.childNodes[0].childNodes.length - 1;
                this.parentNode.appendCollection(new TNode_Collection(this.childNodes[0].childNodes), this.siblingIndex + 1);
                this.remove();
                return returnValue;
            }
        }
        if (len != 1) {
            for (i = len - 1; i >= 1; i--) {
                if (this.childNodes[i].nodeType == 1 /* TEXT */ && this.childNodes[i - 1].nodeType == 1 /* TEXT */) {
                    this.childNodes[i - 1].textContents(this.childNodes[i - 1].textContents() + this.childNodes[i].textContents());
                    this.childNodes[i].remove();
                }
                else {
                    if (this.childNodes[i].nodeType == 2 /* ELEMENT */) {
                        if (this.childNodes[i - 1].nodeType == 2 /* ELEMENT */) {
                            if (this.childNodes[i].nodeName == this.childNodes[i - 1].nodeName && this.childNodes[i].isDefragmentable && this.childNodes[i].canDefragmentWith(this.childNodes[i - 1]))
                                this.childNodes[i - 1].mergeWith(this.childNodes[i]);
                            else
                                len += this.childNodes[i].defragment(false);
                        }
                        else
                            len += this.childNodes[i].defragment(false);
                    }
                }
            }
        }
        else {
            if (this.childNodes[0].nodeType == 2 /* ELEMENT */) {
                this.childNodes[i].defragment(false);
            }
        }
        return 0;
    };
    /* Returns the text contents of the element */
    TNode_Element.prototype.textContents = function (contents) {
        if (contents === void 0) { contents = null; }
        if (contents !== null) {
            throw "Setter not implemented";
        }
        else {
            if (!this.childNodes) {
                return '';
            }
            else {
                var i = 0, len = this.childNodes.length, out = [];
                for (i = 0; i < len; i++) {
                    if (this.childNodes[i].nodeType == 1 /* TEXT */) {
                        out.push(this.childNodes[i].textContents());
                    }
                    else {
                        out.push(this.childNodes[i].textContents());
                    }
                }
                return out.join('');
            }
        }
    };
    /* Returns an element with exactly the same settings like this.
       Should be overrided if needed.
     */
    TNode_Element.prototype.clone = function () {
        return this.documentElement.createElement(this.nodeName);
    };
    /* Used in the process of defragmentation, for disallowing a <font color="red"> to be merged with a <font color="blue">
     */
    TNode_Element.prototype.canDefragmentWith = function (element) {
        return true;
    };
    /* Morphs this element into another element */
    TNode_Element.prototype.becomeElement = function (elementName) {
        if (!this.parentNode) {
            throw "ERR_NO_PARENT_NODE";
        }
        else {
            if (elementName != 'li' && elementName != 'ul' && elementName != 'ol') {
                var result = this.documentElement.createElement(elementName);
                this.parentNode.appendChild(result, this.siblingIndex);
                result.mergeWith(this);
                return result;
            }
            else {
                var result = this.documentElement.createElement(['li', 'ul'].indexOf(elementName) >= 0 ? 'ul' : 'ol');
                this.parentNode.appendChild(result, this.siblingIndex);
                var li = (result.appendChild(this.documentElement.createElement('li')));
                li.mergeWith(this);
                li.parentNode.parentNode.mergeAdjacentLists();
                return li;
            }
        }
    };
    /* Merges <ul>...</ul><ul>...</ul> and <ol>...</ol><ol>...</ol> into single lists. */
    TNode_Element.prototype.mergeAdjacentLists = function () {
        for (var i = this.childNodes.length - 1; i > 0; i--) {
            if ((this.childNodes[i].nodeType == 2 /* ELEMENT */) && (this.childNodes[i - 1].nodeType == 2 /* ELEMENT */) && (this.childNodes[i].nodeName == this.childNodes[i - 1].nodeName) && ['ul', 'ol'].indexOf(this.childNodes[i].nodeName) >= 0) {
                this.childNodes[i - 1].mergeWith(this.childNodes[i]);
            }
            else if ((this.childNodes[i].nodeType == 2 /* ELEMENT */) && ['ul', 'ol'].indexOf(this.childNodes[i].nodeName) >= 0 && this.childNodes[i].childNodes.length == 0) {
                this.childNodes[i].remove();
            }
        }
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
    TNode_Collection.prototype.addFirst = function (node) {
        this.nodes.splice(0, 0, node);
    };
    TNode_Collection.prototype.wrapIn = function (node) {
        for (var i = 0, len = this.nodes.length; i < len; i++) {
            node.appendChild(this.nodes[i]);
        }
        return new TNode_Collection([node]);
    };
    TNode_Collection.prototype.innerHTML = function () {
        var i = 0, len = this.nodes.length, out = [];
        for (i = 0; i < len; i++) {
            if (this.nodes[i].nodeType == 1 /* TEXT */) {
                out.push(this.nodes[i].textContents());
            }
            else {
                out.push(this.nodes[i].outerHTML());
            }
        }
        return out.join('');
    };
    TNode_Collection.prototype.at = function (index) {
        return this.nodes[index];
    };
    return TNode_Collection;
})();
var TNode_Collection_Dettached = (function (_super) {
    __extends(TNode_Collection_Dettached, _super);
    function TNode_Collection_Dettached(parentNode, surgeryStart, surgeryEnd) {
        if (surgeryStart === void 0) { surgeryStart = 0; }
        if (surgeryEnd === void 0) { surgeryEnd = 0; }
        _super.call(this, []);
        this.parentNode = null;
        this.surgeryStart = 0;
        this.surgeryEnd = 0;
        this.fragLTR = 0;
        this.fragRTL = 0;
        this.leftSibling = null;
        this.parentNode = parentNode;
        this.surgeryStart = Math.max(this.parentNode.FRAGMENT_START + 1, surgeryStart);
        this.surgeryEnd = Math.min(this.parentNode.FRAGMENT_END - 1, surgeryEnd) + 1;
        var i = 0, fragment = this.parentNode.documentElement.fragment, at = null;
        for (i = parentNode.FRAGMENT_START + 1; i < surgeryStart; i++) {
            at = fragment.at(i);
            if (at != 2 /* EOL */) {
                this.fragLTR++;
            }
        }
        for (i = parentNode.FRAGMENT_END - 1; i >= surgeryEnd; i--) {
            at = fragment.at(i);
            if (at != 2 /* EOL */) {
                this.fragRTL++;
            }
        }
    }
    TNode_Collection_Dettached.prototype.createSlices = function () {
        this.parentNode.createSurgery(this.surgeryEnd, false, null, 2 /* RIGHT */);
        this.parentNode.createSurgery(this.surgeryStart, false, null, 1 /* LEFT */);
        //console.log( this.fragLTR, this.fragRTL, this.parentNode.xmlBeginning() );
    };
    TNode_Collection_Dettached.prototype.createRanges = function () {
        var at = null, fragment = this.parentNode.documentElement.fragment, i = 0, len = 0, computeLeftSibling = false, node;
        this.surgeryStart = this.parentNode.FRAGMENT_START;
        this.surgeryEnd = this.parentNode.FRAGMENT_END;
        i = 0;
        while (this.fragLTR > 0) {
            at = fragment.at(this.surgeryStart + i);
            if (at != 2 /* EOL */) {
                this.fragLTR--;
            }
            i++;
        }
        this.surgeryStart += i;
        i = 0;
        while (this.fragRTL > 0) {
            at = fragment.at(this.surgeryEnd - i);
            if (at != 2 /* EOL */) {
                this.fragRTL--;
            }
            i++;
        }
        this.surgeryEnd -= i;
        /*
        while ( this.surgeryStart > this.parentNode.FRAGMENT_START && [FragmentItem.NODE_START, FragmentItem.EOL].indexOf( fragment.at( this.surgeryStart ) ) > -1 ) {
            this.surgeryStart--;
            console.log( '<' );
        }

        while ( this.surgeryEnd < this.parentNode.FRAGMENT_END && [FragmentItem.NODE_END, FragmentItem.EOL].indexOf( fragment.at( this.surgeryEnd + 1 ) ) > -1 ) {
            this.surgeryEnd++;
            console.log( '>' );
        }
        */
        computeLeftSibling = true;
        for (i = 0, len = this.parentNode.childNodes.length; i < len; i++) {
            if (this.parentNode.childNodes[i].FRAGMENT_START >= this.surgeryStart && this.parentNode.childNodes[i].FRAGMENT_END <= this.surgeryEnd) {
                this.add(this.parentNode.childNodes[i]);
                if (computeLeftSibling) {
                    this.leftSibling = this.parentNode.childNodes[i - 1] || null;
                }
                computeLeftSibling = false;
            }
        }
        //console.warn( 'after create: ' + this.toString() + ', with ' + this.nodes.length + ' nodes.' );
    };
    TNode_Collection_Dettached.prototype.wrapInElement = function (nodeName, elAttributeName, elAttributeValue, ifFunc) {
        if (elAttributeName === void 0) { elAttributeName = null; }
        if (elAttributeValue === void 0) { elAttributeValue = null; }
        if (ifFunc === void 0) { ifFunc = null; }
        if (ifFunc !== null && !(ifFunc.call(this.parentNode))) {
            return;
        }
        var node = this.parentNode.documentElement.createElement(nodeName), i = 0, len = this.nodes.length;
        if (elAttributeName !== null) {
            node.setAttribute(elAttributeName, elAttributeValue || '');
        }
        for (i = 0; i < len; i++) {
            node.appendChild(this.nodes[i]);
        }
        this.nodes = [node];
        this.parentNode.appendChild(node, this.leftSibling === null ? 0 : this.leftSibling.siblingIndex + 1);
    };
    TNode_Collection_Dettached.prototype.unwrapFromElement = function (nodeName, ifFunc) {
        if (ifFunc === void 0) { ifFunc = null; }
        if (ifFunc !== null && !(ifFunc.call(this.parentNode))) {
            return;
        }
        var subWraps = [], i = 0, len = this.nodes.length, addLen = 0, subChildren = [], unwrapped;
        for (i = 0; i < len; i++) {
            switch (this.nodes[i].nodeType) {
                case 1 /* TEXT */:
                    break;
                case 2 /* ELEMENT */:
                    if (this.nodes[i].nodeName == nodeName) {
                        //console.error( 'unwrap ' + nodeName );
                        unwrapped = this.nodes[i].unwrap();
                        Helper.spliceApply(this.nodes, i, 1, unwrapped.nodes);
                        len = this.nodes.length;
                        //console.error( 'after unwrap: ' + this.toString() );
                        i += unwrapped.nodes.length - 1;
                    }
                    break;
            }
        }
        for (i = 0; i < len; i++) {
            if (this.nodes[i].nodeType == 2 /* ELEMENT */) {
                this.nodes[i].queryAll({ "nodeName": nodeName }).each(function () {
                    this.unwrap();
                });
            }
        }
    };
    TNode_Collection_Dettached.prototype.reInsert = function () {
        this.parentNode.appendCollection(this, this.leftSibling ? this.leftSibling.siblingIndex + 1 : 0);
        this.parentNode.removeOrphanNodes();
    };
    TNode_Collection_Dettached.prototype.toString = function (separator) {
        if (separator === void 0) { separator = ''; }
        var out = [], i = 0, len = this.nodes.length;
        for (i = 0; i < len; i++) {
            switch (this.nodes[i].nodeType) {
                case 1 /* TEXT */:
                    out.push(this.nodes[i].textContents());
                    break;
                default:
                    out.push(this.nodes[i].outerHTML());
                    break;
            }
        }
        return out.join(separator);
    };
    return TNode_Collection_Dettached;
})(TNode_Collection);
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
        this.isBlockTextNode = true; //user can write inside this element ( or sub-elements );
        this.canRelayout = true; //we can disable relayouting of the document by setting this flag to false.
        this.changeThrottler = null; // a throttler that is executed each time a dom subtree modification occurs.
        this.fragment = new Fragment(this);
        this.viewport = viewport;
        this.lines = new Character_LinesCollection();
        (function (me) {
            me.changeThrottler = new Throttler(function () {
                me.fire('change');
            }, 10);
        })(this);
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
            case 'br':
                node = new HTML_BreakElement();
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
            case 'strong':
                node = new HTML_Bold();
                break;
            case '!b':
                node = new HTML_NegationNode('b');
                break;
            case 'i':
            case 'em':
                node = new HTML_Italic();
                break;
            case '!i':
                node = new HTML_NegationNode('i');
                break;
            case 'u':
                node = new HTML_Underline();
                break;
            case '!u':
                node = new HTML_NegationNode('u');
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
            case '!sup':
                node = new HTML_NegationNode('sup');
                break;
            case 'sub':
                node = new HTML_Subscript();
                break;
            case '!sub':
                node = new HTML_NegationNode('sub');
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
            case 'font':
                node = new HTML_Font();
                break;
            case 'color':
                node = new HTML_Color();
                break;
            case 'size':
                node = new HTML_Size();
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
    HTML_Body.prototype.requestRelayoutNowIfNeeded = function () {
        if (this._needRelayout) {
            this.relayout();
        }
    };
    HTML_Body.prototype.requestRepaint = function () {
        if (!this.canRelayout)
            return;
        this._needRepaint = true;
        this.fire('repaint');
        this.viewport.painter.run();
    };
    HTML_Body.prototype.repaint = function () {
        if (!this.canRelayout) {
            //console.warn( 'repaint canceled due to canRelayout setting.')
            return;
        }
        // repaints the document
        var now = Date.now(), diff = 0;
        if (this._needRepaint == false && this._needRelayout == false) {
            return;
        }
        if (this._needRelayout) {
            this.relayout();
        }
        //this.viewport.context.clearRect( 0, 0, this.viewport.width() - this.viewport._scrollbarSize, this.viewport.height() - this.viewport._scrollbarSize );
        this.viewport.context.fillStyle = 'white';
        this.viewport.context.fillRect(0, 0, this.viewport.width() - this.viewport._scrollbarSize, this.viewport.height() - this.viewport._scrollbarSize);
        this._layout.paint(this.viewport.context, this.viewport.scrollLeft(), this.viewport.scrollTop(), this.viewport);
        this._needRepaint = false;
        diff = Date.now() - now;
        if (diff > 20)
            Helper.warn('repaint ended in ' + diff + ' ms.');
    };
    // full document relayout. this function computes where to draw
    // objects in the canvas.
    HTML_Body.prototype.relayout = function (force) {
        if (force === void 0) { force = false; }
        if (!this.canRelayout) {
            //console.warn( 'relayout canceled due to canRelayout setting.')
            return;
        }
        this.changeThrottler.run();
        if (!this._needRelayout && force == false) {
            //console.log( 'body.relayout: up to date.' );
            return;
        }
        this.fragment.reset();
        var now = Date.now(), diff = 0;
        if (!this.viewport) {
            return;
        }
        this._layout = this.createLayout();
        this.lines.reset();
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
        //console.log( this._layout.serialize() );
        this.bakeIntoFragment();
        this._needRelayout = false;
        diff = Date.now() - now;
        if (diff > 20)
            Helper.warn('relayout completed in ' + diff + ' ms.');
        if (force) {
            this._needRepaint = true;
            this.repaint();
        }
    };
    HTML_Body.prototype.removeOrphanNodes = function () {
        for (var i = this.childNodes.length - 1; i >= 0; i--) {
            if (this.childNodes[i].nodeType == 2 /* ELEMENT */) {
                this.childNodes[i].removeOrphanNodes();
            }
            else {
                if (this.childNodes[i].textContents() == '') {
                    this.childNodes[i].remove();
                }
            }
        }
    };
    HTML_Body.prototype.setAttribute = function (attributeName, attributeValue) {
        switch (attributeName) {
            case 'bgcolor':
            case 'color':
            case 'align':
                break;
            default:
                _super.prototype.setAttribute.call(this, attributeName, attributeValue);
        }
    };
    // the body cannot become other thing excepting itself.
    HTML_Body.prototype.becomeElement = function (elementName) {
        return this;
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
        this.isBlockTextNode = true;
        this.nodeName = 'p';
        this.style.display('block');
        this.style.marginTop('5');
        this.style.marginBottom('10');
    }
    return HTML_Paragraph;
})(TNode_Element);
var HTML_BreakElement = (function (_super) {
    __extends(HTML_BreakElement, _super);
    function HTML_BreakElement() {
        _super.call(this);
        this.nodeName = 'br';
        this.style.display('inline');
        this.childNodes.push(new TNode_TextBreak(this));
    }
    HTML_BreakElement.prototype.removeOrphanNodes = function () {
        // void, intentionally.
    };
    // text written inside of a break element will be appended after the break element.
    HTML_BreakElement.prototype.appendTextAfter = function (s) {
        console.warn("Append text after break: " + JSON.stringify(s));
        this.nextAvailableTextNode().textContents(s, true);
    };
    // disable append child and remove child.
    HTML_BreakElement.prototype.appendChild = function (node, index) {
        if (index === void 0) { index = null; }
        return null;
    };
    HTML_BreakElement.prototype.removeChild = function (node) {
        return null;
    };
    HTML_BreakElement.prototype.nextAvailableTextNode = function () {
        var cursor = this.nextSibling(), node = null, deep = 0;
        while (cursor) {
            if (cursor.nodeType == 1 /* TEXT */) {
                return cursor;
            }
            else {
                // if the next element is a break element, we create a text node and append it after this break element
                if (cursor.nodeName == 'br') {
                    node = this.documentElement.createTextNode('');
                    this.parentNode.appendChild(node, this.siblingIndex + 1);
                    break;
                }
                else {
                    if (cursor.childNodes && cursor.childNodes.length) {
                        deep++;
                        cursor = cursor.childNodes[0];
                    }
                    else {
                        if (deep > 0) {
                            cursor = cursor.parentNode.nextSibling();
                            deep--;
                        }
                        else {
                            break;
                        }
                    }
                }
            }
        }
        if (!node) {
            node = this.documentElement.createTextNode('');
            this.parentNode.appendChild(node, this.siblingIndex + 1);
        }
        return node;
    };
    HTML_BreakElement.prototype.xmlBeginning = function () {
        return '<br/>';
    };
    HTML_BreakElement.prototype.xmlEnding = function () {
        return '';
    };
    HTML_BreakElement.prototype.outerHTML = function (s) {
        if (s === void 0) { s = null; }
        if (s !== null) {
            return _super.prototype.outerHTML.call(this);
        }
        else
            return '<br/>';
    };
    HTML_BreakElement.prototype.innerHTML = function (s) {
        if (s === void 0) { s = null; }
        if (s === null) {
            return '';
        }
        else {
            return '';
        }
    };
    HTML_BreakElement.prototype.createSurgery = function (atFragmentIndex, createNodeAfter, nodeNameAfter) {
        if (createNodeAfter === void 0) { createNodeAfter = true; }
        if (nodeNameAfter === void 0) { nodeNameAfter = null; }
        throw "ERR_SURGERY_DENIED";
    };
    return HTML_BreakElement;
})(TNode_Element);
var HTML_Image = (function (_super) {
    __extends(HTML_Image, _super);
    function HTML_Image(src) {
        if (src === void 0) { src = null; }
        _super.call(this);
        this.node = document.createElement('img');
        this.loaded = false; // is the image loaded successfully
        this.error = false; // an error occured after loading
        this.isSelectable = true; // when the user clicks on this element, it is selectable
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
                if (this.isPaintedSelected)
                    ctx.globalAlpha = .5;
                ctx.drawImage(this.node, 0, 0, this.node.width, this.node.height, layout.innerLeft - scrollLeft, layout.innerTop - scrollTop, layout.innerWidth, layout.innerHeight);
                if (this.isPaintedSelected)
                    ctx.globalAlpha = 1;
            }
        }
    };
    HTML_Image.prototype.xmlBeginning = function () {
        var attrs = [], tmp;
        if (tmp = this.src()) {
            attrs.push('src="' + tmp + '"');
        }
        if (this.style._width.isSet) {
            attrs.push('width="' + this.style.width() + '"');
        }
        if (this.style._height.isSet) {
            attrs.push('height="' + this.style.height() + '"');
        }
        if (this.style._float.isSet) {
            attrs.push('align="' + this.style.float() + '"');
        }
        return '<img ' + attrs.join(' ') + ' />';
    };
    HTML_Image.prototype.removeOrphanNodes = function () {
        // void, intentionally.
    };
    return HTML_Image;
})(TNode_Element);
var HTML_Heading1 = (function (_super) {
    __extends(HTML_Heading1, _super);
    function HTML_Heading1() {
        _super.call(this);
        this.isBlockTextNode = true;
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
        this.isBlockTextNode = true;
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
        this.isBlockTextNode = true;
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
        this.isBlockTextNode = true;
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
        this.isBlockTextNode = true;
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
        this.isDefragmentable = true;
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
        this.isDefragmentable = true;
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
        this.isDefragmentable = true;
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
    HTML_BulletedList.prototype.breakBeforeOption = function (option) {
        var i = 0, len = option.siblingIndex - 1, ol;
        if (option.siblingIndex == 0 || this.childNodes.length == 1) {
            return 0 /* NONE_BEFORE */;
        }
        ol = this.clone();
        this.parentNode.appendChild(ol, this.siblingIndex);
        for (i = 0; i <= len; i++) {
            ol.appendChild(this.childNodes[0]);
        }
        return 3 /* BEFORE */;
    };
    HTML_BulletedList.prototype.breakAfterOption = function (option) {
        var i = 0, len = this.childNodes.length, ol;
        if (option.siblingIndex == this.childNodes.length - 1 || this.childNodes.length == 1) {
            return 1 /* NONE_AFTER */;
        }
        ol = this.clone();
        this.parentNode.appendChild(ol, this.siblingIndex + 1);
        for (i = option.siblingIndex + 1; i < len; i++) {
            ol.appendChild(this.childNodes[option.siblingIndex + 1], 0);
        }
        return 2 /* AFTER */;
    };
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
    HTML_OrderedList.prototype.breakBeforeOption = function (option) {
        var i = 0, len = option.siblingIndex - 1, ol;
        if (option.siblingIndex == 0 || this.childNodes.length == 1) {
            return 0 /* NONE_BEFORE */;
        }
        ol = this.clone();
        this.parentNode.appendChild(ol, this.siblingIndex);
        for (i = 0; i <= len; i++) {
            ol.appendChild(this.childNodes[0]);
        }
        return 3 /* BEFORE */;
    };
    HTML_OrderedList.prototype.breakAfterOption = function (option) {
        var i = 0, len = this.childNodes.length, ol;
        if (option.siblingIndex == this.childNodes.length - 1 || this.childNodes.length == 1) {
            return 1 /* NONE_AFTER */;
        }
        ol = this.clone();
        this.parentNode.appendChild(ol, this.siblingIndex + 1);
        for (i = option.siblingIndex + 1; i < len; i++) {
            ol.appendChild(this.childNodes[option.siblingIndex + 1], 0);
        }
        return 2 /* AFTER */;
    };
    return HTML_OrderedList;
})(TNode_Element);
var HTML_ListItem = (function (_super) {
    __extends(HTML_ListItem, _super);
    function HTML_ListItem() {
        _super.call(this);
        this.isSelectable = true;
        this.isBlockTextNode = true;
        this.nodeName = 'li';
        this.style.display('block');
        this.style.paddingLeft('15');
    }
    HTML_ListItem.prototype.paint = function (ctx, layout, scrollLeft, scrollTop) {
        _super.prototype.paint.call(this, ctx, layout, scrollLeft, scrollTop);
        /* If the parent is a OL, paint my number,
           otherwise paint a disk.
         */
        ctx.fillStyle = this.isPaintedSelected ? 'blue' : this.style.color();
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
    HTML_ListItem.prototype.becomeElement = function (elementName) {
        var breakResult, element;
        if (elementName == 'li') {
            return this;
        }
        // we must break the parent UL or OL when a LI becomes another element...
        // aditionally, if the elementName is a UL, or a LI, we must treat this case also ...
        if (!this.parentNode) {
            throw "ERR_NO_PARENT_NODE";
        }
        if (elementName == this.parentNode.nodeName) {
            return this;
        }
        if (elementName == 'ul' || elementName == 'ol') {
            switch (this.siblingIndex) {
                case 0:
                    // append before current list
                    element = this.documentElement.createElement(elementName);
                    this.parentNode.parentNode.appendChild(element, this.parentNode.siblingIndex);
                    element.appendChild(this);
                    break;
                case this.parentNode.childNodes.length - 1:
                    // append after
                    element = this.documentElement.createElement(elementName);
                    this.parentNode.parentNode.appendChild(element, this.parentNode.siblingIndex + 1);
                    element.appendChild(this);
                    element.parentNode.mergeAdjacentLists();
                    break;
                default:
                    // break current list and append after the first list
                    breakResult = this.parentNode.breakAfterOption(this);
                    element = this.documentElement.createElement(elementName);
                    this.parentNode.parentNode.appendChild(element, this.parentNode.siblingIndex + 1);
                    element.appendChild(this);
                    break;
            }
            this.parentNode.parentNode.mergeAdjacentLists();
            return this;
        }
        else {
            breakResult = this.parentNode.breakBeforeOption(this);
            element = this.documentElement.createElement(elementName);
            this.parentNode.parentNode.appendChild(element, this.parentNode.siblingIndex);
            element.mergeWith(this);
            element.parentNode.mergeAdjacentLists();
            return element;
        }
    };
    HTML_ListItem.prototype.createSurgery = function (atFragmentIndex, createNodeAfter, nodeNameAfter, hint) {
        if (createNodeAfter === void 0) { createNodeAfter = true; }
        if (nodeNameAfter === void 0) { nodeNameAfter = null; }
        if (hint === void 0) { hint = 0 /* NONE */; }
        var p = null;
        if (createNodeAfter && (nodeNameAfter === null || nodeNameAfter == 'li')) {
            if (this.textContents() == '' || this.textContents() == ' ') {
                p = this.becomeElement('p');
                this.documentElement.relayout(true);
                return p.FRAGMENT_START;
            }
            else {
                return _super.prototype.createSurgery.call(this, atFragmentIndex, createNodeAfter, nodeNameAfter, hint);
            }
        }
        else {
            return _super.prototype.createSurgery.call(this, atFragmentIndex, createNodeAfter, nodeNameAfter, hint);
        }
    };
    return HTML_ListItem;
})(TNode_Element);
var HTML_Superscript = (function (_super) {
    __extends(HTML_Superscript, _super);
    function HTML_Superscript() {
        _super.call(this);
        this.isDefragmentable = true;
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
        this.isDefragmentable = true;
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
        this.isMergeable = false;
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
        Helper.log('compiling table...');
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
        if (useParentLayout === void 0) { useParentLayout = null; }
        if (this.documentElement) {
            /* Creates a table layout, based on compiled information.
               This is a special layout, and is needed to display the cells of the table.
             */
            this.compile();
            var returnValue = new Layout_Block_Table(this, this.matrix);
            return returnValue;
        }
        else {
            return null;
        }
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
    HTML_Table.prototype.removeFromDOMAtUserCommand = function () {
        return false; // tables cannot be removed even if they are selected when the user press a removal key
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
        this.isMergeable = false;
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
    HTML_TableRow.prototype.removeFromDOMAtUserCommand = function () {
        return false; // table rows cannot be removed even if they are selected when the user press a removal key
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
        this.isSelectable = true;
        this.isBlockTextNode = true;
        this.insertLinePolicy = 0 /* BR */;
        this.alternateInsertLinePolicy = 0 /* BR */;
        this.isMergeable = false;
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
    HTML_TableCell.prototype.removeChild = function (node) {
        var returnValue = _super.prototype.removeChild.call(this, node);
        if (this.childNodes.length == 0) {
            this.appendChild(this.documentElement.createTextNode(' '));
        }
        return returnValue;
    };
    HTML_TableCell.prototype.removeFromDOMAtUserCommand = function () {
        this.removeAllChildNodes();
        this.appendChild(this.documentElement.createTextNode(' '));
        return true;
    };
    // a table cell cannot become other element type.
    HTML_TableCell.prototype.becomeElement = function (elementName) {
        return this;
    };
    return HTML_TableCell;
})(TNode_Element);
var HTML_NegationNode = (function (_super) {
    __extends(HTML_NegationNode, _super);
    function HTML_NegationNode(nodeName) {
        _super.call(this);
        this.isDefragmentable = true;
        this.isNegation = true;
        this.nodeName = '!' + nodeName;
        this.style.display('inline');
        switch (nodeName) {
            case 'b':
                this.style.fontWeight('normal');
                break;
            case 'i':
                this.style.fontStyle('normal');
                break;
            case 'u':
                this.style.textDecoration('none');
                break;
            case 'sup':
            case 'sub':
                this.style.verticalAlign('normal');
                break;
        }
    }
    return HTML_NegationNode;
})(TNode_Element);
var HTML_Font = (function (_super) {
    __extends(HTML_Font, _super);
    function HTML_Font() {
        _super.call(this);
        this.isDefragmentable = true;
        this._name = null;
        this.nodeName = 'font';
        this.style.display('inline');
    }
    HTML_Font.prototype.name = function (value) {
        if (value === void 0) { value = null; }
        if (value === null) {
            //getter
            return this._name || '';
        }
        else {
            //setter
            this._name = value || null;
            this.style.fontFamily(this._name || '');
            return value;
        }
    };
    HTML_Font.prototype.setAttribute = function (attributeName, attributeValue) {
        if (attributeValue === void 0) { attributeValue = null; }
        switch (attributeName) {
            case 'name':
                this.name(attributeValue || null);
                break;
            default:
                _super.prototype.setAttribute.call(this, attributeName, attributeValue || '');
                break;
        }
    };
    HTML_Font.prototype.xmlBeginning = function () {
        return '<font' + (this._name ? ' name="' + this._name + '"' : '') + '>';
    };
    HTML_Font.prototype.xmlEnding = function () {
        return '</font>';
    };
    HTML_Font.prototype.clone = function () {
        var returnValue = _super.prototype.clone.call(this);
        if (this._name) {
            returnValue.setAttribute('name', this._name);
        }
        return returnValue;
    };
    HTML_Font.prototype.canDefragmentWith = function (font) {
        return font.name() == this.name();
    };
    return HTML_Font;
})(TNode_Element);
var HTML_Color = (function (_super) {
    __extends(HTML_Color, _super);
    function HTML_Color() {
        _super.call(this);
        this.isDefragmentable = true;
        this._name = null;
        this.nodeName = 'color';
        this.style.display('inline');
    }
    HTML_Color.prototype.name = function (value) {
        if (value === void 0) { value = null; }
        if (value === null) {
            //getter
            return this._name || '';
        }
        else {
            //setter
            this._name = value || null;
            this.style.color(this._name || '');
            return value;
        }
    };
    HTML_Color.prototype.setAttribute = function (attributeName, attributeValue) {
        if (attributeValue === void 0) { attributeValue = null; }
        switch (attributeName) {
            case 'name':
                this.name(attributeValue || null);
                break;
            default:
                _super.prototype.setAttribute.call(this, attributeName, attributeValue || '');
                break;
        }
    };
    HTML_Color.prototype.xmlBeginning = function () {
        return '<color' + (this._name ? ' name="' + this._name + '"' : '') + '>';
    };
    HTML_Color.prototype.xmlEnding = function () {
        return '</color>';
    };
    HTML_Color.prototype.clone = function () {
        var returnValue = _super.prototype.clone.call(this);
        if (this._name) {
            returnValue.setAttribute('name', this._name);
        }
        return returnValue;
    };
    HTML_Color.prototype.canDefragmentWith = function (color) {
        return color.name() == this.name();
    };
    return HTML_Color;
})(TNode_Element);
var HTML_Size = (function (_super) {
    __extends(HTML_Size, _super);
    function HTML_Size() {
        _super.call(this);
        this.isDefragmentable = true;
        this._value = '';
        this.nodeName = 'size';
        this.style.display('inline');
    }
    HTML_Size.prototype.value = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            return this._value;
        }
        else {
            this.style.fontSize(this._value = (v || ''));
        }
    };
    HTML_Size.prototype.setAttribute = function (attributeName, attributeValue) {
        switch (attributeName) {
            case 'value':
                this.value(attributeValue);
                break;
            default:
                _super.prototype.setAttribute.call(this, attributeName, attributeValue);
                break;
        }
    };
    HTML_Size.prototype.clone = function () {
        var returnValue = _super.prototype.clone.call(this);
        if (this._value) {
            returnValue.setAttribute('value', this._value);
        }
        return returnValue;
    };
    HTML_Size.prototype.xmlBeginning = function () {
        return '<size' + ((this._value) ? ' value="' + this._value + '"' : '') + '>';
    };
    HTML_Size.prototype.xmlEnding = function () {
        return '</size>';
    };
    HTML_Size.prototype.canDefragmentWith = function (size) {
        return size.value() == this.value();
    };
    return HTML_Size;
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
        "Calibri",
        "Cambria",
        "Comic Sans MS",
        "Corbel",
        "Courier New",
        "Gabriola",
        "Georgia",
        "Impact",
        "Lucida Console",
        "Miriam",
        "Nyala",
        "Palatino Linotype",
        "Symbol",
        "Tahoma",
        "Times New Roman",
        "Trebuchet MS",
        "Verdana",
        "Webdings",
        "Wingdings"
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
        if (this.node.isBR) {
            this.isBR = true;
        }
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
            if (this.isBR) {
                return this.size = [0, (this.node && this.node.parentNode) ? this.node.parentNode.style.fontSize() : 0];
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
        }
    };
    Character.prototype.fragmentPosition = function () {
        var i = 0, len = 0, out = this.node.FRAGMENT_START;
        for (i = 0, len = this.index; i < len; i++) {
            out++;
            if (this.node.EOL_POS && this.node.EOL_POS[i]) {
                out++;
            }
        }
        return out;
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
        // <constructor> public maxWidth       : number = 0;     // physical width of the parent
        this.words = [];
        this.wordGap = 0.00;
        this.size = [0, 0]; // dimensions in pixels, [0]=>width, [1]=>height
        this.index = 0; // the line index
        this.owner = null; // initialized by creator
        this.fragmentIndexStart = null;
        this.fragmentIndexEnd = null;
    }
    // a line accepts a word either:
    // - if the line contains no words
    // - if the line width + the word width is smaller the the line max allowed physicalWidth
    Character_Line.prototype.acceptWord = function (w) {
        if (this.words.length && w.isBR) {
            return false;
        }
        else {
            return !!!(this.words[0]) || (this.size[0] + w.computeSize()[0] < this.maxWidth);
        }
    };
    Character_Line.prototype.addWord = function (w) {
        var size = w.computeSize();
        this.words.push(w);
        this.size[0] += size[0];
        this.size[1] = Math.max(size[1], this.size[1]);
        this.wordGap = (this.words.length > 2 && !this.words[0].isBR) ? ((this.maxWidth - this.size[0]) / (this.words.length - 1)) : 0.00;
    };
    Character_Line.prototype.buildIndexes = function () {
        var c, nWords;
        if (nWords = this.words.length) {
            c = this.words[0].characters[0];
            this.fragmentIndexStart = c.fragmentPosition();
            c = this.words[nWords - 1].characters[this.words[nWords - 1].characters.length - 1];
            this.fragmentIndexEnd = c.fragmentPosition();
            // add a +1 if line has EOL
            if (c.node.EOL_POS && c.node.EOL_POS[c.index]) {
                this.fragmentIndexEnd++;
            }
        }
        else {
            this.fragmentIndexStart = null;
            this.fragmentIndexEnd = null;
        }
    };
    Character_Line.prototype.toString = function () {
        var i = 0, len = this.words.length, out = '';
        for (i = 0; i < len; i++) {
            out += this.words[i].toString();
        }
        return out;
    };
    Character_Line.prototype.getFragmentPositionByAbsoluteX = function (caretX) {
        var layout = this.owner, ownerNode = layout.ownerNode(), align = ownerNode.style.textAlign() || 'left', lineHeight = ownerNode.style.lineHeight() || 0, paintX = 0, paintY = 0, useWordGap = false, i = 0, len = 0, j = 0, n = 0, size = [0, 0], charIndex = 0, c;
        switch (align) {
            case 'justified':
                useWordGap = true;
            case 'left':
                paintX = layout.offsetLeft;
                break;
            case 'right':
                paintX = layout.offsetLeft + (this.maxWidth - this.size[0]);
                break;
            case 'center':
                paintX = layout.offsetLeft + ((this.maxWidth / 2) - (this.size[0] / 2));
                break;
        }
        if (caretX < paintX) {
            return this.fragmentIndexStart;
        }
        if (caretX > layout.offsetLeft + layout.offsetWidth) {
            return this.fragmentIndexEnd;
        }
        for (i = 0, len = this.words.length; i < len; i++) {
            for (j = 0, n = this.words[i].characters.length; j < n; j++) {
                c = this.words[i].characters[j];
                size = c.computeSize();
                paintX += size[0];
                if (paintX > caretX) {
                    return this.words[i].characters[j].fragmentPosition();
                }
                charIndex++;
            }
            if (useWordGap) {
                paintX += this.wordGap;
            }
        }
        return this.fragmentIndexEnd;
    };
    return Character_Line;
})();
var Character_Word = (function () {
    function Character_Word(characters) {
        this.characters = characters;
        //<constructor> public characters: Character[];
        this.size = null;
        if (this.characters[0].isBR) {
            this.isBR = true;
        }
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
var Character_LinesCollection = (function () {
    function Character_LinesCollection() {
        this.count = 0;
        this.items = [];
    }
    Character_LinesCollection.prototype.reset = function () {
        var i = 0;
        for (i = 0; i < this.count; i++) {
            this.items[i] = null;
        }
        this.count = 0;
    };
    Character_LinesCollection.prototype.length = function () {
        return this.count;
    };
    Character_LinesCollection.prototype.add = function (line) {
        line.index = this.count;
        this.items[this.count] = line;
        this.count++;
        return line;
    };
    Character_LinesCollection.prototype.at = function (index) {
        if (!this.items[index]) {
            throw "ERR_INDEX_OUTSIDE_BOUNDS (" + index + ")";
        }
        if (this.items[index].fragmentIndexStart === null) {
            this.items[index].buildIndexes();
        }
        return this.items[index] || null;
    };
    return Character_LinesCollection;
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
        var node = this.ownerNode(), bestTarget = new TRange_Target(node, node.FRAGMENT_START), childTarget;
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
        this.lineIndexStart = 0;
    }
    Layout_BlockChar.prototype.addTextNode = function (node) {
        node.EOL_POS = null;
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
        var contents = this.textContents(), contentsWithWords = contents.replace(/([\S]+)([\s]+)?/g, '$1$2|'), len = contentsWithWords.length, word = [], words = [], line, ownerNode = this.ownerNode(), i = 0, j = 0, n = 0, w, c, chIndex = 0;
        for (i = 0; i < len; i++) {
            if (contentsWithWords[i] == contents[j]) {
                // if we find a break character, we create a new word.
                if (this.chars[j].isBR) {
                    if (word.length) {
                        words.push(new Character_Word(word));
                    }
                    word = [this.chars[j]];
                }
                else {
                    word.push(this.chars[j]);
                }
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
        this.lineIndexStart = ownerNode.documentElement.lines.length();
        for (i = 0, len = this.lines.length; i < len; i++) {
            this.lines[i].size[1] *= ownerNode.style.lineHeight();
            if ((n = this.lines[i].words.length)) {
                w = this.lines[i].words[n - 1];
                if ((n = w.characters.length)) {
                    c = w.characters[n - 1];
                    c.node.EOL_POS = c.node.EOL_POS || {};
                    c.node.EOL_POS[c.index] = 1;
                }
            }
            this.lines[i].owner = this;
            ownerNode.documentElement.lines.add(this.lines[i]);
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
    Layout_BlockChar.prototype.paintCaret = function (ctx, x, y, height, scrollLeft, scrollTop) {
        ctx.save();
        ctx.fillStyle = '#000';
        ctx.fillRect(Math.min(this.offsetLeft + this.offsetWidth, x - .5), y - 2, 2, (height + 2) * 1.12);
        ctx.restore();
    };
    Layout_BlockChar.prototype.paint = function (ctx, scrollLeft, scrollTop, viewport) {
        if (!this.isPaintable(viewport)) {
            return;
        }
        /*
        ctx.fillStyle = '#ddd';
        ctx.fillRect( this.offsetLeft - scrollLeft, this.offsetTop - scrollTop, this.offsetWidth, this.offsetHeight );
        */
        var i = 0, len = 0, node = this.ownerNode(), align = node.style.textAlign(), j = 0, n = 0, k = 0, l = 0, wordGap = (align == 'justified'), lineHeight = node.style.lineHeight(), lineDiff = 0, startY = this.offsetTop - scrollTop, startX = this.offsetLeft, currentNode = null, isUnderline = false, underlineWidth = 0.00, size, valign = 'normal', valignShift = 0, fragPos = 0, lastTextNode = null, range = node.documentElement.viewport.selection.getRange(), caret = range.focusNode(), saveColor = '', isPaintedSelected = node.isPaintedSelected;
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
                    if (lastTextNode != this.lines[i].words[j].characters[k].node) {
                        lastTextNode = this.lines[i].words[j].characters[k].node;
                        fragPos = lastTextNode.FRAGMENT_START;
                    }
                    // recompute text drawing settings each time the parentNode of the text node changes.
                    if (currentNode != this.lines[i].words[j].characters[k].node.parentNode) {
                        currentNode = this.lines[i].words[j].characters[k].node.parentNode;
                        ctx.font = currentNode.style.fontStyleText();
                        ctx.fillStyle = isPaintedSelected ? 'white' : (saveColor = currentNode.style.color());
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
                    if (caret && range.contains(fragPos) && !isPaintedSelected) {
                        ctx.fillStyle = DocSelection.$Colors.focus;
                        ctx.fillRect(startX, ~~startY, size[0] + (wordGap && (k == l - 1) && (i < len - 1) ? this.lines[i].wordGap : 0) + .5, ~~this.lines[i].size[1] + 1);
                        ctx.fillStyle = 'white';
                        ctx.fillText(this.lines[i].words[j].characters[k].letter(), startX, startY + lineDiff + valignShift);
                        if (isUnderline) {
                            ctx.fillRect(startX, ~~((startY + lineDiff) + 2 + valignShift), size[0] + (wordGap && (k == l - 1) && (i < len - 1) ? this.lines[i].wordGap : 0), underlineWidth);
                        }
                        ctx.fillStyle = saveColor;
                    }
                    else {
                        ctx.fillText(this.lines[i].words[j].characters[k].letter(), startX, startY + lineDiff + valignShift);
                        if (isUnderline) {
                            ctx.fillRect(startX, ~~((startY + lineDiff) + 2 + valignShift), size[0] + (wordGap && (k == l - 1) && (i < len - 1) ? this.lines[i].wordGap : 0), underlineWidth);
                        }
                    }
                    if (caret && caret.fragPos == fragPos) {
                        //paint caret @ this pos
                        this.paintCaret(ctx, startX, startY, lineDiff, scrollLeft, scrollTop);
                    }
                    startX += size[0];
                    fragPos++; // reached end of character, increment the fragment position
                }
                if (wordGap && (i < len - 1)) {
                    startX += this.lines[i].wordGap;
                }
            }
            if (caret && caret.fragPos == fragPos) {
                // paint caret @ this pos
                this.paintCaret(ctx, startX, startY, lineDiff, scrollLeft, scrollTop);
            }
            startY += this.lines[i].size[1];
            fragPos++; // reached end of line, increment the fragment position
        }
    };
    Layout_BlockChar.prototype.getTargetAtXY = function (point, boundsChecking) {
        if (boundsChecking === void 0) { boundsChecking = true; }
        var target = _super.prototype.getTargetAtXY.call(this, point, false), i = 0, len = 0, j = 0, n = 0, line = 0, lines = 0, bestLine = null, bestLineIndex = 0, startX = 0, startY = 0, bestCharLineIndex = 0, bestCharTargetIndex = 0, bestNode, align, wordGap = false, size, breakFor = false, relative, w, isLastLine = false;
        if (target !== null) {
            relative = {
                "x": point.x - this.offsetLeft,
                "y": point.y - this.offsetTop
            };
            bestCharTargetIndex = target.fragPos;
            for (line = 0, lines = this.lines.length; line < lines; line++) {
                if (relative.y >= startY) {
                    bestLine = this.lines[line];
                    bestLineIndex = line;
                    isLastLine = line == lines - 1;
                }
                else {
                    break;
                }
                startY += this.lines[line].size[1];
            }
            if (bestLine !== null) {
                align = target.target.style.textAlign();
                wordGap = align == 'justified' && !isLastLine;
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
                            w = size[0] + bestLine.wordGap;
                        }
                        else {
                            w = size[0];
                        }
                        if (((w / 2) + startX < point.x)) {
                            bestCharLineIndex++;
                            bestNode = bestLine.words[i].characters[j].node;
                            bestCharTargetIndex = bestLine.words[i].characters[j].fragmentPosition() + 1;
                            startX += w;
                        }
                        else {
                            bestNode = bestLine.words[i].characters[j].node;
                            bestCharTargetIndex = bestLine.words[i].characters[j].fragmentPosition();
                            breakFor = true;
                            break;
                        }
                    }
                    if (breakFor)
                        break;
                }
                target.target = bestNode;
                target.fragPos = bestCharTargetIndex;
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
        this.mouseDriver = null;
        this.keyboardDriver = null;
        this.router = null;
        this.context = this.canvas.getContext('2d');
        this.canvas.tabIndex = 0;
        this.canvas.setAttribute('data-object-type', 'html-viewport');
        (function (me) {
            me.painter = new Throttler(function () {
                if (me.document)
                    me.document.repaint();
                me.paintScrollbars();
            }, 10);
        })(this);
        this.document = new HTML_Body(this);
        this.selection = new DocSelection(this);
        this.width(_width === null ? this._width : _width);
        this.height(_height === null ? this._height : _height);
        this.mouseDriver = new Viewport_MouseDriver(this);
        this.keyboardDriver = new Viewport_KeyboardDriver(this);
        this.router = new Viewport_CommandRouter(this);
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
    // attempts to scroll the document to the last known painted caret position.
    // note that this is not guaranteed.
    Viewport.prototype.scrollToCaret = function () {
        var rng = this.selection.getRange(), focus = rng.focusNode(), details, lineIndex = 0, line;
        if (focus) {
            details = focus.details();
            if (!details) {
                return; // abort @this point
            }
            if (details.paintAbsolute.y - 20 < this._scrollTop) {
                this.scrollTop(details.paintAbsolute.y - 30);
            }
            else if (details.paintAbsolute.y + 82 > this._scrollTop + this._height) {
                this.scrollTop(details.paintAbsolute.y - this._height + 82);
            }
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
    Viewport.prototype.getTargetAtXY = function (point) {
        if (this.document && this.document._layout) {
            return this.document._layout.getTargetAtXY(point);
        }
        else
            return null;
    };
    Viewport.prototype.execCommand = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.router.dispatchCommand.call(this.router, command, args);
    };
    return Viewport;
})(Events);
var Viewport_MouseDriver = (function (_super) {
    __extends(Viewport_MouseDriver, _super);
    function Viewport_MouseDriver(viewport) {
        _super.call(this);
        this.viewport = null;
        this.mbPressed = false; // weather a mouse button is pressed
        this.viewport = viewport;
        (function (me) {
            me.viewport.canvas.addEventListener('mousewheel', function (DOMEvent) {
                me.viewport.scrollTop(me.viewport.scrollTop() + (DOMEvent.wheelDelta < 0 ? 12 : -12));
                DOMEvent.preventDefault();
                DOMEvent.stopPropagation();
            }, true);
            me.viewport.canvas.addEventListener('mousedown', function (DOMEvent) {
                me.onmousedown(DOMEvent);
            }, true);
            me.viewport.canvas.addEventListener('mousemove', function (DOMEvent) {
                me.onmousemove(DOMEvent);
            }, true);
            me.viewport.canvas.addEventListener('mouseup', function (DOMEvent) {
                me.onmouseup(DOMEvent);
            }, true);
            me.viewport.canvas.addEventListener('click', function (DOMEvent) {
                me.onmouseclick(DOMEvent);
            }, true);
            me.viewport.canvas.addEventListener('dblclick', function (DOMEvent) {
                me.onmousedblclick(DOMEvent);
            }, true);
            me.viewport.canvas.addEventListener('mouseout', function (DOMEvent) {
                me.onmouseout(DOMEvent);
            }, true);
            me.viewport.canvas.addEventListener('mouseover', function (DOMEvent) {
                me.onmouseover(DOMEvent);
            }, true);
        })(this);
    }
    Viewport_MouseDriver.prototype.translateMouseEventXY = function (DOMEvent) {
        return {
            "x": DOMEvent.offsetX + this.viewport.scrollLeft(),
            "y": DOMEvent.offsetY + this.viewport.scrollTop()
        };
    };
    Viewport_MouseDriver.prototype.onmousedown = function (DOMEvent) {
        var target = this.viewport.getTargetAtXY(this.translateMouseEventXY(DOMEvent));
        if (target) {
            window['$1'] = target.target;
            this.mbPressed = true;
            this.viewport.selection.anchorTo(target);
            this.fire('refocus');
        }
    };
    Viewport_MouseDriver.prototype.onmousemove = function (DOMEvent) {
        var target, point;
        target = this.viewport.getTargetAtXY(point = this.translateMouseEventXY(DOMEvent));
        this.viewport.canvas.style.cursor = (target && target.target.nodeType == 1 /* TEXT */) ? 'text' : 'default';
        if (this.mbPressed) {
            if (target)
                this.viewport.selection.focusTo(target);
            // scroll up or down if mouse is on top / bottom bound.
            // make the point absolute on canvas
            point.x -= this.viewport.scrollLeft();
            point.y -= this.viewport.scrollTop();
            if (point.y < 50 && this.viewport.scrollTop() > 0) {
                this.viewport.scrollTop(this.viewport.scrollTop() - 5);
            }
            else {
                if (point.y + 50 > this.viewport.height()) {
                    this.viewport.scrollTop(this.viewport.scrollTop() + 5);
                }
            }
        }
    };
    Viewport_MouseDriver.prototype.onmouseup = function (DOMEvent) {
        this.mbPressed = false;
    };
    Viewport_MouseDriver.prototype.onmouseclick = function (DOMEvent) {
    };
    Viewport_MouseDriver.prototype.onmousedblclick = function (DOMEvent) {
    };
    Viewport_MouseDriver.prototype.onmouseout = function (DOMEvent) {
        if (this.mbPressed)
            Viewport_MouseDriver.$BodyMouseUps.push(this);
    };
    Viewport_MouseDriver.prototype.onmouseover = function (DOMEvent) {
        var index = -1;
        if ((index = Viewport_MouseDriver.$BodyMouseUps.indexOf(this)) > -1) {
            Viewport_MouseDriver.$BodyMouseUps.splice(index, 1);
        }
    };
    Viewport_MouseDriver.$BodyMouseUps = [];
    return Viewport_MouseDriver;
})(Events);
window.addEventListener('load', function (DOMEvent) {
    if (document.body) {
        document.body.addEventListener('mouseup', function () {
            if (Viewport_MouseDriver) {
                for (var i = Viewport_MouseDriver.$BodyMouseUps.length - 1; i >= 0; i--) {
                    if (Viewport_MouseDriver.$BodyMouseUps[i].mbPressed) {
                        Viewport_MouseDriver.$BodyMouseUps[i].mbPressed = false;
                    }
                    Viewport_MouseDriver.$BodyMouseUps.splice(i, 1);
                }
            }
        }, false);
    }
});
var Viewport_KeyboardDriver = (function (_super) {
    __extends(Viewport_KeyboardDriver, _super);
    function Viewport_KeyboardDriver(viewport) {
        _super.call(this);
        this.viewport = null;
        this.pasteAdapter = document.createElement('div');
        this.focusedElement = 0 /* CANVAS */;
        this.viewport = viewport;
        this.pasteAdapter.tabIndex = 0;
        this.pasteAdapter.style.cssText = "width: 0px; height: 0px; display: block; opacity: 0; position: absolute; left: 0px; top: -40px";
        this.pasteAdapter.setAttribute('contenteditable', 'true');
        (function (me) {
            me.viewport.canvas.addEventListener('keydown', function (DOMEvent) {
                me.onkeydown(DOMEvent, 0 /* CANVAS */);
            }, true);
            me.viewport.canvas.addEventListener('keyup', function (DOMEvent) {
                me.onkeyup(DOMEvent, 0 /* CANVAS */);
            }, true);
            me.viewport.canvas.addEventListener('keypress', function (DOMEvent) {
                me.onkeypress(DOMEvent, 0 /* CANVAS */);
            }, true);
            me.pasteAdapter.addEventListener('keydown', function (DOMEvent) {
                me.onkeydown(DOMEvent, 1 /* PASTE_ADAPTER */);
            });
            me.pasteAdapter.addEventListener('keyup', function (DOMEvent) {
                me.onkeyup(DOMEvent, 1 /* PASTE_ADAPTER */);
            });
            me.pasteAdapter.addEventListener('keypress', function (DOMEvent) {
                me.onkeypress(DOMEvent, 1 /* PASTE_ADAPTER */);
            });
        })(this);
    }
    Viewport_KeyboardDriver.prototype.onkeyup = function (DOMEvent, eventSource) {
        if (eventSource == 1 /* PASTE_ADAPTER */ && DOMEvent.keyCode == 17) {
            document.body.removeChild(this.pasteAdapter);
            this.viewport.canvas.focus();
            console.log('kb: canvas');
            return;
        }
    };
    Viewport_KeyboardDriver.prototype.onkeypress = function (DOMEvent, eventSource) {
        var chr = String.fromCharCode(DOMEvent.charCode), key = DOMEvent.keyCode;
        if (!DOMEvent.ctrlKey && chr && chr != '\n') {
            this.viewport.execCommand(0 /* INSERT_TEXT */, chr);
        }
    };
    Viewport_KeyboardDriver.prototype.onkeydown = function (DOMEvent, eventSource) {
        if (eventSource == 0 /* CANVAS */ && DOMEvent.keyCode == 17) {
            document.body.appendChild(this.pasteAdapter);
            this.pasteAdapter.innerHTML = '';
            this.pasteAdapter.focus();
            return;
        }
        var cancelEvent = false;
        switch (DOMEvent.keyCode) {
            case 32:
                this.viewport.execCommand(0 /* INSERT_TEXT */, ' ');
                cancelEvent = true;
                break;
            case 9:
                cancelEvent = true;
                this.viewport.execCommand(DOMEvent.shiftKey ? 12 /* UNINDENT */ : 11 /* INDENT */);
                break;
            case 66:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(4 /* BOLD */);
                    cancelEvent = true;
                }
                break;
            case 73:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(5 /* ITALIC */);
                    cancelEvent = true;
                }
                break;
            case 85:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(6 /* UNDERLINE */);
                    cancelEvent = true;
                }
                break;
            case 76:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(7 /* ALIGN */, 'left');
                    cancelEvent = true;
                }
                break;
            case 69:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(7 /* ALIGN */, 'center');
                    cancelEvent = true;
                }
                break;
            case 74:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(7 /* ALIGN */, 'justified');
                    cancelEvent = true;
                }
                break;
            case 82:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(7 /* ALIGN */, 'right');
                    cancelEvent = true;
                }
                break;
            case 67:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(8 /* COPY */);
                    cancelEvent = true;
                }
                break;
            case 88:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(9 /* CUT */);
                    cancelEvent = true;
                }
                break;
            case 86:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(10 /* PASTE */);
                    cancelEvent = true;
                }
                break;
            case 189:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(17 /* SIZE */, '-1');
                    cancelEvent = true;
                }
                break;
            case 107:
            case 187:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(17 /* SIZE */, '+1');
                    cancelEvent = true;
                }
                break;
            case 13:
            case 10:
                if (!DOMEvent.ctrlKey) {
                    this.viewport.execCommand(2 /* NEW_LINE */, DOMEvent.shiftKey);
                    cancelEvent = true;
                }
                break;
            case 46:
                if (!DOMEvent.ctrlKey && !DOMEvent.shiftKey) {
                    this.viewport.execCommand(1 /* DELETE_TEXT */, 1);
                    cancelEvent = true;
                }
                break;
            case 8:
                if (!DOMEvent.ctrlKey && !DOMEvent.shiftKey) {
                    this.viewport.execCommand(1 /* DELETE_TEXT */, -1);
                    cancelEvent = true;
                }
                break;
            case 36:
                if (!DOMEvent.ctrlKey) {
                    this.viewport.execCommand(3 /* MOVE */, 0 /* LINE_HORIZONTAL */, -1, DOMEvent.shiftKey);
                    cancelEvent = true;
                }
                break;
            case 35:
                if (!DOMEvent.ctrlKey) {
                    this.viewport.execCommand(3 /* MOVE */, 0 /* LINE_HORIZONTAL */, 1, DOMEvent.shiftKey);
                    cancelEvent = true;
                }
                break;
            case 37:
                if (!DOMEvent.ctrlKey) {
                    this.viewport.execCommand(3 /* MOVE */, 2 /* CHARACTER */, -1, DOMEvent.shiftKey);
                }
                else {
                    this.viewport.execCommand(3 /* MOVE */, 3 /* WORD */, -1, DOMEvent.shiftKey);
                }
                cancelEvent = true;
                break;
            case 39:
                if (!DOMEvent.ctrlKey) {
                    this.viewport.execCommand(3 /* MOVE */, 2 /* CHARACTER */, 1, DOMEvent.shiftKey);
                }
                else {
                    this.viewport.execCommand(3 /* MOVE */, 3 /* WORD */, 1, DOMEvent.shiftKey);
                }
                cancelEvent = true;
                break;
            case 38:
                if (!DOMEvent.ctrlKey) {
                    this.viewport.execCommand(3 /* MOVE */, 1 /* LINE_VERTICAL */, -1, DOMEvent.shiftKey);
                    cancelEvent = true;
                }
                break;
            case 40:
                if (!DOMEvent.ctrlKey) {
                    this.viewport.execCommand(3 /* MOVE */, 1 /* LINE_VERTICAL */, 1, DOMEvent.shiftKey);
                    cancelEvent = true;
                }
                break;
            case 33:
                if (!DOMEvent.ctrlKey) {
                    this.viewport.execCommand(3 /* MOVE */, 4 /* VIEWPORT */, -1, DOMEvent.shiftKey);
                    cancelEvent = true;
                }
                break;
            case 34:
                if (!DOMEvent.ctrlKey) {
                    this.viewport.execCommand(3 /* MOVE */, 4 /* VIEWPORT */, 1, DOMEvent.shiftKey);
                    cancelEvent = true;
                }
                break;
            default:
                break;
        }
        if (cancelEvent) {
            DOMEvent.preventDefault();
            DOMEvent.stopPropagation();
        }
    };
    return Viewport_KeyboardDriver;
})(Events);
var Viewport_CommandRouter = (function (_super) {
    __extends(Viewport_CommandRouter, _super);
    function Viewport_CommandRouter(viewport) {
        _super.call(this);
        this.caretX = null;
        this.viewport = viewport;
        (function (me) {
            me.viewport.mouseDriver.on('refocus', function () {
                this.caretX = null;
            });
        })(this);
    }
    Viewport_CommandRouter.prototype.commandName = function (command) {
        switch (command) {
            case 0 /* INSERT_TEXT */:
                return 'insertText';
                break;
            case 1 /* DELETE_TEXT */:
                return 'deleteText';
                break;
            case 2 /* NEW_LINE */:
                return 'newLine';
                break;
            case 3 /* MOVE */:
                return 'moveCaret';
                break;
            case 4 /* BOLD */:
                return 'bold';
                break;
            case 5 /* ITALIC */:
                return 'italic';
                break;
            case 6 /* UNDERLINE */:
                return 'underline';
                break;
            case 7 /* ALIGN */:
                return 'align';
                break;
            case 8 /* COPY */:
                return 'copy';
                break;
            case 9 /* CUT */:
                return 'cut';
                break;
            case 10 /* PASTE */:
                return 'paste';
                break;
            case 11 /* INDENT */:
                return 'indent';
                break;
            case 12 /* UNINDENT */:
                return 'unindent';
                break;
            case 13 /* VALIGN */:
                return 'verticalAlign';
                break;
            case 14 /* FONT */:
                return 'setFont';
                break;
            case 15 /* COLOR */:
                return 'setColor';
                break;
            case 16 /* BGCOLOR */:
                return 'setBgColor';
                break;
            case 17 /* SIZE */:
                return 'setSize';
                break;
            case 18 /* BLOCK_LEVEL */:
                return 'setBlockLevel';
                break;
            case 19 /* LIST */:
                return 'list';
                break;
            default:
                throw "ERR_UNKNOWN_COMMAND";
                break;
        }
    };
    Viewport_CommandRouter.prototype.ensureArgs = function (args, minArgs, maxArgs) {
        return args && args.length >= minArgs && args.length <= maxArgs;
    };
    Viewport_CommandRouter.prototype.dispatchCommand = function (command, args) {
        var commandName = this.commandName(command);
        //console.log( 'dispatchCommand: ' + commandName + '(' + JSON.stringify( args ) + ')' );
        if (this.caretX != null && (command != 3 /* MOVE */)) {
            this.caretX = null;
        }
        switch (command) {
            case 0 /* INSERT_TEXT */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " require 1 argument of type string[1]";
                }
                else {
                    this.insertText(String(args[0]));
                }
                break;
            case 1 /* DELETE_TEXT */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " require 1 argument of type integer";
                }
                else {
                    this.deleteText(~~args[0]);
                }
                break;
            case 2 /* NEW_LINE */:
                if (!this.ensureArgs(args, 0, 1)) {
                    throw "Command: " + commandName + " require a maximum 1 argument of type boolean";
                }
                else {
                    if (args.length == 1) {
                        this.newLine(!!args[0]);
                    }
                    else {
                        this.newLine();
                    }
                }
                break;
            case 3 /* MOVE */:
                if (!this.ensureArgs(args, 3, 3)) {
                    throw "Command: " + commandName + " require 3 arguments of type CaretPos, int, boolean.";
                }
                else {
                    this.moveCaret(args[0], args[1], args[2]);
                }
                break;
            case 4 /* BOLD */:
                if (!this.ensureArgs(args, 0, 1)) {
                    throw "Command: " + commandName + " require one optional argument of type boolean.";
                }
                else {
                    this.bold(args.length ? !!args[0] : null);
                }
                break;
            case 5 /* ITALIC */:
                if (!this.ensureArgs(args, 0, 1)) {
                    throw "Command: " + commandName + " require one optional argument of type boolean.";
                }
                else {
                    this.italic(args.length ? !!args[0] : null);
                }
                break;
            case 6 /* UNDERLINE */:
                if (!this.ensureArgs(args, 0, 1)) {
                    throw "Command: " + commandName + " require one optional argument of type boolean.";
                }
                else {
                    this.underline(args.length ? !!args[0] : null);
                }
                break;
            case 7 /* ALIGN */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " require a single string argument.";
                }
                else {
                    this.align(String(args[0]));
                }
                break;
            case 8 /* COPY */:
                if (!this.ensureArgs(args, 0, 0)) {
                    throw "Command: " + commandName + " doesn't require any arguments!";
                }
                else {
                    this.copy();
                }
                break;
            case 9 /* CUT */:
                if (!this.ensureArgs(args, 0, 0)) {
                    throw "Command: " + commandName + " doesn't require any arguments!";
                }
                else {
                    this.cut();
                }
                break;
            case 10 /* PASTE */:
                if (!this.ensureArgs(args, 0, 2)) {
                    throw "Command: " + commandName + " require 2 optional args of type string!";
                }
                else {
                    this.paste(args.length == 0 ? null : String(args[0]), args.length == 2 ? args[1] : null);
                }
                break;
            case 11 /* INDENT */:
                if (!this.ensureArgs(args, 0, 1)) {
                    throw "Command: " + commandName + " requires a single optional number argument!";
                }
                else {
                    this.indent(args.length ? ~~args[0] : null);
                }
                break;
            case 12 /* UNINDENT */:
                if (!this.ensureArgs(args, 0, 1)) {
                    throw "Command: " + commandName + " requires a single optional number argument!";
                }
                else {
                    this.unindent(args.length ? ~~args[0] : null);
                }
                break;
            case 13 /* VALIGN */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single argument of type string!";
                }
                else {
                    this.valign(String(args[0] || 'normal'));
                }
                break;
            case 14 /* FONT */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single string argument!";
                }
                else {
                    this.font(String(args[0] || "Arial"));
                }
                break;
            case 15 /* COLOR */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single argument!";
                }
                else {
                    this.color(String(args[0] || ''));
                }
                break;
            case 16 /* BGCOLOR */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single argument!";
                }
                else {
                    this.bgColor(String(args[0] || ''));
                }
                break;
            case 17 /* SIZE */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single argument of type string!";
                }
                else {
                    this.size(String(args[0] || ''));
                }
                break;
            case 18 /* BLOCK_LEVEL */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single argument of type string!";
                }
                else {
                    this.blockLevel(String(args[0] || ''));
                }
                break;
            case 19 /* LIST */:
                if (!this.ensureArgs(args, 2, 2)) {
                    throw "Command: " + commandName + " requires two arguments: string, boolean";
                }
                else {
                    this.list(String(args[0] || 'ul'), !!args[1]);
                }
                break;
            default:
                throw "ERR_UNKNOWN_COMMAND";
                break;
        }
    };
    // inserts a string @ caret position.
    Viewport_CommandRouter.prototype.insertText = function (str) {
        str = String(str || '');
        if (!str) {
            return;
        }
        var range = this.viewport.selection.getRange(), focus = range.focusNode(), len = str.length, nowPos, jump = 0, otherNode = false;
        if (!focus) {
            return;
        }
        // clear existing selection if any.
        if (this.viewport.selection.getRange().length()) {
            this.viewport.selection.removeContents();
            range = this.viewport.selection.getRange();
            focus = range.focusNode();
        }
        //console.log( 'before: ' + focus.fragPos + ' => ' + JSON.stringify( this.viewport.document.fragment.sliceDebug( ( nowPos = focus.fragPos - 10 ), 20, focus.fragPos ) ) );
        // find the target text node offset
        jump = focus.target.insertTextAtTargetOffset(focus.fragPos, str);
        if (jump < 0) {
            jump = -jump;
            otherNode = true; // we've inserted text into a br, which redirected the text. we need
        }
        this.viewport.document.relayout(true);
        if (!otherNode) {
            focus.fragPos = focus.target.textIndexToFragmentPosition(jump);
        }
        else {
            focus.fragPos = focus.target.textIndexToFragmentPosition(jump);
            focus.target = focus.target.documentElement.findNodeAtIndex(focus.fragPos);
        }
        //console.log( 'after: ' + focus.fragPos + ' => ' + JSON.stringify( this.viewport.document.fragment.sliceDebug( ( nowPos ), 20, focus.fragPos ) ) + ', jump = ' + jump );
        range.collapse(true);
    };
    // negative values delete characters in the left of the caret,
    // positive values delete characters in the right of the caret
    Viewport_CommandRouter.prototype.deleteText = function (amount) {
        if (!amount) {
            return;
        }
        var document = this.viewport.document, selection = this.viewport.selection, rng = selection.getRange(), focus = rng.focusNode(), anchor = rng.anchorNode(), cursorPosition = 0, newCursorPosition = 0, fragment = this.viewport.document.fragment, at = null, i = 0, j = 0, n = 0, added = false, increment = 0, atMax = fragment.length(), traversedTextNodes = [], node = null, lock = null, chars = 0, sourceBlockElement, destinationBlockElement, mergeOrder, mergePosition = 0, collection = null;
        if (rng.length()) {
            this.viewport.selection.removeContents();
            return;
        }
        else {
            if (rng.length() === null) {
                if (anchor.target && anchor.target.nodeType == 2 /* ELEMENT */) {
                    // create lock before target
                    lock = fragment.createLockTarget(anchor.target.FRAGMENT_START + 1, 0 /* FROM_BEGINNING_OF_DOCUMENT */);
                    if (anchor.target.removeFromDOMAtUserCommand()) {
                        document.relayout(true);
                        document.removeOrphanNodes();
                        selection.anchorTo(lock.getTarget());
                        selection.fire('changed');
                        return;
                    }
                }
                return;
            }
            else {
                // deny deleting more than a character @ once.
                if (Math.abs(amount) != 1) {
                    throw "ERR_BAD_ARGUMENT. Allowed argument is -1 or 1.";
                }
            }
        }
        /* Ensure we're positioned on a character */
        if (amount > 0) {
            rng.moveRightUntilCharacterIfNotLandedOnText();
        }
        else {
            rng.moveLeftUntilCharacterIfNotLandedOnText();
        }
        /* Store cursor position */
        cursorPosition = focus.fragPos;
        sourceBlockElement = focus.target.ownerBlockElement();
        destinationBlockElement = null;
        if (amount < 0) {
            increment = -1;
        }
        else {
            increment = 1;
        }
        i = cursorPosition;
        while ((chars != amount) && (i > 0) && (i < atMax)) {
            if (increment < 0)
                i += increment;
            at = fragment.at(i);
            if (at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */) {
                newCursorPosition = i; // store the cursor position
                node = fragment.getNodeAtIndex(i) || null;
                if (node == null || node.nodeType != 1 /* TEXT */) {
                    throw "ASSERTION_FAILED!";
                }
                chars += increment;
                added = false;
                for (j = 0, n = traversedTextNodes.length; j < n; j++) {
                    if (traversedTextNodes[j].node == node) {
                        if (i < traversedTextNodes[j].start) {
                            traversedTextNodes[j].start = i;
                        }
                        else {
                            traversedTextNodes[j].stop = i;
                        }
                        added = true;
                        break;
                    }
                }
                if (!added) {
                    destinationBlockElement = node.ownerBlockElement();
                    if (destinationBlockElement != sourceBlockElement && (!destinationBlockElement.isMergeable || !sourceBlockElement.isMergeable)) {
                        return;
                    }
                    traversedTextNodes.push({
                        node: node,
                        start: i,
                        stop: i
                    });
                }
            }
            if (increment > 0)
                i += increment;
        }
        if (traversedTextNodes.length == 0) {
            Helper.warn('no text to be deleted');
            //no text to be deleted.
            return;
        }
        // create a lock @ new cursor position.
        if (amount < 0) {
            lock = fragment.createLockTarget(newCursorPosition, 0 /* FROM_BEGINNING_OF_DOCUMENT */, 'Remove' + amount);
        }
        else {
            lock = fragment.createLockTarget(cursorPosition, 1 /* FROM_ENDING_OF_DOCUMENT */, 'Remove' + amount);
        }
        // HACK 2 on caretLock ...
        lock.canCancelEOL = false;
        if (destinationBlockElement != sourceBlockElement && destinationBlockElement !== null && destinationBlockElement.isMergeable && sourceBlockElement.isMergeable) {
            //console.warn( "MERGE BEGIN" );
            if (amount < 0) {
                mergePosition = 1; // 1 = at end
                mergeOrder = [destinationBlockElement, sourceBlockElement];
            }
            else {
                mergePosition = 1; // 0 = at beginning
                mergeOrder = [sourceBlockElement, destinationBlockElement];
            }
            //console.log( 'append: ' + mergeOrder[1].xmlBeginning() + " in " + mergeOrder[0].xmlBeginning() + " at: " + ( mergePosition == 1 ? "beginning" : "end" ) );
            if (mergeOrder[1] != document) {
                collection = new TNode_Collection(mergeOrder[1].childNodes);
                if (mergeOrder[1].parentNode == mergeOrder[0]) {
                    mergeOrder[0].appendCollection(collection, mergeOrder[1].siblingIndex + mergePosition == 1 ? 1 : 0);
                }
                else {
                    mergeOrder[0].appendCollection(collection, mergePosition == 1 ? null : 0);
                }
                this.viewport.document.removeOrphanNodes();
                if (destinationBlockElement.nodeName == 'li') {
                    destinationBlockElement.parentNode.parentNode.mergeAdjacentLists();
                }
                else if (sourceBlockElement.nodeName == 'li') {
                    sourceBlockElement.parentNode.parentNode.mergeAdjacentLists();
                }
            }
        }
        // if we did a merging, we're not doing the locking
        if (collection === null) {
            for (i = 0, n = traversedTextNodes.length; i < n; i++) {
                traversedTextNodes[i].node.deleteTextContentsBetweenFragmentPositions(traversedTextNodes[i].start, traversedTextNodes[i].stop);
                if (traversedTextNodes[i].node.textContents() == '') {
                    traversedTextNodes[i].node.remove(); // remove text node if has no text anymore
                }
            }
        }
        //remove all the orphan nodes from the document.
        this.viewport.document.removeOrphanNodes();
        // relayout *RIGHT NOW* the document
        this.viewport.document.relayout(true);
        // finally, move the cursor.
        selection.anchorTo(lock.getTarget());
    };
    // inserts a new line in document. if forceBRTag is set (not null)
    // a <br> tag will be inserted instead of creating a new paragraph.
    Viewport_CommandRouter.prototype.newLine = function (alternateMethod) {
        if (alternateMethod === void 0) { alternateMethod = null; }
        if (this.viewport.selection.getRange()) {
            this.viewport.selection.removeContents();
        }
        var rng = this.viewport.selection.getRange(), len = rng.length(), focus = rng.focusNode(), anchor = rng.anchorNode(), target = focus || anchor, targetNode = target.target.ownerBlockElement(), method, index = target.fragPos, jumpPosition = 0;
        // no target node, no new line ...
        if (targetNode === null) {
            return;
        }
        if (!alternateMethod) {
            //default
            method = targetNode.insertLinePolicy;
        }
        else {
            method = targetNode.alternateInsertLinePolicy;
        }
        if (method == 0 /* BR */) {
            jumpPosition = targetNode.createSurgery(index, false);
            // we're expecting that the jump position is a node begin.
            target.target = this.viewport.document.findNodeAtIndex(jumpPosition);
            target.fragPos = jumpPosition;
            var breakElement = this.viewport.document.createElement('br');
            // append the break *before* the target.target.
            target.target.parentNode.appendChild(breakElement, target.fragPos == target.target.FRAGMENT_END ? target.target.siblingIndex + 1 : target.target.siblingIndex);
            // force relayout;
            this.viewport.document.relayout(true);
            jumpPosition = breakElement.FRAGMENT_START;
            target.target = breakElement;
        }
        else {
            jumpPosition = targetNode.createSurgery(index, true, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(targetNode.nodeName) >= 0 ? 'p' : targetNode.nodeName);
            target.target = this.viewport.document.findNodeAtIndex(jumpPosition);
            target.fragPos = jumpPosition;
        }
        while (jumpPosition < this.viewport.document.fragment.length() && [3 /* CHARACTER */, 4 /* WHITE_SPACE */, 2 /* EOL */].indexOf(this.viewport.document.fragment.at(jumpPosition)) == -1) {
            jumpPosition++;
        }
        target.target = this.viewport.document.findNodeAtIndex(jumpPosition);
        target.fragPos = jumpPosition;
        rng.collapse(true);
    };
    // moves the caret, and optionally extends the selection to the
    // new caret position.
    Viewport_CommandRouter.prototype.moveCaret = function (movementType, amount, expandSelection) {
        if (this.caretX && movementType != 1 /* LINE_VERTICAL */) {
            this.caretX = null;
        }
        var range = this.viewport.selection.getRange(), focus = range.focusNode(), lineIndex, lines, line;
        if (range.length() == null || !focus) {
            return;
        }
        else {
            if (!expandSelection) {
                range.collapse(true);
            }
        }
        range.setEventingState(false);
        try {
            switch (movementType) {
                case 2 /* CHARACTER */:
                    focus.moveByCharacters(amount);
                    if (!expandSelection) {
                        range.collapse(true);
                    }
                    this.viewport.scrollToCaret();
                    this.viewport.document.requestRepaint();
                    break;
                case 3 /* WORD */:
                    focus.moveByWords(amount);
                    if (!expandSelection) {
                        range.collapse(true);
                    }
                    this.viewport.scrollToCaret();
                    this.viewport.document.requestRepaint();
                    break;
                case 4 /* VIEWPORT */:
                    break;
                case 0 /* LINE_HORIZONTAL */:
                    if (Math.abs(amount) != 1) {
                        throw "Allowed values are -1 or 1.";
                    }
                    lineIndex = focus.getLineIndex();
                    if (lineIndex) {
                        lines = this.viewport.document.lines;
                        line = lines.at(lineIndex);
                        focus.fragPos = line[amount == -1 ? "fragmentIndexStart" : "fragmentIndexEnd"];
                        focus.target = this.viewport.document.findNodeAtIndex(focus.fragPos);
                        if (!expandSelection) {
                            range.collapse(true);
                        }
                        this.viewport.scrollToCaret();
                        this.viewport.document.requestRepaint();
                    }
                    break;
                case 1 /* LINE_VERTICAL */:
                    if (Math.abs(amount) != 1) {
                        throw "Allowed values are -1 or 1.";
                    }
                    lineIndex = focus.getLineIndex();
                    if (lineIndex !== null) {
                        lines = this.viewport.document.lines;
                        line = lines.at(lineIndex);
                        if (this.caretX === null) {
                            this.caretX = focus.details().paintAbsolute.x;
                        }
                        try {
                            line = lines.at(lineIndex + amount);
                        }
                        catch (jumpException) {
                            //console.warn( 'jumpException' );
                            return;
                        }
                        focus.fragPos = line.getFragmentPositionByAbsoluteX(this.caretX);
                        focus.target = this.viewport.document.findNodeAtIndex(focus.fragPos);
                        if (!expandSelection) {
                            range.collapse(true);
                        }
                        this.viewport.scrollToCaret();
                        this.viewport.document.requestRepaint();
                    }
                    break;
            }
        }
        catch (moveError) {
        }
        range.setEventingState(true);
        range.fire('changed');
    };
    // sets the boldness of the text. if state is null, then the boldness is toggled.
    Viewport_CommandRouter.prototype.bold = function (state) {
        if (state === void 0) { state = null; }
        var selection = this.viewport.selection, rng = selection.getRange(), len = rng.length();
        if (!len) {
            return;
        }
        if (state === null) {
            state = !(this.viewport.selection.editorState.state.bold);
        }
        if (state) {
            this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!b').unwrapFromElement('b').wrapInElement('b', null, null, function () {
                return this.style.fontWeight() != 'bold';
            }).end();
        }
        else {
            this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!b').unwrapFromElement('b').wrapInElement('!b', null, null, function () {
                return this.style.fontWeight() == 'bold';
            }).end();
        }
        this.viewport.selection.editorState.compute();
    };
    // makes text italic or not. if state is null, the state is toggled.
    Viewport_CommandRouter.prototype.italic = function (state) {
        if (state === void 0) { state = null; }
        var selection = this.viewport.selection, rng = selection.getRange(), len = rng.length();
        if (!len) {
            return;
        }
        if (state === null) {
            state = !(this.viewport.selection.editorState.state.italic);
        }
        if (state) {
            this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!i').unwrapFromElement('i').wrapInElement('i', null, null, function () {
                return this.style.fontStyle() != 'italic';
            }).end();
        }
        else {
            this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!i').unwrapFromElement('i').wrapInElement('!i', null, null, function () {
                return this.style.fontStyle() == 'italic';
            }).end();
        }
        this.viewport.selection.editorState.compute();
    };
    // underlines or not the text. if state is null, the state is toggled.
    Viewport_CommandRouter.prototype.underline = function (state) {
        if (state === void 0) { state = null; }
        var selection = this.viewport.selection, rng = selection.getRange(), len = rng.length();
        if (!len) {
            return;
        }
        if (state === null) {
            state = !(this.viewport.selection.editorState.state.underline);
        }
        if (state) {
            this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!u').unwrapFromElement('u').wrapInElement('u', null, null, function () {
                return this.style.textDecoration() != 'underline';
            }).end();
        }
        else {
            this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!u').unwrapFromElement('u').wrapInElement('!u', null, null, function () {
                return this.style.textDecoration() == 'underline';
            }).end();
        }
        this.viewport.selection.editorState.compute();
    };
    // sets the text alignment.
    // @param alignment: string = enum( 'left', 'right', 'center', 'justified' ).
    // any other values will be considered "left".
    Viewport_CommandRouter.prototype.align = function (alignment) {
        if (alignment === void 0) { alignment = 'left'; }
        var nodes = this.viewport.selection.getRange().affectedBlockNodes(), i, len;
        for (i = 0, len = nodes.length; i < len; i++) {
            nodes[i].style.textAlign(alignment);
        }
        if (nodes.length)
            this.viewport.selection.editorState.compute();
    };
    // copies the selection into the clipboard.
    Viewport_CommandRouter.prototype.copy = function () {
    };
    // cuts the selection into the clipboard.
    Viewport_CommandRouter.prototype.cut = function () {
    };
    // pastes a text of format contentType.
    // @content: string. if null, the content from the clipboard will be 
    // used instead.
    // @contentType: the type of the content. allowed values can be "text" or "html".
    Viewport_CommandRouter.prototype.paste = function (content, contentType) {
        if (content === void 0) { content = null; }
        if (contentType === void 0) { contentType = null; }
    };
    // indents text with a number of tabs on the left. A tab width is 20px.
    Viewport_CommandRouter.prototype.indent = function (tabs) {
        if (tabs === void 0) { tabs = null; }
    };
    // unindents text with a number of tabs on the left. A tab width is 20px.
    Viewport_CommandRouter.prototype.unindent = function (tabs) {
        if (tabs === void 0) { tabs = null; }
    };
    // sets the text alignment as "sup", "sub", or "normal".
    // "sup" stands for superscript
    // "sub" stands for subscript
    Viewport_CommandRouter.prototype.valign = function (verticalAlignmentType) {
        if (verticalAlignmentType === void 0) { verticalAlignmentType = 'normal'; }
    };
    // sets the font of the text.
    Viewport_CommandRouter.prototype.font = function (fontFamily) {
        if (fontFamily === void 0) { fontFamily = "Arial"; }
        var selection = this.viewport.selection, rng = selection.getRange(), len = rng.length();
        if (!len) {
            return;
        }
        this.viewport.selection.getRange().affectedRanges().unwrapFromElement('font').wrapInElement('font', 'name', fontFamily, function () {
            return fontFamily ? this.style.fontFamily() != fontFamily : false;
        }).end();
        this.viewport.selection.editorState.compute();
    };
    // sets the color of the selected text. if empty value
    // is used, color is removed.
    Viewport_CommandRouter.prototype.color = function (colorName) {
        if (colorName === void 0) { colorName = ""; }
        var selection = this.viewport.selection, rng = selection.getRange(), len = rng.length();
        if (!len) {
            return;
        }
        this.viewport.selection.getRange().affectedRanges().unwrapFromElement('color').wrapInElement('color', 'name', colorName, function () {
            return colorName ? this.style.color() != colorName : false;
        }).end();
        this.viewport.selection.editorState.compute();
    };
    // sets the backgroundColor of the selected text. if empty value
    // is used, color is removed.
    //
    // BETA NOTE: background will be set to root elements, not inline.
    Viewport_CommandRouter.prototype.bgColor = function (colorName) {
        if (colorName === void 0) { colorName = ""; }
        var selection = this.viewport.selection, rng = selection.getRange(), nodes = rng.affectedBlockNodes(), i = 0, len = nodes.length;
        for (i = 0; i < len; i++) {
            nodes[i].setAttribute('bgcolor', colorName);
        }
        this.viewport.selection.editorState.compute();
    };
    // sets the font size. value can be also relative
    // using + or -. Eg: fontSize( "+1" ) will increase the text size
    // with 1 value.
    Viewport_CommandRouter.prototype.size = function (fontSize) {
        if (fontSize === void 0) { fontSize = ''; }
        var selection = this.viewport.selection, rng = selection.getRange(), len = rng.length();
        if (!len) {
            return;
        }
        this.viewport.selection.getRange().affectedRanges().unwrapFromElement('size').wrapInElement('size', 'value', fontSize, function () {
            return fontSize ? String(this.style.fontSize()) != fontSize : false;
        }).end();
        this.viewport.selection.editorState.compute();
    };
    // wraps into ul or ol the blocks.
    Viewport_CommandRouter.prototype.list = function (listType, on) {
        if (on === void 0) { on = true; }
        console.log('command: LIST[' + listType + ']');
    };
    // sets the affected block nodes to be "normal", or "h1".."h6"
    Viewport_CommandRouter.prototype.blockLevel = function (blockType) {
        if (["normal", "h1", "h2", "h3", "h4", "h5", "h6", "h7"].indexOf(blockType) == -1) {
            throw "Invalid block type!";
        }
        var selection = this.viewport.selection, rng = selection.getRange(), nodes = rng.affectedBlockNodes(), i = 0, len = nodes.length;
        rng.save();
        for (i = 0; i < len; i++) {
            switch (blockType) {
                case 'normal':
                    if (['p', 'ol', 'ul', 'li', 'td', 'table', 'tr', 'body'].indexOf(nodes[i].nodeName) == -1) {
                        nodes[i].becomeElement('p');
                    }
                    break;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                case 'h7':
                    if (nodes[i].nodeName != blockType) {
                        nodes[i].becomeElement(blockType);
                    }
                    break;
            }
        }
        rng.restore();
    };
    return Viewport_CommandRouter;
})(Events);
var Fragment = (function () {
    function Fragment(document) {
        this._at = [];
        this._length = 0;
        this._doc = null;
        if (!document) {
            throw "ERR_BAD_DOCUMENT";
        }
        else {
            this._doc = document;
        }
    }
    Fragment.prototype.document = function () {
        return this._doc;
    };
    Fragment.prototype.reset = function () {
        this._length = 0;
    };
    // returns a part of the fragment, for debugging purposes
    Fragment.prototype.slice = function (index, length) {
        var out = [], i = 0;
        for (i = 0; i < length; i++) {
            out.push(this._at[index + i]);
        }
        return out;
    };
    Fragment.prototype.sliceDebug = function (index, length, cursorPos) {
        if (cursorPos === void 0) { cursorPos = null; }
        if (index < 0) {
            index = 0;
        }
        var s = '';
        s = this.slice(index, length).join('').replace(new RegExp(String(0 /* NODE_START */), 'g'), '<').replace(new RegExp(String(1 /* NODE_END */), 'g'), '>').replace(new RegExp(String(3 /* CHARACTER */), 'g'), '*').replace(new RegExp(String(4 /* WHITE_SPACE */), 'g'), ' ').replace(new RegExp(String(2 /* EOL */), 'g'), '|');
        if (cursorPos) {
            s = s.substr(0, cursorPos - index) + '_' + s.substr(cursorPos - index);
        }
        return s;
    };
    Fragment.prototype.add = function (what, index) {
        if (index === void 0) { index = null; }
        if (index == null) {
            this._at[this._length++] = what;
        }
        else {
            if (index < this._length) {
                this._at[index] = what;
            }
            else {
                this._length = index + 1;
                this._at[index] = what;
            }
        }
    };
    Fragment.prototype.at = function (index, value) {
        if (value === void 0) { value = null; }
        if (index < 0 || index >= this._length) {
            throw "OFFSET_OUT_BOUNDS ( requested: " + index + ", allowedMin: 0, allowedMax: " + (this._length - 1) + ")";
        }
        else {
            if (value === null) {
                return this._at[index] == void 0 ? null : this._at[index];
            }
            else {
                this.add(value, index);
            }
        }
    };
    Fragment.prototype.length = function (value) {
        if (value === void 0) { value = null; }
        if (value == null) {
            return this._length;
        }
        else {
            if (value < 0) {
                throw "OFFSET_OUT_BOUNDS";
            }
            else {
                this._length = value;
            }
        }
    };
    Fragment.prototype.getNodeAtIndex = function (index) {
        return this._doc.findNodeAtIndex(index);
    };
    Fragment.prototype.createTargetAt = function (pos) {
        var i = 0, element;
        switch (pos) {
            case 0 /* DOC_BEGIN */:
                for (i = 0; i < this._length; i++) {
                    if (this._at[i] == 2 /* EOL */ || this._at[i] == 3 /* CHARACTER */ || this._at[i] == 4 /* WHITE_SPACE */) {
                        element = this.getNodeAtIndex(i);
                        return new TRange_Target(element, i);
                    }
                }
                break;
            case 1 /* DOC_END */:
                for (i = this._length - 1; i >= 0; i--) {
                    if (this._at[i] == 2 /* EOL */ || this._at[i] == 3 /* CHARACTER */ || this._at[i] == 4 /* WHITE_SPACE */) {
                        element = this.getNodeAtIndex(i);
                        return new TRange_Target(element, i);
                    }
                }
                break;
            default:
                throw "ERR_ILLEGAL_POS_DESCRIPTOR";
                break;
        }
        return null;
    };
    Fragment.prototype.getIndexAt = function (pos) {
        var i = 0;
        switch (pos) {
            case 0 /* DOC_BEGIN */:
                for (i = 0; i < this._length; i++) {
                    if (this._at[i] == 2 /* EOL */ || this._at[i] == 3 /* CHARACTER */ || this._at[i] == 4 /* WHITE_SPACE */) {
                        return i;
                    }
                }
                break;
            case 1 /* DOC_END */:
                for (i = this._length - 1; i >= 0; i--) {
                    if (this._at[i] == 2 /* EOL */ || this._at[i] == 3 /* CHARACTER */ || this._at[i] == 4 /* WHITE_SPACE */) {
                        return i;
                    }
                }
                break;
            default:
                throw "ERR_ILLEGAL_POS_DESCRIPTOR";
                break;
        }
        return null;
    };
    Fragment.prototype.createLockTarget = function (at, direction, lockName) {
        if (lockName === void 0) { lockName = null; }
        return new Fragment_CaretLock(this, at, direction, lockName);
    };
    return Fragment;
})();
var Fragment_CaretLock = (function () {
    function Fragment_CaretLock(fragment, lockIndex, direction, lockName) {
        if (direction === void 0) { direction = 0 /* FROM_BEGINNING_OF_DOCUMENT */; }
        if (lockName === void 0) { lockName = 'Lock'; }
        this.lockName = lockName;
        this.chars = 0;
        this.lockIndex = 0;
        this.startedEOL = false;
        this.canCancelEOL = true;
        var at, i = 0, len = 0, n = 0;
        this.fragment = fragment;
        this.lockIndex = lockIndex;
        this.chars = 0;
        this.direction = direction;
        if (direction == 1 /* FROM_ENDING_OF_DOCUMENT */) {
            if (this.lockIndex < this.fragment.length() - 2 && this.fragment.at(this.lockIndex + 1) == 2 /* EOL */) {
                this.startedEOL = true;
            }
        }
        if (direction == 0 /* FROM_BEGINNING_OF_DOCUMENT */) {
            for (i = 0; i <= lockIndex; i++) {
                at = this.fragment.at(i);
                if (at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */) {
                    len++;
                }
            }
            i = lockIndex + 1;
            n = this.fragment.length();
            while (i < n) {
                at = this.fragment.at(i);
                if (at == 2 /* EOL */) {
                    this.startedEOL = true;
                    break;
                }
                else {
                    if (at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */) {
                        break;
                    }
                }
                i++;
            }
            this.chars = len;
        }
        else {
            for (i = this.fragment.length() - 1; i > lockIndex; i--) {
                at = this.fragment.at(i);
                if (at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */) {
                    len++;
                }
            }
            this.chars = len;
        }
        /*

        if ( this.startedEOL ) {
            console.error( this.lockName + ' startedEOL @ ' + this.lockIndex );
        } else {
            console.error( this.lockName + ' started NOTEOL @ ' + this.lockIndex + ' ' + this.direction );
        }

        console.info( this.lockName + ' has ' + this.chars + ' chars' );
        */
    }
    Fragment_CaretLock.prototype.getTarget = function () {
        var at, i = 0, len = 0, n = 0, incChars = 0, chars = this.chars;
        if (this.direction == 0 /* FROM_BEGINNING_OF_DOCUMENT */) {
            for (i = 0, len = this.fragment.length(); i < len; i++) {
                at = this.fragment.at(i);
                if (at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */ || (at == 2 /* EOL */ && n == chars - 1)) {
                    if (at == 2 /* EOL */ && n == chars - 1) {
                        // HACK 1: There is a particular case in which we should not consider this particular case :)) hehe
                        // HACK 2 (when HACK 1 should not work): Found a 2nd particular case of this particular case when we should not cancel ... :(
                        if (this.fragment.at(i + 1) == 1 /* NODE_END */ && this.fragment.getNodeAtIndex(i + 1).isBlockTextNode) {
                            if (this.canCancelEOL)
                                continue;
                        }
                    }
                    n++;
                    if (n == chars) {
                        if (this.startedEOL && at != 2 /* EOL */) {
                            n = i + 1;
                            while (n < len) {
                                at = this.fragment.at(n);
                                if (at == 2 /* EOL */) {
                                    break;
                                }
                                else {
                                    if (at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */) {
                                        // gotcha
                                        i = n;
                                        break;
                                    }
                                }
                                n++;
                            }
                        }
                        return new TRange_Target(this.fragment.getNodeAtIndex(i), i);
                    }
                }
            }
            return this.fragment.createTargetAt(1 /* DOC_END */);
        }
        else {
            for (i = this.fragment.length() - 1; i >= 0; i--) {
                at = this.fragment.at(i);
                if (at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */) {
                    n++;
                    if (n == chars) {
                        if (this.startedEOL) {
                            n = i - 1;
                            while (n >= 0) {
                                at = this.fragment.at(n);
                                if (at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */) {
                                    break;
                                }
                                else {
                                    if (at == 2 /* EOL */) {
                                        i = n;
                                        break;
                                    }
                                }
                                n--;
                            }
                        }
                        return new TRange_Target(this.fragment.getNodeAtIndex(i), i);
                    }
                }
            }
            return this.fragment.createTargetAt(0 /* DOC_BEGIN */);
        }
    };
    return Fragment_CaretLock;
})();
var Fragment_Contextual = (function () {
    function Fragment_Contextual(fragment, indexStart, indexEnd, isEmpty) {
        if (indexStart === void 0) { indexStart = 0; }
        if (indexEnd === void 0) { indexEnd = 0; }
        if (isEmpty === void 0) { isEmpty = false; }
        this.fragment = fragment;
        this.isEmpty = isEmpty;
        this.start = 0;
        this.end = 0;
        this.parts = [];
        var tmp = 0;
        if (indexStart > indexEnd) {
            tmp = indexStart;
            indexStart = indexEnd;
            indexEnd = tmp;
        }
        this.start = indexStart;
        this.end = indexEnd;
    }
    // compute the parts of the contextual fragment.
    Fragment_Contextual.prototype.compute = function () {
        var i = 0, currentNode = null, element = null, at, iStart = 0, iStop = 0;
        if (this.isEmpty) {
            return;
        }
        this.parts = [];
        for (i = this.start; i <= this.end; i++) {
            at = this.fragment.at(i);
            switch (at) {
                case 0 /* NODE_START */:
                    if (currentNode !== null) {
                        this.parts.push(new Fragment_Contextual_TextNode(currentNode, iStart, iStop));
                        currentNode = null;
                    }
                    this.parts.push(new Fragment_Contextual_NodeStart(element = this.fragment.getNodeAtIndex(i)));
                    break;
                case 1 /* NODE_END */:
                    if (currentNode !== null) {
                        this.parts.push(new Fragment_Contextual_TextNode(currentNode, iStart, iStop));
                        currentNode = null;
                    }
                    this.parts.push(new Fragment_Contextual_NodeEnd(element = this.fragment.getNodeAtIndex(i)));
                    currentNode = null;
                    break;
                case 2 /* EOL */:
                case 3 /* CHARACTER */:
                case 4 /* WHITE_SPACE */:
                    //console.log( i, at == FragmentItem.EOL ? 'eol' : ( at == FragmentItem.CHARACTER ? 'chr' : 'ws' ) );
                    if (currentNode === null) {
                        currentNode = this.fragment.getNodeAtIndex(i);
                        iStart = i;
                        iStop = i;
                    }
                    else {
                        iStop = i;
                    }
                    break;
            }
        }
        if (currentNode !== null) {
            if (!currentNode.isBR) {
                this.parts.push(new Fragment_Contextual_TextNode(currentNode, iStart, iStop));
            }
            currentNode = null;
        }
    };
    Fragment_Contextual.prototype.affectedTextNodes = function () {
        var out = [], i, len;
        this.compute();
        for (i = 0, len = this.parts.length; i < len; i++) {
            if (this.parts[i].type == 2 /* TEXT */) {
                out.push(this.parts[i].node);
            }
        }
        return out;
    };
    Fragment_Contextual.prototype.affectedBlockNodes = function () {
        var out = [], i, len, node;
        this.compute();
        for (i = 0, len = this.parts.length; i < len; i++) {
            switch (this.parts[i].type) {
                case 1 /* NODE_END */:
                    node = this.parts[i].node;
                    if (['tr', 'table'].indexOf(node.nodeName) >= 0) {
                        continue;
                    }
                    else {
                        node = node.ownerBlockElement();
                    }
                    break;
                case 0 /* NODE_START */:
                    node = this.parts[i].node;
                    if (['tr', 'table'].indexOf(node.nodeName) >= 0) {
                        continue;
                    }
                    else {
                        node = node.ownerBlockElement();
                    }
                    break;
                case 2 /* TEXT */:
                    node = this.parts[i].node.ownerBlockElement();
                    break;
            }
            if (node.nodeName == 'body') {
                Helper.warn(this.parts[i]);
            }
            if (out.indexOf(node) == -1) {
                out.push(node);
            }
        }
        out.sort(function (a, b) {
            return a.FRAGMENT_START - b.FRAGMENT_START;
        });
        return out;
    };
    Fragment_Contextual.prototype.createDettachedCollection = function (items, ownerBlockElement) {
        var allChildNodesSnapshot = [], i = 0, len = ownerBlockElement.childNodes.length, surgeryStart = 0, surgeryEnd = 0;
        for (i = 0; i < len; i++) {
            allChildNodesSnapshot.push(ownerBlockElement.childNodes[i]);
        }
        // reduce the list with the items with the first and last nodes only
        if (items.length > 2) {
            items = [items[0], items[items.length - 1]];
        }
        if (items.length == 1) {
            /* If we have only a single item in the dettached collection and this one is not a text node, we return
               an empty collection */
            if (items[0].type != 2 /* TEXT */) {
                return null;
            }
            surgeryStart = items[0].start;
            surgeryEnd = items[0].end;
        }
        else {
            switch (items[0].type) {
                case 2 /* TEXT */:
                    surgeryStart = items[0].start;
                    break;
                case 0 /* NODE_START */:
                    surgeryStart = items[0].node.FRAGMENT_START;
                    break;
                case 1 /* NODE_END */:
                    surgeryStart = items[0].node.FRAGMENT_END;
                    break;
            }
            switch (items[1].type) {
                case 2 /* TEXT */:
                    surgeryEnd = items[1].end;
                    break;
                case 0 /* NODE_START */:
                    surgeryEnd = items[1].node.FRAGMENT_START;
                    break;
                case 1 /* NODE_END */:
                    surgeryEnd = items[1].node.FRAGMENT_END;
                    break;
            }
        }
        return new TNode_Collection_Dettached(ownerBlockElement, surgeryStart, surgeryEnd);
    };
    /* The affected ranges returns an array of collections with the child nodes
       of the block elements from the selection. This is usefull when we want to
       enclose the text in <b><i><u><sup><sub><font><color> tags
     */
    Fragment_Contextual.prototype.affectedRanges = function () {
        var collection = null, previousBlockNode = null, currentBlockNode, tempBlockNode, node, i = 0, len = 0, j = 0, n = 0, k = 0, returnValue = [], currentSet = [], ranges = [], subLength = 0;
        this.compute();
        for (i = 0, len = this.parts.length; i < len; i++) {
            switch (this.parts[i].type) {
                case 2 /* TEXT */:
                    node = this.parts[i].node;
                    currentBlockNode = node.ownerBlockElement();
                    break;
                case 0 /* NODE_START */:
                    node = this.parts[i].node;
                    currentBlockNode = node.ownerBlockElement();
                    break;
                case 1 /* NODE_END */:
                    node = this.parts[i].node;
                    currentBlockNode = node.ownerBlockElement();
                    break;
            }
            if (currentBlockNode != previousBlockNode) {
                currentSet = [];
                // node changed, find if the whole node is in our parts
                subLength = 1;
                for (j = i + 1; j < len; j++) {
                    switch (this.parts[j].type) {
                        case 2 /* TEXT */:
                            tempBlockNode = this.parts[j].node.ownerBlockElement();
                            break;
                        case 0 /* NODE_START */:
                            tempBlockNode = this.parts[j].node.ownerBlockElement();
                            break;
                        case 1 /* NODE_END */:
                            tempBlockNode = this.parts[j].node.ownerBlockElement();
                            break;
                    }
                    if (tempBlockNode == currentBlockNode) {
                        subLength++;
                    }
                    else {
                        break;
                    }
                }
                for (k = i; k < i + subLength; k++) {
                    currentSet.push(this.parts[k]);
                }
                ranges.push({
                    "parent": currentBlockNode,
                    "set": currentSet
                });
                i += subLength - 1;
                previousBlockNode = currentBlockNode;
            }
        }
        for (i = 0, len = ranges.length; i < len; i++) {
            returnValue.push(this.createDettachedCollection(ranges[i].set, ranges[i].parent));
        }
        returnValue = Helper.filter(returnValue, function (item) {
            return item != null;
        });
        this.fragment.document().canRelayout = false;
        for (i = 0, len = returnValue.length; i < len; i++) {
            returnValue[i].createSlices();
        }
        this.fragment.document().canRelayout = true;
        this.fragment.document().relayout(true);
        for (i = 0, len = returnValue.length; i < len; i++) {
            returnValue[i].createRanges();
        }
        return returnValue;
    };
    Fragment_Contextual.prototype.toString = function (format, closeTags) {
        if (format === void 0) { format = 'text/html'; }
        if (closeTags === void 0) { closeTags = false; }
        this.compute();
        var out = [''], stack = 0, i = 0, len = 0, flush = [];
        if (format == 'text/html' || format == null || format == 'html' || format == '') {
            if (!closeTags) {
                for (i = 0, len = this.parts.length; i < len; i++) {
                    out.push(this.parts[i].toString());
                }
            }
            else {
                for (i = 0, len = this.parts.length; i < len; i++) {
                    out.push(this.parts[i].toString());
                    switch (this.parts[i].type) {
                        case 2 /* TEXT */:
                            break;
                        case 0 /* NODE_START */:
                            stack++;
                            flush.push(this.parts[i].node);
                            break;
                        case 1 /* NODE_END */:
                            if (stack == 0) {
                                out.unshift(this.parts[i].node.xmlBeginning());
                            }
                            else {
                                stack--;
                                flush.pop();
                            }
                            break;
                    }
                }
                while (flush.length > 0) {
                    out.push(flush.pop().xmlEnding());
                }
            }
        }
        else if (format == 'text/plain' || format == 'text') {
            var blockNodeNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'tr', 'p', 'ul', 'li', 'table'];
            for (i = 0, len = this.parts.length; i < len; i++) {
                switch (this.parts[i].type) {
                    case 2 /* TEXT */:
                        out.push(this.parts[i].toString());
                        break;
                    case 1 /* NODE_END */:
                        if (blockNodeNames.indexOf(this.parts[i].node.nodeName) >= 0) {
                            out.push("\n\n");
                        }
                        else if (this.parts[i].node.nodeName == 'td') {
                            out.push('\t|\t');
                        }
                        break;
                }
            }
        }
        else
            throw "Invalid format. Allowed 'text/html' and 'text/plain' as first argument.";
        return out.join('');
    };
    // this should erase the contents of the fragment from the document, and mark the fragment as unusable...
    Fragment_Contextual.prototype.remove = function () {
        this.compute();
        /* Find all the "whole" and the "partial" nodes from the fragment. */
        var wholeNodes = [], partialNodes = [], i = 0, j = 0, len = this.parts.length, found = null, sp = [], el1, el2;
        for (var spi = 0, spl = this.parts.length; spi < spl; spi++) {
            switch (this.parts[spi].type) {
                case 0 /* NODE_START */:
                    sp.push(this.parts[spi]);
                    break;
                case 1 /* NODE_END */:
                    sp.push(this.parts[spi]);
                    break;
                case 2 /* TEXT */:
                    if (!/^([\s]+)?$/.test(this.parts[spi].toString())) {
                        sp.push(this.parts[spi]);
                    }
                    break;
            }
            if (sp.length > 2) {
                break;
            }
        }
        if (sp.length == 2 && sp[0].type == 1 /* NODE_END */ && sp[1].type == 0 /* NODE_START */) {
            el1 = sp[0].node;
            el2 = sp[1].node;
            if (el1.isMergeable && el2.isMergeable) {
                for (i = 0, len = this.parts.length; i < len; i++) {
                    if (this.parts[i].type == 2 /* TEXT */) {
                        this.parts[i].removeSelectedText();
                    }
                }
                el1.mergeWith(el2);
                return;
            }
        }
        while (i < len) {
            switch (this.parts[i].type) {
                case 2 /* TEXT */:
                    if (this.parts[i].isWholeNode()) {
                        wholeNodes.push(this.parts[i]);
                    }
                    else {
                        partialNodes.push(this.parts[i]);
                    }
                    i++;
                    break;
                case 1 /* NODE_END */:
                    partialNodes.push(this.parts[i]);
                    i++;
                    break;
                case 0 /* NODE_START */:
                    found = null;
                    for (j = i + 1; j < len; j++) {
                        if (this.parts[j].type == 1 /* NODE_END */ && this.parts[i].node == this.parts[j].node) {
                            found = j;
                            break;
                        }
                    }
                    if (found) {
                        wholeNodes.push(this.parts[i]);
                        i = found + 1;
                    }
                    else {
                        partialNodes.push(this.parts[i]);
                        i++;
                    }
                    break;
            }
        }
        for (i = 0, len = wholeNodes.length; i < len; i++) {
            wholeNodes[i].removeFromDocument();
        }
        for (i = 0, len = partialNodes.length; i < len; i++) {
            if (partialNodes[i].type == 2 /* TEXT */) {
                partialNodes[i].removeSelectedText();
            }
        }
    };
    return Fragment_Contextual;
})();
var Fragment_Contextual_Item = (function () {
    function Fragment_Contextual_Item() {
        this.type = null;
    }
    Fragment_Contextual_Item.prototype.toString = function () {
        throw "ABSTRACT_METHOD";
    };
    Fragment_Contextual_Item.prototype.removeFromDocument = function () {
        throw "ABSTRACT_METHOD";
    };
    return Fragment_Contextual_Item;
})();
var Fragment_Contextual_NodeStart = (function (_super) {
    __extends(Fragment_Contextual_NodeStart, _super);
    function Fragment_Contextual_NodeStart(node) {
        _super.call(this);
        this.node = node;
        this.type = 0 /* NODE_START */;
    }
    Fragment_Contextual_NodeStart.prototype.toString = function () {
        return this.node.xmlBeginning();
    };
    Fragment_Contextual_NodeStart.prototype.removeFromDocument = function () {
        this.node.remove();
    };
    return Fragment_Contextual_NodeStart;
})(Fragment_Contextual_Item);
var Fragment_Contextual_NodeEnd = (function (_super) {
    __extends(Fragment_Contextual_NodeEnd, _super);
    function Fragment_Contextual_NodeEnd(node) {
        _super.call(this);
        this.node = node;
        this.type = 1 /* NODE_END */;
    }
    Fragment_Contextual_NodeEnd.prototype.toString = function () {
        return this.node.xmlEnding();
    };
    Fragment_Contextual_NodeEnd.prototype.removeFromDocument = function () {
        this.node.remove();
    };
    return Fragment_Contextual_NodeEnd;
})(Fragment_Contextual_Item);
var Fragment_Contextual_TextNode = (function (_super) {
    __extends(Fragment_Contextual_TextNode, _super);
    function Fragment_Contextual_TextNode(node, start, end) {
        if (start === void 0) { start = null; }
        if (end === void 0) { end = null; }
        _super.call(this);
        this.node = node;
        this.start = start;
        this.end = end;
        this.type = 2 /* TEXT */;
    }
    Fragment_Contextual_TextNode.prototype.isWholeNode = function () {
        return this.node.textContents() == this.node.textContentsFragment(this.start, this.end);
    };
    Fragment_Contextual_TextNode.prototype.toString = function () {
        return this.node.textContentsFragment(this.start, this.end);
    };
    Fragment_Contextual_TextNode.prototype.removeFromDocument = function () {
        this.node.remove();
    };
    Fragment_Contextual_TextNode.prototype.removeSelectedText = function () {
        this.node.deleteTextContentsBetweenFragmentPositions(this.start, this.end);
    };
    return Fragment_Contextual_TextNode;
})(Fragment_Contextual_Item);
var Fragment_Batch = (function () {
    function Fragment_Batch(range, items) {
        this.ended = false;
        this.range = range;
        this.items = items;
    }
    Fragment_Batch.prototype.wrapInElement = function (elementName, elAttributeName, elAttributeValue, ifFunc) {
        if (elAttributeName === void 0) { elAttributeName = null; }
        if (elAttributeValue === void 0) { elAttributeValue = null; }
        if (ifFunc === void 0) { ifFunc = null; }
        if (this.ended) {
            throw "ERR_BATCH_ENDED";
        }
        for (var i = 0, len = this.items.length; i < len; i++) {
            this.items[i].wrapInElement(elementName, elAttributeName, elAttributeValue, ifFunc);
        }
        return this;
    };
    Fragment_Batch.prototype.unwrapFromElement = function (elementName, ifFunc) {
        if (ifFunc === void 0) { ifFunc = null; }
        if (this.ended) {
            throw "ERR_BATCH_ENDED";
        }
        for (var i = 0, len = this.items.length; i < len; i++) {
            this.items[i].unwrapFromElement(elementName, ifFunc);
        }
        return this;
    };
    Fragment_Batch.prototype.end = function () {
        if (this.ended) {
            throw "ERR_BATCH_ENDED";
        }
        this.ended = true;
        for (var i = 0, len = this.items.length; i < len; i++) {
            this.items[i].reInsert();
            this.items[i].parentNode.defragment();
        }
        this.range.restore();
        return this;
    };
    Fragment_Batch.prototype.debug = function () {
        console.info('Batch: ' + this.items.length + ' ranges');
        for (var i = 0, len = this.items.length; i < len; i++) {
            console.info('Range #' + i + ': parent[' + this.items[i].parentNode.FRAGMENT_START + ',' + this.items[i].parentNode.FRAGMENT_END + ']: ' + this.items[i].parentNode.xmlBeginning() + ', nodes: ' + this.items[i].length + ':');
            console.log('    "' + this.items[i].toString('"\n     "') + '"');
        }
    };
    return Fragment_Batch;
})();
var TRange = (function (_super) {
    __extends(TRange, _super);
    function TRange(target) {
        _super.call(this);
        this._anchorNode = null;
        this._focusNode = null;
        this._anchorLock = null;
        this._focusLock = null;
        if (!target) {
            throw "ERR_BAD_CONSTRUCTOR_ARG";
        }
        this._anchorNode = target;
        this._focusNode = (this._anchorNode.target.nodeType == 1 /* TEXT */) ? this._anchorNode.clone() : null;
        (function (me) {
            if (me._anchorNode) {
                me._anchorNode.on('changed', function () {
                    me.fire('changed');
                });
            }
            if (me._focusNode) {
                me._focusNode.on('changed', function () {
                    me.fire('changed');
                });
            }
        })(this);
    }
    TRange.prototype.anchorNode = function () {
        return this._anchorNode;
    };
    TRange.prototype.focusNode = function () {
        return this._focusNode;
    };
    TRange.prototype.isCollapsed = function () {
        return this._focusNode === null || (this._anchorNode.fragPos == this._focusNode.fragPos);
    };
    TRange.prototype.type = function () {
        if (this._anchorNode.target.nodeType == 1 /* TEXT */ && this._focusNode !== null) {
            return 0 /* TEXT */;
        }
        else {
            return 1 /* ELEMENT */;
        }
    };
    // a null value represents that the length is not available for this range
    TRange.prototype.length = function () {
        if (this._focusNode === null) {
            return null;
        }
        else {
            return this._focusNode.fragPos - this._anchorNode.fragPos;
        }
    };
    // set selection to focusNode (atEnd = true) or anchorNode (atEnd = false).
    TRange.prototype.collapse = function (atEnd) {
        if (atEnd === void 0) { atEnd = false; }
        if (atEnd) {
            if (this._focusNode) {
                this._anchorNode = this.cloneTarget(this._focusNode);
            }
        }
        else {
            if (this._focusNode) {
                this._focusNode = this.cloneTarget(this._anchorNode);
            }
        }
        this.fire('changed');
    };
    TRange.prototype.cloneTarget = function (fromTarget) {
        var target = fromTarget.clone();
        (function (me) {
            target.on('changed', function () {
                me.fire('changed');
            });
        })(this);
        return target;
    };
    TRange.prototype.equalsNode = function (node) {
        return this._focusNode === null && this._anchorNode.target === node;
    };
    TRange.prototype.contains = function (fragmentIndex) {
        if (this._focusNode && this._anchorNode && !this.isCollapsed()) {
            var minIndex = Math.min(this._focusNode.fragPos, this._anchorNode.fragPos), maxIndex = Math.max(this._focusNode.fragPos, this._anchorNode.fragPos);
            if (this._focusNode.fragPos > this._anchorNode.fragPos) {
                maxIndex--;
            }
            return fragmentIndex >= minIndex && fragmentIndex <= maxIndex + (this._focusNode.fragPos < this._anchorNode.fragPos ? -1 : 0);
        }
        else
            return false;
    };
    // if the range has anchor and focus, return the common parent of the nodes of the
    // range. otherwise return the parent node of the range.
    TRange.prototype.getCommonParent = function () {
        if (this._focusNode === null) {
            return this._anchorNode.target.parentNode;
        }
        else {
            if (this._anchorNode.target == this._focusNode.target) {
                return this._anchorNode.target.parentNode;
            }
            else {
                var parentsA = [], parentsB = [], i = 0, cursor, found = null;
                cursor = this._anchorNode.target.parentNode;
                while (cursor) {
                    parentsA.unshift(cursor);
                    cursor = cursor.parentNode;
                }
                cursor = this._focusNode.target.parentNode;
                while (cursor) {
                    parentsB.unshift(cursor);
                    cursor = cursor.parentNode;
                }
                i = 0;
                while (parentsA[i] && parentsB[i] && parentsA[i] === parentsB[i]) {
                    found = parentsA[i];
                    i++;
                }
                return found;
            }
        }
    };
    TRange.prototype.createContextualFragment = function () {
        if (this._focusNode === null) {
            return new Fragment_Contextual(this._anchorNode.target.documentElement.fragment, this._anchorNode.target.FRAGMENT_START, this._anchorNode.target.FRAGMENT_END, false);
        }
        else {
            var minIndex = Math.min(this._focusNode.fragPos, this._anchorNode.fragPos), maxIndex = Math.max(this._focusNode.fragPos, this._anchorNode.fragPos), isEmpty = minIndex == maxIndex;
            if (this._focusNode.fragPos > this._anchorNode.fragPos) {
                maxIndex--;
            }
            maxIndex += (this._focusNode.fragPos < this._anchorNode.fragPos ? -1 : 0);
            return new Fragment_Contextual(this._anchorNode.target.documentElement.fragment, minIndex, maxIndex, isEmpty);
        }
    };
    /* Note: DO NOT USE THIS METHOD DIRECTLY.
       
       Instead, use Selection.removeContents, as that method should
       invalidate this range after deletion and create another valid
       range.
     */
    TRange.prototype.removeContents = function () {
        if (this._focusNode === null) {
            this._anchorNode.target.remove();
            return true;
        }
        else {
            if (this.length() !== null) {
                var fragment = this.createContextualFragment();
                fragment.remove();
                return true;
            }
            else {
                return false;
            }
        }
    };
    TRange.prototype.affectedBlockNodes = function () {
        if (!this._focusNode || !this.length()) {
            return [this._anchorNode.target.ownerBlockElement()];
        }
        return this.createContextualFragment().affectedBlockNodes();
    };
    TRange.prototype.save = function () {
        var fragment = this._anchorNode.target.documentElement.fragment;
        if (this._focusNode) {
            this._focusLock = new Fragment_CaretLock(fragment, this._focusNode.fragPos + (this._focusNode.fragPos <= this._anchorNode.fragPos ? 0 : -1), this._focusNode.fragPos <= this._anchorNode.fragPos ? 0 /* FROM_BEGINNING_OF_DOCUMENT */ : 1 /* FROM_ENDING_OF_DOCUMENT */, 'Focus');
            this._anchorLock = new Fragment_CaretLock(fragment, this._anchorNode.fragPos + (this.length() < 0 ? -1 : 0), !this.length() ? this._focusLock.direction : (this._focusLock.direction == 0 /* FROM_BEGINNING_OF_DOCUMENT */ ? 1 /* FROM_ENDING_OF_DOCUMENT */ : 0 /* FROM_BEGINNING_OF_DOCUMENT */), 'Anchor');
        }
        else {
            this._anchorLock = new Fragment_CaretLock(fragment, this._anchorNode.fragPos, 0 /* FROM_BEGINNING_OF_DOCUMENT */, 'Anchor');
            this._focusLock = null;
        }
        return this;
    };
    TRange.prototype.restore = function () {
        this._anchorNode.target.documentElement.relayout(true);
        if (this._focusNode) {
            if (!this._focusLock) {
                throw "ERR_TRANGE: nothing to restore";
            }
            else {
                this._focusNode.set(this._focusLock.getTarget());
            }
        }
        if (this._anchorNode) {
            if (!this._anchorLock) {
                throw "ERR_TRANGE: nothing to restore!";
            }
            else {
                this._anchorNode.set(this._anchorLock.getTarget());
            }
        }
        return this;
    };
    TRange.prototype.debug = function () {
        if (this._focusNode) {
            console.info('Focus @' + this._focusNode.fragPos + ', Anchor @ ' + this._anchorNode.fragPos);
        }
        else {
            console.info('Anchor @ ' + this._anchorNode.fragPos);
        }
        return this;
    };
    TRange.prototype.affectedRanges = function () {
        this.save();
        if (!this._focusNode || !this.length()) {
            return new Fragment_Batch(this, []);
        }
        else {
            return new Fragment_Batch(this, this.createContextualFragment().affectedRanges());
        }
    };
    /* These methods MIGHT be removed in the future, if better ways will be found
     */
    TRange.prototype.setAnchorAsFocus = function () {
        if (this._focusNode) {
            this._anchorNode.target = this._focusNode.target;
            this._anchorNode.fragPos = this._anchorNode.fragPos;
            this.fire('changed');
        }
    };
    TRange.prototype.setFocusAsAnchor = function () {
        if (this._focusNode) {
            this._focusNode.target = this._anchorNode.target;
            this._focusNode.fragPos = this._anchorNode.fragPos;
            this.fire('changed');
        }
    };
    TRange.prototype.setFocusAndAnchorTo = function (target) {
        this._focusNode = this.cloneTarget(target);
        this._anchorNode = this.cloneTarget(target);
        this.fire('changed');
    };
    TRange.prototype.moveRightUntilCharacterIfNotLandedOnText = function () {
        if (this._focusNode) {
            this._focusNode.moveRightUntilCharacterIfNotLandedOnText();
            this._anchorNode.fragPos = this._focusNode.fragPos;
            this._anchorNode.target = this._focusNode.target;
        }
    };
    TRange.prototype.moveLeftUntilCharacterIfNotLandedOnText = function () {
        if (this._focusNode) {
            this._focusNode.moveLeftUntilCharacterIfNotLandedOnText();
            this._anchorNode.fragPos = this._focusNode.fragPos;
            this._anchorNode.target = this._focusNode.target;
        }
    };
    return TRange;
})(Events);
var TRange_Target = (function (_super) {
    __extends(TRange_Target, _super);
    /* Public Methods:
    
        // walk in document in the right direction until condition is met
        public moveRightUntil( condition: ( item: FragmentItem, index?: number ) => boolean, triggerChangeEvent: boolean = true ): boolean

        // walk in document in the left direction until condition is met
        public moveLeftUntil( condition: ( item: FragmentItem, index?: number ) => boolean, triggerChangeEvent: boolean = true ): boolean

        // walk in document chars characters. chars can be negative.
        public moveByCharacters( chars: number ): boolean

        // walk in the document words words. words can be negative.
        public moveByWords( words: number ): boolean

        // creates another target with exactly this one's values.
        public clone(): TRange_Target

        // imports values from another target to this one.
        public set( target: TRange_Target )

     */
    function TRange_Target(target, pos) {
        if (pos === void 0) { pos = 0; }
        _super.call(this);
        this.target = null;
        this.fragPos = 0;
        if (!target) {
            throw "ERR_BAD_TARGET";
        }
        else {
            this.target = target;
            this.fragPos = ~~pos;
        }
    }
    TRange_Target.prototype.moveRightUntil = function (condition, triggerChangeEvent) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        var fragment = this.target.documentElement.fragment, i = this.fragPos, len = fragment.length(), at, target;
        while (i < len) {
            i++;
            if (condition(fragment.at(i), i)) {
                target = this.target.documentElement.findNodeAtIndex(i);
                if (!target) {
                    throw "ERR_BAD_LANDING";
                }
                else {
                    this.target = target;
                    this.fragPos = i;
                    if (triggerChangeEvent)
                        this.fire('changed');
                    return true;
                }
            }
        }
        return false;
    };
    /* These should be removed in the future or optimized better */
    TRange_Target.prototype.moveRightOnceIfInsideBR = function () {
        if (this.target.nodeType == 1 /* TEXT */ && this.target.isBR) {
            this.moveRightUntil(function (at) {
                return at == 2 /* EOL */ || at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */;
            }, false);
        }
    };
    TRange_Target.prototype.moveLeftOnceIfInsideBR = function () {
        if (this.target.nodeType == 1 /* TEXT */ && this.target.isBR) {
            this.moveLeftUntil(function (at) {
                return at == 2 /* EOL */ || at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */;
            }, false);
        }
    };
    TRange_Target.prototype.moveLeftUntilCharacterIfNotLandedOnText = function () {
        var at = this.target.documentElement.fragment.at(this.fragPos);
        if (at == 0 /* NODE_START */ || at == 1 /* NODE_END */) {
            this.moveLeftUntil(function (at) {
                return at == 2 /* EOL */ || at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */;
            });
        }
    };
    TRange_Target.prototype.moveRightUntilCharacterIfNotLandedOnText = function () {
        var at = this.target.documentElement.fragment.at(this.fragPos);
        if (at == 0 /* NODE_START */ || at == 1 /* NODE_END */) {
            this.moveRightUntil(function (at) {
                return at == 2 /* EOL */ || at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */;
            });
        }
    };
    TRange_Target.prototype._moveRight = function (times, ignoreEOL) {
        if (times === void 0) { times = 1; }
        if (ignoreEOL === void 0) { ignoreEOL = false; }
        times = ~~times;
        if (times < 1) {
            return false;
        }
        var i = 0, len = 0, thisNode = this.target, thisFrag = this.fragPos;
        for (i = 0; i < times - 1; i++) {
            if (!this.moveRightUntil(function (at) {
                return at == 2 /* EOL */ || at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */;
            }, false)) {
                this.target = thisNode;
                this.fragPos = thisFrag;
                return false;
            }
        }
        if (this.moveRightUntil(function (at) {
            return (!ignoreEOL && at == 2 /* EOL */) || at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */;
        })) {
            this.moveRightOnceIfInsideBR();
            return true;
        }
        else {
            return false;
        }
    };
    TRange_Target.prototype._moveRightWord = function (times) {
        if (times === void 0) { times = 1; }
        times = ~~times;
        if (times < 1) {
            return false;
        }
        var thisNode = this.target, thisFrag = this.fragPos, fragment = this.target.documentElement.fragment, at = fragment.at(thisFrag), lastCharIndex = fragment.getIndexAt(1 /* DOC_END */);
        while (times > 0) {
            // at a space or @end of a line.
            // move right until next letter. critical.
            if (at != 3 /* CHARACTER */) {
                if (!this.moveRightUntil(function (at) {
                    return at == 3 /* CHARACTER */;
                }, false)) {
                    this.target = thisNode;
                    this.fragPos = thisFrag;
                    return false;
                }
            }
            // move right while characters
            if (!this.moveRightUntil(function (at, i) {
                return at == 2 /* EOL */ || at == 4 /* WHITE_SPACE */ || i == lastCharIndex;
            }, false)) {
                this.target = thisNode;
                this.fragPos = thisFrag;
                return false;
            }
            times--;
        }
        this.fire('changed');
        return true;
    };
    TRange_Target.prototype.moveLeftUntil = function (condition, triggerChangeEvent) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        var fragment = this.target.documentElement.fragment, i = this.fragPos, len = fragment.length(), at, target;
        while (i > 0) {
            i--;
            if (condition(fragment.at(i), i)) {
                target = this.target.documentElement.findNodeAtIndex(i);
                if (!target) {
                    throw "ERR_BAD_LANDING";
                }
                else {
                    this.target = target;
                    this.fragPos = i;
                    if (triggerChangeEvent)
                        this.fire('changed');
                    return true;
                }
            }
        }
        return false;
    };
    TRange_Target.prototype._moveLeft = function (times, ignoreEOL) {
        if (times === void 0) { times = 1; }
        if (ignoreEOL === void 0) { ignoreEOL = false; }
        times = ~~times;
        if (times < 1) {
            return false;
        }
        var i = 0, len = 0, thisNode = this.target, thisFrag = this.fragPos;
        for (i = 0; i < times - 1; i++) {
            if (!this.moveLeftUntil(function (at) {
                return at == 2 /* EOL */ || at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */;
            }, false)) {
                this.target = thisNode;
                this.fragPos = thisFrag;
                return false;
            }
        }
        if (this.moveLeftUntil(function (at) {
            return (!ignoreEOL && at == 2 /* EOL */) || at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */;
        })) {
            this.moveLeftOnceIfInsideBR();
            return true;
        }
        else {
            return false;
        }
    };
    TRange_Target.prototype._moveLeftWord = function (times) {
        if (times === void 0) { times = 1; }
        times = ~~times;
        if (times < 1) {
            return false;
        }
        var thisNode = this.target, thisFrag = this.fragPos, fragment = this.target.documentElement.fragment, at = fragment.at(thisFrag), firstCharIndex = fragment.getIndexAt(0 /* DOC_BEGIN */);
        while (times > 0) {
            // at a space or @end of a line.
            // move left until prev letter. critical.
            if (at != 3 /* CHARACTER */) {
                if (!this.moveLeftUntil(function (at) {
                    return at == 3 /* CHARACTER */;
                }, false)) {
                    this.target = thisNode;
                    this.fragPos = thisFrag;
                    return false;
                }
            }
            // move left while characters
            if (!this.moveLeftUntil(function (at, index) {
                return at == 2 /* EOL */ || at == 4 /* WHITE_SPACE */ || index == firstCharIndex;
            }, false)) {
                this.target = thisNode;
                this.fragPos = thisFrag;
                return false;
            }
            times--;
        }
        this.fire('changed');
        return true;
    };
    TRange_Target.prototype.moveByCharacters = function (chars, ignoreEOL) {
        if (ignoreEOL === void 0) { ignoreEOL = false; }
        chars = ~~chars;
        if (chars == 0) {
            return false;
        }
        if (chars > 0) {
            return this._moveRight(chars, ignoreEOL);
        }
        else {
            return this._moveLeft(-chars, ignoreEOL);
        }
    };
    TRange_Target.prototype.moveByWords = function (words) {
        words = ~~words;
        if (words == 0) {
            return false;
        }
        if (words > 0) {
            return this._moveRightWord(words);
        }
        else {
            return this._moveLeftWord(-words);
        }
    };
    TRange_Target.prototype.clone = function () {
        return new TRange_Target(this.target, this.fragPos);
    };
    TRange_Target.prototype.set = function (target) {
        if (!target) {
            throw "ERR_INVALID_TARGET";
        }
        else {
            if (target.target != this.target || this.fragPos != target.fragPos) {
                this.target = target.target;
                this.fragPos = target.fragPos;
                this.fire('changed');
            }
        }
    };
    // return the line index of the target in the master document
    TRange_Target.prototype.getLineIndex = function () {
        var lines, i = 0, len = 0, line;
        if (this.target.nodeType == 1 /* TEXT */) {
            lines = this.target.documentElement.lines;
            len = lines.length();
            for (i = 0; i < len; i++) {
                line = lines.at(i);
                if (line.fragmentIndexStart <= this.fragPos && line.fragmentIndexEnd >= this.fragPos) {
                    return i;
                }
            }
        }
        return null;
    };
    // returns the details of the target
    TRange_Target.prototype.details = function () {
        if (this.target.nodeType !== 1 /* TEXT */) {
            return null;
        }
        var lines = this.target.documentElement.lines, lineIndex = this.getLineIndex(), line = lines.at(lineIndex), layout = line.owner, ownerNode = layout.ownerNode(), align = ownerNode.style.textAlign() || 'left', lineHeight = ownerNode.style.lineHeight() || 0, paintX = 0, paintY = 0, useWordGap = false, i = 0, len = 0, j = 0, n = 0, size = [0, 0], charIndex = 0, c, charIndex = 0, firstFragPos = 0, currentFragPos = null, startPaintX = 0;
        switch (align) {
            case 'justified':
                useWordGap = true;
            case 'left':
                paintX = 0;
                break;
            case 'right':
                paintX = line.maxWidth - line.size[0];
                break;
            case 'center':
                paintX = (line.maxWidth / 2) - (line.size[0] / 2);
                break;
        }
        startPaintX = paintX;
        for (i = 0, len = line.index - layout.lineIndexStart; i < len; i++) {
            paintY += (lines.at(layout.lineIndexStart + i).size[1] * lineHeight);
        }
        for (i = 0, len = line.words.length; i < len; i++) {
            for (j = 0, n = line.words[i].characters.length; j < n; j++) {
                c = line.words[i].characters[j];
                if ((currentFragPos = c.fragmentPosition()) == this.fragPos) {
                    /* Finally, found the character */
                    return {
                        "paintAbsolute": {
                            "x": layout.offsetLeft + paintX,
                            "y": layout.offsetTop + paintY
                        },
                        "paintRelative": {
                            "x": paintX,
                            "y": paintY
                        },
                        "lineIndex": lineIndex,
                        "charIndex": charIndex
                    };
                }
                else {
                    if (firstFragPos === null) {
                        firstFragPos = currentFragPos;
                    }
                }
                size = c.computeSize();
                paintX += size[0];
                charIndex++;
            }
            if (useWordGap) {
                paintX += line.wordGap;
            }
        }
        if (this.fragPos < firstFragPos) {
            paintX = startPaintX;
            charIndex = 0;
        }
        return {
            "paintAbsolute": {
                "x": layout.offsetLeft + paintX,
                "y": layout.offsetTop + paintY
            },
            "paintRelative": {
                "x": paintX,
                "y": paintY
            },
            "lineIndex": lineIndex,
            "charIndex": charIndex
        };
    };
    return TRange_Target;
})(Events);
var DocSelection = (function (_super) {
    __extends(DocSelection, _super);
    function DocSelection(viewport) {
        _super.call(this);
        this.range = null; // the selection range. user can obtain the range via the getRange() method
        this.viewport = null; // viewport for which this selection is applied
        this.stateComputer = null; // a throttler that computes the editor state when the selection is changed
        this.changeThrottler = null;
        this.editorState = null;
        this.viewport = viewport;
        this.editorState = new Selection_EditorState(this);
        (function (me) {
            me.stateComputer = new Throttler(function () {
                me.editorState.compute();
            }, 100);
            me.changeThrottler = new Throttler(function () {
                me.fire('changed');
            }, 30);
        })(this);
    }
    // obtains an instance of the range of the selection.
    DocSelection.prototype.getRange = function () {
        if (!this.range)
            this.range = this.createRange(this.viewport.document.fragment.createTargetAt(0 /* DOC_BEGIN */));
        return this.range;
    };
    /* You should create ranges only with this method, do not use
       the constructor of the range manually.

       This is because events must be added on ranges and this is
       the optimal point for doing that.
     */
    DocSelection.prototype.createRange = function (target) {
        var rng = new TRange(target);
        (function (me) {
            rng.on('changed', function () {
                me.viewport.document.requestRepaint();
                me.stateComputer.run();
                me.changeThrottler.run();
            });
        })(this);
        return rng;
    };
    /* anchors the selection to the target.
    // if the target is a text node, a text selection will be made.
    // if the target is a element, an element selection will be made
    */
    DocSelection.prototype.anchorTo = function (target) {
        this.range = this.createRange(target);
        this.viewport.document.requestRepaint();
        this.range.fire('changed');
    };
    /* selection can be focused to a target if it's anchored
       and if the selection type is text.
     */
    DocSelection.prototype.focusTo = function (target) {
        var rng = this.getRange(), focus = rng.focusNode();
        if (target.target.nodeType == 1 /* TEXT */ && focus) {
            focus.set(target);
        }
    };
    // returns the length of the selection.
    // note that this value has nothing to do with the number of selected characters.
    // a null value means that is not applicable.
    // value can also be negative, depending on selection direction.
    DocSelection.prototype.length = function () {
        return this.getRange().length();
    };
    // removes the contents of selection.
    DocSelection.prototype.removeContents = function () {
        var range = this.getRange(), atEnd = false, len = range.length();
        if (range.removeContents()) {
            this.viewport.document.removeOrphanNodes();
            this.viewport.document.relayout(true);
            range.collapse(len < 0);
            range.moveRightUntilCharacterIfNotLandedOnText();
        }
    };
    // selection is painted with two colors, depending on
    // the focus state of the viewport
    DocSelection.$Colors = {
        "focus": "#3399ff",
        "blur": "#ddddd"
    };
    return DocSelection;
})(Events);
// in order to build rich interfaces around the editor,
// we need the editorstate class, for knowing what states
// to display on the inputs of the toolbars of the editor
// The editorState fires a "changed" event ( propertyNames: string[] ) with the name of the
// properties that were changed.
var Selection_EditorState = (function (_super) {
    __extends(Selection_EditorState, _super);
    function Selection_EditorState(selection) {
        _super.call(this);
        this.selection = null;
        // the computed state.
        this.state = null;
        this.selection = selection;
        this.state = this.createEditorState();
    }
    Selection_EditorState.prototype.createEditorState = function () {
        return {
            bold: undefined,
            italic: undefined,
            underline: undefined,
            textAlign: undefined,
            fontFamily: undefined,
            fontSize: undefined,
            fontColor: undefined,
            verticalAlign: undefined,
            blockLevel: undefined
        };
    };
    Selection_EditorState.prototype.compute = function () {
        var nodes = [], rng = this.selection.getRange(), frag = null, i = 0, len = 0, state = this.createEditorState(), focus = rng.focusNode(), anchor = rng.anchorNode(), element = null, fBold = false, fItalic = false, fUnderline = false, fTextAlign = null, fFontFamily = null, fFontSize = null, fFontColor = null, fVerticalAlign = null, fBlockLevel = null, nulls = 0, changed = [], k = '', blockElement;
        if (focus && rng.length()) {
            frag = rng.createContextualFragment();
            nodes = frag.affectedTextNodes();
        }
        else {
            if (anchor.target.nodeType == 1 /* TEXT */) {
                nodes.push(anchor.target);
            }
        }
        for (i = 0, len = nodes.length; i < len; i++) {
            if (nodes[i].parentNode != element) {
                element = nodes[i].parentNode;
                if (element) {
                    blockElement = element.ownerBlockElement();
                    switch (blockElement.nodeName) {
                        case 'p':
                        case 'li':
                        case 'td':
                        case 'body':
                            fBlockLevel = 'normal';
                            break;
                        case 'h1':
                        case 'h2':
                        case 'h3':
                        case 'h4':
                        case 'h5':
                        case 'h6':
                        case 'h7':
                            fBlockLevel = blockElement.nodeName;
                            break;
                    }
                    fBold = element.style.fontWeight() == 'bold';
                    fItalic = element.style.fontStyle() == 'italic';
                    fUnderline = element.style.textDecoration() == 'underline';
                    fTextAlign = element.style.textAlign() || 'left';
                    fFontFamily = element.style.fontFamily() || 'Arial';
                    fFontSize = ~~element.style.fontSize() || 0;
                    fFontColor = element.style.color() || '#000000';
                    fVerticalAlign = element.style.verticalAlign() || 'normal';
                    if (state.blockLevel === undefined) {
                        state.blockLevel = fBlockLevel;
                    }
                    else {
                        if (state.blockLevel !== null && state.blockLevel !== fBlockLevel) {
                            state.blockLevel = null;
                            nulls++;
                        }
                    }
                    if (state.bold === undefined) {
                        state.bold = fBold;
                    }
                    else {
                        if (state.bold !== null && state.bold !== fBold) {
                            state.bold = null;
                            nulls++;
                        }
                    }
                    if (state.italic === undefined) {
                        state.italic = fItalic;
                    }
                    else {
                        if (state.italic !== null && state.italic !== fItalic) {
                            state.italic = null;
                            nulls++;
                        }
                    }
                    if (state.underline === undefined) {
                        state.underline = fUnderline;
                    }
                    else {
                        if (state.underline !== null && state.underline !== fUnderline) {
                            state.underline = null;
                            nulls++;
                        }
                    }
                    if (state.textAlign === undefined) {
                        state.textAlign = fTextAlign;
                    }
                    else {
                        if (state.textAlign !== null && state.textAlign !== fTextAlign) {
                            state.textAlign = null;
                            nulls++;
                        }
                    }
                    if (state.fontFamily === undefined) {
                        state.fontFamily = fFontFamily;
                    }
                    else {
                        if (state.fontFamily !== null && state.fontFamily !== fFontFamily) {
                            state.fontFamily = null;
                            nulls++;
                        }
                    }
                    if (state.fontSize === undefined) {
                        state.fontSize = fFontSize;
                    }
                    else {
                        if (state.fontSize !== null && state.fontSize !== fFontSize) {
                            state.fontSize = null;
                            nulls++;
                        }
                    }
                    if (state.fontColor === undefined) {
                        state.fontColor = fFontColor;
                    }
                    else {
                        if (state.fontColor !== null && state.fontColor !== fFontColor) {
                            state.fontColor = null;
                            nulls++;
                        }
                    }
                    if (state.verticalAlign === undefined) {
                        state.verticalAlign = fVerticalAlign;
                    }
                    else {
                        if (state.verticalAlign !== null && state.verticalAlign !== fVerticalAlign) {
                            state.verticalAlign = null;
                            nulls++;
                        }
                    }
                }
            }
            if (nulls == 9) {
                break;
            }
        }
        for (k in state) {
            if (state[k] !== this.state[k]) {
                changed.push(k);
                this.state[k] = state[k];
            }
        }
        if (changed.length) {
            this.fire('changed', changed);
        }
    };
    return Selection_EditorState;
})(Events);
/* We prefere to create a function instead of a class, because we want to parasitate
   a HTMLDivElement.
*/
function HTMLEditor(value, hasToolbars, hasStatusbar, initialWidth, initialHeight) {
    if (hasToolbars === void 0) { hasToolbars = true; }
    if (hasStatusbar === void 0) { hasStatusbar = true; }
    if (initialWidth === void 0) { initialWidth = null; }
    if (initialHeight === void 0) { initialHeight = null; }
    /* Custom eventing system */
    var $EVENTS_QUEUE, $EVENTS_ENABLED = true;
    /* End of custom eventing system */
    var element = document.createElement('div'), toolbar = element.appendChild(document.createElement('div')), body = element.appendChild(document.createElement('div')), statusbar = element.appendChild(document.createElement('div')), disabled = false, readOnly = false, width = initialWidth || 100, height = initialHeight || 100, toolbars = true, ui_toolbar, resizer = new Throttler(function () {
        resize(width, height);
    }, 10), viewport = new Viewport();
    element['on'] = function (eventName, callback) {
        $EVENTS_QUEUE = $EVENTS_QUEUE || {};
        if (!$EVENTS_QUEUE[eventName])
            $EVENTS_QUEUE[eventName] = [];
        $EVENTS_QUEUE[eventName].push(callback);
    };
    element['off'] = function (eventName, callback) {
        if ($EVENTS_QUEUE && $EVENTS_QUEUE[eventName]) {
            for (var i = 0, len = $EVENTS_QUEUE[eventName].length; i < len; i++) {
                if ($EVENTS_QUEUE[eventName][i] == callback) {
                    $EVENTS_QUEUE[eventName].splice(i, 1);
                    return;
                }
            }
        }
    };
    element['fire'] = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if ($EVENTS_QUEUE && $EVENTS_QUEUE[eventName]) {
            for (var i = 0, len = $EVENTS_QUEUE[eventName].length; i < len; i++) {
                $EVENTS_QUEUE[eventName][i].apply(element, args);
            }
        }
    };
    viewport.document.on('change', function () {
        element.fire('change');
    });
    element['cssText'] = toolbar['cssText'] = statusbar['cssText'] = body['cssText'] = viewport.canvas['cssText'] = "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none";
    DOM.addClass(element, 'html-editor');
    DOM.addClass(toolbar, 'toolbar');
    DOM.addClass(statusbar, 'statusbar');
    DOM.addClass(body, 'body');
    ui_toolbar = new UI_Toolbar(toolbar, viewport.router, viewport.selection.editorState);
    // append the canvas in the body element of the editor
    body.appendChild(viewport.canvas);
    if (hasToolbars) {
        DOM.addClass(element, 'has-toolbar');
    }
    if (hasStatusbar) {
        DOM.addClass(element, 'has-statusbar');
    }
    Object.defineProperty(element, "width", {
        "get": function () {
            return width;
        },
        "set": function (value) {
            value = ~~value;
            width = value;
            resizer.run();
        }
    });
    Object.defineProperty(element, "height", {
        "get": function () {
            return height;
        },
        "set": function (value) {
            value = ~~value;
            height = value;
            resizer.run();
        }
    });
    Object.defineProperty(element, "toolbars", {
        "get": function () {
            return hasToolbars;
        },
        "set": function (value) {
            hasToolbars = !!value;
            if (hasToolbars) {
                DOM.addClass(element, 'has-toolbars');
            }
            else {
                DOM.removeClass(element, 'has-toolbars');
            }
            resizer.run();
        }
    });
    Object.defineProperty(element, "statusbar", {
        "get": function () {
            return hasStatusbar;
        },
        "set": function (value) {
            hasStatusbar = !!value;
            if (hasStatusbar) {
                DOM.addClass(element, 'has-statusbar');
            }
            else {
                DOM.removeClass(element, 'has-statusbar');
            }
            resizer.run();
        }
    });
    Object.defineProperty(element, "value", {
        "get": function () {
            return viewport.document.innerHTML();
        },
        "set": function (html) {
            if (html === void 0) { html = ' '; }
            viewport.document.innerHTML(html || ' ');
        }
    });
    Object.defineProperty(element, "document", {
        "get": function () {
            return viewport.document;
        }
    });
    Object.defineProperty(element, "viewport", {
        "get": function () {
            return viewport;
        }
    });
    Object.defineProperty(element, "router", {
        "get": function () {
            return viewport.router;
        }
    });
    Object.defineProperty(element, "state", {
        "get": function () {
            return viewport.selection.editorState;
        }
    });
    Object.defineProperty(element, "selection", {
        "get": function () {
            return viewport.selection;
        }
    });
    Object.defineProperty(element, "fragment", {
        "get": function () {
            return viewport.document.fragment;
        }
    });
    function resize(newWidth, newHeight) {
        element.style.width = newWidth + "px";
        element.style.height = newHeight + "px";
        var left = height;
        if (hasToolbars) {
            left -= 40;
        }
        if (hasStatusbar) {
            left -= 20;
        }
        body['style'].height = left + "px";
        viewport.height(left);
        viewport.width(width);
        ui_toolbar.resize(width);
        element.style.width = width + "px";
    }
    viewport.selection.editorState.on('changed', function (properties) {
        ui_toolbar.updateDocumentState(properties);
    });
    (function (me) {
        var textNode;
        statusbar.innerHTML = 'StatusBar';
        textNode = statusbar.firstChild;
        viewport.selection.on('changed', function () {
            var rng = viewport.selection.getRange(), focus = rng.focusNode(), anchor = rng.anchorNode(), debug = focus || anchor, node = debug.target, stack = [];
            while (node) {
                if (node.nodeType == 1 /* TEXT */) {
                    stack.push('#text');
                }
                else {
                    stack.push(node.nodeName);
                }
                node = node.parentNode;
            }
            textNode.textContent = Helper.reverse(stack).join(' > ') || 'Click somewhere in editor to see here it\'s path';
        });
    })(this);
    element['value'] = value;
    resize(width, height);
    return element;
}
var UI_Toolbar = (function (_super) {
    __extends(UI_Toolbar, _super);
    function UI_Toolbar(DOMNodeContainer, router, state) {
        _super.call(this);
        /* BlockName, FontStyle, FontSize: width = 255px */
        /* B I U                         : width = 74px  */
        /* TextAlign                     : width = 98px  */
        /* Bullets and Numbering + Indent: width = 99px  */
        /* Borders and Colors            : width = 107px */
        this.panels = [];
        this.router = null;
        this.state = null;
        this.node = DOMNodeContainer;
        this.router = router;
        this.state = state;
        this.panels.push(new UI_Toolbar_Panel_Style(this));
        this.panels.push(new UI_Toolbar_Panel_Formatting(this));
        this.panels.push(new UI_Toolbar_Panel_Alignment(this));
        this.panels.push(new UI_Toolbar_Panel_BulletsAndNumbering(this));
        this.panels.push(new UI_Toolbar_Panel_Indentation(this));
        this.panels.push(new UI_Toolbar_Panel_TextScripting(this));
        this.panels.push(new UI_Toolbar_Panel_BordersAndColors(this));
        this.panels.push(new UI_Toolbar_Panel_Multimedia(this));
    }
    // forward the document state changes to the panels.
    UI_Toolbar.prototype.updateDocumentState = function (propertiesList) {
        for (var i = 0, len = this.panels.length; i < len; i++) {
            this.panels[i].updateDocumentState(propertiesList);
        }
    };
    UI_Toolbar.prototype.resize = function (width) {
        width = ~~width;
        for (var i = 0, len = this.panels.length; i < len; i++) {
            this.panels[i].resizeByParentWidth(width);
        }
    };
    return UI_Toolbar;
})(Events);
var UI_Toolbar_Panel = (function (_super) {
    __extends(UI_Toolbar_Panel, _super);
    function UI_Toolbar_Panel(toolbar, name) {
        if (name === void 0) { name = 'Toolbar'; }
        _super.call(this);
        this.toolbar = toolbar;
        this.name = name;
        this.width = 0; // the minWidth of the toolbar, without being resized.
        this.node = document.createElement('div');
        DOM.addClass(this.node, 'ui-panel');
        toolbar.node.appendChild(this.node);
        this.node.title = name || 'Toolbar';
        this.width = 10;
    }
    UI_Toolbar_Panel.prototype.updateDocumentState = function (propertiesList) {
    };
    UI_Toolbar_Panel.prototype.resizeByParentWidth = function (width) {
    };
    return UI_Toolbar_Panel;
})(Events);
var UI_Toolbar_Panel_Style = (function (_super) {
    __extends(UI_Toolbar_Panel_Style, _super);
    function UI_Toolbar_Panel_Style(toolbar) {
        _super.call(this, toolbar, 'Style');
        this.blockLevel = null;
        this.fontFamily = null;
        this.fontSize = null;
        DOM.addClass(this.node, 'ui-panel-style');
        this.node.innerHTML = [
            '<div class="item index-0">',
            '<div class="text-dropdown">',
            '<input class="nodeName" type="text" data-suggestions="normal:Normal,h1:Heading 1,h2:Heading 2,h3:Heading 3,h4:Heading 4,h5:Heading 5,h6:Heading 6" placeholder="Style" value="" >',
            '<div class="expander"></div>',
            '</div>',
            '</div>',
            '<div class="item index-1">',
            '<div class="text-dropdown">',
            '<input class="fontFamily" type="text" data-suggestions="' + TStyle.$FontFamily.join(',') + '" value="" placeholder="Font" />',
            '<div class="expander"></div>',
            '</div>',
            '</div>',
            '<div class="item index-2">',
            '<div class="text-dropdown">',
            '<input class="fontSize" type="text" data-suggestions="8,9,10,12,14,16,18,20,22,24,26,28,30,32" value="" placeholder="Size" />',
            '<div class="expander"></div>',
            '</div>',
            '</div>'
        ].join('');
        this.blockLevel = this.node.querySelector('input.nodeName');
        this.fontFamily = this.node.querySelector('input.fontFamily');
        this.fontSize = this.node.querySelector('input.fontSize');
        (function (me) {
            me.dropdownize(me.blockLevel, function (v) {
                me.setBlockLevel(v);
            }, true);
            me.dropdownize(me.fontFamily, function (v) {
                me.setFontFamily(v);
            }, false);
            me.dropdownize(me.fontSize, function (v) {
                me.setFontSize(v);
            }, false);
        })(this);
    }
    UI_Toolbar_Panel_Style.prototype.setBlockLevel = function (nodeName) {
        this.toolbar.router.dispatchCommand(18 /* BLOCK_LEVEL */, [nodeName]);
    };
    UI_Toolbar_Panel_Style.prototype.setFontFamily = function (fontFamily) {
        this.toolbar.router.dispatchCommand(14 /* FONT */, [fontFamily]);
    };
    UI_Toolbar_Panel_Style.prototype.setFontSize = function (fontSize) {
        this.toolbar.router.dispatchCommand(17 /* SIZE */, [fontSize]);
    };
    UI_Toolbar_Panel_Style.prototype.dropdownize = function (input, submit, allowSuggestionsOnly) {
        /* indeed.com corby nn18 nn95nb */
        if (allowSuggestionsOnly === void 0) { allowSuggestionsOnly = false; }
        // make the parent of the input focusable
        input.parentNode['tabIndex'] = 0;
        var suggestions = (input.getAttribute('data-suggestions') || '').split(','), len = suggestions.length, i = 0, items = [], value, sp, overlay, option, valueOnFocus = '', expander = input.parentNode.querySelector('div.expander');
        for (i = 0, len = suggestions.length; i < len; i++) {
            suggestions[i] = suggestions[i].replace(/(^[\s]+|[\s]+$)/g, '');
            if (suggestions[i]) {
                sp = suggestions[i].split(':');
                if (sp.length == 1) {
                    items.push({
                        "name": sp[0],
                        "value": sp[0]
                    });
                }
                else {
                    items.push({
                        "value": sp[0],
                        "name": sp.slice(1).join(':')
                    });
                }
            }
        }
        overlay = document.createElement('div');
        DOM.addClass(overlay, 'overlay');
        // create an overlay object, and append it after the input
        if (items.length) {
            for (i = 0, len = items.length; i < len; i++) {
                option = document.createElement('div');
                DOM.addClass(option, 'option');
                option.appendChild(document.createTextNode(items[i].name));
                option.setAttribute('data-value', items[i].value);
                overlay.appendChild(option);
            }
            input.parentNode.appendChild(overlay);
        }
        // webkit minor bugfix
        overlay.addEventListener('mousewheel', function (DOMEvent) {
            overlay.scrollTop -= DOMEvent.wheelDelta > 0 ? 10 : -10;
            DOMEvent.preventDefault();
            DOMEvent.stopPropagation();
        }, true);
        overlay.addEventListener('click', function (DOMEvent) {
            var target = DOMEvent.target || DOMEvent.srcElement, which = DOMEvent.which;
            if (which != 1) {
                return;
            }
            if (!DOM.hasClass(target, 'option')) {
                return;
            }
            input.value = target.textContent;
            // focus the parentNode of the input, in order to avoid focusing something
            // else outside our marvelous editor.
            input.parentNode['focus']();
            submit(target.getAttribute('data-value'));
        }, true);
        overlay.addEventListener('mousedown', function (DOMEvent) {
            DOMEvent.preventDefault();
            DOMEvent.stopPropagation();
        }, true);
        if (expander) {
            expander.addEventListener('click', function () {
                input.focus();
            }, true);
        }
        input.addEventListener('focus', function () {
            valueOnFocus = input.value;
            input.select();
            DOM.addClass(input.parentNode, 'focused');
            for (var i = 0, items = Array.prototype.slice.call(overlay.childNodes, 0) || [], len = items.length; i < len; i++) {
                DOM.removeClass(items[i], 'hidden');
                /* "select" the option if the option textContents equals with the input value */
                if (items[i].textContent == input.value) {
                    items[i].scrollIntoViewIfNeeded();
                    DOM.addClass(items[i], 'on');
                }
                else {
                    DOM.removeClass(items[i], 'on');
                }
            }
        }, true);
        input.addEventListener('blur', function () {
            DOM.removeClass(input.parentNode, 'focused');
        }, true);
        var preventFiltering = false, onTextInput = new Throttler(function () {
            if (preventFiltering) {
                preventFiltering = false;
                return;
            }
            var value = input.value.toLowerCase(), i = 0, len = items.length, nodes = Array.prototype.slice.call(overlay.childNodes, 0);
            for (i = 0; i < len; i++) {
                DOM.removeClass(nodes[i], 'on');
                if (value == '' || items[i].name.toLowerCase().indexOf(value) >= 0) {
                    DOM.removeClass(nodes[i], 'hidden');
                }
                else {
                    DOM.addClass(nodes[i], 'hidden');
                }
            }
        }, 10);
        function onUpArrow() {
            var opts = [], i = 0, len = 0, childNodes = Array.prototype.slice.call(overlay.childNodes, 0), onIndex = -1, onOption;
            for (i = 0, len = childNodes.length; i < len; i++) {
                if (!DOM.hasClass(childNodes[i], 'hidden')) {
                    opts.push(childNodes[i]);
                    if (DOM.hasClass(childNodes[i], 'on')) {
                        onIndex = opts.length - 1;
                    }
                }
            }
            if (opts.length) {
                if (onIndex == -1 || onIndex == 0) {
                    if (onIndex == 0)
                        DOM.removeClass(opts[0], 'on');
                    DOM.addClass(onOption = opts[opts.length - 1], 'on');
                }
                else {
                    DOM.removeClass(opts[onIndex], 'on');
                    DOM.addClass(onOption = opts[onIndex - 1], 'on');
                }
                onOption['scrollIntoViewIfNeeded']();
                // set the value of the control to onOption.textContents
                input.value = onOption.textContent;
                input.select();
                preventFiltering = true;
            }
        }
        function onDownArrow() {
            var opts = [], i = 0, len = 0, childNodes = Array.prototype.slice.call(overlay.childNodes, 0), onIndex = -1, onOption;
            for (i = 0, len = childNodes.length; i < len; i++) {
                if (!DOM.hasClass(childNodes[i], 'hidden')) {
                    opts.push(childNodes[i]);
                    if (DOM.hasClass(childNodes[i], 'on')) {
                        onIndex = opts.length - 1;
                    }
                }
            }
            if (opts.length) {
                if (onIndex == -1 || onIndex == opts.length - 1) {
                    if (onIndex == opts.length - 1)
                        DOM.removeClass(opts[opts.length - 1], 'on');
                    DOM.addClass(onOption = opts[0], 'on');
                }
                else {
                    DOM.removeClass(opts[onIndex], 'on');
                    DOM.addClass(onOption = opts[onIndex + 1], 'on');
                }
                onOption['scrollIntoViewIfNeeded']();
                // set the value of the control to onOption.textContents
                input.value = onOption.textContent;
                input.select();
                preventFiltering = true;
            }
        }
        function onEnterKey() {
            preventFiltering = true;
            var v = input.value, i = 0, len = 0, valid = false, val = input.value;
            if (!v) {
                return;
            }
            if (allowSuggestionsOnly) {
                for (i = 0, len = items.length; i < len; i++) {
                    if (items[i].name == v) {
                        valid = true;
                        val = items[i].value;
                        break;
                    }
                }
            }
            else {
                valid = true;
            }
            if (!valid) {
                return;
            }
            input.parentNode['focus']();
            submit(val);
        }
        function changed(event) {
            var keyCode = event.keyCode;
            switch (keyCode) {
                case 38:
                    onUpArrow();
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                case 40:
                    onDownArrow();
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                case 13:
                    onEnterKey();
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                case 27:
                    input.parentNode['focus']();
                    input.value = valueOnFocus;
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                default:
                    onTextInput.run();
                    break;
            }
            onTextInput.run();
        }
        input.addEventListener('keydown', changed, true);
    };
    UI_Toolbar_Panel_Style.prototype.updateBlockLevel = function () {
        var level = String(this.toolbar.state.state.blockLevel || ''), strs = {
            "normal": "Normal",
            "h1": "Heading 1",
            "h2": "Heading 2",
            "h3": "Heading 3",
            "h4": "Heading 4",
            "h5": "Heading 5",
            "h6": "Heading 6"
        };
        this.blockLevel.value = strs[level] || '';
    };
    UI_Toolbar_Panel_Style.prototype.updateFontFamily = function () {
        var family = String(this.toolbar.state.state.fontFamily || '');
        this.fontFamily.value = family;
    };
    UI_Toolbar_Panel_Style.prototype.updateFontSize = function () {
        var size = String(this.toolbar.state.state.fontSize || '');
        this.fontSize.value = size;
    };
    UI_Toolbar_Panel_Style.prototype.updateDocumentState = function (propertiesList) {
        for (var i = 0, len = propertiesList.length; i < len; i++) {
            switch (propertiesList[i]) {
                case 'blockLevel':
                    this.updateBlockLevel();
                    break;
                case 'fontFamily':
                    this.updateFontFamily();
                    break;
                case 'fontSize':
                    this.updateFontSize();
                    break;
            }
        }
    };
    return UI_Toolbar_Panel_Style;
})(UI_Toolbar_Panel);
var UI_Toolbar_Panel_Formatting = (function (_super) {
    __extends(UI_Toolbar_Panel_Formatting, _super);
    function UI_Toolbar_Panel_Formatting(toolbar) {
        _super.call(this, toolbar, 'Style');
        this.toolbar = toolbar;
        this.btnBold = null;
        this.btnItalic = null;
        this.btnUnderline = null;
        DOM.addClass(this.node, 'ui-panel-formatting');
        this.node.innerHTML = [
            '<div class="item index-0">',
            '<div class="ui-button bold state" title="Bold (Ctrl+B)"></div>',
            '<div class="ui-button italic" title="Italic (Ctrl+I)"></div>',
            '<div class="ui-button underline" title="Underline (Ctrl+U)"></div>',
            '</div>',
        ].join('');
        this.btnBold = this.node.querySelector('.ui-button.bold');
        this.btnItalic = this.node.querySelector('.ui-button.italic');
        this.btnUnderline = this.node.querySelector('.ui-button.underline');
        (function (me) {
            me.btnBold.addEventListener('click', function () {
                me.toolbar.router.dispatchCommand(4 /* BOLD */, []);
            }, true);
            me.btnItalic.addEventListener('click', function () {
                me.toolbar.router.dispatchCommand(5 /* ITALIC */, []);
            }, true);
            me.btnUnderline.addEventListener('click', function () {
                me.toolbar.router.dispatchCommand(6 /* UNDERLINE */, []);
            }, true);
        })(this);
    }
    UI_Toolbar_Panel_Formatting.prototype.updateBoldState = function () {
        var state = this.toolbar.state.state.bold;
        DOM.removeClass(this.btnBold, 'state-pressed');
        DOM.removeClass(this.btnBold, 'state-mixed');
        if (state) {
            DOM.addClass(this.btnBold, 'state-pressed');
        }
        else {
            if (state === null) {
                DOM.addClass(this.btnBold, 'state-mixed');
            }
        }
    };
    UI_Toolbar_Panel_Formatting.prototype.updateItalicState = function () {
        var state = this.toolbar.state.state.italic;
        DOM.removeClass(this.btnItalic, 'state-pressed');
        DOM.removeClass(this.btnItalic, 'state-mixed');
        if (state) {
            DOM.addClass(this.btnItalic, 'state-pressed');
        }
        else {
            if (state === null) {
                DOM.addClass(this.btnItalic, 'state-mixed');
            }
        }
    };
    UI_Toolbar_Panel_Formatting.prototype.updateUnderlineState = function () {
        var state = this.toolbar.state.state.underline;
        DOM.removeClass(this.btnUnderline, 'state-pressed');
        DOM.removeClass(this.btnUnderline, 'state-mixed');
        if (state) {
            DOM.addClass(this.btnUnderline, 'state-pressed');
        }
        else {
            if (state === null) {
                DOM.addClass(this.btnUnderline, 'state-mixed');
            }
        }
    };
    UI_Toolbar_Panel_Formatting.prototype.updateDocumentState = function (propertiesList) {
        for (var i = 0, len = propertiesList.length; i < len; i++) {
            switch (propertiesList[i]) {
                case 'bold':
                    this.updateBoldState();
                    break;
                case 'italic':
                    this.updateItalicState();
                    break;
                case 'underline':
                    this.updateUnderlineState();
                    break;
            }
        }
    };
    return UI_Toolbar_Panel_Formatting;
})(UI_Toolbar_Panel);
var UI_Toolbar_Panel_Alignment = (function (_super) {
    __extends(UI_Toolbar_Panel_Alignment, _super);
    function UI_Toolbar_Panel_Alignment(toolbar) {
        _super.call(this, toolbar, 'Style');
        this.toolbar = toolbar;
        this.btnLeft = null;
        this.btnRight = null;
        this.btnCenter = null;
        this.btnJustified = null;
        DOM.addClass(this.node, 'ui-panel-alignment');
        this.node.innerHTML = [
            '<div class="item index-0">',
            '<div class="ui-button left" title="Left (Ctrl+L)"></div>',
            '<div class="ui-button center" title="Center (Ctrl+E)"></div>',
            '<div class="ui-button right" title="Right (Ctrl+R)"></div>',
            '<div class="ui-button justified" title="Justified (Ctrl+J)"></div>',
            '</div>',
        ].join('');
        this.btnLeft = this.node.querySelector('.ui-button.left');
        this.btnRight = this.node.querySelector('.ui-button.right');
        this.btnCenter = this.node.querySelector('.ui-button.center');
        this.btnJustified = this.node.querySelector('.ui-button.justified');
        (function (me) {
            me.btnLeft.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(7 /* ALIGN */, ['left']);
            }, true);
            me.btnRight.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(7 /* ALIGN */, ['right']);
            }, true);
            me.btnCenter.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(7 /* ALIGN */, ['center']);
            }, true);
            me.btnJustified.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(7 /* ALIGN */, ['justified']);
            }, true);
        })(this);
    }
    UI_Toolbar_Panel_Alignment.prototype.updateState = function () {
        var state = this.toolbar.state.state.textAlign, btns = [
            this.btnLeft,
            this.btnRight,
            this.btnCenter,
            this.btnJustified
        ], i;
        for (i = 0; i < 4; i++) {
            DOM.removeClass(btns[i], 'state-pressed');
            DOM.removeClass(btns[i], 'state-mixed');
        }
        switch (state) {
            case 'left':
                DOM.addClass(this.btnLeft, 'state-pressed');
                break;
            case 'right':
                DOM.addClass(this.btnRight, 'state-pressed');
                break;
            case 'center':
                DOM.addClass(this.btnCenter, 'state-pressed');
                break;
            case 'justified':
                DOM.addClass(this.btnJustified, 'state-pressed');
                break;
            case null:
                DOM.addClass(this.btnLeft, 'state-mixed');
                DOM.addClass(this.btnRight, 'state-mixed');
                DOM.addClass(this.btnCenter, 'state-mixed');
                DOM.addClass(this.btnJustified, 'state-mixed');
                break;
        }
    };
    UI_Toolbar_Panel_Alignment.prototype.updateDocumentState = function (propertiesList) {
        if (propertiesList.indexOf('textAlign') >= 0) {
            this.updateState();
        }
    };
    return UI_Toolbar_Panel_Alignment;
})(UI_Toolbar_Panel);
var UI_Toolbar_Panel_BulletsAndNumbering = (function (_super) {
    __extends(UI_Toolbar_Panel_BulletsAndNumbering, _super);
    function UI_Toolbar_Panel_BulletsAndNumbering(toolbar) {
        _super.call(this, toolbar, 'Bullets and Numbering');
        this.toolbar = toolbar;
        this.btnUL = null;
        this.btnOL = null;
        DOM.addClass(this.node, 'ui-panel-bullets-and-numbering');
        this.node.innerHTML = [
            '<div class="item index-0">',
            '<div class="ui-button ol" title="Ordered List"></div>',
            '<div class="ui-button ul" title="Bulleted List"></div>',
            '</div>',
        ].join('');
        this.btnUL = this.node.querySelector('.ui-button.ul');
        this.btnOL = this.node.querySelector('.ui-button.ol');
        (function (me) {
            me.btnUL.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(19 /* LIST */, ['ul', true]);
            }, true);
            me.btnOL.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(19 /* LIST */, ['ol', true]);
            }, true);
        })(this);
    }
    return UI_Toolbar_Panel_BulletsAndNumbering;
})(UI_Toolbar_Panel);
var UI_Toolbar_Panel_Indentation = (function (_super) {
    __extends(UI_Toolbar_Panel_Indentation, _super);
    function UI_Toolbar_Panel_Indentation(toolbar) {
        _super.call(this, toolbar, 'Indentation');
        this.toolbar = toolbar;
        this.btnIndent = null;
        this.btnUnindent = null;
        DOM.addClass(this.node, 'ui-panel-indentation');
        this.node.innerHTML = [
            '<div class="item index-0">',
            '<div class="ui-button increase" title="Increase Indent (Tab)"></div>',
            '<div class="ui-button decrease" title="Decrease Indent (Shift + Tab)"></div>',
            '</div>',
        ].join('');
        this.btnIndent = this.node.querySelector('.ui-button.increase');
        this.btnUnindent = this.node.querySelector('.ui-button.decrease');
        (function (me) {
            me.btnIndent.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(11 /* INDENT */, []);
            }, true);
            me.btnUnindent.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(12 /* UNINDENT */, []);
            }, true);
        })(this);
    }
    return UI_Toolbar_Panel_Indentation;
})(UI_Toolbar_Panel);
var UI_Toolbar_Panel_TextScripting = (function (_super) {
    __extends(UI_Toolbar_Panel_TextScripting, _super);
    function UI_Toolbar_Panel_TextScripting(toolbar) {
        _super.call(this, toolbar, 'Indentation');
        this.toolbar = toolbar;
        this.btnSubscript = null;
        this.btnSuperscript = null;
        DOM.addClass(this.node, 'ui-panel-text-scripting');
        this.node.innerHTML = [
            '<div class="item index-0">',
            '<div class="ui-button subscript"   title="Subscript"></div>',
            '<div class="ui-button superscript" title="Superscript"></div>',
            '</div>',
        ].join('');
        this.btnSubscript = this.node.querySelector('.ui-button.subscript');
        this.btnSuperscript = this.node.querySelector('.ui-button.superscript');
        (function (me) {
            me.btnSubscript.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(13 /* VALIGN */, ['sub']);
            }, true);
            me.btnSuperscript.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(13 /* VALIGN */, ['sup']);
            }, true);
        })(this);
    }
    UI_Toolbar_Panel_TextScripting.prototype.update = function () {
        var state = this.toolbar.state.state.verticalAlign, btns = [
            this.btnSuperscript,
            this.btnSubscript
        ], i;
        for (i = 0; i < 2; i++) {
            DOM.removeClass(btns[i], 'state-pressed');
            DOM.removeClass(btns[i], 'state-mixed');
        }
        switch (state) {
            case 'super':
                DOM.addClass(this.btnSuperscript, 'state-pressed');
                break;
            case 'sub':
                DOM.addClass(this.btnSubscript, 'state-pressed');
                break;
            case null:
                DOM.addClass(this.btnSubscript, 'state-mixed');
                DOM.addClass(this.btnSuperscript, 'state-mixed');
                break;
        }
    };
    UI_Toolbar_Panel_TextScripting.prototype.updateDocumentState = function (propertiesList) {
        if (propertiesList.indexOf('verticalAlign') >= 0) {
            this.update();
        }
    };
    return UI_Toolbar_Panel_TextScripting;
})(UI_Toolbar_Panel);
var UI_Toolbar_Panel_BordersAndColors = (function (_super) {
    __extends(UI_Toolbar_Panel_BordersAndColors, _super);
    function UI_Toolbar_Panel_BordersAndColors(toolbar) {
        _super.call(this, toolbar, 'Borders and Colors');
        DOM.addClass(this.node, 'ui-panel-borders-and-colors');
        this.node.innerHTML = [
            '<div class="item index-0">',
            '<div class="ui-button ui-color-button borderColor" title="Border Color"></div>',
            '<div class="ui-button ui-color-button backgroundColor" title="Background Color"></div>',
            '<div class="ui-button ui-color-button color" title="Color"></div>',
            '</div>',
        ].join('');
        this.btnBorderColor = this.node.querySelector('div.ui-button.borderColor');
        this.btnBackgroundColor = this.node.querySelector('div.ui-button.backgroundColor');
        this.btnColor = this.node.querySelector('div.ui-button.color');
        (function (me) {
            me.makeColorDropdown(me.btnBorderColor, function (color) {
                me.setBorderColor(color);
            }, '');
            me.makeColorDropdown(me.btnBackgroundColor, function (color) {
                me.setBackgroundColor(color);
            }, '');
            me.makeColorDropdown(me.btnColor, function (color) {
                me.setColor(color);
            }, '');
        })(this);
    }
    UI_Toolbar_Panel_BordersAndColors.prototype.makeColorDropdown = function (element, onchange, initialColor) {
        element.tabIndex = 0;
        var icon = document.createElement('div');
        DOM.addClass(icon, 'icon');
        var expander = document.createElement('div');
        DOM.addClass(expander, 'expander');
        var lastColor = document.createElement('div');
        DOM.addClass(lastColor, 'color');
        var overlay = document.createElement('div');
        DOM.addClass(overlay, 'overlay');
        var hdr, c;
        c = document.createElement('div');
        DOM.addClass(c, 'c');
        DOM.addClass(c, 'none');
        c.setAttribute('data-color', '');
        c.title = 'Default Color';
        overlay.appendChild(c);
        for (var k in TStyle_Color.$NamedColors) {
            c = document.createElement('div');
            DOM.addClass(c, 'c');
            c.setAttribute('data-color', TStyle_Color.$NamedColors[k]);
            c.style.backgroundColor = k;
            overlay.appendChild(c);
        }
        expander.tabIndex = 0;
        element.appendChild(icon);
        element.appendChild(lastColor);
        element.appendChild(expander);
        element.appendChild(overlay);
        lastColor.style.backgroundColor = initialColor;
        lastColor.setAttribute('data-color', initialColor);
        if (!initialColor) {
            DOM.addClass(lastColor, 'none');
        }
        function setColor(c) {
            lastColor.style.backgroundColor = c || '';
            lastColor.setAttribute('data-color', c || '');
            if (!c) {
                DOM.addClass(lastColor, 'none');
            }
            else {
                DOM.removeClass(lastColor, 'none');
            }
            onchange(c || '');
        }
        element.addEventListener('mousedown', function (e) {
            var target = (e.target || e.toElement);
            if (target && DOM.hasClass(target, 'color')) {
                // clicked on the last color
                e.stopPropagation();
                e.preventDefault();
                setColor(lastColor.getAttribute('data-color'));
                return;
            }
            if (target && DOM.hasClass(target, 'c')) {
                e.stopPropagation();
                e.preventDefault();
                setColor(target.getAttribute('data-color'));
                overlay.style.display = 'none';
                return;
            }
            overlay.style.display = 'block';
        }, true);
        element.addEventListener('blur', function () {
            overlay.style.display = 'none';
        }, true);
        expander.addEventListener('click', function () {
            setTimeout(function () {
                overlay.style.display = 'block';
            }, 10);
        }, true);
    };
    UI_Toolbar_Panel_BordersAndColors.prototype.setBorderColor = function (color) {
        console.info('setBorderColor: ' + color);
    };
    UI_Toolbar_Panel_BordersAndColors.prototype.setBackgroundColor = function (color) {
        this.toolbar.router.dispatchCommand(16 /* BGCOLOR */, [color]);
    };
    UI_Toolbar_Panel_BordersAndColors.prototype.setColor = function (color) {
        this.toolbar.router.dispatchCommand(15 /* COLOR */, [color]);
    };
    return UI_Toolbar_Panel_BordersAndColors;
})(UI_Toolbar_Panel);
var UI_Toolbar_Panel_Multimedia = (function (_super) {
    __extends(UI_Toolbar_Panel_Multimedia, _super);
    function UI_Toolbar_Panel_Multimedia(toolbar) {
        _super.call(this, toolbar, 'Multimedia');
        DOM.addClass(this.node, 'ui-panel-multimedia');
        this.node.innerHTML = [
            '<div class="item index-0">',
            '<div class="ui-button link" title="Link"></div>',
            '<div class="ui-button picture" title="Picture"></div>',
            '<div class="ui-button video" title="Video"></div>',
            '</div>',
        ].join('');
    }
    return UI_Toolbar_Panel_Multimedia;
})(UI_Toolbar_Panel);
/// <reference path="Types.ts" />
/// <reference path="Events.ts" />
/// <reference path="Throttler.ts" />
/// <reference path="DOM.ts" />
/// <reference path="Helper.ts" />
