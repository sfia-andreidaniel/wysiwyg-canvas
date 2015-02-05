class HTML_Size extends TNode_Element {
	
	public isDefragmentable : boolean = true;

	public _value: string = '';

	constructor() {
		super();
		this.nodeName = 'size';
		this.style.display('inline');
	}

	public value( v: string = null ) {
		if ( v === null ) {
			return this._value;
		} else {
			this.style.fontSize( this._value = ( v || '' ) );
		}
	}

	public setAttribute( attributeName: string, attributeValue: string ) {
		switch ( attributeName ) {
			case 'value':
				this.value( attributeValue );
				break;
			default:
				super.setAttribute( attributeName, attributeValue );
				break;
		}
	}

	public clone(): TNode_Element {
		var returnValue: HTML_Size = <HTML_Size>super.clone();
		if ( this._value ) {
			returnValue.setAttribute( 'value', this._value );
		}
		return returnValue;
	}


	public xmlBeginning() {
		return '<span data-tag="size:' + (this._value ? this._value : '' ) + '"' + ( ( this._value ) ? ' style="font-size: ' + this._value + 'px"' : '' ) + '>';
	}

	public xmlEnding(): string {
		return '</span>';
	}

	public canDefragmentWith( size: TNode_Element ) {
		return (<HTML_Size>size).value() == this.value();
	}

}