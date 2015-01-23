class Fragment_Contextual {

	public start: number = 0;
	public end  : number = 0;

	public parts: Fragment_Contextual_Item[] = [];

	constructor( public fragment: Fragment, indexStart: number = 0, indexEnd: number = 0 ) {
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
		    iStop: number = 0;

		this.parts = [];

		if ( this.start == this.end ) {
			return;
		}

		for ( i = this.start; i <= this.end; i++ ) {

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
			this.parts.push( new Fragment_Contextual_TextNode( currentNode, iStart, iStop ) );
			currentNode = null;	
		}
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
	public remove(): any {
		this.compute();
		
		/* Find all the "whole" and the "partial" nodes from the fragment. */
		var wholeNodes   : Fragment_Contextual_Item[] = [],
		    partialNodes : Fragment_Contextual_Item[] = [],
		    i            : number = 0,
		    j            : number = 0,
		    len          : number = this.parts.length,
		    found        : number = null;

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