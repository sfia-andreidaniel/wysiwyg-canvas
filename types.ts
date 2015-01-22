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