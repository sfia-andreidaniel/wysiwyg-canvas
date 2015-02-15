class Fragment_Contextual_MultiRange extends Fragment_Contextual {

	constructor( public fragment: Fragment, public rangeNode: HTML_MultiRange, public isEmpty: boolean = false ) {
		super( fragment, 0, 0, isEmpty );
	}

	public compute(): Fragment_Contextual {
		
		var i: number = 0,
			len: number = 0,
			node: TNode;

		if ( this.isEmpty ) {
			return this;
		}

		this.parts = [];

		for ( var i=0, len = this.rangeNode.childNodes.length; i<len; i++ ) {

			node = this.rangeNode.childNodes[i];

			switch ( true ) {
				case node.nodeType == TNode_Type.TEXT:
					this.parts.push( new Fragment_Contextual_TextNode( <TNode_Text>node, node.FRAGMENT_START, node.FRAGMENT_END ) );
					break;
				case node.nodeType == TNode_Type.ELEMENT:
					this.parts.push( new Fragment_Contextual_NodeStart( <TNode_Element>node ) );
					this.parts.push( new Fragment_Contextual_NodeEnd( <TNode_Element>node ) );
					break;
			}

		}

		return this;

	}

	public affectedTextNodes(): TNode_Text[] {
		var out: TNode_Text[] = [],
		    subNodes: TNode_Text[] = [],
		    i: number,
		    len: number,
		    j: number,
		    k: number;

		this.compute();

		for ( i=0, len = this.parts.length; i<len; i++ ) {
			if ( this.parts[i].type == FragmentCItem.TEXT ) {
				out.push( ( <TNode_Text>(<Fragment_Contextual_TextNode>this.parts[i]).node ) );
			} else {
				
				if ( this.parts[i].type == FragmentCItem.NODE_START ) {
					
					subNodes = (<TNode_Element>(<Fragment_Contextual_NodeStart>this.parts[i]).node).allTextNodes();

					for ( j=0, k = subNodes.length; j<k; j++ ) {
						out.push( <TNode_Text>subNodes[j] );
					}

				}
			}
		}

		return out;

	}

	public affectedInlineElements(): TNode_Element[] {
		var out: TNode_Element[] = [],
		    sub: TNode_Element[],
	      	i: number,
	      	len: number,
	      	j: number = 0,
	      	k: number = 0,
	      	node: TNode_Element;

		this.compute();

		for ( i=0, len = this.parts.length; i<len; i++ ) {

			switch ( this.parts[i].type ) {
				case FragmentCItem.NODE_START:
					
					node = (<TNode_Element>(<Fragment_Contextual_NodeStart>this.parts[i]).node);
					
					if ( node.style.display() == 'inline' ) {
						out.push( node );
					}

					sub = node.allSubElements();

					if ( k = sub.length ) {
						for ( j=0; j<k; j++ ) {
							if ( sub[i].style.display() == 'inline' ) {
								out.push( sub[i] );
							}
						}
					}

					break;
			}

		}

		out.sort( function(a,b) {
			return a.FRAGMENT_START - b.FRAGMENT_START;
		});

		return out;

	}

	public affectedBlockNodes(): TNode_Element[] {
		var out: TNode_Element[] = [],
		    i: number,
		    len: number,
		    node: TNode_Element;

		this.compute();

		for ( i=0, len = this.parts.length; i<len; i++ ) {
			switch ( this.parts[i].type ) {
				case FragmentCItem.NODE_START:
					node = (<TNode_Element>(<Fragment_Contextual_NodeStart>this.parts[i]).node);

					if ( ['tr','table'].indexOf(node.nodeName) >= 0 ) {
						continue;
					} else {
						node = node.ownerBlockElement();
					}

					break;
				case FragmentCItem.TEXT:
					node = (<TNode_Text>(<Fragment_Contextual_TextNode>this.parts[i]).node).ownerBlockElement();
					break;
			}

			if ( out.indexOf( node ) == -1 ) {
				out.push( node );
			}
		}

		out.sort( function(a,b) {
			return a.FRAGMENT_START - b.FRAGMENT_START;
		});

		return out;
	}

	public affectedRanges(): TNode_Collection_Dettached[] {

		this.compute();

		var blockNodes: TNode_Element[] = this.affectedBlockNodes(),
		    i: number = 0,
		    len: number = 0,
		    returnValue: TNode_Collection_Dettached[] = [];

		for ( i=0, len = blockNodes.length; i<len; i++ ) {
			
			if ( blockNodes[i].childNodes && blockNodes[i].childNodes.length && blockNodes[i].is() != 'tr' ) {
				returnValue.push( new TNode_Collection_Dettached( blockNodes[i], blockNodes[i].FRAGMENT_START + 1, blockNodes[i].FRAGMENT_END - 1 ) );
			}

		}

		this.fragment.document().canRelayout = false;

		for ( i=0, len = returnValue.length; i<len; i++ ) {
			returnValue[i].createSlices();
		}

		this.fragment.document().canRelayout = true;

		this.fragment.document().relayout( true );

		for ( i=0, len = returnValue.length; i<len; i++ ) {
			returnValue[i].createRanges();
		}

		return returnValue;

	}

	public remove() {
		console.warn( "ERR_NOT_IMPLEMENTED" );
	}

	public toString( format: string = 'text/html', closeTags: boolean = false ) {

		if ( ['html', 'text/html', 'text', 'text/plain' ].indexOf( format ) == -1 ) {
			throw "Bad format type!";
		}

		this.compute();

		var out: string[] = [],
		    i: number = 0,
		    len: number = this.parts.length,
		    node: TNode_Element,
		    txt: TNode_Text;

		for ( i=0, len = this.parts.length; i<len; i++ ) {

			switch ( this.parts[i].type ) {
			
				case FragmentCItem.NODE_START:
					node = (<TNode_Element>(<Fragment_Contextual_NodeStart>this.parts[i]).node);
					break;
				case FragmentCItem.TEXT:
					txt = <TNode_Text>(<Fragment_Contextual_TextNode>this.parts[i]).node;
					break;
				default:
					node = null;
					txt = null;

			}

			if ( node != null ) {
				out.push( 
					( format == 'text/html' || format == 'html' )
						? node.outerHTML()
						: node.textContents()
				);
			} else
			if ( txt != null ) {
				out.push(
					( format == 'text/html' || format == 'html' )
						? txt.escape()
						: txt.textContents()
				)
			}

		}

		return out.join('');

	}

}