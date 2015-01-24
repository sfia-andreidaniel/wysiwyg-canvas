class Fragment_Contextual_TextNode extends Fragment_Contextual_Item {

	public type: FragmentCItem = FragmentCItem.TEXT;
	
	constructor( public node: TNode_Text, private start: number = null, private end: number = null ) {
		super();
	}

	public isWholeNode(): boolean {
		return this.node.textContents() == this.node.textContentsFragment( this.start, this.end );
	}

	public toString(): string {
		return this.node.textContentsFragment( this.start, this.end );
	}

	public removeFromDocument() {
		this.node.remove();
	}

	public removeSelectedText() {
		var out: string[] = [];

		if ( this.start > this.node.FRAGMENT_START ) {
			out.push( this.node.textContentsFragment( this.node.FRAGMENT_START, this.start - 1 ) );
		}

		if ( this.end < this.node.FRAGMENT_END ) {
			out.push( this.node.textContentsFragment( this.end + 1, this.node.FRAGMENT_END ) );
		}

		this.node.textContents( out.join('') );
	}

}