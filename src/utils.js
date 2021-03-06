/**
 * @factory utils
 */
function utilsFactory() {
	var utils = {
		inherits: inherits,
		extend: extend,
		merge: merge
	};

	return utils;

	/**
	 * @param {Object} destination
	 * @param {Object} source
	 */
	function merge(destination, source) {
		Object.keys(source).forEach(function(key) {
			destination[key] = source[key];
		});

		return destination;
	}

	/**
	 * @param {Function} NewClass
	 * @param {Function} SuperClass
	 *
	 * @example
	 *   function Foo() {}
	 *   function Bar() { Foo.call(this); }
	 *   inherits(Bar, Foo);
	 */
	function inherits(NewClass, SuperClass, attributes) {
		var prototype = SuperClass.prototype,
			childPrototype = Object.create(prototype);

		if (attributes) {
			Object.keys(attributes).forEach(function(key) {
				childPrototype[key] = attributes[key];
			});
		}

		childPrototype.__super__ = SuperClass.prototype;
		NewClass.prototype = childPrototype;
		NewClass.prototype.constructor = NewClass;
	}

	/**
	 * @param {Function} SuperClass 	The class to extend
	 * @param {Object} prototype 		New properties for SubClass
	 */
	function extend(SuperClass, prototype) {
		function SubClass() {
			SuperClass.apply(this, arguments);
		}

		inherits(SubClass, SuperClass, prototype);

		return SubClass;
	}
}
