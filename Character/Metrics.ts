class Character_Metrics {
	
	static ctx  = document.createElement( 'canvas' ).getContext( '2d' );

	static FontMap = {};

	static measureCharWidth( fontFamily: string, letter: string ): number {
		var self = Character_Metrics;
		
		if ( !self.FontMap[ fontFamily ] ) {
			self.FontMap[ fontFamily ] = {};
			self.ctx.font = fontFamily;
			self.FontMap[ fontFamily ][ letter ] = self.ctx.measureText( letter ).width;
			return self.FontMap[ fontFamily ][ letter ];
		} else {
			if ( !self.FontMap[ fontFamily ][ letter ] ) {
				self.ctx.font = fontFamily;
				self.FontMap[ fontFamily ][ letter ] = self.ctx.measureText( letter ).width;
			}
			return self.FontMap[ fontFamily ][ letter ];
		}

	}
}