class TNode_Collection {
	
	public nodes: TNode[] = [];

	public normalizedInlineStartNodes: number;
	public normalizedInlineEndNodes: number;


	public static INLINE_NODES_LIST: string[] = [
		"#text", "a", "b", "!b", "i", "!i", "u", "!u", "strike", "!strike",
		"sup", "!sup", "sub", "!sub", "span", "color", "font", "size"
	];

	public static BLOCK_NODES_LIST: string[] = [
		"body", "ul", "li", "ol", "h1", "h2", "h3", "h4", "h5", "h6", "h7",
		"p", "img", "table", "tr", "td"
	];

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

	/* Finds a succession of nodes whose names are @nodeNameIs, remove it from this collection and
	   returns them into a new subcollection. Original index for the first removed item is returned
	   in the @index.
	 */
	private spliceByNodeName( nodeNameIs: string ): { "collection": TNode_Collection; index: number } {

		var i: number = 0,
		    j: number = 0,
		    len: number = 0,
		    nodes: TNode[] = [],
		    m: number = 0;

		for ( i=0, len=this.nodes.length; i<len; i++ ) {
			if ( this.nodes[i].is() == nodeNameIs ) {
				m = 1;
				for ( j=i + 1; j<len; j++ ) {
					if ( this.nodes[j].is() == nodeNameIs ) {
						m++;
					} else {
						break;
					}
				}
				nodes = this.nodes.splice( i, m );
				return { "collection": new TNode_Collection( nodes ), index: i };
			}
		}

		return null;
	}

	/* Finds a succession of inline nodes, remove them from this collection and
	   returns them into a new subcollection. Original index for the first removed item is returned
	   in the @index.
	 */
	private spliceByInlineNodes( minAfterLength: number = 0, maxBeforeLength: number = 0 ): { "collection": TNode_Collection; index: number } {

		var i: number = 0,
		    j: number = 0,
		    len: number = this.nodes.length - maxBeforeLength,
		    nodes: TNode[] = [],
		    m: number = 0;

		

		for ( i=minAfterLength; i<len; i++ ) {
			if ( TNode_Collection.INLINE_NODES_LIST.indexOf( this.nodes[i].is() ) > -1 ) {
				m = 1;
				for ( j=i + 1; j<len; j++ ) {
					if ( TNode_Collection.INLINE_NODES_LIST.indexOf( this.nodes[j].is() ) > -1 ) {
						m++;
					} else {
						break;
					}
				}
				nodes = this.nodes.splice( i, m );
				return { "collection": new TNode_Collection( nodes ), index: i };
			}
		}

		return null;
	}

	/* Finds a succession of inline nodes, remove them from this collection and
	   returns them into a new subcollection. Original index for the first removed item is returned
	   in the @index.
	 */
	private spliceByBlockNodes( minAfterLength: number = 0, maxBeforeLength: number = 0 ): { "collection": TNode_Collection; index: number } {

		var i: number = 0,
		    j: number = 0,
		    len: number = this.nodes.length - maxBeforeLength,
		    nodes: TNode[] = [],
		    m: number = 0;

		for ( i=minAfterLength; i<len; i++ ) {
			if ( TNode_Collection.BLOCK_NODES_LIST.indexOf( this.nodes[i].is() ) > -1 ) {
				m = 1;
				for ( j=i + 1; j<len; j++ ) {
					if ( TNode_Collection.BLOCK_NODES_LIST.indexOf( this.nodes[j].is() ) > -1 ) {
						m++;
					} else {
						break;
					}
				}
				nodes = this.nodes.splice( i, m );
				return { "collection": new TNode_Collection( nodes ), index: i };
			}
		}

		return null;
	}


	/* Normalize the collection for being able to be inserted inside of a host element */
	public normalizeForHost( hostNodeName: string ): TNode_Collection {

		var doc: HTML_Body = this.nodes.length ? this.nodes[0].documentElement : null,
			seq: { collection: TNode_Collection; index: number } = null,
		    wrap: TNode_Element,

		    inlineStartNodes: number = 0,
		    inlineEndNodes  : number = 0,
		 	len: number = 0,
		 	i: number = 0;

		if ( doc === null ) {
			return this;
		}

		while ( seq = this.spliceByNodeName( 'td' ) ) {
			wrap = doc.createElement( 'tr' );
			Helper.spliceApply( this.nodes, seq.index, 0, [ seq.collection.wrapIn( wrap ).at( 0 ) ] );
		}

		while ( seq = this.spliceByNodeName( 'tr' ) ) {
			wrap = doc.createElement( 'table' );
			wrap.setAttribute( 'border', '1' );
			wrap.setAttribute( 'bordercolor', 'black' );
			Helper.spliceApply( this.nodes, seq.index, 0, [ seq.collection.wrapIn( wrap ).at( 0 ) ] );
		}

		while ( seq = this.spliceByNodeName( 'li' ) ) {
			wrap = doc.createElement( 'ul' );
			Helper.spliceApply( this.nodes, seq.index, 0, [ seq.collection.wrapIn( wrap ).at( 0 ) ] );
		}

		for ( i=0, len = this.nodes.length; i < len; i++ ) {
			if ( TNode_Collection.INLINE_NODES_LIST.indexOf( this.nodes[i].is() ) > -1 ) {
				inlineStartNodes++;
			} else {
				break;
			}
		}

		if ( inlineStartNodes < len ) {
			for ( i = len-1; i >= 0; i-- ) {
				if ( TNode_Collection.INLINE_NODES_LIST.indexOf( this.nodes[i].is() ) > -1 ) {
					inlineEndNodes++;
				} else {
					break;
				}
			}
		}

		while ( seq = this.spliceByInlineNodes( inlineStartNodes, inlineEndNodes ) ) {
			wrap = doc.createElement( 'p' );
			Helper.spliceApply( this.nodes, seq.index, 0, [ seq.collection.wrapIn( wrap ).at( 0 ) ] );
		}

		this.normalizedInlineStartNodes = inlineStartNodes;
		this.normalizedInlineEndNodes = inlineEndNodes;

		return this;

	}
}