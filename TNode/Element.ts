class TNode_Element extends TNode {

	public childNodes: TNode[] = [];
	public style: TStyle;
	public nodeType: TNode_Type = TNode_Type.ELEMENT;
	public nodeName: string = '';

	constructor() {
		super();
		this.style = new TStyle( this );
	}

	public appendChild( node: TNode, index: number = null ): TNode {
		if ( index === null ) {
			node.remove();
			index = this.childNodes.length;
			this.childNodes.push( node.remove() );
		} else {
			if ( index < 0 ) {
				index = 0;
			} else if ( index > this.childNodes.length ) {
				index = this.childNodes.length;
			}
			node.remove();
			this.childNodes.splice( index, 0, node );
		}
		node.parentNode = this;

		for ( var i=index, len = this.childNodes.length; i<len; i++ ) {
			this.childNodes[i].siblingIndex = i;
		}

		this.requestRelayout();
		
		return node;
	}

	public removeChild( node: TNode ): TNode {
		for ( var i=0, len = this.childNodes.length; i<len; i++ ) {
			if ( this.childNodes[i] == node ) {
				
				this.childNodes.splice( i, 1 );
				
				for ( var j=i; j<len; j++ ) {
					this.childNodes[j].siblingIndex = j;
				}
				
				this.requestRelayout();
				
				return node;
			}
		}
		throw "ERR_NODE_NOT_FOUND";
	}

	/* Weather painting this element is inside of a box, or this element
	   is painted as a text line */

	public hasLayout(): boolean {
		return this.style.display() == 'block' ||
			   this.style.float() != '';
	}

	public createLayout( useParentLayout: Layout = null ): Layout {

		var left: Layout_Block[] = [],
		    center: Layout_Block[] = [],
		    right: Layout_Block[] = [],
		    argIndex: number = 0,
		    i: number,
		    len: number,
		    returnValue: Layout;

		this.evaluateLayout( left, center, right, argIndex );

		switch ( true ) {

			case center.length == 0 && left.length == 0 && right.length == 0:
				/* The node is empty */
				if ( this.hasLayout() ) {
					returnValue = new Layout_Block( this );
				} else {
					returnValue = new Layout_BlockChar();
				}
				break;

			case center.length > 0 && left.length == 0 && right.length == 0:

				/* Return a Layout_Vertical if center.length > 1 or center[0] if center.length == 1; */
				returnValue = new Layout_Vertical( this, center );

				break;

			case ( left.length > 0 || right.length > 0 ) && center.length == 0:

				/* Return a Layout_Horizontal, containing the left cells combined with the right cells */

				for ( i=0, len = right.length; i<len; i++ ) {
					left.push( right[i] );
				}

				returnValue = new Layout_Horizontal( this, left );

				break;

			case ( left.length > 0 || right.length > 0 ) && center.length > 0:

				var cells: Layout[] = [];

				if ( left.length ) {
					cells.push( left.length == 1 ? left[0] : new Layout_Horizontal( null, left ) );
				}

				if ( center.length ) {
					cells.push( new Layout_Vertical( null, center ) );
				}

				if ( right.length ) {
					cells.push( right.length == 1 ? right[0] : new Layout_Horizontal( null, right ) );
				}

				returnValue = new Layout_Horizontal( this, cells );

				break;

			default:
				throw "Unhandled layout variant!";
				break;

		}

		if ( useParentLayout ) {
			returnValue.parent = useParentLayout;
		}

		returnValue.buildAhead( useParentLayout );

		return returnValue;

	}

	public evaluateLayout( left: Layout_Block[], center: Layout_Block[], right: Layout_Block[], argIndex: number = 0 ): number {
		var i: number = 0,
		    len: number = this.childNodes.length,
		    oldArgIndex: number = argIndex,
		    currentArgIndex: number = argIndex,
		    j: number = 0,
		    n: number = 0,
		    layoutType: string = '',
		    lblock: Layout_Block,
		    lchar: Layout_BlockChar;

		for ( i=0, len = this.childNodes.length; i<len; i++ ) {
			
			if ( this.childNodes[i].nodeType == TNode_Type.TEXT ) {
				currentArgIndex = 1;
				layoutType = 'Layout_BlockChar';
			
			} else {
				
				switch ( true ) {
					case (<TNode_Element>this.childNodes[i]).style.display() == 'block' && ['left', 'right'].indexOf( (<TNode_Element>this.childNodes[i]).style.float() ) == -1:
						layoutType = 'Layout_Block';
						currentArgIndex = 1;
						break;
					case (<TNode_Element>this.childNodes[i]).style.float() == 'left':
						layoutType = 'Layout_Block';
						currentArgIndex = 0;
						break;
					case (<TNode_Element>this.childNodes[i]).style.float() == 'right':
						layoutType = 'Layout_Block';
						currentArgIndex = 2;
						break;
					default:
						layoutType = 'Layout_BlockChar';
						currentArgIndex = 1;
						break;
				}

			}

			switch ( layoutType ) {

				case 'Layout_BlockChar':
					
					if ( currentArgIndex != oldArgIndex ) {
					
						lchar = new Layout_BlockChar();
						center.push( lchar );
					
					} else {
					
						lchar = <Layout_BlockChar>( ( function() {

								if ( center[ center.length - 1 ] && center[ center.length - 1 ].hasChars ) {
									return center[ center.length - 1 ];
								} else {
									return null;
								}

							} )() || ( function() {
								lchar = new Layout_BlockChar();
								center.push( lchar );
								return lchar;
						} )() );
					
					}
					
					if ( this.childNodes[i].nodeType == TNode_Type.TEXT ) {
						lchar.addTextNode( <TNode_Text>this.childNodes[i] );
					} else {
						currentArgIndex = (<TNode_Element>this.childNodes[i]).evaluateLayout( left, center, right, currentArgIndex );
					}

					break;

				case 'Layout_Block':
					lblock = new Layout_Block( <TNode_Element>this.childNodes[i] );
					switch ( currentArgIndex ) {
						case 0:
							left.push( lblock );
							break;
						case 1:
							center.push( lblock );
							break;
						case 2:
							right.push( lblock );
							break;
					}
					break;
			}

			oldArgIndex = currentArgIndex;
		}

		return currentArgIndex;
	}

	public innerHTML( setter: string = null ): string {
		if ( setter === null ) {
			// getter
			if ( !this.childNodes.length ) {
				return '';
			} else {
				var out: string[] = [];
				for ( var i=0, len = this.childNodes.length; i<len; i++ ) {
					if ( this.childNodes[i].nodeType == TNode_Type.TEXT ) {
						out.push( ( <TNode_Text>this.childNodes[i] ).escape() );
					} else {
						out.push( ( <TNode_Element>this.childNodes[i] ).outerHTML() );
					}
				}
				return out.join( '' );
			}
		} else {
			throw "node.innerHTML: Setter not implemented yet!";
		}
	}

	public outerHTML( setter: string = null ) {
		if ( setter === null ) {
			// getter
			if ( this.childNodes.length ) {
				return '<' + this.nodeName + '>' + this.innerHTML() + '</' + this.nodeName + '>';
			} else {
				return '<' + this.nodeName + ' />';
			}
		} else {
			throw "node.outerHTML: Setter not implemented yet!";
		}
	}

	public requestRelayout() {
		if ( this.documentElement ) {
			this.documentElement.needRelayout = true;
		}
	}

	public requestRepaint( originatingElement: TNode_Element = null ) {
		if ( this.documentElement ) {
			this.documentElement.requestRepaint();
		}
	}

}