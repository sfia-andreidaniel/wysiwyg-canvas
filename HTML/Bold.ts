class HTML_Bold extends TNode_Element {
	
	public isDefragmentable : boolean = true;

	private _parentNode: TNode_Element = null;

	get parentNode(): TNode_Element {
		return this._parentNode;
	}

	set parentNode( node: TNode_Element ) {
		this._parentNode = node;
		console.error( 'parentNode: ', node ? node.is() : 'null' );
	}

	constructor() {
		super();
		this.nodeName = 'b';
		this.style.display('inline');
		this.style.fontWeight('bold');
	}
}