class TNode_Collection {
	
	public nodes: TNode_Element[] = [];
	
	constructor( addNodes: TNode_Element[] = null ) {
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

	public add( node: TNode_Element ) {
		this.nodes.push( node );
	}
}