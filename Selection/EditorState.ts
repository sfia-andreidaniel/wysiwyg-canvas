// in order to build rich interfaces around the editor,
// we need the editorstate class, for knowing what states
// to display on the inputs of the toolbars of the editor

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

			bold          : null,
			italic        : null,
			underline     : null,

			textAlign     : null,
			fontFamily    : null,
			fontSize      : null,
			fontColor     : null,
			verticalAlign : null
		};
	}

	public compute() {
		var nodes: TNode_Text[]        = [],
		    rng  : TRange              = this.selection.getRange(),
		    frag : Fragment_Contextual = null,
		    i    : number              = 0,
		    len  : number              = 0,
		    state: EditorState         = this.createEditorState();
	}
}