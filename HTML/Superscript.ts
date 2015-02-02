class HTML_Superscript extends TNode_Element {
	
	public isDefragmentable : boolean = true;
	public  nodeClass        : TNode_Class = TNode_Class.INLINE;

	
	constructor() {
		super();
		this.nodeName = 'sup';
		this.style.display( 'inline' );
		this.style.verticalAlign( 'super' );
		this.style.fontSize( '80%' );
	}
}