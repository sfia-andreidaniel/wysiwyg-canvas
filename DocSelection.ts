class DocSelection extends Events {

	private   range         : TRange   = null;	             // the selection range. user can obtain the range via the getRange() method
	public    viewport      : Viewport = null;               // viewport for which this selection is applied

	protected stateComputer : Throttler = null;              // a throttler that computes the editor state when the selection is changed
	protected changeThrottler: Throttler = null;
	public    editorState   : Selection_EditorState = null;

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

		if ( range.removeContents() ) {

			this.viewport.document.removeOrphanNodes();

			this.viewport.document.relayout(true);

			range.collapse( len < 0 );

			range.moveRightUntilCharacterIfNotLandedOnText();

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
				this.focusTo ( new TRange_Target( this.viewport.document.findNodeAtIndex( stop ), stop ) );


				break;

			default:
				console.warn('a');
				this.anchorTo( new TRange_Target( nStart, start ) );
				break;
		}
	}

}