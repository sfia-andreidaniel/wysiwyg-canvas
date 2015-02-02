class HTML_Strike extends TNode_Element {

	public isDefragmentable : boolean = true;
	public  nodeClass       : TNode_Class = TNode_Class.INLINE;


	constructor() {
		super();
		this.nodeName = 'strike';
		this.style.display('inline');
		this.style.textDecoration('line-through');
	}
}