// the layout class is responsible to render elements on the canvas.
class Layout {

	public offsetTop    : number = 0;
	public offsetLeft   : number = 0;
	public offsetWidth  : number = 0;
	public offsetHeight : number = 0;

	public innerTop     : number = 0;
	public innerLeft    : number = 0;
	public innerWidth   : number = 0;
	public innerHeight  : number = 0;

	public parent   : Layout = null;
	public children : Layout[] = [];
	public node     : TNode_Element = null;
	public hasChars : boolean = false;

	constructor() {

	}

	public setParents() {
		if ( this.children ) {
			for ( var i=0, len = this.children.length; i<len; i++ ) {
				this.children[i].parent = this;
				this.children[i].setParents();
			}
		}
	}

}