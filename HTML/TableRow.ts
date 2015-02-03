class HTML_TableRow extends TNode_Element {
	
	public ownerTable: HTML_Table = null;
	public isMergeable : boolean = false;

	constructor() {
		super();
		this.nodeName = 'tr';
		this.style.display('block');
	}

	// ignore other elements other than table cell
	public appendChild( node: TNode, index: number = null ): TNode {

		var returnValue: HTML_TableCell;

		if ( node.nodeType == TNode_Type.ELEMENT && (<TNode_Element>node).nodeName == 'td' ) {

			returnValue = <HTML_TableCell>( super.appendChild( node, index ) );
			returnValue.ownerTable = this.ownerTable;
			
			if ( this.ownerTable ) {
				this.ownerTable.requestCompile();
			}

			return returnValue;
		} else {
			//silently discard errors
			return node;
		}
	}

	public removeFromDOMAtUserCommand(): boolean {
		return false; // table rows cannot be removed even if they are selected when the user press a removal key
	}

	// table rows don't have tabstops
	public tabStop( value: number = null ): number {
		return 0;
	}


}