class TNode_TextBreak extends TNode_Text {

	public isBR: boolean = true;
	private _parentNode: TNode_Element;

	constructor ( breakElement: HTML_BreakElement ) {
		super("\r");
		this._parentNode = breakElement;
		this.siblingIndex = 0;
	}

	get parentNode(): TNode_Element {
		return this._parentNode;
	}

	set parentNode( node: TNode_Element ) {
		console.warn( "Warning: attempting to set another parent!" );
	}

	get _text(): string {
		return "\r";
	}

	set _text( s: string ) {
		if ( s != "\r" && s ) {
			(<HTML_BreakElement>this.parentNode).appendTextAfter( s.replace( /\r/g, '' ) );
		}
	}

	get documentElement(): HTML_Body {
		if ( this.parentNode ) {
			return this.parentNode.documentElement;
		} else {
			return null;	
		}
	}

	set documentElement( body: HTML_Body ) {
		// void
	}

	public bakeIntoFragment() {
		if ( this.parentNode && this.parentNode.documentElement ) {
			
			this.FRAGMENT_START = this.parentNode.documentElement.fragment.length();
			this.documentElement.fragment.add( FragmentItem.WHITE_SPACE );
			if ( this.EOL_POS && this.EOL_POS[0] )
			this.documentElement.fragment.add( FragmentItem.EOL );
			this.FRAGMENT_END = this.documentElement.fragment.length() - 1;
		}
	}

	public remove(): TNode {
		console.warn( "Warning: attempting to remove a non removable element!" );
		return this;
	}


}