class HTML_MultiRange_TableRow extends HTML_MultiRange {
	
	constructor( document: HTML_Body, parentNode: TNode_Element ) {
		super( document, parentNode, 'table-row' );
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

	public becomeTableRectRange(): HTML_MultiRange_TableRect {
		
		if ( this.childNodes.length ) {
			var become = new HTML_MultiRange_TableRect( this.childNodes[0].documentElement, this.parentNode );
			become.anchorTo( <HTML_TableCell>this.childNodes[0] );
			return become;
		} else {
			return null;
		}
	}


}