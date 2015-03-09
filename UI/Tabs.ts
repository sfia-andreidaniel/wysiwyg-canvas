class UI_Tabs extends Events {

	private root: HTMLDivElement;

	private sheets: UI_Tab[] = [];
	
	private _width  : number = 0;
	private _height : number = 0;

	constructor( _DomElement ) {

		super();

		this.root = _DomElement;

		var t: any = Array.prototype.slice.call( this.root.querySelectorAll( '.ui-tabs-header > .ui-tab' ), 0 ),
			i: number,
			len: number = t.length,
			s: UI_Tab;

		// fetch sheets
		for ( i=0; i<len; i++ ) {

			s = {
				"id": t[i].getAttribute('data-sheet-id'),
				"tab": <HTMLDivElement>(t[i]),
				"sheet": <HTMLDivElement>(this.root.querySelector( '.ui-sheet.' + t[i].getAttribute('data-sheet-id' ) ) )
			};

			this.sheets.push( s );

		}

		( function( me ) {

			me.root.querySelector( '.ui-tabs-header' ).addEventListener( 'click', function(evt) {

				var target: any = evt.target || evt.srcElement;

				if ( DOM.hasClass( target, 'ui-tab' ) ) {
					
					me.showTab( target.getAttribute('data-sheet-id') );

				}

			}, false );

		} )( this );

		if ( this.sheets.length ) {
			this.showTab( this.sheets[0].id );
			DOM.addClass( this.sheets[0].tab, 'first' );
		}

	}


	get width(): number {
		return this._width;
	}

	get height(): number {
		return this._height;
	}

	set width ( w: number ) {

		w = ~~w;

		this._width = w;

		this.root.style.width = w + "px";

		this.fire( 'resize' );

	}

	set height( h: number ) {

		h = ~~h;

		this._height = h;

		this.root.style.height = h + "px";

		for ( var i=0, len = this.sheets.length; i<len; i++ ) {
			this.sheets[i].sheet.style.height = ( h - 40 ) + "px";
		}

		this.fire( 'resize' );

	}

	public showTab( tabId: string ) {

		for ( var i=0, len = this.sheets.length; i<len; i++ ) {
			if ( this.sheets[i].id == tabId ) {
				DOM.addClass( this.sheets[i].tab, 'active' );
				this.sheets[i].sheet.style.display = 'block';
			} else {
				DOM.removeClass( this.sheets[i].tab, 'active' );
				this.sheets[i].sheet.style.display = 'none';
			}
		}

	}


}