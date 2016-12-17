class SoundEffect{
	constructor() {
		this.template += '<audio style="display: hidden;" preload="auto">';
			this.template += '<source src="./public/sounds/<!--event-->.wav"></source>';
			this.template += '<source src="./public/sounds/<!--event-->.mp3"></source>';
			this.template += '<source src="./public/sounds/<!--event-->.ogg"></source>';
		this.template += '</audio>';
	}

	init(event) {
		this._add.call(this, event);
		this._pause.call(this);
		this._play.call(this);
		setTimeout(() => this._delete.call(this), 5000);
	}

	_play() {
		$(document).find("audio")[0].play();
	}

	_pause() {
		$(document).find("audio")[0].pause();
	}

	_add(event) {
		$('body').append(this.template.replace(/<!--event-->/g, event));
	}

	_delete() {
		$(document).find('audio').remove();
	}
}

export default SoundEffect;