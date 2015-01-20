class HTML_Superscript extends TNode_Element {
	constructor() {
		super();
		this.nodeName = 'sup';
		this.style.display( 'inline' );
		this.style.verticalAlign( 'super' );
		this.style.fontSize( '80%' );
	}
}