class UI_Toolbar extends Events {
	
	public node: HTMLElement;

	/* BlockName, FontStyle, FontSize: width = 255px */
	/* B I U                         : width = 74px  */
	/* TextAlign                     : width = 98px  */
	/* Bullets and Numbering + Indent: width = 99px  */
	/* Borders and Colors            : width = 107px */

	public panels: UI_Toolbar_Panel[] = [];
	public router: Viewport_CommandRouter = null;

	constructor( DOMNodeContainer: HTMLElement, router: Viewport_CommandRouter ) {
		
		super();
		
		this.node = DOMNodeContainer;
		this.router = router;

		this.panels.push( new UI_Toolbar_Panel_Style               ( this ) );
		this.panels.push( new UI_Toolbar_Panel_Formatting          ( this ) );
		this.panels.push( new UI_Toolbar_Panel_Alignment           ( this ) );
		this.panels.push( new UI_Toolbar_Panel_BulletsAndNumbering ( this ) );
		this.panels.push( new UI_Toolbar_Panel_Indentation         ( this ) );
		this.panels.push( new UI_Toolbar_Panel_BordersAndColors    ( this ) );
		this.panels.push( new UI_Toolbar_Panel_Multimedia          ( this ) );
	
	}

	public resize( width: number ) {

		width = ~~width;

		for ( var i=0, len = this.panels.length; i<len; i++ ) {
			this.panels[i].resizeByParentWidth( width );
		}

	}

}