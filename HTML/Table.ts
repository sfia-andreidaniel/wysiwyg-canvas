class HTML_Table extends TNode_Element {
	
	public needCompile : boolean = true;
	public matrix      : HTML_Table_Matrix = null;

	public isMergeable : boolean = false;

	protected _cellPadding = 0;
	protected _cellSpacing = 0;
	protected _border      = 0;

	public    _xEdgesApplied: boolean = false;

	constructor() {
		super();
		this.nodeName = 'table';
		this.style.display('block');

		this.style.marginTop( '10' );

		( function(me) {

			me.style.on( 'changed', function( propertyName ) {
				if ( propertyName == 'borderColor' && me.documentElement ) {
					me.documentElement.changeThrottler.run();
				}
			} );

		} )(this);
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

	public removeChild( node: TNode ): TNode {

		var returnValue: TNode = super.removeChild( node );
		this.requestCompile();
		return returnValue;
	}

	public setAttribute( attributeName: string, attributeValue: string ) {
		switch ( attributeName ) {
			case 'border':
				this.border( ~~attributeValue );
				break;
			case 'bordercolor':
				this.style.borderColor( String( attributeValue || '' ) );
				break;
			case 'cellpadding':
				this.cellPadding( ~~attributeValue );
				break;
			case 'cellspacing':
				this.cellSpacing( ~~attributeValue );
				break;
			default:
				super.setAttribute( attributeName, attributeValue );
				break;
		}
	}

	// builds the table matrix, needed for initializing the
	// layout.
	public compile( force: boolean = false ) {

		if ( !this.needCompile && !force ) {
			return;
		}

		Helper.log( 'compiling table...' );

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
		
		if ( this.documentElement ) {

			/* Creates a table layout, based on compiled information.
			   This is a special layout, and is needed to display the cells of the table.
			 */
			
			this.compile();

			var returnValue: Layout_Block_Table = new Layout_Block_Table( this, this.matrix );

			return returnValue;
		} else {
			return null;
		}
	}

	public cellPadding( v: number = null ): number {
		if ( v === null ) {
			return this._cellPadding;
		} else {
			v = ~~v;
			if ( v < 0 ) v = 0;
			if ( this._cellPadding != v ) {
				this._cellPadding = v;
				if ( this.documentElement ) {
					this.documentElement.requestRelayout();
				}
			}
		}
	}

	public cellSpacing( v: number = null ): number {
		if ( v === null ) {
			return this._cellSpacing;
		} else {
			v = ~~v;
			if ( v < 0 ) v = 0;
			if ( this._cellSpacing != v ) {
				this._cellSpacing = v;
				if ( this.documentElement ) {
					this.documentElement.requestRelayout();
				}
			}
		}
	}

	public border( v: number = null ): number {
		if ( v === null ) {
			return this._border;
		} else {
			v = ~~v;
			if ( v < 0 ) v = 0;
			if ( this._border !== v ) {
				this._border = v;
				if ( this.documentElement ) {
					this.documentElement.requestRelayout();
				}
			}
		}
	}

	public xmlBeginning(): string {
		var attrs: string[] = [];

		if ( this._border )
			attrs.push('border="' + this._border + '"' );
		
		attrs.push('cellspacing="' + ~~(this._cellSpacing) + '"' );

		attrs.push('cellpadding="' + this._cellPadding + '"' );

		if ( this.style._borderColor.isSet )
			attrs.push( 'bordercolor="' + this.style.borderColor() + '"' );

		if ( this.style._width.isSet ) {
			attrs.push( 'width="' + this.style.width() + '"' );
		}

		return '<table' + ( attrs.length ? ' ' + attrs.join( ' ' ) : '' ) + '>';
	}

	public xmlEnding(): string {
		return '</table>';
	}

	public removeFromDOMAtUserCommand(): boolean {
		return false; // tables cannot be removed even if they are selected when the user press a removal key
	}

	// tables don't have tabstops
	public tabStop( value: number = null ): number {
		return 0;
	}

	/* Creates a virtual node with the cells that are included between the colStart and colEnd or are intersected with
	   the colStart and ColEnd
	 */
	public createVirtualColumnNode( colStart: number, colEnd: number, includeExact: boolean = false ): HTML_MultiRange_TableColumn {
		
		var i: number = 0,
		    j: number = 0,
		    len: number = 0,
		    lem: number = 0,
		    cell: HTML_TableCell,
		    out: HTML_MultiRange_TableColumn = new HTML_MultiRange_TableColumn( this.documentElement, this );

		console.warn( colStart, colEnd );

		for ( var i=0, len = this.childNodes.length; i<len; i++ ) {
			for ( j=0, lem = (<HTML_TableRow>this.childNodes[i]).childNodes.length; j<lem; j++ ) {

				cell = (<HTML_TableCell>(<HTML_TableRow>this.childNodes[i]).childNodes[j]);

				if ( includeExact ) {

					if ( colStart == cell.edgeLeft.index && colEnd == cell.edgeRight.index ) {
						out.appendChild( cell );
						break;
					}
				
				} else {

					if ( colStart <= cell.edgeLeft.index && colEnd >= cell.edgeRight.index ) {
						out.appendChild( cell );
						break;
					}

				}

			}
		}

		return out;
	}

	public createVirtualRowNode( rowStart: number, rowEnd: number, includeExact: boolean = false ): HTML_MultiRange_TableRow {

		var i: number = 0,
		    j: number = 0,
		    len: number = 0,
		    lem: number = 0,
		    cell: HTML_TableCell,
		    out: HTML_MultiRange_TableRow = new HTML_MultiRange_TableRow( this.documentElement, this );

		for ( var i=0, len = this.childNodes.length; i<len; i++ ) {
			for ( j=0, lem = (<HTML_TableRow>this.childNodes[i]).childNodes.length; j<lem; j++ ) {

				cell = (<HTML_TableCell>(<HTML_TableRow>this.childNodes[i]).childNodes[j]);

				if ( includeExact ) {

					if ( rowStart == cell.edgeTop.index && rowEnd == cell.edgeBottom.index ) {
						out.appendChild( cell );
					}
				
				} else {

					if ( rowStart <= cell.edgeTop.index && rowEnd >= cell.edgeBottom.index ) {
						out.appendChild( cell );
					}

				}

			}
		}

		return out;
	}

	public applyXEdges() {
		// save XEdges values
		var applyValues: number[] = [],
		    i: number = 0,
		    len: number = this.matrix.xEdges.edges.length,
		    row: number = 0,
		    col: number = 0,
		    sum: number = 0;

		for ( i=0; i<len; i++ ) {
			applyValues.push( this.matrix.xEdges.edges[i].scaledValue );
			sum += applyValues[i];
		}

		for ( row = 0; row < this.childNodes.length; row++ ) {
			for ( col = 0; col < (<HTML_TableRow>this.childNodes[ row ]).childNodes.length; col ++ ) {
				(<HTML_TableCell>(<HTML_TableRow>this.childNodes[ row ]).childNodes[ col ]).applyXEdges( applyValues );
			}
		}

		this.style.width( String( ~~( sum + ( ( this._border + this._cellPadding + this._cellSpacing ) * applyValues.length * 2 ) ) ) );

		this._xEdgesApplied = true;
	}

	public outerHTML( v: string = null ): string {
		if ( !this._xEdgesApplied ) {
			this.applyXEdges();
		}
		return super.outerHTML(v);
	}

	public getCellsForRow( rowMinIndex: number, rowMaxIndex: number ): HTML_TableCell[] {
		var i: number = 0,
		    j: number = 0,
		    len: number = 0,
		    lem: number = 0,
		    cell: HTML_TableCell,
		    out: HTML_TableCell[] = [];

		for ( var i=0, len = this.childNodes.length; i<len; i++ ) {
			for ( j=0, lem = (<HTML_TableRow>this.childNodes[i]).childNodes.length; j<lem; j++ ) {

				cell = (<HTML_TableCell>(<HTML_TableRow>this.childNodes[i]).childNodes[j]);

				if ( rowMinIndex <= cell.edgeTop.index && rowMaxIndex >= cell.edgeBottom.index ) {
					out.push( cell );
				}

			}
		}

		return out;

	}

	public getCellsForColumn( colMinIndex: number, colMaxIndex: number ): HTML_TableCell[] {
		
		var i: number = 0,
		    j: number = 0,
		    len: number = 0,
		    lem: number = 0,
		    cell: HTML_TableCell,
		    out: HTML_TableCell[] = [];

		for ( var i=0, len = this.childNodes.length; i<len; i++ ) {
			for ( j=0, lem = (<HTML_TableRow>this.childNodes[i]).childNodes.length; j<lem; j++ ) {

				cell = (<HTML_TableCell>(<HTML_TableRow>this.childNodes[i]).childNodes[j]);

				if ( colMinIndex <= cell.edgeLeft.index && colMaxIndex >= cell.edgeRight.index ) {
					out.push( cell );
					break;
				}

			}
		}

		return out;

	}

}