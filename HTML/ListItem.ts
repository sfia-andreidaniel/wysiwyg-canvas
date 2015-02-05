class HTML_ListItem extends TNode_Element {
	
	public isSelectable    : boolean = true;
	public isBlockTextNode : boolean = true;

	constructor() {
		super();
		this.nodeName = 'li';
		this.style.display('block');

		TStyle_Browser_Calculator.applyDefaultStyles( this, 'li', [
			'fontSize',
			'fontWeight',
			'paddingTop',
			'paddingBottom',
			'paddingLeft',
			'paddingRight',
			'marginTop',
			'marginBottom',
			'marginLeft',
			'marginRight',
			'fontFamily',
			'fontWeight'
		] );
	}

	public paint( ctx: any, layout: Layout, scrollLeft: number, scrollTop: number ) {
		
		super.paint( ctx, layout, scrollLeft, scrollTop );

		/* If the parent is a OL, paint my number,
		   otherwise paint a disk.
		 */

		ctx.fillStyle = this.style.color();
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
		    parent: TNode_Element = this.parentNode;

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

			switch ( this.siblingIndex ) {
				case 0:
					// append before current list
					element = this.documentElement.createElement( elementName );
					this.parentNode.parentNode.appendChild( element, this.parentNode.siblingIndex );
					element.appendChild( this );
					break;
				case this.parentNode.childNodes.length - 1:
					// append after
					element = this.documentElement.createElement( elementName );
					this.parentNode.parentNode.appendChild( element, this.parentNode.siblingIndex + 1 );
					element.appendChild( this );
					element.parentNode.mergeAdjacentLists();
					break;
				default:
					// break current list and append after the first list
					breakResult = (<HTML_OrderedList>this.parentNode).breakAfterOption( this );
					element = this.documentElement.createElement( elementName );
					this.parentNode.parentNode.appendChild( element, this.parentNode.siblingIndex + 1 );
					element.appendChild( this );
					break;
			}

			if ( parent.childNodes.length == 0 ) {
				parent.remove();
			}

			this.parentNode.parentNode.mergeAdjacentLists();
			return this;

		} else {
			
			breakResult = (<HTML_OrderedList>this.parentNode).breakBeforeOption( this );
			element = this.documentElement.createElement( elementName );
			this.parentNode.parentNode.appendChild( element, this.parentNode.siblingIndex );
			element.mergeWith( this );
			element.parentNode.mergeAdjacentLists();
			return element;

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

	public tabStop( value: number = null ): number {
		var parentNode: HTML_OrderedList = null,
		    siblingIndex: number = 0;

		if ( value == -1 ) {

			if ( this.parentNode.parentNode.is() == 'li' ) {
				parentNode = <HTML_OrderedList>this.parentNode;
				siblingIndex = parentNode.siblingIndex;
				parentNode.breakBeforeOption( this );
				parentNode.parentNode.createSurgery( parentNode.FRAGMENT_END );
				parentNode.parentNode.parentNode.appendChild( this, parentNode.parentNode.siblingIndex + 1 );
				if ( parentNode.childNodes.length == 0 ) {
					parentNode.remove();
				}
			}

			return 0;

		} else {
			return super.tabStop( value );
		}
	}
}