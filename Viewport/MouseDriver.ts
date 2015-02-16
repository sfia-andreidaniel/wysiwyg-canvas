class Viewport_MouseDriver extends Events {

	public  viewport 		: Viewport 	= null;
	public  mbPressed		: boolean 	= false; // weather a mouse button is pressed
	public  mouseIsGlobal	: boolean 	= false;

	/* Scrollbar locking properties */
	public  lockedScrollbar	: number 	= null;  // 0 the vertical, 1 the horizontal, null -> no locked scrollbar

	/* Resizing properties */
	public  resizingReferencePoint	: TPoint 		= null;
	public  resizingLockTarget 		: TNode_Element = null;
	public  resizingMethod			: TResizer 		= null;
	public  resizingAspectRatio     : number        = null;
	public  resizingDelta           : TPoint        = null;
	public  resizingLastPoint       : TPoint        = null;
	
	constructor( viewport: Viewport ) {
	    
	    super();

	    this.viewport = viewport;

	    ( function( me ) {

	    	function globalMouseMove( DOMEvent ) {
	    		me.onmousemove( DOMEvent, true );
	    	}

	    	function globalMouseUp( DOMEvent ) {

	    		document.body.removeEventListener( 'mousemove', globalMouseMove, true );
	    		document.body.removeEventListener( 'mouseup', globalMouseUp, true );
 
	    		me.onmouseup( DOMEvent, true );

	    		me.mouseIsGlobal = false;
	    	}

   			me.viewport.canvas.addEventListener( typeof me.viewport.canvas.onmousewheel !== 'undefined' ? 'mousewheel' : 'wheel', function( DOMEvent ) {
				me.viewport.scrollTop( me.viewport.scrollTop() + ( ( DOMEvent.wheelDelta || -DOMEvent.deltaY ) < 0 ? 40 : -40 ) );
				DOMEvent.preventDefault();
				DOMEvent.stopPropagation();
			}, true );

			me.viewport.canvas.addEventListener( 'mousedown',  function( DOMEvent ) {
				me.onmousedown( DOMEvent );
				document.body.addEventListener( 'mousemove', globalMouseMove, true );
				document.body.addEventListener( 'mouseup', globalMouseUp, true );
				
				me.mouseIsGlobal = true;
			}, true);

			me.viewport.canvas.addEventListener( 'mousemove',  function( DOMEvent ) {
				if ( !me.mouseIsGlobal ) {
					me.onmousemove( DOMEvent );
				}
			}, true);

			me.viewport.canvas.addEventListener( 'mouseup',    function( DOMEvent ) {
				if ( !me.mouseIsGlobal ) {
					me.onmouseup( DOMEvent );
				}
			}, true);

			me.viewport.canvas.addEventListener( 'click',      function( DOMEvent ) {
				me.onmouseclick( DOMEvent );
			}, true);

			me.viewport.canvas.addEventListener( 'dblclick',   function( DOMEvent ) {
				me.onmousedblclick( DOMEvent );
			}, true );

			me.viewport.canvas.oncontextmenu = function ( DOMEvent ) {

				me.oncontextmenu( DOMEvent );

				DOMEvent.preventDefault();
				DOMEvent.stopPropagation();
				return false;
			}

		})( this );

	}

	private translateMouseEventXY( DOMEvent ): TPoint {
		return {
			"x": ( DOMEvent.offsetX || DOMEvent.layerX ) + this.viewport.scrollLeft(),
			"y": ( DOMEvent.offsetY || DOMEvent.layerY ) + this.viewport.scrollTop()
		}
	}
	public onmousedown( DOMEvent ) {

		var point: TPoint = this.translateMouseEventXY( DOMEvent );

		switch ( DOMEvent.which ) {		

			case 1: // LEFT MOUSE BUTTON
				// if the target is our viewport scrollbar, lock to scrollbar, and abort.
				switch ( true ) {
					case point.x - this.viewport.scrollLeft() >= this.viewport.width() - this.viewport._scrollbarSize:
						this.lockedScrollbar = 0;
						this.viewport.canvas.style.cursor = 'default';
						return;
						break;
					case point.y - this.viewport.scrollTop() >= this.viewport.height() - this.viewport._scrollbarSize:
						this.lockedScrollbar = 1;
						this.viewport.canvas.style.cursor = 'default';
						return;
						break;
					default:
						this.lockedScrollbar = null;
						break;
				}

				var target: TRange_Target = this.viewport.getTargetAtXY( point );
				
				if ( target ) {

					window['$1'] = target.target;

					/* If the ownerBlock of the target handles the onmousedown event, we abort
					   ulterior operations
					*/

					if ( ( target.target && target.target.nodeType == TNode_Type.TEXT &&  ( target.target.ownerBlockElement() ).onmousedown( point, 1, this ) ) ||
						 ( target.target && target.target.nodeType == TNode_Type.ELEMENT && (<TNode_Element>target.target).onmousedown( point, 1, this ) )
					) {
						break;
					}

					this.mbPressed = true;

					if ( DOMEvent.ctrlKey && target.target && target.target.firstParentOfType( 'td' ) ) {
						this.viewport.selection.anchorTo( ( ( <HTML_TableCell>( ( target.target ).firstParentOfType('td') ) ).createMultiRangeAnchorNode() ).createTarget() );
						this.viewport.canvas.style.cursor = 'url(' + UI_Resources.gif_cursorCellSelect + ') 1 1, default';
					} else {
						this.viewport.selection.anchorTo( target );
					}

					this.fire( 'refocus' );

				}

				break;

			case 3:

				/*

				var target: TRange_Target = this.viewport.getTargetAtXY( point ),
				    selection = this.viewport.selection,
				    range = selection.getRange(),
				    blocks: TNode_Element[],
				    i: number = 0,
				    len: number = 0;
				
				if ( range.length() && target.target ) {
					blocks = range.affectedBlockNodes();
					for ( i=0, len = blocks.length; i<len; i++ ) {
						if ( blocks[i] == target.target || blocks[i].containsNode( <TNode_Element>target.target ) ) {
							return;
						}
					}
				}

				if ( target ) {

					window['$1'] = target.target;

					this.viewport.selection.anchorTo( target );

					this.fire( 'refocus' );
				}

				*/


				break;

			default: // RIGHT MOUSE BUTTON
				
				DOMEvent.preventDefault();
				DOMEvent.stopPropagation();

				break;
		}
	}

	public onmousemove( DOMEvent, isFromBody: boolean = false ) {

		DOMEvent.preventDefault();
		DOMEvent.stopPropagation();

		var target: TRange_Target,
		    point : TPoint,
		    selection = this.viewport.selection,
		    rng: TRange = selection.getRange(),
		    anchor: TRange_Target,
		    focus: TRange_Target;

		if ( !isFromBody ) {
	
			point = this.translateMouseEventXY( DOMEvent );

			if ( this.lockedScrollbar !== null ) {
				this.onhandlescrollbar( point );
				return;
			} else
			if ( this.resizingLockTarget !== null ) {
				this.handleResize( point );
			} else {
				target = this.viewport.getTargetAtXY( point );
			}

		} else {

			var rectObject = this.viewport.canvas.getBoundingClientRect(),
			    point = { 
			         	"x": DOMEvent.clientX - rectObject.left, 
			         	"y": DOMEvent.clientY - rectObject.top
			    };

			if ( this.lockedScrollbar !== null ) {
				this.onhandlescrollbar( point );
				return;
			} else
			if ( this.resizingLockTarget !== null ) {
				this.handleResize( point );
				return;
			} else {
				point.x += this.viewport.scrollLeft();
				point.y += this.viewport.scrollTop();
			}

			target = this.viewport.getTargetAtXY( point );

		}

		if ( this.mbPressed ) {

			if ( target ) {
				if ( rng.isMultiRange() ) {
					if ( !rng.becomeTableRectRange() ) {
						return;
					} else {
						var targetCell: HTML_TableCell;

						if ( targetCell = ( (<HTML_MultiRange_TableRect>rng.anchorNode().target).acceptNode( target.target.ownerBlockElement() ) ) ) {
							(<HTML_MultiRange_TableRect>rng.anchorNode().target).focusTo( targetCell );
						}
					}
				} else {
					selection.focusTo( target );
				}
			}

			// scroll up or down if mouse is on top / bottom bound.
			// make the point absolute on canvas
			point.x -= this.viewport.scrollLeft();
			point.y -= this.viewport.scrollTop();

			if ( point.y < 50 && this.viewport.scrollTop() > 0 ) {
				this.viewport.scrollTop( this.viewport.scrollTop() - 5 );
			} else {
				if ( point.y + 50 > this.viewport.height() ) {
					this.viewport.scrollTop( this.viewport.scrollTop() + 5 );
				}
			}

		} else {

			if ( target && target.target.nodeType == TNode_Type.ELEMENT ) {
				if ( !(<TNode_Element>target.target).onmousemove( point, 0, this ) ) {
					this.viewport.canvas.style.cursor = target.target.isOrphanElement() ? 'text' : 'default';
				}
			} else {
				if ( target && target.target.nodeType == TNode_Type.TEXT ) {

					if ( !( target.target.ownerBlockElement().onmousemove( point, 0, this ) ) ) {
						this.viewport.canvas.style.cursor = 'text';
					}

				} else {
					this.viewport.canvas.style.cursor = target && target.target.isOrphanElement() ? 'text' : 'default';
				}
			}

		}

	}

	public onmouseup( DOMEvent, isFromBody: boolean = false ) {

		// cancel scrollbar locking
		this.lockedScrollbar = null;

		// cancel resizing locking
		this.resizingLockTarget 	= null;
		this.resizingMethod 		= null;
		this.resizingReferencePoint = null;
		this.resizingDelta 			= null;
		this.resizingLastPoint      = null;
		this.resizingAspectRatio 	= null;

		// cancel selection capturing.
		switch ( DOMEvent.which ) {

			case 3: // RIGHT MOUSE BUTTON
			case 1: // LEFT MOUSE BUTTON
				this.mbPressed = false;
				break;

		}

		// cancel the event.
		DOMEvent.preventDefault();
		DOMEvent.stopPropagation();
	}

	public onmouseclick( DOMEvent ) {
	}

	public onmousedblclick( DOMEvent ) {

	}

	public oncontextmenu( DOMEvent ) {
		console.warn( "SHOW CONTEXT MENU!", DOMEvent );
	}

	public onhandlescrollbar( point: TPoint ) {

		var percent: number = 0,
		    height: number = 0,
		    width: number = 0,
		    value: number = 0;

		switch ( this.lockedScrollbar ) {
			case null:
				break;
			case 0:
				//handle vertical scrollbar

				height = this.viewport.height() - this.viewport._scrollbarSize ;

				if ( this.viewport._clientHeight < height ) {
					return; // scrolling is disabled
				}

				if ( point.y < 0 ) {
					point.y = 0;
				}

				if ( point.y > height ) {
					point.y = height;
				}

				percent = point.y / ( height / 100 );

				value = percent * ( ( this.viewport._clientHeight - height ) / 100 );

				this.viewport.scrollTop( value );

				break;
			case 1:
				//handle horizontal scrollbar

				width = this.viewport.width() - this.viewport._scrollbarSize ;

				if ( this.viewport._clientWidth <= width ) {
					return;
				}

				if ( point.x < 0 ) {
					point.x = 0;
				}

				if ( point.x > width ) {
					point.x = width;
				}

				percent = point.x / ( width / 100 );

				value = percent * ( ( this.viewport._clientWidth - width ) / 100 );

				this.viewport.scrollLeft( value );

				break;
		}
		
	}

	protected handleResize( point: TPoint ) {
		
		var computeWidth: boolean = false,
		    computeHeight: boolean = false,
		    newWidth: number = null,
		    newHeight: number = null;

		if ( this.resizingLastPoint.x != point.x || this.resizingLastPoint.y != point.y ) {

			this.resizingDelta = {
				"x": point.x - this.resizingLastPoint.x,
				"y": point.y - this.resizingLastPoint.y
			};

			if ( this.resizingAspectRatio === null ) {
				computeHeight = true;
				computeWidth  = true;
			} else {

				if ( this.resizingLockTarget.style._width.isSet ) {
					computeWidth  = true;
				}

				if ( this.resizingLockTarget.style._height.isSet ) {
					computeHeight = true;
				}
			}

			if ( !computeWidth && !computeHeight ) {
				computeWidth = true;
				computeHeight = true;
			}

			switch ( this.resizingMethod ) {
				case TResizer.NW:

					if ( computeWidth ) {
						newWidth = this.resizingLockTarget.layout.offsetWidth - this.resizingDelta.x;
					}

					if ( computeHeight ) {
						newHeight = this.resizingLockTarget.layout.offsetHeight - this.resizingDelta.y;
					}

					break;

				case TResizer.NE:

					if ( computeWidth ) {
						newWidth = this.resizingLockTarget.layout.offsetWidth + this.resizingDelta.x;
					}

					if ( computeHeight ) { 
						newHeight = this.resizingLockTarget.layout.offsetHeight - this.resizingDelta.y;
					}

					break;

				case TResizer.SW:

					if ( computeWidth ) {
						newWidth = this.resizingLockTarget.layout.offsetWidth - this.resizingDelta.x;
					}

					if ( computeHeight ) {
						newHeight = this.resizingLockTarget.layout.offsetHeight + this.resizingDelta.y;
					}

					break;

				case TResizer.SE:

					if ( computeWidth ) {
						newWidth = this.resizingLockTarget.layout.offsetWidth + this.resizingDelta.x;
					}

					if ( computeHeight ) {
						newHeight = this.resizingLockTarget.layout.offsetHeight + this.resizingDelta.y;
					}

					break;

				case TResizer.N:

					if ( computeHeight ) {
						newHeight = this.resizingLockTarget.layout.offsetHeight - this.resizingDelta.y;
					}

					break;

				case TResizer.S:

					if ( computeHeight ) {
						newHeight = this.resizingLockTarget.layout.offsetHeight + this.resizingDelta.y;
					}

					break;

				case TResizer.E:

					if ( computeWidth ) {
						newWidth = this.resizingLockTarget.layout.offsetWidth + this.resizingDelta.x;
					}

					break;

				case TResizer.W:

					if ( computeWidth ) {
						newWidth = this.resizingLockTarget.layout.offsetWidth - this.resizingDelta.x;
					}

					break;

				default:
					throw "Unexpected resizing method!";
			}
			
			if ( this.resizingLockTarget.is() == 'multirange' ) {
				(<HTML_MultiRange>this.resizingLockTarget).resizerHint = this.resizingMethod;
			}


			if ( this.resizingAspectRatio === null ) {

				if ( computeWidth ) {
					this.resizingLockTarget.style.width( String( newWidth - 2 * this.resizingLockTarget.style.borderWidth() - this.resizingLockTarget.style.paddingLeft() - this.resizingLockTarget.style.paddingRight() ) );
				}

				if ( computeHeight ) {
					this.resizingLockTarget.style.height( String( newHeight - 2 * this.resizingLockTarget.style.borderWidth() - this.resizingLockTarget.style.paddingTop() - this.resizingLockTarget.style.paddingBottom() ) );
				}

			} else {

				if ( computeWidth ) {
					newHeight = ~~( newWidth / this.resizingAspectRatio );
				} else {
					newWidth = ~~( newHeight * this.resizingAspectRatio );
				}

				if ( this.resizingLockTarget.style._width.isSet ) {
					this.resizingLockTarget.style.width( String( newWidth - 2 * this.resizingLockTarget.style.borderWidth() - this.resizingLockTarget.style.paddingLeft() - this.resizingLockTarget.style.paddingRight() ) );
				}

				if ( computeHeight ) {
					this.resizingLockTarget.style.height( String( newHeight - 2 * this.resizingLockTarget.style.borderWidth() - this.resizingLockTarget.style.paddingTop() - this.resizingLockTarget.style.paddingBottom() ) );
				}

			}


			this.resizingLastPoint.x = point.x;
			this.resizingLastPoint.y = point.y;

		}

	}

	public lockTargetForResizing( target: TNode_Element, resizeType: TResizer, initialEventPoint: TPoint ) {
		
		this.resizingMethod = resizeType;
		this.resizingLockTarget = target;
		
		switch ( resizeType ) {
			case TResizer.NW:
			
			case TResizer.N:
			case TResizer.W:
				// save the opposite node for the resizing process
				this.resizingReferencePoint = {
					"x": target.layout.offsetLeft + target.layout.offsetWidth,
					"y": target.layout.offsetTop  + target.layout.offsetHeight
				};
				break;
			case TResizer.NE:
			case TResizer.E:
				// save the opposite node for the resizing process
				this.resizingReferencePoint = {
					"x": target.layout.offsetLeft,
					"y": target.layout.offsetTop + target.layout.offsetHeight
				};
				break;
			case TResizer.SW:
			case TResizer.S:
				// save the opposite node for the resizing process
				this.resizingReferencePoint = {
					"x": target.layout.offsetLeft + target.layout.offsetWidth,
					"y": target.layout.offsetTop
				};
				break;
			case TResizer.SE:
				// save the opposite node for the resizing process
				this.resizingReferencePoint = {
					"x": target.layout.offsetLeft,
					"y": target.layout.offsetTop
				};
				break;
			default:
				throw "Unimplemented resize method!";
				break;
		}

		this.resizingAspectRatio = target.style._aspectRatio.isSet
			? target.style.aspectRatio()
			: null;

		this.resizingDelta = {
			"x": 0,
			"y": 0
		};

		this.resizingLastPoint = initialEventPoint;

		// cancel mouse moving ...
		this.mbPressed = false;
	}

}