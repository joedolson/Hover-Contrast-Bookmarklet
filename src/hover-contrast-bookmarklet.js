javascript:(function(){
	function simulateMouseover(el) {
		var event = new MouseEvent('mouseover', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});
		var canceled = ! el.dispatchEvent(event);
		if ( canceled ) {
			console.log( el );
		} else {
			var bg = getComputedColor( el, 'background' );
			var fg = getComputedColor( el, 'foreground' );
			var ratio = getContrastRatio( bg, fg ).toPrecision(3);
			if ( ratio < 4.5 ) {
				hasRatio = el.querySelector( '.contrast-ratio-test' );
				if ( hasRatio ) {
					hasRatio.remove();
				}
				event.target.style.outline = "2px solid #c00";
				event.target.style.outlineOffset = '2px';
				var text = document.createElement( 'span' );
				text.classList.add( 'contrast-ratio-test' );
				text.innerText = ratio;
				text.style.display = 'block';
				text.style.border  = '1px solid';
				text.style.color = 'black';
				text.style.backgroundColor = '#f3f3f3';
				text.style.padding = '3px';
				text.style.borderRadius = '3px';
				text.style.borderWidth = '2px';
				text.style.marginLeft = '3px';
				text.style.position = 'relative';
				text.style.zIndex = '10';
				text.style.minWidth = 'fit-content';
				el.insertAdjacentElement( 'beforeend', text );
			}
		}
	}

	function mouseOverBehaviour() {
		const focusable = document.querySelectorAll( 'a[href], button, input, textarea, select, details, [tabindex]' );
		focusable.forEach((el) => {
			el.addEventListener("mouseover", function(event) {});
			setTimeout(simulateMouseover,300,el);
		});
	}
	mouseOverBehaviour();

	function getComputedColor( el, context ) {
		while ( el ) {
			const color = ( 'background' === context ) ? window.getComputedStyle( el ).backgroundColor : window.getComputedStyle( el ).color;
			if ( 'rgba(0, 0, 0, 0)' === color ) {
				el = el.parentNode;
				continue;
			}
			const rgbValues = color.match( /\d+/g );
			if ( rgbValues.length === 3 ) {
				return rgbToHex(
					rgbValues.map( ( value ) => parseInt( value, 10 ) )
				);
			}

			return null;
		}

		return null;
	}

	function rgbToHex( rgb ) {
		return ( '#' + rgb.map( ( value ) => value.toString( 16 ).padStart( 2, '0' ) ).join( '' ));
	}

	function getContrastRatio( color1, color2 ) {
		const luminance1 = calculateLuminance( color1 );
		const luminance2 = calculateLuminance( color2 );
		const lighter = Math.max( luminance1, luminance2 );
		const darker = Math.min( luminance1, luminance2 );
		return ( lighter + 0.05 ) / ( darker + 0.05 );
	}

	function calculateLuminance( color ) {
		const rgb = hexToRgb( color );
		const [ r, g, b ] = rgb.map( ( value ) => {
			value /= 255;
			return value <= 0.03928 ? value / 12.92 : Math.pow( ( value + 0.055 ) / 1.055, 2.4 );
		} );
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	}

	function hexToRgb( hex ) {
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace( shorthandRegex, ( _, r, g, b ) => r + r + g + g + b + b );
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
		return result ? [ parseInt( result[ 1 ], 16 ), parseInt( result[ 2 ], 16 ), parseInt( result[ 3 ], 16 ), ] : null;
	}

	function rgbToHsl( r, g, b ) {
		r /= 255;
		g /= 255;
		b /= 255;
		const max = Math.max( r, g, b ),
			min = Math.min( r, g, b );
		let h, s;
		const l = ( max + min ) / 2;

		if ( max === min ) {
			h = s = 0;
		} else {
			const d = max - min;
			s = l > 0.5 ? d / ( 2 - max - min ) : d / ( max + min );
			switch ( max ) {
				case r:
					h = ( g - b ) / d + ( g < b ? 6 : 0 );
					break;
				case g:
					h = ( b - r ) / d + 2;
					break;
				case b:
					h = ( r - g ) / d + 4;
					break;
			}
			h /= 6;
		}

		return [ h, s, l ];
	}

	function hslToRgb( h, s, l ) {
		let r, g, b;

		if ( s === 0 ) {
			r = g = b = l;
		} else {
			const hue2rgb = ( p, q, t ) => {
				if ( t < 0 ) t += 1;
				if ( t > 1 ) t -= 1;
				if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
				if ( t < 1 / 2 ) return q;
				if ( t < 2 / 3 ) return p + ( q - p ) * ( 2 / 3 - t ) * 6;
				return p;
			};

			const q = l < 0.5 ? l * ( 1 + s ) : l + s - l * s;
			const p = 2 * l - q;
			r = hue2rgb( p, q, h + 1 / 3 );
			g = hue2rgb( p, q, h );
			b = hue2rgb( p, q, h - 1 / 3 );
		}

		return [
			Math.round( r * 255 ),
			Math.round( g * 255 ),
			Math.round( b * 255 ),
		];
	}

})();