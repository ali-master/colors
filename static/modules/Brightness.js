'use strict';

import getBackgroundColor from './getBackgroundColor';

const brightness = ($elm) => {
	let r,g,b,brightness;
	let color = getBackgroundColor($elm);

	if (color.match(/^rgb/)) {
		color = color.match(/rgba?\(([^)]+)\)/)[1];
		color = color.split(/ *, */).map(Number);
		r = color[0];
		g = color[1];
		b = color[2];
	} else if ('#' == color[0] && 7 == color.length) {
		r = parseInt(color.slice(1, 3), 16);
		g = parseInt(color.slice(3, 5), 16);
		b = parseInt(color.slice(5, 7), 16);
	} else if ('#' == color[0] && 4 == color.length) {
		r = parseInt(color[1] + color[1], 16);
		g = parseInt(color[2] + color[2], 16);
		b = parseInt(color[3] + color[3], 16);
	}

    brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    if (brightness < 125) {
    	// white text
    	$elm.removeClass("light").addClass("dark");
    } else {
    	// black text
    	$elm.removeClass("dark").addClass("light");
    }
}

export default brightness;