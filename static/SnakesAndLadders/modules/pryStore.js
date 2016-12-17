class pryStore {
	constructor(){
		this._name = "Pry Store";
		this._version = '0.2.12';

		this._disabled = false;
		this._key = this._key || null;
		this._value = this._value || {};
		this._storage = window.localStorage || null;
	}

	transact (key, val, transactionFn) {
		this.set(key, val);
		transactionFn ? transactionFn.call(this, val) : "";
	}

	serialize(value) {
		return JSON.stringify(value)
	}

	deserialize(value) {
		if (typeof value != 'string') { return undefined }
		try {
			return JSON.parse(value)
		}catch(e) {
			return value || undefined
		}
	}

	set(key, value) {
		if(this.isSupported()){
			try {
				const val = this.serialize(value);

				this._storage.setItem(key, val);
				return true;
			}catch (e){
		    	new TypeError('Exceeded Storage Quota!');
				return false;
			}
		}else {
			return false;
		}
	}

	forEach(callback) {
		for(let i = 0; i < this._storage.length; i++){
			let key = this._storage.key(i);
			callback.call(this, key, this.get(key))
		}
	}

	get(key, defaultData) {
		try{
			const value = this.deserialize(this._storage.getItem(key));
			return (value === undefined ? defaultData : value)
		}catch(e){
			return null
		}
	}

	getAll(){
		let ret = {};
		this.forEach((key, val) => {
			ret[key] = val
		})
		return ret;
	}

	has(key) {
		return this.get(key) !== undefined;
	}

	remove(key) {
		try {
			this._storage.removeItem(key);
			if(this._storage.length == 0){
				this.clearAll();
			}
			return true
		}catch (e){
			return false
		}finally {
			if(this.get(key)){
				delete this._storage[this._key];
				if(this._storage.length == 0){
					this.clearAll();
				}
			}
		}
	}

	clear() {
		try{
			this._storage.clear();
			return true
		}catch(e){
			return false
		}
	}

	isSupported() {
		return "localStorage" in window && window["localStorage"] !== null;
	}

	isDisabled() {}
}

export default pryStore;