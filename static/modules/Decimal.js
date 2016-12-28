'use strict';

import Colors from './Colors';

const colorToDecimal = (color) => {
    if (/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.exec(color)) {
        var r = Math.min(parseInt(RegExp.$1), 255);
        var g = Math.min(parseInt(RegExp.$2), 255);
        var b = Math.min(parseInt(RegExp.$3), 255);
        return r << 16 | g << 8 | b;
    } else if (/^rgb\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/.exec(color))
        return new colorToDecimal('rgb(' + Math.round(parseInt(RegExp.$1) * 2.55) + ',' + Math.round(parseInt(RegExp.$2) * 2.55) + ',' + Math.round(parseInt(RegExp.$3) * 2.55) + ')');
    else if (/^#?[0-9a-f]{3}$/i.test(color))
        return new colorToDecimal(color.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i, '$1$1$2$2$3$3'));
    else if (/^#?([0-9a-f]{6})$/i.exec(color))
        return parseInt(RegExp.$1, 16);
    else if (Colors[color])
        return new colorToDecimal(Colors[color]);
    else
        return null
}

export default colorToDecimal;