class HTML_TableCell extends TNode_Element {
	
	public tableIndex                : number          = 0; // the index of the cell in it's table
	public rowIndex                  : number          = 0; // the index of the cell in it's row

	protected _colSpan               : number          = 1;
	protected _rowSpan               : number          = 1;

	public edgeLeft                  : HTML_Table_Edge = null;
	public edgeRight                 : HTML_Table_Edge = null;
	public edgeTop                   : HTML_Table_Edge = null;
	public edgeBottom                : HTML_Table_Edge = null;

	public isSelectable              : boolean         = true;
	public isResizable               : boolean         = true;

	public isBlockTextNode           : boolean         = true;

	public insertLinePolicy          : TNewLinePolicy  = TNewLinePolicy.BR;
	public alternateInsertLinePolicy : TNewLinePolicy  = TNewLinePolicy.BR;

	public isMergeable               : boolean = false;

	constructor() {
		super( true );
		this.style = new TStyle_TableCell( this );

		this.nodeName = 'td';
		this.style.display('block');

		TStyle_Browser_Calculator.applyDefaultStyles( this, 'td', [
			'fontSize',
			'fontWeight',
			'paddingTop',
			'paddingBottom',
			'paddingLeft',
			'paddingRight',
			'fontFamily',
			'fontWeight'
		] );


		this.style.padding( '5' );
	}

	public colSpan( value: number = null ): number {
		if ( value === null ) {
		
			return this._colSpan;
		
		} else {
		
			value = ~~value;

			if ( value < 1 ) {
				value = 1;
			}
			
			this._colSpan = value;

			if ( this.ownerTable )
				this.ownerTable.requestCompile();

			return this._colSpan;
		}
	}

	public rowSpan( value: number = null ): number {
		if ( value === null ) {
		
			return this._rowSpan;
		
		} else {
			
			value = ~~value;

			if ( value < 1 ) {
				value = 1;
			}

			this._rowSpan = value;

			if ( this.ownerTable )
				this.ownerTable.requestCompile();

			return this._rowSpan;
		}
	}

	public setAttribute( attributeName: string, attributeValue: string ) {

		switch ( attributeName ) {
			case 'colspan':
				this.colSpan( ~~attributeValue );
				break;
			case 'rowspan':
				this.rowSpan( ~~attributeValue );
				break;
			default:
				super.setAttribute( attributeName, attributeValue );
				break;
		}

	}

	public removeFromDOMAtUserCommand(): boolean {
		this.removeAllChildNodes();
		return true;
	}

	// a table cell cannot become other element type.
	public becomeElement( elementName: string ): TNode_Element {
		return this;
	}

	// table cells don't have tabstops
	public tabStop( value: number = null ): number {
		return 0;
	}

	public isTheFirstCell(): boolean {
		if ( this.parentNode ) {
			return !!this.parentNode.previousSibling() == false && !!this.previousSibling() == false;
		} else {
			return false;
		}
	}

	public isTheLastCell(): boolean {
		if ( this.parentNode ) {
			return !!this.parentNode.nextSibling() == false && !!this.nextSibling() == false;
		} else {
			return false;
		}
	}

	public onmousemove( point: TPoint, button: number, driver: Viewport_MouseDriver ): boolean {
		
		if ( button == 0 ) {

			var resizer: TResizer = this.getResizerTypeAtMousePoint( point );

			switch ( resizer ) {

				case TResizer.N:
					if ( this.edgeTop.index == 0 ) {
						driver.viewport.canvas.style.cursor = 'url(' + UI_Resources.gif_cursorColSelect + ') 6 17, auto';
						return true;
					} else {
						return false;
					}
					break;

				case TResizer.W:
					if ( this.edgeLeft.index == 0 ) {
						driver.viewport.canvas.style.cursor = 'url(' + UI_Resources.gif_cursorRowSelect + ') 17 6, auto';
						return true;
						break;
					}

				case TResizer.E:
					driver.viewport.canvas.style.cursor = 'col-resize';
					return true;
					break;

				default:
					return false;
					break;
			}

		}

		return false;
	}

