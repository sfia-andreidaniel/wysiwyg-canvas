class TNode extends Events {
	
	public parentNode      : TNode_Element  = null;
	public siblingIndex    : number         = 0;
	public nodeType        : TNode_Type     = TNode_Type.UNKNOWN;
	public nodeClass       : TNode_Class    = TNode_Class.NONE;
	public documentElement : HTML_Body      = null;
	public FRAGMENT_START  : number         = 0;
	public FRAGMENT_END    : number         = 0;
	
	// dettach the node from it's parent
	public remove(): TNode {
		if ( this.parentNode ) {
			this.parentNode.removeChild( this );
			this.parentNode = null;
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

	public bakeIntoFragment() {
		throw "ABSTRACT";
	}

	public ownerBlockElement(): TNode_Element {
		throw "ABSTRACT";
	}

	public elementsBeforeMyself( includingMe: boolean ): TNode[] {
		if ( !this.parentNode ) {
			throw "Node not attached!";
		} else {
			return this.parentNode.childNodes.slice( 0, includingMe ? this.siblingIndex + 1 : this.siblingIndex );
		}
	}

	public elementsAfterMyself( includingMe: boolean ): TNode[] {
		if ( !this.parentNode ) {
			throw "Node not attached!";
		} else {
			return this.parentNode.childNodes.slice( includingMe ? this.siblingIndex : this.siblingIndex + 1 );
		}
	}

}