class HTML_BreakElement extends TNode_Element {
	
	public isSelfClosingTag: boolean = true;


	constructor() {
		super();
		this.nodeName = 'br';
		this.style.display('inline');
		this.childNodes.push( new TNode_TextBreak(this) );
	}

	public removeOrphanNodes() {
		// void, intentionally.
	}

	// text written inside of a break element will be appended after the break element.
	public appendTextAfter( s: string ) {
		console.warn( "Append text after break: " + JSON.stringify( s ) );
		this.nextAvailableTextNode().textContents( s, true );
	}

	// disable append child and remove child.
	public appendChild( node: TNode, index: number = null ): TNode {
		return null;
	}

	public removeChild( node: TNode ): TNode {
		return null;
	}

	public nextAvailableTextNode(): TNode_Text {
		var cursor = this.nextSibling(),
		    node: TNode_Text = null,
		    deep: number = 0;

		while ( cursor ) {
			if ( cursor.nodeType == TNode_Type.TEXT ) {
				return <TNode_Text>cursor;
			} else {
				// if the next element is a break element, we create a text node and append it after this break element
				if ( (<TNode_Element>cursor).nodeName == 'br' ) {
					node = this.documentElement.createTextNode('');
					this.parentNode.appendChild( node, this.siblingIndex + 1 );
					break;
				} else {
					if ( (<TNode_Element>cursor).childNodes && (<TNode_Element>cursor).childNodes.length ) {
						deep++;
						cursor = (<TNode_Element>cursor).childNodes[0];
					} else {
						if ( deep > 0 ) {
							cursor = cursor.parentNode.nextSibling();
							deep--;
						} else {
							break;
						}
					}
				}
			}
		}

		if ( !node ) {
			node = this.documentElement.createTextNode( '' );
			this.parentNode.appendChild( node, this.siblingIndex + 1 );
		}

		return node;
	}

	public xmlBeginning(): string {
		return '<br/>';
	}

	public xmlEnding(): string {
		return '';
	}

	public outerHTML( s: string = null ): string {
		if ( s !== null ) {
			return super.outerHTML();
		} else return '<br/>';
	}

	public innerHTML( s: string = null ): string {
		if ( s === null ) {
			return '';
		} else {
			return '';
		}
	}

	public createSurgery( atFragmentIndex: number, createNodeAfter: boolean = true, nodeNameAfter: string = null ): number {
		throw "ERR_SURGERY_DENIED";
	}

	public allTextNodes(): TNode_Text[] {
		return [];
	}

}