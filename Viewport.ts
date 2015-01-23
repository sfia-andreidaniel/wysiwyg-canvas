class Viewport extends Events {
	
	private _width         : number                  = 500;
	private _height        : number                  = 500;
	public  _scrollbarSize : number                  = 10;
	private _scrollTop     : number                  = 0;
	private _scrollLeft    : number                  = 0;
	
	public  canvas  /* :HTMLCanvasElement        */  = document.createElement( 'canvas' );
	public  context /* :CanvasRenderingContext2D */  = null;

	public  document       : HTML_Body               = null;
	public  painter        : Throttler               = null;
	public  selection      : DocSelection            = null;

	public  mouseDriver    : Viewport_MouseDriver    = null;
	public  keyboardDriver : Viewport_KeyboardDriver = null;
	public  router         : Viewport_CommandRouter  = null;


	constructor( _width: number = null, _height: number = null ) {
		
		super();
		
		this.context = this.canvas.getContext( '2d' );
		this.canvas.tabIndex = 0;
		this.canvas.setAttribute( 'data-object-type', 'html-viewport' );

		( function( me ) {
			
			me.painter = new Throttler( function() {
				
				if ( me.document )
					me.document.repaint();

				me.paintScrollbars();

			}, 10 );

		})( this );
		


		this.document = new HTML_Body( this );
		this.selection = new DocSelection( this );

		this.width( _width === null ? this._width : _width );
		this.height( _height === null ? this._height : _height );

		this.mouseDriver    = new Viewport_MouseDriver( this );
		this.keyboardDriver = new Viewport_KeyboardDriver( this );
		this.router         = new Viewport_CommandRouter( this );

	}

	public width( newWidth: number = null ): number {
		if ( newWidth === null ) {
			//getter
			return this._width;
		} else {
			this._width = newWidth < 0 ? 0 : newWidth;
			this.canvas.width = this._width;
			this.document.requestRelayout();
			return this._width;
		}
	}

	public height( newHeight: number = null ): number {
		if ( newHeight === null ) {
			//getter
			return this._height;
		} else {
			this._height = newHeight < 0 ? 0 : newHeight;
			this.canvas.height = this._height;
			this.document.requestRelayout();
			return this._height;
		}
	}

	public scrollTop( value: number = null ): number {
		if ( value === null ) {
			//getter
			return this._scrollTop;
		} else {
			
			if ( this.document && this.document._layout ) {

				if ( ( value + this._height - this._scrollbarSize ) > ( this.document._layout.offsetHeight + this.document._layout.offsetTop ) ) {
					value = this.document._layout.offsetHeight + this.document._layout.offsetTop - this._height + this._scrollbarSize;
				}

				if ( value < 0 ) {
					value = 0;
				}

				value = Math.round( value );

				if ( value != this._scrollTop ) {
					this._scrollTop = value;
					this.document.requestRepaint();
				}


			}

			return this._scrollTop;
		}
	}

	public scrollLeft( value: number = null ): number {
		if ( value === null ) {
			return this._scrollLeft;
		} else {
			throw "not implemented scrollLeft";
		}
	}

	// attempts to scroll the document to the last known painted caret position.
	// note that this is not guaranteed.
	public scrollToCaret() {
		if ( this.document.caretPosition.y - 20 < this._scrollTop ) {
			this.scrollTop( this.document.caretPosition.y - 20 );
		} else
		if ( this.document.caretPosition.y + this.document.caretPosition.height + 50 > this._scrollTop + this._height ) {
			this.scrollTop( this.document.caretPosition.y - this._height + 50 );
		}
	}

	// paints the scrollbars on the canvas context
	public paintScrollbars() {

		if ( !this.document ) {
			return;
		}

		var physScrollHeight: number = 0,
		    physScrollWidth : number = 0,
		    docWidth        : number = 0,
		    docHeight       : number = this.document._layout.offsetHeight + this.document._layout.offsetTop,
		    physScrollXShoe : number = 0,
		    physScrollYShoe : number = 0,
		    yScale          : number = 0;

		this.context.fillStyle = '#ddd';
		this.context.fillRect( physScrollWidth = ( this._width - this._scrollbarSize ), 0, this._scrollbarSize, this._height - this._scrollbarSize + 1 );
		this.context.fillRect( 0, physScrollHeight = ( this._height - this._scrollbarSize ), this._width - this._scrollbarSize, this._scrollbarSize );

		docWidth = physScrollWidth;

		physScrollYShoe = yScale = physScrollHeight / docHeight;

		physScrollYShoe = physScrollYShoe <= 1
			? physScrollHeight * physScrollYShoe
			: 0;

		if ( physScrollYShoe != 0 ) {
			physScrollYShoe = ~~physScrollYShoe;
		}

		this.context.fillStyle = "#888";

		if ( physScrollYShoe ) {
			this.context.fillRect( this._width - this._scrollbarSize, ( this._scrollTop * yScale ), this._scrollbarSize, physScrollYShoe );
		}

	}

	public value( v: string = null ): string {
		if ( v === null ) {
			return this.document.innerHTML();
		} else {
			this.document.innerHTML( v );
		}
	}


	public getTargetAtXY( point: TPoint ): TRange_Target {
		if ( this.document && this.document._layout ) {
			return this.document._layout.getTargetAtXY( point );
		} else return null;
	}

	public execCommand( command: EditorCommand, ...args: any[] ) {
		this.router.dispatchCommand.call( this.router, command, args );
	}

}

