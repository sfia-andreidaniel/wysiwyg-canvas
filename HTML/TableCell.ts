class HTML_TableCell extends TNode_Element {
	
	public ownerTable                : HTML_Table      = null;
	
	public tableIndex                : number          = 0; // the index of the cell in it's table
	public rowIndex                  : number          = 0; // the index of the cell in it's row

	protected _colSpan               : number          = 1;
	protected _rowSpan               : number          = 1;

	public edgeLeft                  : HTML_Table_Edge = null;
	public edgeRight                 : HTML_Table_Edge = null;
	public edgeTop                   : HTML_Table_Edge = null;
	public edgeBottom                : HTML_Table_Edge = null;

	public isSelectable              : boolean         = true;
	public isBlockTextNode           : boolean         = true;

	public insertLinePolicy          : TNewLinePolicy  = TNewLinePolicy.BR;
	public alternateInsertLinePolicy : TNewLinePolicy  = TNewLinePolicy.BR;

	public isMergeable               : boolean = false;

	constructor() {
		super( true );
		this.style = new TStyle_TableCell( this );

		this.nodeName = 'td';
		this.style.display('block');
		this.style.borderWidth( '1' );
		this.style.borderColor( 'black' );
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

	public removeChild( node: TNode ): TNode {
		var returnValue = super.removeChild( node );
		if ( this.childNodes.length == 0 ) {
			this.appendChild( this.documentElement.createTextNode( ' ' ) );
		}
		return returnValue;
	}

	public removeFromDOMAtUserCommand(): boolean {
		this.removeAllChildNodes();
		this.appendChild( this.documentElement.createTextNode( ' ' ) );
		return true;
	}

	// a table cell cannot become other element type.
	public becomeElement( elementName: string ): TNode_Element {
		return this;
	}

}