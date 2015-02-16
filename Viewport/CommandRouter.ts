class Viewport_CommandRouter extends Events {

	public  viewport: Viewport;
	public  caretX: number = null;

	constructor( viewport: Viewport ) {
		super();
		this.viewport = viewport;
		
		( function( me ) {
			
			me.viewport.mouseDriver.on( 'refocus', function() {
				this.caretX = null;
			});

		} )( this );
	}

	public commandName( command: EditorCommand ): string {
		switch ( command ) {
			case EditorCommand.INSERT_TEXT: return 'insertText'; break;
			case EditorCommand.DELETE_TEXT:	return 'deleteText'; break;
			case EditorCommand.NEW_LINE: 	return 'newLine'; 	 break;
			case EditorCommand.MOVE: 		return 'moveCaret';  break;
			case EditorCommand.BOLD:		return 'bold';		 break;
			case EditorCommand.STRIKE:      return 'strike';     break;
			case EditorCommand.ITALIC:		return 'italic';	 break;
			case EditorCommand.UNDERLINE:	return 'underline';  break;
			case EditorCommand.ALIGN:		return 'align';		 break;
			case EditorCommand.COPY:		return 'copy';		 break;
			case EditorCommand.CUT:			return 'cut';		 break;
			case EditorCommand.PASTE:		return 'paste';		 break;
			case EditorCommand.INDENT:		return 'indent'; 	 break;
			case EditorCommand.UNINDENT:	return 'unindent';   break;
			case EditorCommand.VALIGN:		return 'verticalAlign'; break;
			case EditorCommand.FONT:		return 'setFont';	 break;
			case EditorCommand.COLOR:		return 'setColor';   break;
			case EditorCommand.BGCOLOR:     return 'setBgColor'; break;
			case EditorCommand.SIZE:		return 'setSize';	 break;
			case EditorCommand.BLOCK_LEVEL: return 'setBlockLevel'; break;
			case EditorCommand.LIST:        return 'list';       break;
			case EditorCommand.CLEAR_FORMATTING: return 'clearFormatting'; break;
			case EditorCommand.INSERT_LINK: return 'link';       break;
			case EditorCommand.REMOVE_LINK: return 'unlink';     break;
			default:
				throw "ERR_UNKNOWN_COMMAND";
				break;
		}

	}

	private ensureArgs( args: any, minArgs: number, maxArgs: number ): boolean {
		return args && args.length >= minArgs && args.length <= maxArgs;
	}

	public dispatchCommand( command: EditorCommand, args: any[] ) {

		var commandName: string = this.commandName( command );

		//console.log( 'dispatchCommand: ' + commandName + '(' + JSON.stringify( args ) + ')' );

		if ( this.caretX != null && ( command != EditorCommand.MOVE ) ) {
			this.caretX = null;
		}

		switch ( command ) {
			case EditorCommand.INSERT_TEXT:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " require 1 argument of type string[1]";
				} else {
					this.insertText( String( args[0] ) );
				}
				break;
			case EditorCommand.DELETE_TEXT:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " require 1 argument of type integer";
				} else {
					this.deleteText( ~~args[0] );
				}
				break;
			case EditorCommand.NEW_LINE:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " require a maximum 1 argument of type boolean";
				} else {
					if ( args.length == 1 ) {
						this.newLine( !!args[0] );
					} else {
						this.newLine();
					}
				}
				break;
			case EditorCommand.MOVE:
				if ( !this.ensureArgs( args, 3, 3 ) ) {
					throw "Command: " + commandName + " require 3 arguments of type CaretPos, int, boolean."
				} else {
					this.moveCaret( args[0], args[1], args[2] );
				}
				break;
			case EditorCommand.BOLD:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " require one optional argument of type boolean.";
				} else {
					this.bold( args.length ? !!args[0] : null );
				}
				break;
			case EditorCommand.STRIKE:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " require one optional argument of type boolean.";
				} else {
					this.strike( args.length ? !!args[0] : null );
				}
				break;
			case EditorCommand.ITALIC:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " require one optional argument of type boolean.";
				} else {
					this.italic( args.length ? !!args[0] : null );
				}
				break;
			case EditorCommand.UNDERLINE:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " require one optional argument of type boolean.";
				} else {
					this.underline( args.length ? !!args[0] : null );
				}
				break;
			case EditorCommand.ALIGN:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " require a single string argument.";
				} else {
					this.align( String( args[0] ) );
				}
				break;
			case EditorCommand.COPY:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " requires max 1 argument of type boolean!";
				} else {
					this.copy( args.length ? !!args[0] : null );
				}
				break;
			case EditorCommand.CUT:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " requires max 1 argument of type boolean!";
				} else {
					this.cut( args.length ? !!args[0] : null );
				}
				break;

			case EditorCommand.PASTE:
				if ( !this.ensureArgs( args, 0, 2 ) ) {
					throw "Command: " + commandName + " require 2 optional args of type string!";
				} else {
					this.paste( args.length == 0 ? null : String( args[0] ), args.length == 2 ? args[1] : null );
				}
				break;

			case EditorCommand.INDENT:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " requires a single optional number argument!";
				} else {
					this.indent( args.length ? ~~args[0] : null );
				}
				break;
			case EditorCommand.UNINDENT:
				if ( !this.ensureArgs( args, 0, 1 ) ) {
					throw "Command: " + commandName + " requires a single optional number argument!";
				} else {
					this.unindent( args.length ? ~~args[0] : null );
				}
				break;
			case EditorCommand.VALIGN:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " requires a single argument of type string!";
				} else {
					this.valign( String( args[0] || 'normal' ) );
				}
				break;
			case EditorCommand.FONT:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " requires a single string argument!";
				} else {
					this.font( String( args[0] || "Arial" ) );
				}
				break;
			case EditorCommand.COLOR:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " requires a single argument!";
				} else {
					this.color( String( args[0] || '' ) );
				}
				break;
			case EditorCommand.BGCOLOR:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " requires a single argument!";
				} else {
					this.bgColor( String( args[0] || '' ) );
				}
				break;
			case EditorCommand.SIZE:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " requires a single argument of type string!";
				} else {
					this.size( String( args[0] || '' ) );
				}
				break;
			case EditorCommand.BLOCK_LEVEL:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " requires a single argument of type string!";
				} else {
					this.blockLevel( String( args[0] || '' ) );
				}
				break;
			case EditorCommand.LIST:
				if ( !this.ensureArgs( args, 1, 2 ) ) {
					throw "Command: " + commandName + " requires two arguments: string, boolean";
				} else {
					if ( args.length == 1 ) {
						this.list( String( args[0] || 'ul' ), null );
					} else {
						this.list( String( args[0] || 'ul' ), !!args[1] );
					}
					
				}
				break;
			case EditorCommand.CLEAR_FORMATTING:
				if ( !this.ensureArgs( args, 0, 0 ) ) {
					throw "Command: " + commandName + " don't have any arguments.";
				} else {
					this.clearFormatting();
				}
				break;
			case EditorCommand.INSERT_LINK:
				if ( !this.ensureArgs( args, 1, 3 ) ) {
					throw "Command: " + commandName + " requires 1 argument.";
				} else {
					this.link( String( args[0] ), args[1] === null ? null : String( args[1] || '' ), String(args[2]) || null );
				}
				break;
			case EditorCommand.REMOVE_LINK:
				if ( !this.ensureArgs( args, 0, 0 ) ) {
					throw "Command: " + commandName + " requires no arguments.";
				} else {
					this.unlink();
				}
				break;

			default:
				throw "ERR_UNKNOWN_COMMAND";
				break;
		}
	}

	// inserts a string @ caret position.
	public insertText( str: string ) {
		str = String( str || '' );

		if ( !str ) {
			return;
		}

		var range: TRange = this.viewport.selection.getRange(),
		    focus: TRange_Target = range.focusNode(),
		    len: number = str.length,
		    nowPos: number,
		    jump: number = 0,
		    otherNode: boolean = false,
		    textNode: TNode_Text;

		if ( range.isMultiRange() ) {
			return;
		}

		// clear existing selection if any.
		if ( this.viewport.selection.getRange().length() ) {
			this.viewport.selection.removeContents();
			range = this.viewport.selection.getRange();
			focus = range.focusNode();
		}

		if ( !focus && range.anchorNode().target.isOrphanElement() ) {

			range.anchorNode().target.documentElement.undoManager().createUndoEntry( 'Write' );

			textNode = range.anchorNode().target.documentElement.createTextNode( str );
			(<TNode_Element>range.anchorNode().target).appendChild( textNode );
			this.viewport.document.relayout(true);
			this.viewport.selection.anchorTo( new TRange_Target( textNode, textNode.FRAGMENT_END ) );
			return;
		}

		if ( !focus ) {
			return;
		}

		focus.target.documentElement.undoManager().createUndoEntry( 'Write' );

		//console.log( 'before: ' + focus.fragPos + ' => ' + JSON.stringify( this.viewport.document.fragment.sliceDebug( ( nowPos = focus.fragPos - 10 ), 20, focus.fragPos ) ) );

		// find the target text node offset
		jump = (<TNode_Text>focus.target).insertTextAtTargetOffset( focus.fragPos, str );

		if ( jump < 0 ) {
			jump = -jump;
			otherNode = true; // we've inserted text into a br, which redirected the text. we need
			                  // to recalculate the text
		}

		this.viewport.document.relayout(true);

		if ( !otherNode ) {
			focus.fragPos = (<TNode_Text>focus.target).textIndexToFragmentPosition( jump );
		} else {
			focus.fragPos = (<TNode_Text>focus.target).textIndexToFragmentPosition( jump );
			focus.target = focus.target.documentElement.findNodeAtIndex( focus.fragPos );
		}

		//console.log( 'after: ' + focus.fragPos + ' => ' + JSON.stringify( this.viewport.document.fragment.sliceDebug( ( nowPos ), 20, focus.fragPos ) ) + ', jump = ' + jump );
		
		range.collapse( true );

		this.viewport.scrollToCaret();
		
	}

	// negative values delete characters in the left of the caret,
	// positive values delete characters in the right of the caret
	public deleteText( amount: number ) {

		if ( !amount ) {
			return;
		}

		var document               = this.viewport.document,
			selection              = this.viewport.selection,
			rng                    = selection.getRange(),
		    focus                  = rng.focusNode(),
		    anchor                 = rng.anchorNode(),
		    cursorPosition    : number = 0,
		    newCursorPosition : number = 0,
		    fragment               = this.viewport.document.fragment,
		    at  : FragmentItem     = null,
		    i   : number           = 0,
		    j   : number           = 0,
		    n   : number           = 0,
		    added: boolean         = false,
		    increment: number      = 0,
		    atMax: number          = fragment.length(),
		    traversedTextNodes: TextRemoval[] = [],
		    node: TNode_Text       = null,
		    lock: Fragment_CaretLock = null,
		    chars: number = 0,

		    sourceBlockElement      : TNode_Element,
		    destinationBlockElement : TNode_Element,
		    mergeOrder              : TNode_Element[],
		    mergePosition           : number = 0,
		    collection              : TNode_Collection = null; 

		if ( rng.isMultiRange() ) {
			this.viewport.selection.removeContents();
			return;
		}

		if ( amount == -1 && rng.isOrphan() && rng.anchorNode().target.is() == 'td' ) {
			return;
		}

		if ( rng.length() ) {
			this.viewport.selection.removeContents();
			this.viewport.scrollToCaret();
			return;
		} else {
			if ( rng.length() === null ) {
				
				if ( anchor.target && anchor.target.nodeType == TNode_Type.ELEMENT ) {
					// create lock before target
					lock = fragment.createLockTarget( anchor.target.FRAGMENT_START + 1, CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT );
					
					if ( (<TNode_Element>anchor.target).removeFromDOMAtUserCommand() ) {
						document.relayout(true);
						document.removeOrphanNodes();
						selection.anchorTo( lock.getTarget() );
						selection.fire( 'changed' );
						this.viewport.scrollToCaret();
						return;
					}
				}

				return;
			} else {
				// deny deleting more than a character @ once.
				if ( Math.abs( amount ) != 1 ) {
					throw "ERR_BAD_ARGUMENT. Allowed argument is -1 or 1.";
				}
			}
		}

		/* Ensure we're positioned on a character */

		if ( amount > 0 ) {
			rng.moveRightUntilCharacterIfNotLandedOnText();
		} else {
			rng.moveLeftUntilCharacterIfNotLandedOnText();
		}

		/* Store cursor position */
		cursorPosition = focus.fragPos;

		sourceBlockElement = focus.target.ownerBlockElement();
		destinationBlockElement = null;

		if ( amount < 0 ) {
			increment = -1;
		} else {
			increment = 1;
		}

		i = cursorPosition;

		/* Jump @amount characters */
		while ( ( chars != amount )  && ( i > 0 ) && ( i < atMax ) ) {

			if ( increment < 0 )
				i += increment;

			at = fragment.at( i );

			if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
				
				newCursorPosition = i; // store the cursor position

				node = ( <TNode_Text>fragment.getNodeAtIndex( i ) ) || null;
				
				if ( node == null || node.nodeType != TNode_Type.TEXT ) {
					throw "ASSERTION_FAILED!";
				}

				chars += increment;

				added = false;

				for ( j=0, n = traversedTextNodes.length; j<n; j++ ) {
					if ( traversedTextNodes[j].node == node ) {
						if ( i < traversedTextNodes[j].start ) {
							traversedTextNodes[j].start = i;
						} else {
							traversedTextNodes[j].stop = i;
						}
						added = true;
						break;
					}
				}
				
				if ( !added ) {

					destinationBlockElement = node.ownerBlockElement();
					
					if ( destinationBlockElement != sourceBlockElement && ( !destinationBlockElement.isMergeable || !sourceBlockElement.isMergeable ) ) {
						return;
					}

					traversedTextNodes.push( {
						node  : node,
						start : i,
						stop  : i
					} );
				}
			}

			if ( increment > 0 )
				i += increment;
		}

		if ( traversedTextNodes.length == 0 ) {
			//no text to be deleted.
			return;
		}

		// create a lock @ new cursor position.
		if ( amount < 0 ) {
			lock = fragment.createLockTarget( cursorPosition, CaretLockDirection.FROM_ENDING_OF_DOCUMENT, 'Remove' + amount );
		} else {
			lock = fragment.createLockTarget( cursorPosition, CaretLockDirection.FROM_BEGINNING_OF_DOCUMENT, 'Remove' + amount );
		}

		this.viewport.document.canRelayout = false;

		if ( destinationBlockElement != sourceBlockElement && destinationBlockElement !== null && destinationBlockElement.isMergeable && sourceBlockElement.isMergeable ) {
			
			//console.warn( "MERGE BEGIN" );

			if ( amount < 0 ) {
				mergePosition = 1; // 1 = at end
				mergeOrder = [ destinationBlockElement, sourceBlockElement ];
			} else {
				mergePosition = 1; // 0 = at beginning
				mergeOrder = [ sourceBlockElement, destinationBlockElement ];
			}

			//console.log( 'append: ' + mergeOrder[1].xmlBeginning() + " in " + mergeOrder[0].xmlBeginning() + " at: " + ( mergePosition == 1 ? "beginning" : "end" ) );

			if ( mergeOrder[1] != document ) { // we cannot merge the document in a sub-child

				collection = new TNode_Collection( mergeOrder[1].childNodes );

				if ( mergeOrder[1].parentNode == mergeOrder[0] ) {

					mergeOrder[0].appendCollection( collection, mergeOrder[1].siblingIndex + mergePosition == 1 ? 1 : 0 );

				} else {

					mergeOrder[0].appendCollection( collection, mergePosition == 1 ? null : 0 );

				}

				this.viewport.document.removeOrphanNodes();

				if ( destinationBlockElement.nodeName == 'li' ) {
					destinationBlockElement.parentNode.parentNode.mergeAdjacentLists();
				} else
				if ( sourceBlockElement.nodeName == 'li' ) {
					sourceBlockElement.parentNode.parentNode.mergeAdjacentLists();
				}

			}


		}

		// if we did a merging, we're not doing the locking
		if ( collection === null ) {

			/* Remove text from traversed text nodes */
			for ( i=0, n = traversedTextNodes.length; i<n; i++ ) {
				traversedTextNodes[i].node.deleteTextContentsBetweenFragmentPositions( traversedTextNodes[i].start, traversedTextNodes[i].stop );
				if ( traversedTextNodes[i].node.textContents() == '' ) {
					traversedTextNodes[i].node.remove(); // remove text node if has no text anymore
				}
			}

		}

		//remove all the orphan nodes from the document.
		this.viewport.document.removeOrphanNodes();

		this.viewport.document.canRelayout = true;

		// relayout *RIGHT NOW* the document
		this.viewport.document.relayout( true );

		// finally, move the cursor.
		selection.anchorTo( lock.getTarget() );

		this.viewport.scrollToCaret();

	}

	// inserts a new line in document. if forceBRTag is set (not null)
	// a <br> tag will be inserted instead of creating a new paragraph.
	public newLine( alternateMethod: boolean = null ) {
		
		if ( this.viewport.selection.getRange().isMultiRange() ) {
			return;
		}

		if ( this.viewport.selection.getRange() ) {
			this.viewport.selection.removeContents();
		}

		var rng: TRange = this.viewport.selection.getRange(),
		    len: number = rng.length(),
		    focus: TRange_Target = rng.focusNode(),
		    anchor: TRange_Target = rng.anchorNode(),
		    target: TRange_Target = focus || anchor,
		    targetNode: TNode_Element = target.target.ownerBlockElement(),
		    method: TNewLinePolicy,
		    index: number = target.fragPos,
		    jumpPosition: number = 0;

		// no target node, no new line ...
		if ( targetNode === null ) {
			return;
		}

		if ( !alternateMethod ) {
			//default
			method = targetNode.insertLinePolicy;
		} else {
			method = targetNode.alternateInsertLinePolicy;
		}

		if ( method == TNewLinePolicy.BR ) {
			
			jumpPosition = targetNode.createSurgery(
				index,
				false
			);

			// we're expecting that the jump position is a node begin.
			target.target = this.viewport.document.findNodeAtIndex( jumpPosition );

			target.fragPos = jumpPosition;

			var breakElement = this.viewport.document.createElement( 'br' );

			// append the break *before* the target.target.
			target.target.parentNode.appendChild( breakElement, target.fragPos == target.target.FRAGMENT_END ? target.target.siblingIndex + 1 : target.target.siblingIndex );

			// force relayout;

			this.viewport.document.relayout( true );

			jumpPosition = breakElement.FRAGMENT_START;
			target.target = breakElement;

		} else {
			
			jumpPosition = targetNode.createSurgery( 
				index, 
				true, 
				[ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote' ].indexOf( targetNode.is() ) >= 0
					? 'p'
					: targetNode.is()
			);

			target.target = this.viewport.document.findNodeAtIndex( jumpPosition );
			target.fragPos = jumpPosition;

		}

		// if we landedd on a node begin, or node end, we move the caret until we find text.
		// jump to first available character in document
		while ( jumpPosition < this.viewport.document.fragment.length() && [ FragmentItem.CHARACTER, FragmentItem.WHITE_SPACE, FragmentItem.EOL ].indexOf( this.viewport.document.fragment.at( jumpPosition ) ) == -1 ) {
			jumpPosition++;
		}

		target.target = this.viewport.document.findNodeAtIndex( jumpPosition );
		target.fragPos = jumpPosition;

		rng.collapse( true );

		this.viewport.scrollToCaret();

	}

	// moves the caret, and optionally extends the selection to the
	// new caret position.
	public moveCaret( movementType: CaretPos, amount: number, expandSelection: boolean ) {

		var td: HTML_TableCell,
		     p: HTML_Paragraph;

		if ( this.caretX && movementType != CaretPos.LINE_VERTICAL ) {
			this.caretX = null;
		}

		var range: TRange = this.viewport.selection.getRange(),
		    focus: TRange_Target = range.focusNode(),
		    lineIndex: number,
		    lines: Character_LinesCollection,
		    line: Character_Line;

		if ( range.isMultiRange() ) {
			return;
		}

		if ( range.length() == null || !focus && !range.isOrphan() ) {
			return;
		} else {
			if ( !expandSelection ) {
				range.collapse( true );
			}
		}

		range.setEventingState( false );

		try {

		switch ( movementType ) {
			case CaretPos.CHARACTER:
				focus.moveByCharacters( amount );
				if ( !expandSelection ) {
					range.collapse( true );
				}
				this.viewport.scrollToCaret();
				this.viewport.document.requestRepaint();
				break;
			case CaretPos.WORD:
				focus.moveByWords( amount );
				if ( !expandSelection ) {
					range.collapse( true );
				}
				this.viewport.scrollToCaret();
				this.viewport.document.requestRepaint();
				break;
			case CaretPos.VIEWPORT:
				break;
			case CaretPos.LINE_HORIZONTAL:
				
				if ( Math.abs( amount ) != 1 ) {
					throw "Allowed values are -1 or 1.";
				}
				
				lineIndex = focus.getLineIndex();

				if ( lineIndex >= 0 ) {

					lines = this.viewport.document.lines;
					line = lines.at( lineIndex );
					focus.fragPos = line[ amount == -1 ? "fragmentIndexStart" : "fragmentIndexEnd" ];
					focus.target = this.viewport.document.findNodeAtIndex( focus.fragPos );
					if ( !expandSelection ) {
						range.collapse( true );
					}
					this.viewport.scrollToCaret();
					this.viewport.document.requestRepaint();

				}

				break;

			case CaretPos.LINE_VERTICAL:

				if ( Math.abs( amount ) != 1 ) {
					throw "Allowed values are -1 or 1.";
				}

				if ( focus.target.ownerBlockElement().is() == 'td' && !expandSelection ) {
					td = <HTML_TableCell>focus.target.ownerBlockElement();
					if ( amount == -1 && td.isTheFirstCell() && !td.parentNode.parentNode.previousSibling() ) {
						p = td.documentElement.createElement('p');
						td.parentNode.parentNode.parentNode.appendChild( p, 0 );
						td.documentElement.relayout( true );
						this.viewport.selection.anchorTo( new TRange_Target( p, p.FRAGMENT_START ) );
						return;
					} else
					if ( amount == 1 && td.isTheLastCell() && !td.parentNode.parentNode.nextSibling() ) {
						p = td.documentElement.createElement('p');
						td.parentNode.parentNode.parentNode.appendChild( p );
						td.documentElement.relayout( true );
						this.viewport.selection.anchorTo( new TRange_Target( p, p.FRAGMENT_START ) );
						return;
					}
				}

				lineIndex = focus.getLineIndex();

				if ( lineIndex !== null ) {

					lines = this.viewport.document.lines;
					
					line  = lines.at( lineIndex );

					if ( this.caretX === null ) {
						this.caretX = focus.details().paintAbsolute.x;
					}

					try {
						line = lines.at( lineIndex + amount );
					} catch ( jumpException ) {
						//console.warn( 'jumpException' );
						return;
					}

					focus.fragPos = line.getFragmentPositionByAbsoluteX( this.caretX );
					focus.target = this.viewport.document.findNodeAtIndex( focus.fragPos );
					if ( !expandSelection ){
						range.collapse( true );
					}
					this.viewport.scrollToCaret();
					this.viewport.document.requestRepaint();

				}

				break;
		}

		} catch ( moveError ) {
			// :( suppress it.
		}

		range.setEventingState( true );

		range.fire( 'changed' );
	}

	// sets the boldness of the text. if state is null, then the boldness is toggled.
	public bold( state: boolean = null ) {

		var selection = this.viewport.selection,
		          rng = selection.getRange(),
		          len = rng.length();

		if ( !len && !rng.isMultiRange() ) {
			return;
		}

		if ( state === null ) { //toggle state
			state = !( this.viewport.selection.editorState.state.bold );
		}

		if ( state ) {

			this.viewport.selection.getRange().affectedRanges().unwrapFromElement( '!b' ).unwrapFromElement( 'b' ).wrapInElement( 'b', null, null, function() {
				return this.style.fontWeight() != 'bold';
			} ).end();

		} else {

			this.viewport.selection.getRange().affectedRanges().unwrapFromElement( '!b' ).unwrapFromElement( 'b' ).wrapInElement( '!b', null, null, function() {
				return this.style.fontWeight() == 'bold';
			} ).end();

		}

		this.viewport.selection.editorState.compute();
	}

	// sets the strikeness of the text. if state is null, then the strikeness is toggled.
	public strike( state: boolean = null ) {

		var selection = this.viewport.selection,
		          rng = selection.getRange(),
		          len = rng.length();

		if ( !len && !rng.isMultiRange() ) {
			return;
		}

		if ( state === null ) { //toggle state
			state = !( this.viewport.selection.editorState.state.strike );
		}

		if ( state ) {

			this.viewport.selection.getRange().affectedRanges().unwrapFromElement( '!u' ).unwrapFromElement( 'u' ).unwrapFromElement('!strike').unwrapFromElement('strike').wrapInElement( 'strike', null, null, function() {
				return this.style.textDecoration() != 'line-through';
			} ).end();

		} else {

			this.viewport.selection.getRange().affectedRanges().unwrapFromElement( '!u' ).unwrapFromElement( 'u' ).unwrapFromElement('!strike').unwrapFromElement('strike').wrapInElement( '!strike', null, null, function() {
				return this.style.textDecoration() == 'line-through';
			} ).end();

		}

		this.viewport.selection.editorState.compute();
	}

	// makes text italic or not. if state is null, the state is toggled.
	public italic( state: boolean = null ) {

		var selection = this.viewport.selection,
		          rng = selection.getRange(),
		          len = rng.length();

		if ( !len && !rng.isMultiRange() ) {
			return;
		}

		if ( state === null ) { //toggle state
			state = !( this.viewport.selection.editorState.state.italic );
		}

		if ( state ) {

			this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!i').unwrapFromElement( 'i' ).wrapInElement( 'i', null, null, function() {
				return this.style.fontStyle() != 'italic';
			} ).end();

		} else {

			this.viewport.selection.getRange().affectedRanges().unwrapFromElement('!i').unwrapFromElement( 'i' ).wrapInElement('!i', null, null, function() {
				return this.style.fontStyle() == 'italic';
			} ).end();

		}

		this.viewport.selection.editorState.compute();
	}

	// underlines or not the text. if state is null, the state is toggled.
	public underline( state: boolean = null ) {

		var selection = this.viewport.selection,
		          rng = selection.getRange(),
		          len = rng.length();

		if ( !len && !rng.isMultiRange() ) {
			return;
		}

		if ( state === null ) { //toggle state
			state = !( this.viewport.selection.editorState.state.underline );
		}

		if ( state ) {

			this.viewport.selection.getRange().affectedRanges().unwrapFromElement( '!u' ).unwrapFromElement( 'u' ).unwrapFromElement('strike').unwrapFromElement('!strike').wrapInElement( 'u', null, null, function() {
				return this.style.textDecoration() != 'underline';
			} ).end();

		} else {

			this.viewport.selection.getRange().affectedRanges().unwrapFromElement( '!u' ).unwrapFromElement( 'u' ).unwrapFromElement('strike').unwrapFromElement('!strike').wrapInElement( '!u', null, null, function() {
				return this.style.textDecoration() == 'underline';
			} ).end();

		}

		this.viewport.selection.editorState.compute();
	}

	// sets the text alignment.
	// @param alignment: string = enum( 'left', 'right', 'center', 'justified' ).
	// any other values will be considered "left".
	public align( alignment: string = 'left' ) {
		
		if ( this.viewport.selection.getRange().anchorNode().target.is() == 'body' &&
		     !this.viewport.selection.getRange().focusNode() ) {
			return;
		}

		if ( ['img','table'].indexOf( this.viewport.selection.getRange().anchorNode().target.is() ) >= 0 && !this.viewport.selection.getRange().focusNode() ) {

			if ( alignment == 'left' || alignment == 'right' || alignment == 'center' ) {
				(<TNode_Element>this.viewport.selection.getRange().anchorNode().target).style.float( alignment );
			}

		} else {

			var nodes: TNode_Element[] = this.viewport.selection.getRange().affectedBlockNodes(),
			        i: number,
			      len: number;
			
			for ( i=0, len = nodes.length; i<len; i++ ) {
				nodes[i].style.textAlign( alignment );
			}

			if ( nodes.length )
				this.viewport.selection.editorState.compute();

		}

		this.viewport.document.changeThrottler.run();

	}

	// copies the selection into the clipboard.
	public copy( setClipboard: boolean = true ) {

		if ( setClipboard === null ) {
			setClipboard = true;
		}

		var sel = this.viewport.selection,
		    contents = sel.toString();

		if ( !contents ) {
			return; //cannot copy something empty
		}

		if ( setClipboard ) {
			Clipboard.singleton().setContents( contents, 'text/html', TClipboardEffect.COPY );
		}

	}

	// cuts the selection into the clipboard.
	public cut( setClipboard: boolean = true ) {
		
		if ( setClipboard === null ) {
			setClipboard = true;
		}

		var sel = this.viewport.selection,
		    contents = sel.toString();

		if ( !contents ) {
			return;
		}

		if ( setClipboard ) {
			Clipboard.singleton().setContents( contents, 'text/html', TClipboardEffect.CUT );
		}

		sel.removeContents();
	}

	// pastes a text of format contentType.
	// @content: string. if null, the content from the clipboard will be 
	// used instead.
	// @contentType: the type of the content. allowed values can be "text" or "html".
	public paste( content: string = null, contentType: string = null ) {

		var data: TClipboardItem,
		    selection = this.viewport.selection,
		    rng = selection.getRange();

		if ( rng.isMultiRange() ) {
			console.warn( "TO IMPLEMENT PASTE IN MULTIRANGE!" );
			return;
		}

		if ( content === null ) {
			data = Clipboard.singleton().getContents();
			if ( data === null ) {
				return;
			} else {
				content = data.data;
				contentType = data.type;
			}
		}

		if ( !content ) {
			return;
		}

		if ( [ 'text/plain', 'text/html' ].indexOf( contentType ) == -1 ) {
			throw "ERR_BAD_CONTENT_TYPE!";
		}

		if ( contentType == 'text/plain' ) {
			this.insertText( content );
		} else {
			this.viewport.selection.insertHTML( content );
		}

	}

	// indents text with a number of tabs on the left. A tab width is 20px.
	public indent( tabs: number = null ) {
		var nodes: TNode_Element[] = this.viewport.selection.getRange().affectedBlockNodes(),
		        i: number,
		      len: number;

		for ( i=0, len = nodes.length; i<len; i++ ) {
			nodes[i].tabStop( nodes[i].tabStop() + 1 );
		}

	}

	// unindents text with a number of tabs on the left. A tab width is 20px.
	public unindent( tabs: number = null ) {
		var nodes: TNode_Element[] = this.viewport.selection.getRange().affectedBlockNodes(),
		        i: number,
		      len: number;
		      
		for ( i=0, len = nodes.length; i<len; i++ ) {
			nodes[i].tabStop( nodes[i].tabStop() - 1 );
		}


	}

	// sets the text alignment as "sup", "sub", or "normal".
	// "sup" stands for superscript
	// "sub" stands for subscript
	public valign( verticalAlignmentType: string = 'normal' ) {
		if ( ['sup','sub','normal'].indexOf( verticalAlignmentType ) == -1 ) {
			throw "ERR_UNKNOWN_VALIGN_TYPE";
		}

		var selection = this.viewport.selection,
	        rng = selection.getRange(),
	        len = rng.length();

		if ( !len && !rng.isMultiRange() ) {
			return;
		}

		rng.affectedRanges().unwrapFromElement( 'sub' ).unwrapFromElement('sup').wrapInElement( verticalAlignmentType, null, null, function() {
			return verticalAlignmentType == 'sup' || verticalAlignmentType == 'sub';
		} ).end();

		this.viewport.selection.editorState.compute();

	}

	// sets the font of the text.
	public font( fontFamily: string = "Arial" ) {
		
		var selection = this.viewport.selection,
		          rng = selection.getRange(),
		          len = rng.length();

		if ( !len && !rng.isMultiRange() ) {
			return;
		}

		this.viewport.selection.getRange().affectedRanges().unwrapFromElement( 'font' ).wrapInElement( 'font', 'name', fontFamily, function() {
			return fontFamily ? this.style.fontFamily() != fontFamily : false;
		} ).end();

		this.viewport.selection.editorState.compute();

	}

	// sets the color of the selected text. if empty value
	// is used, color is removed.
	public color( colorName: string = "" ) {
		var selection = this.viewport.selection,
		    rng = selection.getRange(),
		    len = rng.length();

		if ( !len && !rng.isMultiRange() ) {
			return;
		}

		this.viewport.selection.getRange().affectedRanges().unwrapFromElement( 'color' ).wrapInElement( 'color', 'name', colorName, function() {
			return colorName ? this.style.color() != colorName : false;
		} ).end();

		this.viewport.selection.editorState.compute();

	}

	// sets the backgroundColor of the selected text. if empty value
	// is used, color is removed.
	//
	// BETA NOTE: background will be set to root elements, not inline.
	public bgColor( colorName: string = "" ) {
		var selection = this.viewport.selection,
		    rng = selection.getRange(),
		    nodes: TNode_Element[] = rng.affectedBlockNodes(),
		    i: number = 0,
		    len: number = nodes.length;

		for ( i=0; i<len; i++ ) {
			nodes[i].setAttribute( 'bgcolor', colorName );
		}

		this.viewport.selection.editorState.compute();

	}

	// sets the font size. value can be also relative
	// using + or -. Eg: fontSize( "+1" ) will increase the text size
	// with 1 value.
	public size( fontSize: string = '' ) {
		var selection = this.viewport.selection,
		    rng = selection.getRange(),
		    len = rng.length();

		if ( !len && !rng.isMultiRange() ) {
			return;
		}

		this.viewport.selection.getRange().affectedRanges().unwrapFromElement( 'size' ).wrapInElement( 'size', 'value', fontSize, function() {
			return fontSize ? String( this.style.fontSize() ) != fontSize : false;
		} ).end();

		this.viewport.selection.editorState.compute();
	}

	// wraps into ul or ol the blocks.
	public list( listType: string, on: boolean = null ) {

		var become: string = '',
		    selection = this.viewport.selection,
		    rng = selection.getRange(),
		    nodes: TNode_Element[] = rng.affectedBlockNodes(),
		    i: number = 0,
		    len: number = nodes.length;

		if ( rng.isMultiRange() ) {
			return;
		}

		if ( on !== null ) {
			become = on ? listType : 'p';
		} else {
			become = this.viewport.selection.editorState.state.listType == listType
				? 'p'
				: listType;
		}

		rng.save();

		for ( i=0; i<len; i++ ) {
			nodes[i].becomeElement( become );
		}

		rng.restore();

		this.viewport.selection.editorState.compute();

	}

	// sets the affected block nodes to be "normal", or "h1".."h6"
	public blockLevel( blockType: string ) {
		if ( [ "normal", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6" ].indexOf( blockType ) == -1 ) {
			throw "Invalid block type!";
		}

		var selection = this.viewport.selection,
		    rng = selection.getRange(),
		    nodes: TNode_Element[] = rng.affectedBlockNodes(),
		    i: number = 0,
		    len: number = nodes.length;

		if ( rng.isMultiRange() ) {
			return;
		}

		rng.save();

		for ( i=0; i<len; i++ ) {
			switch ( blockType ) {
				case 'normal':
					if ( [ 'p', 'td', 'table', 'tr', 'body' ].indexOf( nodes[i].nodeName ) == -1 ) {
						nodes[i].becomeElement( 'p' );
					}
					break;
				case 'blockquote':
				case 'h1':
				case 'h2':
				case 'h3':
				case 'h4':
				case 'h5':
				case 'h6':
					if ( nodes[i].nodeName != blockType ) {
						nodes[i].becomeElement( blockType );
					}
					break;
			}
		}

		rng.restore();

	}

	public clearFormatting() {
		var selection = this.viewport.selection,
		    rng = selection.getRange(),
		    len = rng.length();

		if ( !len && !rng.isMultiRange() ) {
			return;
		}

		this.viewport.selection.getRange().affectedRanges()
			.unwrapFromElement( 'size' )
			.unwrapFromElement( 'font' )
			.unwrapFromElement( 'b' )
			.unwrapFromElement( '!b')
			.unwrapFromElement( 'i' )
			.unwrapFromElement( '!i' )
			.unwrapFromElement( 'u' )
			.unwrapFromElement( '!u' )
			.unwrapFromElement( 'strike' )
			.unwrapFromElement( '!strike' )
			.unwrapFromElement( 'color' )
			.end();


		this.viewport.selection.editorState.compute();

	}

	public link( href: string, text: string = null, target: string = null ) {
		
		/* If text is NULL, we create a batch, unwrap it from A, and wrap it in a[href=href][target=target]
		   Otherwise we insert HTML string @cursor position */

		if ( text === null ) {

			this.viewport.selection.getRange().affectedRanges()
				.unwrapFromElement('a')
				.unwrapFromElement('u')
				.unwrapFromElement('!u')
				.unwrapFromElement('strike')
				.unwrapFromElement('!strike')
				.wrapInElement( 'a', ['href','target'], [ href || '', target || '' ] )
				.end();

		} else {

			if ( this.viewport.selection.getRange().isMultiRange() ) {
				return;
			}

			var a = this.viewport.document.createElement( 'a' );
			a.setAttribute( 'href', href );
			a.setAttribute( 'target', target );
			a.appendChild( this.viewport.document.createTextNode( text || ' ' ) );

			this.viewport.selection.insertHTML( a.outerHTML() );



		}

		this.viewport.selection.editorState.compute();

	}

	public unlink() {
		var selection = this.viewport.selection,
		    rng = selection.getRange(),
		    nodes: TNode_Element[],
		    aNodes: HTML_Anchor[] = [],
		    i: number =0,
		    len: number = 0,
		    node: TNode,
		    block: TNode_Element;

		rng.save();

		if ( rng.length() || rng.isMultiRange() ) {
			nodes = rng.createContextualFragment().affectedInlineElements();
			for ( i=0, len = nodes.length; i<len; i++ ) {
				if ( nodes[i].is() == 'a' ) {
					aNodes.push( <HTML_Anchor>nodes[i] );
				}
			}
		} else {
			// check if the element under cursor is an "A".
			if ( rng.focusNode() ) {
				node = rng.focusNode().target;
				block = node.ownerBlockElement();
				while ( node != block ) {
					if ( node.is() == 'a' ) {
						aNodes.push( <HTML_Anchor>node );
						break;
					}
					node = node.parentNode;
				}
			}
		}

		for ( i=0, len = aNodes.length; i<len; i++ ) {
			aNodes[i].unwrap();
		}

		selection.viewport.document.removeOrphanNodes();
		selection.viewport.document.defragment();

		this.viewport.selection.editorState.compute();

		rng.restore();
	}

}