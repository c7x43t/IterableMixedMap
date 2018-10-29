# MixedMap

## Syntax
` new MixedMap([iterable])`
`iterable` 2-element array or iterable object: [key,value].

## Methods
### clear()
Removes all elements from the `MixedMap`.
`return` `undefined`
### set(key,value)
`key` Required. The key of the element to add to the `MixedMap` object.
`value` Required. The value of the element to add to the `MixedMap` object.
`return` The `MixedMap` object.
### get(key)
`key` Required. The key of the element to return from the `MixedMap` object.
`return` The element associated with the specified key in the `MixedMap` object. If the key can't be found, `undefined` is returned.
### has(key)
`key` Required. The key of the element to test for presence in the `MixedMap` object.
`return` `Boolean` Returns `true` if an element with the specified key exists in the `MixedMap` object; otherwise `false`.
### delete(key)
`key` Required. The key of the element to remove from the `MixedMap` object.
`return` `Boolean` `true` if an element in the WeakMap object has been removed successfully. `false` if the key is not found in the `MixedMap` or if the key is not an object.

## Iteration Methods
### for...of
Iterates over each element in the `MixedMap` yielding
an object: `{key: currentKey, value: currentValue}`
### map(function)
`function(value,key,this)`
`return` `MixedMap` with mapped values.
See also [Array.prototype.map](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
### forEach(function)
`function(value,key,this)`
`return` `undefined`
See also [Array.prototype.forEach](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
### filter(function)
`function(value,key,this)`
`return` `MixedMap` with filtered values.
See also [Array.prototype.filter](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
### reduce(function,initialValue)
`function(accumulator,value,key,this)`
`initialValue` Value to use as the first argument to the first call of the callback. If no initial value is supplied, the first element in the `MixedMap` will be used. Calling reduce() on an empty `MixedMap` without an initial value is an error.
See also [Array.prototype.reduce](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
## Properties
### length
The length of the `MixedMap`.
### keys
Sparse `Array` with the keys of the `MixedMap`.
Iterable with `for...of` loop.
### values
Sparse `Array` with the values of the `MixedMap`.
Iterable with `for...of` loop.