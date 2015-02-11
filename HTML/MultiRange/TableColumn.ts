class HTML_MultiRange_TableColumn extends HTML_MultiRange {
	
	constructor( document: HTML_Body, parentNode: TNode_Element ) {
		super( document, parentNode, 'table-column' );
		
		( function( me ) {

			me.style.on( 'changed', function( propertyName: string ) {
				if ( propertyName == 'width' ) {
					me.setWidth( me.style.width() );
				}
			} );

		})( this );
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

	get layout(): Layout {

		if ( this.childNodes.length ){
			return (<TNode_Element>this.childNodes[0]).layout;
		} else {
			return this.parentNode.layout;
		}
	}

	set layout( l: Layout ) {
		// nothing
	}

	public setWidth( value: number ) {
	
		if ( !this.childNodes.length ) {
			return;
		}

		var cell = <HTML_TableCell>this.childNodes[0],
		    lEdgeIndex: number = cell.edgeLeft.index,
		    rEdgeIndex: number = cell.edgeRight.index,
		    i: number = 0,
		    len: number = 0,
		    affectedEdges: HTML_Table_Edge[] = [],
		    table: HTML_Table = cell.ownerTable,
		    actualEdgesWidthSum: number = 0,
		    delta: number = 0,
		    leftNeighbour: HTML_Table_Edge,
		    rightNeighbour: HTML_Table_Edge;

		for ( i=lEdgeIndex; i<=rEdgeIndex; i++ ) {
			affectedEdges.push( table.matrix.xEdges.edges[i] );
			actualEdgesWidthSum += table.matrix.xEdges.edges[i].scaledValue;
		}

		leftNeighbour = lEdgeIndex == 0
			? null
			: table.matrix.xEdges.edges[ lEdgeIndex - 1 ];

		rightNeighbour = rEdgeIndex == table.matrix.xEdges.edges.length - 1
			? null
			: table.matrix.xEdges.edges[ rEdgeIndex + 1 ];

		actualEdgesWidthSum += 2 * cell.style.paddingLeft() + cell.style.marginLeft() + cell.style.marginRight() + 2 * cell.style.borderWidth();

		delta = value - actualEdgesWidthSum;

		if ( delta < 0 ) {
			// decrease column width
			switch ( this.resizerHint ) {
				case TResizer.W: // resizing occured on the left edge
					// increse leftNeighbour with delta
					// decrease first affected edge with delta

					if ( leftNeighbour )
						leftNeighbour.scaledValue -= delta;

					affectedEdges[0].scaledValue += delta;

					break;

				case TResizer.E: // resizing occured on the right edge
					// increase rightNeighbour with delta
					// decrease last affected edge with delta

					if ( rightNeighbour )
						rightNeighbour.scaledValue -= delta;
					
					affectedEdges[ affectedEdges.length - 1 ].scaledValue += delta;

					break;
			}
		} else {
			// increase column width
			switch ( this.resizerHint ) {
				case TResizer.W:
					// decrease leftNeighbour with delta
					// increase first affected Edge with delta

					if ( leftNeighbour )
						leftNeighbour.scaledValue -= delta;

					affectedEdges[0].scaledValue += delta;

					break;
				case TResizer.E:
					// decrease rightNeigbour with delta
					// decrease last affected Edge with delta

					if ( rightNeighbour )
						rightNeighbour.scaledValue -= delta;

					affectedEdges[ affectedEdges.length - 1 ].scaledValue += delta;

					break;
			}
		}

		table.applyXEdges();

	}

}