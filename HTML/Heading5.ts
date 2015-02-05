class HTML_Heading5 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;

	constructor() {
		super();
		this.nodeName = 'h5';
		this.style.display('block');

		TStyle_Browser_Calculator.applyDefaultStyles( this, 'h5', [
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