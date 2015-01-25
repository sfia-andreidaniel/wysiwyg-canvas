class HTML_Heading2 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;

	constructor() {
		super();
		this.nodeName = 'h2';
		this.style.display('block');
		this.style.fontSize('17');
		this.style.fontWeight('bold');
	}
}