class TNode_Collection_Dettached extends TNode_Collection {

	public parentNode           : TNode_Element = null;
	public originalSiblingIndex : number        = 0;
	public increaseFragmentSize : number        = 0;

	constructor( addNodes: TNode[], parentNode: TNode_Element, originalSiblingIndex: number, increaseFragmentSize: number = 0 ) {
		super( addNodes );
		this.parentNode = parentNode;
		this.originalSiblingIndex = originalSiblingIndex;
	}

}