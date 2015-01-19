class HTML_Italic extends TNode_Element {
	constructor() {
		super();
		this.nodeName = 'i';
		this.style.display('inline');
		this.style.fontStyle('italic');
	}
}