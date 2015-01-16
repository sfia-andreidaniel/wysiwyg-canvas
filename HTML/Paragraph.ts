class HTML_Paragraph extends TNode_Element {
	constructor() {
		super();
		this.nodeName = 'p';
		this.style.display('block');
		this.style.padding( '25' );
	}
}