	public onmousedown( point: TPoint, button: number, driver: Viewport_MouseDriver ): boolean {
		
		if ( button == 1 ) {

			var resizer: TResizer = this.getResizerTypeAtMousePoint( point );

			switch ( resizer ) {

				case TResizer.N:
					if ( this.edgeTop.index == 0 ) {
						// Select all the columns affected by the row
						this.documentElement.viewport.selection.anchorTo(
							new TRange_Target(
								this.ownerTable.createVirtualColumnNode(
									this.edgeLeft.index,
									this.edgeRight.index,
									false
								), 0
							)
						);
						return true;
					} else {
						return false;
					}
					break;

				case TResizer.W:
					if ( this.edgeLeft.index == 0 ) {

						this.documentElement.viewport.selection.anchorTo(
							new TRange_Target(
								this.ownerTable.createVirtualRowNode(
									this.edgeTop.index,
									this.edgeBottom.index,
									false
								), 0
							)
						);
						return true;
						break;
					}
				case TResizer.E:
					driver.lockTargetForResizing( 
						this.ownerTable.createVirtualColumnNode(
							this.edgeLeft.index,
							this.edgeRight.index,
							true
						),
						resizer,
						point
					);
					return true;
					break;
			}

		}

		return false;
	}

	public applyXEdges( edges: number[] ) {
		var sum: number = 0,
		      i: number = 0;
		
		for ( i = this.edgeLeft.index; i<= this.edgeRight.index; i++ ) {
			sum += edges[i];
		}

		this.style.width( String( sum ) );

	}

	public xmlAttributes(): string {
		var out: string[] = [ super.xmlAttributes() ];
		
		if ( this.style._width.isSet )
			out.push( 'width="' + Math.round( this.style.width() ) + '"' );
		
		if ( this._colSpan > 1 )
			out.push( 'colspan="' + this._colSpan + '"' );

		if ( this._rowSpan > 1 )
			out.push( 'rowspan="' + this._rowSpan + '"' );

		return out.join( ' ' );

	}

	public xmlBeginning(): string {
		var attrs: string = this.xmlAttributes();
		return '<td' + ( attrs ? ' ' + attrs : '' ) + '>';
	}

	public xmlEnding(): string {
		return '</td>';
	}

	public createMultiRangeAnchorNode(): HTML_MultiRange_TableRect {
		var anchor = new HTML_MultiRange_TableRect( this.documentElement, this.ownerTable );
		anchor.anchorTo( this );
		return anchor;
	}


	/* On the cell, the removeOrphan nodes it is canceled, because the cell
	   can be orphan
	 */
	public removeOrphanNodes() {
		// void, intentionally.
	}

	/* Inserts a column in the ownerTable of the cell.
	   If @before is true, the column will be inserted before
	   this cell, otherwise the column will be inserted after this cell.
	 */
	public insertColumn( before: boolean = true ) {

		this.ownerTable._xEdgesApplied = false;

		var table: HTML_Table = this.ownerTable,
		    leftIndex: number = this.edgeLeft.index,
		    rightIndex: number = this.edgeRight.index,
		    col  : HTML_TableCell[] = table.getCellsForColumn( leftIndex, rightIndex ),
		    indexes: number[][] = [],
		    i: number = 0,
		    len: number = 0,
		    cell: HTML_TableCell;

		for ( i=0, len = col.length; i<len; i++ ) {
			indexes.push( [ col[i].edgeLeft.index, col[i].edgeRight.index ] );
		}

		for ( i=0, len = col.length; i<len; i++ ) {

			if ( before ) {

				// if the cell @i leftIndex is lower than this cell left
				// index, we increase it's colspan, otherwise we insert a cell...

				// the cell should have the same rowspan as the cell @ i.

				if ( indexes[i][0] < leftIndex ) {

					col[i].colSpan( col[i].colSpan() + 1 );

				} else {

					cell = <HTML_TableCell>this.documentElement.createElement( 'td' );
					cell.ownerTable = this.ownerTable;
					cell.rowSpan( col[i].rowSpan() );
					col[i].parentNode.appendChild( cell, col[i].siblingIndex );

				}

			} else {

				if ( indexes[i][1] > rightIndex ) {
					col[i].colSpan( col[i].colSpan() + 1 );
				} else {
					cell = <HTML_TableCell>this.documentElement.createElement( 'td' );
					cell.ownerTable = this.ownerTable;
					cell.rowSpan( col[i].rowSpan() );
					col[i].parentNode.appendChild( cell, col[i].siblingIndex + 1 );
				}

			}

		}
	}

	/* Inserts a row in the table populated with cells.
	   It attempts to keep the same layout of the current visual row
	   of the cell */

