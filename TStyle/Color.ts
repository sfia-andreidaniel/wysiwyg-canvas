class TStyle_Color extends TStyle_PropertyInheritable {
	
	constructor( public style: TStyle, public name: string, public allowInheritance: boolean ) {
		super( style, name );	
	}

	static $NamedColors = {
		white: "#ffffff",
		ivory: "#fffff0",
		lightyellow: "#ffffe0",
		yellow: "#ffff00",
		snow: "#fffafa",
		floralwhite: "#fffaf0",
		lemonchiffon: "#fffacd",
		cornsilk: "#fff8dc",
		seashell: "#fff5ee",
		lavenderblush: "#fff0f5",
		papayawhip: "#ffefd5",
		blanchedalmond: "#ffebcd",
		mistyrose: "#ffe4e1",
		bisque: "#ffe4c4",
		moccasin: "#ffe4b5",
		navajowhite: "#ffdead",
		peachpuff: "#ffdab9",
		gold: "#ffd700",
		pink: "#ffc0cb",
		lightpink: "#ffb6c1",
		orange: "#ffa500",
		lightsalmon: "#ffa07a",
		darkorange: "#ff8c00",
		coral: "#ff7f50",
		hotpink: "#ff69b4",
		tomato: "#ff6347",
		orangered: "#ff4500",
		deeppink: "#ff1493",
		fuchsia: "#ff00ff",
		magenta: "#ff00ff",
		red: "#ff0000",
		oldlace: "#fdf5e6",
		lightgoldenrodyellow: "#fafad2",
		linen: "#faf0e6",
		antiquewhite: "#faebd7",
		salmon: "#fa8072",
		ghostwhite: "#f8f8ff",
		mintcream: "#f5fffa",
		whitesmoke: "#f5f5f5",
		beige: "#f5f5dc",
		wheat: "#f5deb3",
		sandybrown: "#f4a460",
		azure: "#f0ffff",
		honeydew: "#f0fff0",
		aliceblue: "#f0f8ff",
		khaki: "#f0e68c",
		lightcoral: "#f08080",
		palegoldenrod: "#eee8aa",
		violet: "#ee82ee",
		darksalmon: "#e9967a",
		lavender: "#e6e6fa",
		lightcyan: "#e0ffff",
		burlywood: "#deb887",
		plum: "#dda0dd",
		gainsboro: "#dcdcdc",
		crimson: "#dc143c",
		palevioletred: "#db7093",
		goldenrod: "#daa520",
		orchid: "#da70d6",
		thistle: "#d8bfd8",
		lightgray: "#d3d3d3",
		tan: "#d2b48c",
		chocolate: "#d2691e",
		peru: "#cd853f",
		indianred : "#cd5c5c",
		mediumvioletred: "#c71585",
		silver: "#c0c0c0",
		darkkhaki: "#bdb76b",
		rosybrown: "#bc8f8f",
		mediumorchid: "#ba55d3",
		darkgoldenrod: "#b8860b",
		firebrick: "#b22222",
		powderblue: "#b0e0e6",
		lightsteelblue: "#b0c4de",
		paleturquoise: "#afeeee",
		greenyellow: "#adff2f",
		lightblue: "#add8e6",
		darkgray: "#a9a9a9",
		brown: "#a52a2a",
		sienna: "#a0522d",
		yellowgreen: "#9acd32",
		darkorchid: "#9932cc",
		palegreen: "#98fb98",
		darkviolet: "#9400d3",
		mediumpurple: "#9370db",
		lightgreen: "#90ee90",
		darkseagreen: "#8fbc8f",
		saddlebrown: "#8b4513",
		darkmagenta: "#8b008b",
		darkred: "#8b0000",
		blueviolet: "#8a2be2",
		lightskyblue: "#87cefa",
		skyblue: "#87ceeb",
		gray: "#808080",
		olive: "#808000",
		purple: "#800080",
		maroon: "#800000",
		aquamarine: "#7fffd4",
		chartreuse: "#7fff00",
		lawngreen: "#7cfc00",
		mediumslateblue: "#7b68ee",
		lightslategray: "#778899",
		slategray: "#708090",
		olivedrab: "#6b8e23",
		slateblue: "#6a5acd",
		dimgray: "#696969",
		mediumaquamarine: "#66cdaa",
		cornflowerblue: "#6495ed",
		cadetblue: "#5f9ea0",
		darkolivegreen: "#556b2f",
		indigo  : "#4b0082",
		mediumturquoise: "#48d1cc",
		darkslateblue: "#483d8b",
		steelblue: "#4682b4",
		royalblue: "#4169e1",
		turquoise: "#40e0d0",
		mediumseagreen: "#3cb371",
		limegreen: "#32cd32",
		darkslategray: "#2f4f4f",
		seagreen: "#2e8b57",
		forestgreen: "#228b22",
		lightseagreen: "#20b2aa",
		dodgerblue: "#1e90ff",
		midnightblue: "#191970",
		aqua: "#00ffff",
		cyan: "#00ffff",
		springgreen: "#00ff7f",
		lime: "#00ff00",
		mediumspringgreen: "#00fa9a",
		darkturquoise: "#00ced1",
		deepskyblue: "#00bfff",
		darkcyan: "#008b8b",
		teal: "#008080",
		green: "#008000",
		darkgreen: "#006400",
		blue: "#0000ff",
		mediumblue: "#0000cd",
		darkblue: "#00008b",
		navy: "#000080",
		black: "#000000"
	};

	public get(): string {

		if ( this.isSet ) {
			return this.value;
		} else {
			if ( this.allowInheritance ) {
				return super.get();
			} else {
				return '';
			}
		}

	}

	public set( v: string ) {
		
		v = String( v || '' ).toLowerCase();

		if ( TStyle_Color.$NamedColors[ v ] ) {
			this.isSet = true;
			this.value = TStyle_Color.$NamedColors[v];
			return;
		}

		if ( /^#([a-f\d]{3}|[a-f\d]{6})$/.test( v ) ) {
			this.isSet = true;
			this.value = v;
			return;
		}

		this.isSet = false;
	}

}