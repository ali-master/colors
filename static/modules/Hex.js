'use strict';

import Decimal from './Decimal';


const colorToHex = (color) => {
	color = isNaN(color) ? Decimal(color) : color;
    if (!color && color != 0 || color.length == 0)
        return null;

    return '#' + (color |= 1 << 24).toString(16).slice(1)
}

export default colorToHex;