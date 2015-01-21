class TStyle_TableCell extends TStyle {

	constructor( public node: TNode_Element ) {
		super( node );
	}

	// the padding of the table cell cannot be modified.

	public paddingLeft( v: string = null ): number {
		if ( v === null ) {
			if ( this.node.parentNode && this.node.parentNode.parentNode ) {
				return (<HTML_Table>this.node.parentNode.parentNode).cellPadding();
			} else {
				return 0;
			}
		} else return 0;
	}

	public paddingTop( v: string = null ): number {
		if ( v === null ) {
			if ( this.node.parentNode && this.node.parentNode.parentNode ) {
				return (<HTML_Table>this.node.parentNode.parentNode).cellPadding();
			} else {
				return 0;
			}
		} else return 0;
	}

	public paddingRight( v: string = null ): number {
		if ( v === null ) {
			if ( this.node.parentNode && this.node.parentNode.parentNode ) {
				return (<HTML_Table>this.node.parentNode.parentNode).cellPadding();
			} else {
				return 0;
			}
		} else return 0;
	}

	public paddingBottom( v: string = null ): number {
		if ( v === null ) {
			if ( this.node.parentNode && this.node.parentNode.parentNode ) {
				return (<HTML_Table>this.node.parentNode.parentNode).cellPadding();
			} else {
				return 0;
			}
		} else return 0;
	}

	// the margin of the table cell cannot be modified.

	public marginLeft( v: string = null ): number {
		if ( v === null ) {
			if ( this.node.parentNode && this.node.parentNode.parentNode ) {
				return (<HTML_Table>this.node.parentNode.parentNode).cellSpacing();
			} else {
				return 0;
			}
		} else return 0;
	}

	public marginTop( v: string = null ): number {
		if ( v === null ) {
			if ( this.node.parentNode && this.node.parentNode.parentNode ) {
				return (<HTML_Table>this.node.parentNode.parentNode).cellSpacing();
			} else {
				return 0;
			}
		} else return 0;
	}

	public marginRight( v: string = null ): number {
		if ( v === null ) {
			if ( this.node.parentNode && this.node.parentNode.parentNode ) {
				return (<HTML_Table>this.node.parentNode.parentNode).cellSpacing();
			} else {
				return 0;
			}
		} else return 0;
	}

	public marginBottom( v: string = null ): number {
		if ( v === null ) {
			if ( this.node.parentNode && this.node.parentNode.parentNode ) {
				return (<HTML_Table>this.node.parentNode.parentNode).cellSpacing();
			} else {
				return 0;
			}
		} else return 0;
	}

	// the border-width and border-color cannot be modified

	public borderWidth( v: string = null ): number {
		if ( v === null ) {
			if ( this.node.parentNode && this.node.parentNode.parentNode ) {
				return (<HTML_Table>this.node.parentNode.parentNode).border();
			} else {
				return 0;
			}
		} else return 0;
	}


	public borderColor( v: string = null ): string {
		if ( v === null ) {
			if ( this.node.parentNode && this.node.parentNode.parentNode ) {
				return this.node.parentNode.parentNode.style.borderColor();
			} else return '';
		} else return '';
	}

}