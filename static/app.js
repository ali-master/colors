'use strict';

import RGB from './modules/RGB';
import Hex from './modules/Hex';
import Decimal from './modules/Decimal';
import Brightness from './modules/Brightness';
import getBackgroundColor from './modules/getBackgroundColor';
import Colors from './modules/Colors';

class colors{
	constructor() {
		this.prefix = "";

		this.$hex = $('#hex');
	    this.$rgb = $('#rgb');
	    this.$hex_val = $('#hex').val();
	    this.$rgb_val = $('#rgb').val();

	    this.$color = null;
	}

	rgb() {
		const self = this;
		self.$rgb.bind('blur keyup', function(e){
			self.$color = $.rgbHex($('#rgb').val());

			if(self.$color){
				$('#hex').val(self.$color);
			}else {
				$('#hex').val('');
			}

			$('body').css('background-color', self.$hex.val());

			if(e.keyCode == 13){
				self.$hex.select();
			}
		});
	}

	hex() {
		const self = this;
		self.$hex.bind('blur keyup', function(e){
			self.$color = Hex($('#hex').val());

			if(self.$color){
				$('#rgb').val(self.$color);
			}else {
				$('#rgb').val('');
			}

			$('body').css('background-color', self.$rgb.val());

			if(e.keyCode == 13){
				self.$rgb.select();
			}
		});		
	}
}

$(window).load(function(){
	$('.tweet').click(function(e){
		var width  = 575,
        	height = 400,
        	left   = ($(window).width() - width) / 2,
        	top    = ($(window).height() - height) / 2,
        	url    = this.href,
        	opts   = 'status=1' +
                 	 ',width='  + width  +
                 	 ',height=' + height +
                 	 ',top='    + top    +
                 	 ',left='   + left;

		window.open(url, 'twitter', opts);

		return false;
	});
});
