class TNode_Collection {
	
	public nodes                     : TNode[] = [];

	public normalizedInlineStartNodes: number;
	public normalizedInlineEndNodes  : number;

	public    parentNode             : TNode_Element = null; // will be used in TNode_Collection_Dettached later, but is declared here for wrapInElement/unwrapInElement
	protected leftSibling            : TNode = null;		 // will be used in TNode_Collection_Dettached later, but is declared here for wrapInElement/unwrapInElement



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

	public isBlock( node: TNode ) {
		
		var is: string = node.is();

		if ( is == '#text' ) {
			return false;
		} else {
			if ( TNode_Collection.BLOCK_NODES_LIST.indexOf( is ) >= 0 && ['left', 'right'].indexOf( (<TNode_Element>node).style.float() ) == -1 ) {
				return true;
			} else {
				return false;
			}
		}
	}

	public isInline( node: TNode ) {
		var is: string = node.is();

		if ( is == '#text' ) {
			return true;
		} else {
			if ( TNode_Collection.INLINE_NODES_LIST.indexOf( is ) >= 0 || ['left', 'right'].indexOf( (<TNode_Element>node).style.float() ) >= 0 ) {
				return true;
			} else {
				return false;
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
			if ( this.isInline( this.nodes[i] ) ) {
				m = 1;
				for ( j=i + 1; j<len; j++ ) {
					if ( this.isInline( this.nodes[j] ) ) {
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
			if ( this.isBlock( this.nodes[i] ) ) {
				m = 1;
				for ( j=i + 1; j<len; j++ ) {
					if ( this.isBlock( this.nodes[j] ) ) {
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

	/* Needed for normalizeForHost function only */

	private computeInlineStartNodes( ): number {

		var i: number = 0,
		    len: number = 0,
		    inlineStartNodes: number = 0;

		for ( i=0, len = this.nodes.length; i < len; i++ ) {
			if ( this.isInline( this.nodes[i] ) ) {
				inlineStartNodes++;
			} else {
				break;
			}
		}

		return inlineStartNodes;

	}



	/* Normalize (prepares)the collection for being able to be inserted inside of a host element.
     * This method is used by Selection.insertHTML.
	 */
	public normalizeForHost( hostNodeName: string, unwrapNodes: string[] ): TNode_Collection {

		//console.warn( unwrapNodes );

		var doc: HTML_Body = this.nodes.length ? this.nodes[0].documentElement : null,
			seq: { collection: TNode_Collection; index: number } = null,
		    wrap: TNode_Element,

		    inlineStartNodes: number = 0,
		    inlineEndNodes  : number = 0,
		 	len: number = 0,
		 	i: number = 0,
		 	j: number = 0,
		 	n: number = 0;

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

		inlineStartNodes = this.computeInlineStartNodes();

		for ( j=0, n = unwrapNodes.length; j<n; j++ ) {

			this.unwrapFromElement( unwrapNodes[ j ], null, 0, inlineStartNodes - 1 );

			inlineStartNodes = this.computeInlineStartNodes();

		}

		if ( inlineStartNodes < len ) {
			for ( i = len-1; i >= 0; i-- ) {
				if ( this.isInline( this.nodes[i] ) ) {
					inlineEndNodes++;
				} else {
					break;
				}
			}
		}

		if ( hostNodeName == 'td' ) {
			
			this.unwrapFromElement( 'p', null, inlineStartNodes, this.nodes.length - inlineEndNodes, 'br', 'br' );

			this.unwrapFromElement( 'table', null, inlineStartNodes, this.nodes.length - inlineEndNodes );
			this.unwrapFromElement( 'tr', null, inlineStartNodes, this.nodes.length - inlineEndNodes );
			this.unwrapFromElement( 'td', null, inlineStartNodes, this.nodes.length - inlineEndNodes, 'br', 'br' );

		} else {

			while ( seq = this.spliceByInlineNodes( inlineStartNodes, inlineEndNodes ) ) {
				wrap = doc.createElement( 'p' );
				Helper.spliceApply( this.nodes, seq.index, 0, [ seq.collection.wrapIn( wrap ).at( 0 ) ] );
			}



		}
		
		inlineStartNodes = this.computeInlineStartNodes();


		this.normalizedInlineStartNodes = inlineStartNodes;
		this.normalizedInlineEndNodes = inlineEndNodes;

		return this;

	}

	/* @nodeName: THe element name which is search for unwrapping process.

	   @iFunc: A function which is evaluated on the parentNode context (this=parentNode), which if returns false,
	           aborts the unwrap process.

	   @indexStart, @indexEnd: Unwrap in the root only between @indexStart and @indexEnd.

	   @addNodeAfterUnwrap: After unwrapping a node *in the root*, insert a element with node name addNodeAfterUnwrap.
	   This is needed for example if we want to unwrap the p's, but add a <br/> after each p.
	 */

	public unwrapFromElement( 
		nodeName: string,
		ifFunc: ( ) => boolean = null,
		indexStart: number = null,
		indexEnd: number = null,
		addNodeBeforeUnwrap: string = null,
		addNodeAfterUnwrap: string = null
	) {
		
		if ( this.parentNode !== null && ifFunc !== null && !(ifFunc.call( this.parentNode ) ) ) {
			return;
		}

		var subWraps  	: TNode_Element[] = [],
		    i 			: number 		  = 0,
		    len 		: number 		  = this.nodes.length,
		    addLen		: number 		  = 0,
		 	subChildren : TNode[]         = [],
		 	unwrapped   : TNode_Collection,
		 	doc         : HTML_Body;

		if ( indexStart === null ) {
			indexStart = 0;
		}

		if ( indexEnd === null ) {
			indexEnd = len;
		}

		if ( len == 0 ) {
			return;
		}

		doc = this.nodes[0].documentElement;

		// unwraps the direct children of collection.

		for ( i=indexStart; i<indexEnd; i++ ) {

			switch ( this.nodes[i].nodeType ) {
				case TNode_Type.TEXT:
					break;
				case TNode_Type.ELEMENT:
					if ( ( <TNode_Element>this.nodes[i] ).nodeName == nodeName ) {
						
						if ( addNodeBeforeUnwrap ) {
							this.nodes.splice( i, 0, doc.createElement( addNodeBeforeUnwrap ) );
							i++;
						}

						unwrapped = ( <TNode_Element>this.nodes[i] ).unwrap();

						Helper.spliceApply( this.nodes, i, 1, unwrapped.nodes );

						if ( addNodeAfterUnwrap ) {
							this.nodes.splice( i + unwrapped.nodes.length, 0, doc.createElement( addNodeAfterUnwrap ) );
						}


						indexEnd = this.nodes.length;

						i += unwrapped.nodes.length + ( addNodeAfterUnwrap ? 0 : -1 ) ;
					}
					break;
			}

		}

		/* finds all the nodes in direct children subtrees. */
		for ( i=indexStart; i<indexEnd; i++ ) {
			if ( this.nodes[i].nodeType == TNode_Type.ELEMENT ) {
				
				( <TNode_Element>this.nodes[i] ).queryAll( { "nodeName": nodeName } ).each( function() {
					this.unwrap();
				} );

			}
		}

	}

	public wrapInElement( nodeName: string, elAttributeName: any = null, elAttributeValue: any = null, ifFunc: ( ) => boolean = null ) {

		if ( this.parentNode && ifFunc !== null && !(ifFunc.call( this.parentNode ) ) ) {
			return;
		}

		var node: TNode_Element = this.parentNode.documentElement.createElement( nodeName ),
		       i: number = 0,
		     len: number = this.nodes.length,
		       j: number = 0,
		       k: number = 0;

		if ( elAttributeName !== null ) {

			if ( typeof elAttributeName == 'string' ) {
				node.setAttribute( elAttributeName, elAttributeValue || '' );	
			} else {
				if ( elAttributeName && elAttributeValue && elAttributeName.length == elAttributeValue.length ) {
					for ( j=0, k = elAttributeName.length; j<k; j++ ) {
						node.setAttribute( elAttributeName[j], elAttributeValue[j] );
					}
				}
			}
			
		}

		for ( i=0; i<len; i++ ) {
			node.appendChild( this.nodes[i] );
		}

		this.nodes = [ node ];

		if ( this.parentNode )
			this.parentNode.appendChild( node, this.leftSibling === null ? 0 : this.leftSibling.siblingIndex + 1 );
	}



}