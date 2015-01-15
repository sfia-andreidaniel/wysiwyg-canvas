class TStyle_Dimension extends TStyle_Property {

	public set( v: string ) {

		var matches: string[];
		
		if ( !( matches = /^(\-)?([\d\.]+)(%)?$/.exec( v ) ) ) {
			console.warn( "bad value for css style: " + this.name + " (" + JSON.stringify( v ) + "). Unsetting..." );
			this.isSet = false;
			this.value = null;
		} else {
			super.set( v );
		}
	}

	public get(): number {

		if ( this.isSet ) {

			if ( /%$/.test( this.value ) ) {

				if ( <TNode_Element>this.style.node.parentNode ) {

					// this is a percent value. we must obtain it from the parent node
					var percent = parseFloat( this.value.substr( this.value.length - 1 ) );

					return ( (<TNode_Element>this.style.node.parentNode).style[ this.name ]() / 100 ) * percent;

				} else {
					// is a percent, but don't have from where to inherit. return 0.
					return 0;
				}

			} else {

				return parseFloat( this.value );
			
			}
		} else {
			// is not set.
			if ( ( this.name == 'width' && this.style._height.isSet || this.name == 'height' && this.style._width.isSet ) && this.style._aspectRatio.isSet ) {

				if ( this.name == 'width' ) {
					return this.style._height.get() *
						   this.style._aspectRatio.get();
				} else {
					return this.style._width.get() /
						   this.style._aspectRatio.get();
				}

			} else {
				return 0;
			}
		}
	}
}