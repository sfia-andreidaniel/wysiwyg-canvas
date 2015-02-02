class Viewport_KeyboardDriver extends Events {

	public viewport: Viewport = null;
	public pasteAdapter       = document.createElement( 'div' );
	public focusedElement: KbEventSource = KbEventSource.CANVAS;

	constructor( viewport: Viewport ) {
		super();

		this.viewport = viewport;

		this.pasteAdapter.tabIndex = 0;
		this.pasteAdapter.style.cssText = "width: 0px; height: 0px; display: block; opacity: 0; position: absolute; left: 0px; top: -40px";
		this.pasteAdapter.setAttribute( 'contenteditable', 'true' );

		( function( me ) {

			me.viewport.canvas.addEventListener( 'keydown', function( DOMEvent ) {
				me.onkeydown( DOMEvent, KbEventSource.CANVAS );
			}, true );

			me.viewport.canvas.addEventListener( 'keyup', function( DOMEvent ) {
				me.onkeyup( DOMEvent, KbEventSource.CANVAS );
			}, true );

			me.viewport.canvas.addEventListener( 'keypress', function( DOMEvent ) {
				me.onkeypress( DOMEvent, KbEventSource.CANVAS );
			}, true );

			me.pasteAdapter.addEventListener( 'keydown', function( DOMEvent ) {
				me.onkeydown( DOMEvent, KbEventSource.PASTE_ADAPTER );
			});

			me.pasteAdapter.addEventListener( 'keyup', function( DOMEvent ) {
				me.onkeyup( DOMEvent, KbEventSource.PASTE_ADAPTER );
			});

			me.pasteAdapter.addEventListener( 'keypress', function( DOMEvent ) {
				me.onkeypress( DOMEvent, KbEventSource.PASTE_ADAPTER );
			});

		})(this);

	}

	onkeyup( DOMEvent: any, eventSource: KbEventSource ) {

		if ( eventSource == KbEventSource.PASTE_ADAPTER && DOMEvent.keyCode == 17 /* ctrl */) {
			document.body.removeChild( this.pasteAdapter );
			this.viewport.canvas.focus();
			console.log( 'kb: canvas' );
			return;
		}
	
	}

	onkeypress( DOMEvent: any, eventSource: KbEventSource ) {
		
		var chr: string = String.fromCharCode( DOMEvent.charCode ),
		    key: number = DOMEvent.keyCode;

		if ( !DOMEvent.ctrlKey && chr && chr != '\n' ) {

			this.viewport.execCommand( EditorCommand.INSERT_TEXT, chr );

			DOMEvent.preventDefault();
			DOMEvent.stopPropagation();
		}


	}

	onkeydown( DOMEvent: any, eventSource: KbEventSource ) {
		
		if ( eventSource == KbEventSource.CANVAS && DOMEvent.keyCode == 17 ) { // ctrl key
			document.body.appendChild( this.pasteAdapter );
			this.pasteAdapter.innerHTML = '';
			this.pasteAdapter.focus();
			return;
		}

		var cancelEvent: boolean = false;

		switch ( DOMEvent.keyCode ) {

			case 32:
				this.viewport.execCommand( EditorCommand.INSERT_TEXT, ' ' );
				cancelEvent = true;
				break;

			case 9: /* Tab: */
				cancelEvent = true;
				this.viewport.execCommand( DOMEvent.shiftKey ? EditorCommand.UNINDENT : EditorCommand.INDENT );
				break;

			case 66: // b
				if ( DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.BOLD );
					cancelEvent = true;
				}
				break;

			case 73: // i
				if ( DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.ITALIC );
					cancelEvent = true;
				}
				break;

			case 85: // u
				if ( DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.UNDERLINE );
					cancelEvent = true;
				}
				break;

			case 76: // l
				if ( DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.ALIGN, 'left' );
					cancelEvent = true;
				}
				break;

			case 69: // e
				if ( DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.ALIGN, 'center' );
					cancelEvent = true;
				}
				break;

			case 74: // j
				if ( DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.ALIGN, 'justified' );
					cancelEvent = true;
				}
				break;

			case 82: // r
				if ( DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.ALIGN, 'right' );
					cancelEvent = true;
				}
				break;


			case 67: // c
				if ( DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.COPY );
					cancelEvent = true;
				}
				break;

			case 88: // x
				if ( DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.CUT );
					cancelEvent = true;
				}
				break;

			case 86: // v
				if ( DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.PASTE );
					cancelEvent = true;
				}
				break;

			case 189: // -
				if ( DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.SIZE, '-1' );
					cancelEvent = true;
				}
				break;

			case 107: // NUMPAD_PLUS
			case 187: // =
				if ( DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.SIZE, '+1' );
					cancelEvent = true;
				}
				break;

			case 13: // cr
			case 10: // lf
				if ( !DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.NEW_LINE, DOMEvent.shiftKey );
					cancelEvent = true;
				}
				break;

			case 46: // delete
				if ( !DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.DELETE_TEXT, 1 );
					cancelEvent = true;
				}
				break;

			case 8: // backspace
				if ( !DOMEvent.ctrlKey && !DOMEvent.shiftKey ) {
					this.viewport.execCommand( EditorCommand.DELETE_TEXT, -1 );
					cancelEvent = true;
				}
				break;

			case 36: // home
				if ( !DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.MOVE, CaretPos.LINE_HORIZONTAL, -1, DOMEvent.shiftKey );
					cancelEvent = true;
				}
				break;

			case 35: // end
				if ( !DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.MOVE, CaretPos.LINE_HORIZONTAL, 1, DOMEvent.shiftKey );
					cancelEvent = true;
				}
				break;

			case 37: // left
				if ( !DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.MOVE, CaretPos.CHARACTER, -1, DOMEvent.shiftKey );
				} else {
					this.viewport.execCommand( EditorCommand.MOVE, CaretPos.WORD, -1, DOMEvent.shiftKey );
				}
				cancelEvent = true;
				break;

			case 39: // right
				if ( !DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.MOVE, CaretPos.CHARACTER, 1, DOMEvent.shiftKey );
				} else {
					this.viewport.execCommand( EditorCommand.MOVE, CaretPos.WORD, 1, DOMEvent.shiftKey );
				}
				cancelEvent = true;
				break;

			case 38: // up
				if ( !DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.MOVE, CaretPos.LINE_VERTICAL, -1, DOMEvent.shiftKey );
					cancelEvent = true;
				}
				break;

			case 40: // down
				if ( !DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.MOVE, CaretPos.LINE_VERTICAL, 1, DOMEvent.shiftKey );
					cancelEvent = true;
				}
				break;

			case 33: // page up
				if ( !DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.MOVE, CaretPos.VIEWPORT, -1, DOMEvent.shiftKey );
					cancelEvent = true;
				}
				break;

			case 34: // page down
				if ( !DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.MOVE, CaretPos.VIEWPORT, 1, DOMEvent.shiftKey );
					cancelEvent = true;
				}
				break;

			default:
			//console.log( DOMEvent.keyCode );
				break;

		}

		if ( cancelEvent ) {
			DOMEvent.preventDefault();
			DOMEvent.stopPropagation();
		}

	}
}