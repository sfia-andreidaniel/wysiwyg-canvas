class Viewport extends Events {
	
	private _width  : number    = 500;
	private _height : number    = 500;
	
	public  canvas              = document.createElement( 'canvas' );
	public  context             = null;

	public  document: HTML_Body = null;
	public  painter: Throttler  = null;

	constructor( _width: number = null, _height: number = null ) {
		
		super();
		
		this.context = this.canvas.getContext( '2d' );
		this.canvas.tabIndex = 0;

		( function( me ) {
			me.painter = new Throttler( function() {
				if ( me.document )
					me.document.repaint();
			}, 10 );
		})( this );
		

		this.document = new HTML_Body( this );

		this.width( _width === null ? this._width : _width );
		this.height( _height === null ? this._height : _height );

		( function( me ) {
			/*
			me.document.on( 'relayout', function() {
				console.log( 'relayout request!' );
			} );
			me.document.on( 'repaint', function() {
				console.log( 'repaint request!' );
			});
			*/
		} )( this );

	}

	public width( newWidth: number = null ): number {
		if ( newWidth === null ) {
			//getter
			return this._width;
		} else {
			this._width = newWidth < 0 ? 0 : newWidth;
			this.canvas.width = this._width;
			this.document.requestRelayout();
			return this._width;
		}
	}

	public height( newHeight: number = null ): number {
		if ( newHeight === null ) {
			//getter
			return this._height;
		} else {
			this._height = newHeight < 0 ? 0 : newHeight;
			this.canvas.height = this._height;
			this.document.requestRelayout();
			return this._height;
		}
	}

}