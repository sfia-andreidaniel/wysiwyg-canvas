class HTML_Heading3 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;
	public  nodeClass        : TNode_Class = TNode_Class.BLOCK_EDITABLE;


	constructor() {
		super();
		this.nodeName = 'h3';
		this.style.display('block');
		this.style.fontSize('17');
		this.style.fontWeight('bold');
		this.style.fontStyle('italic');
	}
}