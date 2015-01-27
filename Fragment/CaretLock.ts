class Fragment_CaretLock {
	
	private fragment : Fragment;
	private chars    : number = 0;
	private lockIndex: number = 0;


	constructor( fragment: Fragment, lockIndex: number, direction: CaretLockPos ) {
			
		this.fragment  = fragment;
		this.lockIndex = lockIndex;
		this.chars     = 0;

		if ( direction = CaretLockPos.FROM_BEGINNING_OF_DOCUMENT ) {

		} else {

		}

	}

	public getTarget(): TRange_Target {

		return null;

	}

}