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

			textAlign     : undefined,
			fontFamily    : undefined,
			fontSize      : undefined,
			fontColor     : undefined,
			verticalAlign : undefined
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

		    fTextAlign : string    = null,
		    fFontFamily: string    = null,
		    fFontSize  : number    = null,
		    fFontColor : string    = null,
		    fVerticalAlign: string = null,

		    nulls      : number = 0,

		    changed    : string[] = [],
		    k          : string   = '';

		if ( focus && rng.length() ) {
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

					fBold          = element.style.fontWeight() == 'bold';
					fItalic        = element.style.fontStyle() == 'italic';
					fUnderline     = element.style.textDecoration() == 'underline';
					fTextAlign     = element.style.textAlign() || 'left';
					fFontFamily    = element.style.fontFamily() || 'Arial';
					fFontSize      = ~~element.style.fontSize() || 0;
					fFontColor     = element.style.color() || '#000000';
					fVerticalAlign = element.style.verticalAlign() || 'normal';

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

			if ( nulls == 8 ) { // all properties are set to null
				break;
			}

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