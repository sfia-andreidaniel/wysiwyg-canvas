class HTML_BlockQuote extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;

	private _cite: string = null;

	constructor() {
		super();
		this.nodeName = 'blockquote';
		this.style.display('block');

		TStyle_Browser_Calculator.applyDefaultStyles( this, 'blockquote', [
			'fontSize',
			'fontWeight',
			'paddingTop',
			'paddingBottom',
			'paddingLeft',
			'paddingRight',
			'marginTop',
			'marginBottom',
			'marginLeft',
			'marginRight',
			'fontFamily',
			'fontWeight'
		] );
	}

	public paint( ctx: any, layout: Layout, scrollLeft: number, scrollTop: number ) {
		
		super.paint( ctx, layout, scrollLeft, scrollTop );

		ctx.fillStyle = '#666';

		ctx.fillRect( layout.offsetLeftOuter - scrollLeft + ( this.tabStop() * this.documentElement.tabSize() ) , layout.offsetTop - scrollTop, 5, layout.offsetHeight );

	}

	public cite( href: string = null ): string {
		if ( href === null ) {
			return this._cite;
		} else {
			this._cite = href;
			return this._cite;
		}
	}

	public setAttribute( attributeName: string, attributeValue: string ) {
		switch ( attributeName ) {
			case 'cite':
				this.cite( attributeValue );
				break;
			default:
				super.setAttribute( attributeName, attributeValue );
				break;
		}
	}

	public xmlAttributes(): string {
		var out: string[] = [ super.xmlAttributes() ];
		
		if ( this._cite !== null ) {
			out.push( "cite=\"" + this._cite + "\"" );
		}

		return out.join( ' ' );
	}

}