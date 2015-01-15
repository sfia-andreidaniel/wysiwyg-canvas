class HTML_Body extends TNode_Element {
	
	constructor() {
		super();
		this.nodeName = 'body';
		this.documentElement = this;
		this.parentNode = null;
		this.style.display( 'block' );
		this.style.width( '100%' );
		this.style.height( '100%' );
	}

	createTextNode( textContents: string ): TNode_Text {
		var node: TNode_Text = new TNode_Text( textContents );
		node.documentElement = this;
		return node;
	}

	createElement( elementName: string ): TNode_Element {
		
		var node: TNode_Element;
		
		elementName = String( elementName || '' ).toLowerCase();

		switch ( elementName ) {
			case 'p':
				node = new HTML_Paragraph();
				break;
			default:
				node = new TNode_Element();
				break;
		}

		node.nodeName = elementName;
		node.documentElement = this;

		return node;
	}

}