class Viewport_KeyboardDriver extends Events {

	public viewport: Viewport = null;

	constructor( viewport: Viewport ) {
		super();

		this.viewport = viewport;

		( function( me ) {

			me.viewport.canvas.addEventListener( 'keydown', function( DOMEvent ) {
				me.onkeydown( DOMEvent );
			}, true );

			me.viewport.canvas.addEventListener( 'keyup', function( DOMEvent ) {
				me.onkeyup( DOMEvent );
			}, true );

			me.viewport.canvas.addEventListener( 'keypress', function( DOMEvent ) {
				me.onkeypress( DOMEvent );
			}, true );

			me.viewport.canvas.forwardKeyboardEvent = function( evtype, evt ) {
				switch ( evtype ) {
					
					case 'keydown':
						me.onkeydown( evt );
						break;
					
					case 'keyup':
						me.onkeyup( evt );
						break;
					
					case 'keypress':
						me.onkeypress( evt );
						break;
				}
			};

		})(this);

	}

	onkeyup( DOMEvent: any, eventSource: KbEventSource ) {

	}

	onkeypress( DOMEvent: any ) {
		
		var chr: string = String.fromCharCode( DOMEvent.charCode ),
		    key: number = DOMEvent.keyCode;

		if ( !DOMEvent.ctrlKey && chr && chr != '\n' ) {

			this.viewport.execCommand( EditorCommand.INSERT_TEXT, chr );

			DOMEvent.preventDefault();
			DOMEvent.stopPropagation();
		}


	}

	onkeydown( DOMEvent: any ) {
		
		var cancelEvent: boolean = false,
		    nextCell: HTML_TableCell,
		    textNodes: TNode_Text[];

		switch ( DOMEvent.keyCode ) {

			case 32:
				this.viewport.execCommand( EditorCommand.INSERT_TEXT, ' ' );
				cancelEvent = true;
				break;

			case 9: /* Tab: */
				cancelEvent = true;
				
				if ( !this.viewport.selection.editorState.state.cell ) {
					this.viewport.execCommand( DOMEvent.shiftKey ? EditorCommand.UNINDENT : EditorCommand.INDENT );
				} else {
					if ( !DOMEvent.shiftKey ) {

						nextCell = this.viewport.selection.editorState.state.cell.nextCell();

						if ( nextCell ) {

							if ( nextCell.isOrphanElement() ) {
								this.viewport.selection.anchorTo( new TRange_Target( nextCell, nextCell.FRAGMENT_START ) );
							} else {
								textNodes = nextCell.allTextNodes();
								if ( textNodes.length ) {
									this.viewport.selection.anchorTo( new TRange_Target( textNodes[ textNodes.length - 1 ], textNodes[ textNodes.length - 1 ].FRAGMENT_END ) )
								} else {
									this.viewport.selection.anchorTo( new TRange_Target( nextCell, nextCell.FRAGMENT_END ) );
								}
							}

						} else {
							// create a new row in the table
							this.viewport.selection.editorState.state.cell.insertRow( false );

							nextCell = this.viewport.selection.editorState.state.cell.nextCell();

							if ( nextCell ) {

								if ( nextCell.isOrphanElement() ) {
									this.viewport.selection.anchorTo( new TRange_Target( nextCell, nextCell.FRAGMENT_START ) );
								} else {
									textNodes = nextCell.allTextNodes();
									if ( textNodes.length ) {
										this.viewport.selection.anchorTo( new TRange_Target( textNodes[ textNodes.length - 1 ], textNodes[ textNodes.length - 1 ].FRAGMENT_END ) )
									} else {
										this.viewport.selection.anchorTo( new TRange_Target( nextCell, nextCell.FRAGMENT_END ) );
									}
								}

							}

						}
					} else {
						// TODO: FOCUS PREVIOUS CELL
					}
				}
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

			case 90: // z
				if ( DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.UNDO );
					cancelEvent = true;
				}
				break;

			case 89: // y
				if ( DOMEvent.ctrlKey ) {
					this.viewport.execCommand( EditorCommand.REDO );
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