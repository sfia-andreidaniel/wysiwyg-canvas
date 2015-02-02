class HTML_BulletedList extends TNode_Element {

	public isSelectionPaintingDisabled : boolean = true;
	public nodeClass                   : TNode_Class = TNode_Class.BLOCK_SELECTIVE;

	constructor() {
		super();
		this.nodeName = 'ul';
		this.style.display('block');
		this.style.paddingLeft( '30' );
		this.style.marginBottom( '10' );

	}

	public breakBeforeOption( option: HTML_ListItem ): TListBreakResult {
		var i: number = 0,
		    len: number = option.siblingIndex - 1,
		    ol: HTML_BulletedList;

		if ( option.siblingIndex == 0 || this.childNodes.length == 1 ) {
			return TListBreakResult.NONE_BEFORE;
		}

		ol = <HTML_BulletedList>this.clone();

		this.parentNode.appendChild( ol, this.siblingIndex );

		for ( i=0; i<=len; i++ ) {
			ol.appendChild( this.childNodes[0] );
		}

		return TListBreakResult.BEFORE;
	}

	public breakAfterOption( option: HTML_ListItem ): TListBreakResult {
		var i: number = 0,
		    len: number = this.childNodes.length,
		    ol: HTML_BulletedList;

		if ( option.siblingIndex == this.childNodes.length - 1 || this.childNodes.length == 1 ) {
			return TListBreakResult.NONE_AFTER;
		}

		ol = <HTML_BulletedList>this.clone();

		this.parentNode.appendChild( ol, this.siblingIndex + 1 );

		for ( i=option.siblingIndex + 1; i<len; i++ ) {
			ol.appendChild( this.childNodes[ option.siblingIndex + 1], 0 );
		}

		return TListBreakResult.AFTER;
	}

	// lists don't have tabstops, only list items.
	public tabStop( value: number = null ): number {
		return 0;
	}

}