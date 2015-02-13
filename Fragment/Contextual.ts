class Fragment_Contextual {

	public start: number = 0;
	public end  : number = 0;

	public parts: Fragment_Contextual_Item[] = [];

	constructor( public fragment: Fragment, indexStart: number = 0, indexEnd: number = 0, public isEmpty: boolean = false ) {
		var tmp: number = 0;
		
		if ( indexStart > indexEnd ) {
			tmp = indexStart;
			indexStart = indexEnd;
			indexEnd = tmp;
		}

		this.start = indexStart;
		this.end   = indexEnd;
	}

	// compute the parts of the contextual fragment.
	public compute() {
		var i: number = 0,
		    currentNode: TNode_Text = null,
		    element: TNode_Element = null,
		    at: FragmentItem,
		    iStart: number = 0,
		    iStop: number = 0,
		    start: number = this.start,
		    end: number = this.end;

		if ( this.isEmpty ) {
			return;
		}

		this.parts = [];

		if ( start < 0 ) {
			start = 0;
		}

		if ( end >= this.fragment.length() ) {
			end = this.fragment.length() - 1;
		}

		for ( i = start; i <= end; i++ ) {

			at = this.fragment.at( i );
			
			switch ( at ) {
				case FragmentItem.NODE_START:
					if ( currentNode !== null ) {
						this.parts.push( new Fragment_Contextual_TextNode( currentNode, iStart, iStop ) );
						currentNode = null;	
					}
					this.parts.push( new Fragment_Contextual_NodeStart( element = <TNode_Element>this.fragment.getNodeAtIndex( i ) ) );
					break;
				case FragmentItem.NODE_END:
					if ( currentNode !== null ) {
						this.parts.push( new Fragment_Contextual_TextNode( currentNode, iStart, iStop ) );
						currentNode = null;	
					}
					this.parts.push( new Fragment_Contextual_NodeEnd( element = <TNode_Element>this.fragment.getNodeAtIndex( i ) ) );
					currentNode = null;
					break;
				case FragmentItem.EOL:
				case FragmentItem.CHARACTER:
				case FragmentItem.WHITE_SPACE:
					//console.log( i, at == FragmentItem.EOL ? 'eol' : ( at == FragmentItem.CHARACTER ? 'chr' : 'ws' ) );
					if ( currentNode === null ) {
						currentNode = <TNode_Text>this.fragment.getNodeAtIndex( i );
						iStart = i;
						iStop = i;
					} else {
						iStop = i;
					}
					break;
			}
		}
	
		if ( currentNode !== null ) {
			if ( !( <TNode_Text>currentNode ).isBR ) {
				this.parts.push( new Fragment_Contextual_TextNode( currentNode, iStart, iStop ) );
			}
			currentNode = null;	
		}
	}

	public affectedTextNodes(): TNode_Text[] {
		var out: TNode_Text[] = [],
		    i: number,
		    len: number;

		this.compute();

		for ( i=0, len = this.parts.length; i<len; i++ ) {
			if ( this.parts[i].type == FragmentCItem.TEXT ) {
				out.push( ( <TNode_Text>(<Fragment_Contextual_TextNode>this.parts[i]).node ) );
			}
		}

		return out;

	}

	public affectedInlineElements(): TNode_Element[] {
		var out: TNode_Element[] = [],
		      i: number,
		      len: number,
		      node: TNode_Element;

		this.compute();

		for ( i=0, len = this.parts.length; i<len; i++ ) {
			switch ( this.parts[i].type ) {
				case FragmentCItem.NODE_END:
					node = (<TNode_Element>(<Fragment_Contextual_NodeEnd>this.parts[i]).node);
					break;
				case FragmentCItem.NODE_START:
					node = (<TNode_Element>(<Fragment_Contextual_NodeStart>this.parts[i]).node);
					break;
				case FragmentCItem.TEXT:
					node = (<TNode_Text>(<Fragment_Contextual_TextNode>this.parts[i]).node).parentNode;
					break;
			}

			if ( out.indexOf( node ) == -1 && node.style.display() == 'inline' ) {
				out.push( node );
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
				case FragmentCItem.NODE_END:
					node = (<TNode_Element>(<Fragment_Contextual_NodeEnd>this.parts[i]).node);

					if ( ['tr','table'].indexOf(node.nodeName) >= 0 ) {
						continue;
					} else {
						node = node.ownerBlockElement();
					}
					
					break;
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

	private createDettachedCollection( items: Fragment_Contextual_Item[], ownerBlockElement: TNode_Element ): TNode_Collection_Dettached {

		var allChildNodesSnapshot: TNode[] = [],
		    i: number  = 0,
		    len: number  = ownerBlockElement.childNodes.length,
		    surgeryStart: number = 0,
		    surgeryEnd: number = 0;

		// create a snapshot with the child nodes of the ownerBlockElement, we'll need it in order to compare
		// after surgery.
		for ( i=0; i<len; i++ ) {
			allChildNodesSnapshot.push( ownerBlockElement.childNodes[i] );
		}


		// reduce the list with the items with the first and last nodes only
		if ( items.length > 2 ) {
			items = [ items[0], items[ items.length - 1 ] ];
		}

		if ( items.length == 1 ) {
			
			/* If we have only a single item in the dettached collection and this one is not a text node, we return
			   an empty collection */
			
			if ( items[0].type != FragmentCItem.TEXT ) {
				return null;
			}

			surgeryStart = (<Fragment_Contextual_TextNode>items[0]).start;
			surgeryEnd   = (<Fragment_Contextual_TextNode>items[0]).end;

		} else {

			switch ( items[0].type ) {
				case FragmentCItem.TEXT:
					surgeryStart = (<Fragment_Contextual_TextNode>items[0]).start;
					break;
				case FragmentCItem.NODE_START:
					surgeryStart = (<Fragment_Contextual_NodeStart>items[0]).node.FRAGMENT_START;
					break;
				case FragmentCItem.NODE_END:
					surgeryStart = (<Fragment_Contextual_NodeStart>items[0]).node.FRAGMENT_END;
					break;
			}

			switch ( items[1].type ) {
				case FragmentCItem.TEXT:
					surgeryEnd = (<Fragment_Contextual_TextNode>items[1]).end;
					break;
				case FragmentCItem.NODE_START:
					surgeryEnd = (<Fragment_Contextual_NodeStart>items[1]).node.FRAGMENT_START;
					break;
				case FragmentCItem.NODE_END:
					surgeryEnd = (<Fragment_Contextual_NodeStart>items[1]).node.FRAGMENT_END;
					break;
			}
		}

		return new TNode_Collection_Dettached( ownerBlockElement, surgeryStart, surgeryEnd );

	}

	/* The affected ranges returns an array of collections with the child nodes
	   of the block elements from the selection. This is usefull when we want to
	   enclose the text in <b><i><u><sup><sub><font><color> tags
	 */
	public affectedRanges(): TNode_Collection_Dettached[] {

		var collection        : TNode_Collection_Dettached = null,
		    
		    previousBlockNode : TNode_Element              = null,
		    currentBlockNode  : TNode_Element,
		    tempBlockNode     : TNode_Element,

		    node              : TNode,
		    
		    i                 : number = 0,
		    len               : number = 0,
		    j                 : number = 0,
		    n                 : number = 0,
		    k                 : number = 0,

		    returnValue       : TNode_Collection_Dettached[] = [],

		    currentSet        : Fragment_Contextual_Item[] = [],
		    ranges            : any[] = [],
		    subLength         : number = 0;

		this.compute();

		for ( i=0, len = this.parts.length; i<len; i++ ) {

			switch ( this.parts[i].type ) {

				case FragmentCItem.TEXT:
					
					node = <TNode_Text>(<Fragment_Contextual_TextNode>this.parts[i]).node;
					currentBlockNode = node.ownerBlockElement();
					
					break;

				case FragmentCItem.NODE_START:
					node = <TNode_Element>(<Fragment_Contextual_NodeStart>this.parts[i]).node;

					currentBlockNode = node.ownerBlockElement();
					
					break;

				case FragmentCItem.NODE_END:
					node = <TNode_Element>(<Fragment_Contextual_NodeEnd>this.parts[i]).node;
					currentBlockNode = node.ownerBlockElement();
					break;
			}

			if ( currentBlockNode != previousBlockNode ) {

				currentSet = [];

				// node changed, find if the whole node is in our parts
				subLength = 1;

				for ( j = i + 1; j < len; j++ ) {
					
					switch ( this.parts[j].type ) {
						case FragmentCItem.TEXT:
							tempBlockNode = (<TNode_Text>(<Fragment_Contextual_TextNode>this.parts[j]).node).ownerBlockElement();
							break;
						case FragmentCItem.NODE_START:
							tempBlockNode = (<TNode_Element>(<Fragment_Contextual_NodeStart>this.parts[j]).node).ownerBlockElement();
							break;
						case FragmentCItem.NODE_END:
							tempBlockNode = (<TNode_Element>(<Fragment_Contextual_NodeEnd>this.parts[j]).node).ownerBlockElement();
							break;
					}

					if ( tempBlockNode == currentBlockNode ) {
						subLength++;
					} else {
						break;
					}

				}

				// make subgroup
				for ( k=i; k<i+subLength; k++ ) {
					currentSet.push( this.parts[k] );
				}

				// This IF FUCKING ATE MY SOUL BECAUSE THE TR ELEMENTS SHOULD BE TREATED SPECIAL!!!
				if ( !( <any>currentSet.length == 2 && (<any>currentSet[0]).node.is() == 'tr' ) ) {
					
					ranges.push( {
						"parent": currentBlockNode,
						"set": currentSet
					} );

				}

				i += subLength - 1;

				previousBlockNode = currentBlockNode;

			}

		}

		for ( i=0, len = ranges.length; i<len; i++ ) {
			returnValue.push( this.createDettachedCollection( ranges[i].set, ranges[i].parent ) );
		}

		returnValue = Helper.filter( returnValue, function( item ) { return item != null; } );

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

	public toString( format: string = 'text/html', closeTags: boolean = false ) {
		this.compute();

		var out: string[] = [ '' ],
		    stack: number = 0,
		    i: number = 0,
		    len: number = 0,
		    flush: TNode_Element[] = [];

		if ( format == 'text/html' || format == null || format == 'html' || format == '' ) {
			if ( !closeTags ) {
				for ( i=0, len = this.parts.length; i<len; i++ ) {
					out.push( this.parts[i].toString() );
				}
			} else {
				for ( i=0, len = this.parts.length; i<len; i++ ) {
					out.push( this.parts[i].toString() );
					switch ( this.parts[i].type ) {
						case FragmentCItem.TEXT:
							break;
						case FragmentCItem.NODE_START:
							stack++;
							flush.push( (<Fragment_Contextual_NodeStart>this.parts[i]).node );
							break;
						case FragmentCItem.NODE_END:
							if ( stack == 0 ) {
								out.unshift( (<Fragment_Contextual_NodeEnd>this.parts[i]).node.xmlBeginning() )
							} else {
								stack--;
								flush.pop();
							}
							break;
					}
				}

				while ( flush.length > 0 ) {
					out.push( flush.pop().xmlEnding() );
				}
			}
		} else if ( format == 'text/plain' || format == 'text' ) {

			var blockNodeNames: string[] = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'tr', 'p', 'ul', 'li', 'table' ];

			for ( i=0, len = this.parts.length; i<len; i++ ) {
				switch ( this.parts[i].type ) {
					case FragmentCItem.TEXT:
						out.push( this.parts[i].toString() );
						break;
					case FragmentCItem.NODE_END:
						if ( blockNodeNames.indexOf( (<Fragment_Contextual_NodeEnd>this.parts[i]).node.nodeName ) >= 0 ) {
							out.push( "\n\n" );
						} else
						if ( (<Fragment_Contextual_NodeEnd>this.parts[i]).node.nodeName == 'td' ) {
							out.push( '\t|\t' );
						}
						break;
				}
			}
		} else throw "Invalid format. Allowed 'text/html' and 'text/plain' as first argument.";
		
		return out.join( '' );
	}

	// this should erase the contents of the fragment from the document, and mark the fragment as unusable...
	public remove() {
		this.compute();
		
		/* Find all the "whole" and the "partial" nodes from the fragment. */
		var wholeNodes   : Fragment_Contextual_Item[] = [],
		    partialNodes : Fragment_Contextual_Item[] = [],
		    i            : number = 0,
		    j            : number = 0,
		    len          : number = this.parts.length,
		    found        : number = null,
		    sp           : Fragment_Contextual_Item[] = [],
		    el1          : TNode_Element,
		    el2          : TNode_Element;

		// detecting nodes merging...
		for ( var spi=0, spl = this.parts.length; spi < spl; spi++ ) {
			switch ( this.parts[spi].type ) {
				case FragmentCItem.NODE_START:
					sp.push( this.parts[spi] );
					break;
				case FragmentCItem.NODE_END:
					sp.push( this.parts[spi] );
					break;
				case FragmentCItem.TEXT:
					if ( !/^([\s]+)?$/.test( this.parts[spi].toString() ) ) {
						sp.push( this.parts[spi] );
					}
					break;
			}
			if ( sp.length > 2 ) {
				break;
			}
		}

		if ( sp.length == 2 && sp[0].type == FragmentCItem.NODE_END && sp[1].type == FragmentCItem.NODE_START ) {
			el1 = (<Fragment_Contextual_NodeEnd>sp[0]).node;
			el2 = (<Fragment_Contextual_NodeStart>sp[1]).node;
			if ( el1.isMergeable && el2.isMergeable ) {
				
				for ( i=0, len = this.parts.length; i<len; i++ ) {
					if ( this.parts[i].type == FragmentCItem.TEXT ) {
						(<Fragment_Contextual_TextNode>this.parts[i]).removeSelectedText();
					}
				}

				el1.mergeWith( el2 );
				return;
			}
		}


		while ( i < len ) {

			switch ( this.parts[i].type ) {

				case FragmentCItem.TEXT:
					if ( (<Fragment_Contextual_TextNode>this.parts[i]).isWholeNode() ) {
						wholeNodes.push( this.parts[i] )
					} else {
						partialNodes.push( this.parts[i] );
					}
					i++
					break;

				case FragmentCItem.NODE_END:
					partialNodes.push( this.parts[i] );
					i++;
					break;

				case FragmentCItem.NODE_START:
					
					found = null;
					
					for ( j = i+1; j<len; j++ ) {
						if ( this.parts[j].type == FragmentCItem.NODE_END && (<Fragment_Contextual_NodeEnd>this.parts[i]).node == ( <Fragment_Contextual_NodeStart>this.parts[j] ).node ) {
							found = j;
							break;
						}
					}

					if ( found ) {
						wholeNodes.push( this.parts[i] );
						i = found + 1;
					} else {
						partialNodes.push( this.parts[i] );
						i++;
					}

					break;
			}
		}

		/* Begin removing of "whole" nodes */
		for ( i=0, len = wholeNodes.length; i<len; i++ ) {
			wholeNodes[i].removeFromDocument();
		}

		/* Begin removing of "partial" nodes. Removing of partial nodes
		   is done only by deleting the text contents from the text nodes */
		for ( i=0, len = partialNodes.length; i<len; i++ ) {
			if ( partialNodes[i].type == FragmentCItem.TEXT ) {
				(<Fragment_Contextual_TextNode>partialNodes[i]).removeSelectedText();
			}
		}

	}
}