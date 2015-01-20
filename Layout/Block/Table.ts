class Layout_Block_Table extends Layout_Block {

	public children   : Layout[] = null;
	public layoutType : string   = 'table';

	constructor( element: TNode_Element, public matrix: HTML_Table_Matrix ) {
		
		super( element );
		
		this.node = element;
	
		this.children = [];

		for ( var i=0, len = this.matrix.cellsArray.length; i<len; i++ ) {

			this.children.push( this.matrix.cellsArray[i].createLayout( this ) );

		}

	}

	public computeWidths() {

		var i: number = 0,
		    len: number = 0,
		    borderWidth: number = this.node.style.borderWidth() || 1,
		    node: HTML_TableCell;

		this.offsetLeft += this.node.style.marginLeft();
		// the width of the table is allready computed

		// compute the column widths
		for ( i=0, len = this.matrix.cellsArray.length; i<len; i++ ) {

			if ( this.matrix.cellsArray[i].style._width.isSet )

				this.matrix.xEdges.setSize(
					this.matrix.cellsArray[i].edgeLeft.index,
					this.matrix.cellsArray[i].edgeRight.index,
					this.matrix.cellsArray[i].style.width()
				);

		}

		// resize the colums in order to fit this layout

		this.matrix.xEdges.resizeToFit( this.innerWidth - ( this.matrix.cols + 1 ) * borderWidth );

		this.matrix.xEdges.edges[0].indexStart = borderWidth;
		this.matrix.xEdges.edges[0].indexEnd = borderWidth + this.matrix.xEdges.edges[0].scaledValue;

		for ( i=1, len = this.matrix.xEdges.edges.length; i<len; i++ ) {
			this.matrix.xEdges.edges[i].indexStart = this.matrix.xEdges.edges[i-1].indexEnd + borderWidth;
			this.matrix.xEdges.edges[i].indexEnd   = this.matrix.xEdges.edges[i].indexStart + this.matrix.xEdges.edges[i].scaledValue;
		}

		// set the widths of the sub-layouts
		for ( var i=0, len = this.children.length; i<len; i++ ) {

			node = <HTML_TableCell>(this.children[i].node);

			this.children[i].offsetLeft = node.edgeLeft.indexStart + this.offsetLeft;
			this.children[i].offsetWidth= node.edgeRight.indexEnd - node.edgeLeft.indexStart;
			this.children[i].innerWidth = this.children[i].offsetWidth - node.style.paddingLeft() - node.style.paddingRight();
			this.children[i].innerLeft  = this.children[i].offsetLeft + node.style.paddingLeft();

			this.children[i].computeWidths();

		}

	}

	public computeHeights( topPlacement: number, indent: number = 0 ): number {

		this.offsetTop = topPlacement + this.node.style.marginTop();
		topPlacement += this.node.style.marginTop();
		this.innerTop = this.offsetTop + this.node.style.borderWidth() + this.node.style.paddingTop();
		topPlacement += ( this.node.style.borderWidth() + this.node.style.paddingTop() );

		this.innerHeight = 0;

		var i: number = 0,
		    len: number = 0,
		    borderWidth = this.node.style.borderWidth() || 1;

		this.offsetHeight = borderWidth + this.node.style.paddingTop() ;

		/* Compute the heights for all the sub-layouts, then hang them on
		   top position.
		   Set the line heights of the rows of the matrix
		 */

		for ( i=0, len = this.children.length; i<len; i++ ) {
			this.children[i].computeHeights( topPlacement );
			this.matrix.yEdges.setSize(
				(<HTML_TableCell>this.children[i].node).edgeTop.index,
				(<HTML_TableCell>this.children[i].node).edgeBottom.index,
				this.children[i].offsetHeight
			);
		}

		// compute the stops of the rows on the y axis
		this.matrix.yEdges.edges[0].indexStart = borderWidth;
		this.matrix.yEdges.edges[0].indexEnd = this.matrix.yEdges.edges[0].value + borderWidth;

		for ( i=1, len = this.matrix.yEdges.edges.length; i<len; i++ ) {
			this.matrix.yEdges.edges[i].indexStart = this.matrix.yEdges.edges[i-1].indexEnd + borderWidth;
			this.matrix.yEdges.edges[i].indexEnd   = this.matrix.yEdges.edges[i].indexStart + this.matrix.yEdges.edges[i].scaledValue;
		}

		for ( i=0, len = this.children.length; i<len; i++ ) {
			this.children[i].increaseYBy( (<HTML_TableCell>this.children[i].node).edgeTop.indexStart );
			this.children[i].increaseHeightBy( ( (<HTML_TableCell>this.children[i].node).edgeBottom.indexEnd - (<HTML_TableCell>this.children[i].node).edgeTop.indexStart ) - this.children[i].offsetHeight )
		}

		this.innerHeight = this.matrix.yEdges.edges[ this.matrix.yEdges.edges.length - 1 ].indexEnd;
		this.offsetHeight += this.innerHeight;
		topPlacement += this.innerHeight;
		this.offsetHeight += ( this.node.style.paddingBottom() + borderWidth );
		topPlacement += ( this.node.style.paddingBottom() + borderWidth );

		topPlacement += this.node.style.marginBottom();

		return topPlacement + 4;

	}


}