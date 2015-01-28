class Helper {

	static reverse( arr: any[] ): any[] {
		if ( Array.prototype.reverse ) {
			return Array.prototype.reverse.call( arr );
		} else {
			var out: any[] = [],
			    i: number = arr.length - 1;
			while ( i >= 0 ) {
				out.push( arr[i--] );
			}
			return out;
		}
	}

}