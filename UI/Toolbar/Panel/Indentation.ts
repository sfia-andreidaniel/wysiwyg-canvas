class UI_Toolbar_Panel_Indentation extends UI_Toolbar_Panel {
	
	public btnIndent  : HTMLDivElement = null;
	public btnUnindent: HTMLDivElement = null;

	constructor( public toolbar: UI_Toolbar ) {
		super( toolbar, 'Indentation' );

		DOM.addClass( this.node, 'ui-panel-indentation')

		this.node.innerHTML = [
			'<div class="item index-0">',
				'<div class="ui-button increase" title="Increase Indent (Tab)"></div>',
				'<div class="ui-button decrease" title="Decrease Indent (Shift + Tab)"></div>',
			'</div>',
		].join( '' );

		this.btnIndent = <HTMLDivElement>this.node.querySelector( '.ui-button.increase' );
		this.btnUnindent = <HTMLDivElement>this.node.querySelector( '.ui-button.decrease' );

		( function( me ) {

			me.btnIndent.addEventListener( 'click', function( DOMEvent ) {
				me.toolbar.router.dispatchCommand( EditorCommand.INDENT, [] );
			}, true );
			
			me.btnUnindent.addEventListener( 'click', function( DOMEvent ) {
				me.toolbar.router.dispatchCommand( EditorCommand.UNINDENT, [] );
			}, true );

		} )( this );

	}
}