
function MixedMap(iterable){
	// the WeakMap/Map is stored as a hidden property
	const isPrimitive=o=>typeof o==="string"||typeof o==="number";
	const _WeakMap_=new WeakMap();
	const _Map_={};
	let UNDEFINED;
	// the values array is iterable by this Iterator trough a for of loop
	this[Symbol.iterator]=function* specialIterator(){
		const keys=Object.keys(this.values);
		for(let i=0;i<keys.length;i++){
			yield {
				key:this.keys[keys[i]],
				value:this.values[keys[i]]
			};
		}
	}
	// the objectIterator can be used to correctly loop sparse Arrays with a for of loop
	function* objectIterator(){
		const keys=Object.keys(this);
		for(let i=0;i<keys.length;i++){
			yield this[keys[i]];
		}
	}
	// the MixedMap comes with additional properties:
	// length
	// keys and values: sparse arrays holding the keys and values
	// with corresponding keys, values beeing at the same index
	// for set,get delete read the WeakMap reference as they should behave identical
	Object.defineProperties(this, {
		length: {
			value: 0,
			writable: true
		},
		keys:{
			value:[]
		},
		values:{
			value:[]
		},
		clear:{
			value: function(){
				for(let key of this.keys){
					this.delete[key];
				}
			}
		},
		set: {
			value: function(key,value){
				const primitive=isPrimitive(key);
				let index=primitive?_Map_[key]:_WeakMap_.get(key);
				if(index!==UNDEFINED){
					this.values[index]=value;
				}else{
					index=this.keys.push(key)-1;
					this.values.push(value);
					this.length++;
				}
				primitive?_Map_[key]=value:_WeakMap_.set(key,index);
				return this;
			}
		},
		get: {
			value: function(key){
				const primitive=isPrimitive(key);
				const index=primitive?_Map_[key]:_WeakMap_.get(key);
				if(index!==UNDEFINED){
					return this.values[index];
				}
				return index;	
			}
		},
		has: {
			value: function(key){
				return this.get(key)!==UNDEFINED;
			}
		},
		delete: {
			value: function(key){
				const primitive=isPrimitive(key);
				var index=primitive?_Map_[key]:_WeakMap_.get(key);
				if(index!==UNDEFINED){
					delete this.values[index];
					delete this.keys[index];
					this.length--;
					return primitive?delete _Map_[key]:_WeakMap_.delete(key);
				}
				return false;
			}
		},
		// map, forEach, filter, reduce work exactly as expected from the Array methods
		// they return a new MixedMap in the case of map and filter.
		// Arguments of the passed in functions should be (value,key,this) 
		// this beeing the MixedMap itself
		// if no acc=initialValue is passed to reduce, the first element becomes
		map:{
			value: function(f){
				var indices=Object.keys(this.values);
				var newMixedMap=new this.constructor();
				for(var i of indices){
					newMixedMap.set(this.keys[i],f(this.values[i],this.keys[i],this));
				}
				return newMixedMap;
			}
		},
		forEach:{
			value: function(f){
				var indices=Object.keys(this.values);
				for(var i of indices){
					f(this.values[i],this.keys[i],this);
				}
			}
		},
		filter:{
			value: function(f){
				var indices=Object.keys(this.values);
				var newMixedMap=new this.constructor();
				for(var i of indices){
					if(f(this.values[i],this.keys[i],this)) newMixedMap.set(this.keys[i],this.values[i]);
				}
				return newMixedMap;
			}
		},
		reduce:{
			value: function(f,acc){
				var indices=Object.keys(this.values);
				var newMixedMap=new this.constructor();
				var startIndex=0;
				if(acc===UNDEFINED){
					if(this.length>0){
						acc=this.values[indices[startIndex++]];
					}else{
						throw new Error("Reduce of empty MixedMap with no initial value");
					}
				}
				for(var i=startIndex;i<indices.length;i++){
					f(acc,this.values[indices[i]],this.keys[indices[i]],this)
				}
				return acc;
			}
		}
	});
	let objectIteratorConfig={
		value:objectIterator,
		enumerable: false,
		configurable: false,
		writable: false
	}
	// this will correct the behaviour using a for of loop on
	// the sparse arrays
	Object.defineProperty(this.keys,Symbol.iterator,objectIteratorConfig);
	Object.defineProperty(this.values,Symbol.iterator,objectIteratorConfig);
	if(iterable){
		for(let e of iterable){
			this.set(e[0],e[1])
		}
	}
}




