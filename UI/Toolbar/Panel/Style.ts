class UI_Toolbar_Panel_Style extends UI_Toolbar_Panel {
	
	public nodeName: HTMLInputElement   = null;
	public fontFamily: HTMLInputElement = null;
	public fontSize: HTMLInputElement   = null;

	constructor( toolbar: UI_Toolbar ) {
		
		super( toolbar, 'Style' );

		DOM.addClass( this.node, 'ui-panel-style')

		this.node.innerHTML = [
			'<div class="item index-0">',
				'<div class="text-dropdown">',
					'<input class="nodeName" type="text" data-suggestions="p:Normal,h1:Heading 1,h2:Heading 2,h3:Heading 3,h4: Heading 4,h5:Heading 5,h6:Heading 6" placeholder="Style" value="" >',
					'<div class="expander"></div>',
				'</div>',
			'</div>',
			'<div class="item index-1">',
				'<div class="text-dropdown">',
					'<input class="fontFamily" type="text" data-suggestions="Arial,Times New Roman,Courier New" value="" placeholder="Font" />',
					'<div class="expander"></div>',
				'</div>',
			'</div>',
			'<div class="item index-2">',
				'<div class="text-dropdown">',
					'<input class="fontSize" type="text" data-suggestions="8,9,10,12,14,16,18,20,22,24,26,28,30,32" value="" placeholder="Size" />',
					'<div class="expander"></div>',
				'</div>',
			'</div>'
		].join( '' );

		this.nodeName   = <HTMLInputElement>this.node.querySelector( 'input.nodeName' );
		this.fontFamily = <HTMLInputElement>this.node.querySelector( 'input.fontFamily' );
		this.fontSize   = <HTMLInputElement>this.node.querySelector( 'input.fontSize' );

		this.dropdownize( this.nodeName );
		this.dropdownize( this.fontFamily );
		this.dropdownize( this.fontSize );

	}

	private dropdownize( input: HTMLInputElement ) {

		var suggestions : string[] = ( input.getAttribute( 'data-suggestions' ) || '' ).split( ',' ),
		    len: number = suggestions.length,
		    i: number = 0;

		console.warn( suggestions );

	}

	private updateNodeName() {

	}

	private updateFontFamily() {
		var family: string = String( this.toolbar.state.state.fontFamily || '' );
		this.fontFamily.value = family;
	}

	private updateFontSize() {
		var size: string = String( this.toolbar.state.state.fontSize || '' );
		this.fontSize.value = size;
	}

	public updateDocumentState( propertiesList: string[] ) {
		for ( var i=0, len = propertiesList.length; i<len; i++ ) {
			switch ( propertiesList[i] ) {
				case 'nodeName':
					this.updateNodeName();
					break;
				case 'fontFamily':
					this.updateFontFamily();
					break;
				case 'fontSize':
					this.updateFontSize();
					break;
			}
		}
	}
}