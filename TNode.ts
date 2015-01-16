class TNode extends Events {
	
	public parentNode      : TNode_Element = null;
	public siblingIndex    : number = 0;
	public nodeType        : TNode_Type = TNode_Type.UNKNOWN;
	public documentElement : HTML_Body = null;
	
	// dettach the node from it's parent
	public remove(): TNode {
		if ( this.parentNode ) {
			this.parentNode.removeChild( this );
		}
		return this;
	}

	public nextSibling(): TNode {
		if ( this.parentNode ) {
			return this.parentNode.childNodes[ this.siblingIndex + 1 ] || null;
		} else {
			return null;
		}
	}

	public previousSibling(): TNode {
		if ( this.parentNode ) {
			return this.parentNode.childNodes[ this.siblingIndex - 1 ] || null;
		} else {
			return null;
		}
	}

}