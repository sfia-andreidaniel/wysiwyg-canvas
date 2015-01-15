class Layout_Horizontal extends Layout {

	public layoutType: string = 'horizontal';

	constructor( node: TNode_Element, children: Layout[] ) {
		super();
		this.node = node;
		this.children = children;
		for ( var i=0, len = this.children.length; i<len; i++ ) {
			this.children[i].parent = this;
			this.children[i].siblingIndex = i;
		}
	}

	public buildAhead( layout: Layout = null ) {
		var i: number,
		    len: number;

		if ( !this.isBuilt ) {
			
			for ( var i=0, len = this.children.length; i<len; i++ ) {
				this.children[i].buildAhead( this );
			}

			this.isBuilt = true;
		}
	}

}