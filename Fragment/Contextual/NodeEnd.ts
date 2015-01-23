class Fragment_Contextual_NodeEnd extends Fragment_Contextual_Item {
	
	public type: FragmentCItem = FragmentCItem.NODE_END;

	constructor( public node: TNode_Element ) {
		super();
	}

	public toString(): string {
		return this.node.xmlEnding();
	}

	public removeFromDocument() {
		this.node.remove();
	}
}