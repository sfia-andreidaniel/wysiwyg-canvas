class Viewport_MouseDriver extends Events {

	public  viewport: Viewport = null;
	public  mbPressed: boolean = false; // weather a mouse button is pressed
	
	static  $BodyMouseUps: Viewport_MouseDriver[] = [];

	constructor( viewport: Viewport ) {
	    
	    super();

	    this.viewport = viewport;

	    ( function( me ) {

   			me.viewport.canvas.addEventListener( 'mousewheel', function( DOMEvent ) {
				me.viewport.scrollTop( me.viewport.scrollTop() + ( DOMEvent.wheelDelta < 0 ? 12 : -12 ) );
				DOMEvent.preventDefault();
				DOMEvent.stopPropagation();
			}, true );

			me.viewport.canvas.addEventListener( 'mousedown',  function( DOMEvent ) {
				me.onmousedown( DOMEvent );
			}, true);

			me.viewport.canvas.addEventListener( 'mousemove',  function( DOMEvent ) {
				me.onmousemove( DOMEvent );
			}, true);

			me.viewport.canvas.addEventListener( 'mouseup',    function( DOMEvent ) {
				me.onmouseup( DOMEvent );
			}, true);

			me.viewport.canvas.addEventListener( 'click',      function( DOMEvent ) {
				me.onmouseclick( DOMEvent );
			}, true);

			me.viewport.canvas.addEventListener( 'dblclick',   function( DOMEvent ) {
				me.onmousedblclick( DOMEvent );
			}, true );

			me.viewport.canvas.addEventListener( 'mouseout',   function( DOMEvent ) {
				me.onmouseout( DOMEvent );
			}, true);

			me.viewport.canvas.addEventListener( 'mouseover',   function( DOMEvent ) {
				me.onmouseover( DOMEvent );
			}, true);

		})( this );

	}

	private translateMouseEventXY( DOMEvent ): TPoint {
		return {
			"x": DOMEvent.offsetX + this.viewport.scrollLeft(),
			"y": DOMEvent.offsetY + this.viewport.scrollTop()
		}
	}
	public onmousedown( DOMEvent ) {
		
		var target: TRange_Target = this.viewport.getTargetAtXY( this.translateMouseEventXY( DOMEvent ) );
		
		if ( target ) {

			window['$1'] = target.target;

			this.mbPressed = true;

			this.viewport.selection.anchorTo( target );

			this.fire( 'refocus' );
		}
	}

	public onmousemove( DOMEvent ) {

		var target: TRange_Target,
		    point : TPoint;

		target = this.viewport.getTargetAtXY( point = this.translateMouseEventXY( DOMEvent ) );
		this.viewport.canvas.style.cursor = ( target && target.target.nodeType == TNode_Type.TEXT ) ? 'text' : 'default';

		if ( this.mbPressed ) {

			if ( target )
				this.viewport.selection.focusTo( target );

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

		}

	}

	public onmouseup( DOMEvent ) {
		this.mbPressed = false;
	}

	public onmouseclick( DOMEvent ) {

	}

	public onmousedblclick( DOMEvent ) {

	}

	public onmouseout( DOMEvent ) {

		if ( this.mbPressed )
			Viewport_MouseDriver.$BodyMouseUps.push( this );
	}

	public onmouseover( DOMEvent ) {
		var index: number = -1;

		if ( ( index = Viewport_MouseDriver.$BodyMouseUps.indexOf( this ) ) > -1 ) {
			Viewport_MouseDriver.$BodyMouseUps.splice( index, 1 );
		}
	}

}

window.addEventListener( 'load', function( DOMEvent ) {
	if ( document.body ) {
		document.body.addEventListener( 'mouseup', function() {
			if ( Viewport_MouseDriver ) {
				for ( var i=Viewport_MouseDriver.$BodyMouseUps.length - 1; i>=0; i-- ) {
					if ( Viewport_MouseDriver.$BodyMouseUps[i].mbPressed ) {
						Viewport_MouseDriver.$BodyMouseUps[i].mbPressed = false;
					}
					Viewport_MouseDriver.$BodyMouseUps.splice( i, 1 );
				}
			}
		}, false );
	}
} );