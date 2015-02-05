class HTML_Heading1 extends TNode_Element {
	
	public isBlockTextNode   : boolean = true;

	constructor() {
		super();
		this.nodeName = 'h1';
		this.style.display('block');
		
		TStyle_Browser_Calculator.applyDefaultStyles( this, 'h1', [
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

		/*
		this.style.fontSize('18');
		this.style.fontWeight('bold');
		*/
	}
}