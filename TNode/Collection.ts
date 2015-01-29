class TNode_Collection {
	
	public nodes: TNode[] = [];

	constructor( addNodes: TNode[] = null ) {

		if ( addNodes !== null ) {
			for ( var i=0, len = addNodes.length; i<len; i++ ) {
				this.nodes.push( addNodes[i] );
			}
		}
	}

	get length(): number {
		return this.nodes.length;
	}

	public each( callback ): TNode_Collection {

		if ( callback ) {

			for ( var i=0, len = this.nodes.length; i<len; i++ ) {

				if ( this.nodes[i] ) {

					callback.call( this.nodes[i] );

				}

			}

		}

		return this;

	}

	public add( node: TNode ) {
		this.nodes.push( node );
	}

	public addFirst( node: TNode ) {
		this.nodes.splice( 0, 0, node );
	}

	public wrapIn( node: TNode_Element ): TNode_Collection {
		for ( var i=0, len = this.nodes.length; i<len; i++ ) {
			node.appendChild( this.nodes[i] );
		}
		return new TNode_Collection( [ node ] );
	}

	public innerHTML(): string {
		var i: number = 0,
		    len: number = this.nodes.length,
		    out: string[] = [];
		for ( i=0; i<len; i++ ) {
			if ( this.nodes[i].nodeType == TNode_Type.TEXT ) {
				out.push( ( <TNode_Text>this.nodes[i] ).textContents() );
			} else {
				out.push( ( <TNode_Element>this.nodes[i] ).outerHTML() );
			}
		}
		return out.join( '' );
	}

	public at( index: number ): TNode {
		return this.nodes[index];
	}
}