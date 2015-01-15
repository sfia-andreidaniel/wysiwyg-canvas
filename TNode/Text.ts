class TNode_Text extends TNode {

	public _text    : string = '';
	public nodeType  : TNode_Type = TNode_Type.TEXT;

	static $SpecialChars = {
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot'
	}

	constructor( textContents: string ) {
		super();
		this._text = String( textContents || '' );
	}

	public textContents( c: string ): string {
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

}