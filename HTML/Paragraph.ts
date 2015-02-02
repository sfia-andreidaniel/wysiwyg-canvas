class HTML_Paragraph extends TNode_Element {
	
	public isBlockTextNode : boolean = true;
	public nodeClass       : TNode_Class = TNode_Class.BLOCK_EDITABLE;


	constructor() {
		super();
		this.nodeName = 'p';
		this.style.display('block');
		this.style.marginTop( '5' );
		this.style.marginBottom( '10' );
	}
}