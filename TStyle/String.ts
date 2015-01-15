class TStyle_String extends TStyle_PropertyInheritable {

	constructor( public style: TStyle, public name: string, public allowedOptions: string[] ) {
		super( style, name );
	}

	public get(): string {
		return this.isSet
			? this.value
			: super.get();
	}

	public set( v: string ) {
		if ( !v || this.allowedOptions.indexOf( v ) == -1 ) {
			this.isSet = false;
			this.value = '';
		} else {
			this.value = v;
			this.isSet = true;
		}
	}
}