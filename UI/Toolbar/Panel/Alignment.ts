class UI_Toolbar_Panel_Alignment extends UI_Toolbar_Panel {
	
	public btnLeft      : HTMLDivElement  = null;
	public btnRight     : HTMLDivElement  = null;
	public btnCenter    : HTMLDivElement  = null;
	public btnJustified : HTMLDivElement  = null;

	constructor( public toolbar: UI_Toolbar ) {

		super( toolbar, 'Style' );

		DOM.addClass( this.node, 'ui-panel-alignment')

		this.node.innerHTML = [
			'<div class="item index-0">',
				'<div class="ui-button left" title="Left (Ctrl+L)"></div>',
				'<div class="ui-button center" title="Center (Ctrl+E)"></div>',
				'<div class="ui-button right" title="Right (Ctrl+R)"></div>',
				'<div class="ui-button justified" title="Justified (Ctrl+J)"></div>',
			'</div>',
		].join( '' );

		this.btnLeft      = <HTMLDivElement>this.node.querySelector( '.ui-button.left' );
		this.btnRight     = <HTMLDivElement>this.node.querySelector( '.ui-button.right' );
		this.btnCenter    = <HTMLDivElement>this.node.querySelector( '.ui-button.center' );
		this.btnJustified = <HTMLDivElement>this.node.querySelector( '.ui-button.justified' );

		( function( me ) {

			me.btnLeft.addEventListener( 'click', function(DOMEvent) {
				me.toolbar.router.dispatchCommand( EditorCommand.ALIGN, [ 'left' ] );
			}, true );

			me.btnRight.addEventListener( 'click', function(DOMEvent) {
				me.toolbar.router.dispatchCommand( EditorCommand.ALIGN, [ 'right' ] );
			}, true );

			me.btnCenter.addEventListener( 'click', function(DOMEvent) {
				me.toolbar.router.dispatchCommand( EditorCommand.ALIGN, [ 'center' ] );
			}, true );

			me.btnJustified.addEventListener( 'click', function(DOMEvent) {
				me.toolbar.router.dispatchCommand( EditorCommand.ALIGN, [ 'justified' ] );
			}, true );

		} )( this );

	}
	private updateState() {
		var state: string = this.toolbar.state.state.textAlign,
		    btns: HTMLDivElement[] = [
		    	this.btnLeft,
		    	this.btnRight,
		    	this.btnCenter,
		    	this.btnJustified
		    ],
		    i: number;
		
		for ( i=0; i<4; i++ ) {
			DOM.removeClass( btns[i], 'state-pressed' );
			/* DOM.removeClass( btns[i], 'state-mixed' ); */
		}

		switch ( state ) {
			case 'left':
				DOM.addClass( this.btnLeft, 'state-pressed' );
				break;
			case 'right':
				DOM.addClass( this.btnRight, 'state-pressed' );
				break;
			case 'center':
				DOM.addClass( this.btnCenter, 'state-pressed' );
				break;
			case 'justified':
				DOM.addClass( this.btnJustified, 'state-pressed' );
				break;
			case null:
				/*
				DOM.addClass( this.btnLeft, 'state-mixed' );
				DOM.addClass( this.btnRight, 'state-mixed' );
				DOM.addClass( this.btnCenter, 'state-mixed' );
				DOM.addClass( this.btnJustified, 'state-mixed' );
				*/
				break;

		}
	}

	public updateDocumentState( propertiesList: string[] ) {
		if ( propertiesList.indexOf( 'textAlign' ) >= 0 ) {
			this.updateState();
		}
	}
}