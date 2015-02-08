class UI_Dialog_EditLink extends UI_Dialog_InsertLink {
	
	constructor( 
		config: UI_DialogConfig = {
			"caption": "Edit Link(s)",
			"width": 400,
			"height": 150,
			"minWidth": 400,
			"minHeight": 150,
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
					"name": "Remove Link(s)",
					"callback": function() {
						this.on_remove_links();
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
			"innerHTML": UI_Resources.html_editLink
		}
	) {
		super( config );

		this.aHref = <HTMLInputElement>this.body.querySelector( 'input.i-link' );
		this.aTarget=<HTMLSelectElement>this.body.querySelector( 'select.s-target' );
	}

	/* Setup:
		$args[0]: <viewport>: Viewport
		$args[1]: <sText>   : string = null
		$args[2]: <sHref>   : string = null
		$args[3]: <sTarget> : string = null
	 */

	public setup( ...args: any[] ): UI_Dialog {

		var viewport: Viewport = <Viewport>args[0] || null,
		    sText   : string   = String( args[1] || '' ) || null,
		    sHref   : string   = String( args[2] || '' ) || null,
		    sTarget : string   = String( args[3] || '' ) || null;

		this.viewport = viewport;

		this.aHref.value = sHref || '';
		this.aTarget.value = sTarget || '';

		return this;
	}

	public on_remove_links() {
		this.close();
		this.viewport.execCommand( EditorCommand.REMOVE_LINK );
	}

}