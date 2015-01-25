class HTML_Heading3 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;

	constructor() {
		super();
		this.nodeName = 'h3';
		this.style.display('block');
		this.style.fontSize('17');
		this.style.fontWeight('bold');
		this.style.fontStyle('italic');
	}
}