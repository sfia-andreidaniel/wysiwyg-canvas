class UI_Dialog extends Events {

	/* DOM Elements */
	protected outerNode = document.createElement( 'div' );
	protected titlebar  = document.createElement( 'div' );
	protected label     = document.createElement( 'div' );
	protected buttons   = document.createElement( 'div' );
	protected body      = document.createElement( 'div' );
	protected resizer   = document.createElement( 'div' );

	/* Resizing stuff */
	protected resizerType      : TResizer = null;
	protected resizerLastPoint : TPoint = null;

	protected settings: UI_DialogConfig = {
		"width"		: 100,
		"height"	: 100,
		"caption"	: "Dialog",
		"closable"	: true,
		"resizable"	: true,
		"minWidth"	: 90,
		"minHeight"	: 10,
		"childOf"   : null,
		"x"         : 0,
		"y"         : 0
	};

	constructor( config: UI_DialogConfig ) {
		super();

		this.titlebar.appendChild( this.label );
		this.titlebar.appendChild( this.buttons );
		
		this.outerNode.appendChild( this.resizer );
		this.resizer.innerHTML = '<div class="handle n"></div><div class="handle s"></div><div class="handle w"></div><div class="handle e"></div><div class="handle nw"></div><div class="handle ne"></div><div class="handle sw"></div><div class="handle se"></div>';

		this.resizer.appendChild( this.titlebar );
		this.resizer.appendChild( this.body );

		DOM.addClass( this.outerNode, 'ui-dialog' );

		DOM.addClass( this.resizer, 'resizer' );
		
		DOM.addClass( this.titlebar, 'titlebar' );
		DOM.addClass( this.label, 'caption' );
		DOM.addClass( this.buttons, 'buttons' );

		DOM.addClass( this.body, 'body' );

		this.width = typeof config.width == 'undefined' ? this.settings.width : config.width;
		this.height = typeof config.height == 'undefined' ? this.settings.height : config.height;
		this.caption = typeof config.caption == 'undefined' ? this.settings.caption : config.caption;
		this.closable = typeof config.closable == 'undefined' ? this.settings.closable : config.closable;

		this.childOf = typeof config.childOf == 'undefined' ? this.settings.childOf : config.childOf;

		this._initResizer_();

	}

	get x(): number {
		return this.settings.x;
	}

	get y(): number {
		return this.settings.y;
	}

	set x( num: number ){
		this.settings.x = ~~num;
		this.outerNode.style.left = this.settings.x + "px";
	}

	set y( num: number ) {
		this.settings.y = ~~num;
		this.outerNode.style.top = this.settings.y + "px";
	}

	get width(): number {
		return this.settings.width;
	}

	set width( v: number ) {
		this.settings.width = ~~v;
		this.outerNode.style.width = v + 4 + "px";
	}

	get height(): number {
		return this.settings.height;
	}

	set height( v: number ) {
		this.settings.height = ~~v;
		this.outerNode.style.height = v + 30 + "px";
		this.body.style.height = v + "px";
	}

	get caption(): string {
		return this.settings.caption;
	}

	set caption( s: string ) {
		this.settings.caption = String(s || '' );
		this.label.innerHTML = '';
		this.label.appendChild( document.createTextNode( this.settings.caption ) );
	}

	get childOf(): any {
		return this.outerNode.parentNode;
	}

	set childOf( element: any ) {
		
		if ( element ) {
			element.appendChild( this.outerNode );
			this.fire( 'open', element );
		} else {
			if ( this.outerNode.parentNode ) {
				this.outerNode.parentNode.removeChild( this.outerNode );
			}
		}

		this.settings.childOf = element || null;
	}

	get innerHTML(): string {
		return this.body.innerHTML;
	}

	set innerHTML( s: string ) {
		this.body.innerHTML = String( s || '' );
	}

	get closable(): boolean {
		return this.settings.closable;
	}

	set closable( v: boolean ) {
		this.settings.closable = !!v;
		
		var rm = this.buttons.querySelector( 'div.close' );
		if ( rm ) {
			this.buttons.removeChild( rm );
		}

		if ( v ) {
			
			DOM.addClass( this.titlebar, 'closable' );

			var btnClose = document.createElement('div');
			DOM.addClass( btnClose, 'close' );

			this.buttons.appendChild( btnClose );

			( function( me ) {

				btnClose.addEventListener( 'click', function() {
					me.close();
				}, true );

			} )( this );

		} else {

			DOM.removeClass( this.titlebar, 'closable' );

		}
	}

	public close(): UI_Dialog {
		this.childOf = null;
		this.fire( 'close' );
		return this;
	}

	public open( inParent: any = null ): UI_Dialog {
		
		if ( inParent ) {
			this.childOf = inParent;
		} else {
			this.childOf = document.body;
		}

		this.fire( 'open' );

		return this;

	}

	private _initResizer_() {
		( function( me ) {

			function onresizer_mousemove( evt ) {

				evt.preventDefault();
				evt.stopPropagation();

				var currentPoint: TPoint = {
					"x": evt.clientX,
					"y": evt.clientY
				}, delta: TPoint = {
					"x": me.resizerLastPoint.x - currentPoint.x,
					"y": me.resizerLastPoint.y - currentPoint.y
				}, rect: TRect = {
					"width": me.width,
					"height": me.height,
					"x": me.x,
					"y": me.y
				};


				switch ( me.resizerType ) {
					case TResizer.N:
						rect.y -= delta.y;
						rect.height += delta.y;
						break;
					case TResizer.S:
						rect.height -= delta.y;
						break;
					case TResizer.W:
						rect.x -= delta.x;
						rect.width += delta.x;
						break;
					case TResizer.E:
						rect.width -= delta.x;
						break;
					case TResizer.SW:
						rect.x -= delta.x;
						rect.width += delta.x;
						rect.height -= delta.y;
						break;
					case TResizer.SE:
						rect.width -= delta.x;
						rect.height -= delta.y;
						break;
					case TResizer.NW:
						rect.x -= delta.x;
						rect.y -= delta.y;
						rect.width += delta.x;
						rect.height += delta.y;
						break;
					case TResizer.NE:
						rect.y -= delta.y;
						rect.width -= delta.x;
						rect.height += delta.y;
						break;
				}

				if ( rect.width >= me.settings.minWidth && rect.height >= me.settings.minHeight ) {
					if ( rect.x != me.x ) {
						me.x = rect.x;
					}
					if ( rect.y != me.y ) {
						me.y = rect.y;
					}
					if ( rect.width != me.width ) {
						me.width = rect.width;
					}
					if ( rect.height != me.height ) {
						me.height = rect.height;
					}

					me.resizerLastPoint.x = currentPoint.x;
					me.resizerLastPoint.y = currentPoint.y;

				}

			}

			function onresizer_mouseup( evt ) {

				evt.preventDefault();
				evt.stopPropagation();

				me.resizerType = null;
				document.body.removeEventListener( 'mousemove', onresizer_mousemove, true );
				document.body.removeEventListener( 'mouseup',   onresizer_mouseup,   true );
			}

			me.resizer.addEventListener( 'mousedown', function( evt ) {
				
				var handle = evt.target || evt.toElement;
				
				if ( handle && DOM.hasClass( handle, 'handle' ) ) {
					
					evt.preventDefault();
					evt.stopPropagation();

					switch ( true ) {
						case DOM.hasClass( handle, 'n' ):
							me.resizerType = TResizer.N;
							break;
						case DOM.hasClass( handle, 's' ):
							me.resizerType = TResizer.S;
							break;
						case DOM.hasClass( handle, 'w' ):
							me.resizerType = TResizer.W;
							break;
						case DOM.hasClass( handle, 'e' ):
							me.resizerType = TResizer.E;
							break;
						case DOM.hasClass( handle, 'nw' ):
							me.resizerType = TResizer.NW;
							break;
						case DOM.hasClass( handle, 'ne' ):
							me.resizerType = TResizer.NE;
							break;
						case DOM.hasClass( handle, 'sw' ):
							me.resizerType = TResizer.SW;
							break;
						case DOM.hasClass( handle, 'se' ):
							me.resizerType = TResizer.SE;
							break;
					}

					me.resizerLastPoint = {
						"x": evt.clientX,
						"y": evt.clientY
					};

					console.warn( me.resizerLastPoint );

					document.body.addEventListener( 'mousemove', onresizer_mousemove, true );
					document.body.addEventListener( 'mouseup',   onresizer_mouseup,   true );

				}

			}, true );

		} )( this );
	}

	static onWinResize() {

	}

}