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

interface TTarget {
	layout   : Layout;
	relative : TPoint;
	absolute : TPoint;
	target   : TNode;

	line?: number;
	charLineIndex?: number; // character index on the line
	charTargetIndex?: number;
}