class UI_Dialog_InsertLink extends UI_Dialog {
	
	protected aText: HTMLInputElement = null;
	protected aHref: HTMLInputElement = null;
	protected aTarget: HTMLSelectElement = null;

	protected viewport: Viewport = null;

	constructor( 
		config: UI_DialogConfig = {
			"caption": "Insert Link",
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
					"name": "Cancel",
					"cancel": true,
					"callback": function() {
						this.on_cancel();
					}
				}
			],
			"innerHTML": UI_Resources.html_insertLink
		}
	) {
		super( config );

		this.aText = <HTMLInputElement>this.body.querySelector( 'input.i-text' );
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

		this.aText.value = sText || '';

		if ( this.aText.value ) {
			this.aText.readOnly = true;
			this.aText.disabled = true;
		} else {
			this.aText.readOnly = false;
			this.aText.disabled = false;
		}

		this.aHref.value = sHref || '';
		this.aTarget.value = sTarget || '';

		return this;
	}

	public on_ok() {
		
		var me = this;

		if ( this.aText ) {
			if ( this.aText.value == '' ) {
				UI_Dialog_Manager.alert( 'Please fill-in a text for the HyperLink!', function() { me.aText.focus(); }, this.body );
				return;
			}
		}

		if ( this.aHref.value == '' ) {
			UI_Dialog_Manager.alert( 'Please fill-in an internet address that will be used for the HyperLink!', function() { me.aHref.focus(); }, this.body );
			return;
		}

		this.viewport.execCommand( EditorCommand.INSERT_LINK, 
			this.aHref.value, 
			this.aText && this.aText.readOnly === false ? this.aText.value : null, 
			this.aTarget.value 
		);

		this.close();

	}

	public on_cancel() {
		this.close();
	}

}