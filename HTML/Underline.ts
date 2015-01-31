class HTML_Underline extends TNode_Element {

	public isDefragmentable : boolean = true;

	constructor() {
		super();
		this.nodeName = 'u';
		this.style.display('inline');
		this.style.textDecoration('underline');
	}
}