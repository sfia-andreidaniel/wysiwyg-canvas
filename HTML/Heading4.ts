class HTML_Heading4 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;
	public  nodeClass        : TNode_Class = TNode_Class.BLOCK_EDITABLE;


	constructor() {
		super();
		this.nodeName = 'h4';
		this.style.display('block');
		this.style.fontSize('16');
		this.style.fontWeight('bold');
	}
}