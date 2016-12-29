'use strict';

const getBackgroundColor = function($elm) {
    var bgColor = "";
    while($elm.prop("tagName").toLowerCase() != "html") {
        bgColor = $elm.css("background-color");
        if(bgColor != "rgba(0, 0, 0, 0)" && bgColor != "transparent") {
            break;
        }
        $elm = $(this).parent();
    }
    return bgColor;
}

export default getBackgroundColor;