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
		if ( node != this._parentNode ) {
			throw "ERR_NO_MODIFICATION_ALLOWED";
		}
	}

	get _text(): string {
		return "\r";
	}

	set _text( s: string ) {
		if ( s == '' && this.parentNode ) {
			this.parentNode.remove();
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
		throw "ERR_NO_MODIFICATION_ALLOWED";
	}

	public elementsBeforeMyself( includingMe: boolean ): TNode[] {
		throw "ERR_DENIED: TNode_TextBreak.elementsAfterMyself";
	}

	public elementsAfterMyself( includingMe: boolean ): TNode[] {
		throw "ERR_DENIED: TNode_TextBreak.elementsAfterMyself";
	}

	public insertTextAtTargetOffset( offset: number, str: string ): number {
		var nextTextNode: TNode_Text = (<HTML_BreakElement>this.parentNode).nextAvailableTextNode();
		nextTextNode.textContents( str, true ); // append text @ beginning
		return -str.length;
	}

	public textIndexToFragmentPosition( index: number ): number {
		return (<HTML_BreakElement>this.parentNode).nextAvailableTextNode().textIndexToFragmentPosition( index );
	}

}