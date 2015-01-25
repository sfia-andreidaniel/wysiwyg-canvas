class HTML_Heading5 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;

	constructor() {
		super();
		this.nodeName = 'h5';
		this.style.display('block');
		this.style.fontSize('15');
		this.style.fontWeight('bold');
	}
}