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
					me.fire( 'changed' );
				});
			}

			if ( me._focusNode ) {
				me._focusNode.on('changed', function() {
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

	// a null value represents that the length is not available for this range
	public length(): number {
		if ( this._focusNode === null ) {
			return null;
		} else {
			return this._focusNode.fragPos - this._anchorNode.fragPos;
		}
	}

	// set selection to focusNode (atEnd = true) or anchorNode (atEnd = false).
	public collapse( atEnd: boolean = false ) {
		if ( atEnd ) {

			if ( this._focusNode ) {
				this._anchorNode = this.cloneTarget( this._focusNode );
			}

		} else {

			if ( this._focusNode ) {
				this._focusNode = this.cloneTarget( this._anchorNode );
			}

		}
		
		this.fire('changed');
		
	}


	private cloneTarget( fromTarget: TRange_Target ): TRange_Target {

		var target = fromTarget.clone();

		(function(me){
			target.on('changed', function() {
				me.fire('changed');
			});
		})(this);

		return target;
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

	// if the range has anchor and focus, return the common parent of the nodes of the
	// range. otherwise return the parent node of the range.
	public getCommonParent(): TNode_Element {
		if ( this._focusNode === null ) {
			return this._anchorNode.target.parentNode;
		} else {
			if ( this._anchorNode.target == this._focusNode.target ) {
				return this._anchorNode.target.parentNode;
			} else {
				var parentsA: TNode_Element[] = [],
				    parentsB: TNode_Element[] = [],
				    i: number = 0,
				    cursor: TNode_Element,
				    found = null;

				cursor = this._anchorNode.target.parentNode;

				while ( cursor ) {
					parentsA.unshift( cursor );
					cursor = cursor.parentNode;
				}

				cursor = this._focusNode.target.parentNode;

				while ( cursor ) {
					parentsB.unshift( cursor );
					cursor = cursor.parentNode;
				}

				i = 0;

				while ( parentsA[i] && parentsB[i] && parentsA[i] === parentsB[i] ) {
					found = parentsA[i];
					i++;
				}

				return found;

			}
		}
	}

	public createContextualFragment(): Fragment_Contextual {
		if ( this._focusNode === null ) {
			return new Fragment_Contextual( this._anchorNode.target.documentElement.fragment, this._anchorNode.target.FRAGMENT_START, this._anchorNode.target.FRAGMENT_END, false );
		} else {

			var minIndex: number = Math.min( this._focusNode.fragPos, this._anchorNode.fragPos ),
			    maxIndex: number = Math.max( this._focusNode.fragPos, this._anchorNode.fragPos ),
			    isEmpty: boolean = minIndex == maxIndex;

			if ( this._focusNode.fragPos > this._anchorNode.fragPos ) {
				maxIndex--;
			}

			maxIndex += ( this._focusNode.fragPos < this._anchorNode.fragPos ? -1 : 0 );

			return new Fragment_Contextual( this._anchorNode.target.documentElement.fragment, minIndex, maxIndex, isEmpty );
		}
	}

	/* Note: DO NOT USE THIS METHOD DIRECTLY.
	   
	   Instead, use Selection.removeContents, as that method should
	   invalidate this range after deletion and create another valid
	   range.
	 */
	public removeContents(): boolean {
		if ( this._focusNode === null ) {
			
			this._anchorNode.target.remove();

			return true;
		
		} else {
		
			if ( this.length() !== null ) {

				var fragment: Fragment_Contextual = this.createContextualFragment();

				fragment.remove();

				return true;

			} else {
			
				return false;
			
			}

		}
	}

	public affectedBlockNodes(): TNode_Element[] {

		if ( !this._focusNode || !this.length() ) {
			return [ (<TNode_Element>this._anchorNode.target).ownerBlockElement() ];
		}

		return this.createContextualFragment().affectedBlockNodes();

	}

	/* These methods MIGHT be removed in the future, if better ways will be found
	 */

	public setAnchorAsFocus() {
		if ( this._focusNode ) {
			this._anchorNode.target = this._focusNode.target;
			this._anchorNode.fragPos = this._anchorNode.fragPos;
			this.fire( 'changed' );
		}
	}

	public setFocusAsAnchor() {
		if ( this._focusNode ) {
			this._focusNode.target = this._anchorNode.target;
			this._focusNode.fragPos = this._anchorNode.fragPos;
			this.fire( 'changed' );
		}
	}

	public setFocusAndAnchorTo( target: TRange_Target ) {
		this._focusNode = this.cloneTarget( target );
		this._anchorNode = this.cloneTarget( target );
		this.fire( 'changed' );
	}

	public moveRightUntilCharacterIfNotLandedOnText() {
		if ( this._focusNode ) {
			this._focusNode.moveRightUntilCharacterIfNotLandedOnText();
			this._anchorNode.fragPos = this._focusNode.fragPos;
			this._anchorNode.target = this._focusNode.target;
		}
	}

	public moveLeftUntilCharacterIfNotLandedOnText() {
		if ( this._focusNode ) {
			this._focusNode.moveLeftUntilCharacterIfNotLandedOnText();
			this._anchorNode.fragPos = this._focusNode.fragPos;
			this._anchorNode.target = this._focusNode.target;
		}
	}


}