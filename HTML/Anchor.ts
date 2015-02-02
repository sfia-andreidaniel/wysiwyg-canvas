class HTML_Anchor extends TNode_Element {
	
	public nodeClass: TNode_Class = TNode_Class.INLINE;

	constructor() {
		super();
		this.nodeName = 'a';
		this.style.display('inline');
		this.style.color('blue');
		this.style.textDecoration('underline');
	}
}