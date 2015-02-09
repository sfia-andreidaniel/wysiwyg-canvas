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

	public computeWidths( offsetLeftComputed: boolean = false ) {
		
		if ( this.node ) {

			if ( !offsetLeftComputed )
				this.offsetLeft += this.node.style.marginLeft();

		} else {
		
			throw "Unhandled scenario while computing widths!";
		
		}
	}

	public computeHeights( topPlacement: number, indent: number = 0 ): number {

		var contentHeight: number = 0,
		    topPlacementBegin: number = topPlacement;

		if ( this.node ) {
			
			topPlacement += this.node.style.marginTop();

			this.offsetTop = topPlacement;

			this.innerTop = this.offsetTop + this.node.style.paddingTop() + this.node.style.borderWidth();

			contentHeight = this.node.style.height();

		} else {
			throw "invalid block scenario";
		}

		if ( this.children && this.children.length ) {
			throw "unexpected children!";
		}

		// a block Node doesn't contain children anymore...
		topPlacement += contentHeight;
		this.innerHeight = contentHeight;
		this.offsetHeight = contentHeight;


		if ( this.node ) {

			this.offsetHeight += ( this.node.style.paddingBottom() + ( 2 * this.node.style.borderWidth() ) );

			topPlacement += ( this.node.style.paddingBottom() + ( 2 * this.node.style.borderWidth() ) + this.node.style.marginBottom() );

		} else {
			throw "invalid block scenario";
		}


		return topPlacement;

	}

}