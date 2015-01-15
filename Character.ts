class Character {

	//public node: TElement_Text = null;      // the text node containing the character
	//public index: number;					// the index of the character in it's text node

	public width  : number = 0;				// the width on screen of the character
	public height : number = 0;				// the height on screen of the character

	constructor( public node: TNode_Text, public index: number ) {}

}