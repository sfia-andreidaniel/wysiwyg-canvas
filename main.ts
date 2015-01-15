/// <reference path="Types.ts" />
/// <reference path="Events.ts" />
/// <reference path="Throttler.ts" />

/// <reference path="TNode.ts" />
/// <reference path="./TNode/Text.ts" />
/// <reference path="./TNode/Element.ts" />

/// <reference path="./HTML/Body.ts" />
/// <reference path="./HTML/Paragraph.ts" />

/// <reference path="TStyle.ts" />
/// <reference path="./TStyle/Property.ts" />
/// <reference path="./TStyle/PropertyInheritable.ts" />
/// <reference path="./TStyle/Dimension.ts" />
/// <reference path="./TStyle/String.ts" />
/// <reference path="./TStyle/Color.ts" />

/// <reference path="Character.ts" />
/// <reference path="Layout.ts" />
/// <reference path="Layout/Horizontal.ts" />
/// <reference path="Layout/Vertical.ts" />
/// <reference path="Layout/Block.ts" />
/// <reference path="Layout/BlockChar.ts" />

var body = new HTML_Body(),
    p;

body.appendChild( body.createTextNode( 'text before p' ) );

body.appendChild( p = body.createElement('p') );

body.appendChild( body.createTextNode( 'text after p' ) );

p.appendChild( body.createTextNode( 'The quick brown fox jumps over the lazy dog.' ) );