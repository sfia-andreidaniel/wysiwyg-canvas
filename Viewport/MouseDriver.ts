class Viewport_MouseDriver extends Events {

	public  viewport 		: Viewport 	= null;
	public  mbPressed		: boolean 	= false; // weather a mouse button is pressed
	public  mouseIsGlobal	: boolean 	= false;

	public  lockedScrollbar	: number 	= null;  // 0 the vertical, 1 the horizontal, null -> no locked scrollbar
	
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
				me.viewport.scrollTop( me.viewport.scrollTop() + ( ( DOMEvent.wheelDelta || -DOMEvent.deltaY ) < 0 ? 12 : -12 ) );
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

					this.mbPressed = true;

					this.viewport.selection.anchorTo( target );

					this.fire( 'refocus' );
				}

				break;

			case 3:

				var target: TRange_Target = this.viewport.getTargetAtXY( point ),
				    selection = this.viewport.selection,
				    range = selection.getRange(),
				    blocks: TNode_Element[],
				    i: number = 0,
				    len: number = 0;
				
				/* Find if the target is contained in the selection. If the target
				   is contained in the selection, we do not reanchor.
				 */

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
		    rng: TRange,
		    anchor: TRange_Target,
		    focus: TRange_Target;

		if ( !isFromBody ) {
	
			point = this.translateMouseEventXY( DOMEvent );

			if ( this.lockedScrollbar !== null ) {
				this.onhandlescrollbar( point );
				return;
			}

			target = this.viewport.getTargetAtXY( point );

		} else {

			var rectObject = this.viewport.canvas.getBoundingClientRect(),
			    point = { 
			         	"x": DOMEvent.clientX - rectObject.left, 
			         	"y": DOMEvent.clientY - rectObject.top
			    };

			if ( this.lockedScrollbar !== null ) {
				this.onhandlescrollbar( point );
				return;
			} else {
				point.x += this.viewport.scrollLeft();
				point.y += this.viewport.scrollTop();
			}

			target = this.viewport.getTargetAtXY( point );

		}

		this.viewport.canvas.style.cursor = ( target && target.target.nodeType == TNode_Type.TEXT ) ? 'text' : 'default';

		if ( this.mbPressed ) {

			if ( target )
				selection.focusTo( target );

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
				(<TNode_Element>target.target).onmousemove( point, 0 )
			}

		}

	}

	public onmouseup( DOMEvent, isFromBody: boolean = false ) {

		this.lockedScrollbar = null;

		switch ( DOMEvent.which ) {

			case 3: // RIGHT MOUSE BUTTON
			case 1: // LEFT MOUSE BUTTON
				this.mbPressed = false;
				break;

		}

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

}