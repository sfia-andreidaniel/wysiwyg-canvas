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
	
	INSERT_TEXT,
	DELETE_TEXT,
	
	NEW_LINE,
	
	MOVE, // move cursor

	BOLD,
	ITALIC,
	UNDERLINE,

	ALIGN,

	COPY,
	CUT,
	PASTE,

	INDENT,
	UNINDENT,

	VALIGN, // vertical align

	FONT,
	COLOR,
	SIZE

}

interface EditorState {
	bold          : boolean;
	italic        : boolean;
	underline     : boolean;

	textAlign     : string;
	fontFamily    : string;
	fontSize      : number;
	fontColor     : string;
	verticalAlign : string;
}