/**
 * interface Storage {
 *  readonly attribute unsigned long length;
 *  DOMString? key(unsigned long index);
 *  getter DOMString? getItem(DOMString key);
 *  setter creator void setItem(DOMString key, DOMString value);
 *  deleter void removeItem(DOMString key);
 *  void clear();
 * };
 */
app.service('StorageService', function(){

	this.storage = window.localStorage;

	var get = function(key){return this.storage.getItem(key);}, 
	set = function(key, value){ this.storage.setItem(key, value); return this; }, 
	key = function(index){return this.storage.key(index);}, 
	remove = function(key){this.storage.removeItem(key); return this;}, 
	clear = function(){this.storage.clear(); return this;},
	create = function(key){

	};

	return {
		clear: clear,
		create : create,
		get : get,
		key : key,
		length : this.storage.length,
		set : set,
		remove : remove
	};

});