	public insertRow( before: boolean = true ) {

		this.ownerTable._xEdgesApplied = false;

		var table: HTML_Table = this.ownerTable,
		    topIndex: number = this.edgeTop.index,
		    bottomIndex: number = this.edgeBottom.index,
		    col  : HTML_TableCell[] = table.getCellsForRow( topIndex, bottomIndex ),
		    row  : HTML_TableCell[] = [],
		    tr   : HTML_TableRow,
		    indexes: number[][] = [],
		    i: number = 0,
		    len: number = 0,
		    cell: HTML_TableCell;

		for ( i=0, len = col.length; i<len; i++ ) {
			indexes.push( [ col[i].edgeTop.index, col[i].edgeBottom.index ] );
		}

		for ( i=0, len = col.length; i<len; i++ ) {

			if ( before ) {

				if ( indexes[i][0] < topIndex ) {

					col[i].rowSpan( col[i].rowSpan() + 1 );

				} else {

					cell = <HTML_TableCell>this.documentElement.createElement( 'td' );
					cell.ownerTable = this.ownerTable;
					cell.colSpan( col[i].colSpan() );
					row.push( cell );

				}

			} else {

				if ( indexes[i][1] > bottomIndex ) {
					col[i].rowSpan( col[i].rowSpan() + 1 );
				} else {
					cell = <HTML_TableCell>this.documentElement.createElement( 'td' );
					cell.ownerTable = this.ownerTable;
					cell.colSpan( col[i].colSpan() );
					row.push( cell );
				}

			}

		}

		if ( row.length ) {
			tr = <HTML_TableRow>this.documentElement.createElement( 'tr' );
			tr.ownerTable = this.ownerTable;
			
			for ( i=0, len = row.length; i<len; i++ ) {
				tr.appendChild( row[i] );
			}

			if ( before ) {
				this.ownerTable.appendChild( tr, this.parentNode.siblingIndex );
			} else {
				this.ownerTable.appendChild( tr, this.parentNode.siblingIndex + 1 );
			}
		}

	}

	/* Deletes the visual column of the cell */

	public deleteColumn() {

		this.ownerTable._xEdgesApplied = false;

		var table: HTML_Table = this.ownerTable,
		    leftIndex: number = this.edgeLeft.index,
		    rightIndex: number = this.edgeRight.index,
		    col  : HTML_TableCell[] = table.getCellsForColumn( leftIndex, rightIndex ),
		    rows : HTML_TableRow[] = [],
		    i: number = 0,
		    len: number = 0,
		    indexes: number[][] = [],
		    thisColspan: number = this.colSpan(),
		    removedCells: HTML_TableCell[] = [],
		    selection = this.documentElement.viewport.selection,
		    rng       = selection.getRange();

		for ( i=0, len = this.ownerTable.childNodes.length; i<len; i++ ) {
			rows.push( <HTML_TableRow>this.ownerTable.childNodes[i] );
		}

		for ( i=0, len = col.length; i<len; i++ ) {
			indexes.push( [ col[i].edgeLeft.index, col[i].edgeRight.index ] );
		}

		for ( i=0, len = col.length; i<len; i++ ) {
			if ( indexes[i][0] < leftIndex || indexes[i][1] > rightIndex ) {
				col[i].colSpan( col[i].colSpan() - thisColspan );
			} else {
				col[i].remove();
				removedCells.push( col[i] );
			}
		}


		for ( i=0, len = rows.length; i<len; i++ ) {
			if ( rows[i].childNodes.length == 0 ) {
				rows[i].remove();
			}
		}

		if ( this.ownerTable.childNodes.length == 0 ) {
			this.ownerTable.remove();
		}

		if ( this.ownerTable.parentNode )
			selection.anchorTo( new TRange_Target( this.ownerTable, this.ownerTable.FRAGMENT_START ) );
		else
			selection.anchorTo( new TRange_Target( this.documentElement ) );

	}


	/* Deletes the "visual" (not the TR) row of the cell from the table.
	 */

	public deleteRow() {

		this.ownerTable._xEdgesApplied = false;

		var table: HTML_Table = this.ownerTable,
		    topIndex: number = this.edgeTop.index,
		    bottomIndex: number = this.edgeBottom.index,
		    col  : HTML_TableCell[] = table.getCellsForRow( topIndex, bottomIndex ),
		    rows : HTML_TableRow[] = [],
		    i: number = 0,
		    len: number = 0,
		    indexes: number[][] = [],
		    thisRowspan: number = this.rowSpan(),
		    removedCells: HTML_TableCell[] = [],
		    selection = this.documentElement.viewport.selection,
		    rng       = selection.getRange();

		for ( i=0, len = this.ownerTable.childNodes.length; i<len; i++ ) {
			rows.push( <HTML_TableRow>this.ownerTable.childNodes[i] );
		}

		for ( i=0, len = col.length; i<len; i++ ) {
			indexes.push( [ col[i].edgeTop.index, col[i].edgeBottom.index ] );
		}

		for ( i=0, len = col.length; i<len; i++ ) {
			if ( indexes[i][0] < topIndex || indexes[i][1] > bottomIndex ) {
				col[i].rowSpan( col[i].rowSpan() - thisRowspan );
			} else {
				col[i].remove();
				removedCells.push( col[i] );
			}
		}


		for ( i=0, len = rows.length; i<len; i++ ) {
			if ( rows[i].childNodes.length == 0 ) {
				rows[i].remove();
			}
		}

		if ( this.ownerTable.childNodes.length == 0 ) {
			this.ownerTable.remove();
		}

		if ( this.ownerTable.parentNode )
			selection.anchorTo( new TRange_Target( this.ownerTable, this.ownerTable.FRAGMENT_START ) );
		else
			selection.anchorTo( new TRange_Target( this.documentElement ) );

	}

