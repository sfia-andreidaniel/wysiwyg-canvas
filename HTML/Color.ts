class HTML_Color extends TNode_Element {
	
	public isDefragmentable : boolean = true;

	private _name: string = null;

	constructor() {
		super();
		this.nodeName = 'color';
		this.style.display('inline');
	}

	public name( value: string = null ): string {
		if ( value === null ) {
			//getter
			return this._name || '';
		} else {
			//setter
			this._name = value || null;
			this.style.color( this._name || '' );
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
		return '<span data-tag="color:' + this._name + '"' + ( this._name ? ' style="color: ' + this._name + '"' : '' ) + '>';
	}

	public xmlEnding() {
		return '</span>';
	}

	public clone(): TNode_Element {
		var returnValue: HTML_Color = <HTML_Color>super.clone();
		if ( this._name ) {
			returnValue.setAttribute( 'name', this._name );
		}
		return returnValue;
	}

	public canDefragmentWith( color: TNode_Element ) {
		return (<HTML_Color>color).name() == this.name();
	}

}