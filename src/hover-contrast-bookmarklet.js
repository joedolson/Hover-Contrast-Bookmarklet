javascript:(function(){
	/**
	 * Execute a simulated mouseover event.
	 *
	 * @param element el Passed element.
	 */
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

	/**
	 * Locate focusable elements and attach an empty mouseover event listener to each.
	 */
	function mouseOverBehaviour() {
		const focusable = document.querySelectorAll( 'a[href], button, input, textarea, select, details, [tabindex]' );
		focusable.forEach((el) => {
			el.addEventListener("mouseover", function(event) {});
			setTimeout(simulateMouseover,300,el);
		});
	}
	mouseOverBehaviour();

	/**
	 * Get the computer foreground or background color for an element.
	 *
	 * @param element el Element to inspect.
	 * @param string  context 'background' or 'foreground'.
	 *
	 * @return string|null
	 */
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

	/**
	 * Convert an RGB color value to a Hexadecimal string.
	 *
	 * @param array rgb values.
	 *
	 * @return String
	 */
	function rgbToHex( rgb ) {
		return ( '#' + rgb.map( ( value ) => value.toString( 16 ).padStart( 2, '0' ) ).join( '' ));
	}

	/**
	 * Get the contrast ratio between two colors.
	 *
	 * @param string color1 First color in hex format.
	 * @param string color2 Second color in hex format.
	 *
	 * @return float
	 */
	function getContrastRatio( color1, color2 ) {
		const luminance1 = calculateLuminance( color1 );
		const luminance2 = calculateLuminance( color2 );
		const lighter = Math.max( luminance1, luminance2 );
		const darker = Math.min( luminance1, luminance2 );
		return ( lighter + 0.05 ) / ( darker + 0.05 );
	}

	/**
	 * Calculate the luminance of a color.
	 *
	 * @param string color Hex color.
	 *
	 * @return float
	 */
	function calculateLuminance( color ) {
		const rgb = hexToRgb( color );
		const [ r, g, b ] = rgb.map( ( value ) => {
			value /= 255;
			return value <= 0.03928 ? value / 12.92 : Math.pow( ( value + 0.055 ) / 1.055, 2.4 );
		} );
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	}

	/**
	 * Convert a hexadecimal color value to an RGB array.
	 *
	 * @param string hex Hexadecimal color string.
	 *
	 * @return array
	 */
	function hexToRgb( hex ) {
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace( shorthandRegex, ( _, r, g, b ) => r + r + g + g + b + b );
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
		return result ? [ parseInt( result[ 1 ], 16 ), parseInt( result[ 2 ], 16 ), parseInt( result[ 3 ], 16 ), ] : null;
	}

})();