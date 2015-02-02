class HTML_Heading2 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;
	public  nodeClass        : TNode_Class = TNode_Class.BLOCK_EDITABLE;


	constructor() {
		super();
		this.nodeName = 'h2';
		this.style.display('block');
		this.style.fontSize('17');
		this.style.fontWeight('bold');
	}
}