class HTML_Heading1 extends TNode_Element {
	
	public isBlockTextNode  : boolean = true;
	public nodeClass        : TNode_Class = TNode_Class.BLOCK_EDITABLE;


	constructor() {
		super();
		this.nodeName = 'h1';
		this.style.display('block');
		this.style.fontSize('18');
		this.style.fontWeight('bold');
	}
}