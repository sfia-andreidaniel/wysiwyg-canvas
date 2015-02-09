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

	public computeWidths( offsetLeftComputed: boolean = false ) {
		var i: number = 0,
		    len: number = this.children.length,
		    tabSize = ( this.children && len && this.children[0].node && this.children[0].node.documentElement ) ? this.children[0].node.documentElement.tabSize() : 0,
		    floatVal: string,
		    needAdd: number;

		for ( i=0; i<len; i++ ) {

			if ( this.children[i].node ) {
				// the child is represented by a node
				
				// compute offsetleft and innerLeft
				this.children[i].offsetLeft = this.innerLeft + this.children[i].node.style.marginLeft() - this.children[i].node.style.borderWidth();

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
						- ( this.children[i].node.tabStop() * tabSize )
						- this.children[i].node.style.paddingRight()
						- this.children[i].node.style.marginLeft()
						- this.children[i].node.style.marginRight();

					this.children[i].offsetWidth =
						this.children[i].innerWidth
						+ this.children[i].node.style.paddingLeft()
						+ ( this.children[i].node.tabStop() * tabSize )
						+ this.children[i].node.style.paddingRight()
						+ ( this.children[i].node.style.borderWidth() * 2 );
				}

				/* If the child node has a "float=left|right" style property, align
				   the node properly */

				if ( [ 'right', 'center' ].indexOf( floatVal = this.children[i].node.style.float() ) >= 0 ) {

					switch ( floatVal ) {
						case 'right':

							this.children[i].offsetLeft = this.innerLeft + this.innerWidth 
								- this.children[i].node.style.marginRight() 
								- this.children[i].node.style.borderWidth() * 2 
								- this.children[i].node.style.paddingLeft() 
								- this.children[i].node.style.paddingRight()
								- this.children[i].offsetWidth;

							break;
						
						case 'center':

							this.children[i].offsetLeft = this.innerLeft + ( this.innerWidth / 2 )
								- ( ( this.children[i].node.style.marginRight() 
								    + this.children[i].node.style.borderWidth() * 2 
								    + this.children[i].node.style.paddingLeft() 
								    + this.children[i].node.style.paddingRight()
								    + this.children[i].offsetWidth
								  ) / 2 );

							break;
					}

				}

				if ( this.children[i].offsetLeft < this.innerLeft ) {
					this.children[i].offsetLeft = this.innerLeft;
				}

				this.children[i].innerLeft = this.children[i].offsetLeft + this.children[i].node.style.borderWidth() + ( this.children[i].node.style.paddingLeft() + this.children[i].node.tabStop() * tabSize );
				
			} else {
				// the child is not represented by a node, so it doesn't have padding, margin, etc
				this.children[i].offsetLeft = this.children[i].innerLeft = this.innerLeft;
				this.children[i].offsetWidth= this.children[i].innerWidth = this.innerWidth;
			}

			this.children[i].computeWidths( true );

		}

	}

	public computeHeights( topPlacement: number, indent: number = 0 ): number {
		
		var contentHeight: number = 0,
		    i: number = 0,
		    len: number = 0,
		    addHeight: number = 0,


		    nodeStyleMarginTop: number = 0,
		    nodeStyleMarginBottom: number = 0,
		    nodeStyleBorderWidth: number = 0,
		    nodeStylePaddingTop: number = 0,
		    nodeStylePaddingBottom: number = 0;

		this.offsetHeight = 0;

		if ( this.node ) {

			nodeStyleMarginTop = this.node.style.marginTop();
			nodeStyleMarginBottom = this.node.style.marginBottom();
			nodeStyleBorderWidth = this.node.style.borderWidth();
			nodeStylePaddingTop = this.node.style.paddingTop();
			nodeStylePaddingBottom = this.node.style.paddingBottom();

			topPlacement += nodeStyleMarginTop;
			this.offsetTop = topPlacement;
			topPlacement += ( this.offsetHeight = nodeStylePaddingTop + nodeStyleBorderWidth );
			this.innerTop = topPlacement;
		} else {
			this.offsetTop = topPlacement;
			this.innerTop = topPlacement;
		}

		if ( this.children && ( len = this.children.length ) ) {
			for ( i=0; i<len; i++ ) {
				addHeight = ( this.children[i].computeHeights( topPlacement, indent + 1 ) - topPlacement );
				contentHeight += addHeight;
				topPlacement += addHeight;
				this.offsetHeight += addHeight;
			}

		}

		this.innerHeight = contentHeight;

		if ( this.node ) {
			this.offsetHeight += nodeStylePaddingBottom + nodeStyleBorderWidth;
			topPlacement += nodeStylePaddingBottom + nodeStyleBorderWidth + nodeStyleMarginBottom;
		}

		return topPlacement;

	}

}