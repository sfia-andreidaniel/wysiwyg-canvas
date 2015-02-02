class HTML_Heading5 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;
	public  nodeClass        : TNode_Class = TNode_Class.BLOCK_EDITABLE;


	constructor() {
		super();
		this.nodeName = 'h5';
		this.style.display('block');
		this.style.fontSize('15');
		this.style.fontWeight('bold');
	}
}