class HTML_Paragraph extends TNode_Element {
	
	public isBlockTextNode : boolean = true;

	constructor() {
		super();
		this.nodeName = 'p';
		this.style.display('block');
		this.style.marginTop( '5' );
		this.style.marginBottom( '10' );
	}
}