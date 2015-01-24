class UI_Toolbar_Panel_BordersAndColors extends UI_Toolbar_Panel {
	constructor( toolbar: UI_Toolbar ) {
		super( toolbar, 'Borders and Colors' );

		DOM.addClass( this.node, 'ui-panel-borders-and-colors')

		this.node.innerHTML = [
			'<div class="item index-0">',
				'<div class="ui-button borderColor" title="Border Color"></div>',
				'<div class="ui-button backgroundColor" title="Background Color"></div>',
				'<div class="ui-button color" title="Color"></div>',
			'</div>',
		].join( '' );

	}
}