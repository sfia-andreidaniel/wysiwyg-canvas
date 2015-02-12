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

}