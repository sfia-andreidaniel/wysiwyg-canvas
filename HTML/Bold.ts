class HTML_Bold extends TNode_Element {
	constructor() {
		super();
		this.nodeName = 'b';
		this.style.display('inline');
		this.style.fontWeight('bold');
	}
}