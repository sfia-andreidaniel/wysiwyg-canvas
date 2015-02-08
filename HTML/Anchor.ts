class HTML_Anchor extends TNode_Element {

	protected _href: string = null;
	protected _target: string = null;
	protected _name: string = null;

	constructor() {
		super();
		this.nodeName = 'a';
		this.style.display('inline');
		this.style.color('blue');
		this.style.textDecoration('underline');
	}

	public href( s: string = null ): string {
		if ( s === null ) {
			return this._href;
		} else {
			this._href = String( s || '' ) || null;
			return this._href;
		}
	}

	public target( s: string = null ): string {
		if ( s === null ) {
			return this._target;
		} else {
			this._target = String( s || '' ) || null;
			return this._target;
		}
	}

	public name( s: string = null ): string {
		if ( s === null ){
			return this._name;
		} else {
			this._name = String( s || '' ) || null;
			return this._name;
		}
	}

	public setAttribute( attributeName, attributeValue ) {
		
		switch ( attributeName ) {
			case 'href':
				this.href( attributeValue );
				break;
			case 'target':
				this.target( attributeValue );
				break;
			case 'name':
				this.name( attributeValue );
				break;
			default:
				super.setAttribute( attributeName, attributeValue );
				break;
		}
	}

	public xmlBeginning(): string {
		var attrs: string[] = [];
		if ( this._href ) {
			attrs.push( 'href="' + this._href + '"' );
		}
		if ( this._target ) {
			attrs.push( 'target="' + this._target + '"' );
		}
		if ( this._name ) {
			attrs.push( 'name="' + this._name + '"' );
		}
		return '<a' + ( attrs.length ? ' ' + attrs.join( ' ' ) : '' ) + '>';
	}

	public xmlEnding(): string {
		return '</a>';
	}

	public clone(): TNode_Element {
		var cloned = <HTML_Anchor>this.documentElement.createElement( 'a' );
		cloned.name( this.name() );
		cloned.href( this.href() );
		cloned.target( this.target() );
		return cloned;
	}

}