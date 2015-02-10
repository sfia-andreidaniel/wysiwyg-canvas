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

	/* These should be removed in the future or optimized better */
	private moveRightOnceIfInsideBR() {
		if ( this.target.nodeType == TNode_Type.TEXT && (<TNode_Text>this.target).isBR ) {
			this.moveRightUntil( function(at) {
				return at==FragmentItem.EOL || at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE;
			}, false );
		}
	}

	private moveLeftOnceIfInsideBR() {
		if ( this.target.nodeType == TNode_Type.TEXT && (<TNode_Text>this.target).isBR ) {
			this.moveLeftUntil( function(at) {
				return at==FragmentItem.EOL || at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE;
			}, false );
		}
	}

	public moveLeftUntilCharacterIfNotLandedOnText() {
		var at: FragmentItem = this.target.documentElement.fragment.at( this.fragPos );
		if ( at == FragmentItem.NODE_START || at == FragmentItem.NODE_END ) {
			this.moveLeftUntil( function( at ) {
				return at == FragmentItem.EOL || at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE;
			} );

		}
	}

	public moveRightUntilCharacterIfNotLandedOnText() {
		var at: FragmentItem = this.target.documentElement.fragment.at( this.fragPos );
		if ( at == FragmentItem.NODE_START || at == FragmentItem.NODE_END ) {
			this.moveRightUntil( function( at ) {
				return at == FragmentItem.EOL || at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE;
			} );
			
		}
	}

	private _moveRight( times: number = 1, ignoreEOL: boolean = false ): boolean {

		times = ~~times;

		if ( times < 1 ) {
			return false;
		}

		var i: number = 0,
		    len: number = 0,
		    thisNode: TNode = this.target,
		    thisFrag: number = this.fragPos;

		for ( i=0; i<times-1; i++ ) {
			if ( !this.moveRightUntil( 
					function( at: FragmentItem ) {return at == FragmentItem.EOL || at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE; }, false ) ) {
				this.target = thisNode;
				this.fragPos = thisFrag;
				return false;
			}
		}

		if ( this.moveRightUntil( function( at: FragmentItem ) { return ( !ignoreEOL && at == FragmentItem.EOL ) || at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE; } ) ) {
			this.moveRightOnceIfInsideBR();
			return true;
		} else {
			return false;
		}

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

	private _moveLeft( times: number = 1, ignoreEOL: boolean = false ): boolean {

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

		if ( this.moveLeftUntil( function( at: FragmentItem ) { return ( !ignoreEOL && at == FragmentItem.EOL ) || at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE; } ) ) {
			this.moveLeftOnceIfInsideBR();
			return true;
		} else {
			return false;
		}
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


	public moveByCharacters( chars: number, ignoreEOL: boolean = false ): boolean {
		chars = ~~chars;

		if ( chars == 0 ) {
			return false;
		}

		if ( chars > 0 ) {
			return this._moveRight( chars, ignoreEOL );
		} else {
			return this._moveLeft( -chars, ignoreEOL );
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

	// return the line index of the target in the master document
	public getLineIndex(): number {
		
		var lines: Character_LinesCollection,
		        i: number = 0,
		      len: number = 0,
		     line: Character_Line;

		if ( this.target.nodeType == TNode_Type.TEXT ) {
			
			lines = this.target.documentElement.lines;
			len   = lines.length();

			for ( i=0; i<len; i++ ) {
				line = lines.at(i);
				if ( line.fragmentIndexStart <= this.fragPos && line.fragmentIndexEnd >= this.fragPos ) {
					return i;
				}
			}

		}

		return null;
	}

	// returns the details of the target
	public details(): TargetDetails {

		if ( this.target.nodeType !== TNode_Type.TEXT ) {
			return null;
		}

		var lines: Character_LinesCollection  = this.target.documentElement.lines,
			lineIndex: number                 = this.getLineIndex(),
			line: Character_Line              = lines.at(lineIndex),
			layout: Layout_BlockChar          = line.owner,
			ownerNode: TNode_Element          = layout.ownerNode(),
			align: string                     = ownerNode.style.textAlign() || 'left',
			lineHeight: number                = ownerNode.style.lineHeight() || 0,
			paintX: number                    = 0,
			paintY: number                    = 0,
			useWordGap: boolean               = false,
			
			i: number = 0,
			len: number = 0,
			j: number = 0,
			n: number = 0,
			size: number[] = [0,0],

			charIndex = 0,

			c: Character,
			charIndex: number = 0,

			firstFragPos: number = 0,
			currentFragPos: number = null,
			startPaintX: number = 0;

		switch ( align ) {
			case 'justified':
				useWordGap = true;
			case 'left':
				paintX = 0;
				break;
			case 'right':
				paintX = line.maxWidth - line.size[0];
				break;
			case 'center':
				paintX = ( line.maxWidth / 2 ) - ( line.size[0] / 2 );
				break;
		}

		startPaintX = paintX;

		for ( i=0, len = line.index - layout.lineIndexStart; i<len; i++ ) {
			paintY += ( lines.at( layout.lineIndexStart + i ).size[1] * lineHeight );
		}
		for ( i=0, len = line.words.length; i<len; i++ ) {
			
			for ( j = 0, n = line.words[i].characters.length; j<n; j++ ) {
				
				c = line.words[i].characters[j];

				if ( ( currentFragPos = c.fragmentPosition() ) == this.fragPos ) {

					/* Finally, found the character */
					return {
						"paintAbsolute": {
							"x": layout.offsetLeft + paintX,
							"y": layout.offsetTop  + paintY
						},
						"paintRelative": {
							"x": paintX,
							"y": paintY
						},
						"lineIndex": lineIndex,
						"charIndex": charIndex
					};

				} else {
					if ( firstFragPos === null ) {
						firstFragPos = currentFragPos;
					}
				}

				size = c.computeSize();
				paintX += size[0];
				
				charIndex++;
			}

			if ( useWordGap ){
				paintX += line.wordGap;
			}
		}

		if ( this.fragPos < firstFragPos ) {
			paintX = startPaintX;
			charIndex = 0;
		}

		return {
			"paintAbsolute": {
				"x": layout.offsetLeft + paintX,
				"y": layout.offsetTop  + paintY
			},
			"paintRelative": {
				"x": paintX,
				"y": paintY
			},
			"lineIndex": lineIndex,
			"charIndex": charIndex
		}


	}

}