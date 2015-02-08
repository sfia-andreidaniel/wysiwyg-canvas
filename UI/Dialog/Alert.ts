class UI_Dialog_Alert extends UI_Dialog {
	
	private textAlert: HTMLParagraphElement = null;
	private callback: () => void = null;

	constructor( 
		config: UI_DialogConfig = {
			"caption": "Alert",
			"width": 400,
			"height": 100,
			"minWidth": 400,
			"minHeight": 50,
			"closable": true,
			"modal": true,
			"buttons": [
				{
					"name": "Ok",
					"default": true,
					"cancel": true,
					"callback": function() {
						this.on_ok();
					}
				}
			],
			"innerHTML": UI_Resources.html_alert
		}
	) {
		super( config );
		this.textAlert = <HTMLParagraphElement>this.body.querySelector( 'p.alert-text' );
	}

	/* Setup:
		$args[0]: <message> : string = null
		$args[1]: <callback>: () => void,
		$args[2]: <centerTo>: DOMElement = null
	 */

	public setup( ...args: any[] ): UI_Dialog {

		this.textAlert.innerHTML = '';

		this.textAlert.appendChild( document.createTextNode( String( args[0] || 'Alert!' ) ) );

		this.callback = args[1] || null;

		if ( args[2] ) {
			this.centerTo( args[2] );
		}

		return this;
	}

	public on_ok() {
		this.close();

		if ( this.callback ) {
			this.callback();
		}
	}

}