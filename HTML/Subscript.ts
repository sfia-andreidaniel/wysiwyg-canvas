class HTML_Subscript extends TNode_Element {
	
	public isDefragmentable : boolean = true;

	constructor() {
		super();
		this.nodeName = 'sub';
		this.style.display( 'inline' );
		this.style.verticalAlign( 'sub' );
		this.style.fontSize( '80%' );
	}
}