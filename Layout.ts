// the layout class is responsible to render elements on the canvas.
class Layout {

	public offsetTop    : number = 0;
	public offsetLeft   : number = 0;
	public offsetWidth  : number = 0;
	public offsetHeight : number = 0;

	public innerTop     : number = 0;
	public innerLeft    : number = 0;
	public innerWidth   : number = 0;
	public innerHeight  : number = 0;

	public parent   : Layout = null;
	public children : Layout[] = [];
	public node     : TNode_Element = null;
	public hasChars : boolean = false;

	public isBuilt: boolean = false;
	public siblingIndex: number = 0;

	public layoutType: string = 'abstract';

	constructor() {}

	public buildAhead( layout: Layout = null ) {
		throw "Abstract method";
	}

	/* Even if the layout has the node property set to null,
	   as implemented on Layout_BlockChar, it is a child of a node
	   in the upper layout logic. This function returns that node
	*/
	public ownerNode(): TNode_Element {
		if ( this.node === null ) {
			if ( this.parent ) {
				return this.parent.ownerNode();
			} else return null;
		} else return this.node;
	}

	public serialize( tabIndex = 0 ) {
		var tab: string = '',
		    i: number = 0,
		    len: number,
		    out: string[] = [];

		for ( i=0, len = tabIndex * 4; i<len; i++ ) {
			tab += ' ';
		}

		out.push( tab + '<' + this.layoutType + 
						   ( this.node ? ' of=' + this.node.nodeName + ' ' : ' shadow=' + this.ownerNode().nodeName + ' ' ) + 
						   ( 'offsetWidth=' + this.offsetWidth + ' offsetHeight=' + this.offsetHeight + ' offsetTop=' + this.offsetTop + ' offsetLeft=' + this.offsetLeft + ' innerWidth=' + this.innerWidth + ' innerHeight=' + this.innerHeight + ' innerTop=' + this.innerTop + ' innerLeft=' + this.innerLeft + ' ' ) +
						'>' );

		if ( this.children && ( len = this.children.length ) ) {
			for ( i=0; i<len; i++ ) {
				out.push( this.children[i].serialize( tabIndex + 1 ) );
			}
		}

		out.push( tab + '</' + this.layoutType + '>' );

		return out.join('\n');

	}

	public computeOffset( parentInnerOffsetLeft: number = 0, parentInnerOffsetTop: number = 0, parentInnerOffsetWidth: number = 0 ) {
		throw "Abstract method";
	}

	// sets the innerHeight of the block.
	// automatially increases the offset height if needed
	public setInnerHeight( amount: number ) {
		var diffInnerOuter = this.offsetHeight - this.innerHeight;
		this.innerHeight = amount;
		this.offsetHeight = this.innerHeight + diffInnerOuter;
	}

	public setInnerHeightIfSmaller( amount ) {
		if ( amount < this.innerHeight ) {
			this.setInnerHeight( amount );
		}
	}

	public computeWidths( offsetLeftComputed: boolean = false ) {
	}

	/* @input: top placement position
	   @output: top placement position */

	public computeHeights( topPlacement: number, indent: number = 0 ): number {
		throw "Abstract method!";
	}

	public tab( num: number ): string {
		var out: string = '',
		    i: number = 0;

		for ( i=0; i<num * 4; i++ ) {
			out += ' ';
		}
		return out;
	}

	public isPaintable( viewport: Viewport ): boolean {
		
		var x1 = this.offsetLeft,
		    y1 = this.offsetTop,
		    x2 = this.offsetLeft + this.offsetWidth,
		    y2 = this.offsetTop + this.offsetHeight,

		    xx1 = viewport.scrollLeft(),
		    yy1 = viewport.scrollTop(),
		    xx2 = viewport.scrollLeft() + viewport.width() - viewport._scrollbarSize,
		    yy2 = viewport.scrollTop() + viewport.height() - viewport._scrollbarSize;

		return ( x2 <= xx1 || x1 >= xx2 || y2 <= yy1 || y1 >= yy2 ) ? false : true;

	}

	public increaseYBy( pixels: number ) {
		this.offsetTop += pixels;
		this.innerTop += pixels;

		if ( this.children && this.children.length ) {
			for ( var i=0, len = this.children.length; i<len; i++ )
				this.children[i].increaseYBy( pixels );
		}
	}

	public increaseHeightBy( pixels: number ) {
		this.offsetHeight += pixels;
		this.innerHeight  += pixels;
	}

	// paints the node, and after that paints it's sub-children
	public paint( ctx: any, scrollLeft: number, scrollTop: number, viewport: Viewport ) {

		if ( !this.isPaintable( viewport ) ) {
			return;
		}

		if ( this.node ) {
			this.node.paint( ctx, this, scrollLeft, scrollTop );
		}

		if ( this.children ) {
			for ( var i=0, len = this.children.length; i<len; i++ ) {
				this.children[i].paint( ctx, scrollLeft, scrollTop, viewport );
			}
		}

	}

	public getTargetAtXY( point: TPoint, boundsChecking: boolean = true ): TRange_Target {

		if ( point.y < this.offsetTop || ( point.y > ( this.offsetTop + this.offsetHeight ) && boundsChecking )
		     ||
		     point.x < ( this.offsetLeft ) || ( point.x > ( this.offsetLeft + this.offsetWidth ) && boundsChecking )
		) return null; // click outside the layout.

		var node: TNode = this.ownerNode(),
			bestTarget: TRange_Target = new TRange_Target( node, node.FRAGMENT_START ),
			childTarget: TRange_Target;

		if ( this.children && this.children.length ) {
			for ( var i=this.children.length - 1; i>=0; i-- ) {
				childTarget = this.children[i].getTargetAtXY( point );
				if ( childTarget !== null ) {
					return childTarget;
				}
			}
		}

		return bestTarget;

	}

}