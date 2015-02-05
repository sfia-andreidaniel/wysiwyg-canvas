class HTML_Heading3 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;

	constructor() {
		super();
		this.nodeName = 'h3';
		this.style.display('block');

		TStyle_Browser_Calculator.applyDefaultStyles( this, 'h3', [
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
}