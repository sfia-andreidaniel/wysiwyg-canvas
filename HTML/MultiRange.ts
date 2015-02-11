/* 
   The HTML_MultiRange Element represents a virtual Element that
   is used by multirange selection.

   The element cannot be appended inside the DOM, removed, etc.

   The childNodes from the HTML_MultiRange element have physically other
   parentNode's, not the HTML_MultiRange element node.

*/

class HTML_MultiRange extends TNode_Element {

	public 	isSelectable: boolean = true;
	public  isResizable : boolean = true;
	public  role        : string  = 'generic';

	public  resizerHint : TResizer = null;

	constructor( document: HTML_Body, parentNode: TNode_Element, role: string ) {
	    super();
	    this.nodeName = 'multirange';
	    this.documentElement = document;
	    this.parentNode = parentNode;
	    this.role = role;

	    if ( !this.parentNode ) {
	    	throw "Bad initialization";
	    }
	}

	get FRAGMENT_START(): number {
		
		if ( this.childNodes.length ){ 
			return this.childNodes[0].FRAGMENT_START;
		} else {
			return this.parentNode.FRAGMENT_START;
		}
	}

	get FRAGMENT_END(): number {
		
		if ( this.childNodes.length ) {
			return this.childNodes[ this.childNodes.length - 1 ].FRAGMENT_END;
		} else {
			return this.parentNode.FRAGMENT_END;
		}
	}

	protected sortNodes() {
		this.childNodes.sort( function( a, b ) {
			return a.FRAGMENT_START - b.FRAGMENT_START;
		} );
	}

	public appendChild( node: TNode, index: number = null ): TNode {

		if ( this.childNodes.indexOf( node ) == -1 ) {
			this.childNodes.push( node );
			this.sortNodes();
		}

		return node;

	}

	public removeChild( node: TNode ) {
		for ( var i=0, len = this.childNodes.length; i<len; i++ ) {
			if ( this.childNodes[i] == node ) {
				this.childNodes.splice( i, 1 );
				this.sortNodes();
				break;
			}
		}
		return node;
	}

	public appendCollection( collection: TNode_Collection, siblingIndex: number = null ) {
		throw "ERR_NOT_SUPPORTED";
	}

	public remove(): TNode {
		return this;
	}

	public createSurgery( atFragmentIndex: number, createNodeAfter: boolean = true, nodeNameAfter: string = null, hint: TSurgeryHint = TSurgeryHint.NONE ): number {
		throw "ERR_NOT_SUPPORTED";
	}

	public mergeWith( element: TNode_Element ) {
		throw "ERR_NOT_SUPPORTED";
	}

	public removeFromDOMAtUserCommand(): boolean {
		return false;
	}

	public unwrap(): TNode_Collection {
		throw "ERR_NOT_SUPPORTED";
	}

	public defragment( removeOrphans: boolean = true ): number {
		throw "ERR_NOT_SUPPORTED";
	}

	public clone(): TNode_Element {
		return this;
	}

	public canDefragmentWith( element: TNode_Element ) {
		return false;
	}

	public becomeElement( elementName: string ): TNode_Element {
		throw "ERR_NOT_SUPPORTED";
	}

	public mergeAdjacentLists() {
		// nothing.
	}

	public tabStop( value: number = null ): number {
		return value;
	}

	public outerHTML( v: string = null ) {
		if ( v !== null ) {
			throw "ERR_NOT_SUPPORTED";
		} else {
			return this.innerHTML( null );
		}
	}

}