class UI_Dialog_InsertVideo extends UI_Dialog {
	
	public    ownerDocument         : HTML_Body  = null;
	public    initialVideo          : HTML_Video = null;

	private   tabs                  : UI_Tabs    = null;

	constructor( 
		config: UI_DialogConfig = {
			"caption": "Insert Video",
			"width": 400,
			"height": 400,
			"minWidth": 400,
			"minHeight": 400,
			"closable": true,
			"modal": true,
			"buttons": [
				{
					"name": "Ok",
					"default": true,
					"callback": function() {
						this.on_ok();
					}
				},
				{
					"name": "Cancel",
					"cancel": true,
					"callback": function() {
						this.on_cancel();
					}
				}
			],
			"innerHTML": UI_Resources.html_insertVideo
		}
	) {
		super( config );

		this.tabs = new UI_Tabs( this.body.querySelector( '.ui-tabs' ) );

		( function( me ) {

			me.on( 'resize', function() {

				me.tabs.width = me.width - 20;
				me.tabs.height= me.height - 30;

			} );


		} )( this );

	}

	/* $args[0] => <picture> : HTML_Video = null
	   $args[1] => <document>: HTML_Body  = null;
	 */
	public setup( ...args: any[] ): UI_Dialog {
		
		var vid: HTML_Video = args[0] || null;
		var doc: HTML_Body  = args[1] || null;

		this.ownerDocument = doc;

		if ( vid === null ) {

			/* Setup for a new video */

			this.initialVideo = null;

		} else {

			/* Setup for an existing video */

			this.initialVideo = vid;

		}

		this.fire( 'resize' );

		return this;	
	}

	public on_ok() {
		
		if ( this.initialVideo ) {
		} else {
			var vid = <HTML_Video>this.ownerDocument.createElement( 'video' );
			this.ownerDocument.viewport.selection.insertHTML( vid.outerHTML() );

		}

		this.close();

	}

	public on_cancel() {

		this.ownerDocument = null;
		this.initialVideo = null;

		this.close();
	}

	public on_browse() {

		( function( me ) {
			UI_Dialog_Manager.singleton( 'FileBrowser' ).centerTo( me.body ).setup('video', function( href: string ) {
				console.warn( 'video.onsourcechanged: ', href );
				me.on_source_changed();

			} ).open();
		} )( this );
	}

	public on_source_changed() {
		console.warn( 'on_source_changed' );
	}

}