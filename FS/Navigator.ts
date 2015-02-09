class FS_Navigator extends Events {

	public static factory: ( mimeType: string, initialPath: string ) => FS_Navigator = function( mimeType, initialPath ) {
		return new FS_Navigator( mimeType, initialPath );
	};

	public    mimeType : string = null;
	public    path     : string = null;
	public    items: FS_Entry[] = [];

	public    lastStatus: FS_Navigator_Status = FS_Navigator_Status.LOADED;

	constructor( mimeType: string = 'image', initialPath: string = '/' ) {
		super();
		
		this.mimeType = mimeType;
		this.path     = initialPath;

		( function( me ) {

			me.on( 'loading', function() {
				me.lastStatus = FS_Navigator_Status.LOADING;
			} );

			me.on( 'loaded', function() {
				me.lastStatus = FS_Navigator_Status.LOADED;
			} );

			me.on( 'error', function() {
				me.lastStatus = FS_Navigator_Status.ERROR;
			} );


		} )( this );

	}

	public open( path: string ) {

		this.fire( 'loading' );

		this.items = [];

		this.fetchItems( this.mimeType, path );

	}

	/* This is an abstract class. Ulterior implementations should
	   implement this method via AJAX calls, JSONP calls, etc.
	 */

	public fetchItems( mime: string, path: string ) {

		switch ( path ) {
			case '/':

				this.items = [
					{
						"name": "_assets",
						"mime": "folder",
						"type": FSItem.FOLDER
					}
				];

				( function( me ) {
					setTimeout( function() {
						me.path = path;
						me.fire( 'loaded' );
						me.fire( 'changed' );
					}, 1000 );
				} )( this );

				break;

			case '/_assets/':

				switch ( true ) {

					case /^image/.test( mime ) ? true : false:

						this.items = [
							{
								"name": "pic1.jpg",
								"mime": "image/jpg",
								"url" : "./_assets/pic1.jpg",
								"type": FSItem.FILE
							},
							{
								"name": "pic2.jpg",
								"mime": "image/jpg",
								"url" : "./_assets/pic2.jpg",
								"type": FSItem.FILE
							}
						];

						break;

					default:

						this.items = [];

						break;

				}

				( function( me ) {
					setTimeout( function() {
						me.path = path;
						me.fire( 'loaded' );
						me.fire( 'changed' );
					}, 1000 );
				} )( this );

				break;

			default:

				( function( me ) {
					setTimeout( function() {
						me.fire( 'error', 'invalid path "' + path + '"' );
					}, 100 );
				} )( this );

				break;
		}

	}

	public toString(): string {
		return this.path;
	}

	public goUp(): boolean {

		if ( this.path == '/' || this.path == '' ) {
		
			return false;
		
		} else {

			var parts = this.path.replace( /(^[\/\\]+|[\/\\]+$)/g, '').split( /[\/\\]+/ );

			if ( !parts.length ) {
				return false;
			}

			this.open( parts.slice( 0, parts.length - 1 ).join( '/' ) || '/' );

			return true;

		}

	}

}