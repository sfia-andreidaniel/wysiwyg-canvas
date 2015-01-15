class Layout_Vertical extends Layout {

	constructor ( node: TNode_Element, children: Layout[] )	{
		super();
		this.children = children;
		this.node = node;
	}

}