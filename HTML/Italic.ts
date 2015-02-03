class HTML_Italic extends TNode_Element {
	
	public isDefragmentable : boolean = true;

	constructor() {
		super();
		this.nodeName = 'i';
		this.style.display('inline');
		this.style.fontStyle('italic');
	}
}