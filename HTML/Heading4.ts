class HTML_Heading4 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;

	constructor() {
		super();
		this.nodeName = 'h4';
		this.style.display('block');

		TStyle_Browser_Calculator.applyDefaultStyles( this, 'h4', [
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