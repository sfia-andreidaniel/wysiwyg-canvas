enum TNode_Type {
	UNKNOWN,
	TEXT,
	ELEMENT
}

enum FragmentItem {
	NODE_START,
	NODE_END,
	EOL,
	CHARACTER,
	WHITE_SPACE
}

// used in Fragment_Contextual_Item as type
enum FragmentCItem {
	NODE_START,
	NODE_END,
	TEXT
}

interface TPoint {
	x: number;
	y: number;
}

interface TRect {
	x: number;
	y: number;
	width: number;
	height: number;
	visible?: boolean;
}

enum TRange_Type {
	TEXT,
	ELEMENT
}

enum FragmentPos {
	DOC_BEGIN,
	DOC_END
}

enum KbEventSource {
	CANVAS,
	PASTE_ADAPTER
}

enum CaretPos {
	LINE_HORIZONTAL,
	LINE_VERTICAL,
	CHARACTER,
	WORD,
	VIEWPORT
}

enum EditorCommand {
	
	INSERT_TEXT,	//writes plain text at cursor
	DELETE_TEXT,	//deletes text (-1 || 1 chars)
	
	NEW_LINE,		// creates a new line using BR or P, etc
	
	MOVE, 			// move cursor

	BOLD,
	ITALIC,
	UNDERLINE,
	STRIKE,

	ALIGN,			// set text align
	CLEAR_FORMATTING, // obvious :)

	COPY,
	CUT,
	PASTE,

	INDENT,			
	UNINDENT,

	VALIGN, 		// vertical align (sup, sub, normal)

	FONT,			// sets the font of the text
	COLOR,			// sets the color of the text
	BGCOLOR,		// sets the background color (to do: on the text) of the selected blocks
	SIZE,			// sets the font size

	BLOCK_LEVEL,	// sets the block level of the elements ( normal, h1, h2, h3, h4, h5, and h6 )
	LIST,  			// sets the list level of the elements ( UL or LI )

	INSERT_LINK,
	REMOVE_LINK

}

interface EditorState {
	bold          : boolean;
	italic        : boolean;
	underline     : boolean;
	strike        : boolean;

	textAlign     : string;
	fontFamily    : string;
	fontSize      : number;
	fontColor     : string;
	verticalAlign : string;

	blockLevel    : string; // "normal" for "p", "li", "td", and "h1 ... h6" for headings.
	listType      : string; // eihter "ul", "ol", null, or undefined.
}

interface TNameValuePair {
	name: string;
	value: string;
}

enum TNewLinePolicy {
	BR,
	SURGERY
};

enum TSurgeryHint {
	NONE,
	LEFT,
	RIGHT
}

enum TListBreakResult {
	NONE_BEFORE, // could not break the list before
	NONE_AFTER,  // could not break the list after
	AFTER,       // created a list after this list
	BEFORE       // created a list before this list
}

interface TextRemoval {
	node: TNode_Text;
	start: number;
	stop: number;
}

enum CaretLockDirection {
	FROM_BEGINNING_OF_DOCUMENT,
	FROM_ENDING_OF_DOCUMENT
}

interface TargetDetails {
	paintAbsolute: TPoint;
	paintRelative: TPoint;
	lineIndex: number;
	charIndex: number;
}

interface TInsertionPoint {
	element: TNode_Element;
	index: number;
}

enum TResizer {
	NW,
	NE,
	SW,
	SE,
	N,
	S,
	W,
	E,
	NONE
}

enum TClipboardEffect {
	COPY,
	CUT
};

interface TClipboardItem {
	data: string;
	type: string;
}

interface UI_DialogButtonConfig {
	name: string;
	callback: () => void;
	default?: boolean;
	cancel?: boolean;
}

interface UI_DialogConfig {

	x?: number;
	y?: number;

	width?: number;
	height?: number;
	
	caption?: string;

	childOf?: any;
	
	closable?: boolean;
	resizable?: boolean;

	minWidth?: number;
	minHeight?: number;

	modal?: boolean;

	innerHTML?: string;

	buttons?: UI_DialogButtonConfig[];
}

interface TEditorInputConfig {
	width?     : number;
	height?    : number;
	toolbars?  : boolean;
	statusbar? : boolean;
	resizable? : boolean;
	readOnly?  : boolean;
	disabled?  : boolean;
}

enum FSItem {
	FILE,
	FOLDER
}

enum FS_Navigator_Status {
	LOADED,
	LOADING,
	ERROR
}

interface FS_Entry {
	
	name   : string;
	type   : FSItem;
	mime   : string;
	
	url?   : string;
	size?  : number;
	thumb? : string;

}