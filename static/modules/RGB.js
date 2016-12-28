'use strict';

import Decimal from './Decimal';

const colorToRGB = (color) => {
    color = isNaN(color) ? Decimal(color) : color;
    if (!color)
        return null;

    return 'rgb(' + (color >> 16 & 255) + ',' + (color >> 8 & 255) + ',' + (color & 255) + ')'
}

export default colorToRGB;