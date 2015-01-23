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

interface TPoint {
	x: number;
	y: number;
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