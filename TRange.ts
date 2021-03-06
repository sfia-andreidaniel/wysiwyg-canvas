class TRange extends Events {
	
	protected _anchorNode: TRange_Target = null;
	protected _focusNode : TRange_Target = null;

	protected _anchorLock: Fragment_CaretLock = null;
	protected _focusLock : Fragment_CaretLock = null;

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
	public collapse( atEnd: boolean = false ): TRange {
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

		return this;
		
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
		
		if ( !this.isMultiRange() ) {
			return this._focusNode === null && this._anchorNode.target === node;
		} else {
			return (<HTML_MultiRange>this._anchorNode.target).childNodes.indexOf( node ) >= 0;
		}

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

		if ( this.isMultiRange() ) {

			return new Fragment_Contextual_MultiRange( this._anchorNode.target.documentElement.fragment, <HTML_MultiRange>(this._anchorNode.target), (<HTML_MultiRange>(this._anchorNode.target)).childNodes.length == 0 );

		} else {
			
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

	}

	/* Note: DO NOT USE THIS METHOD DIRECTLY.
	   
	   Instead, use Selection.removeContents, as that method should
	   invalidate this range after deletion and create another valid
	   range.
	 */
	public removeContents(): boolean {

		if ( this.isMultiRange() ) {

			var fragment: Fragment_Contextual = this.createContextualFragment();

			fragment.remove();

			return true;

		} else {

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

	}

	public affectedBlockNodes(): TNode_Element[] {

		if ( this.isMultiRange() ) {

			return this.createContextualFragment().affectedBlockNodes();

		} else {
		
			if ( !this._focusNode || !this.length() ) {
				return [ (<TNode_Element>this._anchorNode.target).ownerBlockElement() ];
			}

			return this.createContextualFragment().affectedBlockNodes();
		}

	}

	public save(): TRange {

		if ( this.isMultiRange() ) {
			return this;
		}

		var fragment: Fragment = this._anchorNode.target.documentElement.fragment;

		if ( this._focusNode ) {

			this._focusLock  = new Fragment_CaretLock( 
				fragment, 
				this._focusNode.fragPos,
				this._focusNode.fragPos <= this._anchorNode.fragPos 
					? CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT 
					: CaretLockDirection.FROM_ENDING_OF_DOCUMENT ,
				'Focus'
			);
			
			this._anchorLock = new Fragment_CaretLock( 
				fragment, 

				this._anchorNode.fragPos,

				!this.length()
					? this._focusLock.direction
					: (
						this._focusLock.direction == CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT 
							? CaretLockDirection.FROM_ENDING_OF_DOCUMENT 
							: CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT
					),

				'Anchor'
			);

			//console.info( 'Focus: ' + this._focusLock.direction + ', Anchor: ' + this._anchorLock.direction );

		} else {

			this._anchorLock = new Fragment_CaretLock( fragment, this._anchorNode.fragPos, CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT, 'Anchor' );
			this._focusLock  = null;

			//console.info( 'Anchor: ' + this._anchorLock.direction );
		}

		return this;

	}

	public restore(): TRange {

		if ( this.isMultiRange() ) {
			return this;
		}

		this._anchorNode.target.documentElement.relayout(true);

		if ( this._focusNode ) {

			if ( !this._focusLock ) {
				throw "ERR_TRANGE: nothing to restore";
			} else {
				this._focusNode.set( this._focusLock.getTarget() );
			}
		}

		if ( this._anchorNode ) {
			if ( !this._anchorLock ) {
				throw "ERR_TRANGE: nothing to restore!";
			} else {
				this._anchorNode.set( this._anchorLock.getTarget() );
			}
		}

		return this;
	}

	public debug(): TRange {
		if ( this._focusNode ) {
			console.info( 'Focus @' + this._focusNode.fragPos + ', Anchor @ ' + this._anchorNode.fragPos );
		} else {
			console.info( 'Anchor @ ' + this._anchorNode.fragPos );
		}
		return this;
	}

	public affectedRanges(): Fragment_Batch {

		if ( this.isMultiRange() ) {

			this._anchorNode.target.documentElement.lockTables();

			return new Fragment_Batch(
				this,
				this.createContextualFragment().affectedRanges()
			);

		} else {

			this.save();
			this._anchorNode.target.documentElement.lockTables();

			if ( !this._focusNode || !this.length() ) {
				return new Fragment_Batch( this, [] );
			} else {
				return new Fragment_Batch( 
					this, 
					this.createContextualFragment().affectedRanges()
				);
			}

		}

	}

	/* These methods MIGHT be removed in the future, if better ways will be found
	 */

	public setAnchorAsFocus() {
		
		if ( !this.isMultiRange() ) {

			if ( this._focusNode ) {
				this._anchorNode.target = this._focusNode.target;
				this._anchorNode.fragPos = this._anchorNode.fragPos;
				this.fire( 'changed' );
			}

		}
	}

	public setFocusAsAnchor() {

		if ( !this.isMultiRange() ) {
			if ( this._focusNode ) {
				this._focusNode.target = this._anchorNode.target;
				this._focusNode.fragPos = this._anchorNode.fragPos;
				this.fire( 'changed' );
			}
		}
	}

	public setFocusAndAnchorTo( target: TRange_Target ) {
		this._anchorNode = this.cloneTarget( target );

		if ( !this.isMultiRange() ) {
			this._focusNode = this.cloneTarget( target );
		} else {
			this._focusNode = null;
		}

		this.fire( 'changed' );
	}

	public moveRightUntilCharacterIfNotLandedOnText() {
		if ( this._focusNode && !this.isMultiRange() ) {
			this._focusNode.moveRightUntilCharacterIfNotLandedOnText();
			this._anchorNode.fragPos = this._focusNode.fragPos;
			this._anchorNode.target = this._focusNode.target;
		}
	}

	public moveLeftUntilCharacterIfNotLandedOnText() {
		if ( this._focusNode && !this.isMultiRange() ) {
			this._focusNode.moveLeftUntilCharacterIfNotLandedOnText();
			this._anchorNode.fragPos = this._focusNode.fragPos;
			this._anchorNode.target = this._focusNode.target;
		}
	}

	public isMultiRange(): boolean {
		return this._anchorNode && this._anchorNode.target.is() == 'multirange';
	}

	public isOrphan(): boolean {
		return this._anchorNode && this._anchorNode.target.isOrphanElement();
	}

	public becomeTableRectRange(): boolean {
		if ( this.isMultiRange() ) {

			var newTarget: HTML_MultiRange_TableRect;

			switch ( (<HTML_MultiRange>this._anchorNode.target).role ) {
				case 'table-selection':
					return true;
					break;
				case 'table-row':
					newTarget = (<HTML_MultiRange_TableRow>this._anchorNode.target).becomeTableRectRange();
					if ( newTarget ) {
						this._anchorNode.target = newTarget;
						return true;
					} else {
						return false;
					}
					break;
				case 'table-column':
					newTarget = (<HTML_MultiRange_TableColumn>this._anchorNode.target).becomeTableRectRange();
					if ( newTarget ) {
						this._anchorNode.target = newTarget;
						return true;
					} else {
						return false;
					}
					break;
				default:
					return false;
			}

		} else {
			return false;
		}
	}

}