class Viewport_CommandRouter extends Events {

	public viewport: Viewport;

	constructor( viewport: Viewport ) {
		super();
		this.viewport = viewport;
	}

	public commandName( command: EditorCommand ): string {
		switch ( command ) {
			case EditorCommand.INSERT_TEXT: return 'insertText'; break;
			case EditorCommand.DELETE_TEXT:	return 'deleteText'; break;
			case EditorCommand.NEW_LINE: 	return 'newLine'; 	 break;
			case EditorCommand.MOVE: 		return 'moveCaret';  break;
			case EditorCommand.BOLD:		return 'bold';		 break;
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
			case EditorCommand.SIZE:		return 'setSize';	 break;
			case EditorCommand.LIST:        return 'list';       break;
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

		console.log( 'dispatchCommand: ' + commandName + '(' + JSON.stringify( args ) + ')' );

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
				if ( !this.ensureArgs( args, 0, 0 ) ) {
					throw "Command: " + commandName + " doesn't require any arguments!";
				} else {
					this.copy();
				}
				break;
			case EditorCommand.CUT:
				if ( !this.ensureArgs( args, 0, 0 ) ) {
					throw "Command: " + commandName + " doesn't require any arguments!";
				} else {
					this.cut();
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
			case EditorCommand.SIZE:
				if ( !this.ensureArgs( args, 1, 1 ) ) {
					throw "Command: " + commandName + " requires a single argument of type string!";
				} else {
					this.size( String( args[0] || '' ) );
				}
				break;
			case EditorCommand.LIST:
				if ( !this.ensureArgs( args, 2, 2 ) ) {
					throw "Command: " + commandName + " requires two arguments: string, boolean";
				} else {
					this.list( String( args[0] || 'ul' ), !!args[1] );
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
		    otherNode: boolean = false;

		if ( !focus ) {
			return;
		}

		// clear existing selection if any.
		if ( this.viewport.selection.getRange().length() ) {
			this.viewport.selection.removeContents();
			range = this.viewport.selection.getRange();
			focus = range.focusNode();
		}

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

		
	}

	private removeCharLeft( currentFragPos: number ) {
		/* 1. 
	   
	   	1.1. There are no more characters until the left of the ownerBlockElement.
	         Merge current ownerBlockElement() with previous ownerBlockElement

	   	1.2. The exactly previous white-space or character on current document fragment
	        corresponds to a BR tag.
	        Delete the br tag.

	   	1.3. The exactly previous white-space or character in the document is a child of
	        this ownerBlockElement.
	        
	        1.3.1. Delete that character. If it's owner parent has no textContents(), also delete
	        it's parent too.

	        1.3.2. After 1.3.1, the current ownerBlockElement() remains with textContents empty.
	               Jump to the end of previous ownerBlockElement.
	   	*/

 		try {

		   	var document = this.viewport.document,
		   		fragment = document.fragment,
		   	    at: FragmentItem,
		   	    currentNode = document.findNodeAtIndex( currentFragPos ),
		   	    ownerBlockElement = currentNode.ownerBlockElement(),
		   	    minFragPos = ownerBlockElement.FRAGMENT_START,
		   	    rmFragPos  = null,
		   	    targetRemovalNode: TNode_Text = null,
		   	    previousBlockElement: TNode = null,
		   	    myAllNodes: TNode_Collection,
		   	    prevSibling: TNode,
		   	    selection = this.viewport.selection,
		   	    firstNode: TNode,
		   	    realNumChars: number = 0,
		   	    rng = selection.getRange(),
		   	    focus;

		   	console.log( [ document, fragment, at, currentNode, ownerBlockElement, currentFragPos ]);

		   	while ( --currentFragPos > minFragPos ) {
		   		at = fragment.at( currentFragPos );
		   		if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
		   			rmFragPos = currentFragPos;
		   			targetRemovalNode = <TNode_Text>document.findNodeAtIndex( rmFragPos );
		   			break;
		   		}
		   	}

		   	if ( rmFragPos === null ) {
		   		// 1.1
		   		
		   		if ( ownerBlockElement == document || !ownerBlockElement.isMergeable ) {
		   			return; // did all my best, cannot disolve the body or a non-mergeable element.
		   		}

		   		firstNode = ownerBlockElement.childNodes[0] || null;

		   		prevSibling = ownerBlockElement.previousSibling();
		   		myAllNodes = new TNode_Collection( ownerBlockElement.childNodes );

		   		if ( prevSibling === null ) {
		   			// append all my nodes @ my siblingIndex
		   			(<TNode_Element>ownerBlockElement.parentNode).appendCollection( myAllNodes, ownerBlockElement.siblingIndex );
		   			ownerBlockElement.remove();
		   		} else {
		   			if ( prevSibling.nodeType == TNode_Type.TEXT || !(<TNode_Element>prevSibling).isMergeable ) {
		   				(<TNode_Element>ownerBlockElement.parentNode).appendCollection( myAllNodes, ownerBlockElement.siblingIndex );
		   			} else {
		   				(<TNode_Element>prevSibling).appendCollection( myAllNodes );
		   			}
		   			ownerBlockElement.remove();
		   		}

		   		document.relayout(true);

		   		if ( firstNode ) {
		   			selection.getRange().focusNode().fragPos = firstNode.FRAGMENT_START;
		   			selection.getRange().focusNode().target = firstNode;
		   			selection.getRange().moveLeftUntilCharacterIfNotLandedOnText();
		   		} else {
		   			selection.getRange().moveLeftUntilCharacterIfNotLandedOnText(); // re-land selection
		   		}

		   		selection.getRange().fire( 'changed' );

		   		return;
		   	
		   	}

		   	if ( targetRemovalNode.isBR ) {
		   		//1.2.
		   		this.moveCaret( CaretPos.CHARACTER, -2, false );
		   		targetRemovalNode.parentNode.remove();
		   		//this.moveCaret( CaretPos.CHARACTER, -1, false );
		   		console.error( "B");
		   		return;
		   	}

		   	// count the number of real characters until first node start.

		   	realNumChars = targetRemovalNode.deleteTextContentsBetweenFragmentPositions( rmFragPos, rmFragPos );

		   	document.removeOrphanNodes();

		   	document.relayout(true);

		   	focus = rng.focusNode();

		   	focus.target = targetRemovalNode;

		   	focus.fragPos = targetRemovalNode.textIndexForTextLength( realNumChars );

		   	if ( targetRemovalNode.parentNode === null ) {
		   		focus.target = document.findNodeAtIndex( focus.fragPos );
		   		rng.moveRightUntilCharacterIfNotLandedOnText();
		   	} else {
		   		if ( focus.fragPos > targetRemovalNode.FRAGMENT_END ) {
		   			rng.moveRightUntilCharacterIfNotLandedOnText();
		   		}
		   	}

		   	rng = selection.getRange();
		   	focus = rng.focusNode();

		   	rng.collapse( true );

		   	console.error( focus.target.parentNode.nodeName );

		   	window['$r'] = rng;

	   	} catch ( exception ) {
	   		console.error( exception );
	   	}
		 
	}



	private removeCharRight( currentFragPos: number ) {

	}

	// negative values delete characters in the left of the caret,
	// positive values delete characters in the right of the caret
	public deleteText( amount: number ) {

		if ( !amount ) {
			return;
		}

		var rng = this.viewport.selection.getRange(),
		    focus = rng.focusNode(); 

		if ( rng.length() ) {
			this.viewport.selection.removeContents();
		} else {

			if ( rng.length() === null ) {
				console.warn( "WILL BE IMPLEMENTED LATER!" );
			} else {

				// deny deleting more than a character @ once.
				if ( Math.abs( amount ) != 1 ) {
					throw "ERR_BAD_ARGUMENT. Allowed argument is -1 or 1.";
				}

				if ( amount < 1 ) {
					this.removeCharLeft( focus.fragPos );
				} else {
					this.removeCharRight( focus.fragPos );
				}

			}

		}
	}

	// inserts a new line in document. if forceBRTag is set (not null)
	// a <br> tag will be inserted instead of creating a new paragraph.
	public newLine( alternateMethod: boolean = null ) {
		
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
				[ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ].indexOf( targetNode.nodeName ) >= 0
					? 'p'
					: targetNode.nodeName
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

	}

	// moves the caret, and optionally extends the selection to the
	// new caret position.
	public moveCaret( movementType: CaretPos, amount: number, expandSelection: boolean ) {
		
		var range: TRange = this.viewport.selection.getRange(),
		    focus: TRange_Target = range.focusNode();

		if ( range.length() == null || !focus ) {
			return;
		} else {
			if ( !expandSelection ) {
				range.collapse( true );
			}
		}

		range.setEventingState( false );

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
				break;
			case CaretPos.LINE_VERTICAL:
				break;
		}

		range.setEventingState( true );

		range.fire( 'changed' );
	}

	// sets the boldness of the text. if state is null, then the boldness is toggled.
	public bold( state: boolean = null ) {

	}

	// makes text italic or not. if state is null, the state is toggled.
	public italic( state: boolean = null ) {

	}

	// underlines or not the text. if state is null, the state is toggled.
	public underline( state: boolean = null ) {

	}

	// sets the text alignment.
	// @param alignment: string = enum( 'left', 'right', 'center', 'justified' ).
	// any other values will be considered "left".
	public align( alignment: string = 'left' ) {

	}

	// copies the selection into the clipboard.
	public copy() {

	}

	// cuts the selection into the clipboard.
	public cut() {

	}

	// pastes a text of format contentType.
	// @content: string. if null, the content from the clipboard will be 
	// used instead.
	// @contentType: the type of the content. allowed values can be "text" or "html".
	public paste( content: string = null, contentType: string = null ) {

	}

	// indents text with a number of tabs on the left. A tab width is 20px.
	public indent( tabs: number = null ) {

	}

	// unindents text with a number of tabs on the left. A tab width is 20px.
	public unindent( tabs: number = null ) {

	}

	// sets the text alignment as "sup", "sub", or "normal".
	// "sup" stands for superscript
	// "sub" stands for subscript
	public valign( verticalAlignmentType: string = 'normal' ) {

	}

	// sets the font of the text.
	public font( fontFamily: string = "Arial" ) {

	}

	// sets the color of the selected text. if empty value
	// is used, color is removed.
	public color( colorName: string = "" ) {

	}

	// sets the font size. value can be also relative
	// using + or -. Eg: fontSize( "+1" ) will increase the text size
	// with 1 value.
	public size( fontSize: string = '' ) {

	}

	// wraps into ul or ol the blocks.
	public list( listType: string, on: boolean = true ) {

	}

}