class Layout_Vertical extends Layout {

	public layoutType: string = 'vertical';

	constructor ( node: TNode_Element, children: Layout[] )	{
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

	public computeWidths() {
		var i: number = 0,
		    len: number = this.children.length;

		for ( i=0; i<len; i++ ) {

			if ( this.children[i].node ) {
				// the child is represented by a node
				
				// compute offsetleft and innerLeft
				this.children[i].offsetLeft = this.innerLeft + this.children[i].node.style.marginLeft() - this.children[i].node.style.borderWidth();
				this.children[i].innerLeft = this.children[i].offsetLeft + this.children[i].node.style.borderWidth() + this.children[i].node.style.paddingLeft();
				
				// if the child has a specified width, set the width to the layout,
				// otherwise determine it's width by this parent
				if ( this.children[i].node.style._width.isSet ) {

					this.children[i].innerWidth = this.children[i].node.style.width();
					this.children[i].offsetWidth = this.children[i].node.style.offsetWidth();

				} else {

					this.children[i].innerWidth = 
						this.innerWidth
						- ( this.children[i].node.style.borderWidth() * 2 )
						- this.children[i].node.style.paddingLeft()
						- this.children[i].node.style.paddingRight()
						- this.children[i].node.style.marginLeft()
						- this.children[i].node.style.marginRight();

					this.children[i].offsetWidth =
						this.children[i].innerWidth
						+ this.children[i].node.style.paddingLeft()
						+ this.children[i].node.style.paddingRight()
						+ ( this.children[i].node.style.borderWidth() * 2 );
				}

			} else {
				// the child is not represented by a node, so it doesn't have padding, margin, etc
				this.children[i].offsetLeft = this.children[i].innerLeft = this.innerLeft;
				this.children[i].offsetWidth= this.children[i].innerWidth = this.innerWidth;
			}

			this.children[i].computeWidths();

		}

	}

	public computeHeights( topPlacement: number, indent: number = 0 ): number {
		
		var contentHeight: number = 0,
		    i: number = 0,
		    len: number = 0,
		    addHeight: number = 0;

		if ( this.node ) {

			topPlacement += this.node.style.marginTop();

			this.offsetTop = topPlacement;

			this.innerTop = this.offsetTop + this.node.style.borderWidth() + this.node.style.paddingTop();

			console.log( 'add ' + ( this.node.style.paddingTop() + this.node.style.borderWidth() ) + 'padding...' );
			topPlacement += this.node.style.paddingTop() + this.node.style.borderWidth();

		} else {

			this.offsetTop = topPlacement;
			this.innerTop = topPlacement;

		}

		if ( this.children && ( len = this.children.length ) ) {

			for ( i=0; i<len; i++ ) {

				addHeight = ( this.children[i].computeHeights( topPlacement, indent + 1 ) - topPlacement );

				contentHeight += addHeight;
				topPlacement += addHeight;

				console.log( this.tab( indent ) + 'layout vertical (' + ( this.node ? this.node.nodeName : 'void' ) + '): topplacement become: ' + topPlacement + ', due to added height: ' + addHeight );

			}

		}

		this.innerHeight = contentHeight;
		this.offsetHeight = this.innerHeight;

		if ( this.node ) {

			this.offsetHeight += this.node.style.paddingBottom() + this.node.style.borderWidth();
			topPlacement += this.node.style.paddingBottom() + this.node.style.borderWidth() + this.node.style.marginBottom();
		
		}

		return topPlacement;

	}

}