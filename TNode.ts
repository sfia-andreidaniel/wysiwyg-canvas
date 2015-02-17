class TNode extends Events {
	
	public parentNode      : TNode_Element = null;
	public siblingIndex    : number = 0;
	public nodeType        : TNode_Type = TNode_Type.UNKNOWN;
	public documentElement : HTML_Body = null;
	public FRAGMENT_START  : number = 0;
	public FRAGMENT_END    : number = 0;
	
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
			throw "Node " + this.is() + " is not attached!";
		} else {
			return this.parentNode.childNodes.slice( 0, includingMe ? this.siblingIndex + 1 : this.siblingIndex );
		}
	}

	public elementsAfterMyself( includingMe: boolean ): TNode[] {
		if ( !this.parentNode ) {
			throw "Node " + this.is() + " not attached!";
		} else {
			return this.parentNode.childNodes.slice( includingMe ? this.siblingIndex : this.siblingIndex + 1 );
		}
	}

	public is(): string {
		if ( this.nodeType == TNode_Type.TEXT ) {
			return '#text';
		} else {
			return (<TNode_Element>this).nodeName;
		}
	}

	public isOrphanElement(): boolean {
		var is: string = this.is();

		if ( is == '#text' ) {
			return false;
		} else {
			return (<TNode_Element>this).childNodes && (<TNode_Element>this).childNodes.length == 0 &&
			 	   (<TNode_Element>this).isBlockTextNode;
		}
	}

	public firstParentOfType( whatToBe: string ): TNode {
		var cursor = this;

		while ( cursor ) {
			if ( cursor.is() == whatToBe ) {
				return cursor;
			}
			cursor = cursor.parentNode;
		}

		return null;
	}

	public hostElement(): TNode_Element {
		
		var cursor: TNode = this,
		    hosts: string[] = [ 'body', 'td', 'li' ];
		
		while ( hosts.indexOf( cursor.is() ) == -1 ) {
			if ( !cursor.parentNode ) {
				return null;
			}
			cursor = cursor.parentNode;
		}

		return <TNode_Element>cursor;
	}

	/* Cuts the dom in deepness until the root node name is in the untilNodes list */
	public cutDown( untilNodes: string[] ): TInsertionPoint {
		
		if ( !untilNodes.length ) {
			return {
				"element": this.parentNode,
				"index": this.siblingIndex + 1
			};
		}

		var nodesLeft: TNode_Collection,
		    nodesRight: TNode_Collection,
		    self = this;

		if ( self.nodeType == TNode_Type.TEXT && (<TNode_Text>self).isBR ) {
			self = this.parentNode;
		}
		    
		var lParent: TNode_Element = self.parentNode,
		    rParent: TNode_Element = null,


		nodesLeft = new TNode_Collection( self.elementsBeforeMyself( true ) );
		nodesRight= new TNode_Collection( self.elementsAfterMyself( false ) );

		while ( lParent.parentNode && ( lParent.parentNode != lParent.documentElement ) && untilNodes.indexOf( lParent.parentNode.is() ) == -1 ) {
			rParent = lParent.clone();
			
			nodesRight.wrapIn( rParent );

			lParent.parentNode.appendChild( rParent, lParent.siblingIndex + 1 );
			
			nodesLeft = new TNode_Collection( lParent.elementsBeforeMyself( true ) );
			nodesRight= new TNode_Collection( rParent.elementsAfterMyself( true ) );

			lParent = lParent.parentNode;
		}

		if ( lParent.parentNode ) {
			rParent = lParent.clone();
			nodesRight.wrapIn( rParent );
			lParent.parentNode.appendChild( rParent, lParent.siblingIndex + 1 );
		} else {
			throw "ERR_BAD_CUTDOWN";
		}

		return {
			"element": lParent.parentNode,
			"index": lParent.siblingIndex + 1
		};

	}

}