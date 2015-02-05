class HTML_Paragraph extends TNode_Element {
	
	public isBlockTextNode : boolean = true;

	constructor() {
		super();
		this.nodeName = 'p';
		this.style.display('block');

		TStyle_Browser_Calculator.applyDefaultStyles( this, 'p', [
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