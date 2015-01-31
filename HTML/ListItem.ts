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

	public becomeElement( elementName: string ): TNode_Element {
		var breakResult: TListBreakResult,
		    element: TNode_Element,
		    saveParent: TNode_Element = this.parentNode;

		if ( elementName == 'li' ) {
			return this;
		}
		
		// we must break the parent UL or OL when a LI becomes another element...
		// aditionally, if the elementName is a UL, or a LI, we must treat this case also ...

		if ( !this.parentNode ) {
			throw "ERR_NO_PARENT_NODE";
		}

		if ( elementName == this.parentNode.nodeName ) {
			return this;
		}

		if ( elementName == 'ul' || elementName == 'ol' ) {

			throw "ERR_NOT_IMPLEMENTED_IN_LI_BECOME_OL_OR_UL";

		} else {
			
			if ( ['ul','ol'].indexOf( this.parentNode.nodeName ) == -1 ) {
				return super.becomeElement( elementName );
			} else {
				breakResult = (<HTML_OrderedList>this.parentNode).breakAfterOption( this );
				element = this.documentElement.createElement( elementName );
				this.parentNode.parentNode.appendChild( element, this.parentNode.siblingIndex + 1 );
				element.mergeWith( this );
				if ( saveParent.childNodes.length == 0 ) {
					saveParent.remove();
				}
				return element;
			}

		}

	}

	public createSurgery( atFragmentIndex: number, createNodeAfter: boolean = true, nodeNameAfter: string = null, hint: TSurgeryHint = TSurgeryHint.NONE ): number {
		
		var p: HTML_Paragraph = null;

		if ( createNodeAfter && ( nodeNameAfter === null || nodeNameAfter == 'li') ) {
			
			if ( this.textContents() == '' || this.textContents() == ' ' ) {
				
				p = <HTML_Paragraph>this.becomeElement( 'p' );

				this.documentElement.relayout(true);

				return p.FRAGMENT_START;

			} else {
				return super.createSurgery( atFragmentIndex, createNodeAfter, nodeNameAfter, hint );		
			}
			
		} else {
			return super.createSurgery( atFragmentIndex, createNodeAfter, nodeNameAfter, hint );
		}
	}
}