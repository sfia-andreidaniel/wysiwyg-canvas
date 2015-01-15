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

	constructor() {

	}

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
						   ( 'offsetWidth=' + this.offsetWidth + ' offsetHeight=' + this.offsetHeight + ' offsetTop=' + this.offsetTop + ' offsetLeft=' + this.offsetLeft + ' ' ) +
						'>' );

		if ( this.children && ( len = this.children.length ) ) {
			for ( i=0; i<len; i++ ) {
				out.push( this.children[i].serialize( tabIndex + 1 ) );
			}
		}

		out.push( tab + '</' + this.layoutType + '>' );

		return out.join('\n');

	}

}