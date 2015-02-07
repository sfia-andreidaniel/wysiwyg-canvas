class UI_Dialog_InsertPicture extends UI_Dialog {
	
	constructor( 
		config: UI_DialogConfig = {
			"caption": "Insert Picture",
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
			"innerHTML": UI_Resources.html_insertPicture
		}
	) {
		super( config );
	}

	public on_ok() {
		console.log( 'ok pressed' );
	}

	public on_cancel() {
		console.log( 'cancel pressed' );
	}
}