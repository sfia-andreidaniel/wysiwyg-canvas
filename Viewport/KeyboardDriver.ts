class Viewport_KeyboardDriver extends Events {

	public viewport: Viewport = null;

	constructor( viewport: Viewport ) {
		super();
		
		this.viewport = viewport;
	}
}