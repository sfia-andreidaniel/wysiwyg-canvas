class Character {

	//public node: TElement_Text = null;      // the text node containing the character
	//public index: number;					// the index of the character in it's text node

	public width  : number = 0;				// the width on screen of the character
	public height : number = 0;				// the height on screen of the character

	private size  : number[];               // [0] => width, [1] => height

	constructor( public node: TNode_Text, public index: number ) {}

	public letter(): string {
		return this.node._text[ this.index ];
	}

	/* Compute the width of the character based on the
	   style of the element which contains the text
	   node */
	public computeSize(): number[] {

		if ( !this.node.parentNode ) {
			return [0,0];
		} else {

			//var out: number,
			//fontSignature: string = ( this.italic ? 'italic ' : '' ) + ( this.bold ? 'bold ' : '' ) + this.size + 'px ' + this.family

			return null;
		}
	}

}