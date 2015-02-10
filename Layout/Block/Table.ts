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

	public computeWidths( offsetLeftComputed: boolean = false ) {

		var i: number = 0,
		    len: number = 0,
		    table: HTML_Table = <HTML_Table>this.node,
		    node: HTML_TableCell,
		    totalCellsInnerWidths: number = 0,

		    borderWidth: number = table.border() || 1,
		    cellSpacing: number = table.cellSpacing(),
		    cellPadding: number = table.cellPadding();

		this.offsetLeft += table.style.marginLeft();
		this.innerLeft = this.offsetLeft + table.style.borderWidth() + table.style.paddingLeft();

		this.matrix.xEdges.resetSizes();

		// compute the column widths
		for ( i=0, len = this.matrix.cellsArray.length; i<len; i++ ) {

			if ( this.matrix.cellsArray[i].style._width.isSet )

				this.matrix.xEdges.setSize(
					this.matrix.cellsArray[i].edgeLeft.index,
					this.matrix.cellsArray[i].edgeRight.index,
					this.matrix.cellsArray[i].style.width()
				);

		}

		this.matrix.xEdges.applySizes();

		totalCellsInnerWidths = this.innerWidth - ( ( this.matrix.cols + 1 ) * cellSpacing ) - ( this.matrix.cols * 2 * ( cellPadding + borderWidth ) ) ;

		//console.warn( 'totalCellsInnerWidths: ' + this.innerWidth + '- (( ' + this.matrix.cols + ' + 1 ) * ' + cellSpacing + ') - ( ' + this.matrix.cols + ' * 2 * (' + cellPadding + '+' + borderWidth + ') ) = ' + totalCellsInnerWidths );

		// resize the colums in order to fit this layout
		this.matrix.xEdges.resizeToFit( totalCellsInnerWidths, borderWidth, cellPadding, cellSpacing, this.innerLeft );

		// set the widths of the sub-layouts
		for ( var i=0, len = this.children.length; i<len; i++ ) {

			node = <HTML_TableCell>(this.children[i].node);

			this.children[i].offsetLeft = node.edgeLeft.offsetIndexStart;
			this.children[i].offsetWidth= node.edgeRight.offsetIndexEnd - node.edgeLeft.offsetIndexStart;
			
			this.children[i].innerWidth = this.children[i].offsetWidth - 2 * cellPadding - 2 * borderWidth;
			this.children[i].innerLeft  = this.children[i].offsetLeft + cellPadding + borderWidth;

			this.children[i].computeWidths();

		}

	}

	public computeHeights( topPlacement: number, indent: number = 0 ): number {

		var i: number = 0,
		    len: number = 0,
		    
		    table: HTML_Table = <HTML_Table>this.node,
		    borderWidth = table.border() || 1,
		    cellSpacing = table.cellSpacing(),
		    cellPadding = table.cellPadding();


		topPlacement += table.style.marginTop();
		this.offsetTop = topPlacement;

		topPlacement += ( this.offsetHeight = ( table.style.borderWidth() + this.node.style.paddingTop() ) );

		this.innerTop = topPlacement;

		this.innerHeight = 0;

		/* Compute the heights for all the sub-layouts, then hang them on
		   top position.
		   Set the line heights of the rows of the matrix
		 */

		this.matrix.yEdges.resetSizes();

		for ( i=0, len = this.children.length; i<len; i++ ) {
			
			this.children[i].computeHeights( topPlacement );
			
			this.matrix.yEdges.setSize(
				(<HTML_TableCell>this.children[i].node).edgeTop.index,
				(<HTML_TableCell>this.children[i].node).edgeBottom.index,
				this.children[i].offsetHeight - 2 * cellPadding
			);
		
		}

		this.matrix.yEdges.applySizes();

		this.matrix.yEdges.resizeToFit( null, borderWidth, cellPadding, cellSpacing, -cellSpacing );

		for ( i=0, len = this.children.length; i<len; i++ ) {

			this.children[i].increaseYBy( (<HTML_TableCell>this.children[i].node).edgeTop.offsetIndexStart );

			this.children[i].increaseHeightBy( 
				( (<HTML_TableCell>this.children[i].node).edgeBottom.offsetIndexEnd - (<HTML_TableCell>this.children[i].node).edgeTop.offsetIndexStart )
				- 
				this.children[i].offsetHeight
			);

		}

		if ( this.matrix.yEdges.edges.length ) {

			this.innerHeight = this.matrix.yEdges.edges[ this.matrix.yEdges.edges.length - 1 ].offsetIndexEnd;
			topPlacement += this.innerHeight;
			this.offsetHeight += this.innerHeight;

		}

		this.offsetHeight += ( this.node.style.paddingBottom() + table.style.borderWidth() + 2 * cellSpacing );
		topPlacement += ( this.node.style.paddingBottom() + table.style.borderWidth() + 2 * cellSpacing );

		topPlacement += this.node.style.marginBottom();

		return topPlacement;

	}


}