class UI_Dialog extends Events {

	/* DOM Elements */
	protected outerNode = document.createElement( 'div' );
	protected titlebar  = document.createElement( 'div' );
	protected label     = document.createElement( 'div' );
	protected btns      = document.createElement( 'div' );
	protected body      = document.createElement( 'div' );
	protected resizer   = document.createElement( 'div' );
	protected footerButtons = document.createElement( 'div' );

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
		"y"         : 0,
		"modal"     : false,
		"buttons"   : []
	};

	constructor( config: UI_DialogConfig ) {
		super();

		this.titlebar.appendChild( this.label );
		this.titlebar.appendChild( this.btns );
		
		this.outerNode.appendChild( this.resizer );
		this.resizer.innerHTML = '<div class="handle n"></div><div class="handle s"></div><div class="handle w"></div><div class="handle e"></div><div class="handle nw"></div><div class="handle ne"></div><div class="handle sw"></div><div class="handle se"></div>';

		this.resizer.appendChild( this.titlebar );
		this.resizer.appendChild( this.body );
		this.resizer.appendChild( this.footerButtons );

		DOM.addClass( this.outerNode, 'ui-dialog' );

		DOM.addClass( this.outerNode.appendChild( document.createElement( 'div' ) ), 'modal' );

		DOM.addClass( this.resizer, 'resizer' );
		
		DOM.addClass( this.titlebar, 'titlebar' );
		DOM.addClass( this.label, 'caption' );
		DOM.addClass( this.btns, 'buttons' );
		DOM.addClass( this.footerButtons, 'buttons-footer' );

		DOM.addClass( this.body, 'body' );

		this.width 		= typeof config.width 	 == 'undefined' ? this.settings.width 		: config.width;
		this.height 	= typeof config.height 	 == 'undefined' ? this.settings.height 		: config.height;
		this.caption 	= typeof config.caption  == 'undefined' ? this.settings.caption 	: config.caption;
		this.closable 	= typeof config.closable == 'undefined' ? this.settings.closable	: config.closable;
		this.modal 		= typeof config.modal    == 'undefined' ? this.settings.modal 		: config.modal;
		this.childOf 	= typeof config.childOf  == 'undefined' ? this.settings.childOf 	: config.childOf;
		this.x          = typeof config.x        == 'undefined' ? this.settings.x           : config.x;
		this.y          = typeof config.y        == 'undefined' ? this.settings.y           : config.y;
		this.minWidth   = typeof config.minWidth == 'undefined' ? this.settings.minWidth    : config.minWidth;
		this.minHeight  = typeof config.minHeight== 'undefined' ? this.settings.minHeight   : config.minHeight;
		this.innerHTML  = typeof config.innerHTML== 'undefined' ? this.settings.innerHTML   : config.innerHTML;
		this.buttons    = typeof config.buttons  == 'undefined' ? this.settings.buttons     : config.buttons;

		this.outerNode['dialog'] = this;

		this._initResizer_();
		this._initKeyboard_();

		this.outerNode.tabIndex = 0;

	}

	get x(): number {
		return this.settings.x;
	}

	set x( num: number ){
		this.settings.x = ~~num;
		this.outerNode.style.left = this.settings.x + "px";
	}

	get y(): number {
		return this.settings.y;
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
		this.outerNode.style.height = v + 30 + ( this.settings.buttons ? 50 : 0 ) + "px";
		this.resizer.style.height = v + 30 + ( this.settings.buttons ? 50 : 0 ) + "px";
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
		
		var rm = this.btns.querySelector( 'div.close' );
		if ( rm ) {
			this.btns.removeChild( rm );
		}

		if ( v ) {
			
			DOM.addClass( this.titlebar, 'closable' );

			var btnClose = document.createElement('div');
			DOM.addClass( btnClose, 'close' );

			this.btns.appendChild( btnClose );

			( function( me ) {

				btnClose.addEventListener( 'click', function() {
					me.close();
				}, true );

			} )( this );

		} else {

			DOM.removeClass( this.titlebar, 'closable' );

		}
	}

	get modal(): boolean {
		return this.settings.modal;
	}

	set modal( b: boolean ) {
		this.settings.modal = !!b;
		if ( this.settings.modal ) {
			DOM.addClass( this.outerNode, 'modal' );
		} else {
			DOM.removeClass( this.outerNode, 'modal' );
		}
	}

	get minWidth(): number {
		return this.settings.minWidth;
	}

	set minWidth( v: number ) {
		this.settings.minWidth = ~~v;
		if ( this.width < this.settings.minWidth ) {
			this.width = this.settings.minWidth;
		}
	}

	get minHeight(): number {
		return this.settings.minHeight;
	}

	set minHeight( v: number ) {
		this.settings.minHeight = ~~v;
		if ( this.height < this.settings.minHeight ) {
			this.height = this.settings.minHeight;
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

		this.outerNode.focus();

		return this;

	}

	get buttons(): UI_DialogButtonConfig[] {
		return this.settings.buttons;
	}

	set buttons( cfg: UI_DialogButtonConfig[] ) {
		
		this.footerButtons.innerHTML = '';

		if ( cfg && cfg.length ) {

			for ( var i=0, len = cfg.length; i<len; i++ ) {
				( function( btn, container, me ) {

					var button = document.createElement('button' );
					button.appendChild( document.createTextNode( btn.name ) );

					if ( btn.default ) {
						DOM.addClass( button, 'default' );
					}

					container.appendChild( button );

					button.addEventListener( 'click', function() {

						btn.callback.call( me );

					}, true );

				} )( cfg[i], this.footerButtons, this );
			}

			DOM.addClass( this.outerNode, 'footer-buttons' );
			this.settings.buttons = cfg;

		} else {

			DOM.removeClass( this.outerNode, 'footer-buttons' );
			this.settings.buttons = null;
		}
		this.height = this.height;
	}

	private runDefaultAction() {
		if ( this.settings.buttons && this.settings.buttons.length ) {
			for ( var i=0, len = this.settings.buttons.length; i<len; i++ ) {
				if ( this.settings.buttons[i].default ) {
					this.settings.buttons[i].callback.call( this );
					break;
				}
			}
		}
	}

	private runCancelAction() {
		for ( var i=0, len = this.settings.buttons.length; i<len; i++ ) {
			if ( this.settings.buttons[i].cancel ) {
				this.settings.buttons[i].callback.call( this );
				break;
			}
		}
	}

	// this method should be implemented by ancestors.
	public setup( ...args: any[] ): UI_Dialog {
		return this;
	}

	private _initKeyboard_() {

		( function( me ) {

			me.outerNode.addEventListener( 'keyup', function(evt) {

				var key = evt.keyCode;

				switch ( key ) {
					case 13: // enter
						if ( document.activeElement && document.activeElement.nodeName.toLowerCase() == 'textarea' ) {
							break;
						}
						me.runDefaultAction();
						evt.preventDefault();
						evt.stopPropagation();
						break;

					case 27: // esc

						me.runCancelAction();
						evt.preventDefault();
						evt.stopPropagation();
						break;
				}

			} );

			me.outerNode.addEventListener( 'keydown', function( evt ) {

				var key = evt.keyCode,
				    nodes: any[],
				    focused: any = document.activeElement,
				    fIndex: number = null;

				if ( key == 9 ) {

					nodes = Array.prototype.slice.call( me.outerNode.querySelectorAll( 'input:not(:disabled),textarea:not(:disabled),select:not(:disabled),button:not(:disabled)' ), 0 );

					for ( var i=0, len = nodes.length; i<len; i++ ) {
						if ( focused == nodes[i] ) {
							fIndex = i;
							break;
						}
					}

					if ( fIndex === null ) {
						return;
					}

					if ( evt.shiftKey ) {
						// focus previous
						if ( fIndex > 0 ) {
							nodes[ fIndex - 1 ].focus();
						} else {
							nodes[ nodes.length - 1 ].focus();
						}
					} else {

						//console.log( fIndex, nodes.length, nodes );

						// focus next
						if ( fIndex < ( nodes.length - 1 ) ) {
							nodes[ fIndex + 1 ].focus();
						} else {
							nodes[0].focus();
						}
					}

					evt.preventDefault();
					evt.stopPropagation();
				}

			} );

		} )( this );

	}

	private _initResizer_() {
		( function( me ) {

			me.outerNode.querySelector( '.modal' ).addEventListener( 'click', function() {
				
				me.x -= 10;

				setTimeout( function() {
					me.x += 20;
				}, 50 );
				setTimeout( function() {
					me.x -= 20;
				}, 100 );
				setTimeout( function() {
					me.x += 10;
					me.outerNode.focus();
				}, 150 );

			} );

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

				if ( rect.width >= me.settings.minWidth) {
					if ( rect.x != me.x ) {
						me.x = rect.x;
					}
					if ( rect.width != me.width ) {
						me.width = rect.width;
					}

					me.resizerLastPoint.x = currentPoint.x;

				}

				if ( rect.height >= me.settings.minHeight ) {
					if ( rect.y != me.y ) {
						me.y = rect.y;
					}
					if ( rect.height != me.height ) {
						me.height = rect.height;
					}

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

					document.body.addEventListener( 'mousemove', onresizer_mousemove, true );
					document.body.addEventListener( 'mouseup',   onresizer_mouseup,   true );

				}

			}, true );

			function ondrag_mousemove( evt ) {

				evt.preventDefault();
				evt.stopPropagation();

				var currentPoint: TPoint = {
					"x": evt.clientX,
					"y": evt.clientY
				}, delta: TPoint = {
					"x": me.resizerLastPoint.x - currentPoint.x,
					"y": me.resizerLastPoint.y - currentPoint.y
				};

				me.x -= delta.x;
				me.y -= delta.y;

				me.resizerLastPoint.x = currentPoint.x;
				me.resizerLastPoint.y = currentPoint.y;

			}

			function ondrag_mouseup( evt ) {

				document.body.removeEventListener( 'mousemove', ondrag_mousemove, true );
				document.body.removeEventListener( 'mouseup', ondrag_mouseup, true );
			
			}

			me.label.addEventListener( 'mousedown', function( evt ) {

				document.body.addEventListener( 'mousemove', ondrag_mousemove, true );
				document.body.addEventListener( 'mouseup', ondrag_mouseup, true );

				me.resizerLastPoint = {
					"x": evt.clientX,
					"y": evt.clientY
				};

				evt.preventDefault();
				evt.stopPropagation();

			}, true );

		} )( this );
	}

	get offsetHeight(): number {
		return this.settings.height + 30 + ( this.settings.buttons ? 50 : 0 );
	}

	get offsetWidth(): number {
		return this.settings.width + 4;
	}

	public centerTo( node: any ): UI_Dialog {

		var nodeRect = node.getBoundingClientRect(),
		    bodyLeft = document.body.scrollLeft,
		    bodyTop  = document.body.scrollTop,

		    y = nodeRect.top + ( nodeRect.height / 2 ) - ( this.offsetHeight / 2 ),
		    x = nodeRect.left + ( nodeRect.width / 2 ) - ( this.offsetWidth / 2 );

		    if ( y < bodyTop ) {
		    	y = bodyTop;
		    }

		    if ( x < bodyLeft ) {
		    	x = bodyLeft;
		    }

		    this.x = ~~x;
		    this.y = ~~y;
		
		return this;
	}

}