	/* If the cell has colspan more than 1 or rowspan more than 1,
	   we can split it.
	 */
	public splitCell() {
		
		if ( this.colSpan() == 1 && this.rowSpan() == 1 ) {
			return;
		}

		this.documentElement.lockTables();

		var affectedRows: HTML_TableRow[] = [ <HTML_TableRow>this.parentNode ],
		    i: number = 0,
		    len: number = 0,
		    j: number = 0,
		    n: number = 0,
		    needRowsAfter: number = 0,
		    rowspan: number = this.rowSpan(),
		    cursor: HTML_TableRow,
		    newRow: HTML_TableRow,
		    saveColspan: number = this.colSpan(),
		    saveRowspan: number = this.rowSpan(),
		    saveEdgeLeftIndex: number = this.edgeLeft.index,
		    insertAtPos: number = null,
		    c: HTML_TableCell;

		if ( rowspan > 1 ) {
			
			cursor = <HTML_TableRow>this.parentNode.nextSibling();

			while ( rowspan > 1 ) {
				if ( cursor ) {
					affectedRows.push( <HTML_TableRow>cursor );
				} else {
					newRow = <HTML_TableRow>this.documentElement.createElement( 'tr' );
					newRow.ownerTable = this.ownerTable;
					this.ownerTable.appendChild( newRow );
					affectedRows.push( newRow );
					cursor = newRow;
				}

				cursor = <HTML_TableRow>cursor.nextSibling();
				rowspan--;
			}

		}

		if ( saveColspan > 1 ) {
			
			this.colSpan( 1 );

			for ( i = 1; i< saveColspan; i++ ) {
				
				c = <HTML_TableCell>this.documentElement.createElement( 'td' );
				c.ownerTable = this.ownerTable;

				this.parentNode.appendChild( c, this.siblingIndex + 1 );

			}
		}

		if ( saveRowspan > 1 ) {

			this.rowSpan(1);

			for ( i=1; i<affectedRows.length; i++ ) {

				if ( affectedRows[i].childNodes.length == 0 ) {
				
					insertAtPos = null;
				
				} else {
				
					insertAtPos = 0;

					for ( j = 0, n = affectedRows[i].childNodes.length; j<n; j++ ) {

						c = ( <HTML_TableCell>affectedRows[i].childNodes[j] );

						if ( c.edgeLeft && c.edgeLeft.index <= saveEdgeLeftIndex ) {
							insertAtPos = j;
						} else {
							break;
						}
					}
				}

				for ( j=0; j<saveColspan; j++ ) {
					c = <HTML_TableCell>this.documentElement.createElement( 'td' );
					c.ownerTable = this.ownerTable;
					affectedRows[i].appendChild( c, insertAtPos );
				}

			}

		}

		this.documentElement.unlockTables();
		this.ownerTable.compile(true);

		this.documentElement.viewport.selection.fire( 'changed' );

	}

	/* Returns the direct table which holds this cell */

	get ownerTable(): HTML_Table {
		return this.parentNode && this.parentNode.is() == 'tr'
			? (<HTML_TableRow>this.parentNode).ownerTable
			: null;
	}


	/* Returns the next cell in the ownertable of the current cell.
	   The cell is physically layouted visually in the table, and it has
	   nothing to do with the DOM node order of the cells in the table */

	public nextCell(): HTML_TableCell {

		if ( this.nextSibling() ) {
			return <HTML_TableCell>this.nextSibling();
		} else {
			for ( var i = (<HTML_TableRow>this.parentNode).siblingIndex + 1; i < (<HTML_Table>this.parentNode.parentNode).childNodes.length; i++ ) {
				if ( (<HTML_TableRow>(<HTML_Table>this.parentNode.parentNode).childNodes[i]).childNodes[0] ) {
					return <HTML_TableCell>(<HTML_TableRow>this.parentNode.parentNode.childNodes[i]).childNodes[0];
				}
			}
		}

		return null;

		return null;

	}


}