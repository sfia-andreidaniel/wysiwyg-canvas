class Events {

	private $EVENTS_QUEUE : {};

	constructor(){}

	public on( eventName: string, callback: ( ...args ) => void ) {
		
		this.$EVENTS_QUEUE = this.$EVENTS_QUEUE || {};

		if ( !this.$EVENTS_QUEUE[ eventName ] )
			this.$EVENTS_QUEUE[ eventName ] = [];
		this.$EVENTS_QUEUE[ eventName ].push( callback );
	}

	public off( eventName: string, callback: ( ... args ) => void ) {

		if ( this.$EVENTS_QUEUE && this.$EVENTS_QUEUE[ eventName ] ) {
			for ( var i=0, len = this.$EVENTS_QUEUE[ eventName ].length; i<len; i++ ) {
				if ( this.$EVENTS_QUEUE[ eventName ][ i ] == callback ) {
					this.$EVENTS_QUEUE[ eventName ].splice( i, 1 );
					return;
				}
			}
		}
	}

	public fire( eventName, ...args ) {

		if ( this.$EVENTS_QUEUE && this.$EVENTS_QUEUE[ eventName ] ) {
			for ( var i=0, len = this.$EVENTS_QUEUE[ eventName ].length; i<len; i++ ) {
				this.$EVENTS_QUEUE[ eventName ][i].apply( this, args );
			}
		}
	}

}