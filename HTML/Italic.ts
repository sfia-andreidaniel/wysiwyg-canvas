class HTML_Italic extends TNode_Element {
	
	public isDefragmentable : boolean = true;
	public nodeClass        : TNode_Class = TNode_Class.INLINE;


	constructor() {
		super();
		this.nodeName = 'i';
		this.style.display('inline');
		this.style.fontStyle('italic');
	}
}