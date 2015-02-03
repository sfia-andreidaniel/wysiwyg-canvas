class HTML_Superscript extends TNode_Element {
	
	public isDefragmentable : boolean = true;
	
	constructor() {
		super();
		this.nodeName = 'sup';
		this.style.display( 'inline' );
		this.style.verticalAlign( 'super' );
		this.style.fontSize( '80%' );
	}
}