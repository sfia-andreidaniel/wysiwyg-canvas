class TStyle_Property {
	
	// <constructor> public style: TStyle;
	// <constructor> public name: string;
	public isSet: boolean = false;
	public value: any = null;
	
	constructor( public style: TStyle, public name: string ) {
	}

	public get(): any {
		return this.isSet ? this.value : null;
	}

	public set( v: any ) {
		this.isSet = true;
		this.value = v;
	}
}