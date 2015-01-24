class UI_Toolbar_Panel_Multimedia extends UI_Toolbar_Panel {
	constructor( toolbar: UI_Toolbar ) {
		super( toolbar, 'Multimedia' );

		DOM.addClass( this.node, 'ui-panel-multimedia');

		this.node.innerHTML = [
			'<div class="item index-0">',
				'<div class="ui-button link" title="Link"></div>',
				'<div class="ui-button picture" title="Picture"></div>',
				'<div class="ui-button video" title="Video"></div>',
			'</div>',
		].join( '' );

	}
}