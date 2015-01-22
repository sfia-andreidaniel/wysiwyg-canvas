class TRange extends Events {
	
	protected _anchorNode: TRange_Target = null;
	protected _focusNode : TRange_Target = null;

	constructor( target: TRange_Target ) {
		super();

		if ( !target ) {
			throw "ERR_BAD_CONSTRUCTOR_ARG";
		}

		this._anchorNode = target;
		this._focusNode  = ( this._anchorNode.target.nodeType == TNode_Type.TEXT ) ? this._anchorNode.clone() : null;

		(function(me) {
			
			if ( me._anchorNode ) {
				me._anchorNode.on( 'changed', function() {
					console.log( 'anchor node changed' );
					me.fire( 'changed' );
				});
			}

			if ( me._focusNode ) {
				me._focusNode.on('changed', function() {
					console.log( 'focus node changed' );
					me.fire( 'changed' );
				} );
			}

		})( this );

	}

	public anchorNode(): TRange_Target {
		return this._anchorNode;
	}

	public focusNode(): TRange_Target {
		return this._focusNode;
	}

	public isCollapsed(): boolean {
		return this._focusNode === null || ( this._anchorNode.fragPos == this._focusNode.fragPos );
	}

	public type(): TRange_Type {
		if ( this._anchorNode.target.nodeType == TNode_Type.TEXT && this._focusNode !== null ) {
			return TRange_Type.TEXT;
		} else {
			return TRange_Type.ELEMENT;
		}
	}

	public length(): number {
		if ( this._focusNode === null ) {
			return 0;
		} else {
			return this._focusNode.fragPos - this._anchorNode.fragPos;
		}
	}

	public collapse( atEnd: boolean = false ) {
		if ( !atEnd ) {
			if ( this._focusNode !== null ) {
				this._anchorNode = this._focusNode;
				this._focusNode = null;
				this.fire( 'changed' );
			}
		} else {
			this._focusNode = null;
			this.fire('changed');
		}
	}

	public equalsNode( node: TNode_Element ): boolean {
		return this._focusNode === null && this._anchorNode.target === node;
	}

	public contains( fragmentIndex: number ) {
		
		if ( this._focusNode && this._anchorNode && !this.isCollapsed() ) {
			
			var minIndex: number = Math.min( this._focusNode.fragPos, this._anchorNode.fragPos ),
			    maxIndex: number = Math.max( this._focusNode.fragPos, this._anchorNode.fragPos );

			if ( this._focusNode.fragPos > this._anchorNode.fragPos ) {
				maxIndex--;
			}

			return fragmentIndex >= minIndex && fragmentIndex <= maxIndex + ( this._focusNode.fragPos < this._anchorNode.fragPos ? -1 : 0 );

		} else return false;
	}

}