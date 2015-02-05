class HTML_Font extends TNode_Element {
	
	public isDefragmentable : boolean = true;

	private _name: string = null;

	constructor() {
		super();
		this.nodeName = 'font';
		this.style.display('inline');
	}

	public name( value: string = null ): string {
		if ( value === null ) {
			//getter
			return this._name || '';
		} else {
			//setter
			this._name = value || null;
			this.style.fontFamily( this._name || '' );
			return value;
		}
	}

	public setAttribute( attributeName: string, attributeValue: string = null ) {
		switch ( attributeName ) {
			case 'name':
				this.name( attributeValue || null );
				break;
			default:
				super.setAttribute( attributeName, attributeValue || '' );
				break;
		}
	}

	public xmlBeginning() {
		return '<span data-tag="font:'+ this._name +'"' + ( this._name ? ' style="font-family: \'' + this._name + '\'"' : '' ) + '>';
	}

	public xmlEnding() {
		return '</span>';
	}

	public clone(): TNode_Element {
		var returnValue: HTML_Font = <HTML_Font>super.clone();
		if ( this._name ) {
			returnValue.setAttribute( 'name', this._name );
		}
		return returnValue;
	}

	public canDefragmentWith( font: TNode_Element ) {
		return (<HTML_Font>font).name() == this.name();
	}

}