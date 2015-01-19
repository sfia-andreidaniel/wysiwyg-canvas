class HTML_Underline extends TNode_Element {
	constructor() {
		super();
		this.nodeName = 'u';
		this.style.display('inline');
		this.style.textDecoration('underline');
	}
}