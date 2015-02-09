class UI_Dialog_FileBrowser extends UI_Dialog {

	constructor( 
		config: UI_DialogConfig = {
			"caption": "Open File",
			"width": 500,
			"height": 250,
			"minWidth": 400,
			"minHeight": 250,
			"closable": true,
			"modal": true,
			"buttons": [
				{
					"name": "Open",
					"default": true,
					"callback": function() {
					}
				},
				{
					"name": "Cancel",
					"cancel": true,
					"callback": function() {
					}
				}
			],
			"innerHTML": UI_Resources.html_fileBrowser
		}
	) {
		super( config );
	}


}