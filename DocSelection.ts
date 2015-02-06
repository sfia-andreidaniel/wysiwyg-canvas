class DocSelection extends Events {

	private   range         : TRange   = null;	             // the selection range. user can obtain the range via the getRange() method
	public    viewport      : Viewport = null;               // viewport for which this selection is applied

	protected stateComputer : Throttler = null;              // a throttler that computes the editor state when the selection is changed
	protected changeThrottler: Throttler = null;
	public    editorState    : Selection_EditorState = null;

	// selection is painted with two colors, depending on
	// the focus state of the viewport
	static $Colors = {
		"focus": "#3399ff",
		"blur" : "#ddddd"
	};

	constructor ( viewport: Viewport ) {
		super();
		
		this.viewport    = viewport;
		this.editorState = new Selection_EditorState( this );

		(function(me){
			
			me.stateComputer = new Throttler( function() {
				me.editorState.compute();
			}, 100);
			
			me.changeThrottler = new Throttler( function() {
				me.fire( 'changed' );
			}, 30 );
			
			me.on( 'changed', function() {
				me.onchanged();
			} );

		})(this);
	}

	// obtains an instance of the range of the selection.
	public getRange(): TRange {
		
		if ( !this.range )
			this.range = this.createRange( this.viewport.document.fragment.createTargetAt( FragmentPos.DOC_BEGIN ) );

		return this.range;

	}

	/* You should create ranges only with this method, do not use
	   the constructor of the range manually.

	   This is because events must be added on ranges and this is
	   the optimal point for doing that.
	 */

	public createRange( target: TRange_Target ): TRange {
		
		var rng = new TRange( target );

		( function( me ) {
			rng.on( 'changed', function() {
				me.viewport.document.requestRepaint();
				me.stateComputer.run();
				me.changeThrottler.run();
			} );
		})(this);

		return rng;
	}

	/* anchors the selection to the target.
	// if the target is a text node, a text selection will be made.
	// if the target is a element, an element selection will be made
	*/
	public anchorTo( target: TRange_Target ) {
		
		this.range = this.createRange( target );
		
		this.viewport.document.requestRepaint();

		this.range.fire( 'changed' );

	}

	/* selection can be focused to a target if it's anchored
	   and if the selection type is text.
	 */
	public focusTo( target: TRange_Target ) {

		var rng = this.getRange(),
		    focus: TRange_Target = rng.focusNode();


		if ( target.target.nodeType == TNode_Type.TEXT && focus ) {
			focus.set( target );
		}

	}

	// returns the length of the selection.
	// note that this value has nothing to do with the number of selected characters.
	// a null value means that is not applicable.
	// value can also be negative, depending on selection direction.
	public length(): number {
		return this.getRange().length();
	}

	// removes the contents of selection.
	public removeContents() {
		
		var range = this.getRange(),
		    atEnd: boolean = false,
		    len: number = range.length();

		range.save();

		if ( range.removeContents() ) {

			
			this.viewport.document.relayout(true);
			this.viewport.document.removeOrphanNodes();


			range.restore();
			
			if (!range.focusNode() && range.anchorNode() && range.anchorNode().target.nodeType == TNode_Type.TEXT ) {
				range.setFocusAndAnchorTo( range.anchorNode() );
			}

			range.collapse( true );

		}

	}

	/* This function is used by the default StatusBar, and *might* not treat
	   all the test cases.
	 */
	public selectByFragmentIndexes( start: number, stop: number ) {
		var nStart: TNode = this.viewport.document.findNodeAtIndex( start ),
		    nStop : TNode = this.viewport.document.findNodeAtIndex( stop ),
		    fragment: Fragment = this.viewport.document.fragment,
		    fragLen: number = fragment.length(),
		    at: FragmentItem;

		switch ( true ) {
			case nStart == nStop && nStart.nodeType == TNode_Type.TEXT:
				this.anchorTo( new TRange_Target( nStart, start ) );
				this.focusTo( new TRange_Target( nStart, stop ) );
				break;

			case ( nStart.nodeType == TNode_Type.ELEMENT && (<TNode_Element>nStart).isBlockTextNode ) || 
			     ( nStop.nodeType == TNode_Type.ELEMENT && (<TNode_Element>nStop).isBlockTextNode ) :
			case ( nStart.nodeType == TNode_Type.ELEMENT && !(<TNode_Element>nStart).isSelectable ) && 
			     ( nStop.nodeType == TNode_Type.ELEMENT && !(<TNode_Element>nStop).isSelectable ) :
				
				while ( start < fragLen && start <= stop && [ FragmentItem.WHITE_SPACE, FragmentItem.CHARACTER, FragmentItem.EOL ].indexOf( fragment.at( start ) ) == -1 ) {
					start++;
				}

				while ( stop > 0 && stop >= start && [ FragmentItem.WHITE_SPACE, FragmentItem.CHARACTER, FragmentItem.EOL ].indexOf( fragment.at( stop ) ) == -1 ) {
					stop--;
				}

				this.anchorTo( new TRange_Target( this.viewport.document.findNodeAtIndex( start ), start ) );
				this.focusTo ( new TRange_Target( this.viewport.document.findNodeAtIndex( stop ), stop + 1 ) );


				break;

			default:
				console.warn('a');
				this.anchorTo( new TRange_Target( nStart, start ) );
				break;
		}
	}

	public insertHTML( html: string ) {
		
		if ( this.getRange().length() ) {
			this.removeContents();
		}

		if ( !html ) {
			return;
		}

		var rng            : TRange = this.getRange(),
		    fragPos        : number = rng.focusNode() ? rng.focusNode().fragPos : rng.anchorNode().fragPos,
		    targetElement  : TNode = this.viewport.document.findNodeAtIndex( fragPos ),
		    s              : string,
		    s1             : string,
		    afterNode      : TNode,
		    normalized     : TNode_Collection,
		    hostElement    : TNode_Element = targetElement.hostElement(),
		    insertionPoint : TInsertionPoint,
		    cursor         : TNode_Element,
		    
		    leftSibling    : TNode_Element,
		    rightSibling   : TNode_Element,
		    i              : number,
		    len            : number,
		    j              : number,

		    unwrapAtNormalization: string[] = [];

		if ( targetElement.nodeType == TNode_Type.TEXT && (<TNode_Text>targetElement).isBR ) {
			targetElement = targetElement.parentNode;
		}

		if ( targetElement.nodeType == TNode_Type.TEXT ) {
			
			s = (<TNode_Text>targetElement).textContentsFragment( targetElement.FRAGMENT_START, fragPos - 1 );
			s1 = (<TNode_Text>targetElement).textContentsFragment( fragPos, targetElement.FRAGMENT_END );

			switch ( true ) {
				case s == '':
					if ( targetElement.previousSibling() ) {
						afterNode = targetElement.previousSibling();
					} else {
						afterNode = this.viewport.document.createTextNode( '' );
						targetElement.parentNode.appendChild( afterNode, targetElement.siblingIndex );
					}
					break;
				case s1 == '':
					afterNode = targetElement;
					break;
				default:
					(<TNode_Text>targetElement).textContents( s );
					targetElement.parentNode.appendChild( this.viewport.document.createTextNode( s1 ), targetElement.siblingIndex + 1 );
					afterNode = targetElement;
					break;
			}

			hostElement = afterNode.hostElement();

		} else {

			afterNode = targetElement;

			hostElement = afterNode.hostElement();

		}

		cursor = afterNode.parentNode;

		while ( cursor != hostElement ) {
			
			if ( cursor.style.display() == 'inline' )
				unwrapAtNormalization.push( cursor.is() );
			
			cursor = cursor.parentNode;
		}

		normalized = this.viewport.document.createCollectionFromHTMLText( html ).normalizeForHost( hostElement.nodeName, unwrapAtNormalization );

		// no html or failed to parse HTML
		if ( !normalized.length ) {
			return;
		}


		if ( normalized.normalizedInlineStartNodes + normalized.normalizedInlineEndNodes < normalized.length ) {

			if ( afterNode.parentNode != hostElement ) {
					
				// make a surgery upto the host.
				insertionPoint = afterNode.cutDown( [ ( afterNode.hostElement().parentNode || afterNode.documentElement ).is() ] );

			} else {

				insertionPoint = {
					"element": hostElement,
					"index": afterNode.siblingIndex + 1
				}

			}


		} else {
			
			// make a surgery inside the host
			// insert all nodes in a raw after the afterNode.

			insertionPoint = {
				"element": afterNode.parentNode,
				"index": afterNode.siblingIndex + 1
			}

			//console.warn( 'insertion point is: ' + insertionPoint.element.xmlBeginning(), "index:" + insertionPoint.index );

		}

		leftSibling = ( <TNode_Element>insertionPoint.element.childNodes[ insertionPoint.index - 1 ] ) || null;
		rightSibling= ( <TNode_Element>insertionPoint.element.childNodes[ insertionPoint.index ] ) || null;

		// insert normalizedinlinestartnodes
		for ( i=0; i<normalized.normalizedInlineStartNodes; i++ ) {
			if ( leftSibling ) {
				if ( leftSibling.nodeType == TNode_Type.TEXT ) {
					insertionPoint.element.appendChild( normalized.at( i ), insertionPoint.index );
					insertionPoint.index++;
				} else {
					leftSibling.appendChild( normalized.at( i ) );
				}
			} else {
				insertionPoint.element.appendChild( normalized.at( i ) );
				insertionPoint.index++;
			}
		}


		// insert normalizedmiddlenodes

		len = normalized.length - normalized.normalizedInlineStartNodes - normalized.normalizedInlineEndNodes;

		//console.warn( len, normalized.normalizedInlineStartNodes, normalized.normalizedInlineEndNodes, normalized.length, insertionPoint.element );

		for ( i = normalized.normalizedInlineStartNodes; i < normalized.normalizedInlineStartNodes + len; i++ ) {
			//console.warn( 'append: ', normalized.at( i ) );
			insertionPoint.element.appendChild( normalized.at( i ), insertionPoint.index );
			insertionPoint.index++;
		}

		j = 0;

		for ( i = normalized.length - normalized.normalizedInlineEndNodes; i<normalized.length; i++ ) {
			if ( !rightSibling || rightSibling.nodeType == TNode_Type.TEXT ) {
				insertionPoint.element.appendChild( normalized.at( i ) );
			} else {
				rightSibling.appendChild( normalized.at( i ), j );
				j++;
			}
		}


		if ( hostElement.parentNode ) {
			hostElement.parentNode.removeOrphanNodes();
		} else {
			hostElement.removeOrphanNodes();
		}

		this.viewport.document.relayout( true );

		rng.focusNode().fragPos = ( normalized.at(  normalized.length - 1 ) ).FRAGMENT_END + 1;
		rng.focusNode().target  = this.viewport.document.findNodeAtIndex( rng.focusNode().fragPos );

		rng.focusNode().moveLeftUntilCharacterIfNotLandedOnText();
		rng.collapse( true );

		rng.fire( 'changed' );

	}

	public toString(): string {
		var range = this.getRange();

		if ( range.focusNode() && range.anchorNode() ) {
			return range.createContextualFragment().toString( 'text/html', true );
		} else {
			return (<TNode_Element>range.anchorNode().target).nodeType == TNode_Type.ELEMENT
				? (<TNode_Element>range.anchorNode().target).outerHTML()
				: '';
		}
	}

	public onchanged() {
		var clipboard = Clipboard.singleton(),
		    element = clipboard.activeElement;

		if ( element == this.viewport.canvas && clipboard.trap.parentNode ) {
			clipboard['trap'].value = this['toString']();
			clipboard['trap']['select']();
		}
	}

}