// in order to build rich interfaces around the editor,
// we need the editorstate class, for knowing what states
// to display on the inputs of the toolbars of the editor


// The editorState fires a "changed" event ( propertyNames: string[] ) with the name of the
// properties that were changed.

class Selection_EditorState extends Events {

	public selection: DocSelection = null;

	// the computed state.
	public state    : EditorState  = null;

	constructor( selection: DocSelection ) {
		super();
		this.selection = selection;
		this.state     = this.createEditorState();
	}

	public createEditorState(): EditorState {
		return {

			bold          : undefined,
			italic        : undefined,
			underline     : undefined,
			strike        : undefined,

			textAlign     : undefined,
			fontFamily    : undefined,
			fontSize      : undefined,
			fontColor     : undefined,
			verticalAlign : undefined,

			blockLevel    : undefined,
			listType      : undefined,

			table         : undefined,
			cell          : undefined
		};
	}

	public compute() {

		var nodes: TNode_Text[]        = [],
		    rng  : TRange              = this.selection.getRange(),
		    frag : Fragment_Contextual = null,
		    i    : number              = 0,
		    len  : number              = 0,
		    state: EditorState         = this.createEditorState(),
		    focus: TRange_Target       = rng.focusNode(),
		    anchor: TRange_Target      = rng.anchorNode(),
		    element: TNode_Element     = null,

		    fBold      : boolean   = false,
		    fItalic    : boolean   = false,
		    fUnderline : boolean   = false,
		    fStrike    : boolean    = false,

		    fTextAlign : string    = null,
		    fFontFamily: string    = null,
		    fFontSize  : number    = null,
		    fFontColor : string    = null,
		    fVerticalAlign: string = null,
		    fBlockLevel: string    = null,
		    fListType  : string    = null,

		    textDecoration: string = null,

		    nulls      : number = 0,

		    changed    : string[] = [],
		    k          : string   = '',

		    blockElement: TNode_Element,
		    listType    : string,

		    fCursor     : TNode_Element,
		    nodeMultiRng: HTML_MultiRange;

		if ( ( focus && rng.length() ) || rng.isMultiRange() ) {
			frag = rng.createContextualFragment();
			nodes = frag.affectedTextNodes();
		} else {
			if ( anchor.target.nodeType == TNode_Type.TEXT ) {
				nodes.push( <TNode_Text>anchor.target );
			}
		}

		for ( i=0, len = nodes.length; i<len; i++ ) {
			if ( nodes[i].parentNode != element ) {

				element = nodes[i].parentNode;
				
				if ( element ) {

					blockElement = element.ownerBlockElement();

					switch (blockElement.nodeName) {
						case 'p':
						case 'li':
						case 'td':
						case 'body':
							fBlockLevel = 'normal';
							break;
						case 'h1':
						case 'h2':
						case 'h3':
						case 'h4':
						case 'h5':
						case 'h6':
						case 'h7':
							fBlockLevel = blockElement.nodeName;
							break;
					}

					if ( blockElement.nodeName == 'li' && blockElement.parentNode ) {

						switch ( blockElement.parentNode.nodeName ) {
							case 'ul':
							case 'ol':
								fListType = blockElement.parentNode.nodeName;
								break;
							default:
								fListType = null;
								break;
						}

					} else {
						fListType = null;
					}

					fBold          = element.style.fontWeight() == 'bold';
					fItalic        = element.style.fontStyle() == 'italic';
					
					textDecoration = element.style.textDecoration();

					fUnderline     = ( textDecoration == 'underline' );
					fStrike        = ( textDecoration == 'line-through' );
					
					fTextAlign     = element.style.textAlign() || 'left';
					fFontFamily    = element.style.fontFamily() || 'Arial';
					fFontSize      = ~~element.style.fontSize() || 0;
					fFontColor     = element.style.color() || '#000000';
					fVerticalAlign = element.style.verticalAlign() || 'normal';

					if ( state.blockLevel === undefined ) {
						state.blockLevel = fBlockLevel;
					} else {
						if ( state.blockLevel !== null && state.blockLevel !== fBlockLevel ) {
							state.blockLevel = null;
							nulls++;
						}
					}

					if ( state.listType === undefined ) {
						state.listType = fListType;
						if ( fListType === null ) {
							nulls++;
						}
					} else {
						if ( state.listType !== null && state.listType !== fListType ) {
							state.listType = null;
							nulls++;
						}
					}

					if ( state.bold === undefined ) {
						state.bold = fBold;
					} else {
						if ( state.bold !== null && state.bold !== fBold ) {
							state.bold = null;
							nulls++;
						}
					}

					if ( state.italic === undefined ) {
						state.italic = fItalic;
					} else {
						if ( state.italic !== null && state.italic !== fItalic ) {
							state.italic = null;
							nulls++;
						}
					}

					if ( state.underline === undefined ) {
						state.underline = fUnderline;
					} else {
						if ( state.underline !== null && state.underline !== fUnderline ) {
							state.underline = null;
							nulls++;
						}
					}

					if ( state.strike === undefined ) {
						state.strike = fStrike;
					} else {
						if ( state.strike !== null && state.strike !== fStrike ) {
							state.strike = null;
							nulls++;
						}
					}


					if ( state.textAlign === undefined ) {
						state.textAlign = fTextAlign;
					} else {
						if ( state.textAlign !== null && state.textAlign !== fTextAlign ) {
							state.textAlign = null;
							nulls++;
						}
					}

					if ( state.fontFamily === undefined ) {
						state.fontFamily = fFontFamily;
					} else {
						if ( state.fontFamily !== null && state.fontFamily !== fFontFamily ) {
							state.fontFamily = null;
							nulls++;
						}
					}

					if ( state.fontSize === undefined ) {
						state.fontSize = fFontSize;
					} else {
						if ( state.fontSize !== null && state.fontSize !== fFontSize ) {
							state.fontSize = null;
							nulls++;
						}
					}

					if ( state.fontColor === undefined ) {
						state.fontColor = fFontColor;
					} else {
						if ( state.fontColor !== null && state.fontColor !== fFontColor ) {
							state.fontColor = null;
							nulls++;
						}
					}

					if ( state.verticalAlign === undefined ) {
						state.verticalAlign = fVerticalAlign;
					} else {
						if ( state.verticalAlign !== null && state.verticalAlign !== fVerticalAlign ) {
							state.verticalAlign = null;
							nulls++;
						}
					}

				}
			}

			if ( nulls == 11 ) { // all properties are set to null
				break;
			}

		}

		/* The editorState.table and the editorState.cell is computed with another algorithm */
		switch ( true ) {
			
			case rng.isMultiRange():

				nodeMultiRng = (<HTML_MultiRange>rng.anchorNode().target);

				switch ( nodeMultiRng.role ) {
					case 'table-row':
					case 'table-column':
						state.table = false;
						state.cell  = <HTML_TableCell>(nodeMultiRng.childNodes[0]);
						break;
					case 'table-selection':
						state.table = false;
						state.cell  = <HTML_TableCell>( (<HTML_MultiRange_TableRect>nodeMultiRng).focus );
						break;
					default:
						state.table = false;
						state.cell  = null;
						break;
				}

				break;

			case !!!rng.focusNode():

				switch ( rng.anchorNode().target.is() ) {
					case 'td':
						state.cell = <HTML_TableCell>( rng.anchorNode().target );
						state.table= false;
						break;
					default:
						state.table = false;
						state.cell  = null;
						break;
				}

				break;

			case !!rng.focusNode():

				switch ( rng.focusNode().target.ownerBlockElement().is() ) {
					case 'td':
						state.cell = <HTML_TableCell>( rng.focusNode().target.ownerBlockElement() );
						state.table= false;
						break;
					
					default:

						state.cell = null;
						state.table = !!!rng.length() && !!!( rng.focusNode().target.firstParentOfType( 'td' ) );
						
						fCursor = rng.focusNode().target.ownerBlockElement().parentNode;

						while ( fCursor ) {

							if ( fCursor.is() == 'td' ) {
								state.cell = <HTML_TableCell>fCursor;
								break;
							}

							fCursor = fCursor.parentNode;
						}

						break;
				}

				break;

			default:
				state.cell = null;
				state.table = false;

		}

		// compute diffs.
		for ( k in state ) {
			if ( state[k] !== this.state[k] ) {
				changed.push( k );
				this.state[k] = state[k];
			}
		}

		if ( changed.length ) {
			this.fire( 'changed', changed );
		}

	}
}