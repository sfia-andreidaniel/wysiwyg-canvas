/// <reference path="Types.ts" />
/// <reference path="Events.ts" />
/// <reference path="Throttler.ts" />

/// <reference path="TNode.ts" />
/// <reference path="./TNode/Text.ts" />
/// <reference path="./TNode/Element.ts" />

/// <reference path="./HTML/Body.ts" />
/// <reference path="./HTML/Paragraph.ts" />
/// <reference path="./HTML/Image.ts" />

/// <reference path="TStyle.ts" />
/// <reference path="./TStyle/Property.ts" />
/// <reference path="./TStyle/PropertyInheritable.ts" />
/// <reference path="./TStyle/Dimension.ts" />
/// <reference path="./TStyle/String.ts" />
/// <reference path="./TStyle/Color.ts" />

/// <reference path="Character.ts" />
/// <reference path="./Character/Metrics.ts" />
/// <reference path="./Character/Line.ts" />
/// <reference path="./Character/Word.ts" />

/// <reference path="Layout.ts" />
/// <reference path="Layout/Horizontal.ts" />
/// <reference path="Layout/Vertical.ts" />
/// <reference path="Layout/Block.ts" />
/// <reference path="Layout/BlockChar.ts" />

/// <reference path="Viewport.ts" />

var viewport = new Viewport(),
    body = viewport.document,
    p,
    img,
    img2,
    img3;

body.appendChild( body.createTextNode( 'text before p' ) );

body.appendChild( p = body.createElement('p') );

body.appendChild( body.createTextNode( 'text after p' ) );

body.style.borderWidth( '1' );
body.style.borderColor( 'red' );
body.style.backgroundColor( '#ddd' );

p.appendChild( body.createTextNode( 'The quick brown fox jumps over the lazy dog.' ) );

p.appendChild( img = <HTML_Image>body.createElement( 'img', '_assets/pic1.jpg' ) );

p.appendChild( body.createTextNode( 'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.' ) );
p.appendChild( body.createTextNode( 'The quick brown fox jumps over the lazy dog.' ) );

p.appendChild( img2 = <HTML_Image>body.createElement( 'img', '_assets/pic1.jpg' ) );
p.appendChild( img3 = <HTML_Image>body.createElement( 'img', '_assets/pic1.jpg' ) );


img.style.float( 'left' );
img.style.marginLeft( '5' );
img.style.marginRight( '5' );
img2.style.float( 'right' );
img2.style.marginRight( '10' );
img3.style.float( 'right' );

img.width( 40 );
img2.width( 20 );
img3.width( 50 );

window.addEventListener( 'load', function() {
	document.body.appendChild( viewport.canvas );
	viewport.canvas.focus();
});