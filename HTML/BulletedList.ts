class HTML_BulletedList extends TNode_Element {
	constructor() {
		super();
		this.nodeName = 'ul';
		this.style.display('block');
		this.style.paddingLeft( '30' );
	}
}