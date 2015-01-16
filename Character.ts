class Character {

	//public node: TElement_Text = null;      // the text node containing the character
	//public index: number;					// the index of the character in it's text node

	private size: number[] = null;

	constructor( public node: TNode_Text, public index: number ) {}

	public letter(): string {
		return this.node._text[ this.index ];
	}

	/* Compute the width of the character based on the
	   style of the element which contains the text
	   node */
	public computeSize(): number[] {

		if ( this.size ) {
			return this.size;
		} else {
			if ( !this.node.parentNode ) {
				return ( this.size = [0,0] );
			} else {
				var fontSize: number,
					font: string = 
						( this.node.parentNode.style.fontStyle() == 'italic' ? 'italic ' : '' ) +
						( this.node.parentNode.style.fontWeight() == 'bold'  ? 'bold ' : '' ) +
						( fontSize = this.node.parentNode.style.fontSize() ) + 'px ' +
						this.node.parentNode.style.fontFamily(),
				    lineHeight: number = fontSize * this.node.parentNode.style.lineHeight();
				return ( this.size = [ Character_Metrics.measureCharWidth( font, this.letter() ), lineHeight ] );
			}
		}
	}

}