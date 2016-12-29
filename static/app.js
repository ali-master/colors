'use strict';

import RGB from './modules/RGB';
import Hex from './modules/Hex';
import Decimal from './modules/Decimal';
import Brightness from './modules/Brightness';

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
		self.$rgb.bind('blur keyup', (e) => {
			self.$color = Hex( $.trim($('#rgb').val()) );

			if(self.$color){
				$('#hex').val(self.$color);
			}else {
				$('#hex').val('');
			}

			$('body').css('background-color', self.$hex.val());
			Brightness($('body'));

			if(e.keyCode == 13){
				self.$hex.select();
			}
		});
	}

	hex() {
		const self = this;
		self.$hex.bind('blur keyup', (e) => {
			self.$color = Hex( $.trim($('#hex').val()) );

			if(self.$color){
				$('#rgb').val(self.$color);
			}else {
				$('#rgb').val('');
			}

			$('body').css('background-color', self.$rgb.val());
			Brightness($('body'));

			if(e.keyCode == 13){
				self.$rgb.select();
			}
		});		
	}
}

$(window).load(function(){
	const color = new colors();

	color.hex();
	color.rgb();
});