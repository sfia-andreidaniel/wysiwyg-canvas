class Fragment_CaretLock {
	
	private fragment : Fragment;
	private chars    : number = 0;
	private lockIndex: number = 0;
	public  direction: CaretLockPos;


	constructor( fragment: Fragment, lockIndex: number, direction: CaretLockPos = CaretLockPos.FROM_BEGINNING_OF_DOCUMENT ) {
			
		var at  : FragmentItem,
		    i   : number = 0,
		    len : number = 0;

		this.fragment  = fragment;
		this.lockIndex = lockIndex;
		this.chars     = 0;
		this.direction = direction;

		if ( direction = CaretLockPos.FROM_BEGINNING_OF_DOCUMENT ) {
			
			// count from beginning to cursor pos

			for ( i=0; i<=lockIndex; i++ ) {
			
				at = this.fragment.at( i );
			
				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
					len++;
				}
			
			}

			this.chars = len;

		} else {

			// count from ending to cursor pos.

			for ( i = this.fragment.length() - 1; i>= lockIndex; i-- ) {

				at = this.fragment.at(i);

				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
					len++;
				}

			}

			this.chars = len;

		}

	}

	public getTarget(): TRange_Target {

		var at: FragmentItem,
		     i: number = 0,
		     len: number = 0,
		     n: number = 0;

		if ( this.direction == CaretLockPos.FROM_BEGINNING_OF_DOCUMENT ) {

			for ( i=0, len = this.fragment.length(); i < len; i++ ) {
				
				at = this.fragment.at( i );
				
				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {
					
					n++;

					if ( n == this.chars ) {

						return new TRange_Target( this.fragment.getNodeAtIndex( i ), i );

					}

				}
			}

			return this.fragment.createTargetAt( FragmentPos.DOC_END );

		} else {

			for ( len = this.fragment.length() -1, i = len; i >= 0; i-- ) {

				at = this.fragment.at( i );

				if ( at == FragmentItem.CHARACTER || at == FragmentItem.WHITE_SPACE ) {

					n++;

					if ( n == this.chars ) {

						return new TRange_Target( this.fragment.getNodeAtIndex( i ), i );

					}

				}

			}

			return this.fragment.createTargetAt( FragmentPos.DOC_BEGIN );

		}
	}

}