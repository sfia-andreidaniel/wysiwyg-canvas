class TRange_Target extends Events {
	
	public target: TNode = null;
	public fragPos: number = 0;

	/* Public Methods: 
	
		// walk in document in the right direction until condition is met
		public moveRightUntil( condition: ( item: FragmentItem, index?: number ) => boolean, triggerChangeEvent: boolean = true ): boolean

		// walk in document in the left direction until condition is met
		public moveLeftUntil( condition: ( item: FragmentItem, index?: number ) => boolean, triggerChangeEvent: boolean = true ): boolean

		// walk in document chars characters. chars can be negative.
		public moveByCharacters( chars: number ): boolean

		// walk in the document words words. words can be negative.
		public moveByWords( words: number ): boolean

		// creates another target with exactly this one's values.
		public clone(): TRange_Target

		// imports values from another target to this one.
		public set( target: TRange_Target )

	 */

	constructor( target: TNode, pos: number = 0 ) {
		super();

		if ( !target ) {
			throw "ERR_BAD_TARGET";
		} else {
			this.target = target;
			this.fragPos = ~~pos;
		}
	}

	public moveRightUntil( condition: ( item: FragmentItem, index?: number ) => boolean, triggerChangeEvent: boolean = true ): boolean {
		
		var fragment: Fragment = this.target.documentElement.fragment,
		    i: number = this.fragPos,
		    len: number = fragment.length(),
		    at: FragmentItem,
		    target: TNode;

		while ( i < len ) {
			
			i++;
			
			if ( condition( fragment.at(i), i ) ) {
				
				target = this.target.documentElement.findNodeAtIndex(i);
				
				if ( !target ) {
					throw "ERR_BAD_LANDING";
				} else {
					
					this.target = target;
					
					this.fragPos = i;
					
					if ( triggerChangeEvent )
						this.fire('changed');
					
					return true;
				}
			}
		}

		return false;

	}

	private _moveRight( times: number = 1 ): boolean {

		times = ~~times;

		if ( times < 1 ) {
			return false;
		}

		var i: number = 0,
		    len: number = 0,
		    thisNode: TNode = this.target,
		    thisFrag: number = this.fragPos;

		for ( i=0; i<times-1; i++ ) {
			if ( !this.moveRightUntil( function( at: FragmentItem ) { return at == FragmentItem.EOL || at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE; }, false ) ) {
				this.target = thisNode;
				this.fragPos = thisFrag;
				return false;
			}
		}

		return this.moveRightUntil( function( at: FragmentItem ) { return at == FragmentItem.EOL || at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE; } );

	}

	private _moveRightWord( times: number = 1 ): boolean {

		times = ~~times;

		if ( times < 1 ) {
			return false;
		}

		var thisNode: TNode = this.target,
		    thisFrag: number = this.fragPos,
		    fragment: Fragment = this.target.documentElement.fragment,
		    at: FragmentItem = fragment.at( thisFrag ),
		    lastCharIndex: number = fragment.getIndexAt( FragmentPos.DOC_END );

		while ( times > 0 ) {

			// at a space or @end of a line.
			// move right until next letter. critical.
			if ( at != FragmentItem.CHARACTER ) {
				if ( !this.moveRightUntil( function( at: FragmentItem ) { return at == FragmentItem.CHARACTER; }, false ) ) {
					this.target = thisNode;
					this.fragPos = thisFrag;
					return false;
				}
			}

			// move right while characters
			if ( !this.moveRightUntil( function( at: FragmentItem, i: number ) { return at == FragmentItem.EOL || at == FragmentItem.WHITE_SPACE || i == lastCharIndex; }, false ) ) {
				this.target = thisNode;
				this.fragPos = thisFrag;
				return false;
			}

			times--;

		}

		this.fire( 'changed' );

		return true;

	}

	public moveLeftUntil( condition: ( item: FragmentItem, index?: number ) => boolean, triggerChangeEvent: boolean = true ): boolean {
		
		var fragment: Fragment = this.target.documentElement.fragment,
		    i: number = this.fragPos,
		    len: number = fragment.length(),
		    at: FragmentItem,
		    target: TNode;

		while ( i > 0 ) {
			
			i--;
			
			if ( condition( fragment.at(i), i ) ) {
				
				target = this.target.documentElement.findNodeAtIndex(i);
				
				if ( !target ) {
					throw "ERR_BAD_LANDING";
				} else {
					
					this.target = target;
					
					this.fragPos = i;
					
					if ( triggerChangeEvent )
						this.fire('changed');
					
					return true;
				}
			}
		}

		return false;

	}

	private _moveLeft( times: number = 1 ): boolean {

		times = ~~times;

		if ( times < 1 ) {
			return false;
		}

		var i: number = 0,
		    len: number = 0,
		    thisNode: TNode = this.target,
		    thisFrag: number = this.fragPos;

		for ( i=0; i<times-1; i++ ) {
			if ( !this.moveLeftUntil( function( at: FragmentItem ) { return at == FragmentItem.EOL || at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE; }, false ) ) {
				this.target = thisNode;
				this.fragPos = thisFrag;
				return false;
			}
		}

		return this.moveLeftUntil( function( at: FragmentItem ) { return at == FragmentItem.EOL || at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE; } );

	}

	private _moveLeftWord( times: number = 1 ): boolean {

		times = ~~times;

		if ( times < 1 ) {
			return false;
		}

		var thisNode: TNode = this.target,
		    thisFrag: number = this.fragPos,
		    fragment: Fragment = this.target.documentElement.fragment,
		    at: FragmentItem = fragment.at( thisFrag ),
		    firstCharIndex: number = fragment.getIndexAt( FragmentPos.DOC_BEGIN );

		while ( times > 0 ) {

			// at a space or @end of a line.
			// move left until prev letter. critical.
			if ( at != FragmentItem.CHARACTER ) {
				if ( !this.moveLeftUntil( function( at: FragmentItem ) { return at == FragmentItem.CHARACTER; }, false ) ) {
					this.target = thisNode;
					this.fragPos = thisFrag;
					return false;
				}
			}

			// move left while characters
			if ( !this.moveLeftUntil( function( at: FragmentItem, index: number ) { return at == FragmentItem.EOL || at == FragmentItem.WHITE_SPACE || index == firstCharIndex; }, false ) ) {
				this.target = thisNode;
				this.fragPos = thisFrag;
				return false;
			}

			times--;

		}

		this.fire( 'changed' );

		return true;

	}


	public moveByCharacters( chars: number ): boolean {
		chars = ~~chars;

		if ( chars == 0 ) {
			return false;
		}

		if ( chars > 0 ) {
			return this._moveRight( chars );
		} else {
			return this._moveLeft( -chars );
		}
	}

	public moveByWords( words: number ): boolean {
		words = ~~words;

		if ( words == 0 ) {
			return false;
		}

		if ( words > 0 ) {
			return this._moveRightWord( words );
		} else {
			return this._moveLeftWord( -words );
		}
	}

	public clone(): TRange_Target {
		return new TRange_Target( this.target, this.fragPos );
	}

	public set( target: TRange_Target ) {

		if ( !target ) {
			throw "ERR_INVALID_TARGET";
		} else {

			if ( target.target != this.target || this.fragPos != target.fragPos ) {
				this.target = target.target;
				this.fragPos = target.fragPos;
				this.fire( 'changed' );
			}

		}
	}

}