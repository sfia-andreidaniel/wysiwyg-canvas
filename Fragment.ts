class Fragment {
	
	private _at: FragmentItem[] = [];
	private _length: number = 0;

	public reset() {
		this._length = 0;
	}

	public add( what: FragmentItem, index: number = null ) {
		if ( index == null ) {
			this._at[ this._length++ ] = what;
		} else {
			if ( index < this._length ) {
				this._at[ index ] = what;
			} else {
				this._length = index + 1;
				this._at[ index ] = what;
			}
		}
	}

	public at( index: number, value: FragmentItem = null ): FragmentItem {
		if ( index < 0 || index >= this._length ) {
			throw "OFFSET_OUT_BOUNDS";
		} else {
			if ( value === null ) {
				return this._at[ index ] == void 0 ? null : this._at[ index ];
			} else {
				this.add( value, index );
			}
		}
	}

	public length( value: number=null ): number {
		if ( value == null ) {
			return this._length;
		} else {
			if ( value < 0 ) {
				throw "OFFSET_OUT_BOUNDS";
			} else {
				this._length = value;
			}
		}
	}


}