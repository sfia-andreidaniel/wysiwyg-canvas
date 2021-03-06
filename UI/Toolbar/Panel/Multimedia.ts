class UI_Toolbar_Panel_Multimedia extends UI_Toolbar_Panel {
	
	public buttonLink: HTMLDivElement = null;
	public buttonPicture: HTMLDivElement = null;
	public buttonVideo: HTMLDivElement = null;

	constructor( toolbar: UI_Toolbar, appendIn: HTMLDivElement, maxPercentualOrFixedWidth: number, panelRowIndex: number ) {
		
		super( toolbar, 'Multimedia', appendIn, maxPercentualOrFixedWidth, panelRowIndex );

		DOM.addClass( this.node, 'ui-panel-multimedia');

		this.node.innerHTML = UI_Resources.html_multimediaToolbar;

		this.buttonLink = <HTMLDivElement>this.node.querySelector( '.ui-button.link' );
		this.buttonPicture= <HTMLDivElement>this.node.querySelector( '.ui-button.picture' );
		this.buttonVideo = <HTMLDivElement>this.node.querySelector( '.ui-button.video' );

		( function( me ) {

			me.buttonLink.addEventListener( 'click', function( e ) {

				if ( DOM.hasClass( me.buttonLink, 'state-disabled' ) ) {
					return;
				}

				me.insertLink();

			}, true );

			me.buttonPicture.addEventListener( 'click', function( e ) {

				if ( DOM.hasClass( me.buttonPicture, 'state-disabled' ) ) {
					return;
				}

				me.insertPicture();

			}, true );

			me.buttonVideo.addEventListener( 'click', function( e ) {

				if ( DOM.hasClass( me.buttonVideo, 'state-disabled' ) ) {
					return;
				}

				me.insertVideo();

			}, true );
		} )( this );

		this.on_afterload();
		
	}

	public insertLink() {

		var selection = this.toolbar.router.viewport.selection,
		    rng       = selection.getRange(),
		    dialog: UI_Dialog = null,
		    fragment: Fragment_Contextual,
		    elements: TNode_Element[],

		    cursor: TNode,
		    cursorBlock: TNode_Element,

		    aText: string = null,
		    aTarget: string = null,
		    aHref: string = null,

		    i: number = 0,
		    len: number;

		/* We dissalow the command if no rng.focusNode() is definde */
		if ( rng.focusNode() === null ) {

			UI_Dialog_Manager.alert( 'Please click or select a text first!', function() {
				selection.viewport.canvas.focus();
			}, selection.viewport.canvas );

			return;
		}

		if ( !rng.length() && rng.focusNode() ) {
			// If nothing is selected, but the caret is inside of an "A" element,
			// we select that element first!.
			cursor = rng.focusNode().target;
			cursorBlock = cursor.ownerBlockElement();
			while ( cursor != cursorBlock ) {
				if ( cursor.is() == 'a' ) {

					selection.selectByFragmentIndexes( cursor.FRAGMENT_START, cursor.FRAGMENT_END );

					rng = selection.getRange();

					break;
				}
				cursor = cursor.parentNode;
			}
		}

		if ( rng.length() ) {
			/* Find out if selection contains any links */
			fragment = rng.createContextualFragment();

			aText = fragment.toString( 'text/plain' );

			elements = fragment.affectedInlineElements();

			// see if we have any "A" in elements. If we have, we borrow it's target and href.

			for ( i=0, len = elements.length; i<len; i++ ) {
				if ( elements[i].is() == 'a' ) {
					aTarget = (<HTML_Anchor>elements[i]).target();
					aHref   = (<HTML_Anchor>elements[i]).href();
					
					dialog = UI_Dialog_Manager.singleton( 'EditLink' );
					
					break;
				}
			}

			if ( !dialog ) {
				dialog = UI_Dialog_Manager.singleton('InsertLink');
			}

		} else {
			dialog = UI_Dialog_Manager.singleton('InsertLink');
		}

		if ( dialog ) {
			dialog.setup( this.toolbar.router.viewport, aText, aHref, aTarget ).centerTo( selection.viewport.canvas ).open();
		}

	}

	public insertPicture() {

		var selection = this.toolbar.router.viewport.selection,
		    rng       = selection.getRange(),
		    picture: HTML_Image = null;

		if ( !rng.focusNode() && !rng.isOrphan() ) {
			if ( rng.anchorNode().target.is() != 'img' ) {
				UI_Dialog_Manager.alert( 'The editor is not in a state which allows inserting pictures. Try selecting a picture or some text first.', function() {
					selection.viewport.canvas.focus();
				}, selection.viewport.canvas );
				return;
			} else {
				picture = <HTML_Image>rng.anchorNode().target;
			}
		} else {
			picture = null;
		}

		UI_Dialog_Manager.singleton( 'InsertPicture' ).setup( picture, this.toolbar.router.viewport.document ).centerTo( selection.viewport.canvas ).open();

	}

	public insertVideo() {

		var selection = this.toolbar.router.viewport.selection,
		    rng       = selection.getRange(),
		    video: HTML_Video = null;

		if ( !rng.focusNode() && !rng.isOrphan() ) {
			if ( rng.anchorNode().target.is() != 'video' ) {
				UI_Dialog_Manager.alert( 'The editor is not in a state which allows inserting videos. Try selecting a video or some text first.', function() {
					selection.viewport.canvas.focus();
				}, selection.viewport.canvas );
				return;
			} else {
				video = <HTML_Video>rng.anchorNode().target;
			}
		} else {
			video = null;
		}

		UI_Dialog_Manager.singleton( 'InsertVideo' ).setup( video, this.toolbar.router.viewport.document ).centerTo( selection.viewport.canvas ).open();

	}

	private updatePictureState() {
		if ( this.toolbar.state.state.picture ) {
			DOM.removeClass( this.buttonPicture, 'state-disabled' );
		} else {
			DOM.addClass( this.buttonPicture, 'state-disabled' );
		}
	}

	private updateVideoState() {
		if ( this.toolbar.state.state.video ) {
			DOM.removeClass( this.buttonVideo, 'state-disabled' );
		} else {
			DOM.addClass( this.buttonVideo, 'state-disabled' );
		}
	}

	private updateLinkState() {
		if ( this.toolbar.state.state.link ) {
			DOM.removeClass( this.buttonLink, 'state-disabled' );
		} else {
			DOM.addClass( this.buttonLink, 'state-disabled' );
		}
	}
	
	private updateObjectState() {
		if ( this.toolbar.state.state.object ) {
			// DOM.removeClass( this.buttonObject, 'state-disabled' );
		} else {
			// DOM.addClass( this.buttonObject, 'state-disabled' );
		}
	}

	public updateDocumentState( propertiesList: string [] ) {

		var i: number = 0,
		    len: number = propertiesList.length;

		for ( i=0; i<len; i++ ) {
			switch ( propertiesList[i] ) {
				case 'picture':
					this.updatePictureState();
					break;
				case 'video':
					this.updateVideoState();
					break;
				case 'object':
					this.updateObjectState();
					break;
				case 'link':
					this.updateLinkState();
					break;
			}
		}

	}
}