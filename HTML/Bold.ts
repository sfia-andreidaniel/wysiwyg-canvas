class HTML_Bold extends TNode_Element {
	
	public isDefragmentable : boolean = true;
	public nodeClass        : TNode_Class = TNode_Class.INLINE;

	constructor() {
		super();
		this.nodeName = 'b';
		this.style.display('inline');
		this.style.fontWeight('bold');
	}
}