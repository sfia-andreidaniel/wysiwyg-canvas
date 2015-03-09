class HTML_SourceElement extends TNode_Element {

	private _src: string  = null;
	private _type: string = null;

	constructor( ) {
		super();
		this.nodeName = 'source';
		this.style.display( 'none' );
	}

	public xmlAttributes(): string {
		var opts: string[] = [];
		if ( this._src ) {
			opts.push( 'src="' + HTMLParser.escape( this._src ) + '"' );
		}
		if ( this._type ) {
			opts.push( 'type="' + HTMLParser.escape( this._type ) + '"' );
		}
		return opts.join(' ');
	}

	public src( value: string = null ): string {
		if ( value === null ) {
			return this._src;
		} else {
			this._src = String( value || '' ) || null;
		}
	}

	public type( value: string = null ): string {
		if ( value === null ) {
			return this._type;
		} else {
			this._type = String( value || '' ) || null;
		}
	}

	public setAttribute( attributeName: string, attributeValue: string ) {
		switch ( attributeName ) {
			case 'src':
				this.src( attributeValue );
				break;
			case 'type':
				this.type( attributeValue );
				break;
			default:
				super.setAttribute( attributeName, attributeValue );
				break;
		}
	}

	public xmlEnding(): string {
		return '';
	}

	public xmlBeginning(): string {
		return '<source ' + this.xmlAttributes() + ' />';
	}

}