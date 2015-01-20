class HTML_Subscript extends TNode_Element {
	constructor() {
		super();
		this.nodeName = 'sub';
		this.style.display( 'inline' );
		this.style.verticalAlign( 'sub' );
		this.style.fontSize( '80%' );
	}
}