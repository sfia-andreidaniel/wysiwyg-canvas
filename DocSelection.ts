class DocSelection extends Events {

	public range: TRange = null;

	constructor ( public viewport: Viewport ) {
		super();
	}

	public getRange(): TRange {
		
		if ( !this.range ) {
			this.range = new TRange( this.viewport.document.fragment.createTargetAt( FragmentPos.DOC_BEGIN ) );
			
			( function( me ) {
				me.range.on( 'changed', function() {
					me.viewport.document.requestRepaint();
				} );
			})(this);
		}

		return this.range;
	}

	/* anchors the selection to the target.
	// if the target is a text node, a text selection will be made.
	// if the target is a element, an element selection will be made
	*/
	public anchorTo( target: TRange_Target ) {
		
		this.range = new TRange( target );
		
		( function( me ) {
			me.range.on( 'changed', function() {
				me.viewport.document.requestRepaint();
			} );
		})(this);

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

}