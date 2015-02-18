class HTML_MultiRange_TableRect extends HTML_MultiRange {
	
	public anchor: HTML_TableCell = null;
	public focus:  HTML_TableCell = null;

	constructor( document: HTML_Body, parentNode: TNode_Element ) {
		super( document, parentNode, 'table-selection' );
	}

	public appendChild( node: TNode, index: number = null ): TNode {

		var iNode: TNode,
			i: number = 0,
		    len: number = 0,
		    foundIndex: number = null;
		

		if ( !( node.is() == 'td' ) ) {

			if ( node.is() == 'tr' ) {

				for ( i=0, len = ( <TNode_Element>node ).childNodes.length; i<len; i++ ) {
					this.appendChild( (<TNode_Element>node).childNodes[i] );
				}

				return node;

			} else {

				if ( !( node.ownerBlockElement().is() == 'td' ) ) {
					throw "Node not acceptable."
				} else {
					iNode = node.ownerBlockElement();
				}

			}

		} else {
			iNode = node;
		}

		for ( i=0, len = this.childNodes.length; i<len; i++ ) {
			if ( this.childNodes[i] == iNode ) {
				return iNode;
			}
		}

		this.childNodes.push( iNode );
		this.sortNodes();
		
		return node;

	}

	public anchorTo( cell: HTML_TableCell ): HTML_MultiRange_TableRect {
		this.anchor = cell;
		this.focus  = cell;
		this.childNodes = [ cell ];
		return this;
	}

	public focusTo( cell: HTML_TableCell ) {
		
		if ( cell.ownerTable != this.parentNode ) {
			// TODO: Search if the cell is a child of a cell of this ownerTable.
			return;
		}

		var edgeLeft : number = Math.min( this.anchor.edgeLeft.index, cell.edgeLeft.index ),
		    edgeRight: number = Math.max( this.anchor.edgeRight.index, cell.edgeRight.index ),
		    edgeTop  : number = Math.min( this.anchor.edgeTop.index, cell.edgeTop.index ),
		    edgeBottom:number = Math.max( this.anchor.edgeBottom.index, cell.edgeBottom.index ),
		    row      : number = 0,
		    rows     : number = 0,
		    col      : number = 0,
		    cols     : number = 0,
		    c        : HTML_TableCell;

		this.childNodes = [];

		for ( row = 0, rows = this.parentNode.childNodes.length; row<rows; row++ ) {
			for ( col = 0, cols = (<HTML_TableRow>this.parentNode.childNodes[row]).childNodes.length; col < cols; col++ ) {
				c = (<HTML_TableCell>(<HTML_TableRow>this.parentNode.childNodes[row]).childNodes[col]);
				if ( c.edgeLeft.index >= edgeLeft && c.edgeRight.index <= edgeRight && c.edgeTop.index >= edgeTop && c.edgeBottom.index <= edgeBottom ) {
					this.childNodes.push( c );
				}
			}
		}

		this.sortNodes();

		this.anchor.documentElement.viewport.selection.getRange().fire( 'changed' );

		this.focus = cell;
	}

	public acceptNode( node: TNode ): HTML_TableCell {
		var cursor = node;
		while ( cursor ) {
			if ( cursor.is() == 'td' && cursor.parentNode.parentNode == this.parentNode ) {
				return <HTML_TableCell>cursor;
			}
			cursor = cursor.parentNode;
		}
		return null;
	}

	public mergeCells() {

		var affectedRows: HTML_TableRow[] = [],
		    i: number = 0,
		    len: number = this.childNodes.length,
		    cellTopLeft: HTML_TableCell = null,
		    c: HTML_TableCell,

		    minEdgeTop: number = null,
		    minEdgeLeft: number = null,
		    maxEdgeRight: number = null,
		    maxEdgeBottom: number = null,

		    finalColSpan: number = null,
		    finalRowSpan: number = null;

		if ( len < 2 ) {
			return;
		}

		for ( i=0; i<len; i++ ) {
			c = (<HTML_TableCell>this.childNodes[i]);
			
			if ( cellTopLeft === null ) {
				cellTopLeft = c;
			} else {
				if ( cellTopLeft.edgeLeft.index >= c.edgeLeft.index && cellTopLeft.edgeTop.index >= c.edgeTop.index ) {
					cellTopLeft = c;
				}
			}

			if ( minEdgeTop === null ) {
				minEdgeTop = c.edgeTop.index;
				minEdgeLeft = c.edgeLeft.index;
				maxEdgeRight = c.edgeRight.index;
				maxEdgeBottom = c.edgeBottom.index;
			} else {
				minEdgeTop = Math.min( c.edgeTop.index, minEdgeTop );
				minEdgeLeft = Math.min( c.edgeLeft.index, minEdgeLeft );
				maxEdgeRight = Math.max( c.edgeRight.index, maxEdgeRight );
				maxEdgeBottom = Math.max( c.edgeBottom.index, maxEdgeBottom );
			}

			if ( affectedRows.indexOf( <HTML_TableRow>c.parentNode ) == -1 ) {
				affectedRows.push( <HTML_TableRow>c.parentNode );
			}

		}

		finalColSpan = maxEdgeRight - minEdgeLeft + 1;
		finalRowSpan = maxEdgeBottom - minEdgeTop + 1;

		// grab the contents of the cells and put it in the
		// cellTopLeft cell

		for ( i=0; i<len; i++ ) {
			
			c = (<HTML_TableCell>this.childNodes[i]);
			
			if ( c == cellTopLeft )
				continue;
			
			if ( c.childNodes.length ) {
				
				if ( c.childNodes[0].is() == '#text' ) {
					cellTopLeft.appendChild( cellTopLeft.documentElement.createElement( 'br' ) );
				}
				
				cellTopLeft.appendCollection( new TNode_Collection( c.childNodes ) );
			}

			c.remove();
		}

		cellTopLeft.colSpan( finalColSpan );
		cellTopLeft.rowSpan( finalRowSpan );

		for ( i=0, len = affectedRows.length; i<len; i++ ) {
			if ( affectedRows[i].childNodes.length == 0 ) {
				affectedRows[i].remove();
			}
		}

		this.focus = cellTopLeft;
		this.anchor = cellTopLeft;

		this.childNodes = [ cellTopLeft ];

		cellTopLeft.ownerTable.compile( true );

		this.anchor.documentElement.viewport.selection.getRange().fire( 'changed' );
		this.anchor.documentElement.viewport.selection.editorState.fire( 'changed', [ 'cell', 'table' ] );

		// recompute document state

	}

	public serialize(): MultiRangeSerializedData {
		var out: MultiRangeSerializedData = super.serialize();

		out.type = 'table-rect';

		if ( this.focus ) {
			out.focus = this.focus.FRAGMENT_START;
		} else {
			out.focus = null;
		}

		if ( this.anchor ) {
			out.anchor = this.anchor.FRAGMENT_START;
		} else {
			out.anchor = null;
		}

		return out;

	}

}