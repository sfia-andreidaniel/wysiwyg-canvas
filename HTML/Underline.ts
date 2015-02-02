class HTML_Underline extends TNode_Element {

	public isDefragmentable : boolean = true;
	public nodeClass        : TNode_Class = TNode_Class.INLINE;


	constructor() {
		super();
		this.nodeName = 'u';
		this.style.display('inline');
		this.style.textDecoration('underline');
	}
}