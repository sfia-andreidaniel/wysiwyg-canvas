class DocSelection extends Events {

	public range: TRange = null;

	constructor ( public viewport: Viewport ) {
		super();
	}

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

			// resync the caret position if needed.
			// TODO. Depending on len, walk right or left if current char is a beginning or ending of an element

		}
	}

}