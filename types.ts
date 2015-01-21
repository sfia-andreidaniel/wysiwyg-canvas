enum TNode_Type {
	UNKNOWN,
	TEXT,
	ELEMENT
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