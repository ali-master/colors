class Info {
	constructor() {
		this.$template  = '<div class="content-holder information-block">';
			this.$template += '<div class="content-inner"><h3>وضعیت و مشخصات بازی</h3>';
				this.$template += '<div class="info">';
					this.$template += '<div class="row-view size  clearfix"><div class="label">بزرگی بازی</div><div class="content"><span><!--timer--></span></div></div>';
					this.$template += '<div class="row-view timer clearfix"><div class="label">گذر زمان</div><div class="content"><span><!--size--></span> دقیقه</div></div>';
					this.$template += '<div class="row-view bads  clearfix"><div class="label">تعداد برخورد با مار</div><div class="content"><span><!--bads--></span> بار</div></div>';
					this.$template += '<div class="row-view goods clearfix"><div class="label">تعداد حرکت خوب</div><div class="content"><span><!--goods--></span> بار</div></div>';
					this.$template += '<div class="row-view bests clearfix"><div class="label">تعداد شانس های عالی</div><div class="content"><span><!--best--></span> بار</div></div>';
					this.$template += '<div class="row-view total clearfix"><div class="label">تعداد کل حرکت ها</div><div class="content"><span><!--total--></span> تا</div></div>';
				this.$template += '</div>';
			this.$template += '</div>';
		this.$template += '</div>';

		this._info = $('.info');

		this._append.call(this);
		this._timer.call(this);
	}

	_append() {
		if(!$('.information-block').length){
			$(this.$template).insertAfter($('.container-holder'));
		}
	}

	_timer() {
		const self = this;

		const pad = (val) => {
		    return val > 9 ? val : "0" + val;
		}

		let sec = 0;
		this._timer = setInterval(() => {
			let timer = pad(parseInt(sec / 60, 10)) + ":" + pad(++sec % 60);
			$(document).find('.timer').find('span').empty().html(this._digitsEn2Fa(timer));
		}, 1000);
	}

	end() {
		clearInterval(this._timer);
	}

	set() {
		const self = this;
		const info = $(document);
		return {
			size: function(inp) {
				info.find(".size").find('span').html(self._digitsEn2Fa(inp));
			},
			bads: function(inp) {
				info.find(".bads").find('span').html(self._digitsEn2Fa(inp));
			},
			goods: function(inp) {
				info.find(".goods").find('span').html(self._digitsEn2Fa(inp));
			},
			bests: function(inp) {
				info.find(".bests").find('span').html(self._digitsEn2Fa(inp));
			},
			total: function(inp){
				info.find(".total").find('span').html(self._digitsEn2Fa(inp))
			},
		}
	}

	_digitsEn2Fa(number){
		return number.toString().replace(/\d/g, (d) => {
			return String.fromCharCode(d.charCodeAt(0) + 1728);
		});
	}
}

export default Info;