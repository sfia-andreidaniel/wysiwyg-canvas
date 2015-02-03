class HTML_Anchor extends TNode_Element {
	constructor() {
		super();
		this.nodeName = 'a';
		this.style.display('inline');
		this.style.color('blue');
		this.style.textDecoration('underline');
	}
}