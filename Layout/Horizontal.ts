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

	private getCellWidth( cellIndex: number ): number {

		var width: number = 0,
		    i: number = 0,
		    len: number = 0;

		if ( this.children[cellIndex] && this.children[cellIndex].children ) {

			for ( i=0, len = this.children[cellIndex].children.length; i<len; i++ ) {
				if ( !this.children[cellIndex].children[i].node ) {
					return null;
				} else {
					width += ( 
						this.children[cellIndex].children[i].node.style.offsetWidth() +
						this.children[cellIndex].children[i].node.style.marginLeft() +
						this.children[cellIndex].children[i].node.style.marginRight()
					);
				}
			}

		}

		return width;

	}

	public computeWidths() {
		/* on horizontal layouts, we set the widths for the layouts which have nodes.
		   the rest of the widths is computed as the average undefined widths */
		var widthLeft: number = this.innerWidth,
		    computeAfter: Layout[] = [],
		    leftPosition: number = this.innerLeft,
		    i: number = 0,
		    len: number = this.children.length,
		    averageWidth: number = 0,
		    sumWidths: number = 0,
		    optimalWidth: number = 0,
		    tabSize: number = ( this.children && len && this.children[0].node && this.children[0].node.documentElement ) ? this.children[0].node.documentElement.tabSize() : 0;

		for ( i=0; i<len; i++ ) {

			if ( this.children[i].node ) {
				// the child has a node associated.
				// if the node has a width, we set it's width as the
				// node width, otherwise we set it's width automatically

				if ( this.children[i].node.style._width.isSet ) {

					this.children[i].offsetWidth = this.children[i].node.style.width() + ( this.children[i].node.style.borderWidth() * 2 ) + this.children[i].node.style.paddingLeft() + ( this.children[i].node.tabStop() * tabSize ) + this.children[i].node.style.paddingRight();
					sumWidths += this.children[i].offsetWidth;

				} else {

					computeAfter.push( this.children[i] );

				}

			} else {

				optimalWidth = this.getCellWidth( i );

				if ( optimalWidth === null ) {
					computeAfter.push( this.children[i] );
				} else {
					sumWidths += optimalWidth;
					this.children[i].offsetWidth = optimalWidth;
				}

			}

		}

		averageWidth = ( this.innerWidth - sumWidths ) / computeAfter.length;

		// rescan the children to set the averageWidths

		for ( i=0, len = computeAfter.length; i<len; i++ ) {

			computeAfter[i].offsetWidth = averageWidth;

		}

		leftPosition = this.innerLeft;

		// compute the rest of the properties

		for ( i=0, len = this.children.length; i<len; i++ ) {
			
			if ( this.children[i].node ) {
				this.children[i].offsetLeft = leftPosition - this.children[i].node.style.marginLeft();
				this.children[i].innerLeft = this.children[i].offsetLeft + this.children[i].node.style.paddingLeft() + ( this.children[i].node.tabStop() * tabSize ) + this.children[i].node.style.borderWidth();
				this.children[i].innerWidth = this.children[i].offsetWidth - ( this.children[i].node.style.borderWidth() * 2 ) - this.children[i].node.style.paddingLeft() - ( this.children[i].node.tabStop() * tabSize ) - this.children[i].node.style.paddingRight();

				leftPosition += this.children[i].node.style.marginRight();

			} else {

				this.children[i].offsetLeft = leftPosition;
				this.children[i].innerLeft  = this.children[i].offsetLeft;
				this.children[i].innerWidth = this.children[i].offsetWidth;

			}

			leftPosition += this.children[i].offsetWidth;

		}

		// compute the widths of the sub-children

		for ( i=0, len = this.children.length; i<len; i++ ) {
			this.children[i].computeWidths();
		}
	}

	public computeHeights( topPlacement: number, indent: number = 0 ): number {

		var topPlacementBegin: number = topPlacement,
			contentHeight: number = 0,
		    topPlacementMax: number = 0,
		    i: number = 0,
		    len: number;

		this.offsetHeight = 0;
		this.innerHeight = 0;

		if ( this.node ) {

			topPlacement += this.node.style.marginTop();
			this.offsetHeight += ( this.node.style.borderWidth() + this.node.style.paddingTop() );
			this.offsetTop = topPlacement;
			this.innerTop = topPlacement + this.offsetHeight;
			topPlacement += this.node.style.borderWidth() + this.node.style.paddingTop();

		} else {

			this.offsetTop = topPlacement;
			this.innerTop = topPlacement;

		}

		topPlacementMax = topPlacement;

		if ( this.children && ( len = this.children.length ) ) {

			for ( i=0; i<len; i++ ) {

				topPlacementMax = Math.max( topPlacementMax, this.children[i].computeHeights( topPlacement, indent + 1 ) );

			}

			contentHeight = topPlacementMax - topPlacement;

		}

		this.innerHeight = contentHeight;
		this.offsetHeight += this.innerHeight;

		topPlacement += this.innerHeight;

		if ( this.node ) {

			topPlacement += ( this.node.style.paddingBottom() + this.node.style.borderWidth() + this.node.style.marginBottom() );
			this.offsetHeight += this.node.style.paddingBottom() + this.node.style.borderWidth();

		}

		return topPlacement;

	}

}