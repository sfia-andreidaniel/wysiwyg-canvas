class HTML_Table extends TNode_Element {
	
	public needCompile : boolean = true;
	public matrix      : HTML_Table_Matrix = null;

	constructor() {
		super();
		this.nodeName = 'table';
		this.style.display('block');
	}

	public requestCompile() {
		
		this.needCompile = true;

		// request a relayout of the document
		if ( this.documentElement ) {
			this.documentElement.requestRelayout();
		}

	}

	// ignore other elements other than table row
	public appendChild( node: TNode, index: number = null ): TNode {
		
		var returnValue: HTML_TableRow;
		
		if ( node.nodeType == TNode_Type.ELEMENT && (<TNode_Element>node).nodeName == 'tr' ) {
			
			returnValue = <HTML_TableRow>( super.appendChild( node, index ) );
			returnValue.ownerTable = this;

			this.requestCompile();

			return returnValue;
		} else {
			//silently discard errors
			return node;
		}
	}

	public setAttribute( attributeName: string, attributeValue: string ) {
		switch ( attributeName ) {
			case 'border':
				this.style.borderWidth( String( attributeValue || '' ) );
				break;
			case 'bordercolor':
				this.style.borderColor( String( attributeValue || '' ) );
				break;
			default:
				super.setAttribute( attributeName, attributeValue );
				break;
		}
	}

	// builds the table matrix, needed for initializing the
	// layout.
	public compile() {

		if ( !this.needCompile ) {
			return;
		}

		console.log( 'compiling table...' );

		var cellIndex = 0,
		    i: number = 0,
		    j: number = 0,
		    k: number = 0,
		    n: number = 0,
		    o: number = 0,
		    p: number = 0,
		    cell: HTML_TableCell,
		    cells: HTML_TableCell[] = [],
		    matrix: HTML_Table_Matrix = new HTML_Table_Matrix( cells );

		this.matrix = matrix;

		for ( i=0, n = this.childNodes.length; i<n; i++ ) {
			for ( j=0, o = ( <HTML_TableRow>this.childNodes[i] ).childNodes.length; j<o; j++ ) {
				
				( cell = <HTML_TableCell>( <HTML_TableRow>this.childNodes[i] ).childNodes[j] ).tableIndex = cellIndex++;
				
				cell.edgeLeft   = null;
				cell.edgeRight  = null;
				cell.edgeTop    = null;
				cell.edgeBottom = null;

				cell.rowIndex = j;
				cells.push( cell );

				matrix.writeAt( i, cell.tableIndex, cell.colSpan(), cell.rowSpan() );

			}
		}

		matrix.compute();

		this.needCompile = false;

	}

	public createLayout( useParentLayout: Layout = null ): Layout {
		/* Creates a table layout, based on compiled information.
		   This is a special layout, and is needed to display the cells of the table.
		 */
		
		this.compile();

		return new Layout_Block_Table( this, this.matrix );
	}
}