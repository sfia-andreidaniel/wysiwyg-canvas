class UI_Toolbar_Panel_BordersAndColors extends UI_Toolbar_Panel {
	
	public btnBorderColor: HTMLDivElement;
	public btnBackgroundColor: HTMLDivElement;
	public btnColor: HTMLDivElement;


	constructor( toolbar: UI_Toolbar ) {
		super( toolbar, 'Borders and Colors' );

		DOM.addClass( this.node, 'ui-panel-borders-and-colors')

		this.node.innerHTML = [
			'<div class="item index-0">',
				'<div class="ui-button ui-color-button borderColor" title="Border Color"></div>',
				'<div class="ui-button ui-color-button backgroundColor" title="Background Color"></div>',
				'<div class="ui-button ui-color-button color" title="Color"></div>',
			'</div>',
		].join( '' );

		this.btnBorderColor = <HTMLDivElement>this.node.querySelector( 'div.ui-button.borderColor' );
		this.btnBackgroundColor = <HTMLDivElement>this.node.querySelector( 'div.ui-button.backgroundColor' );
		this.btnColor = <HTMLDivElement>this.node.querySelector( 'div.ui-button.color' );

		( function( me ) {

			me.makeColorDropdown( me.btnBorderColor, function( color: string ) {
				me.setBorderColor( color );
			}, '' );
			me.makeColorDropdown( me.btnBackgroundColor, function( color: string ) {
				me.setBackgroundColor( color );
			}, '' );
			me.makeColorDropdown( me.btnColor, function( color: string ) {
				me.setColor( color );
			}, '');

		})( this );

	}

	protected makeColorDropdown( element: HTMLDivElement, onchange: ( value: string ) => void, initialColor: string ) {
		element.tabIndex = 0;

		var icon = document.createElement( 'div' );
		DOM.addClass( icon, 'icon' );

		var expander = document.createElement( 'div' );
		DOM.addClass( expander, 'expander' );

		var lastColor = document.createElement( 'div' );
		DOM.addClass( lastColor, 'color' );

		var overlay = document.createElement( 'div' );
		DOM.addClass( overlay, 'overlay' );

		var hdr: HTMLDivElement,
		      c: HTMLDivElement;

		c = document.createElement('div');
		DOM.addClass( c, 'c' );
		DOM.addClass( c, 'none' );
		c.setAttribute( 'data-color', '' );
		c.title = 'Default Color';

		overlay.appendChild( c );

		for ( var k in TStyle_Color.$NamedColors ) {
			c = document.createElement( 'div' );
			DOM.addClass( c, 'c' );
			c.setAttribute('data-color', TStyle_Color.$NamedColors[k] )
			c.style.backgroundColor = k;
			overlay.appendChild( c );
		}

		expander.tabIndex = 0;

		element.appendChild( icon );
		element.appendChild( lastColor );
		element.appendChild( expander );
		element.appendChild( overlay );

		lastColor.style.backgroundColor = initialColor;
		lastColor.setAttribute( 'data-color', initialColor );

		if ( !initialColor ) {
			DOM.addClass( lastColor, 'none' );
		}

		function setColor( c: string ) {

			lastColor.style.backgroundColor = c || '';
			lastColor.setAttribute( 'data-color', c || '' );

			if ( !c ) {
				DOM.addClass( lastColor, 'none' );
			} else {
				DOM.removeClass( lastColor, 'none' );
			}

			onchange( c || '' );
		}

		element.addEventListener('mousedown', function( e ) {
			
			var target = <any>( e.target || e.toElement );

			if ( target && DOM.hasClass( target, 'color' ) ) {
				// clicked on the last color

				e.stopPropagation();
				e.preventDefault();

				setColor( lastColor.getAttribute( 'data-color' ) );

				return;
			}

			if ( target && DOM.hasClass( target, 'c' ) ) {

				e.stopPropagation();
				e.preventDefault();
				
				setColor( target.getAttribute( 'data-color' ) );
				
				overlay.style.display = 'none';

				return;
			}

			overlay.style.display = 'block';

		}, true );

		element.addEventListener( 'blur', function() {
			overlay.style.display = 'none';
		}, true );

		expander.addEventListener( 'click', function() {
			setTimeout( function() {
				overlay.style.display = 'block';
			}, 10 );
		}, true );

	}

	protected setBorderColor( color: string ) {
		console.info( 'setBorderColor: ' + color );
	}

	protected setBackgroundColor( color: string ) {
		this.toolbar.router.dispatchCommand( EditorCommand.BGCOLOR, [ color ] );
	}

	protected setColor( color: string ) {
		this.toolbar.router.dispatchCommand( EditorCommand.COLOR, [ color ] );
	}

}