class HTML_BreakElement extends TNode_Element {
	
	constructor() {
		super();
		this.nodeName = 'br';
		this.style.display('block');
	}

	public removeOrphanNodes() {
		// void, intentionally.
	}

}