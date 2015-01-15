class Throttler extends Events {
	
	public  lastRun: number = 0;
	public  nextRun: number = null;
	public  frequency: number = 1;
	public  callback: ( ...args ) => void = null;

	constructor( callbackFunction: ( ...args ) => void, frequency: number = 1 ) {
		super();

		this.frequency = frequency;
		this.nextRun = null;
		this.lastRun = Date.now();
		this.callback = callbackFunction;

	}

	public run(): void {
		var now: number = 0,
		    self = this;

		if ( this.nextRun != null ) {
			// a run is already scheduled in the future.
			return;

		} else {
			now = Date.now();
			
			this.lastRun += this.frequency;

			if ( this.lastRun < now ) {
				// run immediately
				this.lastRun = now;
				this.nextRun = null;

				this.callback();

			} else {
				// run in the future
				this.nextRun = this.lastRun + this.frequency;

				setTimeout( function() {
					self.callback();
					self.nextRun = null;
				}, this.nextRun - this.lastRun );
			}

		}
	}

}