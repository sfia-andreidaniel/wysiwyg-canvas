class Viewport extends Events {
	
	private _width         : number                  = 500;
	private _height        : number                  = 500;
	public  _scrollbarSize : number                  = 10;
	private _scrollTop     : number                  = 0;
	private _scrollLeft    : number                  = 0;
	public  _clientWidth   : number                  = 0;
	public  _clientHeight  : number                  = 0;
	
	public  canvas  /* :HTMLCanvasElement        */  = document.createElement( 'canvas' );
	public  context /* :CanvasRenderingContext2D */  = null;

	public  document       : HTML_Body               = null;
	public  painter        : Throttler               = null;
	public  selection      : DocSelection            = null;
	public  undo           : UndoManager             = null;

	public  mouseDriver    : Viewport_MouseDriver    = null;
	public  keyboardDriver : Viewport_KeyboardDriver = null;
	public  router         : Viewport_CommandRouter  = null;


	constructor( _width: number = null, _height: number = null ) {
		
		super();
		
		this.context = this.canvas.getContext( '2d' );

		this.context.imageSmoothingEnabled =
			this.context.webkitImageSmoothingEnabled =
			this.context.msImageSmoothingEnabled = 
			this.context.mozImageSmoothingEnabled = 
			this.context.oImageSmoothingEnabled = true;

		this.canvas.tabIndex = 0;
		this.canvas.setAttribute( 'data-object-type', 'html-viewport' );

		( function( me ) {
			
			me.painter = new Throttler( function() {
				
				if ( me.document )
					me.document.repaint();

				me.paintScrollbars();

			}, 10 );

			me.canvas.onclipboardtrap = function(): string {
				return me.selection.toString();
			};

			me.canvas.execCommand = function( ...args: any[] ) {
				return me.execCommand.apply( me, args );
			};

		})( this );
		


		this.document  = new HTML_Body( this );
		this.selection = new DocSelection( this );
		this.undo      = new UndoManager( this );

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

			if ( this.document && this.document._layout ) {

				if ( ( value + this._width - this._scrollbarSize ) > this.document._maxRightEdge ) {
					value = this.document._maxRightEdge - this._width + this._scrollbarSize;
				}

				if ( value < 0 ) {
					value = 0;
				}

				value = Math.round( value );

				if ( value != this._scrollLeft ) {
					this._scrollLeft = value;
					this.document.requestRepaint();
				}


			}

			return this._scrollLeft;
		}
	}

	// attempts to scroll the document to the last known painted caret position.
	// note that this is not guaranteed.
	public scrollToCaret() {
		var rng: TRange = this.selection.getRange(),
		    focus: TRange_Target = rng.focusNode(),
		    details: TargetDetails,
		    lineIndex: number = 0,
		    line: Character_Line;

		if ( focus ) {
			
			details = focus.details();
			
			if ( !details ) {
				return; // abort @this point
			}

			if ( details.paintAbsolute.y - 20 < this._scrollTop ) {
				this.scrollTop( details.paintAbsolute.y - 30 );
			} else
			if ( details.paintAbsolute.y + 82 > this._scrollTop + this._height ) {
				this.scrollTop( details.paintAbsolute.y - this._height + 82 );
			}

		}
	}

	// paints the scrollbars on the canvas context
	public paintScrollbars() {

		if ( !this.document ) {
			return;
		}

		var physScrollHeight: number = 0,
		    physScrollWidth : number = 0,
		    docWidth        : number = this.document._maxRightEdge,
		    docHeight       : number = this.document._layout.offsetHeight + this.document._layout.offsetTop,
		    physScrollXShoe : number = 0,
		    physScrollYShoe : number = 0,
		    yScale          : number = 0,
		    xScale          : number = 0;

		this.context.fillStyle = '#ddd';
		this.context.fillRect( physScrollWidth = ( this._width - this._scrollbarSize ), 0, this._scrollbarSize, this._height - this._scrollbarSize + 1 );
		this.context.fillRect( 0, physScrollHeight = ( this._height - this._scrollbarSize ), this._width - this._scrollbarSize, this._scrollbarSize );

		if ( docWidth < this._width - this._scrollbarSize ) {
			docWidth = this._width - this._scrollbarSize;
		}

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

		physScrollXShoe = xScale = physScrollWidth / docWidth;

		physScrollXShoe = physScrollXShoe <= 1
			? physScrollWidth * physScrollXShoe
			: 0;

		if ( physScrollXShoe != 0 ) {
			physScrollXShoe = ~~physScrollXShoe;
		}

		if ( physScrollXShoe ) {
			this.context.fillRect( ( this._scrollLeft * xScale ), this._height - this._scrollbarSize, physScrollXShoe, this._scrollbarSize );
		}

	}

	public value( v: string = null ): string {
		if ( v === null ) {
			return this.document.innerHTML();
		} else {
			this.document.innerHTML( v );
			this.document.relayout( true );
			this.selection.anchorTo( this.document.fragment.createTargetAt( FragmentPos.DOC_BEGIN ) );
			this.selection.editorState.compute();
			this.undo.reset();
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

