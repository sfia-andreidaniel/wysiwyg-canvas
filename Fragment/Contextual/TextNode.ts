class Fragment_Contextual_TextNode extends Fragment_Contextual_Item {

	public type: FragmentCItem = FragmentCItem.TEXT;
	
	constructor( public node: TNode_Text, public start: number = null, public end: number = null ) {
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
		this.node.deleteTextContentsBetweenFragmentPositions( this.start, this.end );
	}

	/*
	public fragmentateAndReturnNode(): TNode_Text {
		return this.node.createFragmentationAtIndexes( this.start, this.end );
	}
	*/

}