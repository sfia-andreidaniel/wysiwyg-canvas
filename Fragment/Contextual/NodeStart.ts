class Fragment_Contextual_NodeStart extends Fragment_Contextual_Item {
	
	public type: FragmentCItem = FragmentCItem.NODE_START;

	constructor( public node: TNode_Element ) {
		super();
	}

	public toString(): string {
		return this.node.xmlBeginning();
	}

	public removeFromDocument() {
		if ( this.node.is() != 'td' ) {
			this.node.remove();
		} else {
			if ( this.node.is() == 'td' ) {
				this.node.removeAllChildNodes();
			}
		}
	}

}