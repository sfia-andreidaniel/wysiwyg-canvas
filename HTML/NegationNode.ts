class HTML_NegationNode extends TNode_Element {
	
	public isDefragmentable : boolean = true;
	public isNegation       : boolean = true;

	constructor( nodeName: string ) {
		super();
		this.nodeName = '!'+nodeName;
		this.style.display('inline');
		switch( nodeName ) {
			case 'b':
				this.style.fontWeight( 'normal' );
				break;
			case 'i':
				this.style.fontStyle( 'normal' );
				break;
			case 'u':
			case 'strike':
				this.style.textDecoration('none');
				break;
			case 'sup':
			case 'sub':
				this.style.verticalAlign('normal');
				break;
		}
	}

	public xmlBeginning(): string {
		var out = '<span data-tag="' + this.nodeName + '" style="';

		switch ( this.nodeName ) {
			case '!b':
				out += 'font-weight: normal;';
				break;
			case '!i':
				out += 'font-style: normal;';
				break;
			case '!u':
			case '!strike':
				out += 'text-decoration: none;';
				break;
			case '!sub':
			case '!sup':
				out += 'vertical-align: baseline;'
				break;
		}

		out += '">';

		return out;
	}

	public xmlEnding(): string {
		return '</span>';
	}
}