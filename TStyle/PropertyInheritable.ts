class TStyle_PropertyInheritable extends TStyle_Property {

	public get(): any {
		if ( !this.isSet && this.style.node.parentNode ) {
			return (<TNode_Element>this.style.node.parentNode).style[ this.name ]();
		} else return super.get();
	}

}