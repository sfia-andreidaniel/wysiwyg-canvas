class TNode_Text extends TNode {

	static $FragmentTypes = {
		"\n": FragmentItem.WHITE_SPACE,
		"\t": FragmentItem.WHITE_SPACE,
		" " : FragmentItem.WHITE_SPACE
	};

	public _text     : string = '';
	public nodeType  : TNode_Type = TNode_Type.TEXT;
	
	// on building layout, the EOL_POS will be computed. this is needed on bakeIntoFragment method
	public EOL_POS   : any = null;

	static $SpecialChars = {
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot'
	}

	constructor( textContents: string ) {
		super();
		this._text = String( textContents || '' );
	}

	public textContents( c: string = null ): string {
		if ( c === null ) {
			return this._text;
		} else {
			this._text = String( c || '' );
			
			if ( this.parentNode ) {
				this.parentNode.fire( 'relayout' );
			}
		}
	}

	// escapes the text for HTML exporting
	public escape(): string {
		var out: string = '',
		    i: number = 0,
		    len: number = this._text.length;

		for ( i=0; i<len; i++ ) {
			if ( TNode_Text.$SpecialChars[this._text[i]] ) {
				out += TNode_Text.$SpecialChars[this._text[i]];
			} else {
				out += this._text[i];
			}
		}

		return out;
	}

	public bakeIntoFragment() {
		if ( this.documentElement ) {
			
			this.FRAGMENT_START = this.documentElement.fragment.length();
			for ( var i=0, len = this._text.length; i<len; i++ ) {
				this.documentElement.fragment.add( TNode_Text.$FragmentTypes[ this._text[i] ] || FragmentItem.CHARACTER );
				if ( this.EOL_POS && this.EOL_POS[i] ) {
					this.documentElement.fragment.add( FragmentItem.EOL );
				}
			}
			this.FRAGMENT_END = this.documentElement.fragment.length() - 1;
		}
	}

	public textContentsFragment( indexStart: number, indexEnd: number ): string {
		var out: string = '',
		    i: number = 0,
		    len: number = 0,
		    j: number = 0;

		for ( i=this.FRAGMENT_START; i <= indexEnd; i++ ) {
			if ( this.EOL_POS && this.EOL_POS[i] ) {
				// nothing
			} else {
				if ( i >= indexStart ) {
					out = out + ( this._text[j] || '' );
				}
				j++;
			}
		}

		return out;
	}

}