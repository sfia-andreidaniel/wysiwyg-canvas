class HTML_Heading4 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;

	constructor() {
		super();
		this.nodeName = 'h4';
		this.style.display('block');
		this.style.fontSize('16');
		this.style.fontWeight('bold');
	}
}