class FS_Navigator extends Events {

	public static factory: ( mimeType: string, initialPath: string ) => FS_Navigator = function( mimeType, initialPath ) {
		return new FS_Navigator( mimeType, initialPath );
	};

	protected mimeType : string = null;
	protected path     : string = null;

	public    items: FS_Entry[] = [];

	constructor( mimeType: string = 'image', initialPath: string = '/' ) {
		super();
		
		this.mimeType = mimeType;
		this.path     = initialPath;

		this.open( this.path );
	}

	public open( path: string ) {

		this.fire( 'loading' );

		this.items = [];

		this.fetchItems( this.mimeType, this.path );

	}

	public fetchItems( mime: string, path: string ) {

		/* This is an abstract class. Ulterior implementations should
		   implement this method via AJAX calls, JSONP calls, etc.
		 */

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


		this.path = path;

		this.fire( 'loaded' );

		this.fire( 'changed' );
	
	}

	public toString(): string {
		return this.path;
	}

}