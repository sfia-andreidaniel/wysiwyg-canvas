class Layout_Block extends Layout {

	public children   : Layout[] = null;
	public layoutType : string   = 'block';

	constructor( element: TNode_Element ) {
		super();
		this.node = element;
	}

	public buildAhead( layout: Layout = null ) {

		var i: number,
		    len: number,
		    replaceLayout: Layout;

		if ( !this.isBuilt ) {
			
			// console.log( 'build ahead: block layout for ' + this.node.nodeName );

			if ( this.node ) {

				if ( this.node.childNodes && this.node.childNodes.length ) {

					if ( !this.parent ) {
						throw "unhandled scenario";
					}

					// console.log( 'replace layout @index: ' + this.siblingIndex );
					replaceLayout = this.node.createLayout( this.parent );
					this.parent.children[ this.siblingIndex ] = this.node.createLayout( this.parent );
					this.parent.children[ this.siblingIndex ].node = this.node;

				}

			} else {
				throw "Unhandled scenario.";
			}

			this.isBuilt = true;
		}
	}

}