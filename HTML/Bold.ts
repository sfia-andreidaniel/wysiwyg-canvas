class HTML_Bold extends TNode_Element {
	
	public isDefragmentable : boolean = true;

	constructor() {
		super();
		this.nodeName = 'b';
		this.style.display('inline');
		this.style.fontWeight('bold');
	}
}