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
    EditorCommand[EditorCommand["STRIKE"] = 7] = "STRIKE";
    EditorCommand[EditorCommand["ALIGN"] = 8] = "ALIGN";
    EditorCommand[EditorCommand["CLEAR_FORMATTING"] = 9] = "CLEAR_FORMATTING";
    EditorCommand[EditorCommand["COPY"] = 10] = "COPY";
    EditorCommand[EditorCommand["CUT"] = 11] = "CUT";
    EditorCommand[EditorCommand["PASTE"] = 12] = "PASTE";
    EditorCommand[EditorCommand["INDENT"] = 13] = "INDENT";
    EditorCommand[EditorCommand["UNINDENT"] = 14] = "UNINDENT";
    EditorCommand[EditorCommand["VALIGN"] = 15] = "VALIGN";
    EditorCommand[EditorCommand["FONT"] = 16] = "FONT";
    EditorCommand[EditorCommand["COLOR"] = 17] = "COLOR";
    EditorCommand[EditorCommand["BGCOLOR"] = 18] = "BGCOLOR";
    EditorCommand[EditorCommand["SIZE"] = 19] = "SIZE";
    EditorCommand[EditorCommand["BLOCK_LEVEL"] = 20] = "BLOCK_LEVEL";
    EditorCommand[EditorCommand["LIST"] = 21] = "LIST";
    EditorCommand[EditorCommand["INSERT_LINK"] = 22] = "INSERT_LINK";
    EditorCommand[EditorCommand["REMOVE_LINK"] = 23] = "REMOVE_LINK";
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
var TResizer;
(function (TResizer) {
    TResizer[TResizer["NW"] = 0] = "NW";
    TResizer[TResizer["NE"] = 1] = "NE";
    TResizer[TResizer["SW"] = 2] = "SW";
    TResizer[TResizer["SE"] = 3] = "SE";
    TResizer[TResizer["N"] = 4] = "N";
    TResizer[TResizer["S"] = 5] = "S";
    TResizer[TResizer["W"] = 6] = "W";
    TResizer[TResizer["E"] = 7] = "E";
    TResizer[TResizer["NONE"] = 8] = "NONE";
})(TResizer || (TResizer = {}));
var TClipboardEffect;
(function (TClipboardEffect) {
    TClipboardEffect[TClipboardEffect["COPY"] = 0] = "COPY";
    TClipboardEffect[TClipboardEffect["CUT"] = 1] = "CUT";
})(TClipboardEffect || (TClipboardEffect = {}));
;
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
    Helper.createCollectionFromHTMLText = function (s, documentElement) {
        try {
            var parser = new HTMLParser(documentElement, s || ''), nodes = [], i = 0, len = parser.NODES.length, element, n = 0, j = 0, traverser = null;
            for (i = 0; i < len; i++) {
                switch (parser.NODES[i].type) {
                    case '#text':
                        nodes.push(documentElement.createTextNode(parser.NODES[i].value));
                        break;
                    case 'node':
                        if (HTML_Body.IGNORE_ELEMENTS.indexOf(parser.NODES[i].nodeName) == -1) {
                            if (HTML_Body.TRAVERSE_ELEMENTS.indexOf(parser.NODES[i].nodeName) == -1) {
                                element = documentElement.createElement(parser.NODES[i].nodeName);
                                if (parser.NODES[i].attributes && (n = parser.NODES[i].attributes.length)) {
                                    for (j = 0; j < n; j++) {
                                        element.setAttribute(parser.NODES[i].attributes[j].name, parser.NODES[i].attributes[j].value);
                                    }
                                }
                                if (parser.NODES[i].children && parser.NODES[i].children.length) {
                                    element.setInnerNodes(parser.NODES[i].children, element);
                                }
                                nodes.push(element);
                            }
                            else {
                                if (parser.NODES[i].children && parser.NODES[i].children.length) {
                                    // TRAVERSE NODE CONTENTS
                                    traverser = traverser || documentElement.createElement('traverse');
                                    traverser.childNodes.splice(0, traverser.childNodes.length);
                                    traverser.setInnerNodes(parser.NODES[i].children, traverser);
                                    for (j = 0, n = traverser.childNodes.length; j < n; j++) {
                                        nodes.push(traverser.childNodes[j]);
                                    }
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            return new TNode_Collection(nodes);
        }
        catch (parserError) {
            return null;
        }
    };
    Helper.peek = function (o, properties) {
        var out = {};
        for (var i = 0, len = properties.length; i < len; i++) {
            if (o[properties[i]]) {
                out[properties[i]] = o[properties[i]];
            }
        }
        return out;
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
    TNode.prototype.is = function () {
        if (this.nodeType == 1 /* TEXT */) {
            return '#text';
        }
        else {
            return this.nodeName;
        }
    };
    TNode.prototype.hostElement = function () {
        var cursor = this, hosts = ['body', 'td', 'li'];
        while (hosts.indexOf(cursor.is()) == -1) {
            if (!cursor.parentNode) {
                return null;
            }
            cursor = cursor.parentNode;
        }
        return cursor;
    };
    /* Cuts the dom in deepness until the root node name is in the untilNodes list */
    TNode.prototype.cutDown = function (untilNodes) {
        if (!untilNodes.length) {
            return {
                "element": this.parentNode,
                "index": this.siblingIndex + 1
            };
        }
        var nodesLeft, nodesRight, self = this;
        if (self.nodeType == 1 /* TEXT */ && self.isBR) {
            self = this.parentNode;
        }
        var lParent = self.parentNode, rParent = null, nodesLeft = new TNode_Collection(self.elementsBeforeMyself(true));
        nodesRight = new TNode_Collection(self.elementsAfterMyself(false));
        while (lParent.parentNode && (lParent.parentNode != lParent.documentElement) && untilNodes.indexOf(lParent.parentNode.is()) == -1) {
            rParent = lParent.clone();
            nodesRight.wrapIn(rParent);
            lParent.parentNode.appendChild(rParent, lParent.siblingIndex + 1);
            nodesLeft = new TNode_Collection(lParent.elementsBeforeMyself(true));
            nodesRight = new TNode_Collection(rParent.elementsAfterMyself(true));
            lParent = lParent.parentNode;
        }
        if (lParent.parentNode) {
            rParent = lParent.clone();
            nodesRight.wrapIn(rParent);
            lParent.parentNode.appendChild(rParent, lParent.siblingIndex + 1);
        }
        else {
            throw "ERR_BAD_CUTDOWN";
        }
        return {
            "element": lParent.parentNode,
            "index": lParent.siblingIndex + 1
        };
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
        this.isSelectionPaintingDisabled = false; // The node is not painted as selected as a whole, if it is included inside a text range, by any circumstances,  by the paint method ( but it's text can be if it's selected )
        this.layout = null;
        this._tabStop = 0;
        if (!postStyleInit)
            this.style = new TStyle(this);
    }
    /* Appends a node in the element. If arugment @index is mentioned ( not null ),
       the element will be inserted at position @index
     */
    TNode_Element.prototype.appendChild = function (node, index) {
        if (index === void 0) { index = null; }
        var ownerBlockElement;
        /* If the node has style.float left || right, we append the node @ beginning
           of our ownerBlockElement()
         */
        if (node.nodeType == 2 /* ELEMENT */ && ['left', 'right', 'center'].indexOf(node.style.float()) >= 0 && (ownerBlockElement = this.ownerBlockElement()) && this != ownerBlockElement && ownerBlockElement.is() != 'body') {
            return ownerBlockElement.appendChild(node, 0);
        }
        else {
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
        }
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
    TNode_Element.prototype.xmlAttributes = function () {
        var out = [];
        if (this.style._textAlign.isSet && this.style._textAlign.value != 'left' && this.style.display() == 'block')
            out.push('align="' + this.style.textAlign() + '"');
        if (this.style._color.isSet)
            out.push('color="' + this.style.color() + '"');
        if (this.style._backgroundColor.isSet)
            out.push('bgcolor="' + this.style.backgroundColor() + '"');
        if (this._tabStop)
            out.push('data-tabstop="' + this._tabStop + '"');
        return out.join(' ');
    };
    /* Returns the element header as string ( for example for a "<p>asda</p>" it returns "<p>")
     */
    TNode_Element.prototype.xmlBeginning = function () {
        var attrs = this.xmlAttributes();
        return '<' + this.nodeName + (attrs ? ' ' + attrs : '') + (this.childNodes.length ? '' : '/') + '>';
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
        this.layout = layout;
        var borderColor, borderWidth, backgroundColor, range = this.documentElement.viewport.selection.getRange(), isSelected = false;
        if ((range.equalsNode(this) && this.isSelectable) || (range.contains(this.FRAGMENT_START + 1) && range.contains(this.FRAGMENT_END - 1) && !this.isSelectionPaintingDisabled)) {
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
    TNode_Element.prototype.paintResizeHandles = function (ctx, layout, scrollLeft, scrollTop) {
        var left = layout.offsetLeft - scrollLeft, top = layout.offsetTop - scrollTop, rng = this.documentElement.viewport.selection.getRange();
        if (!rng.focusNode() && rng.anchorNode().target == this) {
            ctx.fillStyle = '#000';
            ctx.fillRect(left, top, 4, 4);
            ctx.fillRect(left + layout.offsetWidth - 4, top, 4, 4);
            ctx.fillRect(left, top + layout.offsetHeight - 4, 4, 4);
            ctx.fillRect(left + layout.offsetWidth - 4, top + layout.offsetHeight - 4, 4, 4);
        }
    };
    TNode_Element.prototype.isSelected = function () {
        if (this.documentElement) {
            var rng = this.documentElement.viewport.selection.getRange(), focus = rng.focusNode(), anchor = rng.anchorNode();
            return !focus && anchor.target == this;
        }
        else
            return false;
    };
    TNode_Element.prototype.getResizerTypeAtMousePoint = function (point) {
        // set mouse shape, depending on which corer of the element is the mouse over
        var left = this.layout.offsetLeft, top = this.layout.offsetTop, width = this.layout.offsetWidth, height = this.layout.offsetHeight;
        if (this.isResizable && this.layout) {
            switch (true) {
                case point.x >= left && point.x <= left + 4 && point.y >= top && point.y <= top + 4:
                    return 0 /* NW */;
                    break;
                case point.x >= left + width - 4 && point.x <= left + width && point.y >= top && point.y <= top + 4:
                    return 1 /* NE */;
                    break;
                case point.x >= left && point.x <= left + 4 && point.y >= top + height - 4 && point.y <= top + height:
                    return 2 /* SW */;
                    break;
                case point.x >= left + width - 4 && point.x <= left + width && point.y >= top + height - 4 && point.y <= top + height:
                    return 3 /* SE */;
                    break;
                case point.x == left:
                    return 5 /* S */;
                    break;
                case point.x == left + width:
                    return 6 /* W */;
                case point.y == top:
                    return 4 /* N */;
                    break;
                case point.y == top + height:
                    return 5 /* S */;
                    break;
                default:
                    return 8 /* NONE */;
            }
        }
    };
    TNode_Element.prototype.onmousemove = function (point, button, driver) {
        return false;
    };
    TNode_Element.prototype.onmousedown = function (point, button, driver) {
        return false;
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
            case 'margin':
                this.style.margin(String(attributeValue || ''));
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
                if (!this.childNodes.length) {
                    this.remove();
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
        if (this.parentNode) {
            this.parentNode.appendCollection(collection = new TNode_Collection(this.childNodes), this.siblingIndex + 1);
            this.remove();
        }
        else {
            collection = new TNode_Collection(this.childNodes);
        }
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
    TNode_Element.prototype.tabStop = function (value) {
        if (value === void 0) { value = null; }
        if (value === null) {
            return this._tabStop;
        }
        else {
            //setter
            this._tabStop = ~~value;
            this._tabStop = this._tabStop < 0 ? 0 : this._tabStop;
            if (this.documentElement) {
                this.documentElement.requestRelayout();
                this.documentElement.changeThrottler.run();
            }
            return this._tabStop;
        }
    };
    return TNode_Element;
})(TNode);
var TNode_Collection = (function () {
    function TNode_Collection(addNodes) {
        if (addNodes === void 0) { addNodes = null; }
        this.nodes = [];
        this.parentNode = null; // will be used in TNode_Collection_Dettached later, but is declared here for wrapInElement/unwrapInElement
        this.leftSibling = null; // will be used in TNode_Collection_Dettached later, but is declared here for wrapInElement/unwrapInElement
        if (addNodes !== null) {
            for (var i = 0, len = addNodes.length; i < len; i++) {
                this.nodes.push(addNodes[i]);
            }
        }
    }
    TNode_Collection.prototype.isBlock = function (node) {
        var is = node.is();
        if (is == '#text') {
            return false;
        }
        else {
            if (TNode_Collection.BLOCK_NODES_LIST.indexOf(is) >= 0 && ['left', 'right'].indexOf(node.style.float()) == -1) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    TNode_Collection.prototype.isInline = function (node) {
        var is = node.is();
        if (is == '#text') {
            return true;
        }
        else {
            if (TNode_Collection.INLINE_NODES_LIST.indexOf(is) >= 0 || ['left', 'right'].indexOf(node.style.float()) >= 0) {
                return true;
            }
            else {
                return false;
            }
        }
    };
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
    /* Finds a succession of nodes whose names are @nodeNameIs, remove it from this collection and
       returns them into a new subcollection. Original index for the first removed item is returned
       in the @index.
     */
    TNode_Collection.prototype.spliceByNodeName = function (nodeNameIs) {
        var i = 0, j = 0, len = 0, nodes = [], m = 0;
        for (i = 0, len = this.nodes.length; i < len; i++) {
            if (this.nodes[i].is() == nodeNameIs) {
                m = 1;
                for (j = i + 1; j < len; j++) {
                    if (this.nodes[j].is() == nodeNameIs) {
                        m++;
                    }
                    else {
                        break;
                    }
                }
                nodes = this.nodes.splice(i, m);
                return { "collection": new TNode_Collection(nodes), index: i };
            }
        }
        return null;
    };
    /* Finds a succession of inline nodes, remove them from this collection and
       returns them into a new subcollection. Original index for the first removed item is returned
       in the @index.
     */
    TNode_Collection.prototype.spliceByInlineNodes = function (minAfterLength, maxBeforeLength) {
        if (minAfterLength === void 0) { minAfterLength = 0; }
        if (maxBeforeLength === void 0) { maxBeforeLength = 0; }
        var i = 0, j = 0, len = this.nodes.length - maxBeforeLength, nodes = [], m = 0;
        for (i = minAfterLength; i < len; i++) {
            if (this.isInline(this.nodes[i])) {
                m = 1;
                for (j = i + 1; j < len; j++) {
                    if (this.isInline(this.nodes[j])) {
                        m++;
                    }
                    else {
                        break;
                    }
                }
                nodes = this.nodes.splice(i, m);
                return { "collection": new TNode_Collection(nodes), index: i };
            }
        }
        return null;
    };
    /* Finds a succession of inline nodes, remove them from this collection and
       returns them into a new subcollection. Original index for the first removed item is returned
       in the @index.
     */
    TNode_Collection.prototype.spliceByBlockNodes = function (minAfterLength, maxBeforeLength) {
        if (minAfterLength === void 0) { minAfterLength = 0; }
        if (maxBeforeLength === void 0) { maxBeforeLength = 0; }
        var i = 0, j = 0, len = this.nodes.length - maxBeforeLength, nodes = [], m = 0;
        for (i = minAfterLength; i < len; i++) {
            if (this.isBlock(this.nodes[i])) {
                m = 1;
                for (j = i + 1; j < len; j++) {
                    if (this.isBlock(this.nodes[j])) {
                        m++;
                    }
                    else {
                        break;
                    }
                }
                nodes = this.nodes.splice(i, m);
                return { "collection": new TNode_Collection(nodes), index: i };
            }
        }
        return null;
    };
    /* Needed for normalizeForHost function only */
    TNode_Collection.prototype.computeInlineStartNodes = function () {
        var i = 0, len = 0, inlineStartNodes = 0;
        for (i = 0, len = this.nodes.length; i < len; i++) {
            if (this.isInline(this.nodes[i])) {
                inlineStartNodes++;
            }
            else {
                break;
            }
        }
        return inlineStartNodes;
    };
    /* Normalize (prepares)the collection for being able to be inserted inside of a host element.
     * This method is used by Selection.insertHTML.
     */
    TNode_Collection.prototype.normalizeForHost = function (hostNodeName, unwrapNodes) {
        //console.warn( unwrapNodes );
        var doc = this.nodes.length ? this.nodes[0].documentElement : null, seq = null, wrap, inlineStartNodes = 0, inlineEndNodes = 0, len = 0, i = 0, j = 0, n = 0;
        if (doc === null) {
            return this;
        }
        while (seq = this.spliceByNodeName('td')) {
            wrap = doc.createElement('tr');
            Helper.spliceApply(this.nodes, seq.index, 0, [seq.collection.wrapIn(wrap).at(0)]);
        }
        while (seq = this.spliceByNodeName('tr')) {
            wrap = doc.createElement('table');
            wrap.setAttribute('border', '1');
            wrap.setAttribute('bordercolor', 'black');
            Helper.spliceApply(this.nodes, seq.index, 0, [seq.collection.wrapIn(wrap).at(0)]);
        }
        while (seq = this.spliceByNodeName('li')) {
            wrap = doc.createElement('ul');
            Helper.spliceApply(this.nodes, seq.index, 0, [seq.collection.wrapIn(wrap).at(0)]);
        }
        inlineStartNodes = this.computeInlineStartNodes();
        for (j = 0, n = unwrapNodes.length; j < n; j++) {
            this.unwrapFromElement(unwrapNodes[j], null, 0, inlineStartNodes - 1);
            inlineStartNodes = this.computeInlineStartNodes();
        }
        if (inlineStartNodes < len) {
            for (i = len - 1; i >= 0; i--) {
                if (this.isInline(this.nodes[i])) {
                    inlineEndNodes++;
                }
                else {
                    break;
                }
            }
        }
        if (hostNodeName == 'td') {
            this.unwrapFromElement('p', null, inlineStartNodes, this.nodes.length - inlineEndNodes, 'br', 'br');
            this.unwrapFromElement('table', null, inlineStartNodes, this.nodes.length - inlineEndNodes);
            this.unwrapFromElement('tr', null, inlineStartNodes, this.nodes.length - inlineEndNodes);
            this.unwrapFromElement('td', null, inlineStartNodes, this.nodes.length - inlineEndNodes, 'br', 'br');
        }
        else {
            while (seq = this.spliceByInlineNodes(inlineStartNodes, inlineEndNodes)) {
                wrap = doc.createElement('p');
                Helper.spliceApply(this.nodes, seq.index, 0, [seq.collection.wrapIn(wrap).at(0)]);
            }
        }
        inlineStartNodes = this.computeInlineStartNodes();
        this.normalizedInlineStartNodes = inlineStartNodes;
        this.normalizedInlineEndNodes = inlineEndNodes;
        return this;
    };
    /* @nodeName: THe element name which is search for unwrapping process.

       @iFunc: A function which is evaluated on the parentNode context (this=parentNode), which if returns false,
               aborts the unwrap process.

       @indexStart, @indexEnd: Unwrap in the root only between @indexStart and @indexEnd.

       @addNodeAfterUnwrap: After unwrapping a node *in the root*, insert a element with node name addNodeAfterUnwrap.
       This is needed for example if we want to unwrap the p's, but add a <br/> after each p.
     */
    TNode_Collection.prototype.unwrapFromElement = function (nodeName, ifFunc, indexStart, indexEnd, addNodeBeforeUnwrap, addNodeAfterUnwrap) {
        if (ifFunc === void 0) { ifFunc = null; }
        if (indexStart === void 0) { indexStart = null; }
        if (indexEnd === void 0) { indexEnd = null; }
        if (addNodeBeforeUnwrap === void 0) { addNodeBeforeUnwrap = null; }
        if (addNodeAfterUnwrap === void 0) { addNodeAfterUnwrap = null; }
        if (this.parentNode !== null && ifFunc !== null && !(ifFunc.call(this.parentNode))) {
            return;
        }
        var subWraps = [], i = 0, len = this.nodes.length, addLen = 0, subChildren = [], unwrapped, doc;
        if (indexStart === null) {
            indexStart = 0;
        }
        if (indexEnd === null) {
            indexEnd = len;
        }
        if (len == 0) {
            return;
        }
        doc = this.nodes[0].documentElement;
        for (i = indexStart; i < indexEnd; i++) {
            switch (this.nodes[i].nodeType) {
                case 1 /* TEXT */:
                    break;
                case 2 /* ELEMENT */:
                    if (this.nodes[i].nodeName == nodeName) {
                        if (addNodeBeforeUnwrap) {
                            this.nodes.splice(i, 0, doc.createElement(addNodeBeforeUnwrap));
                            i++;
                        }
                        unwrapped = this.nodes[i].unwrap();
                        Helper.spliceApply(this.nodes, i, 1, unwrapped.nodes);
                        if (addNodeAfterUnwrap) {
                            this.nodes.splice(i + unwrapped.nodes.length, 0, doc.createElement(addNodeAfterUnwrap));
                        }
                        indexEnd = this.nodes.length;
                        i += unwrapped.nodes.length + (addNodeAfterUnwrap ? 0 : -1);
                    }
                    break;
            }
        }
        for (i = indexStart; i < indexEnd; i++) {
            if (this.nodes[i].nodeType == 2 /* ELEMENT */) {
                this.nodes[i].queryAll({ "nodeName": nodeName }).each(function () {
                    this.unwrap();
                });
            }
        }
    };
    TNode_Collection.prototype.wrapInElement = function (nodeName, elAttributeName, elAttributeValue, ifFunc) {
        if (elAttributeName === void 0) { elAttributeName = null; }
        if (elAttributeValue === void 0) { elAttributeValue = null; }
        if (ifFunc === void 0) { ifFunc = null; }
        if (this.parentNode && ifFunc !== null && !(ifFunc.call(this.parentNode))) {
            return;
        }
        var node = this.parentNode.documentElement.createElement(nodeName), i = 0, len = this.nodes.length, j = 0, k = 0;
        if (elAttributeName !== null) {
            if (typeof elAttributeName == 'string') {
                node.setAttribute(elAttributeName, elAttributeValue || '');
            }
            else {
                if (elAttributeName && elAttributeValue && elAttributeName.length == elAttributeValue.length) {
                    for (j = 0, k = elAttributeName.length; j < k; j++) {
                        node.setAttribute(elAttributeName[j], elAttributeValue[j]);
                    }
                }
            }
        }
        for (i = 0; i < len; i++) {
            node.appendChild(this.nodes[i]);
        }
        this.nodes = [node];
        if (this.parentNode)
            this.parentNode.appendChild(node, this.leftSibling === null ? 0 : this.leftSibling.siblingIndex + 1);
    };
    TNode_Collection.INLINE_NODES_LIST = [
        "#text",
        "a",
        "b",
        "!b",
        "i",
        "!i",
        "u",
        "!u",
        "strike",
        "!strike",
        "sup",
        "!sup",
        "sub",
        "!sub",
        "span",
        "color",
        "font",
        "size"
    ];
    TNode_Collection.BLOCK_NODES_LIST = [
        "body",
        "ul",
        "li",
        "ol",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "h7",
        "p",
        "img",
        "table",
        "tr",
        "td"
    ];
    return TNode_Collection;
})();
var TNode_Collection_Dettached = (function (_super) {
    __extends(TNode_Collection_Dettached, _super);
    function TNode_Collection_Dettached(parentNode, surgeryStart, surgeryEnd) {
        if (surgeryStart === void 0) { surgeryStart = 0; }
        if (surgeryEnd === void 0) { surgeryEnd = 0; }
        _super.call(this, []);
        this.surgeryStart = 0;
        this.surgeryEnd = 0;
        this.fragLTR = 0;
        this.fragRTL = 0;
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
    TNode_Collection_Dettached.prototype.reInsert = function () {
        console.warn(this.parentNode.nodeName);
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
    HTMLParser.HAS_ATTRIBUTE = function (node, attributeName) {
        for (var i = 0, len = node.attributes.length; i < len; i++) {
            if (node.attributes[i].name == attributeName && node.attributes[i].value) {
                return true;
            }
        }
        return false;
    };
    HTMLParser.GET_ATTRIBUTE = function (node, attributeName) {
        for (var i = 0, len = node.attributes.length; i < len; i++) {
            if (node.attributes[i].name == attributeName) {
                return String(node.attributes[i].value || '');
            }
        }
        return '';
    };
    HTMLParser.SET_ATTRIBUTE = function (node, attributeName, attributeValue) {
        for (var i = 0, len = node.attributes.length; i < len; i++) {
            if (node.attributes[i].name == attributeName) {
                if (attributeValue === null) {
                    node.attributes.splice(i, 1);
                    return;
                }
                else {
                    node.attributes[i].value = String(attributeValue || '');
                    return;
                }
            }
        }
        if (attributeValue !== null) {
            node.attributes.push({
                "name": String(attributeName || ''),
                "value": String(attributeValue || '')
            });
        }
    };
    HTMLParser.READ_NODE = function (data, doc) {
        var out = {
            "nodeName": "",
            "autoClose": false,
            "clearBuffer": "",
            "attributes": [],
            "children": [],
            "overrideNodeName": null
        }, matches, matches1, matches2, attribute, textContents = '', r, insensitive = true, overrideNodeName = null, dataTagAttribute = '', dataTagAttributeValue = '';
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
            if (out.nodeName == 'span') {
                /* We override the spans, if they have the data-tag set, with their internal node names */
                dataTagAttribute = HTMLParser.GET_ATTRIBUTE(out, 'data-tag');
                switch (true) {
                    case dataTagAttribute == '!b':
                    case dataTagAttribute == '!i':
                    case dataTagAttribute == '!u':
                    case dataTagAttribute == '!strike':
                    case dataTagAttribute == '!sub':
                    case dataTagAttribute == '!sup':
                        overrideNodeName = dataTagAttribute;
                        HTMLParser.SET_ATTRIBUTE(out, 'data-tag', null);
                        break;
                    case (matches2 = /^(color|font|size)\:(.*)?$/.exec(dataTagAttribute)) ? true : false:
                        HTMLParser.SET_ATTRIBUTE(out, 'data-tag', null);
                        dataTagAttribute = matches2[1];
                        dataTagAttributeValue = matches2[2] || '';
                        overrideNodeName = dataTagAttribute;
                        if (dataTagAttributeValue) {
                            switch (dataTagAttribute) {
                                case 'font':
                                    HTMLParser.SET_ATTRIBUTE(out, 'name', dataTagAttributeValue);
                                    break;
                                case 'color':
                                    HTMLParser.SET_ATTRIBUTE(out, 'name', dataTagAttributeValue);
                                    break;
                                case 'size':
                                    HTMLParser.SET_ATTRIBUTE(out, 'value', dataTagAttributeValue);
                                    break;
                            }
                        }
                        break;
                    default:
                        break;
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
            if (overrideNodeName) {
                out.overrideNodeName = overrideNodeName;
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
                                if (token2.overrideNodeName) {
                                    token2.nodeName = token2.overrideNodeName;
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
        this._tabSize = 20;
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
    HTML_Body.prototype.tabSize = function (size) {
        if (size === void 0) { size = null; }
        if (size === null) {
            return this._tabSize;
        }
        else {
            this._tabSize = ~~size < 0 ? 0 : ~~size;
            this.requestRelayout();
            return this._tabSize;
        }
    };
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
            case 'strike':
                node = new HTML_Strike();
                break;
            case '!strike':
                node = new HTML_NegationNode('strike');
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
        this.viewport._clientWidth = this._layout.offsetWidth + this._layout.offsetHeight;
        this.viewport._clientHeight = this._layout.offsetHeight + this._layout.offsetTop;
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
    HTML_Body.prototype.createCollectionFromHTMLText = function (s) {
        return Helper.createCollectionFromHTMLText(s, this);
    };
    /* The body cannot have direct float=left or float=right children. */
    HTML_Body.prototype.evaluateLayout = function (left, center, right, argIndex) {
        if (argIndex === void 0) { argIndex = 0; }
        var i = 0, len = this.childNodes.length, oldArgIndex = argIndex, currentArgIndex = argIndex, j = 0, n = 0, layoutType = '', lblock, lchar, children;
        for (i = 0, children = this.childNodes, len = children.length; i < len; i++) {
            if (children[i].nodeType == 1 /* TEXT */) {
                currentArgIndex = 1;
                layoutType = 'Layout_BlockChar';
            }
            else {
                switch (true) {
                    case children[i].style.display() == 'block':
                        layoutType = 'Layout_Block';
                        currentArgIndex = 1;
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
    /* These are the types of node that can be safely imported / exported by the editor.
       
       Note that document.createElement may create internally a more richer list of nodes,
       but they are not supported by the browser.
    */
    HTML_Body.IMPLEMENTED_NODES = [
        'p',
        'br',
        'img',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'b',
        'strong',
        'i',
        'em',
        'u',
        'a',
        'ul',
        'ol',
        'li',
        'sup',
        'sub',
        'strike',
        'table',
        'tr',
        'td',
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
        TStyle_Browser_Calculator.applyDefaultStyles(this, 'p', [
            'fontSize',
            'fontWeight',
            'paddingTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight',
            'fontFamily',
            'fontWeight'
        ]);
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
        this.isResizable = true;
        this._alt = null;
        this.nodeName = 'img';
        this.style.display('block');
        this.style.margin('5');
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
            if (source !== this.node.getAttribute('src')) {
                // setter
                this.loaded = false;
                this.error = false;
                this.node.setAttribute('src', String(source || ''));
                this.requestRelayout();
            }
        }
    };
    HTML_Image.prototype.alt = function (str) {
        if (str === void 0) { str = null; }
        if (str === null) {
            return this._alt;
        }
        else {
            this._alt = String(str) || null;
            if (this.documentElement) {
                this.documentElement.changeThrottler.run();
            }
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
            case 'alt':
                this.alt(attributeValue || '');
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
                if (this.isPaintedSelected) {
                    ctx.globalAlpha = 1;
                    this.paintResizeHandles(ctx, layout, scrollLeft, scrollTop);
                }
            }
        }
    };
    HTML_Image.prototype.xmlBeginning = function () {
        var attrs = [], tmp;
        if (tmp = this.src()) {
            attrs.push('src="' + tmp + '"');
        }
        attrs.push('width="' + ~~this.style.width() + '"');
        attrs.push('height="' + ~~this.style.height() + '"');
        if (this.style._float.isSet) {
            attrs.push('align="' + this.style.float() + '"');
        }
        if (this._alt) {
            attrs.push('alt="' + this._alt + '"');
        }
        return '<img ' + attrs.join(' ') + ' />';
    };
    HTML_Image.prototype.removeOrphanNodes = function () {
        // void, intentionally.
    };
    // images don't have tabstops
    HTML_Image.prototype.tabStop = function (value) {
        if (value === void 0) { value = null; }
        return 0;
    };
    HTML_Image.prototype.onmousemove = function (point, button, driver) {
        if (this.isSelected() && button == 0) {
            var resizer = this.getResizerTypeAtMousePoint(point), cursor = '';
            if ([0 /* NW */, 1 /* NE */, 2 /* SW */, 3 /* SE */].indexOf(resizer) >= 0) {
                switch (resizer) {
                    case 0 /* NW */:
                        cursor = 'nw-resize';
                        break;
                    case 1 /* NE */:
                        cursor = 'ne-resize';
                        break;
                    case 3 /* SE */:
                        cursor = 'se-resize';
                        break;
                    case 2 /* SW */:
                        cursor = 'sw-resize';
                        break;
                }
                this.documentElement.viewport.canvas.style.cursor = cursor;
                return true;
            }
            else {
                this.documentElement.viewport.canvas.style.cursor = 'default';
                return false;
            }
        }
        else {
            return false;
        }
    };
    HTML_Image.prototype.onmousedown = function (point, button, driver) {
        if (this.isSelected() && button == 1) {
            var resizer = this.getResizerTypeAtMousePoint(point);
            if ([0 /* NW */, 1 /* NE */, 2 /* SW */, 3 /* SE */].indexOf(resizer) >= 0) {
                driver.lockTargetForResizing(this, resizer, point);
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
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
        TStyle_Browser_Calculator.applyDefaultStyles(this, 'h1', [
            'fontSize',
            'fontWeight',
            'paddingTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight',
            'fontFamily',
            'fontWeight'
        ]);
        /*
        this.style.fontSize('18');
        this.style.fontWeight('bold');
        */
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
        TStyle_Browser_Calculator.applyDefaultStyles(this, 'h2', [
            'fontSize',
            'fontWeight',
            'paddingTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight',
            'fontFamily',
            'fontWeight'
        ]);
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
        TStyle_Browser_Calculator.applyDefaultStyles(this, 'h3', [
            'fontSize',
            'fontWeight',
            'paddingTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight',
            'fontFamily',
            'fontWeight'
        ]);
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
        TStyle_Browser_Calculator.applyDefaultStyles(this, 'h4', [
            'fontSize',
            'fontWeight',
            'paddingTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight',
            'fontFamily',
            'fontWeight'
        ]);
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
        TStyle_Browser_Calculator.applyDefaultStyles(this, 'h5', [
            'fontSize',
            'fontWeight',
            'paddingTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight',
            'fontFamily',
            'fontWeight'
        ]);
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
        this._href = null;
        this._target = null;
        this._name = null;
        this.nodeName = 'a';
        this.style.display('inline');
        this.style.color('blue');
        this.style.textDecoration('underline');
    }
    HTML_Anchor.prototype.href = function (s) {
        if (s === void 0) { s = null; }
        if (s === null) {
            return this._href;
        }
        else {
            this._href = String(s || '') || null;
            return this._href;
        }
    };
    HTML_Anchor.prototype.target = function (s) {
        if (s === void 0) { s = null; }
        if (s === null) {
            return this._target;
        }
        else {
            this._target = String(s || '') || null;
            return this._target;
        }
    };
    HTML_Anchor.prototype.name = function (s) {
        if (s === void 0) { s = null; }
        if (s === null) {
            return this._name;
        }
        else {
            this._name = String(s || '') || null;
            return this._name;
        }
    };
    HTML_Anchor.prototype.setAttribute = function (attributeName, attributeValue) {
        switch (attributeName) {
            case 'href':
                this.href(attributeValue);
                break;
            case 'target':
                this.target(attributeValue);
                break;
            case 'name':
                this.name(attributeValue);
                break;
            default:
                _super.prototype.setAttribute.call(this, attributeName, attributeValue);
                break;
        }
    };
    HTML_Anchor.prototype.xmlBeginning = function () {
        var attrs = [];
        if (this._href) {
            attrs.push('href="' + this._href + '"');
        }
        if (this._target) {
            attrs.push('target="' + this._target + '"');
        }
        if (this._name) {
            attrs.push('name="' + this._name + '"');
        }
        return '<a' + (attrs.length ? ' ' + attrs.join(' ') : '') + '>';
    };
    HTML_Anchor.prototype.xmlEnding = function () {
        return '</a>';
    };
    HTML_Anchor.prototype.clone = function () {
        var cloned = this.documentElement.createElement('a');
        cloned.name(this.name());
        cloned.href(this.href());
        cloned.target(this.target());
        return cloned;
    };
    return HTML_Anchor;
})(TNode_Element);
var HTML_BulletedList = (function (_super) {
    __extends(HTML_BulletedList, _super);
    function HTML_BulletedList() {
        _super.call(this);
        this.isSelectionPaintingDisabled = true;
        this.nodeName = 'ul';
        this.style.display('block');
        TStyle_Browser_Calculator.applyDefaultStyles(this, 'ul', [
            'paddingTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight'
        ]);
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
    // lists don't have tabstops, only list items.
    HTML_BulletedList.prototype.tabStop = function (value) {
        if (value === void 0) { value = null; }
        return 0;
    };
    return HTML_BulletedList;
})(TNode_Element);
var HTML_OrderedList = (function (_super) {
    __extends(HTML_OrderedList, _super);
    function HTML_OrderedList() {
        _super.call(this);
        this.isSelectionPaintingDisabled = true;
        this.nodeName = 'ol';
        this.style.display('block');
        TStyle_Browser_Calculator.applyDefaultStyles(this, 'ol', [
            'paddingTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight'
        ]);
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
    // lists don't have tabstops, only list items.
    HTML_OrderedList.prototype.tabStop = function (value) {
        if (value === void 0) { value = null; }
        return 0;
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
        TStyle_Browser_Calculator.applyDefaultStyles(this, 'li', [
            'fontSize',
            'fontWeight',
            'paddingTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight',
            'fontFamily',
            'fontWeight'
        ]);
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
    HTML_ListItem.prototype.becomeElement = function (elementName) {
        var breakResult, element, parent = this.parentNode;
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
            if (parent.childNodes.length == 0) {
                parent.remove();
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
    HTML_ListItem.prototype.tabStop = function (value) {
        if (value === void 0) { value = null; }
        var parentNode = null, siblingIndex = 0;
        if (value == -1) {
            if (this.parentNode.parentNode.is() == 'li') {
                parentNode = this.parentNode;
                siblingIndex = parentNode.siblingIndex;
                parentNode.breakBeforeOption(this);
                parentNode.parentNode.createSurgery(parentNode.FRAGMENT_END);
                parentNode.parentNode.parentNode.appendChild(this, parentNode.parentNode.siblingIndex + 1);
                if (parentNode.childNodes.length == 0) {
                    parentNode.remove();
                }
            }
            return 0;
        }
        else {
            return _super.prototype.tabStop.call(this, value);
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
        (function (me) {
            me.style.on('changed', function (propertyName) {
                if (propertyName == 'borderColor' && me.documentElement) {
                    me.documentElement.changeThrottler.run();
                }
            });
        })(this);
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
    HTML_Table.prototype.removeChild = function (node) {
        var returnValue = _super.prototype.removeChild.call(this, node);
        this.requestCompile();
        return returnValue;
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
    HTML_Table.prototype.xmlBeginning = function () {
        var attrs = [];
        if (this._border)
            attrs.push('border="' + this._border + '"');
        attrs.push('cellspacing="' + ~~(this._cellSpacing) + '"');
        if (this._cellPadding)
            attrs.push('cellpadding="' + this._cellPadding + '"');
        if (this.style._borderColor.isSet)
            attrs.push('bordercolor="' + this.style.borderColor() + '"');
        if (this.style._width.isSet) {
            attrs.push('width="' + this.style.width() + '"');
        }
        return '<table' + (attrs.length ? ' ' + attrs.join(' ') : '') + '>';
    };
    HTML_Table.prototype.xmlEnding = function () {
        return '</table>';
    };
    HTML_Table.prototype.removeFromDOMAtUserCommand = function () {
        return false; // tables cannot be removed even if they are selected when the user press a removal key
    };
    // tables don't have tabstops
    HTML_Table.prototype.tabStop = function (value) {
        if (value === void 0) { value = null; }
        return 0;
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
    HTML_TableRow.prototype.removeChild = function (node) {
        var returnValue = _super.prototype.removeChild.call(this, node);
        this.ownerTable.requestCompile();
        return returnValue;
    };
    HTML_TableRow.prototype.removeFromDOMAtUserCommand = function () {
        return false; // table rows cannot be removed even if they are selected when the user press a removal key
    };
    // table rows don't have tabstops
    HTML_TableRow.prototype.tabStop = function (value) {
        if (value === void 0) { value = null; }
        return 0;
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
        TStyle_Browser_Calculator.applyDefaultStyles(this, 'td', [
            'fontSize',
            'fontWeight',
            'paddingTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'fontFamily',
            'fontWeight'
        ]);
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
    // table cells don't have tabstops
    HTML_TableCell.prototype.tabStop = function (value) {
        if (value === void 0) { value = null; }
        return 0;
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
            case 'strike':
                this.style.textDecoration('none');
                break;
            case 'sup':
            case 'sub':
                this.style.verticalAlign('normal');
                break;
        }
    }
    HTML_NegationNode.prototype.xmlBeginning = function () {
        var out = '<span data-tag="' + this.nodeName + '" style="';
        switch (this.nodeName) {
            case '!b':
                out += 'font-weight: normal;';
                break;
            case '!i':
                out += 'font-style: normal;';
                break;
            case '!u':
            case '!strike':
                out += 'text-decoration: none;';
                break;
            case '!sub':
            case '!sup':
                out += 'vertical-align: baseline;';
                break;
        }
        out += '">';
        return out;
    };
    HTML_NegationNode.prototype.xmlEnding = function () {
        return '</span>';
    };
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
        return '<span data-tag="font:' + this._name + '"' + (this._name ? ' style="font-family: \'' + this._name + '\'"' : '') + '>';
    };
    HTML_Font.prototype.xmlEnding = function () {
        return '</span>';
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
        return '<span data-tag="color:' + this._name + '"' + (this._name ? ' style="color: ' + this._name + '"' : '') + '>';
    };
    HTML_Color.prototype.xmlEnding = function () {
        return '</span>';
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
        return '<span data-tag="size:' + (this._value ? this._value : '') + '"' + ((this._value) ? ' style="font-size: ' + this._value + 'px"' : '') + '>';
    };
    HTML_Size.prototype.xmlEnding = function () {
        return '</span>';
    };
    HTML_Size.prototype.canDefragmentWith = function (size) {
        return size.value() == this.value();
    };
    return HTML_Size;
})(TNode_Element);
var HTML_Strike = (function (_super) {
    __extends(HTML_Strike, _super);
    function HTML_Strike() {
        _super.call(this);
        this.isDefragmentable = true;
        this.nodeName = 'strike';
        this.style.display('inline');
        this.style.textDecoration('line-through');
    }
    return HTML_Strike;
})(TNode_Element);
var TStyle = (function (_super) {
    __extends(TStyle, _super);
    function TStyle(node) {
        _super.call(this);
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
            this.fire('changed', "width");
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
            this.fire('changed', "height");
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
            this.fire('changed', "aspectRatio");
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
            this.fire('changed', "paddingLeft");
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
            this.fire('changed', "paddingTop");
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
            this.fire('changed', "paddingRight");
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
            this.fire('changed', "paddingBottom");
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
            this.fire('changed', "marginLeft");
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
            this.fire('changed', "marginTop");
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
            this.fire('changed', "marginRight");
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
            this.fire('changed', "marginBottom");
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
            this.fire('changed', "borderWidth");
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
            this.fire('changed', "fontSize");
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
            this.fire('changed', "lineHeight");
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
            this.fire('changed', "fontFamily");
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
            this.fire('changed', "fontStyle");
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
            this.fire('changed', "fontWeight");
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
            this.fire('changed', "textDecoration");
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
            this.fire('changed', "display");
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
            this.fire('changed', "color");
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
            this.fire('changed', "backgroundColor");
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
            this.fire('changed', "borderColor");
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
            if (['left', 'right', 'center'].indexOf(v) >= 0) {
                var blockElement = this.node.ownerBlockElement();
                if (blockElement && blockElement.is() != 'body') {
                    blockElement.appendChild(this.node, v == 'center' ? null : 0);
                }
            }
            this.fire('changed', "float");
            return v;
        }
    };
    TStyle.prototype.padding = function (value) {
        this._paddingLeft.value = this._paddingRight.value = this._paddingTop.value = this._paddingBottom.value = (parseFloat(value || '0') || 0);
        this._paddingLeft.isSet = this._paddingRight.isSet = this._paddingBottom.isSet = this._paddingTop.isSet = true;
        this.node.requestRelayout();
        this.fire('changed', "padding");
    };
    TStyle.prototype.margin = function (value) {
        this._marginLeft.value = this._marginRight.value = this._marginTop.value = this._marginBottom.value = (parseFloat(value || '0') || 0);
        this._marginLeft.isSet = this._marginRight.isSet = this._marginBottom.isSet = this._marginTop.isSet = true;
        this.node.requestRelayout();
        this.fire('changed', "margin");
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
            this.fire('changed', "textAlign");
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
            this.fire('changed', "verticalAlign");
            return value;
        }
    };
    TStyle.prototype.offsetWidth = function () {
        return this.borderWidth() + this.paddingLeft() + this.width() + this.paddingRight() + this.borderWidth();
    };
    TStyle.prototype.offsetHeight = function () {
        return this.borderWidth() + this.paddingTop() + this.height() + this.paddingRight() + this.borderWidth();
    };
    TStyle.prototype.copyTo = function (style, properties) {
        for (var i = 0, len = properties.length; i < len; i++) {
            if (properties[i] && this['_' + properties[i]] && style['_' + properties[i]] && typeof this['_' + properties[i]].isSet != 'undefined') {
                this['_' + properties[i]].copyTo(style['_' + properties[i]]);
            }
        }
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
        "underline",
        "line-through"
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
})(Events);
/* This class is used to read the default appearence of the nodes in the browser,
   in order to apply them as best as possible inside the canvas */
var TStyle_Browser_Calculator = (function () {
    function TStyle_Browser_Calculator() {
    }
    TStyle_Browser_Calculator.parseColor = function (c) {
        var matches, rs, gs, bs;
        switch (true) {
            case /^\#[a-f\d]{3}$/i.test(c):
            case /^\#[a-f\d]{6}$/i.test(c):
            case /^[a-z]+$/i.test(c):
                return c;
                break;
            case (matches = /^rgb\(([\s]+)?([\d]+)([\s]+)?\,([\s]+)?([\d]+)([\s]+)?\,([\s]+)?([\d]+)([\s]+)?\)$/i.exec(c)) ? true : false:
            case (matches = /^rgba\(([\s]+)?([\d]+)([\s]+)?\,([\s]+)?([\d]+)([\s]+)?\,([\s]+)?([\d]+)([\s]+)?\,([\s]+)?([\d]+)([\s]+)?\)$/i.exec(c)) ? true : false:
                rs = (~~matches[2]).toString(16);
                gs = (~~matches[5]).toString(16);
                bs = (~~matches[8]).toString(16);
                rs = rs.length == 1 ? '0' + rs : rs;
                gs = gs.length == 1 ? '0' + gs : gs;
                bs = bs.length == 1 ? '0' + bs : bs;
                return '#' + rs + gs + bs;
                break;
            default:
                return null;
                break;
        }
    };
    TStyle_Browser_Calculator.parseDimension = function (c) {
        var matches = /^([\-])?([\d\.]+)(px|\%)$/.exec(c), f, f1;
        if (!matches) {
            return null;
        }
        else {
            f = String(matches[1] || '') + (matches[2] || '');
            if (f.indexOf('.') > -1) {
                f = parseFloat(f).toFixed(1);
            }
            return f + (matches[3] == '%' ? '%' : '');
        }
    };
    TStyle_Browser_Calculator.initializeNode = function (nodeName) {
        var node = document.createElement(nodeName), computed;
        if (nodeName == 'a') {
            node.innerHTML = 'aaa';
            node['href'] = '#';
        }
        document.body.appendChild(node);
        computed = Helper.peek(window.getComputedStyle(node), [
            "color",
            "backgroundColor",
            "borderWidth",
            "borderColor",
            "paddingLeft",
            "paddingRight",
            "paddingBottom",
            "paddingTop",
            "marginLeft",
            "marginRight",
            "marginTop",
            "marginBottom",
            "fontFamily",
            "fontSize",
            "textDecoration",
            "fontStyle",
            "fontWeight",
            "verticalAlign",
            "textAlign"
        ]);
        computed['color'] = TStyle_Browser_Calculator.parseColor(computed['color']);
        computed['backgroundColor'] = TStyle_Browser_Calculator.parseColor(computed['backgroundColor']);
        computed['backgroundColor'] = computed['backgroundColor'] == '#000000' ? null : computed['backgroundColor'];
        computed['borderColor'] = TStyle_Browser_Calculator.parseColor(computed['borderColor']);
        computed['borderWidth'] = TStyle_Browser_Calculator.parseDimension(computed['borderWidth']);
        computed['paddingLeft'] = TStyle_Browser_Calculator.parseDimension(computed['paddingLeft']);
        computed['paddingRight'] = TStyle_Browser_Calculator.parseDimension(computed['paddingRight']);
        computed['paddingBottom'] = TStyle_Browser_Calculator.parseDimension(computed['paddingBottom']);
        computed['paddingTop'] = TStyle_Browser_Calculator.parseDimension(computed['paddingTop']);
        computed['marginLeft'] = TStyle_Browser_Calculator.parseDimension(computed['marginLeft']);
        computed['marginRight'] = TStyle_Browser_Calculator.parseDimension(computed['marginRight']);
        computed['marginBottom'] = TStyle_Browser_Calculator.parseDimension(computed['marginBottom']);
        computed['marginTop'] = TStyle_Browser_Calculator.parseDimension(computed['marginTop']);
        computed['fontSize'] = TStyle_Browser_Calculator.parseDimension(computed['fontSize']);
        computed['textAlign'] = ['left', 'right', 'center', 'justify', 'justified'].indexOf(computed['textAlign']) >= 0 ? computed['textAlign'] : null;
        if (computed['textAlign'] == 'justify') {
            computed['textAlign'] = 'justified';
        }
        computed['fontFamily'] = /^"(.*)"$/.test(computed['fontFamily']) ? computed['fontFamily'].substr(1, computed['fontFamily'].length - 2) : computed['fontFamily'];
        computed['fontFamily'] = /^'(.*)'$/.test(computed['fontFamily']) ? computed['fontFamily'].substr(1, computed['fontFamily'].length - 2) : computed['fontFamily'];
        if (computed['verticalAlign'] != 'sub' && computed['verticalAlign'] != 'super') {
            computed['verticalAlign'] = null;
        }
        else {
            if (computed['verticalAlign'] == 'super') {
                computed['verticalAlign'] = 'sup';
            }
        }
        if (TStyle.$FontFamily.indexOf(computed['fontFamily']) == -1) {
            computed['fontFamily'] = 'Times New Roman';
        }
        var computed1 = {};
        for (var k in computed) {
            if (computed[k]) {
                computed1[k] = computed[k];
            }
        }
        TStyle_Browser_Calculator.nativeNodes[nodeName] = computed1;
        document.body.removeChild(node);
    };
    TStyle_Browser_Calculator.initialize = function () {
        var nodes = HTML_Body.IMPLEMENTED_NODES, i = 0, len = nodes.length;
        for (i = 0; i < len; i++) {
            TStyle_Browser_Calculator.initializeNode(nodes[i]);
        }
    };
    TStyle_Browser_Calculator.applyDefaultStyles = function (node, fromNode, styleNames) {
        for (var i = 0, len = styleNames.length; i < len; i++) {
            if (TStyle_Browser_Calculator.nativeNodes[fromNode][styleNames[i]]) {
                node.style[styleNames[i]](TStyle_Browser_Calculator.nativeNodes[fromNode][styleNames[i]]);
            }
        }
    };
    TStyle_Browser_Calculator.nativeNodes = {};
    return TStyle_Browser_Calculator;
})();
window.addEventListener('load', function () {
    TStyle_Browser_Calculator.initialize();
}, true);
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
    TStyle_Property.prototype.copyTo = function (property) {
        property.value = this.value;
        property.isSet = this.isSet;
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
        white: "#ffffff",
        ivory: "#fffff0",
        lightyellow: "#ffffe0",
        yellow: "#ffff00",
        snow: "#fffafa",
        floralwhite: "#fffaf0",
        lemonchiffon: "#fffacd",
        cornsilk: "#fff8dc",
        seashell: "#fff5ee",
        lavenderblush: "#fff0f5",
        papayawhip: "#ffefd5",
        blanchedalmond: "#ffebcd",
        mistyrose: "#ffe4e1",
        bisque: "#ffe4c4",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        peachpuff: "#ffdab9",
        gold: "#ffd700",
        pink: "#ffc0cb",
        lightpink: "#ffb6c1",
        orange: "#ffa500",
        lightsalmon: "#ffa07a",
        darkorange: "#ff8c00",
        coral: "#ff7f50",
        hotpink: "#ff69b4",
        tomato: "#ff6347",
        orangered: "#ff4500",
        deeppink: "#ff1493",
        fuchsia: "#ff00ff",
        magenta: "#ff00ff",
        red: "#ff0000",
        oldlace: "#fdf5e6",
        lightgoldenrodyellow: "#fafad2",
        linen: "#faf0e6",
        antiquewhite: "#faebd7",
        salmon: "#fa8072",
        ghostwhite: "#f8f8ff",
        mintcream: "#f5fffa",
        whitesmoke: "#f5f5f5",
        beige: "#f5f5dc",
        wheat: "#f5deb3",
        sandybrown: "#f4a460",
        azure: "#f0ffff",
        honeydew: "#f0fff0",
        aliceblue: "#f0f8ff",
        khaki: "#f0e68c",
        lightcoral: "#f08080",
        palegoldenrod: "#eee8aa",
        violet: "#ee82ee",
        darksalmon: "#e9967a",
        lavender: "#e6e6fa",
        lightcyan: "#e0ffff",
        burlywood: "#deb887",
        plum: "#dda0dd",
        gainsboro: "#dcdcdc",
        crimson: "#dc143c",
        palevioletred: "#db7093",
        goldenrod: "#daa520",
        orchid: "#da70d6",
        thistle: "#d8bfd8",
        lightgray: "#d3d3d3",
        tan: "#d2b48c",
        chocolate: "#d2691e",
        peru: "#cd853f",
        indianred: "#cd5c5c",
        mediumvioletred: "#c71585",
        silver: "#c0c0c0",
        darkkhaki: "#bdb76b",
        rosybrown: "#bc8f8f",
        mediumorchid: "#ba55d3",
        darkgoldenrod: "#b8860b",
        firebrick: "#b22222",
        powderblue: "#b0e0e6",
        lightsteelblue: "#b0c4de",
        paleturquoise: "#afeeee",
        greenyellow: "#adff2f",
        lightblue: "#add8e6",
        darkgray: "#a9a9a9",
        brown: "#a52a2a",
        sienna: "#a0522d",
        yellowgreen: "#9acd32",
        darkorchid: "#9932cc",
        palegreen: "#98fb98",
        darkviolet: "#9400d3",
        mediumpurple: "#9370db",
        lightgreen: "#90ee90",
        darkseagreen: "#8fbc8f",
        saddlebrown: "#8b4513",
        darkmagenta: "#8b008b",
        darkred: "#8b0000",
        blueviolet: "#8a2be2",
        lightskyblue: "#87cefa",
        skyblue: "#87ceeb",
        gray: "#808080",
        olive: "#808000",
        purple: "#800080",
        maroon: "#800000",
        aquamarine: "#7fffd4",
        chartreuse: "#7fff00",
        lawngreen: "#7cfc00",
        mediumslateblue: "#7b68ee",
        lightslategray: "#778899",
        slategray: "#708090",
        olivedrab: "#6b8e23",
        slateblue: "#6a5acd",
        dimgray: "#696969",
        mediumaquamarine: "#66cdaa",
        cornflowerblue: "#6495ed",
        cadetblue: "#5f9ea0",
        darkolivegreen: "#556b2f",
        indigo: "#4b0082",
        mediumturquoise: "#48d1cc",
        darkslateblue: "#483d8b",
        steelblue: "#4682b4",
        royalblue: "#4169e1",
        turquoise: "#40e0d0",
        mediumseagreen: "#3cb371",
        limegreen: "#32cd32",
        darkslategray: "#2f4f4f",
        seagreen: "#2e8b57",
        forestgreen: "#228b22",
        lightseagreen: "#20b2aa",
        dodgerblue: "#1e90ff",
        midnightblue: "#191970",
        aqua: "#00ffff",
        cyan: "#00ffff",
        springgreen: "#00ff7f",
        lime: "#00ff00",
        mediumspringgreen: "#00fa9a",
        darkturquoise: "#00ced1",
        deepskyblue: "#00bfff",
        darkcyan: "#008b8b",
        teal: "#008080",
        green: "#008000",
        darkgreen: "#006400",
        blue: "#0000ff",
        mediumblue: "#0000cd",
        darkblue: "#00008b",
        navy: "#000080",
        black: "#000000"
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
    Layout.prototype.computeWidths = function (offsetLeftComputed) {
        if (offsetLeftComputed === void 0) { offsetLeftComputed = false; }
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
        var widthLeft = this.innerWidth, computeAfter = [], leftPosition = this.innerLeft, i = 0, len = this.children.length, averageWidth = 0, sumWidths = 0, optimalWidth = 0, tabSize = (this.children && len && this.children[0].node && this.children[0].node.documentElement) ? this.children[0].node.documentElement.tabSize() : 0;
        for (i = 0; i < len; i++) {
            if (this.children[i].node) {
                // the child has a node associated.
                // if the node has a width, we set it's width as the
                // node width, otherwise we set it's width automatically
                if (this.children[i].node.style._width.isSet) {
                    this.children[i].offsetWidth = this.children[i].node.style.width() + (this.children[i].node.style.borderWidth() * 2) + this.children[i].node.style.paddingLeft() + this.children[i].node.style.paddingRight() + (this.children[i].node.tabStop() * tabSize);
                    sumWidths += this.children[i].offsetWidth;
                }
                else {
                    computeAfter.push(this.children[i]);
                }
                sumWidths += (this.children[i].node.style.marginLeft() + this.children[i].node.style.marginRight());
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
                leftPosition += this.children[i].node.style.marginLeft();
                this.children[i].offsetLeft = leftPosition;
                this.children[i].innerLeft = this.children[i].offsetLeft + this.children[i].node.style.paddingLeft() + (this.children[i].node.tabStop() * tabSize) + this.children[i].node.style.borderWidth();
                this.children[i].innerWidth = this.children[i].offsetWidth - (this.children[i].node.style.borderWidth() * 2) - this.children[i].node.style.paddingLeft() - (this.children[i].node.tabStop() * tabSize) - this.children[i].node.style.paddingRight();
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
            this.children[i].computeWidths(true);
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
                topPlacementMax = Math.max(topPlacementMax, this.children[i].computeHeights(topPlacement - (this.children[i].node ? this.children[i].node.style.marginTop() : 0), indent + 1) - (this.children[i].node ? this.children[i].node.style.marginBottom() : 0));
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
    Layout_Vertical.prototype.computeWidths = function (offsetLeftComputed) {
        if (offsetLeftComputed === void 0) { offsetLeftComputed = false; }
        var i = 0, len = this.children.length, tabSize = (this.children && len && this.children[0].node && this.children[0].node.documentElement) ? this.children[0].node.documentElement.tabSize() : 0, floatVal, needAdd;
        for (i = 0; i < len; i++) {
            if (this.children[i].node) {
                // the child is represented by a node
                // compute offsetleft and innerLeft
                this.children[i].offsetLeft = this.innerLeft + this.children[i].node.style.marginLeft() - this.children[i].node.style.borderWidth();
                // if the child has a specified width, set the width to the layout,
                // otherwise determine it's width by this parent
                if (this.children[i].node.style._width.isSet) {
                    this.children[i].innerWidth = this.children[i].node.style.width();
                    this.children[i].offsetWidth = this.children[i].node.style.offsetWidth();
                }
                else {
                    this.children[i].innerWidth = this.innerWidth - (this.children[i].node.style.borderWidth() * 2) - this.children[i].node.style.paddingLeft() - (this.children[i].node.tabStop() * tabSize) - this.children[i].node.style.paddingRight() - this.children[i].node.style.marginLeft() - this.children[i].node.style.marginRight();
                    this.children[i].offsetWidth = this.children[i].innerWidth + this.children[i].node.style.paddingLeft() + (this.children[i].node.tabStop() * tabSize) + this.children[i].node.style.paddingRight() + (this.children[i].node.style.borderWidth() * 2);
                }
                /* If the child node has a "float=left|right" style property, align
                   the node properly */
                if (['right', 'center'].indexOf(floatVal = this.children[i].node.style.float()) >= 0) {
                    switch (floatVal) {
                        case 'right':
                            this.children[i].offsetLeft = this.innerLeft + this.innerWidth - this.children[i].node.style.marginRight() - this.children[i].node.style.borderWidth() * 2 - this.children[i].node.style.paddingLeft() - this.children[i].node.style.paddingRight() - this.children[i].offsetWidth;
                            break;
                        case 'center':
                            this.children[i].offsetLeft = this.innerLeft + (this.innerWidth / 2) - ((this.children[i].node.style.marginRight() + this.children[i].node.style.borderWidth() * 2 + this.children[i].node.style.paddingLeft() + this.children[i].node.style.paddingRight() + this.children[i].offsetWidth) / 2);
                            break;
                    }
                }
                if (this.children[i].offsetLeft < this.innerLeft) {
                    this.children[i].offsetLeft = this.innerLeft;
                }
                this.children[i].innerLeft = this.children[i].offsetLeft + this.children[i].node.style.borderWidth() + (this.children[i].node.style.paddingLeft() + this.children[i].node.tabStop() * tabSize);
            }
            else {
                // the child is not represented by a node, so it doesn't have padding, margin, etc
                this.children[i].offsetLeft = this.children[i].innerLeft = this.innerLeft;
                this.children[i].offsetWidth = this.children[i].innerWidth = this.innerWidth;
            }
            this.children[i].computeWidths(true);
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
    Layout_Block.prototype.computeWidths = function (offsetLeftComputed) {
        if (offsetLeftComputed === void 0) { offsetLeftComputed = false; }
        if (this.node) {
            if (!offsetLeftComputed)
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
        // a block Node doesn't contain children anymore...
        topPlacement += contentHeight;
        this.innerHeight = contentHeight;
        this.offsetHeight = contentHeight;
        if (this.node) {
            this.offsetHeight += (this.node.style.paddingBottom() + (2 * this.node.style.borderWidth()));
            topPlacement += (this.node.style.paddingBottom() + (2 * this.node.style.borderWidth()) + this.node.style.marginBottom());
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
    Layout_BlockChar.prototype.computeWidths = function (offsetLeftComputed) {
        if (offsetLeftComputed === void 0) { offsetLeftComputed = false; }
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
        ctx.fillRect(~~(Math.min(this.offsetLeft + this.offsetWidth, x - .5)), ~~(y + 1), 2, (height + 2) * 1.12);
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
        var i = 0, len = 0, node = this.ownerNode(), align = node.style.textAlign(), j = 0, n = 0, k = 0, l = 0, wordGap = (align == 'justified'), lineHeight = node.style.lineHeight(), lineDiff = 0, startY = this.offsetTop - scrollTop, startX = this.offsetLeft, currentNode = null, isUnderline = false, isStrike = false, underlineWidth = 0.00, size, valign = 'normal', valignShift = 0, fragPos = 0, lastTextNode = null, range = node.documentElement.viewport.selection.getRange(), caret = range.focusNode(), saveColor = '', isPaintedSelected = node.isPaintedSelected, textDecoration;
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
                        textDecoration = currentNode.style.textDecoration();
                        isUnderline = textDecoration == 'underline';
                        isStrike = textDecoration == 'line-through';
                        valign = currentNode.style.verticalAlign();
                        if (isUnderline || isStrike) {
                            underlineWidth = ~~(currentNode.style.fontSize() * .1);
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
                        ctx.fillRect(startX, ~~startY + 1, size[0] + (wordGap && (k == l - 1) && (i < len - 1) ? this.lines[i].wordGap : 0) + .5, ~~this.lines[i].size[1] + 1);
                        ctx.fillStyle = 'white';
                        ctx.fillText(this.lines[i].words[j].characters[k].letter(), startX, startY + lineDiff + valignShift);
                        if (isUnderline) {
                            ctx.fillRect(startX, ~~((startY + lineDiff) + 2 + valignShift), size[0] + (wordGap && (k == l - 1) && (i < len - 1) ? this.lines[i].wordGap : 0), underlineWidth);
                        }
                        else if (isStrike) {
                            ctx.fillRect(startX, ~~((startY + (lineDiff / 1.3)) + valignShift), size[0] + (wordGap && (k == l - 1) && (i < len - 1) ? this.lines[i].wordGap : 0), underlineWidth);
                        }
                        ctx.fillStyle = saveColor;
                    }
                    else {
                        ctx.fillText(this.lines[i].words[j].characters[k].letter(), startX, startY + lineDiff + valignShift);
                        if (isUnderline) {
                            ctx.fillRect(startX, ~~((startY + lineDiff) + 2 + valignShift), size[0] + (wordGap && (k == l - 1) && (i < len - 1) ? this.lines[i].wordGap : 0), underlineWidth);
                        }
                        else if (isStrike) {
                            ctx.fillRect(startX, ~~((startY + (lineDiff / 1.3)) + valignShift), size[0] + (wordGap && (k == l - 1) && (i < len - 1) ? this.lines[i].wordGap : 0), underlineWidth);
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
    Layout_Block_Table.prototype.computeWidths = function (offsetLeftComputed) {
        if (offsetLeftComputed === void 0) { offsetLeftComputed = false; }
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
        this._clientWidth = 0;
        this._clientHeight = 0;
        this.canvas = document.createElement('canvas');
        this.context = null;
        this.document = null;
        this.painter = null;
        this.selection = null;
        this.mouseDriver = null;
        this.keyboardDriver = null;
        this.router = null;
        this.context = this.canvas.getContext('2d');
        this.context.imageSmoothingEnabled = this.context.webkitImageSmoothingEnabled = this.context.msImageSmoothingEnabled = this.context.mozImageSmoothingEnabled = this.context.oImageSmoothingEnabled = true;
        this.canvas.tabIndex = 0;
        this.canvas.setAttribute('data-object-type', 'html-viewport');
        (function (me) {
            me.painter = new Throttler(function () {
                if (me.document)
                    me.document.repaint();
                me.paintScrollbars();
            }, 10);
            me.canvas.onclipboardtrap = function () {
                return me.selection.toString();
            };
            me.canvas.execCommand = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return me.execCommand.apply(me, args);
            };
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
        this.mouseIsGlobal = false;
        /* Scrollbar locking properties */
        this.lockedScrollbar = null; // 0 the vertical, 1 the horizontal, null -> no locked scrollbar
        /* Resizing properties */
        this.resizingReferencePoint = null;
        this.resizingLockTarget = null;
        this.resizingMethod = null;
        this.resizingAspectRatio = null;
        this.resizingDelta = null;
        this.resizingLastPoint = null;
        this.viewport = viewport;
        (function (me) {
            function globalMouseMove(DOMEvent) {
                me.onmousemove(DOMEvent, true);
            }
            function globalMouseUp(DOMEvent) {
                document.body.removeEventListener('mousemove', globalMouseMove, true);
                document.body.removeEventListener('mouseup', globalMouseUp, true);
                me.onmouseup(DOMEvent, true);
                me.mouseIsGlobal = false;
            }
            me.viewport.canvas.addEventListener(typeof me.viewport.canvas.onmousewheel !== 'undefined' ? 'mousewheel' : 'wheel', function (DOMEvent) {
                me.viewport.scrollTop(me.viewport.scrollTop() + ((DOMEvent.wheelDelta || -DOMEvent.deltaY) < 0 ? 40 : -40));
                DOMEvent.preventDefault();
                DOMEvent.stopPropagation();
            }, true);
            me.viewport.canvas.addEventListener('mousedown', function (DOMEvent) {
                me.onmousedown(DOMEvent);
                document.body.addEventListener('mousemove', globalMouseMove, true);
                document.body.addEventListener('mouseup', globalMouseUp, true);
                me.mouseIsGlobal = true;
            }, true);
            me.viewport.canvas.addEventListener('mousemove', function (DOMEvent) {
                if (!me.mouseIsGlobal) {
                    me.onmousemove(DOMEvent);
                }
            }, true);
            me.viewport.canvas.addEventListener('mouseup', function (DOMEvent) {
                if (!me.mouseIsGlobal) {
                    me.onmouseup(DOMEvent);
                }
            }, true);
            me.viewport.canvas.addEventListener('click', function (DOMEvent) {
                me.onmouseclick(DOMEvent);
            }, true);
            me.viewport.canvas.addEventListener('dblclick', function (DOMEvent) {
                me.onmousedblclick(DOMEvent);
            }, true);
            me.viewport.canvas.oncontextmenu = function (DOMEvent) {
                me.oncontextmenu(DOMEvent);
                DOMEvent.preventDefault();
                DOMEvent.stopPropagation();
                return false;
            };
        })(this);
    }
    Viewport_MouseDriver.prototype.translateMouseEventXY = function (DOMEvent) {
        return {
            "x": (DOMEvent.offsetX || DOMEvent.layerX) + this.viewport.scrollLeft(),
            "y": (DOMEvent.offsetY || DOMEvent.layerY) + this.viewport.scrollTop()
        };
    };
    Viewport_MouseDriver.prototype.onmousedown = function (DOMEvent) {
        var point = this.translateMouseEventXY(DOMEvent);
        switch (DOMEvent.which) {
            case 1:
                switch (true) {
                    case point.x - this.viewport.scrollLeft() >= this.viewport.width() - this.viewport._scrollbarSize:
                        this.lockedScrollbar = 0;
                        this.viewport.canvas.style.cursor = 'default';
                        return;
                        break;
                    case point.y - this.viewport.scrollTop() >= this.viewport.height() - this.viewport._scrollbarSize:
                        this.lockedScrollbar = 1;
                        this.viewport.canvas.style.cursor = 'default';
                        return;
                        break;
                    default:
                        this.lockedScrollbar = null;
                        break;
                }
                var target = this.viewport.getTargetAtXY(point);
                if (target) {
                    window['$1'] = target.target;
                    this.mbPressed = true;
                    this.viewport.selection.anchorTo(target);
                    this.fire('refocus');
                    // Run the onmousedown event on the target...
                    if (target.target && target.target.nodeType == 2 /* ELEMENT */ && target.target.onmousedown(point, 1, this)) {
                    }
                }
                break;
            case 3:
                var target = this.viewport.getTargetAtXY(point), selection = this.viewport.selection, range = selection.getRange(), blocks, i = 0, len = 0;
                /* Find if the target is contained in the selection. If the target
                   is contained in the selection, we do not reanchor.
                 */
                if (range.length() && target.target) {
                    blocks = range.affectedBlockNodes();
                    for (i = 0, len = blocks.length; i < len; i++) {
                        if (blocks[i] == target.target || blocks[i].containsNode(target.target)) {
                            return;
                        }
                    }
                }
                if (target) {
                    window['$1'] = target.target;
                    this.viewport.selection.anchorTo(target);
                    this.fire('refocus');
                }
                break;
            default:
                DOMEvent.preventDefault();
                DOMEvent.stopPropagation();
                break;
        }
    };
    Viewport_MouseDriver.prototype.onmousemove = function (DOMEvent, isFromBody) {
        if (isFromBody === void 0) { isFromBody = false; }
        DOMEvent.preventDefault();
        DOMEvent.stopPropagation();
        var target, point, selection = this.viewport.selection, rng, anchor, focus;
        if (!isFromBody) {
            point = this.translateMouseEventXY(DOMEvent);
            if (this.lockedScrollbar !== null) {
                this.onhandlescrollbar(point);
                return;
            }
            else if (this.resizingLockTarget !== null) {
                this.handleResize(point);
            }
            else {
                target = this.viewport.getTargetAtXY(point);
            }
        }
        else {
            var rectObject = this.viewport.canvas.getBoundingClientRect(), point = {
                "x": DOMEvent.clientX - rectObject.left,
                "y": DOMEvent.clientY - rectObject.top
            };
            if (this.lockedScrollbar !== null) {
                this.onhandlescrollbar(point);
                return;
            }
            else if (this.resizingLockTarget !== null) {
                this.handleResize(point);
                return;
            }
            else {
                point.x += this.viewport.scrollLeft();
                point.y += this.viewport.scrollTop();
            }
            target = this.viewport.getTargetAtXY(point);
        }
        this.viewport.canvas.style.cursor = (target && target.target.nodeType == 1 /* TEXT */) ? 'text' : 'default';
        if (this.mbPressed) {
            if (target)
                selection.focusTo(target);
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
        else {
            if (target && target.target.nodeType == 2 /* ELEMENT */) {
                target.target.onmousemove(point, 0, this);
            }
        }
    };
    Viewport_MouseDriver.prototype.onmouseup = function (DOMEvent, isFromBody) {
        if (isFromBody === void 0) { isFromBody = false; }
        // cancel scrollbar locking
        this.lockedScrollbar = null;
        // cancel resizing locking
        this.resizingLockTarget = null;
        this.resizingMethod = null;
        this.resizingReferencePoint = null;
        this.resizingDelta = null;
        this.resizingLastPoint = null;
        this.resizingAspectRatio = null;
        switch (DOMEvent.which) {
            case 3:
            case 1:
                this.mbPressed = false;
                break;
        }
        // cancel the event.
        DOMEvent.preventDefault();
        DOMEvent.stopPropagation();
    };
    Viewport_MouseDriver.prototype.onmouseclick = function (DOMEvent) {
    };
    Viewport_MouseDriver.prototype.onmousedblclick = function (DOMEvent) {
    };
    Viewport_MouseDriver.prototype.oncontextmenu = function (DOMEvent) {
        console.warn("SHOW CONTEXT MENU!", DOMEvent);
    };
    Viewport_MouseDriver.prototype.onhandlescrollbar = function (point) {
        var percent = 0, height = 0, width = 0, value = 0;
        switch (this.lockedScrollbar) {
            case null:
                break;
            case 0:
                //handle vertical scrollbar
                height = this.viewport.height() - this.viewport._scrollbarSize;
                if (this.viewport._clientHeight < height) {
                    return; // scrolling is disabled
                }
                if (point.y < 0) {
                    point.y = 0;
                }
                if (point.y > height) {
                    point.y = height;
                }
                percent = point.y / (height / 100);
                value = percent * ((this.viewport._clientHeight - height) / 100);
                this.viewport.scrollTop(value);
                break;
            case 1:
                //handle horizontal scrollbar
                width = this.viewport.width() - this.viewport._scrollbarSize;
                if (this.viewport._clientWidth <= width) {
                    return;
                }
                if (point.x < 0) {
                    point.x = 0;
                }
                if (point.x > width) {
                    point.x = width;
                }
                percent = point.x / (width / 100);
                value = percent * ((this.viewport._clientWidth - width) / 100);
                this.viewport.scrollLeft(value);
                break;
        }
    };
    Viewport_MouseDriver.prototype.handleResize = function (point) {
        var computeWidth = false, computeHeight = false, newWidth = null, newHeight = null;
        if (this.resizingLastPoint.x != point.x || this.resizingLastPoint.y != point.y) {
            this.resizingDelta = {
                "x": point.x - this.resizingLastPoint.x,
                "y": point.y - this.resizingLastPoint.y
            };
            if (this.resizingAspectRatio === null) {
                computeHeight = true;
                computeWidth = true;
            }
            else {
                if (this.resizingLockTarget.style._width.isSet) {
                    computeWidth = true;
                }
                if (this.resizingLockTarget.style._height.isSet) {
                    computeHeight = true;
                }
            }
            if (!computeWidth && !computeHeight) {
                computeWidth = true;
                computeHeight = true;
            }
            switch (this.resizingMethod) {
                case 0 /* NW */:
                    if (computeWidth) {
                        newWidth = this.resizingLockTarget.layout.offsetWidth - this.resizingDelta.x;
                    }
                    if (computeHeight) {
                        newHeight = this.resizingLockTarget.layout.offsetHeight - this.resizingDelta.y;
                    }
                    break;
                case 1 /* NE */:
                    if (computeWidth) {
                        newWidth = this.resizingLockTarget.layout.offsetWidth + this.resizingDelta.x;
                    }
                    if (computeHeight) {
                        newHeight = this.resizingLockTarget.layout.offsetHeight - this.resizingDelta.y;
                    }
                    break;
                case 2 /* SW */:
                    if (computeWidth) {
                        newWidth = this.resizingLockTarget.layout.offsetWidth - this.resizingDelta.x;
                    }
                    if (computeHeight) {
                        newHeight = this.resizingLockTarget.layout.offsetHeight + this.resizingDelta.y;
                    }
                    break;
                case 3 /* SE */:
                    if (computeWidth) {
                        newWidth = this.resizingLockTarget.layout.offsetWidth + this.resizingDelta.x;
                    }
                    if (computeHeight) {
                        newHeight = this.resizingLockTarget.layout.offsetHeight + this.resizingDelta.y;
                    }
                    break;
                default:
                    throw "Unexpected resizing method!";
            }
            if (this.resizingAspectRatio === null) {
                if (computeWidth) {
                    this.resizingLockTarget.style.width(String(newWidth - 2 * this.resizingLockTarget.style.borderWidth() - this.resizingLockTarget.style.paddingLeft() - this.resizingLockTarget.style.paddingRight()));
                }
                if (computeHeight) {
                    this.resizingLockTarget.style.height(String(newHeight - 2 * this.resizingLockTarget.style.borderWidth() - this.resizingLockTarget.style.paddingTop() - this.resizingLockTarget.style.paddingBottom()));
                }
            }
            else {
                if (computeWidth) {
                    newHeight = ~~(newWidth / this.resizingAspectRatio);
                }
                else {
                    newWidth = ~~(newHeight * this.resizingAspectRatio);
                }
                if (this.resizingLockTarget.style._width.isSet) {
                    this.resizingLockTarget.style.width(String(newWidth - 2 * this.resizingLockTarget.style.borderWidth() - this.resizingLockTarget.style.paddingLeft() - this.resizingLockTarget.style.paddingRight()));
                }
                if (computeHeight) {
                    this.resizingLockTarget.style.height(String(newHeight - 2 * this.resizingLockTarget.style.borderWidth() - this.resizingLockTarget.style.paddingTop() - this.resizingLockTarget.style.paddingBottom()));
                }
            }
            this.resizingLastPoint.x = point.x;
            this.resizingLastPoint.y = point.y;
        }
    };
    Viewport_MouseDriver.prototype.lockTargetForResizing = function (target, resizeType, initialEventPoint) {
        this.resizingMethod = resizeType;
        this.resizingLockTarget = target;
        switch (resizeType) {
            case 0 /* NW */:
                // save the opposite node for the resizing process
                this.resizingReferencePoint = {
                    "x": target.layout.offsetLeft + target.layout.offsetWidth,
                    "y": target.layout.offsetTop + target.layout.offsetHeight
                };
                break;
            case 1 /* NE */:
                // save the opposite node for the resizing process
                this.resizingReferencePoint = {
                    "x": target.layout.offsetLeft,
                    "y": target.layout.offsetTop + target.layout.offsetHeight
                };
                break;
            case 2 /* SW */:
                // save the opposite node for the resizing process
                this.resizingReferencePoint = {
                    "x": target.layout.offsetLeft + target.layout.offsetWidth,
                    "y": target.layout.offsetTop
                };
                break;
            case 3 /* SE */:
                // save the opposite node for the resizing process
                this.resizingReferencePoint = {
                    "x": target.layout.offsetLeft,
                    "y": target.layout.offsetTop
                };
                break;
            default:
                throw "Unimplemented resize method!";
                break;
        }
        this.resizingAspectRatio = target.style._aspectRatio.isSet ? target.style.aspectRatio() : null;
        this.resizingDelta = {
            "x": 0,
            "y": 0
        };
        this.resizingLastPoint = initialEventPoint;
        // cancel mouse moving ...
        this.mbPressed = false;
    };
    return Viewport_MouseDriver;
})(Events);
var Viewport_KeyboardDriver = (function (_super) {
    __extends(Viewport_KeyboardDriver, _super);
    function Viewport_KeyboardDriver(viewport) {
        _super.call(this);
        this.viewport = null;
        this.viewport = viewport;
        (function (me) {
            me.viewport.canvas.addEventListener('keydown', function (DOMEvent) {
                me.onkeydown(DOMEvent);
            }, true);
            me.viewport.canvas.addEventListener('keyup', function (DOMEvent) {
                me.onkeyup(DOMEvent);
            }, true);
            me.viewport.canvas.addEventListener('keypress', function (DOMEvent) {
                me.onkeypress(DOMEvent);
            }, true);
            me.viewport.canvas.forwardKeyboardEvent = function (evtype, evt) {
                switch (evtype) {
                    case 'keydown':
                        me.onkeydown(evt);
                        break;
                    case 'keyup':
                        me.onkeyup(evt);
                        break;
                    case 'keypress':
                        me.onkeypress(evt);
                        break;
                }
            };
        })(this);
    }
    Viewport_KeyboardDriver.prototype.onkeyup = function (DOMEvent, eventSource) {
    };
    Viewport_KeyboardDriver.prototype.onkeypress = function (DOMEvent) {
        var chr = String.fromCharCode(DOMEvent.charCode), key = DOMEvent.keyCode;
        if (!DOMEvent.ctrlKey && chr && chr != '\n') {
            this.viewport.execCommand(0 /* INSERT_TEXT */, chr);
            DOMEvent.preventDefault();
            DOMEvent.stopPropagation();
        }
    };
    Viewport_KeyboardDriver.prototype.onkeydown = function (DOMEvent) {
        var cancelEvent = false;
        switch (DOMEvent.keyCode) {
            case 32:
                this.viewport.execCommand(0 /* INSERT_TEXT */, ' ');
                cancelEvent = true;
                break;
            case 9:
                cancelEvent = true;
                this.viewport.execCommand(DOMEvent.shiftKey ? 14 /* UNINDENT */ : 13 /* INDENT */);
                break;
            case 66:
                if (DOMEvent.ctrlKey && !DOMEvent.shiftKey) {
                    this.viewport.execCommand(4 /* BOLD */);
                    cancelEvent = true;
                }
                break;
            case 73:
                if (DOMEvent.ctrlKey && !DOMEvent.shiftKey) {
                    this.viewport.execCommand(5 /* ITALIC */);
                    cancelEvent = true;
                }
                break;
            case 85:
                if (DOMEvent.ctrlKey && !DOMEvent.shiftKey) {
                    this.viewport.execCommand(6 /* UNDERLINE */);
                    cancelEvent = true;
                }
                break;
            case 76:
                if (DOMEvent.ctrlKey && !DOMEvent.shiftKey) {
                    this.viewport.execCommand(8 /* ALIGN */, 'left');
                    cancelEvent = true;
                }
                break;
            case 69:
                if (DOMEvent.ctrlKey && !DOMEvent.shiftKey) {
                    this.viewport.execCommand(8 /* ALIGN */, 'center');
                    cancelEvent = true;
                }
                break;
            case 74:
                if (DOMEvent.ctrlKey && !DOMEvent.shiftKey) {
                    this.viewport.execCommand(8 /* ALIGN */, 'justified');
                    cancelEvent = true;
                }
                break;
            case 82:
                if (DOMEvent.ctrlKey && !DOMEvent.shiftKey) {
                    this.viewport.execCommand(8 /* ALIGN */, 'right');
                    cancelEvent = true;
                }
                break;
            case 189:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(19 /* SIZE */, '-1');
                    cancelEvent = true;
                }
                break;
            case 107:
            case 187:
                if (DOMEvent.ctrlKey) {
                    this.viewport.execCommand(19 /* SIZE */, '+1');
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
            case 7 /* STRIKE */:
                return 'strike';
                break;
            case 5 /* ITALIC */:
                return 'italic';
                break;
            case 6 /* UNDERLINE */:
                return 'underline';
                break;
            case 8 /* ALIGN */:
                return 'align';
                break;
            case 10 /* COPY */:
                return 'copy';
                break;
            case 11 /* CUT */:
                return 'cut';
                break;
            case 12 /* PASTE */:
                return 'paste';
                break;
            case 13 /* INDENT */:
                return 'indent';
                break;
            case 14 /* UNINDENT */:
                return 'unindent';
                break;
            case 15 /* VALIGN */:
                return 'verticalAlign';
                break;
            case 16 /* FONT */:
                return 'setFont';
                break;
            case 17 /* COLOR */:
                return 'setColor';
                break;
            case 18 /* BGCOLOR */:
                return 'setBgColor';
                break;
            case 19 /* SIZE */:
                return 'setSize';
                break;
            case 20 /* BLOCK_LEVEL */:
                return 'setBlockLevel';
                break;
            case 21 /* LIST */:
                return 'list';
                break;
            case 9 /* CLEAR_FORMATTING */:
                return 'clearFormatting';
                break;
            case 22 /* INSERT_LINK */:
                return 'link';
                break;
            case 23 /* REMOVE_LINK */:
                return 'unlink';
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
            case 7 /* STRIKE */:
                if (!this.ensureArgs(args, 0, 1)) {
                    throw "Command: " + commandName + " require one optional argument of type boolean.";
                }
                else {
                    this.strike(args.length ? !!args[0] : null);
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
            case 8 /* ALIGN */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " require a single string argument.";
                }
                else {
                    this.align(String(args[0]));
                }
                break;
            case 10 /* COPY */:
                if (!this.ensureArgs(args, 0, 1)) {
                    throw "Command: " + commandName + " requires max 1 argument of type boolean!";
                }
                else {
                    this.copy(args.length ? !!args[0] : null);
                }
                break;
            case 11 /* CUT */:
                if (!this.ensureArgs(args, 0, 1)) {
                    throw "Command: " + commandName + " requires max 1 argument of type boolean!";
                }
                else {
                    this.cut(args.length ? !!args[0] : null);
                }
                break;
            case 12 /* PASTE */:
                if (!this.ensureArgs(args, 0, 2)) {
                    throw "Command: " + commandName + " require 2 optional args of type string!";
                }
                else {
                    this.paste(args.length == 0 ? null : String(args[0]), args.length == 2 ? args[1] : null);
                }
                break;
            case 13 /* INDENT */:
                if (!this.ensureArgs(args, 0, 1)) {
                    throw "Command: " + commandName + " requires a single optional number argument!";
                }
                else {
                    this.indent(args.length ? ~~args[0] : null);
                }
                break;
            case 14 /* UNINDENT */:
                if (!this.ensureArgs(args, 0, 1)) {
                    throw "Command: " + commandName + " requires a single optional number argument!";
                }
                else {
                    this.unindent(args.length ? ~~args[0] : null);
                }
                break;
            case 15 /* VALIGN */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single argument of type string!";
                }
                else {
                    this.valign(String(args[0] || 'normal'));
                }
                break;
            case 16 /* FONT */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single string argument!";
                }
                else {
                    this.font(String(args[0] || "Arial"));
                }
                break;
            case 17 /* COLOR */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single argument!";
                }
                else {
                    this.color(String(args[0] || ''));
                }
                break;
            case 18 /* BGCOLOR */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single argument!";
                }
                else {
                    this.bgColor(String(args[0] || ''));
                }
                break;
            case 19 /* SIZE */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single argument of type string!";
                }
                else {
                    this.size(String(args[0] || ''));
                }
                break;
            case 20 /* BLOCK_LEVEL */:
                if (!this.ensureArgs(args, 1, 1)) {
                    throw "Command: " + commandName + " requires a single argument of type string!";
                }
                else {
                    this.blockLevel(String(args[0] || ''));
                }
                break;
            case 21 /* LIST */:
                if (!this.ensureArgs(args, 1, 2)) {
                    throw "Command: " + commandName + " requires two arguments: string, boolean";
                }
                else {
                    if (args.length == 1) {
                        this.list(String(args[0] || 'ul'), null);
                    }
                    else {
                        this.list(String(args[0] || 'ul'), !!args[1]);
                    }
                }
                break;
            case 9 /* CLEAR_FORMATTING */:
                if (!this.ensureArgs(args, 0, 0)) {
                    throw "Command: " + commandName + " don't have any arguments.";
                }
                else {
                    this.clearFormatting();
                }
                break;
            case 22 /* INSERT_LINK */:
                if (!this.ensureArgs(args, 1, 3)) {
                    throw "Command: " + commandName + " requires 1 argument.";
                }
                else {
                    this.link(String(args[0]), args[1] === null ? null : String(args[1] || ''), String(args[2]) || null);
                }
                break;
            case 23 /* REMOVE_LINK */:
                if (!this.ensureArgs(args, 0, 0)) {
                    throw "Command: " + commandName + " requires no arguments.";
                }
                else {
                    this.unlink();
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
        this.viewport.scrollToCaret();
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
            this.viewport.scrollToCaret();
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
                        this.viewport.scrollToCaret();
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
        this.viewport.scrollToCaret();
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
        this.viewport.scrollToCaret();
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
    // sets the strikeness of the text. if state is null, then the strikeness is toggled.
    Viewport_CommandRouter.prototype.strike = function (state) {
        if (state === void 0) { state = null; }
        var selection = this.viewport.selection, rng = selection.getRange(), len = rng.length();
        if (!len) {
            return;
        }
        if (state === null) {
            state = !(this.viewport.selection.editorState.state.strike);
        }
        if (state) {
            this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!u').unwrapFromElement('u').unwrapFromElement('!strike').unwrapFromElement('strike').wrapInElement('strike', null, null, function () {
                return this.style.textDecoration() != 'line-through';
            }).end();
        }
        else {
            this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!u').unwrapFromElement('u').unwrapFromElement('!strike').unwrapFromElement('strike').wrapInElement('!strike', null, null, function () {
                return this.style.textDecoration() == 'line-through';
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
            this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!u').unwrapFromElement('u').unwrapFromElement('strike').unwrapFromElement('!strike').wrapInElement('u', null, null, function () {
                return this.style.textDecoration() != 'underline';
            }).end();
        }
        else {
            this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!u').unwrapFromElement('u').unwrapFromElement('strike').unwrapFromElement('!strike').wrapInElement('!u', null, null, function () {
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
        if (this.viewport.selection.getRange().anchorNode().target.is() == 'body' && !this.viewport.selection.getRange().focusNode()) {
            return;
        }
        if (['img', 'table'].indexOf(this.viewport.selection.getRange().anchorNode().target.is()) >= 0 && !this.viewport.selection.getRange().focusNode()) {
            if (alignment == 'left' || alignment == 'right' || alignment == 'center') {
                this.viewport.selection.getRange().anchorNode().target.style.float(alignment);
            }
        }
        else {
            var nodes = this.viewport.selection.getRange().affectedBlockNodes(), i, len;
            for (i = 0, len = nodes.length; i < len; i++) {
                nodes[i].style.textAlign(alignment);
            }
            if (nodes.length)
                this.viewport.selection.editorState.compute();
        }
        this.viewport.document.changeThrottler.run();
    };
    // copies the selection into the clipboard.
    Viewport_CommandRouter.prototype.copy = function (setClipboard) {
        if (setClipboard === void 0) { setClipboard = true; }
        if (setClipboard === null) {
            setClipboard = true;
        }
        var sel = this.viewport.selection, contents = sel.toString();
        if (!contents) {
            return; //cannot copy something empty
        }
        if (setClipboard) {
            Clipboard.singleton().setContents(contents, 'text/html', 0 /* COPY */);
        }
    };
    // cuts the selection into the clipboard.
    Viewport_CommandRouter.prototype.cut = function (setClipboard) {
        if (setClipboard === void 0) { setClipboard = true; }
        if (setClipboard === null) {
            setClipboard = true;
        }
        var sel = this.viewport.selection, contents = sel.toString();
        if (!contents) {
            return;
        }
        if (setClipboard) {
            Clipboard.singleton().setContents(contents, 'text/html', 1 /* CUT */);
        }
        sel.removeContents();
    };
    // pastes a text of format contentType.
    // @content: string. if null, the content from the clipboard will be 
    // used instead.
    // @contentType: the type of the content. allowed values can be "text" or "html".
    Viewport_CommandRouter.prototype.paste = function (content, contentType) {
        if (content === void 0) { content = null; }
        if (contentType === void 0) { contentType = null; }
        var data;
        if (content === null) {
            data = Clipboard.singleton().getContents();
            if (data === null) {
                return;
            }
            else {
                content = data.data;
                contentType = data.type;
            }
        }
        if (!content) {
            return;
        }
        if (['text/plain', 'text/html'].indexOf(contentType) == -1) {
            throw "ERR_BAD_CONTENT_TYPE!";
        }
        if (contentType == 'text/plain') {
            this.insertText(content);
        }
        else {
            this.viewport.selection.insertHTML(content);
        }
    };
    // indents text with a number of tabs on the left. A tab width is 20px.
    Viewport_CommandRouter.prototype.indent = function (tabs) {
        if (tabs === void 0) { tabs = null; }
        var nodes = this.viewport.selection.getRange().affectedBlockNodes(), i, len;
        for (i = 0, len = nodes.length; i < len; i++) {
            nodes[i].tabStop(nodes[i].tabStop() + 1);
        }
    };
    // unindents text with a number of tabs on the left. A tab width is 20px.
    Viewport_CommandRouter.prototype.unindent = function (tabs) {
        if (tabs === void 0) { tabs = null; }
        var nodes = this.viewport.selection.getRange().affectedBlockNodes(), i, len;
        for (i = 0, len = nodes.length; i < len; i++) {
            nodes[i].tabStop(nodes[i].tabStop() - 1);
        }
    };
    // sets the text alignment as "sup", "sub", or "normal".
    // "sup" stands for superscript
    // "sub" stands for subscript
    Viewport_CommandRouter.prototype.valign = function (verticalAlignmentType) {
        if (verticalAlignmentType === void 0) { verticalAlignmentType = 'normal'; }
        if (['sup', 'sub', 'normal'].indexOf(verticalAlignmentType) == -1) {
            throw "ERR_UNKNOWN_VALIGN_TYPE";
        }
        var selection = this.viewport.selection, rng = selection.getRange(), len = rng.length();
        if (!len) {
            return;
        }
        rng.affectedRanges().unwrapFromElement('sub').unwrapFromElement('sup').wrapInElement(verticalAlignmentType, null, null, function () {
            return verticalAlignmentType == 'sup' || verticalAlignmentType == 'sub';
        }).end();
        this.viewport.selection.editorState.compute();
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
        if (on === void 0) { on = null; }
        var become = '', selection = this.viewport.selection, rng = selection.getRange(), nodes = rng.affectedBlockNodes(), i = 0, len = nodes.length;
        if (on !== null) {
            become = on ? listType : 'p';
        }
        else {
            become = this.viewport.selection.editorState.state.listType == listType ? 'p' : listType;
        }
        rng.save();
        for (i = 0; i < len; i++) {
            nodes[i].becomeElement(become);
        }
        rng.restore();
        this.viewport.selection.editorState.compute();
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
                    if (['p', 'td', 'table', 'tr', 'body'].indexOf(nodes[i].nodeName) == -1) {
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
    Viewport_CommandRouter.prototype.clearFormatting = function () {
        var selection = this.viewport.selection, rng = selection.getRange(), len = rng.length();
        if (!len) {
            return;
        }
        this.viewport.selection.getRange().affectedRanges().unwrapFromElement('size').unwrapFromElement('font').unwrapFromElement('b').unwrapFromElement('!b').unwrapFromElement('i').unwrapFromElement('!i').unwrapFromElement('u').unwrapFromElement('!u').unwrapFromElement('strike').unwrapFromElement('!strike').unwrapFromElement('color').end();
        this.viewport.selection.editorState.compute();
    };
    Viewport_CommandRouter.prototype.link = function (href, text, target) {
        /* If text is NULL, we create a batch, unwrap it from A, and wrap it in a[href=href][target=target]
           Otherwise we insert HTML string @cursor position */
        if (text === void 0) { text = null; }
        if (target === void 0) { target = null; }
        if (text === null) {
            this.viewport.selection.getRange().affectedRanges().unwrapFromElement('a').unwrapFromElement('u').unwrapFromElement('!u').unwrapFromElement('strike').unwrapFromElement('!strike').wrapInElement('a', ['href', 'target'], [href || '', target || '']).end();
        }
        else {
            var a = this.viewport.document.createElement('a');
            a.setAttribute('href', href);
            a.setAttribute('target', target);
            a.appendChild(this.viewport.document.createTextNode(text || ' '));
            this.viewport.selection.insertHTML(a.outerHTML());
        }
        this.viewport.selection.editorState.compute();
    };
    Viewport_CommandRouter.prototype.unlink = function () {
        var selection = this.viewport.selection, rng = selection.getRange(), nodes, aNodes = [], i = 0, len = 0, node, block;
        rng.save();
        if (rng.length()) {
            nodes = rng.createContextualFragment().affectedInlineElements();
            for (i = 0, len = nodes.length; i < len; i++) {
                if (nodes[i].is() == 'a') {
                    aNodes.push(nodes[i]);
                }
            }
        }
        else {
            // check if the element under cursor is an "A".
            if (rng.focusNode()) {
                node = rng.focusNode().target;
                block = node.ownerBlockElement();
                while (node != block) {
                    if (node.is() == 'a') {
                        aNodes.push(node);
                        break;
                    }
                    node = node.parentNode;
                }
            }
        }
        for (i = 0, len = aNodes.length; i < len; i++) {
            aNodes[i].unwrap();
        }
        selection.viewport.document.removeOrphanNodes();
        selection.viewport.document.defragment();
        this.viewport.selection.editorState.compute();
        rng.restore();
    };
    return Viewport_CommandRouter;
})(Events);
var Clipboard = (function (_super) {
    __extends(Clipboard, _super);
    /* Should not be used by the programmer, but instead use the static "singleton" method,
       in order to access it as a singleton
     */
    function Clipboard() {
        _super.call(this);
        this.effect = 0 /* COPY */;
        //protected data          : TClipboardItem   = null;
        this.trap = document.createElement('textarea');
        this.activeElement = null; // will point to an instance of a viewport.canvas
        (function (me) {
            me.on('cut', function (evt) {
                if (!me.trap.parentNode || me.trap != document['activeElement']) {
                }
                else {
                    if (!me.trap.value) {
                        return;
                    }
                    me.setContents(me.trap.value, 'text/html', 1 /* CUT */);
                    setTimeout(function () {
                        // the command is inside the trap
                        me.activeElement.execCommand(11 /* CUT */, false);
                    }, 5);
                }
            });
            me.on('copy', function (evt) {
                if (!me.trap.parentNode || me.trap != document['activeElement']) {
                }
                else {
                    if (!me.trap.value) {
                        return;
                    }
                    // the copy occured in the trap.
                    me.setContents(me.trap.value, 'text/html', 0 /* COPY */);
                }
            });
            me.on('paste', function (evt) {
                if (!me.trap.parentNode || me.trap != document['activeElement']) {
                    // paste outside the trap...
                    return;
                }
                if (evt.clipboardData) {
                    var asText = evt.clipboardData.getData('text/plain'), asHTML = evt.clipboardData.getData('text/html');
                    if (asHTML) {
                        me.setContents(asHTML, 'text/html');
                    }
                    else {
                        me.setContents(asText, /<[a-z\][\s\S]*>/i.test(asText) ? 'text/html' : 'text/plain');
                    }
                    me.activeElement.execCommand(12 /* PASTE */);
                }
                else {
                    setTimeout(function () {
                        me.fire('after-paste');
                    }, 5);
                }
            });
            me.on('after-paste', function () {
                var asText = me.trap.value;
                me.trap.value = this.activeElement.onclipboardtrap();
                me.setContents(asText, /<[a-z\][\s\S]*>/i.test(asText) ? 'text/html' : 'text/plain');
                me.activeElement.execCommand(12 /* PASTE */);
            });
            me.trap.addEventListener('keyup', function (evt) {
                if (evt.keyCode == 17) {
                    me.uninstallTrap();
                }
                else {
                    me.activeElement.forwardKeyboardEvent('keyup', evt);
                }
            }, true);
            me.trap.addEventListener('keypress', function (evt) {
                me.activeElement.forwardKeyboardEvent('keypress', evt);
            }, true);
            me.trap.addEventListener('keydown', function (evt) {
                me.activeElement.forwardKeyboardEvent('keydown', evt);
            });
        })(this);
        //this.trap.readOnly = true;
        this.trap.style.cssText = 'position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; width: 50px; height: 50px; display: block; background-color: red; opacity: 0 !important; z-index: 1000; overflow: hidden;';
    }
    Object.defineProperty(Clipboard.prototype, "data", {
        get: function () {
            var v = window.localStorage.getItem('_clipboard_data_');
            if (v) {
                return JSON.parse(v);
            }
            else {
                return null;
            }
        },
        set: function (v) {
            window.localStorage.setItem("_clipboard_data_", JSON.stringify(v));
        },
        enumerable: true,
        configurable: true
    });
    Clipboard.singleton = function () {
        return Clipboard.$instance || (Clipboard.$instance = new Clipboard());
    };
    Clipboard.prototype.isEmpty = function () {
        return this.data == null;
    };
    Clipboard.prototype.setContents = function (content, contentType, effect) {
        if (contentType === void 0) { contentType = 'text/plain'; }
        if (effect === void 0) { effect = 0 /* COPY */; }
        this.effect = effect;
        this.data = {
            "data": content || '',
            "type": contentType || ''
        };
    };
    Clipboard.prototype.getContents = function (autoClear) {
        if (autoClear === void 0) { autoClear = true; }
        var returnValue = this.data || null;
        if (autoClear && this.effect == 1 /* CUT */) {
            this.data = null;
        }
        return returnValue;
    };
    Clipboard.prototype.installTrap = function () {
        if (typeof document.activeElement['onclipboardtrap'] == 'undefined') {
            return;
        }
        this.activeElement = document.activeElement;
        this.trap.style.top = document.body.scrollTop + "px";
        this.trap.style.left = document.body.scrollLeft + "px";
        document.body.appendChild(this.trap);
        this.trap.value = this.activeElement.onclipboardtrap();
        this.trap.focus();
        this.trap.select();
        //console.log( 'trap installed' );
    };
    Clipboard.prototype.uninstallTrap = function () {
        if (this.trap.parentNode)
            document.body.removeChild(this.trap);
        if (this.activeElement) {
            this.activeElement.focus();
        }
        //console.log( 'trap uninstalled' );
    };
    Clipboard.$instance = null;
    return Clipboard;
})(Events);
window.addEventListener('load', function (e) {
    document.body.addEventListener('keydown', function (evt) {
        if (evt.keyCode == 17) {
            Clipboard.singleton().installTrap();
        }
    }, true);
    document.body.addEventListener('keyup', function (evt) {
        if (evt.keyCode == 17 && Clipboard.singleton().trap.parentNode) {
            Clipboard.singleton().uninstallTrap();
        }
    });
    document.body.addEventListener('cut', function (evt) {
        Clipboard.singleton().fire('cut', evt);
    }, true);
    document.body.addEventListener('copy', function (evt) {
        Clipboard.singleton().fire('copy', evt);
    }, true);
    document.body.addEventListener('paste', function (evt) {
        Clipboard.singleton().fire('paste', evt);
    }, true);
});
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
            i = lockIndex + (this.fragment.at(lockIndex) == 2 /* EOL */ ? 0 : 1);
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
                if (at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */) {
                    n++;
                    if (n == chars) {
                        if (this.startedEOL) {
                            n = i + 1;
                            while (n < len) {
                                at = this.fragment.at(n);
                                if (at == 2 /* EOL */) {
                                    i = n;
                                    break;
                                }
                                else {
                                    if (at == 3 /* CHARACTER */ || at == 4 /* WHITE_SPACE */) {
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
            return this.chars == 0 ? this.fragment.createTargetAt(0 /* DOC_BEGIN */) : this.fragment.createTargetAt(1 /* DOC_END */);
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
            return this.chars == 0 ? this.fragment.createTargetAt(1 /* DOC_END */) : this.fragment.createTargetAt(0 /* DOC_BEGIN */);
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
    Fragment_Contextual.prototype.affectedInlineElements = function () {
        var out = [], i, len, node;
        this.compute();
        for (i = 0, len = this.parts.length; i < len; i++) {
            switch (this.parts[i].type) {
                case 1 /* NODE_END */:
                    node = this.parts[i].node;
                    break;
                case 0 /* NODE_START */:
                    node = this.parts[i].node;
                    break;
                case 2 /* TEXT */:
                    node = this.parts[i].node.parentNode;
                    break;
            }
            if (out.indexOf(node) == -1 && node.style.display() == 'inline') {
                out.push(node);
            }
        }
        out.sort(function (a, b) {
            return a.FRAGMENT_START - b.FRAGMENT_START;
        });
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
    /* @param elAttributeName can be string[] or string
       @param elAttributeValue can be string[] or string
     */
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
            me.on('changed', function () {
                me.onchanged();
            });
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
        range.save();
        if (range.removeContents()) {
            this.viewport.document.relayout(true);
            this.viewport.document.removeOrphanNodes();
            range.restore();
            if (!range.focusNode() && range.anchorNode() && range.anchorNode().target.nodeType == 1 /* TEXT */) {
                range.setFocusAndAnchorTo(range.anchorNode());
            }
            range.collapse(true);
        }
    };
    /* This function is used by the default StatusBar, and *might* not treat
       all the test cases.
     */
    DocSelection.prototype.selectByFragmentIndexes = function (start, stop) {
        var nStart = this.viewport.document.findNodeAtIndex(start), nStop = this.viewport.document.findNodeAtIndex(stop), fragment = this.viewport.document.fragment, fragLen = fragment.length(), at;
        switch (true) {
            case nStart == nStop && nStart.nodeType == 1 /* TEXT */:
                this.anchorTo(new TRange_Target(nStart, start));
                this.focusTo(new TRange_Target(nStart, stop));
                break;
            case (nStart.nodeType == 2 /* ELEMENT */ && nStart.isBlockTextNode) || (nStop.nodeType == 2 /* ELEMENT */ && nStop.isBlockTextNode):
            case (nStart.nodeType == 2 /* ELEMENT */ && !nStart.isSelectable) && (nStop.nodeType == 2 /* ELEMENT */ && !nStop.isSelectable):
                while (start < fragLen && start <= stop && [4 /* WHITE_SPACE */, 3 /* CHARACTER */, 2 /* EOL */].indexOf(fragment.at(start)) == -1) {
                    start++;
                }
                while (stop > 0 && stop >= start && [4 /* WHITE_SPACE */, 3 /* CHARACTER */, 2 /* EOL */].indexOf(fragment.at(stop)) == -1) {
                    stop--;
                }
                this.anchorTo(new TRange_Target(this.viewport.document.findNodeAtIndex(start), start));
                this.focusTo(new TRange_Target(this.viewport.document.findNodeAtIndex(stop), stop + 1));
                break;
            default:
                console.warn('a');
                this.anchorTo(new TRange_Target(nStart, start));
                break;
        }
    };
    DocSelection.prototype.insertHTML = function (html) {
        if (this.getRange().length()) {
            this.removeContents();
        }
        if (!html) {
            return;
        }
        var rng = this.getRange(), fragPos = rng.focusNode() ? rng.focusNode().fragPos : rng.anchorNode().fragPos, targetElement = this.viewport.document.findNodeAtIndex(fragPos), s, s1, afterNode, normalized, hostElement = targetElement.hostElement(), insertionPoint, cursor, leftSibling, rightSibling, i, len, j, unwrapAtNormalization = [];
        if (targetElement.nodeType == 1 /* TEXT */ && targetElement.isBR) {
            targetElement = targetElement.parentNode;
        }
        if (targetElement.nodeType == 1 /* TEXT */) {
            s = targetElement.textContentsFragment(targetElement.FRAGMENT_START, fragPos - 1);
            s1 = targetElement.textContentsFragment(fragPos, targetElement.FRAGMENT_END);
            switch (true) {
                case s == '':
                    if (targetElement.previousSibling()) {
                        afterNode = targetElement.previousSibling();
                    }
                    else {
                        afterNode = this.viewport.document.createTextNode('');
                        targetElement.parentNode.appendChild(afterNode, targetElement.siblingIndex);
                    }
                    break;
                case s1 == '':
                    afterNode = targetElement;
                    break;
                default:
                    targetElement.textContents(s);
                    targetElement.parentNode.appendChild(this.viewport.document.createTextNode(s1), targetElement.siblingIndex + 1);
                    afterNode = targetElement;
                    break;
            }
            hostElement = afterNode.hostElement();
        }
        else {
            afterNode = targetElement;
            hostElement = afterNode.hostElement();
        }
        cursor = afterNode.parentNode;
        while (cursor != hostElement) {
            if (cursor.style.display() == 'inline')
                unwrapAtNormalization.push(cursor.is());
            cursor = cursor.parentNode;
        }
        normalized = this.viewport.document.createCollectionFromHTMLText(html).normalizeForHost(hostElement.nodeName, unwrapAtNormalization);
        // no html or failed to parse HTML
        if (!normalized.length) {
            return;
        }
        if (normalized.normalizedInlineStartNodes + normalized.normalizedInlineEndNodes < normalized.length) {
            if (afterNode.parentNode != hostElement) {
                // make a surgery upto the host.
                insertionPoint = afterNode.cutDown([(afterNode.hostElement().parentNode || afterNode.documentElement).is()]);
            }
            else {
                insertionPoint = {
                    "element": hostElement,
                    "index": afterNode.siblingIndex + 1
                };
            }
        }
        else {
            // make a surgery inside the host
            // insert all nodes in a raw after the afterNode.
            insertionPoint = {
                "element": afterNode.parentNode,
                "index": afterNode.siblingIndex + 1
            };
        }
        leftSibling = insertionPoint.element.childNodes[insertionPoint.index - 1] || null;
        rightSibling = insertionPoint.element.childNodes[insertionPoint.index] || null;
        for (i = 0; i < normalized.normalizedInlineStartNodes; i++) {
            if (leftSibling) {
                if (leftSibling.nodeType == 1 /* TEXT */) {
                    insertionPoint.element.appendChild(normalized.at(i), insertionPoint.index);
                    insertionPoint.index++;
                }
                else {
                    leftSibling.appendChild(normalized.at(i));
                }
            }
            else {
                insertionPoint.element.appendChild(normalized.at(i));
                insertionPoint.index++;
            }
        }
        // insert normalizedmiddlenodes
        len = normalized.length - normalized.normalizedInlineStartNodes - normalized.normalizedInlineEndNodes;
        for (i = normalized.normalizedInlineStartNodes; i < normalized.normalizedInlineStartNodes + len; i++) {
            //console.warn( 'append: ', normalized.at( i ) );
            insertionPoint.element.appendChild(normalized.at(i), insertionPoint.index);
            insertionPoint.index++;
        }
        j = 0;
        for (i = normalized.length - normalized.normalizedInlineEndNodes; i < normalized.length; i++) {
            if (!rightSibling || rightSibling.nodeType == 1 /* TEXT */) {
                insertionPoint.element.appendChild(normalized.at(i));
            }
            else {
                rightSibling.appendChild(normalized.at(i), j);
                j++;
            }
        }
        if (hostElement.parentNode) {
            hostElement.parentNode.removeOrphanNodes();
        }
        else {
            hostElement.removeOrphanNodes();
        }
        this.viewport.document.relayout(true);
        rng.focusNode().fragPos = (normalized.at(normalized.length - 1)).FRAGMENT_END + 1;
        rng.focusNode().target = this.viewport.document.findNodeAtIndex(rng.focusNode().fragPos);
        rng.focusNode().moveLeftUntilCharacterIfNotLandedOnText();
        rng.collapse(true);
        rng.fire('changed');
    };
    DocSelection.prototype.toString = function () {
        var range = this.getRange();
        if (range.focusNode() && range.anchorNode()) {
            return range.createContextualFragment().toString('text/html', true);
        }
        else {
            return range.anchorNode().target.nodeType == 2 /* ELEMENT */ ? range.anchorNode().target.outerHTML() : '';
        }
    };
    DocSelection.prototype.onchanged = function () {
        var clipboard = Clipboard.singleton(), element = clipboard.activeElement;
        if (element == this.viewport.canvas && clipboard.trap.parentNode) {
            clipboard['trap'].value = this['toString']();
            clipboard['trap']['select']();
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
            strike: undefined,
            textAlign: undefined,
            fontFamily: undefined,
            fontSize: undefined,
            fontColor: undefined,
            verticalAlign: undefined,
            blockLevel: undefined,
            listType: undefined
        };
    };
    Selection_EditorState.prototype.compute = function () {
        var nodes = [], rng = this.selection.getRange(), frag = null, i = 0, len = 0, state = this.createEditorState(), focus = rng.focusNode(), anchor = rng.anchorNode(), element = null, fBold = false, fItalic = false, fUnderline = false, fStrike = false, fTextAlign = null, fFontFamily = null, fFontSize = null, fFontColor = null, fVerticalAlign = null, fBlockLevel = null, fListType = null, textDecoration = null, nulls = 0, changed = [], k = '', blockElement, listType;
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
                    if (blockElement.nodeName == 'li' && blockElement.parentNode) {
                        switch (blockElement.parentNode.nodeName) {
                            case 'ul':
                            case 'ol':
                                fListType = blockElement.parentNode.nodeName;
                                break;
                            default:
                                fListType = null;
                                break;
                        }
                    }
                    else {
                        fListType = null;
                    }
                    fBold = element.style.fontWeight() == 'bold';
                    fItalic = element.style.fontStyle() == 'italic';
                    textDecoration = element.style.textDecoration();
                    fUnderline = (textDecoration == 'underline');
                    fStrike = (textDecoration == 'line-through');
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
                    if (state.listType === undefined) {
                        state.listType = fListType;
                        if (fListType === null) {
                            nulls++;
                        }
                    }
                    else {
                        if (state.listType !== null && state.listType !== fListType) {
                            state.listType = null;
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
                    if (state.strike === undefined) {
                        state.strike = fStrike;
                    }
                    else {
                        if (state.strike !== null && state.strike !== fStrike) {
                            state.strike = null;
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
            if (nulls == 11) {
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
function HTMLEditor(value, config) {
    if (config === void 0) { config = null; }
    config = config || {};
    /* Custom eventing system */
    var $EVENTS_QUEUE, $EVENTS_ENABLED = true, settings = {
        width: config.width == void 0 ? 100 : ~~config.width,
        height: config.height == void 0 ? 100 : ~~config.height,
        toolbars: config.toolbars == void 0 ? !!config.toolbars : true,
        statusbar: config.statusbar == void 0 ? !!config.statusbar : true,
        resizable: config.resizable == void 0 ? !!config.resizable : true,
        readOnly: config.readOnly == void 0 ? !!config.readOnly : true,
        disabled: config.disabled == void 0 ? !!config.disabled : true
    }, element = document.createElement('div'), toolbar = element.appendChild(document.createElement('div')), body = element.appendChild(document.createElement('div')), statusbar = element.appendChild(document.createElement('div')), resizediv = element.appendChild(document.createElement('div')), ui_toolbar, resizer = new Throttler(function () {
        resize(settings.width, settings.height);
    }, 10), viewport = new Viewport();
    DOM.addClass(element, 'html-editor');
    DOM.addClass(toolbar, 'toolbar');
    DOM.addClass(statusbar, 'statusbar');
    DOM.addClass(body, 'body');
    DOM.addClass(resizediv, 'resizer');
    /* Event handlers. */
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
    /* Viewport initialization */
    viewport.document.on('change', function () {
        element.fire('change');
    });
    ui_toolbar = new UI_Toolbar(toolbar, viewport.router, viewport.selection.editorState);
    // append the canvas in the body element of the editor
    body.appendChild(viewport.canvas);
    if (settings.toolbars) {
        DOM.addClass(element, 'has-toolbar');
    }
    if (settings.statusbar) {
        DOM.addClass(element, 'has-statusbar');
    }
    Object.defineProperty(element, "width", {
        "get": function () {
            return settings.width;
        },
        "set": function (value) {
            value = ~~value;
            settings.width = value;
            resizer.run();
        }
    });
    Object.defineProperty(element, "height", {
        "get": function () {
            return settings.height;
        },
        "set": function (value) {
            value = ~~value;
            settings.height = value;
            resizer.run();
        }
    });
    Object.defineProperty(element, "toolbars", {
        "get": function () {
            return settings.toolbars;
        },
        "set": function (value) {
            settings.toolbars = !!value;
            if (settings.toolbars) {
                DOM.addClass(element, 'has-toolbar');
            }
            else {
                DOM.removeClass(element, 'has-toolbar');
            }
            resizer.run();
        }
    });
    Object.defineProperty(element, "statusbar", {
        "get": function () {
            return settings.statusbar;
        },
        "set": function (value) {
            settings.statusbar = !!value;
            if (settings.statusbar) {
                DOM.addClass(element, 'has-statusbar');
                viewport.selection.fire('changed');
            }
            else {
                DOM.removeClass(element, 'has-statusbar');
            }
            resizer.run();
        }
    });
    Object.defineProperty(element, "resizable", {
        "get": function () {
            return settings.resizable;
        },
        "set": function (bool) {
            settings.resizable = !!bool;
            if (settings.resizable) {
                DOM.addClass(element, 'is-resizable');
            }
            else {
                DOM.removeClass(element, 'is-resizable');
            }
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
        var left = settings.height;
        if (settings.toolbars) {
            left -= 46;
        }
        if (settings.statusbar) {
            left -= 22;
        }
        body['style'].height = left + "px";
        viewport.height(left);
        viewport.width(settings.width);
        ui_toolbar.resize(settings.width);
        element.style.width = settings.width + "px";
    }
    viewport.selection.editorState.on('changed', function (properties) {
        ui_toolbar.updateDocumentState(properties);
    });
    (function (me) {
        var links = [], i = 0, len = 0, anchor = null;
        for (i = 0; i < 40; i++) {
            anchor = document.createElement('a');
            anchor.appendChild(document.createTextNode(' '));
            (function (link) {
                link.addEventListener('click', function () {
                    var start = ~~link.getAttribute('data-start'), stop = ~~link.getAttribute('data-stop');
                    viewport.selection.selectByFragmentIndexes(start, stop);
                    viewport.canvas.focus();
                });
                link.href = 'javascript:;';
            })(anchor);
            links.push(anchor);
        }
        viewport.selection.on('changed', function () {
            if (!settings.statusbar) {
                return;
            }
            var rng = viewport.selection.getRange(), focus = rng.focusNode(), anchor = rng.anchorNode(), debug = focus || anchor, node = debug.target, stack = [], i = 0, j = 0;
            while (statusbar.childNodes.length) {
                statusbar.removeChild(statusbar.childNodes[0]);
            }
            i = -1;
            while (node) {
                i++;
                if (node.nodeType == 1 /* TEXT */) {
                    i--;
                    node = node.parentNode;
                    continue;
                }
                else {
                    links[i].firstChild.textContent = node.nodeName.toUpperCase();
                }
                links[i].setAttribute('data-start', String(node.FRAGMENT_START));
                links[i].setAttribute('data-stop', String(node.FRAGMENT_END));
                node = node.parentNode;
            }
            for (j = i; j >= 0; j--) {
                statusbar.appendChild(links[j]);
            }
        });
    })(this);
    (function () {
        var delta = {
            "x": 0,
            "y": 0
        }, previousPoint = {
            "x": 0,
            "y": 0
        };
        function onresize_run(evt) {
            delta.x = evt.clientX - previousPoint.x;
            delta.y = evt.clientY - previousPoint.y;
            if (delta.x || delta.y) {
                element['width'] += delta.x;
                element['height'] += delta.y;
            }
            previousPoint.x = evt.clientX;
            previousPoint.y = evt.clientY;
            evt.preventDefault();
            evt.stopPropagation();
        }
        function onresize_end(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            viewport.document.canRelayout = true;
            viewport.document.relayout(true);
            document.body.removeEventListener('mousemove', onresize_run, true);
            document.body.removeEventListener('mouseup', onresize_end, true);
        }
        resizediv.addEventListener('mousedown', function (evt) {
            previousPoint.x = evt.clientX;
            previousPoint.y = evt.clientY;
            evt.preventDefault();
            evt.stopPropagation();
            viewport.document.canRelayout = false;
            document.body.addEventListener('mousemove', onresize_run, true);
            document.body.addEventListener('mouseup', onresize_end, true);
        }, true);
    })();
    element['value'] = value;
    element['resizable'] = settings.resizable;
    resize(settings.width, settings.height);
    return element;
}
var UI_Resources = (function () {
    function UI_Resources() {
    }
    UI_Resources._init_ = function () {
        var props = ["html_alert", "png_alertIcon", "html_editLink", "html_formattingToolbar", "html_insertLink", "html_insertPicture", "img_insertPicture", "html_multimediaToolbar"];
        for (var i = 0, len = props.length; i < len; i++) {
            if (/^html_/.test(props[i])) {
                UI_Resources._patch_(props[i]);
            }
        }
    };
    UI_Resources._patch_ = function (propertyName) {
        var s = UI_Resources[propertyName], matches;
        while (matches = /(\{([a-zA-Z\d\_]+)\})/.exec(s)) {
            s = s.replace(matches[1], UI_Resources[matches[2]] || "");
        }
        //console.log( "patched: ", propertyName, ", value: ", s );
        UI_Resources[propertyName] = s;
    };
    UI_Resources.html_alert = "<div class=\"dialog-body\">\r\n\r\n\t<img src=\"{png_alertIcon}\" style=\"float: left; border: 0;\" />\r\n\r\n\t<p class=\"alert-text\" style=\"margin-left: 50px; margin-top: 7px; margin-right: 10px;\"></p>\r\n\r\n</div>";
    UI_Resources.png_alertIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABFBJREFUeNrsl11Mk1cYx3/n7VsKRYWBJB22fAhY+drcQlQ6wDjnGDKMWbaQjCzZssgyL9gWYsi2sISLXRgy48W8mJk3JmQajRGvNPGu7a5MYAskmABOFBVQqq6l0vfj7KK1gLZQicrNTvLPm77nnP/zP8/zvM/TI6SUrOVQWOOx5gJUrn+x6s3e3j4XQP3htpur5RBy/PPVGF4H/GzLVL8CmA/pvwE/1h9uCz6/B1Y3uguqNx4qqKtVUazc9P956Mbg3RDww0vPAW9vnye3rOS7wo86VZHjRmQVUbC/Q80u3NTp7e3zvIokbN/8br1K5BZE7oA2BdpdSt5rsALtzy/ANEkV3t6+L4t31bWl57kEkftgGlFEZrDnu4VrZ02bt7ev9Xk4FaRJKvD+8odFUZRfnbuaVR7fAFNfBA3C/+Cs9ahAe6qcSBMlfoqVAN3lB5rTiExD5NFTAnSIBFDTbWxtadzlPXqmK1XelELgPXauKnNjzvc5VTsUQtfjRrfvO8v2fWfB0KOEoTHytjVY7Lmv9XiPnXOlFAJp6KwE4OCWpj1WGZpA6nNIQ0PqGlKKKAwtCi2InLvBlsY9VqAjFe4VQ+A7frHJUV319bqCckFwPHZaDUwdEwUTZSEPDB2C46wvrlAc1VXf+I5fbFo5BIbBsoCDhfUeVQaGQZsHI2bI0DClwJRiyTu0eWRgmMJ6jwocXIlfiW5MDN+JSx1le3fvT8u0C0KTC6c0NDA0DKlgSCX+O+6d0CRp6zeIkt11Lb4TlzqWs6E8k80x+E5eyVIzMo44du61yJmBuNujIpIIWLRGzgyQX9+sKhbLEd/JK1nJ7CT3AHSVf7AnTc4Ow3xgycmTe2CRJ8IzyMA1Kj58Pw3oSu6BRK4/5duR7crvzCp1K8z8ndR9prRgSkvSeaYHyHZXK1n5jk7fKZ8noYAkn117ce3bKtN/IY15pGkgzWfXPfHAMxymHt2jh2F6kM2et1SgPfFn+JQi/+mrrY5K92eZuTmKDIyzXAIthCD5Gjk7SmZenvJ61dZP/aevtj49r8bivaTbOd/YoppTA09KMAiRsJNd768EwLw/lbjVSQkmyKkBNlWXqXeGRtox9DNLu+Hi058f6iqqqWywiaAgPAty+SLibBnB2TKyfL2XBoRnsYmgKKqpbPCfH+pKmIT+/hGXzZ7R4yh1WuS90YVioRug67HnUsQrYYK5+J4Yj7w3iqPUabHZM3r8/SOuRXUg3u06CitcqvJwQqCFF4wbBuhmQiO3L5Ry+0JpEgHmUg4tjPJwQhRWuFSg44ldYVwowX95osS+Pn14W53bJh/dAkUiFAHiBf33liBNCaZAbHAy6Ls2P/fv48p3GgvGVMuBMevvH6tvllkjIqI+gLxsXpzlBEqMBzwMRsTwpCxoODA2IYBMIO9oi/pTrp1PEFhf9mUkMMfZby/q3cCMAKwxEdZXfCnSgJD4/3K61gL+GwAUP0sadjombQAAAABJRU5ErkJggg==";
    UI_Resources.html_editLink = "<div class=\"dialog-body\">\r\n\r\n\t<fieldset>\r\n\t\t<legend>Hyperlink</legend>\r\n\r\n\t\t<label>\r\n\t\t\t<span>Link:</span>\r\n\t\t\t<input type=\"text\" class=\"i-link\" />\r\n\t\t</label>\r\n\t\t<label>\r\n\t\t\t<span>Open In:</span>\r\n\t\t\t<select class=\"s-target\">\r\n\t\t\t\t<option value=\"\">Current Window</option>\r\n\t\t\t\t<option value=\"_blank\">New Window</option>\r\n\t\t\t</select>\r\n\t\t</label>\r\n\t</fieldset>\r\n\r\n</div>";
    UI_Resources.html_formattingToolbar = "<div class=\"item index-1\">\r\n\t<div class=\"ui-button remove-formatting\" title=\"Clear Formatting\"></div>\r\n</div><div class=\"item index-2\">\r\n\t<div class=\"text-dropdown\">\r\n\t\t<input class=\"nodeName\" type=\"text\" data-suggestions=\"normal:Normal,h1:Heading 1,h2:Heading 2,h3:Heading 3,h4:Heading 4,h5:Heading 5\" placeholder=\"Style\" value=\"\" >\r\n\t\t<div class=\"expander\"></div>\r\n\t</div>\r\n\t<div class=\"text-dropdown\">\r\n\t\t<input class=\"fontFamily\" type=\"text\" data-suggestions value=\"\" placeholder=\"Font\" />\r\n\t\t<div class=\"expander\"></div>\r\n\t</div>\r\n\t<div class=\"text-dropdown\">\r\n\t\t<input class=\"fontSize\" type=\"text\" data-suggestions=\"8,9,10,12,14,16,18,20,22,24,26,28,30,32\" value=\"\" placeholder=\"Size\" />\r\n\t\t<div class=\"expander\"></div>\r\n\t</div>\r\n</div><div class=\"item index-5\">\r\n\t<div class=\"ui-button bold state\" title=\"Bold (Ctrl+B)\"></div><div\r\n\t\t class=\"ui-button italic\" title=\"Italic (Ctrl+I)\"></div><div\r\n\t\t class=\"ui-button underline\" title=\"Underline (Ctrl+U)\"></div><div\r\n\t\t class=\"ui-button strike\" title=\"Strike\"></div>\r\n</div><div class=\"item index-6\">\r\n\t<div class=\"ui-button subscript\"   title=\"Subscript\"></div><div\r\n\t\t class=\"ui-button superscript\" title=\"Superscript\"></div>\r\n</div><div class=\"item index-7\">\r\n\t<div class=\"ui-button left\" title=\"Left (Ctrl+L)\"></div><div\r\n\t\t class=\"ui-button center\" title=\"Center (Ctrl+E)\"></div><div\r\n\t\t class=\"ui-button right\" title=\"Right (Ctrl+R)\"></div><div\r\n\t\t class=\"ui-button justified\" title=\"Justified (Ctrl+J)\"></div>\r\n</div><div class=\"item index-8\">\r\n\t<div class=\"ui-button ol\" title=\"Ordered List\"></div><div\r\n\t\t class=\"ui-button ul\" title=\"Bulleted List\"></div><div\r\n\t\t class=\"ui-button increase\" title=\"Increase Indent (Tab)\"></div><div\r\n\t\t class=\"ui-button decrease\" title=\"Decrease Indent (Shift + Tab)\"></div>\r\n</div><div class=\"item index-9\">\r\n\t<div class=\"ui-button ui-color-button borderColor\" title=\"Border Color\"></div><div\r\n\t\t class=\"ui-button ui-color-button backgroundColor\" title=\"Background Color\"></div><div\r\n\t\t class=\"ui-button ui-color-button color\" title=\"Color\"></div>\r\n</div>\r\n";
    UI_Resources.html_insertLink = "<div class=\"dialog-body\">\r\n\r\n\t<fieldset>\r\n\t\t<legend>Hyperlink</legend>\r\n\r\n\t\t<label>\r\n\t\t\t<span>Text:</span>\r\n\t\t\t<input type=\"text\" class=\"i-text\" />\r\n\t\t</label>\r\n\t\t<label>\r\n\t\t\t<span>Link:</span>\r\n\t\t\t<input type=\"text\" class=\"i-link\" />\r\n\t\t</label>\r\n\t\t<label>\r\n\t\t\t<span>Open In:</span>\r\n\t\t\t<select class=\"s-target\">\r\n\t\t\t\t<option value=\"\">Current Window</option>\r\n\t\t\t\t<option value=\"_blank\">New Window</option>\r\n\t\t\t</select>\r\n\t\t</label>\r\n\t</fieldset>\r\n\r\n</div>";
    UI_Resources.html_insertPicture = "<div class=\"dialog-body\">\r\n\r\n\t<fieldset>\r\n\r\n\t\t<legend>Source</legend>\r\n\r\n\t\t<label class=\"two-lines\">Specify a picture source, or upload a picture from your comuter:</label>\r\n\r\n\t\t<label>\r\n\t\t\t<span>Source:</span> \r\n\t\t\t<input type=\"text\" class=\"txt-src\" />\r\n\t\t</label>\r\n\r\n\t</fieldset>\r\n\t<fieldset>\r\n\t\t\r\n\t\t<legend>Settings</legend>\r\n\r\n\r\n\t\t<div class=\"horizontal-flex two-kids\">\r\n\r\n\t\t\t<div class=\"cell\">\r\n\r\n\t\t\t\t<label class=\"one-line\">Specify picture settings:</label>\r\n\r\n\t\t\t\t<label>\r\n\t\t\t\t\t<span>Width:</span>\r\n\t\t\t\t\t<input type=\"number\" class=\"int-width\" disabled style=\"max-width: 50px\" />\r\n\t\t\t\t</label>\r\n\t\t\t\t<label>\r\n\t\t\t\t\t<span>Height:</span>\r\n\t\t\t\t\t<input type=\"number\" class=\"int-height\" disabled style=\"max-width: 50px\" />\r\n\t\t\t\t</label>\r\n\t\t\t\t<label class=\"checkbox\">\r\n\t\t\t\t\t<span>Maintain propoportions:</span>\r\n\t\t\t\t\t<input type=\"checkbox\" class=\"bool-proportions\" disabled />\r\n\t\t\t\t</label>\r\n\t\t\t\t<label>\r\n\t\t\t\t\t<span>Alternate text:</span>\r\n\t\t\t\t\t<input type=\"text\" class=\"txt-alt\" />\r\n\t\t\t\t</label>\r\n\r\n\t\t\t</div>\r\n\t\t\t<div class=\"cell\">\r\n\t\t\t\r\n\t\t\t\t<label class=\"one-line\" style=\"text-align: center; display: block\">Preview:</label>\r\n\r\n\t\t\t\t<img class=\"img-preview\" style=\"display: block; margin: 10px auto; max-width: 150px; max-height: 150px\" src=\"{img_insertPicture}\" />\r\n\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\r\n\t</fieldset>\r\n\r\n</div>";
    UI_Resources.img_insertPicture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAAErCAIAAAAJxjLjAAAK22lDQ1BJQ0MgUHJvZmlsZQAASA2tlndUU0kXwO97aaTRAqFICb0jvUqvARSkCjZCEkgoIQSCiF1ZVHAtqIiAuqIrIgquBZC1IKLYFsHeF2RRUdbFgg2V7wUku+c73/73zTkz83t37ty5d96dcy4A7SFHLM5ElQGyRHmS6BB/1qzEJBbpMRBAA5SAAaYcbq7YLyoqAv61vb8NiGzxho3M1r+q/e8FFR4/lwuARGHLKbxcbhbGx7DezhVL8gBwBZjcaEGeWMbVGKtJMAcxPizjtAnukHHKBN8d14mNDsB0hgAUaByOJA2A+hGTs/K5aZgdmibGdiKeUIRxKMbeXAGHh/EajK2zsrJljPkA5in/sJP2D+ZwUuQ2OZw0OU/Egu3EDg4U5oozOQvHP/6fQ1amFLuv8WaAjTSBJDQam02xO6vOyA6XsyhlRuSkXIhFNMkCaWjcJHNzA7C7nNjL4wSGT7I0I85vkjkSjL7rCPPYsZMsyY6W2xdlzpDlx7gPAj5bzvzcoJhJeaowmD3JhYLYhEnOF8bPmOTcjBi5D4WCALlcIo2W+5wqCZbHmJWL7fx+Lpfz91l5gljZfx33h8cPDJpkvihO7o84z19uR5w5nt/j+vzMELk8Nz9GvjdPEiuXp3PCZPk6ri/Oi5LfCcSCAKQgAh7wQQIpkA2ZkAcsCAQh5IIY++IAlhJ5/AIsDwECssULJcI0QR7LD3s5fBZbxLW1ZjnY2TsByN6hTAfgLXP8fSHMy3/LctoA3Euwfy57AiyZFgDHCODEUwDG+79lRm+wFNkIcKqbK5XkT+jhZRMBKNj7VgMt0AMjMAcbcAAX8ARfCIIwiMQiSYR5wMXiycIiWQCLYQUUQylshK1QCbtgD+yHQ3AEmuEknIULcAW64RY8gF4YgJcwDO9hFEEQEkJHGIgWoo+YIFaIA+KGeCNBSAQSjSQiyUgaIkKkyGJkFVKKlCGVyG6kDvkFOYGcRS4hPcg9pA8ZRN4gn1EcSkPVUF3UFJ2KuqF+aDgai85F09ActBAtQtejFWgNehBtQs+iV9BbaC/6Eh3BAY6KY+IMcDY4N1wALhKXhEvFSXBLcSW4clwNrgHXiuvE3cD14oZwn/BEPAPPwtvgPfGh+Dg8F5+DX4pfh6/E78c34TvwN/B9+GH8NwKdoEOwIngQ2IRZhDTCAkIxoZywj3CccJ5wizBAeE8kEplEM6IrMZSYSEwnLiKuI+4gNhLbiD3EfuIIiUTSIlmRvEiRJA4pj1RM2k46SDpDuk4aIH1UoCroKzgoBCskKYgUViqUKxxQOK1wXeGZwihZmWxC9iBHknnkheQN5L3kVvI18gB5lKJCMaN4UWIp6ZQVlApKA+U85SHlLZVKNaS6U2dShdTl1ArqYepFah/1E02VZkkLoM2hSWnrabW0Nto92ls6nW5K96Un0fPo6+l19HP0x/SPigxFW0W2Ik9xmWKVYpPidcVXSmQlEyU/pXlKhUrlSkeVrikNKZOVTZUDlDnKS5WrlE8o31EeUWGo2KtEqmSprFM5oHJJ5bkqSdVUNUiVp1qkukf1nGo/A8cwYgQwuIxVjL2M84wBNaKamRpbLV2tVO2QWpfasLqqupN6vHqBepX6KfVeJo5pymQzM5kbmEeYt5mfNXQ1/DT4Gms1GjSua3zQnKLpq8nXLNFs1Lyl+VmLpRWklaG1SatZ65E2XttSe6b2Au2d2ue1h6aoTfGcwp1SMuXIlPs6qI6lTrTOIp09Old1RnT1dEN0xbrbdc/pDukx9Xz10vW26J3WG9Rn6HvrC/W36J/Rf8FSZ/mxMlkVrA7WsIGOQaiB1GC3QZfBqKGZYZzhSsNGw0dGFCM3o1SjLUbtRsPG+sbTjRcb1xvfNyGbuJkITLaZdJp8MDUzTTBdbdps+txM04xtVmhWb/bQnG7uY55jXmN+04Jo4WaRYbHDotsStXS2FFhWWV6zQq1crIRWO6x6rAnW7tYi6xrrOzY0Gz+bfJt6mz5bpm2E7UrbZttXU42nJk3dNLVz6jc7Z7tMu712D+xV7cPsV9q32r9xsHTgOlQ53HSkOwY7LnNscXztZOXEd9rpdNeZ4TzdebVzu/NXF1cXiUuDy6CrsWuya7XrHTc1tyi3dW4X3Qnu/u7L3E+6f/Jw8cjzOOLxl6eNZ4bnAc/n08ym8aftndbvZejF8drt1evN8k72/sm718fAh+NT4/PE18iX57vP95mfhV+630G/V/52/hL/4/4fAjwClgS0BeICQwJLAruCVIPigiqDHgcbBqcF1wcPhziHLAppCyWEhoduCr3D1mVz2XXs4TDXsCVhHeG08JjwyvAnEZYRkojW6ej0sOmbpz+cYTJDNKM5EiLZkZsjH0WZReVE/TqTODNqZtXMp9H20YujO2MYMfNjDsS8j/WP3RD7IM48ThrXHq8UPye+Lv5DQmBCWULvrKmzlsy6kqidKExsSSIlxSftSxqZHTR76+yBOc5ziufcnms2t2DupXna8zLnnZqvNJ8z/2gyITkh+UDyF04kp4YzksJOqU4Z5gZwt3Ff8nx5W3iDfC9+Gf9ZqldqWerzNK+0zWmDAh9BuWBIGCCsFL5OD03flf4hIzKjNmMsMyGzMUshKznrhEhVlCHqyNbLLsjuEVuJi8W9OR45W3OGJeGSfblI7tzcljw1rOC5KjWX/iDty/fOr8r/uCB+wdEClQJRwdWFlgvXLnxWGFz48yL8Iu6i9sUGi1cs7lvit2T3UmRpytL2ZUbLipYNLA9Zvn8FZUXGit9W2q0sW/luVcKq1iLdouVF/T+E/FBfrFgsKb6z2nP1rjX4NcI1XWsd125f+62EV3K51K60vPTLOu66yz/a/1jx49j61PVdG1w27NxI3CjaeHuTz6b9ZSplhWX9m6dvbtrC2lKy5d3W+VsvlTuV79pG2Sbd1lsRUdGy3Xj7xu1fKgWVt6r8qxqrdarXVn/YwdtxfafvzoZdurtKd33+SfjT3d0hu5tqTGvK9xD35O95ujd+b+fPbj/X7dPeV7rva62otnd/9P6OOte6ugM6BzbUo/XS+sGDcw52Hwo81NJg07C7kdlYehgOSw+/+CX5l9tHwo+0H3U72nDM5Fj1ccbxkiakaWHTcLOgubclsaXnRNiJ9lbP1uO/2v5ae9LgZNUp9VMbTlNOF50eO1N4ZqRN3DZ0Nu1sf/v89gfnZp272TGzo+t8+PmLF4IvnOv06zxz0eviyUsel05cdrvcfMXlStNV56vHf3P+7XiXS1fTNddrLd3u3a0903pOX/e5fvZG4I0LN9k3r9yacavndtztu3fm3Om9y7v7/F7mvdf38++PPlj+kPCw5JHyo/LHOo9rfrf4vbHXpfdUX2Df1ScxTx70c/tf/pH7x5eBoqf0p+XP9J/VPXd4fnIweLD7xewXAy/FL0eHiv9U+bP6lfmrY3/5/nV1eNbwwGvJ67E3695qva195/SufSRq5PH7rPejH0o+an3c/8ntU+fnhM/PRhd8IX2p+GrxtfVb+LeHY1ljY2KOhDNeC+CwEU1NBXhTC0BPxGqHbgCK4kSdPK6BTNT2GCPfu0z8XzxRS8sWsBoCan0B4pYDRLQB7MS6CcY0bJaVTLG+gDo6yjsmkbXcVEeHcUBoEqw0+Tg29lYXgNQK8FUyNja6Y2zs616snr8H0JYzUZ/LtInKAGVmTBW89ZWWz8vH9/9j+A99VwmaRs6nBgAAAZ1pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+Mjk5PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjI5OTwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgq4Jt/NAAATSklEQVR4Ae2dXYxcZRnHKbTS1LS2lJZtm36RNDFcmWA08eNSasBoEBPxI0owwXiDJpJggtEYNEHCBRdeGL0wXGjCRUuhUBAUpLERtEAwpUG27W67dLvd7Xa32+6y3+vDDjsM87XnnJlz3vf/zG8utmfOvOd9n+f/f389Z545886Ko0ePXsUDBVAgkAJXBxqXYVEABd5XAAKZBygQUgEIDKk+Y6MABDIHUCCkAhAYUn3GRgEIZA6gQEgFIDCk+oyNAhDIHECBkApAYEj1GRsFIJA5gAIhFYDAkOozNgpAIHMABUIqAIEh1WdsFIBA5gAKhFQAAkOqz9goAIHMARQIqQAEhlSfsVEAApkDKBBSAQgMqT5jowAEMgdQIKQCEBhSfcZGAQhkDqBASAUgMKT6jI0CEMgcQIGQCkBgSPUZGwUgkDmAAiEVgMCQ6jM2CkAgcwAFQioAgSHVZ2wUWJmfBDfffHN+ndMzChSswGuvvZbHiJwD81CVPlEgqQIQmFQp2qFAHgpAYB6q0icKJFUAApMqRTsUyEMBCMxDVfpEgaQKQGBSpWiHAnkoAIF5qEqfKJBUAQhMqhTtUCAPBSAwD1XpEwWSKgCBSZWiHQrkoQAE5qEqfaJAUgUgMKlStEOBPBSAwDxUpU8USKoABCZVinYokIcCOX47KY9w6TOgApOTkxMTE/Z3avExOzs7Pz8/Nzdnf6+++uprrrnG/q5cufLaxcfq1avXrFljfwMGLDE0BErYFCzImZmZ0dHRy4sPQ65RHAahPexVY3N8fLzczIBcu/hYv379qlWryvvZKCsAgWUp2PhQAcPJwBseHh4bG/twb/otg3Zk8XHmzJl169Zt3LjRULRTZfqe3B4BgW6tzZaYMTM0NDQ4ONjkjJetZ4PZHnZW3Lx586ZNm2wjWz/OjkIFZ4ZmT8fe0Q0MDBh7pevJ7B01PdLA7u/vt4GMw66uLnv32LS5/xch0L/HSTK0S8W+vj5715ekcettDHKD0K5yt2/fvmHDhtY71O0BAnW9a0/kRl1vb69dH7anuzS92NCnTp2y94e7du3q2DoN74nTTBl3bQ2848ePB8GvrGUMMZSDKX4DAovXPJYRz507193d3faKS4b0LAaLxOLJcKz6IVyFqjuYJf6FhQX7eODChQtZDs7tGKvQTE9P79ixY8WKFbkNEl3HEBidJXkHZFWQnp4e+7gv74Ey9G//Kdj5cPfu3Z3zmSFXoRnmifAhdvaLFr+SrPZfg0VocQqrnCZ0CEyjln5bu/iM8+xXKa1FaHFW7nG8DYGOza1OzUodsb33qw5x6bnF2SGFGQhc8tz7v1b0t1KHUJYWbdiPSYrRCgKL0TnwKPbZt725ChxE+uEt5sJu00kfXXuOgMD26Bh5L3bXSwyf+6VVyWK2yNMepdUeArX8yhKt3fOpezlnkVv8WdIWOQYCRYzKGqZ948Fuuc56dBTHWfyWRRSh5BAEBOYgakxd2lcQ1N9KWfyWRUyitjMWCGynmrH1Ze+j7Pt+sUWVIZ48vjGcIYw8DoHAPFSNpU/7tnuuX7ctLE/LwnIpbLgiB4LAItUudCybtT5OgCXV8v7yfqHeVAwGgRVi+Nq0e7sUP4FoZILlEv/9dI2Cb7IfApuIo/2SrQGhnUBN9P4yshQhsMZnFzusfqj7GWAjBywj9bpubWoQWKuJhz0uL9jMGH95QaAH3mpzsEWua3c62OMvLwh0MC3rpOBvppaS9JcXBNaZvuq77MdVPFVBK+2wvCy7yj3q2xCo7mCd+O0Xjurs9bLLWXYQ6GViVuTh7CxRkdn7m86yg8Aqfz08tZ8Q85BGgxycZQeBDXxW3u3sLFFlBQRWCcLT6BRw/G0609pZkYlzYHT8tB6QbwKdZQeBrU/46Hrw8Y2kRrI6yw4CGxktvN/ZHK1ywll2EFjlr4envn90wVl2EOgBuaocfP80tLPsILBq9np46uwsUWWJs+wgsMpfD09XrvT8o3TOsoNAD8hV5XDttddW7fH01Fl2EOhpcn6Qi7M5WuWQs+wgsMpfD09Xr17tIY0GOTjLDgIb+Ky8e82aNcrhLxO7s+wgcBm/FV+2s4SzckXZBcuLc2BZDTbiVWDt2rXxBtdCZP7y4hzYwnSI+FB/M7Uktr+8IDBijFoIbf369S0cHe+h/vKCwHhnWyuRrVq1at26da30EOGxlpHlFWFgrYQEga2oF/WxGzdujDq+9MH5y8g0gMD0E0HkCLtg81QRtVz8XYJCoAhMmcK0O5g3b96c6dAYD7JcnN2TXVKZc2CMs61dMW3atMnHrLUsLJd2yRJVPxAYlR1tDsau3HycBi0LT1fUlTZDYKUaDre7urrU64cWv2Xh0JvFlCDQq7Mf5GXfKN++fbt0kha/s+/FV9oBgZVqLL/dc2nq2AWxX2XYsGGD7meDFrnFv7wxObcw33MaAQJTCHv0/PgdB0/d8dSph48OTM3NpzgydNNdu3Ypvo+ymC3y0OJdVfI9pzAgMKmwh3oufe/Z3rGpubmFq/7w5oXbDpx4fXA86cGh29lbqd27d4eOIvX4FnPwN7Fl31NHn+wACEyk0x+PXfjxi33TBt/So3d0+psHex58tf+9WY2ToV3Obd26dSl8gX8t2uAXz7W+t104CFxG0vmFhV/+q/+3rw58CN/SEbbnsWMX9z7R/cq5K0v7ov53y5Yt119/fdQhLgVncVq0S88C/NvE9/ZGA4HN9LTz2w//fubPxy82adQ/NvPdQ70PHDk7PiNwMtyxY0f893ZZhBZnE83zfimJ7+2KAQIbKjk8OXvnoZ6XTl9u2KLihcffHrllf/fL7yZqXHFc0ZsrVqywN1cxQ2ixWYQWZ9HSLI2Xyvelg7L/C4H1tbPq8+0HT7419F79l+vtPX9l5gd/PX3f4XfHpufqvR7LPrvD68Ybb4zzctSistgC3kmXwfcWfYXAOgKWqs92eVnnteV2Hege/dK+7hfOjC3XMOTrdobZuXNnbIUZi8eiCnj2a8X3zHZCYLV0rVefhydmf/TCmXtfOnNxcra695ieW6ljz549MXxOaDFYJGFLL637ns1bCPyIbm2sPh86NXbLvu6ney59ZIDInli5/6abbgpb9I8hhjb6ntZhzz8wkEoLqz7/6pVzzcueqTq0xqOTcz95se+pnaO//ty2zWsildo+8rbzz8jISF9f38xMlgvvtLKU29vQds9n2JvO8vC9nGCSjUinRZLQ29jGqs/3/qMvYdkz7bgvnr68d+Cdn392yx17wt/f2Cj40r2jAwMDg4ODBfxEptVa7AtH9o2HsLdc5+p7I6mr9kPgVVZ9vvv506nKnlUiLvv08tT8/YfPPtVz6aHPb9vy8UjXGjIYtm3bdsMNNwwNDRmHs7O5vIm1t3zGnn3dNvj7zwJ8X3ZiWINOJ9Cqz99/vjdb2TOJvpVtjvRd2buv+2ef6fr2J6+r3B/VtoFhFRHjcHR0dHh4eGysbUVde79nSy3Zx30BP2woS12k7+VB6250NIFWfb7HPjeYKu7ju4mZ+V8c6bfyzENf2LZj7cfqWhLDToPkusWHvTM0FC8vPjKcFY1nW2PXHgZe8Husy8IW73t56NqNziXQqs/3vfxu5c3WterktOff/eO37u/+6ae77rrpuoAffyXJzrCxK0Z7WOPJycmJiQn7O7X4MCDn5ubsTaM9jFh72HWsIWe/LmYP+3UH+4mVCH/jIaDvdQXvUAKt+vxwvZut62qUx87J2YXfvHLOToaPfHHr7k9o/NiY4RQhUancCe57bbQd93lgYfe812pdu+fN8xO3PXHy9/8dmpuv/epFbXP2ZFcgKt8r0+gsAou8571S5Sbbdhn8yH/O3/70yf+NpLgHtUmHvFSrQIS+l4PsIAKt+vytZ5N+16EsUDEbx4cmv3bg5KNvnJ/lZNhuxWP23XLtFAJL97wfG4z3PGNftf/d60NfefKE3EpQ7Uamnf3F73tHEBjknvds8+jExanSSlBBirTZYo72KAnf/RMY6p73zPOytBLUrQe6hVaCypxsfgeq+O6cwID3vLc4t+RWgmox3/YeLuS7WwKjrT4nn2qllaC+/MQJlZWgkqeWX0s5330SGHP1Oe3kOzs2LbQSVNrs2tte0XeHBEZefc4251RWgsqWXVuOEvXdG4HxV58zzzaVlaAyJ9jKgbq+uyJQovrcyjyzYyVWgmoxx7SHS/vuh0CV6nPa6VXbXmUlqNrI89ij7rsTAoWqz+2ahRIrQbUr2Ub9OPBdnkC56nOjyZRhf2klqHv+dnpwIpcVJTKEVNghbnzXJlCx+tz2Ofr+SlD739nXPdL2nqPt0JPvwgSKVp/zmNallaBswZtz44UuN5hHLsv26cx3VQJ1q8/LzrDMDUorQf3l7Wa/9JS580gO9Oe7JIHS1edcp3JpJahvP9tz5vJ0rgMF6dyl73oEqlefC5i7pZWg/vTW8MKCn8UvvPouRqCD6nMBBNoQpZWgvvFMT8+lyWJGzHUUx77LEOim+pzrTK3q3MFKUO591yDQU/W5CpK8n0qvBNUJvgsQ6Kz6nDdydftXXAmqQ3yPnUB/1ee6hBSws7wS1FvD8S5XVdahc3yPmkCX1efyJAuyYStBff3Jkw8fHYh5JaiO8j1eAr1Wn4OAVzlo5CtBdZrvkRLouPpcCUPAbVsJ6s6nex58td+qHQHDqBq6A32PjkD31eeqORfwqS3P/dixi7YS1KsDVwKGURq6Y32Pi8BOqD4Hn+tVAdhKUN95pveBI2fHZ4KdDDvZ94gI7JDqcxUAkTy1laD27u8+fPZy8fF0uO+xENg51efip3jCEQeuzNz93On7Dr87Nl3cjwrjexQEdlT1OSEPoZoVuRIUvpvL4QnstOpzKLSSj1vMSlD4XnIkMIEdWH1OTkLYlrmuBIXvZXODEdix1eey9PFv5LESFL5X+R6GwE6uPlcZEP/TxZWgutuyEhS+19odgMAOrz7XehD/nstTc/cfPntXaytB4Xtdo4smkOpzXRskdv6z78refd3ZVoLC90YWF0og1edGNqjsz7YSFL438bc4Aqk+N7FB66VUK0Hhe3NzCyKQ6nNzG+ReTbgSFL4v62zuBFJ9XtYD3QZNVoLC94S25ksg1eeENug2W1oJ6tQ7Ix8ui4jvyQ3NkUCqz8ltUG95fOi9rx448egb52fnF/A9lZsrU7VO1fj2gyf7x/z/kEgqTRw3Lq0E9Vzv2MTsPL4nNzpHArEhuQ1uWtpKUG5yKSaRHK9Ci0mAUVBAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVgEB5C0lAWgEIlLaP4OUVWJlfBo9/aiq/zukZBXwowDnQh49koaoABKo6R9w+FIBAHz6ShaoCEKjqHHH7UAACffhIFqoKQKCqc8TtQwEI9OEjWagqAIGqzhG3DwUg0IePZKGqAASqOkfcPhSAQB8+koWqAhCo6hxx+1AAAn34SBaqCkCgqnPE7UMBCPThI1moKgCBqs4Rtw8FINCHj2ShqgAEqjpH3D4UgEAfPpKFqgIQqOoccftQAAJ9+EgWqgpAoKpzxO1DAQj04SNZqCoAgarOEbcPBSDQh49koaoABKo6R9w+FIBAHz6ShaoCEKjqHHH7UAACffhIFqoKQKCqc8TtQwEI9OEjWagqAIGqzhG3DwUg0IePZKGqAASqOkfcPhSAQB8+koWqAhCo6hxx+1AAAn34SBaqCkCgqnPE7UMBCPThI1moKgCBqs4Rtw8FINCHj2ShqgAEqjpH3D4UgEAfPpKFqgIQqOoccftQAAJ9+EgWqgpAoKpzxO1DAQj04SNZqCoAgarOEbcPBSDQh49koaoABKo6R9w+FIBAHz6ShaoCEKjqHHH7UAACffhIFqoKQKCqc8TtQwEI9OEjWagqAIGqzhG3DwUg0IePZKGqAASqOkfcPhT4P492DCBEDh33AAAAAElFTkSuQmCC";
    UI_Resources.html_multimediaToolbar = "<div class=\"item index-1\">\r\n\t<div class=\"ui-button link\" title=\"Link\"></div><div\r\n\tclass=\"ui-button picture\" title=\"Picture\"></div><div\r\n\tclass=\"ui-button video\" title=\"Video\"></div>\r\n</div>";
    return UI_Resources;
})();
UI_Resources._init_();
var UI_Toolbar = (function (_super) {
    __extends(UI_Toolbar, _super);
    function UI_Toolbar(DOMNodeContainer, router, state) {
        _super.call(this);
        this.panels = [];
        this.router = null;
        this.state = null;
        this.node = DOMNodeContainer;
        this.router = router;
        this.state = state;
        this.node.innerHTML = '<div class="toolbar-row index-1"></div><div class="toolbar-row index-2"></div>';
        this.rows = [
            this.node.querySelector('.toolbar-row.index-1'),
            this.node.querySelector('.toolbar-row.index-2')
        ];
        this.panels.push(new UI_Toolbar_Panel_Multimedia(this, this.rows[0]));
        this.panels.push(new UI_Toolbar_Panel_Formatting(this, this.rows[1]));
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
    function UI_Toolbar_Panel(toolbar, name, appendIn) {
        _super.call(this);
        this.toolbar = toolbar;
        this.name = name;
        this.width = 0; // the minWidth of the toolbar, without being resized.
        this.node = document.createElement('div');
        DOM.addClass(this.node, 'ui-panel');
        appendIn.appendChild(this.node);
        this.node.title = name || 'Toolbar';
        this.width = 10;
    }
    UI_Toolbar_Panel.prototype.updateDocumentState = function (propertiesList) {
    };
    UI_Toolbar_Panel.prototype.resizeByParentWidth = function (width) {
    };
    /* Transforms an item of the toolbar into an input[type=color] dropdown */
    UI_Toolbar_Panel.prototype.makeColorDropdown = function (element, onchange, initialColor) {
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
    /* Transforms an input[type=text] item of the toolbar into a writable select */
    UI_Toolbar_Panel.prototype.dropdownize = function (input, submit, allowSuggestionsOnly) {
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
                    try {
                        items[i].scrollIntoViewIfNeeded();
                    }
                    catch (e) {
                    }
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
    return UI_Toolbar_Panel;
})(Events);
var UI_Toolbar_Panel_Formatting = (function (_super) {
    __extends(UI_Toolbar_Panel_Formatting, _super);
    function UI_Toolbar_Panel_Formatting(toolbar, appendIn) {
        _super.call(this, toolbar, 'Formatting', appendIn);
        this.blockLevel = null;
        this.fontFamily = null;
        this.fontSize = null;
        this.btnClearFormatting = null;
        this.btnBold = null;
        this.btnItalic = null;
        this.btnUnderline = null;
        this.btnStrike = null;
        this.btnSubscript = null;
        this.btnSuperscript = null;
        this.btnLeft = null;
        this.btnRight = null;
        this.btnCenter = null;
        this.btnJustified = null;
        this.btnUL = null;
        this.btnOL = null;
        this.btnIndent = null;
        this.btnUnindent = null;
        this.btnBorderColor = null;
        this.btnBackgroundColor = null;
        this.btnColor = null;
        DOM.addClass(this.node, 'ui-panel-style');
        this.node.innerHTML = UI_Resources.html_formattingToolbar;
        this.blockLevel = this.node.querySelector('input.nodeName');
        this.fontFamily = this.node.querySelector('input.fontFamily');
        this.fontFamily.setAttribute('data-suggestions', TStyle.$FontFamily.join(','));
        this.fontSize = this.node.querySelector('input.fontSize');
        this.btnClearFormatting = this.node.querySelector('div.ui-button.remove-formatting');
        this.btnBold = this.node.querySelector('.ui-button.bold');
        this.btnItalic = this.node.querySelector('.ui-button.italic');
        this.btnUnderline = this.node.querySelector('.ui-button.underline');
        this.btnStrike = this.node.querySelector('.ui-button.strike');
        this.btnSubscript = this.node.querySelector('.ui-button.subscript');
        this.btnSuperscript = this.node.querySelector('.ui-button.superscript');
        this.btnLeft = this.node.querySelector('.ui-button.left');
        this.btnRight = this.node.querySelector('.ui-button.right');
        this.btnCenter = this.node.querySelector('.ui-button.center');
        this.btnJustified = this.node.querySelector('.ui-button.justified');
        this.btnUL = this.node.querySelector('.ui-button.ul');
        this.btnOL = this.node.querySelector('.ui-button.ol');
        this.btnIndent = this.node.querySelector('.ui-button.increase');
        this.btnUnindent = this.node.querySelector('.ui-button.decrease');
        this.btnBorderColor = this.node.querySelector('div.ui-button.borderColor');
        this.btnBackgroundColor = this.node.querySelector('div.ui-button.backgroundColor');
        this.btnColor = this.node.querySelector('div.ui-button.color');
        (function (me) {
            me.btnClearFormatting.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(9 /* CLEAR_FORMATTING */, []);
            }, true);
            me.dropdownize(me.blockLevel, function (v) {
                me.setBlockLevel(v);
            }, true);
            me.dropdownize(me.fontFamily, function (v) {
                me.setFontFamily(v);
            }, false);
            me.dropdownize(me.fontSize, function (v) {
                me.setFontSize(v);
            }, false);
            me.btnBold.addEventListener('click', function () {
                me.toolbar.router.dispatchCommand(4 /* BOLD */, []);
            }, true);
            me.btnItalic.addEventListener('click', function () {
                me.toolbar.router.dispatchCommand(5 /* ITALIC */, []);
            }, true);
            me.btnUnderline.addEventListener('click', function () {
                me.toolbar.router.dispatchCommand(6 /* UNDERLINE */, []);
            }, true);
            me.btnStrike.addEventListener('click', function () {
                me.toolbar.router.dispatchCommand(7 /* STRIKE */, []);
            }, true);
            me.btnSubscript.addEventListener('click', function (DOMEvent) {
                if (me.toolbar.state.state.verticalAlign == 'sub') {
                    me.toolbar.router.dispatchCommand(15 /* VALIGN */, ['normal']);
                }
                else {
                    me.toolbar.router.dispatchCommand(15 /* VALIGN */, ['sub']);
                }
            }, true);
            me.btnSuperscript.addEventListener('click', function (DOMEvent) {
                if (me.toolbar.state.state.verticalAlign == 'super') {
                    me.toolbar.router.dispatchCommand(15 /* VALIGN */, ['normal']);
                }
                else {
                    me.toolbar.router.dispatchCommand(15 /* VALIGN */, ['sup']);
                }
            }, true);
            me.btnLeft.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(8 /* ALIGN */, ['left']);
            }, true);
            me.btnRight.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(8 /* ALIGN */, ['right']);
            }, true);
            me.btnCenter.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(8 /* ALIGN */, ['center']);
            }, true);
            me.btnJustified.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(8 /* ALIGN */, ['justified']);
            }, true);
            me.btnUL.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(21 /* LIST */, ['ul']);
            }, true);
            me.btnOL.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(21 /* LIST */, ['ol']);
            }, true);
            me.btnIndent.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(13 /* INDENT */, []);
            }, true);
            me.btnUnindent.addEventListener('click', function (DOMEvent) {
                me.toolbar.router.dispatchCommand(14 /* UNINDENT */, []);
            }, true);
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
    UI_Toolbar_Panel_Formatting.prototype.setBlockLevel = function (nodeName) {
        this.toolbar.router.dispatchCommand(20 /* BLOCK_LEVEL */, [nodeName]);
    };
    UI_Toolbar_Panel_Formatting.prototype.setFontFamily = function (fontFamily) {
        this.toolbar.router.dispatchCommand(16 /* FONT */, [fontFamily]);
    };
    UI_Toolbar_Panel_Formatting.prototype.setFontSize = function (fontSize) {
        this.toolbar.router.dispatchCommand(19 /* SIZE */, [fontSize]);
    };
    UI_Toolbar_Panel_Formatting.prototype.updateBlockLevel = function () {
        var level = String(this.toolbar.state.state.blockLevel || ''), strs = {
            "normal": "Normal",
            "h1": "Heading 1",
            "h2": "Heading 2",
            "h3": "Heading 3",
            "h4": "Heading 4",
            "h5": "Heading 5"
        };
        this.blockLevel.value = strs[level] || '';
    };
    UI_Toolbar_Panel_Formatting.prototype.updateFontFamily = function () {
        var family = String(this.toolbar.state.state.fontFamily || '');
        this.fontFamily.value = family;
    };
    UI_Toolbar_Panel_Formatting.prototype.updateFontSize = function () {
        var size = String(this.toolbar.state.state.fontSize || '');
        this.fontSize.value = size;
    };
    UI_Toolbar_Panel_Formatting.prototype.updateScriptState = function () {
        var state = this.toolbar.state.state.verticalAlign, btns = [this.btnSuperscript, this.btnSubscript], i;
        for (i = 0; i < 2; i++) {
            DOM.removeClass(btns[i], 'state-pressed');
        }
        switch (state) {
            case 'super':
                DOM.addClass(this.btnSuperscript, 'state-pressed');
                break;
            case 'sub':
                DOM.addClass(this.btnSubscript, 'state-pressed');
                break;
        }
    };
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
    UI_Toolbar_Panel_Formatting.prototype.updateStrikeState = function () {
        var state = this.toolbar.state.state.strike;
        DOM.removeClass(this.btnStrike, 'state-pressed');
        DOM.removeClass(this.btnStrike, 'state-mixed');
        if (state) {
            DOM.addClass(this.btnStrike, 'state-pressed');
        }
        else {
            if (state === null) {
                DOM.addClass(this.btnStrike, 'state-mixed');
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
    UI_Toolbar_Panel_Formatting.prototype.updateAlignmentState = function () {
        var state = this.toolbar.state.state.textAlign, btns = [
            this.btnLeft,
            this.btnRight,
            this.btnCenter,
            this.btnJustified
        ], i;
        for (i = 0; i < 4; i++) {
            DOM.removeClass(btns[i], 'state-pressed');
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
        }
    };
    UI_Toolbar_Panel_Formatting.prototype.updateListState = function () {
        var state = this.toolbar.state.state.listType;
        DOM.removeClass(this.btnUL, 'state-pressed');
        DOM.removeClass(this.btnOL, 'state-pressed');
        switch (state) {
            case 'ul':
                DOM.addClass(this.btnUL, 'state-pressed');
                break;
            case 'ol':
                DOM.addClass(this.btnOL, 'state-pressed');
                break;
            default:
                break;
        }
    };
    UI_Toolbar_Panel_Formatting.prototype.setBorderColor = function (color) {
        console.info('setBorderColor: ' + color);
    };
    UI_Toolbar_Panel_Formatting.prototype.setBackgroundColor = function (color) {
        this.toolbar.router.dispatchCommand(18 /* BGCOLOR */, [color]);
    };
    UI_Toolbar_Panel_Formatting.prototype.setColor = function (color) {
        this.toolbar.router.dispatchCommand(17 /* COLOR */, [color]);
    };
    UI_Toolbar_Panel_Formatting.prototype.updateDocumentState = function (propertiesList) {
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
                case 'verticalAlign':
                    this.updateScriptState();
                    break;
                case 'bold':
                    this.updateBoldState();
                    break;
                case 'italic':
                    this.updateItalicState();
                    break;
                case 'underline':
                    this.updateUnderlineState();
                    break;
                case 'strike':
                    this.updateStrikeState();
                    break;
                case 'textAlign':
                    this.updateAlignmentState();
                    break;
                case 'listType':
                    this.updateListState();
                    break;
            }
        }
    };
    return UI_Toolbar_Panel_Formatting;
})(UI_Toolbar_Panel);
var UI_Toolbar_Panel_Multimedia = (function (_super) {
    __extends(UI_Toolbar_Panel_Multimedia, _super);
    function UI_Toolbar_Panel_Multimedia(toolbar, appendIn) {
        _super.call(this, toolbar, 'Multimedia', appendIn);
        this.buttonLink = null;
        this.buttonPicture = null;
        this.buttonVideo = null;
        DOM.addClass(this.node, 'ui-panel-multimedia');
        this.node.innerHTML = UI_Resources.html_multimediaToolbar;
        this.buttonLink = this.node.querySelector('.ui-button.link');
        this.buttonPicture = this.node.querySelector('.ui-button.picture');
        this.buttonVideo = this.node.querySelector('.ui-button.video');
        (function (me) {
            me.buttonLink.addEventListener('click', function (e) {
                me.insertLink();
            }, true);
            me.buttonPicture.addEventListener('click', function (e) {
                me.insertPicture();
            }, true);
            me.buttonVideo.addEventListener('click', function (e) {
                me.insertVideo();
            }, true);
        })(this);
    }
    UI_Toolbar_Panel_Multimedia.prototype.insertLink = function () {
        var selection = this.toolbar.router.viewport.selection, rng = selection.getRange(), dialog = null, fragment, elements, cursor, cursorBlock, aText = null, aTarget = null, aHref = null, i = 0, len;
        /* We dissalow the command if no rng.focusNode() is definde */
        if (rng.focusNode() === null) {
            UI_Dialog_Manager.alert('Please click or select a text first!', function () {
                selection.viewport.canvas.focus();
            }, selection.viewport.canvas);
            return;
        }
        if (!rng.length() && rng.focusNode()) {
            // If nothing is selected, but the caret is inside of an "A" element,
            // we select that element first!.
            cursor = rng.focusNode().target;
            cursorBlock = cursor.ownerBlockElement();
            while (cursor != cursorBlock) {
                if (cursor.is() == 'a') {
                    selection.selectByFragmentIndexes(cursor.FRAGMENT_START, cursor.FRAGMENT_END);
                    rng = selection.getRange();
                    break;
                }
                cursor = cursor.parentNode;
            }
        }
        if (rng.length()) {
            /* Find out if selection contains any links */
            fragment = rng.createContextualFragment();
            aText = fragment.toString('text/plain');
            elements = fragment.affectedInlineElements();
            for (i = 0, len = elements.length; i < len; i++) {
                if (elements[i].is() == 'a') {
                    aTarget = elements[i].target();
                    aHref = elements[i].href();
                    dialog = UI_Dialog_Manager.singleton('EditLink');
                    break;
                }
            }
            if (!dialog) {
                dialog = UI_Dialog_Manager.singleton('InsertLink');
            }
        }
        else {
            dialog = UI_Dialog_Manager.singleton('InsertLink');
        }
        if (dialog) {
            dialog.setup(this.toolbar.router.viewport, aText, aHref, aTarget).centerTo(selection.viewport.canvas).open();
        }
    };
    UI_Toolbar_Panel_Multimedia.prototype.insertPicture = function () {
        var selection = this.toolbar.router.viewport.selection, rng = selection.getRange(), picture = null;
        if (!rng.focusNode()) {
            if (rng.anchorNode().target.is() != 'img') {
                UI_Dialog_Manager.alert('The editor is not in a state which allows inserting pictures. Try selecting a picture or a text first.', function () {
                    selection.viewport.canvas.focus();
                }, selection.viewport.canvas);
                return;
            }
            else {
                picture = rng.anchorNode().target;
            }
        }
        else {
            picture = null;
        }
        UI_Dialog_Manager.singleton('InsertPicture').setup(picture, this.toolbar.router.viewport.document).centerTo(selection.viewport.canvas).open();
    };
    UI_Toolbar_Panel_Multimedia.prototype.insertVideo = function () {
    };
    return UI_Toolbar_Panel_Multimedia;
})(UI_Toolbar_Panel);
var UI_Dialog = (function (_super) {
    __extends(UI_Dialog, _super);
    function UI_Dialog(config) {
        _super.call(this);
        /* DOM Elements */
        this.outerNode = document.createElement('div');
        this.titlebar = document.createElement('div');
        this.label = document.createElement('div');
        this.btns = document.createElement('div');
        this.body = document.createElement('div');
        this.resizer = document.createElement('div');
        this.footerButtons = document.createElement('div');
        /* Resizing stuff */
        this.resizerType = null;
        this.resizerLastPoint = null;
        this.settings = {
            "width": 100,
            "height": 100,
            "caption": "Dialog",
            "closable": true,
            "resizable": true,
            "minWidth": 90,
            "minHeight": 10,
            "childOf": null,
            "x": 0,
            "y": 0,
            "modal": false,
            "buttons": []
        };
        this.titlebar.appendChild(this.label);
        this.titlebar.appendChild(this.btns);
        this.outerNode.appendChild(this.resizer);
        this.resizer.innerHTML = '<div class="handle n"></div><div class="handle s"></div><div class="handle w"></div><div class="handle e"></div><div class="handle nw"></div><div class="handle ne"></div><div class="handle sw"></div><div class="handle se"></div>';
        this.resizer.appendChild(this.titlebar);
        this.resizer.appendChild(this.body);
        this.resizer.appendChild(this.footerButtons);
        DOM.addClass(this.outerNode, 'ui-dialog');
        DOM.addClass(this.outerNode.appendChild(document.createElement('div')), 'modal');
        DOM.addClass(this.resizer, 'resizer');
        DOM.addClass(this.titlebar, 'titlebar');
        DOM.addClass(this.label, 'caption');
        DOM.addClass(this.btns, 'buttons');
        DOM.addClass(this.footerButtons, 'buttons-footer');
        DOM.addClass(this.body, 'body');
        this.width = typeof config.width == 'undefined' ? this.settings.width : config.width;
        this.height = typeof config.height == 'undefined' ? this.settings.height : config.height;
        this.caption = typeof config.caption == 'undefined' ? this.settings.caption : config.caption;
        this.closable = typeof config.closable == 'undefined' ? this.settings.closable : config.closable;
        this.modal = typeof config.modal == 'undefined' ? this.settings.modal : config.modal;
        this.childOf = typeof config.childOf == 'undefined' ? this.settings.childOf : config.childOf;
        this.x = typeof config.x == 'undefined' ? this.settings.x : config.x;
        this.y = typeof config.y == 'undefined' ? this.settings.y : config.y;
        this.minWidth = typeof config.minWidth == 'undefined' ? this.settings.minWidth : config.minWidth;
        this.minHeight = typeof config.minHeight == 'undefined' ? this.settings.minHeight : config.minHeight;
        this.innerHTML = typeof config.innerHTML == 'undefined' ? this.settings.innerHTML : config.innerHTML;
        this.buttons = typeof config.buttons == 'undefined' ? this.settings.buttons : config.buttons;
        this.outerNode['dialog'] = this;
        this._initResizer_();
        this._initKeyboard_();
        this.outerNode.tabIndex = 0;
    }
    Object.defineProperty(UI_Dialog.prototype, "x", {
        get: function () {
            return this.settings.x;
        },
        set: function (num) {
            this.settings.x = ~~num;
            this.outerNode.style.left = this.settings.x + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Dialog.prototype, "y", {
        get: function () {
            return this.settings.y;
        },
        set: function (num) {
            this.settings.y = ~~num;
            this.outerNode.style.top = this.settings.y + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Dialog.prototype, "width", {
        get: function () {
            return this.settings.width;
        },
        set: function (v) {
            this.settings.width = ~~v;
            this.outerNode.style.width = v + 4 + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Dialog.prototype, "height", {
        get: function () {
            return this.settings.height;
        },
        set: function (v) {
            this.settings.height = ~~v;
            this.outerNode.style.height = v + 30 + (this.settings.buttons ? 50 : 0) + "px";
            this.resizer.style.height = v + 30 + (this.settings.buttons ? 50 : 0) + "px";
            this.body.style.height = v + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Dialog.prototype, "caption", {
        get: function () {
            return this.settings.caption;
        },
        set: function (s) {
            this.settings.caption = String(s || '');
            this.label.innerHTML = '';
            this.label.appendChild(document.createTextNode(this.settings.caption));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Dialog.prototype, "childOf", {
        get: function () {
            return this.outerNode.parentNode;
        },
        set: function (element) {
            if (element) {
                element.appendChild(this.outerNode);
                this.fire('open', element);
            }
            else {
                if (this.outerNode.parentNode) {
                    this.outerNode.parentNode.removeChild(this.outerNode);
                }
            }
            this.settings.childOf = element || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Dialog.prototype, "innerHTML", {
        get: function () {
            return this.body.innerHTML;
        },
        set: function (s) {
            this.body.innerHTML = String(s || '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Dialog.prototype, "closable", {
        get: function () {
            return this.settings.closable;
        },
        set: function (v) {
            this.settings.closable = !!v;
            var rm = this.btns.querySelector('div.close');
            if (rm) {
                this.btns.removeChild(rm);
            }
            if (v) {
                DOM.addClass(this.titlebar, 'closable');
                var btnClose = document.createElement('div');
                DOM.addClass(btnClose, 'close');
                this.btns.appendChild(btnClose);
                (function (me) {
                    btnClose.addEventListener('click', function () {
                        me.close();
                    }, true);
                })(this);
            }
            else {
                DOM.removeClass(this.titlebar, 'closable');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Dialog.prototype, "modal", {
        get: function () {
            return this.settings.modal;
        },
        set: function (b) {
            this.settings.modal = !!b;
            if (this.settings.modal) {
                DOM.addClass(this.outerNode, 'modal');
            }
            else {
                DOM.removeClass(this.outerNode, 'modal');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Dialog.prototype, "minWidth", {
        get: function () {
            return this.settings.minWidth;
        },
        set: function (v) {
            this.settings.minWidth = ~~v;
            if (this.width < this.settings.minWidth) {
                this.width = this.settings.minWidth;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Dialog.prototype, "minHeight", {
        get: function () {
            return this.settings.minHeight;
        },
        set: function (v) {
            this.settings.minHeight = ~~v;
            if (this.height < this.settings.minHeight) {
                this.height = this.settings.minHeight;
            }
        },
        enumerable: true,
        configurable: true
    });
    UI_Dialog.prototype.close = function () {
        this.childOf = null;
        this.fire('close');
        return this;
    };
    UI_Dialog.prototype.open = function (inParent) {
        if (inParent === void 0) { inParent = null; }
        if (inParent) {
            this.childOf = inParent;
        }
        else {
            this.childOf = document.body;
        }
        this.fire('open');
        this.outerNode.focus();
        return this;
    };
    Object.defineProperty(UI_Dialog.prototype, "buttons", {
        get: function () {
            return this.settings.buttons;
        },
        set: function (cfg) {
            this.footerButtons.innerHTML = '';
            if (cfg && cfg.length) {
                for (var i = 0, len = cfg.length; i < len; i++) {
                    (function (btn, container, me) {
                        var button = document.createElement('button');
                        button.appendChild(document.createTextNode(btn.name));
                        if (btn.default) {
                            DOM.addClass(button, 'default');
                        }
                        container.appendChild(button);
                        button.addEventListener('click', function () {
                            btn.callback.call(me);
                        }, true);
                    })(cfg[i], this.footerButtons, this);
                }
                DOM.addClass(this.outerNode, 'footer-buttons');
                this.settings.buttons = cfg;
            }
            else {
                DOM.removeClass(this.outerNode, 'footer-buttons');
                this.settings.buttons = null;
            }
            this.height = this.height;
        },
        enumerable: true,
        configurable: true
    });
    UI_Dialog.prototype.runDefaultAction = function () {
        if (this.settings.buttons && this.settings.buttons.length) {
            for (var i = 0, len = this.settings.buttons.length; i < len; i++) {
                if (this.settings.buttons[i].default) {
                    this.settings.buttons[i].callback.call(this);
                    break;
                }
            }
        }
    };
    UI_Dialog.prototype.runCancelAction = function () {
        for (var i = 0, len = this.settings.buttons.length; i < len; i++) {
            if (this.settings.buttons[i].cancel) {
                this.settings.buttons[i].callback.call(this);
                break;
            }
        }
    };
    // this method should be implemented by ancestors.
    UI_Dialog.prototype.setup = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this;
    };
    UI_Dialog.prototype._initKeyboard_ = function () {
        (function (me) {
            me.outerNode.addEventListener('keyup', function (evt) {
                var key = evt.keyCode;
                switch (key) {
                    case 13:
                        if (document.activeElement && document.activeElement.nodeName.toLowerCase() == 'textarea') {
                            break;
                        }
                        me.runDefaultAction();
                        evt.preventDefault();
                        evt.stopPropagation();
                        break;
                    case 27:
                        me.runCancelAction();
                        evt.preventDefault();
                        evt.stopPropagation();
                        break;
                }
            });
            me.outerNode.addEventListener('keydown', function (evt) {
                var key = evt.keyCode, nodes, focused = document.activeElement, fIndex = null;
                if (key == 9) {
                    nodes = Array.prototype.slice.call(me.outerNode.querySelectorAll('input:not(:disabled),textarea:not(:disabled),select:not(:disabled),button:not(:disabled)'), 0);
                    for (var i = 0, len = nodes.length; i < len; i++) {
                        if (focused == nodes[i]) {
                            fIndex = i;
                            break;
                        }
                    }
                    if (fIndex === null) {
                        return;
                    }
                    if (evt.shiftKey) {
                        // focus previous
                        if (fIndex > 0) {
                            nodes[fIndex - 1].focus();
                        }
                        else {
                            nodes[nodes.length - 1].focus();
                        }
                    }
                    else {
                        //console.log( fIndex, nodes.length, nodes );
                        // focus next
                        if (fIndex < (nodes.length - 1)) {
                            nodes[fIndex + 1].focus();
                        }
                        else {
                            nodes[0].focus();
                        }
                    }
                    evt.preventDefault();
                    evt.stopPropagation();
                }
            });
        })(this);
    };
    UI_Dialog.prototype._initResizer_ = function () {
        (function (me) {
            me.outerNode.querySelector('.modal').addEventListener('click', function () {
                me.x -= 10;
                setTimeout(function () {
                    me.x += 20;
                }, 50);
                setTimeout(function () {
                    me.x -= 20;
                }, 100);
                setTimeout(function () {
                    me.x += 10;
                    me.outerNode.focus();
                }, 150);
            });
            function onresizer_mousemove(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                var currentPoint = {
                    "x": evt.clientX,
                    "y": evt.clientY
                }, delta = {
                    "x": me.resizerLastPoint.x - currentPoint.x,
                    "y": me.resizerLastPoint.y - currentPoint.y
                }, rect = {
                    "width": me.width,
                    "height": me.height,
                    "x": me.x,
                    "y": me.y
                };
                switch (me.resizerType) {
                    case 4 /* N */:
                        rect.y -= delta.y;
                        rect.height += delta.y;
                        break;
                    case 5 /* S */:
                        rect.height -= delta.y;
                        break;
                    case 6 /* W */:
                        rect.x -= delta.x;
                        rect.width += delta.x;
                        break;
                    case 7 /* E */:
                        rect.width -= delta.x;
                        break;
                    case 2 /* SW */:
                        rect.x -= delta.x;
                        rect.width += delta.x;
                        rect.height -= delta.y;
                        break;
                    case 3 /* SE */:
                        rect.width -= delta.x;
                        rect.height -= delta.y;
                        break;
                    case 0 /* NW */:
                        rect.x -= delta.x;
                        rect.y -= delta.y;
                        rect.width += delta.x;
                        rect.height += delta.y;
                        break;
                    case 1 /* NE */:
                        rect.y -= delta.y;
                        rect.width -= delta.x;
                        rect.height += delta.y;
                        break;
                }
                if (rect.width >= me.settings.minWidth) {
                    if (rect.x != me.x) {
                        me.x = rect.x;
                    }
                    if (rect.width != me.width) {
                        me.width = rect.width;
                    }
                    me.resizerLastPoint.x = currentPoint.x;
                }
                if (rect.height >= me.settings.minHeight) {
                    if (rect.y != me.y) {
                        me.y = rect.y;
                    }
                    if (rect.height != me.height) {
                        me.height = rect.height;
                    }
                    me.resizerLastPoint.y = currentPoint.y;
                }
            }
            function onresizer_mouseup(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                me.resizerType = null;
                document.body.removeEventListener('mousemove', onresizer_mousemove, true);
                document.body.removeEventListener('mouseup', onresizer_mouseup, true);
            }
            me.resizer.addEventListener('mousedown', function (evt) {
                var handle = evt.target || evt.toElement;
                if (handle && DOM.hasClass(handle, 'handle')) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    switch (true) {
                        case DOM.hasClass(handle, 'n'):
                            me.resizerType = 4 /* N */;
                            break;
                        case DOM.hasClass(handle, 's'):
                            me.resizerType = 5 /* S */;
                            break;
                        case DOM.hasClass(handle, 'w'):
                            me.resizerType = 6 /* W */;
                            break;
                        case DOM.hasClass(handle, 'e'):
                            me.resizerType = 7 /* E */;
                            break;
                        case DOM.hasClass(handle, 'nw'):
                            me.resizerType = 0 /* NW */;
                            break;
                        case DOM.hasClass(handle, 'ne'):
                            me.resizerType = 1 /* NE */;
                            break;
                        case DOM.hasClass(handle, 'sw'):
                            me.resizerType = 2 /* SW */;
                            break;
                        case DOM.hasClass(handle, 'se'):
                            me.resizerType = 3 /* SE */;
                            break;
                    }
                    me.resizerLastPoint = {
                        "x": evt.clientX,
                        "y": evt.clientY
                    };
                    document.body.addEventListener('mousemove', onresizer_mousemove, true);
                    document.body.addEventListener('mouseup', onresizer_mouseup, true);
                }
            }, true);
            function ondrag_mousemove(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                var currentPoint = {
                    "x": evt.clientX,
                    "y": evt.clientY
                }, delta = {
                    "x": me.resizerLastPoint.x - currentPoint.x,
                    "y": me.resizerLastPoint.y - currentPoint.y
                };
                me.x -= delta.x;
                me.y -= delta.y;
                me.resizerLastPoint.x = currentPoint.x;
                me.resizerLastPoint.y = currentPoint.y;
            }
            function ondrag_mouseup(evt) {
                document.body.removeEventListener('mousemove', ondrag_mousemove, true);
                document.body.removeEventListener('mouseup', ondrag_mouseup, true);
            }
            me.label.addEventListener('mousedown', function (evt) {
                document.body.addEventListener('mousemove', ondrag_mousemove, true);
                document.body.addEventListener('mouseup', ondrag_mouseup, true);
                me.resizerLastPoint = {
                    "x": evt.clientX,
                    "y": evt.clientY
                };
                evt.preventDefault();
                evt.stopPropagation();
            }, true);
        })(this);
    };
    Object.defineProperty(UI_Dialog.prototype, "offsetHeight", {
        get: function () {
            return this.settings.height + 30 + (this.settings.buttons ? 50 : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Dialog.prototype, "offsetWidth", {
        get: function () {
            return this.settings.width + 4;
        },
        enumerable: true,
        configurable: true
    });
    UI_Dialog.prototype.centerTo = function (node) {
        var nodeRect = node.getBoundingClientRect(), bodyLeft = document.body.scrollLeft, bodyTop = document.body.scrollTop, y = nodeRect.top + (nodeRect.height / 2) - (this.offsetHeight / 2), x = nodeRect.left + (nodeRect.width / 2) - (this.offsetWidth / 2);
        if (y < bodyTop) {
            y = bodyTop;
        }
        if (x < bodyLeft) {
            x = bodyLeft;
        }
        this.x = ~~x;
        this.y = ~~y;
        return this;
    };
    return UI_Dialog;
})(Events);
var UI_Dialog_Manager = (function () {
    function UI_Dialog_Manager() {
    }
    UI_Dialog_Manager.singleton = function (dialogType) {
        var i = 0, len = UI_Dialog_Manager.dialogs.length, add = {
            "type": null,
            "dialog": null
        };
        for (i = 0; i < len; i++) {
            if (UI_Dialog_Manager.dialogs[i].type == dialogType) {
                return UI_Dialog_Manager.dialogs[i].dialog;
                break;
            }
        }
        add.type = dialogType;
        switch (dialogType) {
            case 'Alert':
                add.dialog = new UI_Dialog_Alert();
                UI_Dialog_Manager.dialogs.push(add);
                return add.dialog;
                break;
            case 'InsertPicture':
                add.dialog = new UI_Dialog_InsertPicture();
                UI_Dialog_Manager.dialogs.push(add);
                return add.dialog;
                break;
            case 'InsertLink':
                add.dialog = new UI_Dialog_InsertLink();
                UI_Dialog_Manager.dialogs.push(add);
                return add.dialog;
                break;
            case 'EditLink':
                add.dialog = new UI_Dialog_EditLink();
                UI_Dialog_Manager.dialogs.push(add);
                return add.dialog;
                break;
            default:
                throw "Unknown dialog type: " + dialogType;
                break;
        }
    };
    UI_Dialog_Manager.alert = function (message, callback, centerTo) {
        if (callback === void 0) { callback = null; }
        if (centerTo === void 0) { centerTo = null; }
        var dlg = UI_Dialog_Manager.singleton('Alert');
        dlg.setup(message, callback, centerTo).open();
    };
    UI_Dialog_Manager.dialogs = [];
    return UI_Dialog_Manager;
})();
var UI_Dialog_Alert = (function (_super) {
    __extends(UI_Dialog_Alert, _super);
    function UI_Dialog_Alert(config) {
        if (config === void 0) { config = {
            "caption": "Alert",
            "width": 400,
            "height": 100,
            "minWidth": 400,
            "minHeight": 50,
            "closable": true,
            "modal": true,
            "buttons": [
                {
                    "name": "Ok",
                    "default": true,
                    "cancel": true,
                    "callback": function () {
                        this.on_ok();
                    }
                }
            ],
            "innerHTML": UI_Resources.html_alert
        }; }
        _super.call(this, config);
        this.textAlert = null;
        this.callback = null;
        this.textAlert = this.body.querySelector('p.alert-text');
    }
    /* Setup:
        $args[0]: <message> : string = null
        $args[1]: <callback>: () => void,
        $args[2]: <centerTo>: DOMElement = null
     */
    UI_Dialog_Alert.prototype.setup = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        this.textAlert.innerHTML = '';
        this.textAlert.appendChild(document.createTextNode(String(args[0] || 'Alert!')));
        this.callback = args[1] || null;
        if (args[2]) {
            this.centerTo(args[2]);
        }
        return this;
    };
    UI_Dialog_Alert.prototype.on_ok = function () {
        this.close();
        if (this.callback) {
            this.callback();
        }
    };
    return UI_Dialog_Alert;
})(UI_Dialog);
var UI_Dialog_InsertPicture = (function (_super) {
    __extends(UI_Dialog_InsertPicture, _super);
    function UI_Dialog_InsertPicture(config) {
        if (config === void 0) { config = {
            "caption": "Insert Picture",
            "width": 400,
            "height": 400,
            "minWidth": 400,
            "minHeight": 400,
            "closable": true,
            "modal": true,
            "buttons": [
                {
                    "name": "Ok",
                    "default": true,
                    "callback": function () {
                        this.on_ok();
                    }
                },
                {
                    "name": "Cancel",
                    "cancel": true,
                    "callback": function () {
                        this.on_cancel();
                    }
                }
            ],
            "innerHTML": UI_Resources.html_insertPicture
        }; }
        _super.call(this, config);
        this.iWidth = null;
        this.iHeight = null;
        this.iConstrainProportions = null;
        this.iAlternateText = null;
        this.iSource = null;
        this.iPreview = null;
        this.iLoaded = false;
        this.aspectRatio = 1;
        this.iInitialWidth = null;
        this.initialImage = null;
        this.ownerDocument = null;
        this.emptySrc = '';
        this.iWidth = this.body.querySelector('input.int-width');
        this.iHeight = this.body.querySelector('input.int-height');
        this.iConstrainProportions = this.body.querySelector('input.bool-proportions');
        this.iAlternateText = this.body.querySelector('input.txt-alt');
        this.iSource = this.body.querySelector('input.txt-src');
        this.iPreview = this.body.querySelector('img.img-preview');
        this.emptySrc = this.iPreview.src;
        this._setupPreview_();
    }
    UI_Dialog_InsertPicture.prototype._setupPreview_ = function () {
        (function (me) {
            me.iPreview.addEventListener('error', function () {
                me.iPreview.src = me.emptySrc;
                me.iLoaded = false;
                me.onLoadStateChanged();
            }, true);
            me.iPreview.addEventListener('load', function () {
                if (me.iPreview.src != me.emptySrc) {
                    me.iLoaded = true;
                    me.iPreview.style.maxWidth = '';
                    me.iPreview.style.maxHeight = '';
                    me.iWidth.value = me.iPreview.width;
                    me.iHeight.value = me.iPreview.height;
                    me.aspectRatio = me.iPreview.width / me.iPreview.height;
                    if (me.iInitialWidth) {
                        me.iWidth.value = String(me.iInitialWidth);
                        me.iHeight.value = String(Math.round(me.iInitialWidth / this.aspectRatio));
                        me.iWidth.focus();
                    }
                    me.iPreview.style.maxWidth = '150px';
                    me.iPreview.style.maxHeight = '150px';
                }
                else {
                    me.iLoaded = false;
                }
                me.onLoadStateChanged();
            }, true);
            me.iSource.addEventListener('input', function () {
                console.warn('setup input');
                if (me.iSource.value) {
                    me.iPreview.src = me.iSource.value;
                }
                else {
                    me.iPreview.src = me.emptySrc;
                }
            });
            me.iWidth.addEventListener('wheel', function (evt) {
                if (me.iWidth.disabled) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }
                else {
                    me.onWidthChanged();
                }
            }, true);
            me.iHeight.addEventListener('wheel', function (evt) {
                if (me.iHeight.disabled) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }
                else {
                    me.onHeightChanged();
                }
            }, true);
            me.iWidth.addEventListener('blur', function () {
                me.onWidthChanged();
            }, true);
            me.iHeight.addEventListener('blur', function () {
                me.onHeightChanged();
            }, true);
            me.iConstrainProportions.addEventListener('click', function () {
                if (me.iConstrainProportions.checked) {
                    me.onWidthChanged();
                }
            }, false);
        })(this);
    };
    UI_Dialog_InsertPicture.prototype.onLoadStateChanged = function () {
        if (this.iLoaded) {
            this.iWidth.disabled = false;
            this.iHeight.disabled = false;
            this.iConstrainProportions.disabled = false;
            this.iConstrainProportions.checked = true;
        }
        else {
            this.iWidth.disabled = true;
            this.iHeight.disabled = true;
            this.iConstrainProportions.disabled = true;
            this.iWidth.value = '';
            this.iHeight.value = '';
        }
    };
    UI_Dialog_InsertPicture.prototype.onWidthChanged = function () {
        if (this.iConstrainProportions.checked) {
            var w = ~~this.iWidth.value;
            if (w > 0)
                this.iHeight.value = String(Math.round(w / this.aspectRatio));
        }
    };
    UI_Dialog_InsertPicture.prototype.onHeightChanged = function () {
        if (this.iConstrainProportions.checked) {
            var h = ~~this.iHeight.value;
            if (h > 0)
                this.iWidth.value = String(Math.round(h * this.aspectRatio));
        }
    };
    /* $args[0] => <picture> : HTML_Image = null
       $args[1] => <document>: HTML_Body  = null;
     */
    UI_Dialog_InsertPicture.prototype.setup = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var img = args[0] || null;
        var doc = args[1] || null;
        this.ownerDocument = doc;
        if (img === null) {
            /* Setup for a new image */
            this.iInitialWidth = null;
            this.iPreview.src = this.emptySrc;
            this.iSource.value = '';
            this.initialImage = null;
            this.iWidth.value = '';
            this.iHeight.value = '';
            this.iInitialWidth = 400;
            this.aspectRatio = 1;
        }
        else {
            /* Setup for an existing image */
            this.iWidth.value = String(~~img.style.width());
            this.iInitialWidth = ~~img.style.width();
            this.iHeight.value = String(~~img.style.height());
            this.iAlternateText.value = img.alt();
            this.iSource.value = img.src();
            this.iPreview.src = img.src();
            this.initialImage = img;
        }
        this.iConstrainProportions.checked = true;
        return this;
    };
    UI_Dialog_InsertPicture.prototype.on_ok = function () {
        var width = ~~(this.iWidth.value), height = ~~(this.iHeight.value), src = this.iSource.value, me = this;
        if (!this.iLoaded) {
            UI_Dialog_Manager.alert('Please input a valid image source!', function () {
                me.iSource.focus();
            }, this.body);
            return;
        }
        if (width <= 0) {
            UI_Dialog_Manager.alert('Please input a valid image width!', function () {
                me.iWidth.focus();
            }, this.body);
            return;
        }
        if (height <= 0) {
            UI_Dialog_Manager.alert('Please input a valid image height!', function () {
                me.iHeight.focus();
            }, this.body);
            return;
        }
        if (this.initialImage) {
            this.initialImage.src(src);
            this.initialImage.width(String(width));
            this.initialImage.height(String(height));
            this.initialImage.alt(this.iAlternateText.value);
        }
        else {
            var img = this.ownerDocument.createElement('img');
            img.src(src);
            img.width(String(width));
            img.height(String(height));
            img.alt(this.iAlternateText.value);
            this.ownerDocument.viewport.selection.insertHTML(img.outerHTML());
        }
        this.close();
    };
    UI_Dialog_InsertPicture.prototype.on_cancel = function () {
        this.ownerDocument = null;
        this.initialImage = null;
        this.close();
    };
    return UI_Dialog_InsertPicture;
})(UI_Dialog);
var UI_Dialog_InsertLink = (function (_super) {
    __extends(UI_Dialog_InsertLink, _super);
    function UI_Dialog_InsertLink(config) {
        if (config === void 0) { config = {
            "caption": "Insert Link",
            "width": 400,
            "height": 150,
            "minWidth": 400,
            "minHeight": 150,
            "closable": true,
            "modal": true,
            "buttons": [
                {
                    "name": "Ok",
                    "default": true,
                    "callback": function () {
                        this.on_ok();
                    }
                },
                {
                    "name": "Cancel",
                    "cancel": true,
                    "callback": function () {
                        this.on_cancel();
                    }
                }
            ],
            "innerHTML": UI_Resources.html_insertLink
        }; }
        _super.call(this, config);
        this.aText = null;
        this.aHref = null;
        this.aTarget = null;
        this.viewport = null;
        this.aText = this.body.querySelector('input.i-text');
        this.aHref = this.body.querySelector('input.i-link');
        this.aTarget = this.body.querySelector('select.s-target');
    }
    /* Setup:
        $args[0]: <viewport>: Viewport
        $args[1]: <sText>   : string = null
        $args[2]: <sHref>   : string = null
        $args[3]: <sTarget> : string = null
     */
    UI_Dialog_InsertLink.prototype.setup = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var viewport = args[0] || null, sText = String(args[1] || '') || null, sHref = String(args[2] || '') || null, sTarget = String(args[3] || '') || null;
        this.viewport = viewport;
        this.aText.value = sText || '';
        if (this.aText.value) {
            this.aText.readOnly = true;
            this.aText.disabled = true;
        }
        else {
            this.aText.readOnly = false;
            this.aText.disabled = false;
        }
        this.aHref.value = sHref || '';
        this.aTarget.value = sTarget || '';
        return this;
    };
    UI_Dialog_InsertLink.prototype.on_ok = function () {
        var me = this;
        if (this.aText) {
            if (this.aText.value == '') {
                UI_Dialog_Manager.alert('Please fill-in a text for the HyperLink!', function () {
                    me.aText.focus();
                }, this.body);
                return;
            }
        }
        if (this.aHref.value == '') {
            UI_Dialog_Manager.alert('Please fill-in an internet address that will be used for the HyperLink!', function () {
                me.aHref.focus();
            }, this.body);
            return;
        }
        this.viewport.execCommand(22 /* INSERT_LINK */, this.aHref.value, this.aText && this.aText.readOnly === false ? this.aText.value : null, this.aTarget.value);
        this.close();
    };
    UI_Dialog_InsertLink.prototype.on_cancel = function () {
        this.close();
    };
    return UI_Dialog_InsertLink;
})(UI_Dialog);
var UI_Dialog_EditLink = (function (_super) {
    __extends(UI_Dialog_EditLink, _super);
    function UI_Dialog_EditLink(config) {
        if (config === void 0) { config = {
            "caption": "Edit Link(s)",
            "width": 400,
            "height": 150,
            "minWidth": 400,
            "minHeight": 150,
            "closable": true,
            "modal": true,
            "buttons": [
                {
                    "name": "Ok",
                    "default": true,
                    "callback": function () {
                        this.on_ok();
                    }
                },
                {
                    "name": "Remove Link(s)",
                    "callback": function () {
                        this.on_remove_links();
                    }
                },
                {
                    "name": "Cancel",
                    "cancel": true,
                    "callback": function () {
                        this.on_cancel();
                    }
                }
            ],
            "innerHTML": UI_Resources.html_editLink
        }; }
        _super.call(this, config);
        this.aHref = this.body.querySelector('input.i-link');
        this.aTarget = this.body.querySelector('select.s-target');
    }
    /* Setup:
        $args[0]: <viewport>: Viewport
        $args[1]: <sText>   : string = null
        $args[2]: <sHref>   : string = null
        $args[3]: <sTarget> : string = null
     */
    UI_Dialog_EditLink.prototype.setup = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var viewport = args[0] || null, sText = String(args[1] || '') || null, sHref = String(args[2] || '') || null, sTarget = String(args[3] || '') || null;
        this.viewport = viewport;
        this.aHref.value = sHref || '';
        this.aTarget.value = sTarget || '';
        return this;
    };
    UI_Dialog_EditLink.prototype.on_remove_links = function () {
        this.close();
        this.viewport.execCommand(23 /* REMOVE_LINK */);
    };
    return UI_Dialog_EditLink;
})(UI_Dialog_InsertLink);
/// <reference path="Types.ts" />
/// <reference path="Events.ts" />
/// <reference path="Throttler.ts" />
/// <reference path="DOM.ts" />
/// <reference path="Helper.ts" />
