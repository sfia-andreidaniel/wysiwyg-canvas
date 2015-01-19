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

	public computeWidths( ) {
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

	// paints the node, and after that paints it's sub-children
	public paint( ctx: any ) {

		if ( this.node ) {
			this.node.paint( ctx, this );
		}

		if ( this.children ) {
			for ( var i=0, len = this.children.length; i<len; i++ ) {
				this.children[i].paint( ctx );
			}
		}

	}

}