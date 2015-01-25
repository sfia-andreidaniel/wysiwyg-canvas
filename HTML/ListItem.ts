class HTML_ListItem extends TNode_Element {
	
	public isSelectable    : boolean = true;
	public isBlockTextNode : boolean = true;

	constructor() {
		super();
		this.nodeName = 'li';
		this.style.display('block');
		this.style.paddingLeft( '15' );
	}

	public paint( ctx: any, layout: Layout, scrollLeft: number, scrollTop: number ) {
		
		super.paint( ctx, layout, scrollLeft, scrollTop );

		/* If the parent is a OL, paint my number,
		   otherwise paint a disk.
		 */

		ctx.fillStyle = this.isPaintedSelected ? 'blue' : this.style.color();
		ctx.textAlign = 'right';
		ctx.font = this.style.fontStyleText();
		ctx.textBaseline = 'alphabetic';

		if ( this.parentNode.nodeName == 'ol' ) {

			ctx.fillText( String( this.siblingIndex + 1 ) + '.', layout.innerLeft - 5 - scrollLeft, layout.innerTop + this.style.fontSize() * this.style.lineHeight() - scrollTop );

		} else {

			ctx.fillText( '\u25cf', layout.innerLeft - 5 - scrollLeft, layout.innerTop + this.style.fontSize() * this.style.lineHeight() - scrollTop );

		}

	}

}