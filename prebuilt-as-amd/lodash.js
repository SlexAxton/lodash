define('lodash', function () {

  'use strict';

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    start = start == null ? 0 : (+start || 0);
    if (start < 0) {
      start = -start > length ? 0 : (length + start);
    }
    end = (typeof end == 'undefined' || end > length) ? length : (+end || 0);
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }

  var internal_baseSlice = baseSlice;

  /**
   * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
   * of an array-like value.
   */
  var internal_isIndex__MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    value = +value;
    length = length == null ? internal_isIndex__MAX_SAFE_INTEGER : length;
    return value > -1 && value % 1 == 0 && value < length;
  }

  var internal_isIndex = isIndex;

  /**
   * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
   * of an array-like value.
   */
  var internal_isLength__MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   */
  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= internal_isLength__MAX_SAFE_INTEGER;
  }

  var internal_isLength = isLength;

  /**
   * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(1);
   * // => false
   */
  function isObject(value) {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    var type = typeof value;
    return type == 'function' || (!!value && type == 'object');
  }

  var lang_isObject = isObject;

  function isIterateeCall(value, index, object) {
    if (!lang_isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number') {
      var length = object.length,
          prereq = internal_isLength(length) && internal_isIndex(index, length);
    } else {
      prereq = type == 'string' && index in object;
    }
    if (prereq) {
      var other = object[index];
      return value === value ? (value === other) : (other !== other);
    }
    return false;
  }

  var internal_isIterateeCall = isIterateeCall;

  var array_chunk__ceil = Math.ceil;

  /* Native method references for those with the same name as other `lodash` methods. */
  var array_chunk__nativeMax = Math.max;

  /**
   * Creates an array of elements split into groups the length of `size`.
   * If `collection` can't be split evenly, the final chunk will be the remaining
   * elements.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to process.
   * @param {number} [size=1] The length of each chunk.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Array} Returns the new array containing chunks.
   * @example
   *
   * _.chunk(['a', 'b', 'c', 'd'], 2);
   * // => [['a', 'b'], ['c', 'd']]
   *
   * _.chunk(['a', 'b', 'c', 'd'], 3);
   * // => [['a', 'b', 'c'], ['d']]
   */
  function chunk(array, size, guard) {
    if (guard ? internal_isIterateeCall(array, size, guard) : size == null) {
      size = 1;
    } else {
      size = array_chunk__nativeMax(+size || 1, 1);
    }
    var index = 0,
        length = array ? array.length : 0,
        resIndex = -1,
        result = Array(array_chunk__ceil(length / size));

    while (index < length) {
      result[++resIndex] = internal_baseSlice(array, index, (index += size));
    }
    return result;
  }

  var array_chunk = chunk;

  /**
   * Creates an array with all falsey values removed. The values `false`, `null`,
   * `0`, `""`, `undefined`, and `NaN` are falsey.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to compact.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.compact([0, 1, false, 2, '', 3]);
   * // => [1, 2, 3]
   */
  function compact(array) {
    var index = -1,
        length = array ? array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value) {
        result[++resIndex] = value;
      }
    }
    return result;
  }

  var array_compact = compact;

  /**
   * Gets the index at which the first occurrence of `NaN` is found in `array`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
   */
  function indexOfNaN(array, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 0 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      var other = array[index];
      if (other !== other) {
        return index;
      }
    }
    return -1;
  }

  var internal_indexOfNaN = indexOfNaN;

  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return internal_indexOfNaN(array, fromIndex);
    }
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  var internal_baseIndexOf = baseIndexOf;

  function cacheIndexOf(cache, value) {
    var data = cache.data,
        result = (typeof value == 'string' || lang_isObject(value)) ? data.set.has(value) : data.hash[value];

    return result ? 0 : -1;
  }

  var internal_cacheIndexOf = cacheIndexOf;

  function cachePush(value) {
    var data = this.data;
    if (typeof value == 'string' || lang_isObject(value)) {
      data.set.add(value);
    } else {
      data.hash[value] = true;
    }
  }

  var internal_cachePush = cachePush;

  /**
   * Converts `value` to a string if it is not one. An empty string is returned
   * for `null` or `undefined` values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    if (typeof value == 'string') {
      return value;
    }
    return value == null ? '' : (value + '');
  }

  var internal_baseToString = baseToString;

  var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
      reHasRegExpChars = RegExp(reRegExpChars.source);

  /**
   * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
   * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to escape.
   * @returns {string} Returns the escaped string.
   * @example
   *
   * _.escapeRegExp('[lodash](https://lodash.com/)');
   * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
   */
  function escapeRegExp(string) {
    string = internal_baseToString(string);
    return (string && reHasRegExpChars.test(string))
      ? string.replace(reRegExpChars, '\\$&')
      : string;
  }

  var string_escapeRegExp = escapeRegExp;

  /**
   * Checks if `value` is object-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   */
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  var internal_isObjectLike = isObjectLike;

  var lang_isNative__funcTag = '[object Function]';

  /** Used to detect host constructors (Safari > 5). */
  var reHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for native method references. */
  var lang_isNative__objectProto = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var fnToString = Function.prototype.toString;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isNative__objToString = lang_isNative__objectProto.toString;

  /** Used to detect if a method is native. */
  var reNative = RegExp('^' +
    string_escapeRegExp(lang_isNative__objToString)
    .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * Checks if `value` is a native function.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
   * @example
   *
   * _.isNative(Array.prototype.push);
   * // => true
   *
   * _.isNative(_);
   * // => false
   */
  function isNative(value) {
    if (value == null) {
      return false;
    }
    if (lang_isNative__objToString.call(value) == lang_isNative__funcTag) {
      return reNative.test(fnToString.call(value));
    }
    return internal_isObjectLike(value) && reHostCtor.test(value);
  }

  var lang_isNative = isNative;

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;

  /** Detect free variable `self`. */
  var freeSelf = objectTypes[typeof self] && self && self.Object && self;

  /** Detect free variable `window`. */
  var freeWindow = objectTypes[typeof window] && window && window.Object && window;

  /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it is the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */
  var root = freeGlobal || freeWindow || freeSelf || undefined;

  var internal_root = root;

  var internal_SetCache__Set = lang_isNative(internal_SetCache__Set = internal_root.Set) && internal_SetCache__Set;

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_SetCache__nativeCreate = lang_isNative(internal_SetCache__nativeCreate = Object.create) && internal_SetCache__nativeCreate;

  /**
   *
   * Creates a cache object to store unique values.
   *
   * @private
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var length = values ? values.length : 0;

    this.data = { 'hash': internal_SetCache__nativeCreate(null), 'set': new internal_SetCache__Set };
    while (length--) {
      this.push(values[length]);
    }
  }

  // Add functions to the `Set` cache.
  SetCache.prototype.push = internal_cachePush;

  var internal_SetCache = SetCache;

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var object = { 'user': 'fred' };
   * var getter = _.constant(object);
   *
   * getter() === object;
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  var utility_constant = constant;

  var internal_createCache__Set = lang_isNative(internal_createCache__Set = internal_root.Set) && internal_createCache__Set;

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_createCache__nativeCreate = lang_isNative(internal_createCache__nativeCreate = Object.create) && internal_createCache__nativeCreate;

  /**
   * Creates a `Set` cache object to optimize linear searches of large arrays.
   *
   * @private
   * @param {Array} [values] The values to cache.
   * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
   */
  var createCache = !(internal_createCache__nativeCreate && internal_createCache__Set) ? utility_constant(null) : function(values) {
    return new internal_SetCache(values);
  };

  var internal_createCache = createCache;

  function baseDifference(array, values) {
    var length = array ? array.length : 0,
        result = [];

    if (!length) {
      return result;
    }
    var index = -1,
        indexOf = internal_baseIndexOf,
        isCommon = true,
        cache = (isCommon && values.length >= 200) ? internal_createCache(values) : null,
        valuesLength = values.length;

    if (cache) {
      indexOf = internal_cacheIndexOf;
      isCommon = false;
      values = cache;
    }
    outer:
    while (++index < length) {
      var value = array[index];

      if (isCommon && value === value) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values[valuesIndex] === value) {
            continue outer;
          }
        }
        result.push(value);
      }
      else if (indexOf(values, value, 0) < 0) {
        result.push(value);
      }
    }
    return result;
  }

  var internal_baseDifference = baseDifference;

  var lang_isArguments__argsTag = '[object Arguments]';

  /** Used for native method references. */
  var lang_isArguments__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isArguments__objToString = lang_isArguments__objectProto.toString;

  /**
   * Checks if `value` is classified as an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    var length = internal_isObjectLike(value) ? value.length : undefined;
    return internal_isLength(length) && lang_isArguments__objToString.call(value) == lang_isArguments__argsTag;
  }

  var lang_isArguments = isArguments;

  var lang_isArray__arrayTag = '[object Array]';

  /** Used for native method references. */
  var lang_isArray__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isArray__objToString = lang_isArray__objectProto.toString;

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeIsArray = lang_isNative(nativeIsArray = Array.isArray) && nativeIsArray;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(function() { return arguments; }());
   * // => false
   */
  var isArray = nativeIsArray || function(value) {
    return internal_isObjectLike(value) && internal_isLength(value.length) && lang_isArray__objToString.call(value) == lang_isArray__arrayTag;
  };

  var lang_isArray = isArray;

  function baseFlatten(array, isDeep, isStrict) {
    var index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index];

      if (internal_isObjectLike(value) && internal_isLength(value.length) && (lang_isArray(value) || lang_isArguments(value))) {
        if (isDeep) {
          // Recursively flatten arrays (susceptible to call stack limits).
          value = baseFlatten(value, isDeep, isStrict);
        }
        var valIndex = -1,
            valLength = value.length;

        result.length += valLength;
        while (++valIndex < valLength) {
          result[++resIndex] = value[valIndex];
        }
      } else if (!isStrict) {
        result[++resIndex] = value;
      }
    }
    return result;
  }

  var internal_baseFlatten = baseFlatten;

  /** Used as the `TypeError` message for "Functions" methods. */
  var function_restParam__FUNC_ERROR_TEXT = 'Expected a function';

  /* Native method references for those with the same name as other `lodash` methods. */
  var function_restParam__nativeMax = Math.max;

  /**
   * Creates a function that invokes `func` with the `this` binding of the
   * created function and arguments from `start` and beyond provided as an array.
   *
   * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var say = _.restParam(function(what, names) {
   *   return what + ' ' + _.initial(names).join(', ') +
   *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
   * });
   *
   * say('hello', 'fred', 'barney', 'pebbles');
   * // => 'hello fred, barney, & pebbles'
   */
  function restParam(func, start) {
    if (typeof func != 'function') {
      throw new TypeError(function_restParam__FUNC_ERROR_TEXT);
    }
    start = function_restParam__nativeMax(typeof start == 'undefined' ? (func.length - 1) : (+start || 0), 0);
    return function() {
      var args = arguments,
          index = -1,
          length = function_restParam__nativeMax(args.length - start, 0),
          rest = Array(length);

      while (++index < length) {
        rest[index] = args[start + index];
      }
      switch (start) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, args[0], rest);
        case 2: return func.call(this, args[0], args[1], rest);
      }
      var otherArgs = Array(start + 1);
      index = -1;
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = rest;
      return func.apply(this, otherArgs);
    };
  }

  var function_restParam = restParam;

  var difference = function_restParam(function(array, values) {
    return (lang_isArray(array) || lang_isArguments(array))
      ? internal_baseDifference(array, internal_baseFlatten(values, false, true))
      : [];
  });

  var array_difference = difference;

  function drop(array, n, guard) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (guard ? internal_isIterateeCall(array, n, guard) : n == null) {
      n = 1;
    }
    return internal_baseSlice(array, n < 0 ? 0 : n);
  }

  var array_drop = drop;

  function dropRight(array, n, guard) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (guard ? internal_isIterateeCall(array, n, guard) : n == null) {
      n = 1;
    }
    n = length - (+n || 0);
    return internal_baseSlice(array, 0, n < 0 ? 0 : n);
  }

  var array_dropRight = dropRight;

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparing arrays.
   * @param {boolean} [isLoose] Specify performing partial comparisons.
   * @param {Array} [stackA] Tracks traversed `value` objects.
   * @param {Array} [stackB] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
    var index = -1,
        arrLength = array.length,
        othLength = other.length,
        result = true;

    if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
      return false;
    }
    // Deep compare the contents, ignoring non-numeric properties.
    while (result && ++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      result = undefined;
      if (customizer) {
        result = isLoose
          ? customizer(othValue, arrValue, index)
          : customizer(arrValue, othValue, index);
      }
      if (typeof result == 'undefined') {
        // Recursively compare arrays (susceptible to call stack limits).
        if (isLoose) {
          var othIndex = othLength;
          while (othIndex--) {
            othValue = other[othIndex];
            result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
            if (result) {
              break;
            }
          }
        } else {
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
        }
      }
    }
    return !!result;
  }

  var internal_equalArrays = equalArrays;

  /** `Object#toString` result references. */
  var internal_equalByTag__boolTag = '[object Boolean]',
      internal_equalByTag__dateTag = '[object Date]',
      internal_equalByTag__errorTag = '[object Error]',
      internal_equalByTag__numberTag = '[object Number]',
      internal_equalByTag__regexpTag = '[object RegExp]',
      internal_equalByTag__stringTag = '[object String]';

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} value The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(object, other, tag) {
    switch (tag) {
      case internal_equalByTag__boolTag:
      case internal_equalByTag__dateTag:
        // Coerce dates and booleans to numbers, dates to milliseconds and booleans
        // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
        return +object == +other;

      case internal_equalByTag__errorTag:
        return object.name == other.name && object.message == other.message;

      case internal_equalByTag__numberTag:
        // Treat `NaN` vs. `NaN` as equal.
        return (object != +object)
          ? other != +other
          // But, treat `-0` vs. `+0` as not equal.
          : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

      case internal_equalByTag__regexpTag:
      case internal_equalByTag__stringTag:
        // Coerce regexes to strings and treat strings primitives and string
        // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
        return object == (other + '');
    }
    return false;
  }

  var internal_equalByTag = equalByTag;

  var _support__objectProto = Object.prototype;

  /** Used to detect DOM support. */
  var document = (document = internal_root.window) && document.document;

  /** Native method references. */
  var propertyIsEnumerable = _support__objectProto.propertyIsEnumerable;

  /**
   * An object environment feature flags.
   *
   * @static
   * @memberOf _
   * @type Object
   */
  var support = {};

  (function(x) {

    /**
     * Detect if functions can be decompiled by `Function#toString`
     * (all but Firefox OS certified apps, older Opera mobile browsers, and
     * the PlayStation 3; forced `false` for Windows 8 apps).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcDecomp = /\bthis\b/.test(function() { return this; });

    /**
     * Detect if `Function#name` is supported (all but IE).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcNames = typeof Function.name == 'string';

    /**
     * Detect if the DOM is supported.
     *
     * @memberOf _.support
     * @type boolean
     */
    try {
      support.dom = document.createDocumentFragment().nodeType === 11;
    } catch(e) {
      support.dom = false;
    }

    /**
     * Detect if `arguments` object indexes are non-enumerable.
     *
     * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
     * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
     * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
     * checks for indexes that exceed their function's formal parameters with
     * associated values of `0`.
     *
     * @memberOf _.support
     * @type boolean
     */
    try {
      support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
    } catch(e) {
      support.nonEnumArgs = true;
    }
  }(0, 0));

  var _support = support;

  var object_keysIn__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var object_keysIn__hasOwnProperty = object_keysIn__objectProto.hasOwnProperty;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    if (object == null) {
      return [];
    }
    if (!lang_isObject(object)) {
      object = Object(object);
    }
    var length = object.length;
    length = (length && internal_isLength(length) &&
      (lang_isArray(object) || (_support.nonEnumArgs && lang_isArguments(object))) && length) || 0;

    var Ctor = object.constructor,
        index = -1,
        isProto = typeof Ctor == 'function' && Ctor.prototype === object,
        result = Array(length),
        skipIndexes = length > 0;

    while (++index < length) {
      result[index] = (index + '');
    }
    for (var key in object) {
      if (!(skipIndexes && internal_isIndex(key, length)) &&
          !(key == 'constructor' && (isProto || !object_keysIn__hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  var object_keysIn = keysIn;

  var internal_shimKeys__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var internal_shimKeys__hasOwnProperty = internal_shimKeys__objectProto.hasOwnProperty;

  /**
   * A fallback implementation of `Object.keys` which creates an array of the
   * own enumerable property names of `object`.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the array of property names.
   */
  function shimKeys(object) {
    var props = object_keysIn(object),
        propsLength = props.length,
        length = propsLength && object.length;

    var allowIndexes = length && internal_isLength(length) &&
      (lang_isArray(object) || (_support.nonEnumArgs && lang_isArguments(object)));

    var index = -1,
        result = [];

    while (++index < propsLength) {
      var key = props[index];
      if ((allowIndexes && internal_isIndex(key, length)) || internal_shimKeys__hasOwnProperty.call(object, key)) {
        result.push(key);
      }
    }
    return result;
  }

  var internal_shimKeys = shimKeys;

  var nativeKeys = lang_isNative(nativeKeys = Object.keys) && nativeKeys;

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  var keys = !nativeKeys ? internal_shimKeys : function(object) {
    if (object) {
      var Ctor = object.constructor,
          length = object.length;
    }
    if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
        (typeof object != 'function' && (length && internal_isLength(length)))) {
      return internal_shimKeys(object);
    }
    return lang_isObject(object) ? nativeKeys(object) : [];
  };

  var object_keys = keys;

  var internal_equalObjects__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var internal_equalObjects__hasOwnProperty = internal_equalObjects__objectProto.hasOwnProperty;

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparing values.
   * @param {boolean} [isLoose] Specify performing partial comparisons.
   * @param {Array} [stackA] Tracks traversed `value` objects.
   * @param {Array} [stackB] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
    var objProps = object_keys(object),
        objLength = objProps.length,
        othProps = object_keys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isLoose) {
      return false;
    }
    var skipCtor = isLoose,
        index = -1;

    while (++index < objLength) {
      var key = objProps[index],
          result = isLoose ? key in other : internal_equalObjects__hasOwnProperty.call(other, key);

      if (result) {
        var objValue = object[key],
            othValue = other[key];

        result = undefined;
        if (customizer) {
          result = isLoose
            ? customizer(othValue, objValue, key)
            : customizer(objValue, othValue, key);
        }
        if (typeof result == 'undefined') {
          // Recursively compare objects (susceptible to call stack limits).
          result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB);
        }
      }
      if (!result) {
        return false;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (!skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor &&
          ('constructor' in object && 'constructor' in other) &&
          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        return false;
      }
    }
    return true;
  }

  var internal_equalObjects = equalObjects;

  var lang_isTypedArray__argsTag = '[object Arguments]',
      lang_isTypedArray__arrayTag = '[object Array]',
      lang_isTypedArray__boolTag = '[object Boolean]',
      lang_isTypedArray__dateTag = '[object Date]',
      lang_isTypedArray__errorTag = '[object Error]',
      lang_isTypedArray__funcTag = '[object Function]',
      lang_isTypedArray__mapTag = '[object Map]',
      lang_isTypedArray__numberTag = '[object Number]',
      lang_isTypedArray__objectTag = '[object Object]',
      lang_isTypedArray__regexpTag = '[object RegExp]',
      lang_isTypedArray__setTag = '[object Set]',
      lang_isTypedArray__stringTag = '[object String]',
      lang_isTypedArray__weakMapTag = '[object WeakMap]';

  var lang_isTypedArray__arrayBufferTag = '[object ArrayBuffer]',
      lang_isTypedArray__float32Tag = '[object Float32Array]',
      lang_isTypedArray__float64Tag = '[object Float64Array]',
      lang_isTypedArray__int8Tag = '[object Int8Array]',
      lang_isTypedArray__int16Tag = '[object Int16Array]',
      lang_isTypedArray__int32Tag = '[object Int32Array]',
      lang_isTypedArray__uint8Tag = '[object Uint8Array]',
      lang_isTypedArray__uint8ClampedTag = '[object Uint8ClampedArray]',
      lang_isTypedArray__uint16Tag = '[object Uint16Array]',
      lang_isTypedArray__uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[lang_isTypedArray__float32Tag] = typedArrayTags[lang_isTypedArray__float64Tag] =
  typedArrayTags[lang_isTypedArray__int8Tag] = typedArrayTags[lang_isTypedArray__int16Tag] =
  typedArrayTags[lang_isTypedArray__int32Tag] = typedArrayTags[lang_isTypedArray__uint8Tag] =
  typedArrayTags[lang_isTypedArray__uint8ClampedTag] = typedArrayTags[lang_isTypedArray__uint16Tag] =
  typedArrayTags[lang_isTypedArray__uint32Tag] = true;
  typedArrayTags[lang_isTypedArray__argsTag] = typedArrayTags[lang_isTypedArray__arrayTag] =
  typedArrayTags[lang_isTypedArray__arrayBufferTag] = typedArrayTags[lang_isTypedArray__boolTag] =
  typedArrayTags[lang_isTypedArray__dateTag] = typedArrayTags[lang_isTypedArray__errorTag] =
  typedArrayTags[lang_isTypedArray__funcTag] = typedArrayTags[lang_isTypedArray__mapTag] =
  typedArrayTags[lang_isTypedArray__numberTag] = typedArrayTags[lang_isTypedArray__objectTag] =
  typedArrayTags[lang_isTypedArray__regexpTag] = typedArrayTags[lang_isTypedArray__setTag] =
  typedArrayTags[lang_isTypedArray__stringTag] = typedArrayTags[lang_isTypedArray__weakMapTag] = false;

  /** Used for native method references. */
  var lang_isTypedArray__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isTypedArray__objToString = lang_isTypedArray__objectProto.toString;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  function isTypedArray(value) {
    return internal_isObjectLike(value) && internal_isLength(value.length) && !!typedArrayTags[lang_isTypedArray__objToString.call(value)];
  }

  var lang_isTypedArray = isTypedArray;

  var internal_baseIsEqualDeep__argsTag = '[object Arguments]',
      internal_baseIsEqualDeep__arrayTag = '[object Array]',
      internal_baseIsEqualDeep__funcTag = '[object Function]',
      internal_baseIsEqualDeep__objectTag = '[object Object]';

  /** Used for native method references. */
  var internal_baseIsEqualDeep__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var internal_baseIsEqualDeep__hasOwnProperty = internal_baseIsEqualDeep__objectProto.hasOwnProperty;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var internal_baseIsEqualDeep__objToString = internal_baseIsEqualDeep__objectProto.toString;

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparing objects.
   * @param {boolean} [isLoose] Specify performing partial comparisons.
   * @param {Array} [stackA=[]] Tracks traversed `value` objects.
   * @param {Array} [stackB=[]] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
    var objIsArr = lang_isArray(object),
        othIsArr = lang_isArray(other),
        objTag = internal_baseIsEqualDeep__arrayTag,
        othTag = internal_baseIsEqualDeep__arrayTag;

    if (!objIsArr) {
      objTag = internal_baseIsEqualDeep__objToString.call(object);
      if (objTag == internal_baseIsEqualDeep__argsTag) {
        objTag = internal_baseIsEqualDeep__objectTag;
      } else if (objTag != internal_baseIsEqualDeep__objectTag) {
        objIsArr = lang_isTypedArray(object);
      }
    }
    if (!othIsArr) {
      othTag = internal_baseIsEqualDeep__objToString.call(other);
      if (othTag == internal_baseIsEqualDeep__argsTag) {
        othTag = internal_baseIsEqualDeep__objectTag;
      } else if (othTag != internal_baseIsEqualDeep__objectTag) {
        othIsArr = lang_isTypedArray(other);
      }
    }
    var objIsObj = (objTag == internal_baseIsEqualDeep__objectTag || (isLoose && objTag == internal_baseIsEqualDeep__funcTag)),
        othIsObj = (othTag == internal_baseIsEqualDeep__objectTag || (isLoose && othTag == internal_baseIsEqualDeep__funcTag)),
        isSameTag = objTag == othTag;

    if (isSameTag && !(objIsArr || objIsObj)) {
      return internal_equalByTag(object, other, objTag);
    }
    if (isLoose) {
      if (!isSameTag && !(objIsObj && othIsObj)) {
        return false;
      }
    } else {
      var valWrapped = objIsObj && internal_baseIsEqualDeep__hasOwnProperty.call(object, '__wrapped__'),
          othWrapped = othIsObj && internal_baseIsEqualDeep__hasOwnProperty.call(other, '__wrapped__');

      if (valWrapped || othWrapped) {
        return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
      }
      if (!isSameTag) {
        return false;
      }
    }
    // Assume cyclic values are equal.
    // For more information on detecting circular references see https://es5.github.io/#JO.
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == object) {
        return stackB[length] == other;
      }
    }
    // Add `object` and `other` to the stack of traversed objects.
    stackA.push(object);
    stackB.push(other);

    var result = (objIsArr ? internal_equalArrays : internal_equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

    stackA.pop();
    stackB.pop();

    return result;
  }

  var internal_baseIsEqualDeep = baseIsEqualDeep;

  function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
    // Exit early for identical values.
    if (value === other) {
      // Treat `+0` vs. `-0` as not equal.
      return value !== 0 || (1 / value == 1 / other);
    }
    var valType = typeof value,
        othType = typeof other;

    // Exit early for unlike primitive values.
    if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
        value == null || other == null) {
      // Return `false` unless both values are `NaN`.
      return value !== value && other !== other;
    }
    return internal_baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
  }

  var internal_baseIsEqual = baseIsEqual;

  function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
    var index = -1,
        length = props.length,
        noCustomizer = !customizer;

    while (++index < length) {
      if ((noCustomizer && strictCompareFlags[index])
            ? values[index] !== object[props[index]]
            : !(props[index] in object)
          ) {
        return false;
      }
    }
    index = -1;
    while (++index < length) {
      var key = props[index],
          objValue = object[key],
          srcValue = values[index];

      if (noCustomizer && strictCompareFlags[index]) {
        var result = typeof objValue != 'undefined' || (key in object);
      } else {
        result = customizer ? customizer(objValue, srcValue, key) : undefined;
        if (typeof result == 'undefined') {
          result = internal_baseIsEqual(srcValue, objValue, customizer, true);
        }
      }
      if (!result) {
        return false;
      }
    }
    return true;
  }

  var internal_baseIsMatch = baseIsMatch;

  function isStrictComparable(value) {
    return value === value && (value === 0 ? ((1 / value) > 0) : !lang_isObject(value));
  }

  var internal_isStrictComparable = isStrictComparable;

  function toObject(value) {
    return lang_isObject(value) ? value : Object(value);
  }

  var internal_toObject = toObject;

  function baseMatches(source) {
    var props = object_keys(source),
        length = props.length;

    if (!length) {
      return utility_constant(true);
    }
    if (length == 1) {
      var key = props[0],
          value = source[key];

      if (internal_isStrictComparable(value)) {
        return function(object) {
          return object != null && object[key] === value &&
            (typeof value != 'undefined' || (key in internal_toObject(object)));
        };
      }
    }
    var values = Array(length),
        strictCompareFlags = Array(length);

    while (length--) {
      value = source[props[length]];
      values[length] = value;
      strictCompareFlags[length] = internal_isStrictComparable(value);
    }
    return function(object) {
      return object != null && internal_baseIsMatch(internal_toObject(object), props, values, strictCompareFlags);
    };
  }

  var internal_baseMatches = baseMatches;

  function baseMatchesProperty(key, value) {
    if (internal_isStrictComparable(value)) {
      return function(object) {
        return object != null && object[key] === value &&
          (typeof value != 'undefined' || (key in internal_toObject(object)));
      };
    }
    return function(object) {
      return object != null && internal_baseIsEqual(value, object[key], null, true);
    };
  }

  var internal_baseMatchesProperty = baseMatchesProperty;

  /**
   * The base implementation of `_.property` which does not coerce `key` to a string.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  var internal_baseProperty = baseProperty;

  /**
   * This method returns the first argument provided to it.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'user': 'fred' };
   *
   * _.identity(object) === object;
   * // => true
   */
  function identity(value) {
    return value;
  }

  var utility_identity = identity;

  function bindCallback(func, thisArg, argCount) {
    if (typeof func != 'function') {
      return utility_identity;
    }
    if (typeof thisArg == 'undefined') {
      return func;
    }
    switch (argCount) {
      case 1: return function(value) {
        return func.call(thisArg, value);
      };
      case 3: return function(value, index, collection) {
        return func.call(thisArg, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(thisArg, accumulator, value, index, collection);
      };
      case 5: return function(value, other, key, object, source) {
        return func.call(thisArg, value, other, key, object, source);
      };
    }
    return function() {
      return func.apply(thisArg, arguments);
    };
  }

  var internal_bindCallback = bindCallback;

  function baseCallback(func, thisArg, argCount) {
    var type = typeof func;
    if (type == 'function') {
      return typeof thisArg == 'undefined'
        ? func
        : internal_bindCallback(func, thisArg, argCount);
    }
    if (func == null) {
      return utility_identity;
    }
    if (type == 'object') {
      return internal_baseMatches(func);
    }
    return typeof thisArg == 'undefined'
      ? internal_baseProperty(func + '')
      : internal_baseMatchesProperty(func + '', thisArg);
  }

  var internal_baseCallback = baseCallback;

  function baseWhile(array, predicate, isDrop, fromRight) {
    var length = array.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
    return isDrop
      ? internal_baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
      : internal_baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
  }

  var internal_baseWhile = baseWhile;

  function dropRightWhile(array, predicate, thisArg) {
    return (array && array.length)
      ? internal_baseWhile(array, internal_baseCallback(predicate, thisArg, 3), true, true)
      : [];
  }

  var array_dropRightWhile = dropRightWhile;

  function dropWhile(array, predicate, thisArg) {
    return (array && array.length)
      ? internal_baseWhile(array, internal_baseCallback(predicate, thisArg, 3), true)
      : [];
  }

  var array_dropWhile = dropWhile;

  /**
   * The base implementation of `_.fill` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to fill.
   * @param {*} value The value to fill `array` with.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns `array`.
   */
  function baseFill(array, value, start, end) {
    var length = array.length;

    start = start == null ? 0 : (+start || 0);
    if (start < 0) {
      start = -start > length ? 0 : (length + start);
    }
    end = (typeof end == 'undefined' || end > length) ? length : (+end || 0);
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : (end >>> 0);
    start >>>= 0;

    while (start < length) {
      array[start++] = value;
    }
    return array;
  }

  var internal_baseFill = baseFill;

  function fill(array, value, start, end) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (start && typeof start != 'number' && internal_isIterateeCall(array, value, start)) {
      start = 0;
      end = length;
    }
    return internal_baseFill(array, value, start, end);
  }

  var array_fill = fill;

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {Function} predicate The function invoked per iteration.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromRight) {
    var length = array.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  var internal_baseFindIndex = baseFindIndex;

  function createFindIndex(fromRight) {
    return function(array, predicate, thisArg) {
      if (!(array && array.length)) {
        return -1;
      }
      predicate = internal_baseCallback(predicate, thisArg, 3);
      return internal_baseFindIndex(array, predicate, fromRight);
    };
  }

  var internal_createFindIndex = createFindIndex;

  var findIndex = internal_createFindIndex();

  var array_findIndex = findIndex;

  var findLastIndex = internal_createFindIndex(true);

  var array_findLastIndex = findLastIndex;

  /**
   * Gets the first element of `array`.
   *
   * @static
   * @memberOf _
   * @alias head
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the first element of `array`.
   * @example
   *
   * _.first([1, 2, 3]);
   * // => 1
   *
   * _.first([]);
   * // => undefined
   */
  function first(array) {
    return array ? array[0] : undefined;
  }

  var array_first = first;

  function flatten(array, isDeep, guard) {
    var length = array ? array.length : 0;
    if (guard && internal_isIterateeCall(array, isDeep, guard)) {
      isDeep = false;
    }
    return length ? internal_baseFlatten(array, isDeep) : [];
  }

  var array_flatten = flatten;

  function flattenDeep(array) {
    var length = array ? array.length : 0;
    return length ? internal_baseFlatten(array, true) : [];
  }

  var array_flattenDeep = flattenDeep;

  var head = array_first;

  /** Native method references. */
  var internal_binaryIndexBy__floor = Math.floor;

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_binaryIndexBy__nativeMin = Math.min;

  /** Used as references for the maximum length and index of an array. */
  var internal_binaryIndexBy__MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1,
      MAX_ARRAY_INDEX =  internal_binaryIndexBy__MAX_ARRAY_LENGTH - 1;

  /**
   * This function is like `binaryIndex` except that it invokes `iteratee` for
   * `value` and each element of `array` to compute their sort ranking. The
   * iteratee is invoked with one argument; (value).
   *
   * @private
   * @param {Array} array The sorted array to inspect.
   * @param {*} value The value to evaluate.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {boolean} [retHighest] Specify returning the highest qualified index.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   */
  function binaryIndexBy(array, value, iteratee, retHighest) {
    value = iteratee(value);

    var low = 0,
        high = array ? array.length : 0,
        valIsNaN = value !== value,
        valIsUndef = typeof value == 'undefined';

    while (low < high) {
      var mid = internal_binaryIndexBy__floor((low + high) / 2),
          computed = iteratee(array[mid]),
          isReflexive = computed === computed;

      if (valIsNaN) {
        var setLow = isReflexive || retHighest;
      } else if (valIsUndef) {
        setLow = isReflexive && (retHighest || typeof computed != 'undefined');
      } else {
        setLow = retHighest ? (computed <= value) : (computed < value);
      }
      if (setLow) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return internal_binaryIndexBy__nativeMin(high, MAX_ARRAY_INDEX);
  }

  var internal_binaryIndexBy = binaryIndexBy;

  var internal_binaryIndex__MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1,
      HALF_MAX_ARRAY_LENGTH = internal_binaryIndex__MAX_ARRAY_LENGTH >>> 1;

  /**
   * Performs a binary search of `array` to determine the index at which `value`
   * should be inserted into `array` in order to maintain its sort order.
   *
   * @private
   * @param {Array} array The sorted array to inspect.
   * @param {*} value The value to evaluate.
   * @param {boolean} [retHighest] Specify returning the highest qualified index.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   */
  function binaryIndex(array, value, retHighest) {
    var low = 0,
        high = array ? array.length : low;

    if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
      while (low < high) {
        var mid = (low + high) >>> 1,
            computed = array[mid];

        if (retHighest ? (computed <= value) : (computed < value)) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return high;
    }
    return internal_binaryIndexBy(array, value, utility_identity, retHighest);
  }

  var internal_binaryIndex = binaryIndex;

  var array_indexOf__nativeMax = Math.max;

  /**
   * Gets the index at which the first occurrence of `value` is found in `array`
   * using `SameValueZero` for equality comparisons. If `fromIndex` is negative,
   * it is used as the offset from the end of `array`. If `array` is sorted
   * providing `true` for `fromIndex` performs a faster binary search.
   *
   * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
   * comparisons are like strict equality comparisons, e.g. `===`, except that
   * `NaN` matches `NaN`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {boolean|number} [fromIndex=0] The index to search from or `true`
   *  to perform a binary search on a sorted array.
   * @returns {number} Returns the index of the matched value, else `-1`.
   * @example
   *
   * _.indexOf([1, 2, 1, 2], 2);
   * // => 1
   *
   * // using `fromIndex`
   * _.indexOf([1, 2, 1, 2], 2, 2);
   * // => 3
   *
   * // performing a binary search
   * _.indexOf([1, 1, 2, 2], 2, true);
   * // => 2
   */
  function indexOf(array, value, fromIndex) {
    var length = array ? array.length : 0;
    if (!length) {
      return -1;
    }
    if (typeof fromIndex == 'number') {
      fromIndex = fromIndex < 0 ? array_indexOf__nativeMax(length + fromIndex, 0) : fromIndex;
    } else if (fromIndex) {
      var index = internal_binaryIndex(array, value),
          other = array[index];

      if (value === value ? (value === other) : (other !== other)) {
        return index;
      }
      return -1;
    }
    return internal_baseIndexOf(array, value, fromIndex || 0);
  }

  var array_indexOf = indexOf;

  function initial(array) {
    return array_dropRight(array, 1);
  }

  var array_initial = initial;

  function intersection() {
    var args = [],
        argsIndex = -1,
        argsLength = arguments.length,
        caches = [],
        indexOf = internal_baseIndexOf,
        isCommon = true;

    while (++argsIndex < argsLength) {
      var value = arguments[argsIndex];
      if (lang_isArray(value) || lang_isArguments(value)) {
        args.push(value);
        caches.push((isCommon && value.length >= 120) ? internal_createCache(argsIndex && value) : null);
      }
    }
    argsLength = args.length;
    var array = args[0],
        index = -1,
        length = array ? array.length : 0,
        result = [],
        seen = caches[0];

    outer:
    while (++index < length) {
      value = array[index];
      if ((seen ? internal_cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
        argsIndex = argsLength;
        while (--argsIndex) {
          var cache = caches[argsIndex];
          if ((cache ? internal_cacheIndexOf(cache, value) : indexOf(args[argsIndex], value, 0)) < 0) {
            continue outer;
          }
        }
        if (seen) {
          seen.push(value);
        }
        result.push(value);
      }
    }
    return result;
  }

  var array_intersection = intersection;

  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */
  function last(array) {
    var length = array ? array.length : 0;
    return length ? array[length - 1] : undefined;
  }

  var array_last = last;

  var array_lastIndexOf__nativeMax = Math.max,
      array_lastIndexOf__nativeMin = Math.min;

  /**
   * This method is like `_.indexOf` except that it iterates over elements of
   * `array` from right to left.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {boolean|number} [fromIndex=array.length-1] The index to search from
   *  or `true` to perform a binary search on a sorted array.
   * @returns {number} Returns the index of the matched value, else `-1`.
   * @example
   *
   * _.lastIndexOf([1, 2, 1, 2], 2);
   * // => 3
   *
   * // using `fromIndex`
   * _.lastIndexOf([1, 2, 1, 2], 2, 2);
   * // => 1
   *
   * // performing a binary search
   * _.lastIndexOf([1, 1, 2, 2], 2, true);
   * // => 3
   */
  function lastIndexOf(array, value, fromIndex) {
    var length = array ? array.length : 0;
    if (!length) {
      return -1;
    }
    var index = length;
    if (typeof fromIndex == 'number') {
      index = (fromIndex < 0 ? array_lastIndexOf__nativeMax(length + fromIndex, 0) : array_lastIndexOf__nativeMin(fromIndex || 0, length - 1)) + 1;
    } else if (fromIndex) {
      index = internal_binaryIndex(array, value, true) - 1;
      var other = array[index];
      if (value === value ? (value === other) : (other !== other)) {
        return index;
      }
      return -1;
    }
    if (value !== value) {
      return internal_indexOfNaN(array, index, true);
    }
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  var array_lastIndexOf = lastIndexOf;

  function zipObject(props, values) {
    var index = -1,
        length = props ? props.length : 0,
        result = {};

    if (length && !values && !lang_isArray(props[0])) {
      values = [];
    }
    while (++index < length) {
      var key = props[index];
      if (values) {
        result[key] = values[index];
      } else if (key) {
        result[key[0]] = key[1];
      }
    }
    return result;
  }

  var array_zipObject = zipObject;

  var array_object = array_zipObject;

  var array_pull__arrayProto = Array.prototype;

  /** Native method references. */
  var array_pull__splice = array_pull__arrayProto.splice;

  /**
   * Removes all provided values from `array` using `SameValueZero` for equality
   * comparisons.
   *
   * **Notes:**
   *  - Unlike `_.without`, this method mutates `array`
   *  - [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
   *    comparisons are like strict equality comparisons, e.g. `===`, except
   *    that `NaN` matches `NaN`
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to modify.
   * @param {...*} [values] The values to remove.
   * @returns {Array} Returns `array`.
   * @example
   *
   * var array = [1, 2, 3, 1, 2, 3];
   *
   * _.pull(array, 2, 3);
   * console.log(array);
   * // => [1, 1]
   */
  function pull() {
    var args = arguments,
        array = args[0];

    if (!(array && array.length)) {
      return array;
    }
    var index = 0,
        indexOf = internal_baseIndexOf,
        length = args.length;

    while (++index < length) {
      var fromIndex = 0,
          value = args[index];

      while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
        array_pull__splice.call(array, fromIndex, 1);
      }
    }
    return array;
  }

  var array_pull = pull;

  function baseAt(collection, props) {
    var index = -1,
        length = collection.length,
        isArr = internal_isLength(length),
        propsLength = props.length,
        result = Array(propsLength);

    while(++index < propsLength) {
      var key = props[index];
      if (isArr) {
        key = parseFloat(key);
        result[index] = internal_isIndex(key, length) ? collection[key] : undefined;
      } else {
        result[index] = collection[key];
      }
    }
    return result;
  }

  var internal_baseAt = baseAt;

  /**
   * The base implementation of `compareAscending` which compares values and
   * sorts them in ascending order without guaranteeing a stable sort.
   *
   * @private
   * @param {*} value The value to compare to `other`.
   * @param {*} other The value to compare to `value`.
   * @returns {number} Returns the sort order indicator for `value`.
   */
  function baseCompareAscending(value, other) {
    if (value !== other) {
      var valIsReflexive = value === value,
          othIsReflexive = other === other;

      if (value > other || !valIsReflexive || (typeof value == 'undefined' && othIsReflexive)) {
        return 1;
      }
      if (value < other || !othIsReflexive || (typeof other == 'undefined' && valIsReflexive)) {
        return -1;
      }
    }
    return 0;
  }

  var internal_baseCompareAscending = baseCompareAscending;

  var array_pullAt__arrayProto = Array.prototype;

  /** Native method references. */
  var array_pullAt__splice = array_pullAt__arrayProto.splice;

  /**
   * Removes elements from `array` corresponding to the given indexes and returns
   * an array of the removed elements. Indexes may be specified as an array of
   * indexes or as individual arguments.
   *
   * **Note:** Unlike `_.at`, this method mutates `array`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to modify.
   * @param {...(number|number[])} [indexes] The indexes of elements to remove,
   *  specified as individual indexes or arrays of indexes.
   * @returns {Array} Returns the new array of removed elements.
   * @example
   *
   * var array = [5, 10, 15, 20];
   * var evens = _.pullAt(array, 1, 3);
   *
   * console.log(array);
   * // => [5, 15]
   *
   * console.log(evens);
   * // => [10, 20]
   */
  var pullAt = function_restParam(function(array, indexes) {
    array || (array = []);
    indexes = internal_baseFlatten(indexes);

    var length = indexes.length,
        result = internal_baseAt(array, indexes);

    indexes.sort(internal_baseCompareAscending);
    while (length--) {
      var index = parseFloat(indexes[length]);
      if (index != previous && internal_isIndex(index)) {
        var previous = index;
        array_pullAt__splice.call(array, index, 1);
      }
    }
    return result;
  });

  var array_pullAt = pullAt;

  var array_remove__arrayProto = Array.prototype;

  /** Native method references. */
  var array_remove__splice = array_remove__arrayProto.splice;

  /**
   * Removes all elements from `array` that `predicate` returns truthy for
   * and returns an array of the removed elements. The predicate is bound to
   * `thisArg` and invoked with three arguments: (value, index, array).
   *
   * If a property name is provided for `predicate` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `predicate` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * **Note:** Unlike `_.filter`, this method mutates `array`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to modify.
   * @param {Function|Object|string} [predicate=_.identity] The function invoked
   *  per iteration.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Array} Returns the new array of removed elements.
   * @example
   *
   * var array = [1, 2, 3, 4];
   * var evens = _.remove(array, function(n) {
   *   return n % 2 == 0;
   * });
   *
   * console.log(array);
   * // => [1, 3]
   *
   * console.log(evens);
   * // => [2, 4]
   */
  function remove(array, predicate, thisArg) {
    var index = -1,
        length = array ? array.length : 0,
        result = [];

    predicate = internal_baseCallback(predicate, thisArg, 3);
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result.push(value);
        array_remove__splice.call(array, index--, 1);
        length--;
      }
    }
    return result;
  }

  var array_remove = remove;

  function rest(array) {
    return array_drop(array, 1);
  }

  var array_rest = rest;

  function slice(array, start, end) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (end && typeof end != 'number' && internal_isIterateeCall(array, start, end)) {
      start = 0;
      end = length;
    }
    return internal_baseSlice(array, start, end);
  }

  var array_slice = slice;

  function createSortedIndex(retHighest) {
    return function(array, value, iteratee, thisArg) {
      return iteratee == null
        ? internal_binaryIndex(array, value, retHighest)
        : internal_binaryIndexBy(array, value, internal_baseCallback(iteratee, thisArg, 1), retHighest);
    };
  }

  var internal_createSortedIndex = createSortedIndex;

  var sortedIndex = internal_createSortedIndex();

  var array_sortedIndex = sortedIndex;

  var sortedLastIndex = internal_createSortedIndex(true);

  var array_sortedLastIndex = sortedLastIndex;

  var tail = array_rest;

  function take(array, n, guard) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (guard ? internal_isIterateeCall(array, n, guard) : n == null) {
      n = 1;
    }
    return internal_baseSlice(array, 0, n < 0 ? 0 : n);
  }

  var array_take = take;

  function takeRight(array, n, guard) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (guard ? internal_isIterateeCall(array, n, guard) : n == null) {
      n = 1;
    }
    n = length - (+n || 0);
    return internal_baseSlice(array, n < 0 ? 0 : n);
  }

  var array_takeRight = takeRight;

  function takeRightWhile(array, predicate, thisArg) {
    return (array && array.length)
      ? internal_baseWhile(array, internal_baseCallback(predicate, thisArg, 3), false, true)
      : [];
  }

  var array_takeRightWhile = takeRightWhile;

  function takeWhile(array, predicate, thisArg) {
    return (array && array.length)
      ? internal_baseWhile(array, internal_baseCallback(predicate, thisArg, 3))
      : [];
  }

  var array_takeWhile = takeWhile;

  function baseUniq(array, iteratee) {
    var index = -1,
        indexOf = internal_baseIndexOf,
        length = array.length,
        isCommon = true,
        isLarge = isCommon && length >= 200,
        seen = isLarge ? internal_createCache() : null,
        result = [];

    if (seen) {
      indexOf = internal_cacheIndexOf;
      isCommon = false;
    } else {
      isLarge = false;
      seen = iteratee ? [] : result;
    }
    outer:
    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value, index, array) : value;

      if (isCommon && value === value) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      }
      else if (indexOf(seen, computed, 0) < 0) {
        if (iteratee || isLarge) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

  var internal_baseUniq = baseUniq;

  var union = function_restParam(function(arrays) {
    return internal_baseUniq(internal_baseFlatten(arrays, false, true));
  });

  var array_union = union;

  /**
   * An implementation of `_.uniq` optimized for sorted arrays without support
   * for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The function invoked per iteration.
   * @returns {Array} Returns the new duplicate-value-free array.
   */
  function sortedUniq(array, iteratee) {
    var seen,
        index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value, index, array) : value;

      if (!index || seen !== computed) {
        seen = computed;
        result[++resIndex] = value;
      }
    }
    return result;
  }

  var internal_sortedUniq = sortedUniq;

  function uniq(array, isSorted, iteratee, thisArg) {
    var length = array ? array.length : 0;
    if (!length) {
      return [];
    }
    if (isSorted != null && typeof isSorted != 'boolean') {
      thisArg = iteratee;
      iteratee = internal_isIterateeCall(array, isSorted, thisArg) ? null : isSorted;
      isSorted = false;
    }
    iteratee = iteratee == null ? iteratee : internal_baseCallback(iteratee, thisArg, 3);
    return (isSorted)
      ? internal_sortedUniq(array, iteratee)
      : internal_baseUniq(array, iteratee);
  }

  var array_uniq = uniq;

  var unique = array_uniq;

  /**
   * A specialized version of `_.map` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  var internal_arrayMap = arrayMap;

  /** Used as references for `-Infinity` and `Infinity`. */
  var internal_arrayMax__NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;

  /**
   * A specialized version of `_.max` for arrays without support for iteratees.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the maximum value.
   */
  function arrayMax(array) {
    var index = -1,
        length = array.length,
        result = internal_arrayMax__NEGATIVE_INFINITY;

    while (++index < length) {
      var value = array[index];
      if (value > result) {
        result = value;
      }
    }
    return result;
  }

  var internal_arrayMax = arrayMax;

  var getLength = internal_baseProperty('length');

  /**
   * This method is like `_.zip` except that it accepts an array of grouped
   * elements and creates an array regrouping the elements to their pre-`_.zip`
   * configuration.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array of grouped elements to process.
   * @returns {Array} Returns the new array of regrouped elements.
   * @example
   *
   * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
   * // => [['fred', 30, true], ['barney', 40, false]]
   *
   * _.unzip(zipped);
   * // => [['fred', 'barney'], [30, 40], [true, false]]
   */
  function unzip(array) {
    var index = -1,
        length = (array && array.length && internal_arrayMax(internal_arrayMap(array, getLength))) >>> 0,
        result = Array(length);

    while (++index < length) {
      result[index] = internal_arrayMap(array, internal_baseProperty(index));
    }
    return result;
  }

  var array_unzip = unzip;

  var without = function_restParam(function(array, values) {
    return (lang_isArray(array) || lang_isArguments(array))
      ? internal_baseDifference(array, values)
      : [];
  });

  var array_without = without;

  function xor() {
    var index = -1,
        length = arguments.length;

    while (++index < length) {
      var array = arguments[index];
      if (lang_isArray(array) || lang_isArguments(array)) {
        var result = result
          ? internal_baseDifference(result, array).concat(internal_baseDifference(array, result))
          : array;
      }
    }
    return result ? internal_baseUniq(result) : [];
  }

  var array_xor = xor;

  var zip = function_restParam(array_unzip);

  var array_zip = zip;

  var _array = {
    'chunk': array_chunk,
    'compact': array_compact,
    'difference': array_difference,
    'drop': array_drop,
    'dropRight': array_dropRight,
    'dropRightWhile': array_dropRightWhile,
    'dropWhile': array_dropWhile,
    'fill': array_fill,
    'findIndex': array_findIndex,
    'findLastIndex': array_findLastIndex,
    'first': array_first,
    'flatten': array_flatten,
    'flattenDeep': array_flattenDeep,
    'head': head,
    'indexOf': array_indexOf,
    'initial': array_initial,
    'intersection': array_intersection,
    'last': array_last,
    'lastIndexOf': array_lastIndexOf,
    'object': array_object,
    'pull': array_pull,
    'pullAt': array_pullAt,
    'remove': array_remove,
    'rest': array_rest,
    'slice': array_slice,
    'sortedIndex': array_sortedIndex,
    'sortedLastIndex': array_sortedLastIndex,
    'tail': tail,
    'take': array_take,
    'takeRight': array_takeRight,
    'takeRightWhile': array_takeRightWhile,
    'takeWhile': array_takeWhile,
    'union': array_union,
    'uniq': array_uniq,
    'unique': unique,
    'unzip': array_unzip,
    'without': array_without,
    'xor': array_xor,
    'zip': array_zip,
    'zipObject': array_zipObject
  };

  var baseCreate = (function() {
    function Object() {}
    return function(prototype) {
      if (lang_isObject(prototype)) {
        Object.prototype = prototype;
        var result = new Object;
        Object.prototype = null;
      }
      return result || internal_root.Object();
    };
  }());

  var internal_baseCreate = baseCreate;

  /**
   * The function whose prototype all chaining wrappers inherit from.
   *
   * @private
   */
  function baseLodash() {
    // No operation performed.
  }

  var internal_baseLodash = baseLodash;

  var internal_LazyWrapper__POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

  /**
   * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
   *
   * @private
   * @param {*} value The value to wrap.
   */
  function LazyWrapper(value) {
    this.__wrapped__ = value;
    this.__actions__ = null;
    this.__dir__ = 1;
    this.__dropCount__ = 0;
    this.__filtered__ = false;
    this.__iteratees__ = null;
    this.__takeCount__ = internal_LazyWrapper__POSITIVE_INFINITY;
    this.__views__ = null;
  }

  LazyWrapper.prototype = internal_baseCreate(internal_baseLodash.prototype);
  LazyWrapper.prototype.constructor = LazyWrapper;

  var internal_LazyWrapper = LazyWrapper;

  function LodashWrapper(value, chainAll, actions) {
    this.__wrapped__ = value;
    this.__actions__ = actions || [];
    this.__chain__ = !!chainAll;
  }

  LodashWrapper.prototype = internal_baseCreate(internal_baseLodash.prototype);
  LodashWrapper.prototype.constructor = LodashWrapper;

  var internal_LodashWrapper = LodashWrapper;

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function arrayCopy(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  var internal_arrayCopy = arrayCopy;

  function wrapperClone(wrapper) {
    return wrapper instanceof internal_LazyWrapper
      ? wrapper.clone()
      : new internal_LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, internal_arrayCopy(wrapper.__actions__));
  }

  var internal_wrapperClone = wrapperClone;

  var chain_lodash__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var chain_lodash__hasOwnProperty = chain_lodash__objectProto.hasOwnProperty;

  /**
   * Creates a `lodash` object which wraps `value` to enable implicit chaining.
   * Methods that operate on and return arrays, collections, and functions can
   * be chained together. Methods that return a boolean or single value will
   * automatically end the chain returning the unwrapped value. Explicit chaining
   * may be enabled using `_.chain`. The execution of chained methods is lazy,
   * that is, execution is deferred until `_#value` is implicitly or explicitly
   * called.
   *
   * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
   * fusion is an optimization that merges iteratees to avoid creating intermediate
   * arrays and reduce the number of iteratee executions.
   *
   * Chaining is supported in custom builds as long as the `_#value` method is
   * directly or indirectly included in the build.
   *
   * In addition to lodash methods, wrappers have `Array` and `String` methods.
   *
   * The wrapper `Array` methods are:
   * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
   * `splice`, and `unshift`
   *
   * The wrapper `String` methods are:
   * `replace` and `split`
   *
   * The wrapper methods that support shortcut fusion are:
   * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
   * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
   * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
   * and `where`
   *
   * The chainable wrapper methods are:
   * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
   * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
   * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defer`, `delay`,
   * `difference`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `fill`,
   * `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`, `forEach`,
   * `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `functions`,
   * `groupBy`, `indexBy`, `initial`, `intersection`, `invert`, `invoke`, `keys`,
   * `keysIn`, `map`, `mapValues`, `matches`, `matchesProperty`, `memoize`, `merge`,
   * `mixin`, `negate`, `noop`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
   * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
   * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `reverse`,
   * `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`, `sortByOrder`, `splice`,
   * `spread`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`,
   * `throttle`, `thru`, `times`, `toArray`, `toPlainObject`, `transform`,
   * `union`, `uniq`, `unshift`, `unzip`, `values`, `valuesIn`, `where`,
   * `without`, `wrap`, `xor`, `zip`, and `zipObject`
   *
   * The wrapper methods that are **not** chainable by default are:
   * `add`, `attempt`, `camelCase`, `capitalize`, `clone`, `cloneDeep`, `deburr`,
   * `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
   * `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`, `has`,
   * `identity`, `includes`, `indexOf`, `inRange`, `isArguments`, `isArray`,
   * `isBoolean`, `isDate`, `isElement`, `isEmpty`, `isEqual`, `isError`,
   * `isFinite`,`isFunction`, `isMatch`, `isNative`, `isNaN`, `isNull`, `isNumber`,
   * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`,
   * `isTypedArray`, `join`, `kebabCase`, `last`, `lastIndexOf`, `max`, `min`,
   * `noConflict`, `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`,
   * `random`, `reduce`, `reduceRight`, `repeat`, `result`, `runInContext`,
   * `shift`, `size`, `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`,
   * `startCase`, `startsWith`, `sum`, `template`, `trim`, `trimLeft`,
   * `trimRight`, `trunc`, `unescape`, `uniqueId`, `value`, and `words`
   *
   * The wrapper method `sample` will return a wrapped value when `n` is provided,
   * otherwise an unwrapped value is returned.
   *
   * @name _
   * @constructor
   * @category Chain
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // returns an unwrapped value
   * wrapped.reduce(function(sum, n) {
   *   return sum + n;
   * });
   * // => 6
   *
   * // returns a wrapped value
   * var squares = wrapped.map(function(n) {
   *   return n * n;
   * });
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */
  function lodash(value) {
    if (internal_isObjectLike(value) && !lang_isArray(value) && !(value instanceof internal_LazyWrapper)) {
      if (value instanceof internal_LodashWrapper) {
        return value;
      }
      if (chain_lodash__hasOwnProperty.call(value, '__chain__') && chain_lodash__hasOwnProperty.call(value, '__wrapped__')) {
        return internal_wrapperClone(value);
      }
    }
    return new internal_LodashWrapper(value);
  }

  // Ensure wrappers are instances of `baseLodash`.
  lodash.prototype = internal_baseLodash.prototype;

  var chain_lodash = lodash;

  function chain(value) {
    var result = chain_lodash(value);
    result.__chain__ = true;
    return result;
  }

  var chain_chain = chain;

  function wrapperCommit() {
    return new internal_LodashWrapper(this.value(), this.__chain__);
  }

  var chain_wrapperCommit = wrapperCommit;

  var commit = chain_wrapperCommit;

  function wrapperPlant(value) {
    var result,
        parent = this;

    while (parent instanceof internal_baseLodash) {
      var clone = internal_wrapperClone(parent);
      if (result) {
        previous.__wrapped__ = clone;
      } else {
        result = clone;
      }
      var previous = clone;
      parent = parent.__wrapped__;
    }
    previous.__wrapped__ = value;
    return result;
  }

  var chain_wrapperPlant = wrapperPlant;

  var plant = chain_wrapperPlant;

  /**
   * This method is like `_.tap` except that it returns the result of `interceptor`.
   *
   * @static
   * @memberOf _
   * @category Chain
   * @param {*} value The value to provide to `interceptor`.
   * @param {Function} interceptor The function to invoke.
   * @param {*} [thisArg] The `this` binding of `interceptor`.
   * @returns {*} Returns the result of `interceptor`.
   * @example
   *
   * _('  abc  ')
   *  .chain()
   *  .trim()
   *  .thru(function(value) {
   *    return [value];
   *  })
   *  .value();
   * // => ['abc']
   */
  function thru(value, interceptor, thisArg) {
    return interceptor.call(thisArg, value);
  }

  var chain_thru = thru;

  function wrapperReverse() {
    var value = this.__wrapped__;
    if (value instanceof internal_LazyWrapper) {
      if (this.__actions__.length) {
        value = new internal_LazyWrapper(this);
      }
      return new internal_LodashWrapper(value.reverse(), this.__chain__);
    }
    return this.thru(function(value) {
      return value.reverse();
    });
  }

  var chain_wrapperReverse = wrapperReverse;

  var reverse = chain_wrapperReverse;

  var internal_baseWrapperValue__arrayProto = Array.prototype;

  /** Native method references. */
  var internal_baseWrapperValue__push = internal_baseWrapperValue__arrayProto.push;

  /**
   * The base implementation of `wrapperValue` which returns the result of
   * performing a sequence of actions on the unwrapped `value`, where each
   * successive action is supplied the return value of the previous.
   *
   * @private
   * @param {*} value The unwrapped value.
   * @param {Array} actions Actions to peform to resolve the unwrapped value.
   * @returns {*} Returns the resolved value.
   */
  function baseWrapperValue(value, actions) {
    var result = value;
    if (result instanceof internal_LazyWrapper) {
      result = result.value();
    }
    var index = -1,
        length = actions.length;

    while (++index < length) {
      var args = [result],
          action = actions[index];

      internal_baseWrapperValue__push.apply(args, action.args);
      result = action.func.apply(action.thisArg, args);
    }
    return result;
  }

  var internal_baseWrapperValue = baseWrapperValue;

  function wrapperValue() {
    return internal_baseWrapperValue(this.__wrapped__, this.__actions__);
  }

  var chain_wrapperValue = wrapperValue;

  var run = chain_wrapperValue;

  /**
   * This method invokes `interceptor` and returns `value`. The interceptor is
   * bound to `thisArg` and invoked with one argument; (value). The purpose of
   * this method is to "tap into" a method chain in order to perform operations
   * on intermediate results within the chain.
   *
   * @static
   * @memberOf _
   * @category Chain
   * @param {*} value The value to provide to `interceptor`.
   * @param {Function} interceptor The function to invoke.
   * @param {*} [thisArg] The `this` binding of `interceptor`.
   * @returns {*} Returns `value`.
   * @example
   *
   * _([1, 2, 3])
   *  .tap(function(array) {
   *    array.pop();
   *  })
   *  .reverse()
   *  .value();
   * // => [2, 1]
   */
  function tap(value, interceptor, thisArg) {
    interceptor.call(thisArg, value);
    return value;
  }

  var chain_tap = tap;

  var toJSON = chain_wrapperValue;

  /**
   * Produces the result of coercing the unwrapped value to a string.
   *
   * @name toString
   * @memberOf _
   * @category Chain
   * @returns {string} Returns the coerced string value.
   * @example
   *
   * _([1, 2, 3]).toString();
   * // => '1,2,3'
   */
  function wrapperToString() {
    return (this.value() + '');
  }

  var chain_wrapperToString = wrapperToString;

  var toString = chain_wrapperToString;

  var chain_value = chain_wrapperValue;

  var chain_valueOf = chain_wrapperValue;

  function wrapperChain() {
    return chain_chain(this);
  }

  var chain_wrapperChain = wrapperChain;

  var _chain = {
    'chain': chain_chain,
    'commit': commit,
    'lodash': chain_lodash,
    'plant': plant,
    'reverse': reverse,
    'run': run,
    'tap': chain_tap,
    'thru': chain_thru,
    'toJSON': toJSON,
    'toString': toString,
    'value': chain_value,
    'valueOf': chain_valueOf,
    'wrapperChain': chain_wrapperChain
  };

  /**
   * A specialized version of `_.every` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }
    return true;
  }

  var internal_arrayEvery = arrayEvery;

  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var iterable = internal_toObject(object),
          props = keysFunc(object),
          length = props.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length)) {
        var key = props[index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var internal_createBaseFor = createBaseFor;

  var baseFor = internal_createBaseFor();

  var internal_baseFor = baseFor;

  function baseForOwn(object, iteratee) {
    return internal_baseFor(object, iteratee, object_keys);
  }

  var internal_baseForOwn = baseForOwn;

  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      var length = collection ? collection.length : 0;
      if (!internal_isLength(length)) {
        return eachFunc(collection, iteratee);
      }
      var index = fromRight ? length : -1,
          iterable = internal_toObject(collection);

      while ((fromRight ? index-- : ++index < length)) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  var internal_createBaseEach = createBaseEach;

  var baseEach = internal_createBaseEach(internal_baseForOwn);

  var internal_baseEach = baseEach;

  function baseEvery(collection, predicate) {
    var result = true;
    internal_baseEach(collection, function(value, index, collection) {
      result = !!predicate(value, index, collection);
      return result;
    });
    return result;
  }

  var internal_baseEvery = baseEvery;

  function every(collection, predicate, thisArg) {
    var func = lang_isArray(collection) ? internal_arrayEvery : internal_baseEvery;
    if (thisArg && internal_isIterateeCall(collection, predicate, thisArg)) {
      predicate = null;
    }
    if (typeof predicate != 'function' || typeof thisArg != 'undefined') {
      predicate = internal_baseCallback(predicate, thisArg, 3);
    }
    return func(collection, predicate);
  }

  var collection_every = every;

  var all = collection_every;

  /**
   * A specialized version of `_.some` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  var internal_arraySome = arraySome;

  function baseSome(collection, predicate) {
    var result;

    internal_baseEach(collection, function(value, index, collection) {
      result = predicate(value, index, collection);
      return !result;
    });
    return !!result;
  }

  var internal_baseSome = baseSome;

  function some(collection, predicate, thisArg) {
    var func = lang_isArray(collection) ? internal_arraySome : internal_baseSome;
    if (thisArg && internal_isIterateeCall(collection, predicate, thisArg)) {
      predicate = null;
    }
    if (typeof predicate != 'function' || typeof thisArg != 'undefined') {
      predicate = internal_baseCallback(predicate, thisArg, 3);
    }
    return func(collection, predicate);
  }

  var collection_some = some;

  var any = collection_some;

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * returned by `keysFunc`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    var index = -1,
        length = props.length,
        result = Array(length);

    while (++index < length) {
      result[index] = object[props[index]];
    }
    return result;
  }

  var internal_baseValues = baseValues;

  function values(object) {
    return internal_baseValues(object, object_keys(object));
  }

  var object_values = values;

  function toIterable(value) {
    if (value == null) {
      return [];
    }
    if (!internal_isLength(value.length)) {
      return object_values(value);
    }
    return lang_isObject(value) ? value : Object(value);
  }

  var internal_toIterable = toIterable;

  var at = function_restParam(function(collection, props) {
    var length = collection ? collection.length : 0;
    if (internal_isLength(length)) {
      collection = internal_toIterable(collection);
    }
    return internal_baseAt(collection, internal_baseFlatten(props));
  });

  var collection_at = at;

  function baseMap(collection, iteratee) {
    var result = [];
    internal_baseEach(collection, function(value, key, collection) {
      result.push(iteratee(value, key, collection));
    });
    return result;
  }

  var internal_baseMap = baseMap;

  function map(collection, iteratee, thisArg) {
    var func = lang_isArray(collection) ? internal_arrayMap : internal_baseMap;
    iteratee = internal_baseCallback(iteratee, thisArg, 3);
    return func(collection, iteratee);
  }

  var collection_map = map;

  var collect = collection_map;

  var lang_isString__stringTag = '[object String]';

  /** Used for native method references. */
  var lang_isString__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isString__objToString = lang_isString__objectProto.toString;

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' || (internal_isObjectLike(value) && lang_isString__objToString.call(value) == lang_isString__stringTag);
  }

  var lang_isString = isString;

  var collection_includes__nativeMax = Math.max;

  /**
   * Checks if `value` is in `collection` using `SameValueZero` for equality
   * comparisons. If `fromIndex` is negative, it is used as the offset from
   * the end of `collection`.
   *
   * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
   * comparisons are like strict equality comparisons, e.g. `===`, except that
   * `NaN` matches `NaN`.
   *
   * @static
   * @memberOf _
   * @alias contains, include
   * @category Collection
   * @param {Array|Object|string} collection The collection to search.
   * @param {*} target The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
   * @returns {boolean} Returns `true` if a matching element is found, else `false`.
   * @example
   *
   * _.includes([1, 2, 3], 1);
   * // => true
   *
   * _.includes([1, 2, 3], 1, 2);
   * // => false
   *
   * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
   * // => true
   *
   * _.includes('pebbles', 'eb');
   * // => true
   */
  function includes(collection, target, fromIndex, guard) {
    var length = collection ? collection.length : 0;
    if (!internal_isLength(length)) {
      collection = object_values(collection);
      length = collection.length;
    }
    if (!length) {
      return false;
    }
    if (typeof fromIndex != 'number' || (guard && internal_isIterateeCall(target, fromIndex, guard))) {
      fromIndex = 0;
    } else {
      fromIndex = fromIndex < 0 ? collection_includes__nativeMax(length + fromIndex, 0) : (fromIndex || 0);
    }
    return (typeof collection == 'string' || !lang_isArray(collection) && lang_isString(collection))
      ? (fromIndex < length && collection.indexOf(target, fromIndex) > -1)
      : (internal_baseIndexOf(collection, target, fromIndex) > -1);
  }

  var collection_includes = includes;

  var contains = collection_includes;

  function createAggregator(setter, initializer) {
    return function(collection, iteratee, thisArg) {
      var result = initializer ? initializer() : {};
      iteratee = internal_baseCallback(iteratee, thisArg, 3);

      if (lang_isArray(collection)) {
        var index = -1,
            length = collection.length;

        while (++index < length) {
          var value = collection[index];
          setter(result, value, iteratee(value, index, collection), collection);
        }
      } else {
        internal_baseEach(collection, function(value, key, collection) {
          setter(result, value, iteratee(value, key, collection), collection);
        });
      }
      return result;
    };
  }

  var internal_createAggregator = createAggregator;

  var collection_countBy__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var collection_countBy__hasOwnProperty = collection_countBy__objectProto.hasOwnProperty;

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `collection` through `iteratee`. The corresponding value
   * of each key is the number of times the key was returned by `iteratee`.
   * The `iteratee` is bound to `thisArg` and invoked with three arguments:
   * (value, index|key, collection).
   *
   * If a property name is provided for `iteratee` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `iteratee` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * @static
   * @memberOf _
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [iteratee=_.identity] The function invoked
   *  per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.countBy([4.3, 6.1, 6.4], function(n) {
   *   return Math.floor(n);
   * });
   * // => { '4': 1, '6': 2 }
   *
   * _.countBy([4.3, 6.1, 6.4], function(n) {
   *   return this.floor(n);
   * }, Math);
   * // => { '4': 1, '6': 2 }
   *
   * _.countBy(['one', 'two', 'three'], 'length');
   * // => { '3': 2, '5': 1 }
   */
  var countBy = internal_createAggregator(function(result, value, key) {
    collection_countBy__hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
  });

  var collection_countBy = countBy;

  /**
   * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
   * without support for callback shorthands and `this` binding, which iterates
   * over `collection` using the provided `eachFunc`.
   *
   * @private
   * @param {Array|Object|string} collection The collection to search.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @param {boolean} [retKey] Specify returning the key of the found element
   *  instead of the element itself.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */
  function baseFind(collection, predicate, eachFunc, retKey) {
    var result;
    eachFunc(collection, function(value, key, collection) {
      if (predicate(value, key, collection)) {
        result = retKey ? key : value;
        return false;
      }
    });
    return result;
  }

  var internal_baseFind = baseFind;

  function createFind(eachFunc, fromRight) {
    return function(collection, predicate, thisArg) {
      predicate = internal_baseCallback(predicate, thisArg, 3);
      if (lang_isArray(collection)) {
        var index = internal_baseFindIndex(collection, predicate, fromRight);
        return index > -1 ? collection[index] : undefined;
      }
      return internal_baseFind(collection, predicate, eachFunc);
    }
  }

  var internal_createFind = createFind;

  var find = internal_createFind(internal_baseEach);

  var collection_find = find;

  var detect = collection_find;

  /**
   * A specialized version of `_.forEach` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var internal_arrayEach = arrayEach;

  function createForEach(arrayFunc, eachFunc) {
    return function(collection, iteratee, thisArg) {
      return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && lang_isArray(collection))
        ? arrayFunc(collection, iteratee)
        : eachFunc(collection, internal_bindCallback(iteratee, thisArg, 3));
    };
  }

  var internal_createForEach = createForEach;

  var forEach = internal_createForEach(internal_arrayEach, internal_baseEach);

  var collection_forEach = forEach;

  var each = collection_forEach;

  /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEachRight(array, iteratee) {
    var length = array.length;

    while (length--) {
      if (iteratee(array[length], length, array) === false) {
        break;
      }
    }
    return array;
  }

  var internal_arrayEachRight = arrayEachRight;

  var baseForRight = internal_createBaseFor(true);

  var internal_baseForRight = baseForRight;

  function baseForOwnRight(object, iteratee) {
    return internal_baseForRight(object, iteratee, object_keys);
  }

  var internal_baseForOwnRight = baseForOwnRight;

  var baseEachRight = internal_createBaseEach(internal_baseForOwnRight, true);

  var internal_baseEachRight = baseEachRight;

  var forEachRight = internal_createForEach(internal_arrayEachRight, internal_baseEachRight);

  var collection_forEachRight = forEachRight;

  var eachRight = collection_forEachRight;

  /**
   * A specialized version of `_.filter` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[++resIndex] = value;
      }
    }
    return result;
  }

  var internal_arrayFilter = arrayFilter;

  function baseFilter(collection, predicate) {
    var result = [];
    internal_baseEach(collection, function(value, index, collection) {
      if (predicate(value, index, collection)) {
        result.push(value);
      }
    });
    return result;
  }

  var internal_baseFilter = baseFilter;

  function filter(collection, predicate, thisArg) {
    var func = lang_isArray(collection) ? internal_arrayFilter : internal_baseFilter;
    predicate = internal_baseCallback(predicate, thisArg, 3);
    return func(collection, predicate);
  }

  var collection_filter = filter;

  var findLast = internal_createFind(internal_baseEachRight, true);

  var collection_findLast = findLast;

  function findWhere(collection, source) {
    return collection_find(collection, internal_baseMatches(source));
  }

  var collection_findWhere = findWhere;

  /**
   * A specialized version of `_.reduce` for arrays without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initFromArray] Specify using the first element of `array`
   *  as the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initFromArray) {
    var index = -1,
        length = array.length;

    if (initFromArray && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  var internal_arrayReduce = arrayReduce;

  /**
   * The base implementation of `_.reduce` and `_.reduceRight` without support
   * for callback shorthands and `this` binding, which iterates over `collection`
   * using the provided `eachFunc`.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initFromCollection Specify using the first or last element
   *  of `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initFromCollection
        ? (initFromCollection = false, value)
        : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  var internal_baseReduce = baseReduce;

  function createReduce(arrayFunc, eachFunc) {
    return function(collection, iteratee, accumulator, thisArg) {
      var initFromArray = arguments.length < 3;
      return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && lang_isArray(collection))
        ? arrayFunc(collection, iteratee, accumulator, initFromArray)
        : internal_baseReduce(collection, internal_baseCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
    };
  }

  var internal_createReduce = createReduce;

  var reduce = internal_createReduce(internal_arrayReduce, internal_baseEach);

  var collection_reduce = reduce;

  var foldl = collection_reduce;

  /**
   * A specialized version of `_.reduceRight` for arrays without support for
   * callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initFromArray] Specify using the last element of `array`
   *  as the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
    var length = array.length;
    if (initFromArray && length) {
      accumulator = array[--length];
    }
    while (length--) {
      accumulator = iteratee(accumulator, array[length], length, array);
    }
    return accumulator;
  }

  var internal_arrayReduceRight = arrayReduceRight;

  var reduceRight =  internal_createReduce(internal_arrayReduceRight, internal_baseEachRight);

  var collection_reduceRight = reduceRight;

  var foldr = collection_reduceRight;

  var collection_groupBy__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var collection_groupBy__hasOwnProperty = collection_groupBy__objectProto.hasOwnProperty;

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `collection` through `iteratee`. The corresponding value
   * of each key is an array of the elements responsible for generating the key.
   * The `iteratee` is bound to `thisArg` and invoked with three arguments:
   * (value, index|key, collection).
   *
   * If a property name is provided for `iteratee` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `iteratee` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * @static
   * @memberOf _
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [iteratee=_.identity] The function invoked
   *  per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.groupBy([4.2, 6.1, 6.4], function(n) {
   *   return Math.floor(n);
   * });
   * // => { '4': [4.2], '6': [6.1, 6.4] }
   *
   * _.groupBy([4.2, 6.1, 6.4], function(n) {
   *   return this.floor(n);
   * }, Math);
   * // => { '4': [4.2], '6': [6.1, 6.4] }
   *
   * // using the `_.property` callback shorthand
   * _.groupBy(['one', 'two', 'three'], 'length');
   * // => { '3': ['one', 'two'], '5': ['three'] }
   */
  var groupBy = internal_createAggregator(function(result, value, key) {
    if (collection_groupBy__hasOwnProperty.call(result, key)) {
      result[key].push(value);
    } else {
      result[key] = [value];
    }
  });

  var collection_groupBy = groupBy;

  var include = collection_includes;

  var indexBy = internal_createAggregator(function(result, value, key) {
    result[key] = value;
  });

  var collection_indexBy = indexBy;

  var inject = collection_reduce;

  var invoke = function_restParam(function(collection, methodName, args) {
    var index = -1,
        isFunc = typeof methodName == 'function',
        length = collection ? collection.length : 0,
        result = internal_isLength(length) ? Array(length) : [];

    internal_baseEach(collection, function(value) {
      var func = isFunc ? methodName : (value != null && value[methodName]);
      result[++index] = func ? func.apply(value, args) : undefined;
    });
    return result;
  });

  var collection_invoke = invoke;

  /**
   * Used by `_.max` and `_.min` as the default callback for string values.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the code unit of the first character of the string.
   */
  function charAtCallback(string) {
    return string.charCodeAt(0);
  }

  var internal_charAtCallback = charAtCallback;

  var internal_extremumBy__NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
      internal_extremumBy__POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

  /**
   * Gets the extremum value of `collection` invoking `iteratee` for each value
   * in `collection` to generate the criterion by which the value is ranked.
   * The `iteratee` is invoked with three arguments: (value, index, collection).
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {boolean} [isMin] Specify returning the minimum, instead of the
   *  maximum, extremum value.
   * @returns {*} Returns the extremum value.
   */
  function extremumBy(collection, iteratee, isMin) {
    var exValue = isMin ? internal_extremumBy__POSITIVE_INFINITY : internal_extremumBy__NEGATIVE_INFINITY,
        computed = exValue,
        result = computed;

    internal_baseEach(collection, function(value, index, collection) {
      var current = iteratee(value, index, collection);
      if ((isMin ? (current < computed) : (current > computed)) ||
          (current === exValue && current === result)) {
        computed = current;
        result = value;
      }
    });
    return result;
  }

  var internal_extremumBy = extremumBy;

  function createExtremum(arrayFunc, isMin) {
    return function(collection, iteratee, thisArg) {
      if (thisArg && internal_isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = null;
      }
      var noIteratee = iteratee == null;

      iteratee = noIteratee ? iteratee : internal_baseCallback(iteratee, thisArg, 3);
      if (noIteratee) {
        var isArr = lang_isArray(collection);
        if (!isArr && lang_isString(collection)) {
          iteratee = internal_charAtCallback;
        } else {
          return arrayFunc(isArr ? collection : internal_toIterable(collection));
        }
      }
      return internal_extremumBy(collection, iteratee, isMin);
    };
  }

  var internal_createExtremum = createExtremum;

  var max = internal_createExtremum(internal_arrayMax);

  var math_max = max;

  /** Used as references for `-Infinity` and `Infinity`. */
  var internal_arrayMin__POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

  /**
   * A specialized version of `_.min` for arrays without support for iteratees.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the minimum value.
   */
  function arrayMin(array) {
    var index = -1,
        length = array.length,
        result = internal_arrayMin__POSITIVE_INFINITY;

    while (++index < length) {
      var value = array[index];
      if (value < result) {
        result = value;
      }
    }
    return result;
  }

  var internal_arrayMin = arrayMin;

  var min = internal_createExtremum(internal_arrayMin, true);

  var math_min = min;

  var partition = internal_createAggregator(function(result, value, key) {
    result[key ? 0 : 1].push(value);
  }, function() { return [[], []]; });

  var collection_partition = partition;

  function pluck(collection, key) {
    return collection_map(collection, internal_baseProperty(key));
  }

  var collection_pluck = pluck;

  function reject(collection, predicate, thisArg) {
    var func = lang_isArray(collection) ? internal_arrayFilter : internal_baseFilter;
    predicate = internal_baseCallback(predicate, thisArg, 3);
    return func(collection, function(value, index, collection) {
      return !predicate(value, index, collection);
    });
  }

  var collection_reject = reject;

  /** Native method references. */
  var internal_baseRandom__floor = Math.floor;

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_baseRandom__nativeRandom = Math.random;

  /**
   * The base implementation of `_.random` without support for argument juggling
   * and returning floating-point numbers.
   *
   * @private
   * @param {number} min The minimum possible value.
   * @param {number} max The maximum possible value.
   * @returns {number} Returns the random number.
   */
  function baseRandom(min, max) {
    return min + internal_baseRandom__floor(internal_baseRandom__nativeRandom() * (max - min + 1));
  }

  var internal_baseRandom = baseRandom;

  function shuffle(collection) {
    collection = internal_toIterable(collection);

    var index = -1,
        length = collection.length,
        result = Array(length);

    while (++index < length) {
      var rand = internal_baseRandom(0, index);
      if (index != rand) {
        result[index] = result[rand];
      }
      result[rand] = collection[index];
    }
    return result;
  }

  var collection_shuffle = shuffle;

  var collection_sample__nativeMin = Math.min;

  /**
   * Gets a random element or `n` random elements from a collection.
   *
   * @static
   * @memberOf _
   * @category Collection
   * @param {Array|Object|string} collection The collection to sample.
   * @param {number} [n] The number of elements to sample.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {*} Returns the random sample(s).
   * @example
   *
   * _.sample([1, 2, 3, 4]);
   * // => 2
   *
   * _.sample([1, 2, 3, 4], 2);
   * // => [3, 1]
   */
  function sample(collection, n, guard) {
    if (guard ? internal_isIterateeCall(collection, n, guard) : n == null) {
      collection = internal_toIterable(collection);
      var length = collection.length;
      return length > 0 ? collection[internal_baseRandom(0, length - 1)] : undefined;
    }
    var result = collection_shuffle(collection);
    result.length = collection_sample__nativeMin(n < 0 ? 0 : (+n || 0), result.length);
    return result;
  }

  var collection_sample = sample;

  var select = collection_filter;

  function size(collection) {
    var length = collection ? collection.length : 0;
    return internal_isLength(length) ? length : object_keys(collection).length;
  }

  var collection_size = size;

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define
   * the sort order of `array` and replaces criteria objects with their
   * corresponding values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }

  var internal_baseSortBy = baseSortBy;

  function compareAscending(object, other) {
    return internal_baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
  }

  var internal_compareAscending = compareAscending;

  function sortBy(collection, iteratee, thisArg) {
    if (collection == null) {
      return [];
    }
    var index = -1,
        length = collection.length,
        result = internal_isLength(length) ? Array(length) : [];

    if (thisArg && internal_isIterateeCall(collection, iteratee, thisArg)) {
      iteratee = null;
    }
    iteratee = internal_baseCallback(iteratee, thisArg, 3);
    internal_baseEach(collection, function(value, key, collection) {
      result[++index] = { 'criteria': iteratee(value, key, collection), 'index': index, 'value': value };
    });
    return internal_baseSortBy(result, internal_compareAscending);
  }

  var collection_sortBy = sortBy;

  function compareMultiple(object, other, orders) {
    var index = -1,
        objCriteria = object.criteria,
        othCriteria = other.criteria,
        length = objCriteria.length,
        ordersLength = orders.length;

    while (++index < length) {
      var result = internal_baseCompareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= ordersLength) {
          return result;
        }
        return result * (orders[index] ? 1 : -1);
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to provide the same value for
    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
    // for more details.
    //
    // This also ensures a stable sort in V8 and other engines.
    // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index;
  }

  var internal_compareMultiple = compareMultiple;

  function baseSortByOrder(collection, props, orders) {
    var index = -1,
        length = collection.length,
        result = internal_isLength(length) ? Array(length) : [];

    internal_baseEach(collection, function(value) {
      var length = props.length,
          criteria = Array(length);

      while (length--) {
        criteria[length] = value == null ? undefined : value[props[length]];
      }
      result[++index] = { 'criteria': criteria, 'index': index, 'value': value };
    });

    return internal_baseSortBy(result, function(object, other) {
      return internal_compareMultiple(object, other, orders);
    });
  }

  var internal_baseSortByOrder = baseSortByOrder;

  function sortByAll() {
    var args = arguments,
        collection = args[0],
        guard = args[3],
        index = 0,
        length = args.length - 1;

    if (collection == null) {
      return [];
    }
    var props = Array(length);
    while (index < length) {
      props[index] = args[++index];
    }
    if (guard && internal_isIterateeCall(args[1], args[2], guard)) {
      props = args[1];
    }
    return internal_baseSortByOrder(collection, internal_baseFlatten(props), []);
  }

  var collection_sortByAll = sortByAll;

  function sortByOrder(collection, props, orders, guard) {
    if (collection == null) {
      return [];
    }
    if (guard && internal_isIterateeCall(props, orders, guard)) {
      orders = null;
    }
    if (!lang_isArray(props)) {
      props = props == null ? [] : [props];
    }
    if (!lang_isArray(orders)) {
      orders = orders == null ? [] : [orders];
    }
    return internal_baseSortByOrder(collection, props, orders);
  }

  var collection_sortByOrder = sortByOrder;

  /**
   * A specialized version of `_.sum` for arrays without support for iteratees.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @returns {number} Returns the sum.
   */
  function arraySum(array) {
    var length = array.length,
        result = 0;

    while (length--) {
      result += +array[length] || 0;
    }
    return result;
  }

  var internal_arraySum = arraySum;

  function baseSum(collection, iteratee) {
    var result = 0;
    internal_baseEach(collection, function(value, index, collection) {
      result += +iteratee(value, index, collection) || 0;
    });
    return result;
  }

  var internal_baseSum = baseSum;

  function sum(collection, iteratee, thisArg) {
    if (thisArg && internal_isIterateeCall(collection, iteratee, thisArg)) {
      iteratee = null;
    }
    var noIteratee = iteratee == null;

    iteratee = noIteratee ? iteratee : internal_baseCallback(iteratee, thisArg, 3);
    return noIteratee
      ? internal_arraySum(lang_isArray(collection) ? collection : internal_toIterable(collection))
      : internal_baseSum(collection, iteratee);
  }

  var math_sum = sum;

  function where(collection, source) {
    return collection_filter(collection, internal_baseMatches(source));
  }

  var collection_where = where;

  var _collection = {
    'all': all,
    'any': any,
    'at': collection_at,
    'collect': collect,
    'contains': contains,
    'countBy': collection_countBy,
    'detect': detect,
    'each': each,
    'eachRight': eachRight,
    'every': collection_every,
    'filter': collection_filter,
    'find': collection_find,
    'findLast': collection_findLast,
    'findWhere': collection_findWhere,
    'foldl': foldl,
    'foldr': foldr,
    'forEach': collection_forEach,
    'forEachRight': collection_forEachRight,
    'groupBy': collection_groupBy,
    'include': include,
    'includes': collection_includes,
    'indexBy': collection_indexBy,
    'inject': inject,
    'invoke': collection_invoke,
    'map': collection_map,
    'max': math_max,
    'min': math_min,
    'partition': collection_partition,
    'pluck': collection_pluck,
    'reduce': collection_reduce,
    'reduceRight': collection_reduceRight,
    'reject': collection_reject,
    'sample': collection_sample,
    'select': select,
    'shuffle': collection_shuffle,
    'size': collection_size,
    'some': collection_some,
    'sortBy': collection_sortBy,
    'sortByAll': collection_sortByAll,
    'sortByOrder': collection_sortByOrder,
    'sum': math_sum,
    'where': collection_where
  };

  var nativeNow = lang_isNative(nativeNow = Date.now) && nativeNow;

  /**
   * Gets the number of milliseconds that have elapsed since the Unix epoch
   * (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @category Date
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => logs the number of milliseconds it took for the deferred function to be invoked
   */
  var now = nativeNow || function() {
    return new Date().getTime();
  };

  var date_now = now;

  var date = {
    'now': date_now
  };

  var function_after__FUNC_ERROR_TEXT = 'Expected a function';

  /* Native method references for those with the same name as other `lodash` methods. */
  var function_after__nativeIsFinite = internal_root.isFinite;

  /**
   * The opposite of `_.before`; this method creates a function that invokes
   * `func` once it is called `n` or more times.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {number} n The number of calls before `func` is invoked.
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * var saves = ['profile', 'settings'];
   *
   * var done = _.after(saves.length, function() {
   *   console.log('done saving!');
   * });
   *
   * _.forEach(saves, function(type) {
   *   asyncSave({ 'type': type, 'complete': done });
   * });
   * // => logs 'done saving!' after the two async saves have completed
   */
  function after(n, func) {
    if (typeof func != 'function') {
      if (typeof n == 'function') {
        var temp = n;
        n = func;
        func = temp;
      } else {
        throw new TypeError(function_after__FUNC_ERROR_TEXT);
      }
    }
    n = function_after__nativeIsFinite(n = +n) ? n : 0;
    return function() {
      if (--n < 1) {
        return func.apply(this, arguments);
      }
    };
  }

  var function_after = after;

  var internal_metaMap__WeakMap = lang_isNative(internal_metaMap__WeakMap = internal_root.WeakMap) && internal_metaMap__WeakMap;

  /** Used to store function metadata. */
  var metaMap = internal_metaMap__WeakMap && new internal_metaMap__WeakMap;

  var internal_metaMap = metaMap;

  var baseSetData = !internal_metaMap ? utility_identity : function(func, data) {
    internal_metaMap.set(func, data);
    return func;
  };

  var internal_baseSetData = baseSetData;

  function createCtorWrapper(Ctor) {
    return function() {
      var thisBinding = internal_baseCreate(Ctor.prototype),
          result = Ctor.apply(thisBinding, arguments);

      // Mimic the constructor's `return` behavior.
      // See https://es5.github.io/#x13.2.2 for more details.
      return lang_isObject(result) ? result : thisBinding;
    };
  }

  var internal_createCtorWrapper = createCtorWrapper;

  function createBindWrapper(func, thisArg) {
    var Ctor = internal_createCtorWrapper(func);

    function wrapper() {
      var fn = (this && this !== internal_root && this instanceof wrapper) ? Ctor : func;
      return fn.apply(thisArg, arguments);
    }
    return wrapper;
  }

  var internal_createBindWrapper = createBindWrapper;

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_composeArgs__nativeMax = Math.max;

  /**
   * Creates an array that is the composition of partially applied arguments,
   * placeholders, and provided arguments into a single array of arguments.
   *
   * @private
   * @param {Array|Object} args The provided arguments.
   * @param {Array} partials The arguments to prepend to those provided.
   * @param {Array} holders The `partials` placeholder indexes.
   * @returns {Array} Returns the new array of composed arguments.
   */
  function composeArgs(args, partials, holders) {
    var holdersLength = holders.length,
        argsIndex = -1,
        argsLength = internal_composeArgs__nativeMax(args.length - holdersLength, 0),
        leftIndex = -1,
        leftLength = partials.length,
        result = Array(argsLength + leftLength);

    while (++leftIndex < leftLength) {
      result[leftIndex] = partials[leftIndex];
    }
    while (++argsIndex < holdersLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
    while (argsLength--) {
      result[leftIndex++] = args[argsIndex++];
    }
    return result;
  }

  var internal_composeArgs = composeArgs;

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_composeArgsRight__nativeMax = Math.max;

  /**
   * This function is like `composeArgs` except that the arguments composition
   * is tailored for `_.partialRight`.
   *
   * @private
   * @param {Array|Object} args The provided arguments.
   * @param {Array} partials The arguments to append to those provided.
   * @param {Array} holders The `partials` placeholder indexes.
   * @returns {Array} Returns the new array of composed arguments.
   */
  function composeArgsRight(args, partials, holders) {
    var holdersIndex = -1,
        holdersLength = holders.length,
        argsIndex = -1,
        argsLength = internal_composeArgsRight__nativeMax(args.length - holdersLength, 0),
        rightIndex = -1,
        rightLength = partials.length,
        result = Array(argsLength + rightLength);

    while (++argsIndex < argsLength) {
      result[argsIndex] = args[argsIndex];
    }
    var pad = argsIndex;
    while (++rightIndex < rightLength) {
      result[pad + rightIndex] = partials[rightIndex];
    }
    while (++holdersIndex < holdersLength) {
      result[pad + holders[holdersIndex]] = args[argsIndex++];
    }
    return result;
  }

  var internal_composeArgsRight = composeArgsRight;

  /** Used to lookup unminified function names. */
  var realNames = {};

  var internal_realNames = realNames;

  var getFuncName = (function() {
    if (!_support.funcNames) {
      return utility_constant('');
    }
    if (utility_constant.name == 'constant') {
      return internal_baseProperty('name');
    }
    return function(func) {
      var result = func.name,
          array = internal_realNames[result],
          length = array ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;

        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    };
  }());

  var internal_getFuncName = getFuncName;

  function isLaziable(func) {
    var funcName = internal_getFuncName(func);
    return !!funcName && func === chain_lodash[funcName] && funcName in internal_LazyWrapper.prototype;
  }

  var internal_isLaziable = isLaziable;

  var internal_reorder__nativeMin = Math.min;

  /**
   * Reorder `array` according to the specified indexes where the element at
   * the first index is assigned as the first element, the element at
   * the second index is assigned as the second element, and so on.
   *
   * @private
   * @param {Array} array The array to reorder.
   * @param {Array} indexes The arranged array indexes.
   * @returns {Array} Returns `array`.
   */
  function reorder(array, indexes) {
    var arrLength = array.length,
        length = internal_reorder__nativeMin(indexes.length, arrLength),
        oldArray = internal_arrayCopy(array);

    while (length--) {
      var index = indexes[length];
      array[length] = internal_isIndex(index, arrLength) ? oldArray[index] : undefined;
    }
    return array;
  }

  var internal_reorder = reorder;

  /** Used as the internal argument placeholder. */
  var internal_replaceHolders__PLACEHOLDER = '__lodash_placeholder__';

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      if (array[index] === placeholder) {
        array[index] = internal_replaceHolders__PLACEHOLDER;
        result[++resIndex] = index;
      }
    }
    return result;
  }

  var internal_replaceHolders = replaceHolders;

  var HOT_COUNT = 150,
      HOT_SPAN = 16;

  /**
   * Sets metadata for `func`.
   *
   * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
   * period of time, it will trip its breaker and transition to an identity function
   * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
   * for more details.
   *
   * @private
   * @param {Function} func The function to associate metadata with.
   * @param {*} data The metadata.
   * @returns {Function} Returns `func`.
   */
  var setData = (function() {
    var count = 0,
        lastCalled = 0;

    return function(key, value) {
      var stamp = date_now(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return key;
        }
      } else {
        count = 0;
      }
      return internal_baseSetData(key, value);
    };
  }());

  var internal_setData = setData;

  var internal_createHybridWrapper__BIND_FLAG = 1,
      internal_createHybridWrapper__BIND_KEY_FLAG = 2,
      internal_createHybridWrapper__CURRY_BOUND_FLAG = 4,
      internal_createHybridWrapper__CURRY_FLAG = 8,
      internal_createHybridWrapper__CURRY_RIGHT_FLAG = 16,
      internal_createHybridWrapper__PARTIAL_FLAG = 32,
      internal_createHybridWrapper__PARTIAL_RIGHT_FLAG = 64,
      internal_createHybridWrapper__ARY_FLAG = 128;

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_createHybridWrapper__nativeMax = Math.max;

  /**
   * Creates a function that wraps `func` and invokes it with optional `this`
   * binding of, partial application, and currying.
   *
   * @private
   * @param {Function|string} func The function or method name to reference.
   * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to prepend to those provided to the new function.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
   * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
    var isAry = bitmask & internal_createHybridWrapper__ARY_FLAG,
        isBind = bitmask & internal_createHybridWrapper__BIND_FLAG,
        isBindKey = bitmask & internal_createHybridWrapper__BIND_KEY_FLAG,
        isCurry = bitmask & internal_createHybridWrapper__CURRY_FLAG,
        isCurryBound = bitmask & internal_createHybridWrapper__CURRY_BOUND_FLAG,
        isCurryRight = bitmask & internal_createHybridWrapper__CURRY_RIGHT_FLAG;

    var Ctor = !isBindKey && internal_createCtorWrapper(func),
        key = func;

    function wrapper() {
      // Avoid `arguments` object use disqualifying optimizations by
      // converting it to an array before providing it to other functions.
      var length = arguments.length,
          index = length,
          args = Array(length);

      while (index--) {
        args[index] = arguments[index];
      }
      if (partials) {
        args = internal_composeArgs(args, partials, holders);
      }
      if (partialsRight) {
        args = internal_composeArgsRight(args, partialsRight, holdersRight);
      }
      if (isCurry || isCurryRight) {
        var placeholder = wrapper.placeholder,
            argsHolders = internal_replaceHolders(args, placeholder);

        length -= argsHolders.length;
        if (length < arity) {
          var newArgPos = argPos ? internal_arrayCopy(argPos) : null,
              newArity = internal_createHybridWrapper__nativeMax(arity - length, 0),
              newsHolders = isCurry ? argsHolders : null,
              newHoldersRight = isCurry ? null : argsHolders,
              newPartials = isCurry ? args : null,
              newPartialsRight = isCurry ? null : args;

          bitmask |= (isCurry ? internal_createHybridWrapper__PARTIAL_FLAG : internal_createHybridWrapper__PARTIAL_RIGHT_FLAG);
          bitmask &= ~(isCurry ? internal_createHybridWrapper__PARTIAL_RIGHT_FLAG : internal_createHybridWrapper__PARTIAL_FLAG);

          if (!isCurryBound) {
            bitmask &= ~(internal_createHybridWrapper__BIND_FLAG | internal_createHybridWrapper__BIND_KEY_FLAG);
          }
          var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
              result = createHybridWrapper.apply(undefined, newData);

          if (internal_isLaziable(func)) {
            internal_setData(result, newData);
          }
          result.placeholder = placeholder;
          return result;
        }
      }
      var thisBinding = isBind ? thisArg : this;
      if (isBindKey) {
        func = thisBinding[key];
      }
      if (argPos) {
        args = internal_reorder(args, argPos);
      }
      if (isAry && ary < args.length) {
        args.length = ary;
      }
      var fn = (this && this !== internal_root && this instanceof wrapper) ? (Ctor || internal_createCtorWrapper(func)) : func;
      return fn.apply(thisBinding, args);
    }
    return wrapper;
  }

  var internal_createHybridWrapper = createHybridWrapper;

  var internal_createPartialWrapper__BIND_FLAG = 1;

  /**
   * Creates a function that wraps `func` and invokes it with the optional `this`
   * binding of `thisArg` and the `partials` prepended to those provided to
   * the wrapper.
   *
   * @private
   * @param {Function} func The function to partially apply arguments to.
   * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} partials The arguments to prepend to those provided to the new function.
   * @returns {Function} Returns the new bound function.
   */
  function createPartialWrapper(func, bitmask, thisArg, partials) {
    var isBind = bitmask & internal_createPartialWrapper__BIND_FLAG,
        Ctor = internal_createCtorWrapper(func);

    function wrapper() {
      // Avoid `arguments` object use disqualifying optimizations by
      // converting it to an array before providing it `func`.
      var argsIndex = -1,
          argsLength = arguments.length,
          leftIndex = -1,
          leftLength = partials.length,
          args = Array(argsLength + leftLength);

      while (++leftIndex < leftLength) {
        args[leftIndex] = partials[leftIndex];
      }
      while (argsLength--) {
        args[leftIndex++] = arguments[++argsIndex];
      }
      var fn = (this && this !== internal_root && this instanceof wrapper) ? Ctor : func;
      return fn.apply(isBind ? thisArg : this, args);
    }
    return wrapper;
  }

  var internal_createPartialWrapper = createPartialWrapper;

  /**
   * A no-operation function which returns `undefined` regardless of the
   * arguments it receives.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @example
   *
   * var object = { 'user': 'fred' };
   *
   * _.noop(object) === undefined;
   * // => true
   */
  function noop() {
    // No operation performed.
  }

  var utility_noop = noop;

  var getData = !internal_metaMap ? utility_noop : function(func) {
    return internal_metaMap.get(func);
  };

  var internal_getData = getData;

  var internal_mergeData__BIND_FLAG = 1,
      internal_mergeData__CURRY_BOUND_FLAG = 4,
      internal_mergeData__CURRY_FLAG = 8,
      internal_mergeData__ARY_FLAG = 128,
      internal_mergeData__REARG_FLAG = 256;

  /** Used as the internal argument placeholder. */
  var internal_mergeData__PLACEHOLDER = '__lodash_placeholder__';

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_mergeData__nativeMin = Math.min;

  /**
   * Merges the function metadata of `source` into `data`.
   *
   * Merging metadata reduces the number of wrappers required to invoke a function.
   * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
   * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
   * augment function arguments, making the order in which they are executed important,
   * preventing the merging of metadata. However, we make an exception for a safe
   * common case where curried functions have `_.ary` and or `_.rearg` applied.
   *
   * @private
   * @param {Array} data The destination metadata.
   * @param {Array} source The source metadata.
   * @returns {Array} Returns `data`.
   */
  function mergeData(data, source) {
    var bitmask = data[1],
        srcBitmask = source[1],
        newBitmask = bitmask | srcBitmask,
        isCommon = newBitmask < internal_mergeData__ARY_FLAG;

    var isCombo =
      (srcBitmask == internal_mergeData__ARY_FLAG && bitmask == internal_mergeData__CURRY_FLAG) ||
      (srcBitmask == internal_mergeData__ARY_FLAG && bitmask == internal_mergeData__REARG_FLAG && data[7].length <= source[8]) ||
      (srcBitmask == (internal_mergeData__ARY_FLAG | internal_mergeData__REARG_FLAG) && bitmask == internal_mergeData__CURRY_FLAG);

    // Exit early if metadata can't be merged.
    if (!(isCommon || isCombo)) {
      return data;
    }
    // Use source `thisArg` if available.
    if (srcBitmask & internal_mergeData__BIND_FLAG) {
      data[2] = source[2];
      // Set when currying a bound function.
      newBitmask |= (bitmask & internal_mergeData__BIND_FLAG) ? 0 : internal_mergeData__CURRY_BOUND_FLAG;
    }
    // Compose partial arguments.
    var value = source[3];
    if (value) {
      var partials = data[3];
      data[3] = partials ? internal_composeArgs(partials, value, source[4]) : internal_arrayCopy(value);
      data[4] = partials ? internal_replaceHolders(data[3], internal_mergeData__PLACEHOLDER) : internal_arrayCopy(source[4]);
    }
    // Compose partial right arguments.
    value = source[5];
    if (value) {
      partials = data[5];
      data[5] = partials ? internal_composeArgsRight(partials, value, source[6]) : internal_arrayCopy(value);
      data[6] = partials ? internal_replaceHolders(data[5], internal_mergeData__PLACEHOLDER) : internal_arrayCopy(source[6]);
    }
    // Use source `argPos` if available.
    value = source[7];
    if (value) {
      data[7] = internal_arrayCopy(value);
    }
    // Use source `ary` if it's smaller.
    if (srcBitmask & internal_mergeData__ARY_FLAG) {
      data[8] = data[8] == null ? source[8] : internal_mergeData__nativeMin(data[8], source[8]);
    }
    // Use source `arity` if one is not provided.
    if (data[9] == null) {
      data[9] = source[9];
    }
    // Use source `func` and merge bitmasks.
    data[0] = source[0];
    data[1] = newBitmask;

    return data;
  }

  var internal_mergeData = mergeData;

  var internal_createWrapper__BIND_FLAG = 1,
      internal_createWrapper__BIND_KEY_FLAG = 2,
      internal_createWrapper__PARTIAL_FLAG = 32,
      internal_createWrapper__PARTIAL_RIGHT_FLAG = 64;

  /** Used as the `TypeError` message for "Functions" methods. */
  var internal_createWrapper__FUNC_ERROR_TEXT = 'Expected a function';

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_createWrapper__nativeMax = Math.max;

  /**
   * Creates a function that either curries or invokes `func` with optional
   * `this` binding and partially applied arguments.
   *
   * @private
   * @param {Function|string} func The function or method name to reference.
   * @param {number} bitmask The bitmask of flags.
   *  The bitmask may be composed of the following flags:
   *     1 - `_.bind`
   *     2 - `_.bindKey`
   *     4 - `_.curry` or `_.curryRight` of a bound function
   *     8 - `_.curry`
   *    16 - `_.curryRight`
   *    32 - `_.partial`
   *    64 - `_.partialRight`
   *   128 - `_.rearg`
   *   256 - `_.ary`
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to be partially applied.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
    var isBindKey = bitmask & internal_createWrapper__BIND_KEY_FLAG;
    if (!isBindKey && typeof func != 'function') {
      throw new TypeError(internal_createWrapper__FUNC_ERROR_TEXT);
    }
    var length = partials ? partials.length : 0;
    if (!length) {
      bitmask &= ~(internal_createWrapper__PARTIAL_FLAG | internal_createWrapper__PARTIAL_RIGHT_FLAG);
      partials = holders = null;
    }
    length -= (holders ? holders.length : 0);
    if (bitmask & internal_createWrapper__PARTIAL_RIGHT_FLAG) {
      var partialsRight = partials,
          holdersRight = holders;

      partials = holders = null;
    }
    var data = isBindKey ? null : internal_getData(func),
        newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

    if (data) {
      internal_mergeData(newData, data);
      bitmask = newData[1];
      arity = newData[9];
    }
    newData[9] = arity == null
      ? (isBindKey ? 0 : func.length)
      : (internal_createWrapper__nativeMax(arity - length, 0) || 0);

    if (bitmask == internal_createWrapper__BIND_FLAG) {
      var result = internal_createBindWrapper(newData[0], newData[2]);
    } else if ((bitmask == internal_createWrapper__PARTIAL_FLAG || bitmask == (internal_createWrapper__BIND_FLAG | internal_createWrapper__PARTIAL_FLAG)) && !newData[4].length) {
      result = internal_createPartialWrapper.apply(undefined, newData);
    } else {
      result = internal_createHybridWrapper.apply(undefined, newData);
    }
    var setter = data ? internal_baseSetData : internal_setData;
    return setter(result, newData);
  }

  var internal_createWrapper = createWrapper;

  var function_ary__ARY_FLAG = 128;

  /* Native method references for those with the same name as other `lodash` methods. */
  var function_ary__nativeMax = Math.max;

  /**
   * Creates a function that accepts up to `n` arguments ignoring any
   * additional arguments.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to cap arguments for.
   * @param {number} [n=func.length] The arity cap.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Function} Returns the new function.
   * @example
   *
   * _.map(['6', '8', '10'], _.ary(parseInt, 1));
   * // => [6, 8, 10]
   */
  function ary(func, n, guard) {
    if (guard && internal_isIterateeCall(func, n, guard)) {
      n = null;
    }
    n = (func && n == null) ? func.length : function_ary__nativeMax(+n || 0, 0);
    return internal_createWrapper(func, function_ary__ARY_FLAG, null, null, null, null, n);
  }

  var function_ary = ary;

  var internal_createFlow__FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a `_.flow` or `_.flowRight` function.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new flow function.
   */
  function createFlow(fromRight) {
    return function() {
      var length = arguments.length;
      if (!length) {
        return function() { return arguments[0]; };
      }
      var wrapper,
          index = fromRight ? length : -1,
          leftIndex = 0,
          funcs = Array(length);

      while ((fromRight ? index-- : ++index < length)) {
        var func = funcs[leftIndex++] = arguments[index];
        if (typeof func != 'function') {
          throw new TypeError(internal_createFlow__FUNC_ERROR_TEXT);
        }
        var funcName = wrapper ? '' : internal_getFuncName(func);
        wrapper = funcName == 'wrapper' ? new internal_LodashWrapper([]) : wrapper;
      }
      index = wrapper ? -1 : length;
      while (++index < length) {
        func = funcs[index];
        funcName = internal_getFuncName(func);

        var data = funcName == 'wrapper' ? internal_getData(func) : null;
        if (data && internal_isLaziable(data[0])) {
          wrapper = wrapper[internal_getFuncName(data[0])].apply(wrapper, data[3]);
        } else {
          wrapper = (func.length == 1 && internal_isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
        }
      }
      return function() {
        var args = arguments;
        if (wrapper && args.length == 1 && lang_isArray(args[0])) {
          return wrapper.plant(args[0]).value();
        }
        var index = 0,
            result = funcs[index].apply(this, args);

        while (++index < length) {
          result = funcs[index].call(this, result);
        }
        return result;
      };
    };
  }

  var internal_createFlow = createFlow;

  var flowRight = internal_createFlow(true);

  var function_flowRight = flowRight;

  var backflow = function_flowRight;

  /** Used as the `TypeError` message for "Functions" methods. */
  var function_before__FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that invokes `func`, with the `this` binding and arguments
   * of the created function, while it is called less than `n` times. Subsequent
   * calls to the created function return the result of the last `func` invocation.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {number} n The number of calls at which `func` is no longer invoked.
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new restricted function.
   * @example
   *
   * jQuery('#add').on('click', _.before(5, addContactToList));
   * // => allows adding up to 4 contacts to the list
   */
  function before(n, func) {
    var result;
    if (typeof func != 'function') {
      if (typeof n == 'function') {
        var temp = n;
        n = func;
        func = temp;
      } else {
        throw new TypeError(function_before__FUNC_ERROR_TEXT);
      }
    }
    return function() {
      if (--n > 0) {
        result = func.apply(this, arguments);
      } else {
        func = null;
      }
      return result;
    };
  }

  var function_before = before;

  var function_bind__BIND_FLAG = 1,
      function_bind__PARTIAL_FLAG = 32;

  /**
   * Creates a function that invokes `func` with the `this` binding of `thisArg`
   * and prepends any additional `_.bind` arguments to those provided to the
   * bound function.
   *
   * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
   * may be used as a placeholder for partially applied arguments.
   *
   * **Note:** Unlike native `Function#bind` this method does not set the `length`
   * property of bound functions.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to bind.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {...*} [partials] The arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var greet = function(greeting, punctuation) {
   *   return greeting + ' ' + this.user + punctuation;
   * };
   *
   * var object = { 'user': 'fred' };
   *
   * var bound = _.bind(greet, object, 'hi');
   * bound('!');
   * // => 'hi fred!'
   *
   * // using placeholders
   * var bound = _.bind(greet, object, _, '!');
   * bound('hi');
   * // => 'hi fred!'
   */
  var bind = function_restParam(function(func, thisArg, partials) {
    var bitmask = function_bind__BIND_FLAG;
    if (partials.length) {
      var holders = internal_replaceHolders(partials, bind.placeholder);
      bitmask |= function_bind__PARTIAL_FLAG;
    }
    return internal_createWrapper(func, bitmask, thisArg, partials, holders);
  });

  // Assign default placeholders.
  bind.placeholder = {};

  var function_bind = bind;

  /**
   * The base implementation of `_.isFunction` without support for environments
   * with incorrect `typeof` results.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   */
  function baseIsFunction(value) {
    // Avoid a Chakra JIT bug in compatibility modes of IE 11.
    // See https://github.com/jashkenas/underscore/issues/1621 for more details.
    return typeof value == 'function' || false;
  }

  var internal_baseIsFunction = baseIsFunction;

  var lang_isFunction__funcTag = '[object Function]';

  /** Used for native method references. */
  var lang_isFunction__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isFunction__objToString = lang_isFunction__objectProto.toString;

  /** Native method references. */
  var lang_isFunction__Uint8Array = lang_isNative(lang_isFunction__Uint8Array = internal_root.Uint8Array) && lang_isFunction__Uint8Array;

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  var isFunction = !(internal_baseIsFunction(/x/) || (lang_isFunction__Uint8Array && !internal_baseIsFunction(lang_isFunction__Uint8Array))) ? internal_baseIsFunction : function(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in older versions of Chrome and Safari which return 'function' for regexes
    // and Safari 8 equivalents which return 'object' for typed array constructors.
    return lang_isFunction__objToString.call(value) == lang_isFunction__funcTag;
  };

  var lang_isFunction = isFunction;

  function baseFunctions(object, props) {
    var index = -1,
        length = props.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var key = props[index];
      if (lang_isFunction(object[key])) {
        result[++resIndex] = key;
      }
    }
    return result;
  }

  var internal_baseFunctions = baseFunctions;

  function functions(object) {
    return internal_baseFunctions(object, object_keysIn(object));
  }

  var object_functions = functions;

  var function_bindAll__BIND_FLAG = 1;

  /**
   * Binds methods of an object to the object itself, overwriting the existing
   * method. Method names may be specified as individual arguments or as arrays
   * of method names. If no method names are provided all enumerable function
   * properties, own and inherited, of `object` are bound.
   *
   * **Note:** This method does not set the `length` property of bound functions.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Object} object The object to bind and assign the bound methods to.
   * @param {...(string|string[])} [methodNames] The object method names to bind,
   *  specified as individual method names or arrays of method names.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var view = {
   *   'label': 'docs',
   *   'onClick': function() {
   *     console.log('clicked ' + this.label);
   *   }
   * };
   *
   * _.bindAll(view);
   * jQuery('#docs').on('click', view.onClick);
   * // => logs 'clicked docs' when the element is clicked
   */
  var bindAll = function_restParam(function(object, methodNames) {
    methodNames = methodNames.length ? internal_baseFlatten(methodNames) : object_functions(object);

    var index = -1,
        length = methodNames.length;

    while (++index < length) {
      var key = methodNames[index];
      object[key] = internal_createWrapper(object[key], function_bindAll__BIND_FLAG, object);
    }
    return object;
  });

  var function_bindAll = bindAll;

  var function_bindKey__BIND_FLAG = 1,
      function_bindKey__BIND_KEY_FLAG = 2,
      function_bindKey__PARTIAL_FLAG = 32;

  /**
   * Creates a function that invokes the method at `object[key]` and prepends
   * any additional `_.bindKey` arguments to those provided to the bound function.
   *
   * This method differs from `_.bind` by allowing bound functions to reference
   * methods that may be redefined or don't yet exist.
   * See [Peter Michaux's article](http://michaux.ca/articles/lazy-function-definition-pattern)
   * for more details.
   *
   * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
   * builds, may be used as a placeholder for partially applied arguments.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Object} object The object the method belongs to.
   * @param {string} key The key of the method.
   * @param {...*} [partials] The arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var object = {
   *   'user': 'fred',
   *   'greet': function(greeting, punctuation) {
   *     return greeting + ' ' + this.user + punctuation;
   *   }
   * };
   *
   * var bound = _.bindKey(object, 'greet', 'hi');
   * bound('!');
   * // => 'hi fred!'
   *
   * object.greet = function(greeting, punctuation) {
   *   return greeting + 'ya ' + this.user + punctuation;
   * };
   *
   * bound('!');
   * // => 'hiya fred!'
   *
   * // using placeholders
   * var bound = _.bindKey(object, 'greet', _, '!');
   * bound('hi');
   * // => 'hiya fred!'
   */
  var bindKey = function_restParam(function(object, key, partials) {
    var bitmask = function_bindKey__BIND_FLAG | function_bindKey__BIND_KEY_FLAG;
    if (partials.length) {
      var holders = internal_replaceHolders(partials, bindKey.placeholder);
      bitmask |= function_bindKey__PARTIAL_FLAG;
    }
    return internal_createWrapper(key, bitmask, object, partials, holders);
  });

  // Assign default placeholders.
  bindKey.placeholder = {};

  var function_bindKey = bindKey;

  var compose = function_flowRight;

  function createCurry(flag) {
    function curryFunc(func, arity, guard) {
      if (guard && internal_isIterateeCall(func, arity, guard)) {
        arity = null;
      }
      var result = internal_createWrapper(func, flag, null, null, null, null, null, arity);
      result.placeholder = curryFunc.placeholder;
      return result;
    }
    return curryFunc;
  }

  var internal_createCurry = createCurry;

  var function_curry__CURRY_FLAG = 8;

  /**
   * Creates a function that accepts one or more arguments of `func` that when
   * called either invokes `func` returning its result, if all `func` arguments
   * have been provided, or returns a function that accepts one or more of the
   * remaining `func` arguments, and so on. The arity of `func` may be specified
   * if `func.length` is not sufficient.
   *
   * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
   * may be used as a placeholder for provided arguments.
   *
   * **Note:** This method does not set the `length` property of curried functions.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to curry.
   * @param {number} [arity=func.length] The arity of `func`.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Function} Returns the new curried function.
   * @example
   *
   * var abc = function(a, b, c) {
   *   return [a, b, c];
   * };
   *
   * var curried = _.curry(abc);
   *
   * curried(1)(2)(3);
   * // => [1, 2, 3]
   *
   * curried(1, 2)(3);
   * // => [1, 2, 3]
   *
   * curried(1, 2, 3);
   * // => [1, 2, 3]
   *
   * // using placeholders
   * curried(1)(_, 3)(2);
   * // => [1, 2, 3]
   */
  var curry = internal_createCurry(function_curry__CURRY_FLAG);

  // Assign default placeholders.
  curry.placeholder = {};

  var function_curry = curry;

  var function_curryRight__CURRY_RIGHT_FLAG = 16;

  /**
   * This method is like `_.curry` except that arguments are applied to `func`
   * in the manner of `_.partialRight` instead of `_.partial`.
   *
   * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
   * builds, may be used as a placeholder for provided arguments.
   *
   * **Note:** This method does not set the `length` property of curried functions.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to curry.
   * @param {number} [arity=func.length] The arity of `func`.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Function} Returns the new curried function.
   * @example
   *
   * var abc = function(a, b, c) {
   *   return [a, b, c];
   * };
   *
   * var curried = _.curryRight(abc);
   *
   * curried(3)(2)(1);
   * // => [1, 2, 3]
   *
   * curried(2, 3)(1);
   * // => [1, 2, 3]
   *
   * curried(1, 2, 3);
   * // => [1, 2, 3]
   *
   * // using placeholders
   * curried(3)(1, _)(2);
   * // => [1, 2, 3]
   */
  var curryRight = internal_createCurry(function_curryRight__CURRY_RIGHT_FLAG);

  // Assign default placeholders.
  curryRight.placeholder = {};

  var function_curryRight = curryRight;

  var function_debounce__FUNC_ERROR_TEXT = 'Expected a function';

  /* Native method references for those with the same name as other `lodash` methods. */
  var function_debounce__nativeMax = Math.max;

  /**
   * Creates a function that delays invoking `func` until after `wait` milliseconds
   * have elapsed since the last time it was invoked. The created function comes
   * with a `cancel` method to cancel delayed invocations. Provide an options
   * object to indicate that `func` should be invoked on the leading and/or
   * trailing edge of the `wait` timeout. Subsequent calls to the debounced
   * function return the result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
   * on the trailing edge of the timeout only if the the debounced function is
   * invoked more than once during the `wait` timeout.
   *
   * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.leading=false] Specify invoking on the leading
   *  edge of the timeout.
   * @param {number} [options.maxWait] The maximum time `func` is allowed to be
   *  delayed before it is invoked.
   * @param {boolean} [options.trailing=true] Specify invoking on the trailing
   *  edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // avoid costly calculations while the window size is in flux
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
   * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // ensure `batchLog` is invoked once after 1 second of debounced calls
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', _.debounce(batchLog, 250, {
   *   'maxWait': 1000
   * }));
   *
   * // cancel a debounced call
   * var todoChanges = _.debounce(batchLog, 1000);
   * Object.observe(models.todo, todoChanges);
   *
   * Object.observe(models, function(changes) {
   *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
   *     todoChanges.cancel();
   *   }
   * }, ['delete']);
   *
   * // ...at some point `models.todo` is changed
   * models.todo.completed = true;
   *
   * // ...before 1 second has passed `models.todo` is deleted
   * // which cancels the debounced `todoChanges` call
   * delete models.todo;
   */
  function debounce(func, wait, options) {
    var args,
        maxTimeoutId,
        result,
        stamp,
        thisArg,
        timeoutId,
        trailingCall,
        lastCalled = 0,
        maxWait = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(function_debounce__FUNC_ERROR_TEXT);
    }
    wait = wait < 0 ? 0 : (+wait || 0);
    if (options === true) {
      var leading = true;
      trailing = false;
    } else if (lang_isObject(options)) {
      leading = options.leading;
      maxWait = 'maxWait' in options && function_debounce__nativeMax(+options.maxWait || 0, wait);
      trailing = 'trailing' in options ? options.trailing : trailing;
    }

    function cancel() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (maxTimeoutId) {
        clearTimeout(maxTimeoutId);
      }
      maxTimeoutId = timeoutId = trailingCall = undefined;
    }

    function delayed() {
      var remaining = wait - (date_now() - stamp);
      if (remaining <= 0 || remaining > wait) {
        if (maxTimeoutId) {
          clearTimeout(maxTimeoutId);
        }
        var isCalled = trailingCall;
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (isCalled) {
          lastCalled = date_now();
          result = func.apply(thisArg, args);
          if (!timeoutId && !maxTimeoutId) {
            args = thisArg = null;
          }
        }
      } else {
        timeoutId = setTimeout(delayed, remaining);
      }
    }

    function maxDelayed() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      maxTimeoutId = timeoutId = trailingCall = undefined;
      if (trailing || (maxWait !== wait)) {
        lastCalled = date_now();
        result = func.apply(thisArg, args);
        if (!timeoutId && !maxTimeoutId) {
          args = thisArg = null;
        }
      }
    }

    function debounced() {
      args = arguments;
      stamp = date_now();
      thisArg = this;
      trailingCall = trailing && (timeoutId || !leading);

      if (maxWait === false) {
        var leadingCall = leading && !timeoutId;
      } else {
        if (!maxTimeoutId && !leading) {
          lastCalled = stamp;
        }
        var remaining = maxWait - (stamp - lastCalled),
            isCalled = remaining <= 0 || remaining > maxWait;

        if (isCalled) {
          if (maxTimeoutId) {
            maxTimeoutId = clearTimeout(maxTimeoutId);
          }
          lastCalled = stamp;
          result = func.apply(thisArg, args);
        }
        else if (!maxTimeoutId) {
          maxTimeoutId = setTimeout(maxDelayed, remaining);
        }
      }
      if (isCalled && timeoutId) {
        timeoutId = clearTimeout(timeoutId);
      }
      else if (!timeoutId && wait !== maxWait) {
        timeoutId = setTimeout(delayed, wait);
      }
      if (leadingCall) {
        isCalled = true;
        result = func.apply(thisArg, args);
      }
      if (isCalled && !timeoutId && !maxTimeoutId) {
        args = thisArg = null;
      }
      return result;
    }
    debounced.cancel = cancel;
    return debounced;
  }

  var function_debounce = debounce;

  /** Used as the `TypeError` message for "Functions" methods. */
  var internal_baseDelay__FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * The base implementation of `_.delay` and `_.defer` which accepts an index
   * of where to slice the arguments to provide to `func`.
   *
   * @private
   * @param {Function} func The function to delay.
   * @param {number} wait The number of milliseconds to delay invocation.
   * @param {Object} args The arguments provide to `func`.
   * @returns {number} Returns the timer id.
   */
  function baseDelay(func, wait, args) {
    if (typeof func != 'function') {
      throw new TypeError(internal_baseDelay__FUNC_ERROR_TEXT);
    }
    return setTimeout(function() { func.apply(undefined, args); }, wait);
  }

  var internal_baseDelay = baseDelay;

  var defer = function_restParam(function(func, args) {
    return internal_baseDelay(func, 1, args);
  });

  var function_defer = defer;

  var delay = function_restParam(function(func, wait, args) {
    return internal_baseDelay(func, wait, args);
  });

  var function_delay = delay;

  var flow = internal_createFlow();

  var function_flow = flow;

  /**
   * Removes `key` and its value from the cache.
   *
   * @private
   * @name delete
   * @memberOf _.memoize.Cache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
   */
  function mapDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }

  var internal_mapDelete = mapDelete;

  /**
   * Gets the cached value for `key`.
   *
   * @private
   * @name get
   * @memberOf _.memoize.Cache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the cached value.
   */
  function mapGet(key) {
    return key == '__proto__' ? undefined : this.__data__[key];
  }

  var internal_mapGet = mapGet;

  /** Used for native method references. */
  var internal_mapHas__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var internal_mapHas__hasOwnProperty = internal_mapHas__objectProto.hasOwnProperty;

  /**
   * Checks if a cached value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf _.memoize.Cache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapHas(key) {
    return key != '__proto__' && internal_mapHas__hasOwnProperty.call(this.__data__, key);
  }

  var internal_mapHas = mapHas;

  /**
   * Adds `value` to `key` of the cache.
   *
   * @private
   * @name set
   * @memberOf _.memoize.Cache
   * @param {string} key The key of the value to cache.
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache object.
   */
  function mapSet(key, value) {
    if (key != '__proto__') {
      this.__data__[key] = value;
    }
    return this;
  }

  var internal_mapSet = mapSet;

  function MapCache() {
    this.__data__ = {};
  }

  // Add functions to the `Map` cache.
  MapCache.prototype['delete'] = internal_mapDelete;
  MapCache.prototype.get = internal_mapGet;
  MapCache.prototype.has = internal_mapHas;
  MapCache.prototype.set = internal_mapSet;

  var internal_MapCache = MapCache;

  var function_memoize__FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is coerced to a string and used as the
   * cache key. The `func` is invoked with the `this` binding of the memoized
   * function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the [`Map`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-properties-of-the-map-prototype-object)
   * method interface of `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoizing function.
   * @example
   *
   * var upperCase = _.memoize(function(string) {
   *   return string.toUpperCase();
   * });
   *
   * upperCase('fred');
   * // => 'FRED'
   *
   * // modifying the result cache
   * upperCase.cache.set('fred', 'BARNEY');
   * upperCase('fred');
   * // => 'BARNEY'
   *
   * // replacing `_.memoize.Cache`
   * var object = { 'user': 'fred' };
   * var other = { 'user': 'barney' };
   * var identity = _.memoize(_.identity);
   *
   * identity(object);
   * // => { 'user': 'fred' }
   * identity(other);
   * // => { 'user': 'fred' }
   *
   * _.memoize.Cache = WeakMap;
   * var identity = _.memoize(_.identity);
   *
   * identity(object);
   * // => { 'user': 'fred' }
   * identity(other);
   * // => { 'user': 'barney' }
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
      throw new TypeError(function_memoize__FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          cache = memoized.cache,
          key = resolver ? resolver.apply(this, args) : args[0];

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      cache.set(key, result);
      return result;
    };
    memoized.cache = new memoize.Cache;
    return memoized;
  }

  // Assign cache to `_.memoize`.
  memoize.Cache = internal_MapCache;

  var function_memoize = memoize;

  /** Used as the `TypeError` message for "Functions" methods. */
  var function_negate__FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that negates the result of the predicate `func`. The
   * `func` predicate is invoked with the `this` binding and arguments of the
   * created function.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} predicate The predicate to negate.
   * @returns {Function} Returns the new function.
   * @example
   *
   * function isEven(n) {
   *   return n % 2 == 0;
   * }
   *
   * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
   * // => [1, 3, 5]
   */
  function negate(predicate) {
    if (typeof predicate != 'function') {
      throw new TypeError(function_negate__FUNC_ERROR_TEXT);
    }
    return function() {
      return !predicate.apply(this, arguments);
    };
  }

  var function_negate = negate;

  function once(func) {
    return function_before(func, 2);
  }

  var function_once = once;

  function createPartial(flag) {
    var partialFunc = function_restParam(function(func, partials) {
      var holders = internal_replaceHolders(partials, partialFunc.placeholder);
      return internal_createWrapper(func, flag, null, partials, holders);
    });
    return partialFunc;
  }

  var internal_createPartial = createPartial;

  var function_partial__PARTIAL_FLAG = 32;

  /**
   * Creates a function that invokes `func` with `partial` arguments prepended
   * to those provided to the new function. This method is like `_.bind` except
   * it does **not** alter the `this` binding.
   *
   * The `_.partial.placeholder` value, which defaults to `_` in monolithic
   * builds, may be used as a placeholder for partially applied arguments.
   *
   * **Note:** This method does not set the `length` property of partially
   * applied functions.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to partially apply arguments to.
   * @param {...*} [partials] The arguments to be partially applied.
   * @returns {Function} Returns the new partially applied function.
   * @example
   *
   * var greet = function(greeting, name) {
   *   return greeting + ' ' + name;
   * };
   *
   * var sayHelloTo = _.partial(greet, 'hello');
   * sayHelloTo('fred');
   * // => 'hello fred'
   *
   * // using placeholders
   * var greetFred = _.partial(greet, _, 'fred');
   * greetFred('hi');
   * // => 'hi fred'
   */
  var partial = internal_createPartial(function_partial__PARTIAL_FLAG);

  // Assign default placeholders.
  partial.placeholder = {};

  var function_partial = partial;

  var function_partialRight__PARTIAL_RIGHT_FLAG = 64;

  /**
   * This method is like `_.partial` except that partially applied arguments
   * are appended to those provided to the new function.
   *
   * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
   * builds, may be used as a placeholder for partially applied arguments.
   *
   * **Note:** This method does not set the `length` property of partially
   * applied functions.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to partially apply arguments to.
   * @param {...*} [partials] The arguments to be partially applied.
   * @returns {Function} Returns the new partially applied function.
   * @example
   *
   * var greet = function(greeting, name) {
   *   return greeting + ' ' + name;
   * };
   *
   * var greetFred = _.partialRight(greet, 'fred');
   * greetFred('hi');
   * // => 'hi fred'
   *
   * // using placeholders
   * var sayHelloTo = _.partialRight(greet, 'hello', _);
   * sayHelloTo('fred');
   * // => 'hello fred'
   */
  var partialRight = internal_createPartial(function_partialRight__PARTIAL_RIGHT_FLAG);

  // Assign default placeholders.
  partialRight.placeholder = {};

  var function_partialRight = partialRight;

  var function_rearg__REARG_FLAG = 256;

  /**
   * Creates a function that invokes `func` with arguments arranged according
   * to the specified indexes where the argument value at the first index is
   * provided as the first argument, the argument value at the second index is
   * provided as the second argument, and so on.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to rearrange arguments for.
   * @param {...(number|number[])} indexes The arranged argument indexes,
   *  specified as individual indexes or arrays of indexes.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var rearged = _.rearg(function(a, b, c) {
   *   return [a, b, c];
   * }, 2, 0, 1);
   *
   * rearged('b', 'c', 'a')
   * // => ['a', 'b', 'c']
   *
   * var map = _.rearg(_.map, [1, 0]);
   * map(function(n) {
   *   return n * 3;
   * }, [1, 2, 3]);
   * // => [3, 6, 9]
   */
  var rearg = function_restParam(function(func, indexes) {
    return internal_createWrapper(func, function_rearg__REARG_FLAG, null, null, null, internal_baseFlatten(indexes));
  });

  var function_rearg = rearg;

  /** Used as the `TypeError` message for "Functions" methods. */
  var function_spread__FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that invokes `func` with the `this` binding of the created
   * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
   *
   * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to spread arguments over.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var say = _.spread(function(who, what) {
   *   return who + ' says ' + what;
   * });
   *
   * say(['fred', 'hello']);
   * // => 'fred says hello'
   *
   * // with a Promise
   * var numbers = Promise.all([
   *   Promise.resolve(40),
   *   Promise.resolve(36)
   * ]);
   *
   * numbers.then(_.spread(function(x, y) {
   *   return x + y;
   * }));
   * // => a Promise of 76
   */
  function spread(func) {
    if (typeof func != 'function') {
      throw new TypeError(function_spread__FUNC_ERROR_TEXT);
    }
    return function(array) {
      return func.apply(this, array);
    };
  }

  var function_spread = spread;

  var function_throttle__FUNC_ERROR_TEXT = 'Expected a function';

  /** Used as an internal `_.debounce` options object by `_.throttle`. */
  var debounceOptions = {
    'leading': false,
    'maxWait': 0,
    'trailing': false
  };

  /**
   * Creates a function that only invokes `func` at most once per every `wait`
   * milliseconds. The created function comes with a `cancel` method to cancel
   * delayed invocations. Provide an options object to indicate that `func`
   * should be invoked on the leading and/or trailing edge of the `wait` timeout.
   * Subsequent calls to the throttled function return the result of the last
   * `func` call.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
   * on the trailing edge of the timeout only if the the throttled function is
   * invoked more than once during the `wait` timeout.
   *
   * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
   * for details over the differences between `_.throttle` and `_.debounce`.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to throttle.
   * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.leading=true] Specify invoking on the leading
   *  edge of the timeout.
   * @param {boolean} [options.trailing=true] Specify invoking on the trailing
   *  edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // avoid excessively updating the position while scrolling
   * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
   *
   * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
   * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
   *   'trailing': false
   * }));
   *
   * // cancel a trailing throttled call
   * jQuery(window).on('popstate', throttled.cancel);
   */
  function throttle(func, wait, options) {
    var leading = true,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(function_throttle__FUNC_ERROR_TEXT);
    }
    if (options === false) {
      leading = false;
    } else if (lang_isObject(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    debounceOptions.leading = leading;
    debounceOptions.maxWait = +wait;
    debounceOptions.trailing = trailing;
    return function_debounce(func, wait, debounceOptions);
  }

  var function_throttle = throttle;

  var function_wrap__PARTIAL_FLAG = 32;

  /**
   * Creates a function that provides `value` to the wrapper function as its
   * first argument. Any additional arguments provided to the function are
   * appended to those provided to the wrapper function. The wrapper is invoked
   * with the `this` binding of the created function.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {*} value The value to wrap.
   * @param {Function} wrapper The wrapper function.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var p = _.wrap(_.escape, function(func, text) {
   *   return '<p>' + func(text) + '</p>';
   * });
   *
   * p('fred, barney, & pebbles');
   * // => '<p>fred, barney, &amp; pebbles</p>'
   */
  function wrap(value, wrapper) {
    wrapper = wrapper == null ? utility_identity : wrapper;
    return internal_createWrapper(wrapper, function_wrap__PARTIAL_FLAG, null, [value], []);
  }

  var function_wrap = wrap;

  var _function = {
    'after': function_after,
    'ary': function_ary,
    'backflow': backflow,
    'before': function_before,
    'bind': function_bind,
    'bindAll': function_bindAll,
    'bindKey': function_bindKey,
    'compose': compose,
    'curry': function_curry,
    'curryRight': function_curryRight,
    'debounce': function_debounce,
    'defer': function_defer,
    'delay': function_delay,
    'flow': function_flow,
    'flowRight': function_flowRight,
    'memoize': function_memoize,
    'negate': function_negate,
    'once': function_once,
    'partial': function_partial,
    'partialRight': function_partialRight,
    'rearg': function_rearg,
    'restParam': function_restParam,
    'spread': function_spread,
    'throttle': function_throttle,
    'wrap': function_wrap
  };

  /**
   * Copies the properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Array} props The property names to copy.
   * @returns {Object} Returns `object`.
   */
  function baseCopy(source, object, props) {
    if (!props) {
      props = object;
      object = {};
    }
    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];
      object[key] = source[key];
    }
    return object;
  }

  var internal_baseCopy = baseCopy;

  /** Used for native method references. */
  var internal_initCloneArray__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var internal_initCloneArray__hasOwnProperty = internal_initCloneArray__objectProto.hasOwnProperty;

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
        result = new array.constructor(length);

    // Add array properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && internal_initCloneArray__hasOwnProperty.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  var internal_initCloneArray = initCloneArray;

  var internal_bufferClone__ArrayBuffer = lang_isNative(internal_bufferClone__ArrayBuffer = internal_root.ArrayBuffer) && internal_bufferClone__ArrayBuffer,
      bufferSlice = lang_isNative(bufferSlice = internal_bufferClone__ArrayBuffer && new internal_bufferClone__ArrayBuffer(0).slice) && bufferSlice,
      internal_bufferClone__floor = Math.floor,
      internal_bufferClone__Uint8Array = lang_isNative(internal_bufferClone__Uint8Array = internal_root.Uint8Array) && internal_bufferClone__Uint8Array;

  /** Used to clone array buffers. */
  var internal_bufferClone__Float64Array = (function() {
    // Safari 5 errors when using an array buffer to initialize a typed array
    // where the array buffer's `byteLength` is not a multiple of the typed
    // array's `BYTES_PER_ELEMENT`.
    try {
      var func = lang_isNative(func = internal_root.Float64Array) && func,
          result = new func(new internal_bufferClone__ArrayBuffer(10), 0, 1) && func;
    } catch(e) {}
    return result;
  }());

  /** Used as the size, in bytes, of each `Float64Array` element. */
  var FLOAT64_BYTES_PER_ELEMENT = internal_bufferClone__Float64Array ? internal_bufferClone__Float64Array.BYTES_PER_ELEMENT : 0;

  /**
   * Creates a clone of the given array buffer.
   *
   * @private
   * @param {ArrayBuffer} buffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function bufferClone(buffer) {
    return bufferSlice.call(buffer, 0);
  }
  if (!bufferSlice) {
    // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
    bufferClone = !(internal_bufferClone__ArrayBuffer && internal_bufferClone__Uint8Array) ? utility_constant(null) : function(buffer) {
      var byteLength = buffer.byteLength,
          floatLength = internal_bufferClone__Float64Array ? internal_bufferClone__floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
          offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
          result = new internal_bufferClone__ArrayBuffer(byteLength);

      if (floatLength) {
        var view = new internal_bufferClone__Float64Array(result, 0, floatLength);
        view.set(new internal_bufferClone__Float64Array(buffer, 0, floatLength));
      }
      if (byteLength != offset) {
        view = new internal_bufferClone__Uint8Array(result, offset);
        view.set(new internal_bufferClone__Uint8Array(buffer, offset));
      }
      return result;
    };
  }

  var internal_bufferClone = bufferClone;

  var internal_initCloneByTag__boolTag = '[object Boolean]',
      internal_initCloneByTag__dateTag = '[object Date]',
      internal_initCloneByTag__numberTag = '[object Number]',
      internal_initCloneByTag__regexpTag = '[object RegExp]',
      internal_initCloneByTag__stringTag = '[object String]';

  var internal_initCloneByTag__arrayBufferTag = '[object ArrayBuffer]',
      internal_initCloneByTag__float32Tag = '[object Float32Array]',
      internal_initCloneByTag__float64Tag = '[object Float64Array]',
      internal_initCloneByTag__int8Tag = '[object Int8Array]',
      internal_initCloneByTag__int16Tag = '[object Int16Array]',
      internal_initCloneByTag__int32Tag = '[object Int32Array]',
      internal_initCloneByTag__uint8Tag = '[object Uint8Array]',
      internal_initCloneByTag__uint8ClampedTag = '[object Uint8ClampedArray]',
      internal_initCloneByTag__uint16Tag = '[object Uint16Array]',
      internal_initCloneByTag__uint32Tag = '[object Uint32Array]';

  /** Used to match `RegExp` flags from their coerced string values. */
  var internal_initCloneByTag__reFlags = /\w*$/;

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case internal_initCloneByTag__arrayBufferTag:
        return internal_bufferClone(object);

      case internal_initCloneByTag__boolTag:
      case internal_initCloneByTag__dateTag:
        return new Ctor(+object);

      case internal_initCloneByTag__float32Tag: case internal_initCloneByTag__float64Tag:
      case internal_initCloneByTag__int8Tag: case internal_initCloneByTag__int16Tag: case internal_initCloneByTag__int32Tag:
      case internal_initCloneByTag__uint8Tag: case internal_initCloneByTag__uint8ClampedTag: case internal_initCloneByTag__uint16Tag: case internal_initCloneByTag__uint32Tag:
        var buffer = object.buffer;
        return new Ctor(isDeep ? internal_bufferClone(buffer) : buffer, object.byteOffset, object.length);

      case internal_initCloneByTag__numberTag:
      case internal_initCloneByTag__stringTag:
        return new Ctor(object);

      case internal_initCloneByTag__regexpTag:
        var result = new Ctor(object.source, internal_initCloneByTag__reFlags.exec(object));
        result.lastIndex = object.lastIndex;
    }
    return result;
  }

  var internal_initCloneByTag = initCloneByTag;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    var Ctor = object.constructor;
    if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
      Ctor = Object;
    }
    return new Ctor;
  }

  var internal_initCloneObject = initCloneObject;

  var internal_baseClone__argsTag = '[object Arguments]',
      internal_baseClone__arrayTag = '[object Array]',
      internal_baseClone__boolTag = '[object Boolean]',
      internal_baseClone__dateTag = '[object Date]',
      internal_baseClone__errorTag = '[object Error]',
      internal_baseClone__funcTag = '[object Function]',
      internal_baseClone__mapTag = '[object Map]',
      internal_baseClone__numberTag = '[object Number]',
      internal_baseClone__objectTag = '[object Object]',
      internal_baseClone__regexpTag = '[object RegExp]',
      internal_baseClone__setTag = '[object Set]',
      internal_baseClone__stringTag = '[object String]',
      internal_baseClone__weakMapTag = '[object WeakMap]';

  var internal_baseClone__arrayBufferTag = '[object ArrayBuffer]',
      internal_baseClone__float32Tag = '[object Float32Array]',
      internal_baseClone__float64Tag = '[object Float64Array]',
      internal_baseClone__int8Tag = '[object Int8Array]',
      internal_baseClone__int16Tag = '[object Int16Array]',
      internal_baseClone__int32Tag = '[object Int32Array]',
      internal_baseClone__uint8Tag = '[object Uint8Array]',
      internal_baseClone__uint8ClampedTag = '[object Uint8ClampedArray]',
      internal_baseClone__uint16Tag = '[object Uint16Array]',
      internal_baseClone__uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[internal_baseClone__argsTag] = cloneableTags[internal_baseClone__arrayTag] =
  cloneableTags[internal_baseClone__arrayBufferTag] = cloneableTags[internal_baseClone__boolTag] =
  cloneableTags[internal_baseClone__dateTag] = cloneableTags[internal_baseClone__float32Tag] =
  cloneableTags[internal_baseClone__float64Tag] = cloneableTags[internal_baseClone__int8Tag] =
  cloneableTags[internal_baseClone__int16Tag] = cloneableTags[internal_baseClone__int32Tag] =
  cloneableTags[internal_baseClone__numberTag] = cloneableTags[internal_baseClone__objectTag] =
  cloneableTags[internal_baseClone__regexpTag] = cloneableTags[internal_baseClone__stringTag] =
  cloneableTags[internal_baseClone__uint8Tag] = cloneableTags[internal_baseClone__uint8ClampedTag] =
  cloneableTags[internal_baseClone__uint16Tag] = cloneableTags[internal_baseClone__uint32Tag] = true;
  cloneableTags[internal_baseClone__errorTag] = cloneableTags[internal_baseClone__funcTag] =
  cloneableTags[internal_baseClone__mapTag] = cloneableTags[internal_baseClone__setTag] =
  cloneableTags[internal_baseClone__weakMapTag] = false;

  /** Used for native method references. */
  var internal_baseClone__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var internal_baseClone__objToString = internal_baseClone__objectProto.toString;

  /**
   * The base implementation of `_.clone` without support for argument juggling
   * and `this` binding `customizer` functions.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @param {Function} [customizer] The function to customize cloning values.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The object `value` belongs to.
   * @param {Array} [stackA=[]] Tracks traversed source objects.
   * @param {Array} [stackB=[]] Associates clones with source counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
    var result;
    if (customizer) {
      result = object ? customizer(value, key, object) : customizer(value);
    }
    if (typeof result != 'undefined') {
      return result;
    }
    if (!lang_isObject(value)) {
      return value;
    }
    var isArr = lang_isArray(value);
    if (isArr) {
      result = internal_initCloneArray(value);
      if (!isDeep) {
        return internal_arrayCopy(value, result);
      }
    } else {
      var tag = internal_baseClone__objToString.call(value),
          isFunc = tag == internal_baseClone__funcTag;

      if (tag == internal_baseClone__objectTag || tag == internal_baseClone__argsTag || (isFunc && !object)) {
        result = internal_initCloneObject(isFunc ? {} : value);
        if (!isDeep) {
          return internal_baseCopy(value, result, object_keys(value));
        }
      } else {
        return cloneableTags[tag]
          ? internal_initCloneByTag(value, tag, isDeep)
          : (object ? value : {});
      }
    }
    // Check for circular references and return corresponding clone.
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == value) {
        return stackB[length];
      }
    }
    // Add the source value to the stack of traversed objects and associate it with its clone.
    stackA.push(value);
    stackB.push(result);

    // Recursively populate clone (susceptible to call stack limits).
    (isArr ? internal_arrayEach : internal_baseForOwn)(value, function(subValue, key) {
      result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
    });
    return result;
  }

  var internal_baseClone = baseClone;

  function clone(value, isDeep, customizer, thisArg) {
    if (isDeep && typeof isDeep != 'boolean' && internal_isIterateeCall(value, isDeep, customizer)) {
      isDeep = false;
    }
    else if (typeof isDeep == 'function') {
      thisArg = customizer;
      customizer = isDeep;
      isDeep = false;
    }
    customizer = typeof customizer == 'function' && internal_bindCallback(customizer, thisArg, 1);
    return internal_baseClone(value, isDeep, customizer);
  }

  var lang_clone = clone;

  function cloneDeep(value, customizer, thisArg) {
    customizer = typeof customizer == 'function' && internal_bindCallback(customizer, thisArg, 1);
    return internal_baseClone(value, true, customizer);
  }

  var lang_cloneDeep = cloneDeep;

  var lang_isBoolean__boolTag = '[object Boolean]';

  /** Used for native method references. */
  var lang_isBoolean__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isBoolean__objToString = lang_isBoolean__objectProto.toString;

  /**
   * Checks if `value` is classified as a boolean primitive or object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isBoolean(false);
   * // => true
   *
   * _.isBoolean(null);
   * // => false
   */
  function isBoolean(value) {
    return value === true || value === false || (internal_isObjectLike(value) && lang_isBoolean__objToString.call(value) == lang_isBoolean__boolTag);
  }

  var lang_isBoolean = isBoolean;

  var lang_isDate__dateTag = '[object Date]';

  /** Used for native method references. */
  var lang_isDate__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isDate__objToString = lang_isDate__objectProto.toString;

  /**
   * Checks if `value` is classified as a `Date` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isDate(new Date);
   * // => true
   *
   * _.isDate('Mon April 23 2012');
   * // => false
   */
  function isDate(value) {
    return internal_isObjectLike(value) && lang_isDate__objToString.call(value) == lang_isDate__dateTag;
  }

  var lang_isDate = isDate;

  function baseForIn(object, iteratee) {
    return internal_baseFor(object, iteratee, object_keysIn);
  }

  var internal_baseForIn = baseForIn;

  var internal_shimIsPlainObject__objectTag = '[object Object]';

  /** Used for native method references. */
  var internal_shimIsPlainObject__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var internal_shimIsPlainObject__hasOwnProperty = internal_shimIsPlainObject__objectProto.hasOwnProperty;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var internal_shimIsPlainObject__objToString = internal_shimIsPlainObject__objectProto.toString;

  /**
   * A fallback implementation of `_.isPlainObject` which checks if `value`
   * is an object created by the `Object` constructor or has a `[[Prototype]]`
   * of `null`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   */
  function shimIsPlainObject(value) {
    var Ctor;

    // Exit early for non `Object` objects.
    if (!(internal_isObjectLike(value) && internal_shimIsPlainObject__objToString.call(value) == internal_shimIsPlainObject__objectTag) ||
        (!internal_shimIsPlainObject__hasOwnProperty.call(value, 'constructor') &&
          (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
      return false;
    }
    // IE < 9 iterates inherited properties before own properties. If the first
    // iterated property is an object's own property then there are no inherited
    // enumerable properties.
    var result;
    // In most environments an object's own properties are iterated before
    // its inherited properties. If the last iterated property is an object's
    // own property then there are no inherited enumerable properties.
    internal_baseForIn(value, function(subValue, key) {
      result = key;
    });
    return typeof result == 'undefined' || internal_shimIsPlainObject__hasOwnProperty.call(value, result);
  }

  var internal_shimIsPlainObject = shimIsPlainObject;

  var lang_isPlainObject__objectTag = '[object Object]';

  /** Used for native method references. */
  var lang_isPlainObject__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isPlainObject__objToString = lang_isPlainObject__objectProto.toString;

  /** Native method references. */
  var getPrototypeOf = lang_isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf;

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * **Note:** This method assumes objects created by the `Object` constructor
   * have no inherited enumerable properties.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  var isPlainObject = !getPrototypeOf ? internal_shimIsPlainObject : function(value) {
    if (!(value && lang_isPlainObject__objToString.call(value) == lang_isPlainObject__objectTag)) {
      return false;
    }
    var valueOf = value.valueOf,
        objProto = lang_isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

    return objProto
      ? (value == objProto || getPrototypeOf(value) == objProto)
      : internal_shimIsPlainObject(value);
  };

  var lang_isPlainObject = isPlainObject;

  var lang_isElement__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isElement__objToString = lang_isElement__objectProto.toString;

  /**
   * Checks if `value` is a DOM element.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   *
   * _.isElement('<body>');
   * // => false
   */
  function isElement(value) {
    return !!value && value.nodeType === 1 && internal_isObjectLike(value) &&
      (lang_isElement__objToString.call(value).indexOf('Element') > -1);
  }
  // Fallback for environments without DOM support.
  if (!_support.dom) {
    isElement = function(value) {
      return !!value && value.nodeType === 1 && internal_isObjectLike(value) && !lang_isPlainObject(value);
    };
  }

  var lang_isElement = isElement;

  function isEmpty(value) {
    if (value == null) {
      return true;
    }
    var length = value.length;
    if (internal_isLength(length) && (lang_isArray(value) || lang_isString(value) || lang_isArguments(value) ||
        (internal_isObjectLike(value) && lang_isFunction(value.splice)))) {
      return !length;
    }
    return !object_keys(value).length;
  }

  var lang_isEmpty = isEmpty;

  function isEqual(value, other, customizer, thisArg) {
    customizer = typeof customizer == 'function' && internal_bindCallback(customizer, thisArg, 3);
    if (!customizer && internal_isStrictComparable(value) && internal_isStrictComparable(other)) {
      return value === other;
    }
    var result = customizer ? customizer(value, other) : undefined;
    return typeof result == 'undefined' ? internal_baseIsEqual(value, other, customizer) : !!result;
  }

  var lang_isEqual = isEqual;

  var lang_isError__errorTag = '[object Error]';

  /** Used for native method references. */
  var lang_isError__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isError__objToString = lang_isError__objectProto.toString;

  /**
   * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
   * `SyntaxError`, `TypeError`, or `URIError` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
   * @example
   *
   * _.isError(new Error);
   * // => true
   *
   * _.isError(Error);
   * // => false
   */
  function isError(value) {
    return internal_isObjectLike(value) && typeof value.message == 'string' && lang_isError__objToString.call(value) == lang_isError__errorTag;
  }

  var lang_isError = isError;

  var lang_isFinite__nativeIsFinite = internal_root.isFinite,
      nativeNumIsFinite = lang_isNative(nativeNumIsFinite = Number.isFinite) && nativeNumIsFinite;

  /**
   * Checks if `value` is a finite primitive number.
   *
   * **Note:** This method is based on [`Number.isFinite`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite).
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
   * @example
   *
   * _.isFinite(10);
   * // => true
   *
   * _.isFinite('10');
   * // => false
   *
   * _.isFinite(true);
   * // => false
   *
   * _.isFinite(Object(10));
   * // => false
   *
   * _.isFinite(Infinity);
   * // => false
   */
  var lang_isFinite__isFinite = nativeNumIsFinite || function(value) {
    return typeof value == 'number' && lang_isFinite__nativeIsFinite(value);
  };

  var lang_isFinite = lang_isFinite__isFinite;

  function isMatch(object, source, customizer, thisArg) {
    var props = object_keys(source),
        length = props.length;

    if (!length) {
      return true;
    }
    if (object == null) {
      return false;
    }
    customizer = typeof customizer == 'function' && internal_bindCallback(customizer, thisArg, 3);
    if (!customizer && length == 1) {
      var key = props[0],
          value = source[key];

      if (internal_isStrictComparable(value)) {
        return value === object[key] && (typeof value != 'undefined' || (key in internal_toObject(object)));
      }
    }
    var values = Array(length),
        strictCompareFlags = Array(length);

    while (length--) {
      value = values[length] = source[props[length]];
      strictCompareFlags[length] = internal_isStrictComparable(value);
    }
    return internal_baseIsMatch(internal_toObject(object), props, values, strictCompareFlags, customizer);
  }

  var lang_isMatch = isMatch;

  var lang_isNumber__numberTag = '[object Number]';

  /** Used for native method references. */
  var lang_isNumber__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isNumber__objToString = lang_isNumber__objectProto.toString;

  /**
   * Checks if `value` is classified as a `Number` primitive or object.
   *
   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
   * as numbers, use the `_.isFinite` method.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isNumber(8.4);
   * // => true
   *
   * _.isNumber(NaN);
   * // => true
   *
   * _.isNumber('8.4');
   * // => false
   */
  function isNumber(value) {
    return typeof value == 'number' || (internal_isObjectLike(value) && lang_isNumber__objToString.call(value) == lang_isNumber__numberTag);
  }

  var lang_isNumber = isNumber;

  function lang_isNaN__isNaN(value) {
    // An `NaN` primitive is the only value that is not equal to itself.
    // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
    return lang_isNumber(value) && value != +value;
  }

  var lang_isNaN = lang_isNaN__isNaN;

  /**
   * Checks if `value` is `null`.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
   * @example
   *
   * _.isNull(null);
   * // => true
   *
   * _.isNull(void 0);
   * // => false
   */
  function isNull(value) {
    return value === null;
  }

  var lang_isNull = isNull;

  var lang_isRegExp__regexpTag = '[object RegExp]';

  /** Used for native method references. */
  var lang_isRegExp__objectProto = Object.prototype;

  /**
   * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * of values.
   */
  var lang_isRegExp__objToString = lang_isRegExp__objectProto.toString;

  /**
   * Checks if `value` is classified as a `RegExp` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isRegExp(/abc/);
   * // => true
   *
   * _.isRegExp('/abc/');
   * // => false
   */
  function isRegExp(value) {
    return (internal_isObjectLike(value) && lang_isRegExp__objToString.call(value) == lang_isRegExp__regexpTag) || false;
  }

  var lang_isRegExp = isRegExp;

  /**
   * Checks if `value` is `undefined`.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
   * @example
   *
   * _.isUndefined(void 0);
   * // => true
   *
   * _.isUndefined(null);
   * // => false
   */
  function isUndefined(value) {
    return typeof value == 'undefined';
  }

  var lang_isUndefined = isUndefined;

  function toArray(value) {
    var length = value ? value.length : 0;
    if (!internal_isLength(length)) {
      return object_values(value);
    }
    if (!length) {
      return [];
    }
    return internal_arrayCopy(value);
  }

  var lang_toArray = toArray;

  function toPlainObject(value) {
    return internal_baseCopy(value, object_keysIn(value));
  }

  var lang_toPlainObject = toPlainObject;

  var lang = {
    'clone': lang_clone,
    'cloneDeep': lang_cloneDeep,
    'isArguments': lang_isArguments,
    'isArray': lang_isArray,
    'isBoolean': lang_isBoolean,
    'isDate': lang_isDate,
    'isElement': lang_isElement,
    'isEmpty': lang_isEmpty,
    'isEqual': lang_isEqual,
    'isError': lang_isError,
    'isFinite': lang_isFinite,
    'isFunction': lang_isFunction,
    'isMatch': lang_isMatch,
    'isNaN': lang_isNaN,
    'isNative': lang_isNative,
    'isNull': lang_isNull,
    'isNumber': lang_isNumber,
    'isObject': lang_isObject,
    'isPlainObject': lang_isPlainObject,
    'isRegExp': lang_isRegExp,
    'isString': lang_isString,
    'isTypedArray': lang_isTypedArray,
    'isUndefined': lang_isUndefined,
    'toArray': lang_toArray,
    'toPlainObject': lang_toPlainObject
  };

  /**
   * Adds two numbers.
   *
   * @static
   * @memberOf _
   * @category Math
   * @param {number} augend The first number to add.
   * @param {number} addend The second number to add.
   * @returns {number} Returns the sum.
   * @example
   *
   * _.add(6, 4);
   * // => 10
   */
  function add(augend, addend) {
    return augend + addend;
  }

  var math_add = add;

  var math = {
    'add': math_add,
    'max': math_max,
    'min': math_min,
    'sum': math_sum
  };

  /**
   * Checks if `n` is between `start` and up to but not including, `end`. If
   * `end` is not specified it is set to `start` with `start` then set to `0`.
   *
   * @static
   * @memberOf _
   * @category Number
   * @param {number} n The number to check.
   * @param {number} [start=0] The start of the range.
   * @param {number} end The end of the range.
   * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
   * @example
   *
   * _.inRange(3, 2, 4);
   * // => true
   *
   * _.inRange(4, 8);
   * // => true
   *
   * _.inRange(4, 2);
   * // => false
   *
   * _.inRange(2, 2);
   * // => false
   *
   * _.inRange(1.2, 2);
   * // => true
   *
   * _.inRange(5.2, 4);
   * // => false
   */
  function inRange(value, start, end) {
    start = +start || 0;
    if (typeof end === 'undefined') {
      end = start;
      start = 0;
    } else {
      end = +end || 0;
    }
    return value >= start && value < end;
  }

  var number_inRange = inRange;

  var number_random__nativeMin = Math.min,
      number_random__nativeRandom = Math.random;

  /**
   * Produces a random number between `min` and `max` (inclusive). If only one
   * argument is provided a number between `0` and the given number is returned.
   * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
   * number is returned instead of an integer.
   *
   * @static
   * @memberOf _
   * @category Number
   * @param {number} [min=0] The minimum possible value.
   * @param {number} [max=1] The maximum possible value.
   * @param {boolean} [floating] Specify returning a floating-point number.
   * @returns {number} Returns the random number.
   * @example
   *
   * _.random(0, 5);
   * // => an integer between 0 and 5
   *
   * _.random(5);
   * // => also an integer between 0 and 5
   *
   * _.random(5, true);
   * // => a floating-point number between 0 and 5
   *
   * _.random(1.2, 5.2);
   * // => a floating-point number between 1.2 and 5.2
   */
  function random(min, max, floating) {
    if (floating && internal_isIterateeCall(min, max, floating)) {
      max = floating = null;
    }
    var noMin = min == null,
        noMax = max == null;

    if (floating == null) {
      if (noMax && typeof min == 'boolean') {
        floating = min;
        min = 1;
      }
      else if (typeof max == 'boolean') {
        floating = max;
        noMax = true;
      }
    }
    if (noMin && noMax) {
      max = 1;
      noMax = false;
    }
    min = +min || 0;
    if (noMax) {
      max = min;
      min = 0;
    } else {
      max = +max || 0;
    }
    if (floating || min % 1 || max % 1) {
      var rand = number_random__nativeRandom();
      return number_random__nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
    }
    return internal_baseRandom(min, max);
  }

  var number_random = random;

  var number = {
    'inRange': number_inRange,
    'random': number_random
  };

  function baseAssign(object, source, customizer) {
    var props = object_keys(source);
    if (!customizer) {
      return internal_baseCopy(source, object, props);
    }
    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index],
          value = object[key],
          result = customizer(value, source[key], key, object, source);

      if ((result === result ? (result !== value) : (value === value)) ||
          (typeof value == 'undefined' && !(key in object))) {
        object[key] = result;
      }
    }
    return object;
  }

  var internal_baseAssign = baseAssign;

  function createAssigner(assigner) {
    return function() {
      var args = arguments,
          length = args.length,
          object = args[0];

      if (length < 2 || object == null) {
        return object;
      }
      var customizer = args[length - 2],
          thisArg = args[length - 1],
          guard = args[3];

      if (length > 3 && typeof customizer == 'function') {
        customizer = internal_bindCallback(customizer, thisArg, 5);
        length -= 2;
      } else {
        customizer = (length > 2 && typeof thisArg == 'function') ? thisArg : null;
        length -= (customizer ? 1 : 0);
      }
      if (guard && internal_isIterateeCall(args[1], args[2], guard)) {
        customizer = length == 3 ? null : customizer;
        length = 2;
      }
      var index = 0;
      while (++index < length) {
        var source = args[index];
        if (source) {
          assigner(object, source, customizer);
        }
      }
      return object;
    };
  }

  var internal_createAssigner = createAssigner;

  var assign = internal_createAssigner(internal_baseAssign);

  var object_assign = assign;

  function create(prototype, properties, guard) {
    var result = internal_baseCreate(prototype);
    if (guard && internal_isIterateeCall(prototype, properties, guard)) {
      properties = null;
    }
    return properties ? internal_baseCopy(properties, result, object_keys(properties)) : result;
  }

  var object_create = create;

  /**
   * Used by `_.defaults` to customize its `_.assign` use.
   *
   * @private
   * @param {*} objectValue The destination object property value.
   * @param {*} sourceValue The source object property value.
   * @returns {*} Returns the value to assign to the destination object.
   */
  function assignDefaults(objectValue, sourceValue) {
    return typeof objectValue == 'undefined' ? sourceValue : objectValue;
  }

  var internal_assignDefaults = assignDefaults;

  var defaults = function_restParam(function(args) {
    var object = args[0];
    if (object == null) {
      return object;
    }
    args.push(internal_assignDefaults);
    return object_assign.apply(undefined, args);
  });

  var object_defaults = defaults;

  var extend = object_assign;

  function createFindKey(objectFunc) {
    return function(object, predicate, thisArg) {
      predicate = internal_baseCallback(predicate, thisArg, 3);
      return internal_baseFind(object, predicate, objectFunc, true);
    };
  }

  var internal_createFindKey = createFindKey;

  var findKey = internal_createFindKey(internal_baseForOwn);

  var object_findKey = findKey;

  var findLastKey = internal_createFindKey(internal_baseForOwnRight);

  var object_findLastKey = findLastKey;

  function createForIn(objectFunc) {
    return function(object, iteratee, thisArg) {
      if (typeof iteratee != 'function' || typeof thisArg != 'undefined') {
        iteratee = internal_bindCallback(iteratee, thisArg, 3);
      }
      return objectFunc(object, iteratee, object_keysIn);
    };
  }

  var internal_createForIn = createForIn;

  var forIn = internal_createForIn(internal_baseFor);

  var object_forIn = forIn;

  var forInRight = internal_createForIn(internal_baseForRight);

  var object_forInRight = forInRight;

  function createForOwn(objectFunc) {
    return function(object, iteratee, thisArg) {
      if (typeof iteratee != 'function' || typeof thisArg != 'undefined') {
        iteratee = internal_bindCallback(iteratee, thisArg, 3);
      }
      return objectFunc(object, iteratee);
    };
  }

  var internal_createForOwn = createForOwn;

  var forOwn = internal_createForOwn(internal_baseForOwn);

  var object_forOwn = forOwn;

  var forOwnRight = internal_createForOwn(internal_baseForOwnRight);

  var object_forOwnRight = forOwnRight;

  /** Used for native method references. */
  var object_has__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var object_has__hasOwnProperty = object_has__objectProto.hasOwnProperty;

  /**
   * Checks if `key` exists as a direct property of `object` instead of an
   * inherited property.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to inspect.
   * @param {string} key The key to check.
   * @returns {boolean} Returns `true` if `key` is a direct property, else `false`.
   * @example
   *
   * var object = { 'a': 1, 'b': 2, 'c': 3 };
   *
   * _.has(object, 'b');
   * // => true
   */
  function has(object, key) {
    return object ? object_has__hasOwnProperty.call(object, key) : false;
  }

  var object_has = has;

  var object_invert__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var object_invert__hasOwnProperty = object_invert__objectProto.hasOwnProperty;

  /**
   * Creates an object composed of the inverted keys and values of `object`.
   * If `object` contains duplicate values, subsequent values overwrite property
   * assignments of previous values unless `multiValue` is `true`.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to invert.
   * @param {boolean} [multiValue] Allow multiple values per key.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Object} Returns the new inverted object.
   * @example
   *
   * var object = { 'a': 1, 'b': 2, 'c': 1 };
   *
   * _.invert(object);
   * // => { '1': 'c', '2': 'b' }
   *
   * // with `multiValue`
   * _.invert(object, true);
   * // => { '1': ['a', 'c'], '2': ['b'] }
   */
  function invert(object, multiValue, guard) {
    if (guard && internal_isIterateeCall(object, multiValue, guard)) {
      multiValue = null;
    }
    var index = -1,
        props = object_keys(object),
        length = props.length,
        result = {};

    while (++index < length) {
      var key = props[index],
          value = object[key];

      if (multiValue) {
        if (object_invert__hasOwnProperty.call(result, value)) {
          result[value].push(key);
        } else {
          result[value] = [key];
        }
      }
      else {
        result[value] = key;
      }
    }
    return result;
  }

  var object_invert = invert;

  function mapValues(object, iteratee, thisArg) {
    var result = {};
    iteratee = internal_baseCallback(iteratee, thisArg, 3);

    internal_baseForOwn(object, function(value, key, object) {
      result[key] = iteratee(value, key, object);
    });
    return result;
  }

  var object_mapValues = mapValues;

  function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
    var length = stackA.length,
        srcValue = source[key];

    while (length--) {
      if (stackA[length] == srcValue) {
        object[key] = stackB[length];
        return;
      }
    }
    var value = object[key],
        result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
        isCommon = typeof result == 'undefined';

    if (isCommon) {
      result = srcValue;
      if (internal_isLength(srcValue.length) && (lang_isArray(srcValue) || lang_isTypedArray(srcValue))) {
        result = lang_isArray(value)
          ? value
          : ((value && value.length) ? internal_arrayCopy(value) : []);
      }
      else if (lang_isPlainObject(srcValue) || lang_isArguments(srcValue)) {
        result = lang_isArguments(value)
          ? lang_toPlainObject(value)
          : (lang_isPlainObject(value) ? value : {});
      }
      else {
        isCommon = false;
      }
    }
    // Add the source value to the stack of traversed objects and associate
    // it with its merged value.
    stackA.push(srcValue);
    stackB.push(result);

    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
    } else if (result === result ? (result !== value) : (value === value)) {
      object[key] = result;
    }
  }

  var internal_baseMergeDeep = baseMergeDeep;

  function baseMerge(object, source, customizer, stackA, stackB) {
    if (!lang_isObject(object)) {
      return object;
    }
    var isSrcArr = internal_isLength(source.length) && (lang_isArray(source) || lang_isTypedArray(source));
    (isSrcArr ? internal_arrayEach : internal_baseForOwn)(source, function(srcValue, key, source) {
      if (internal_isObjectLike(srcValue)) {
        stackA || (stackA = []);
        stackB || (stackB = []);
        return internal_baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
      }
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = typeof result == 'undefined';

      if (isCommon) {
        result = srcValue;
      }
      if ((isSrcArr || typeof result != 'undefined') &&
          (isCommon || (result === result ? (result !== value) : (value === value)))) {
        object[key] = result;
      }
    });
    return object;
  }

  var internal_baseMerge = baseMerge;

  var merge = internal_createAssigner(internal_baseMerge);

  var object_merge = merge;

  var methods = object_functions;

  function pickByArray(object, props) {
    object = internal_toObject(object);

    var index = -1,
        length = props.length,
        result = {};

    while (++index < length) {
      var key = props[index];
      if (key in object) {
        result[key] = object[key];
      }
    }
    return result;
  }

  var internal_pickByArray = pickByArray;

  function pickByCallback(object, predicate) {
    var result = {};
    internal_baseForIn(object, function(value, key, object) {
      if (predicate(value, key, object)) {
        result[key] = value;
      }
    });
    return result;
  }

  var internal_pickByCallback = pickByCallback;

  var omit = function_restParam(function(object, props) {
    if (object == null) {
      return {};
    }
    if (typeof props[0] != 'function') {
      var props = internal_arrayMap(internal_baseFlatten(props), String);
      return internal_pickByArray(object, internal_baseDifference(object_keysIn(object), props));
    }
    var predicate = internal_bindCallback(props[0], props[1], 3);
    return internal_pickByCallback(object, function(value, key, object) {
      return !predicate(value, key, object);
    });
  });

  var object_omit = omit;

  function pairs(object) {
    var index = -1,
        props = object_keys(object),
        length = props.length,
        result = Array(length);

    while (++index < length) {
      var key = props[index];
      result[index] = [key, object[key]];
    }
    return result;
  }

  var object_pairs = pairs;

  var pick = function_restParam(function(object, props) {
    if (object == null) {
      return {};
    }
    return typeof props[0] == 'function'
      ? internal_pickByCallback(object, internal_bindCallback(props[0], props[1], 3))
      : internal_pickByArray(object, internal_baseFlatten(props));
  });

  var object_pick = pick;

  function result(object, key, defaultValue) {
    var value = object == null ? undefined : object[key];
    if (typeof value == 'undefined') {
      value = defaultValue;
    }
    return lang_isFunction(value) ? value.call(object) : value;
  }

  var object_result = result;

  function transform(object, iteratee, accumulator, thisArg) {
    var isArr = lang_isArray(object) || lang_isTypedArray(object);
    iteratee = internal_baseCallback(iteratee, thisArg, 4);

    if (accumulator == null) {
      if (isArr || lang_isObject(object)) {
        var Ctor = object.constructor;
        if (isArr) {
          accumulator = lang_isArray(object) ? new Ctor : [];
        } else {
          accumulator = internal_baseCreate(lang_isFunction(Ctor) && Ctor.prototype);
        }
      } else {
        accumulator = {};
      }
    }
    (isArr ? internal_arrayEach : internal_baseForOwn)(object, function(value, index, object) {
      return iteratee(accumulator, value, index, object);
    });
    return accumulator;
  }

  var object_transform = transform;

  function valuesIn(object) {
    return internal_baseValues(object, object_keysIn(object));
  }

  var object_valuesIn = valuesIn;

  var _object = {
    'assign': object_assign,
    'create': object_create,
    'defaults': object_defaults,
    'extend': extend,
    'findKey': object_findKey,
    'findLastKey': object_findLastKey,
    'forIn': object_forIn,
    'forInRight': object_forInRight,
    'forOwn': object_forOwn,
    'forOwnRight': object_forOwnRight,
    'functions': object_functions,
    'has': object_has,
    'invert': object_invert,
    'keys': object_keys,
    'keysIn': object_keysIn,
    'mapValues': object_mapValues,
    'merge': object_merge,
    'methods': methods,
    'omit': object_omit,
    'pairs': object_pairs,
    'pick': object_pick,
    'result': object_result,
    'transform': object_transform,
    'values': object_values,
    'valuesIn': object_valuesIn
  };

  /** Used to map latin-1 supplementary letters to basic latin letters. */
  var deburredLetters = {
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss'
  };

  /**
   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  function deburrLetter(letter) {
    return deburredLetters[letter];
  }

  var internal_deburrLetter = deburrLetter;

  var reComboMarks = /[\u0300-\u036f\ufe20-\ufe23]/g;

  /** Used to match latin-1 supplementary letters (excluding mathematical operators). */
  var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

  /**
   * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
   * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to deburr.
   * @returns {string} Returns the deburred string.
   * @example
   *
   * _.deburr('déjà vu');
   * // => 'deja vu'
   */
  function deburr(string) {
    string = internal_baseToString(string);
    return string && string.replace(reLatin1, internal_deburrLetter).replace(reComboMarks, '');
  }

  var string_deburr = deburr;

  var reWords = (function() {
    var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
        lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

    return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
  }());

  /**
   * Splits `string` into an array of its words.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to inspect.
   * @param {RegExp|string} [pattern] The pattern to match words.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Array} Returns the words of `string`.
   * @example
   *
   * _.words('fred, barney, & pebbles');
   * // => ['fred', 'barney', 'pebbles']
   *
   * _.words('fred, barney, & pebbles', /[^, ]+/g);
   * // => ['fred', 'barney', '&', 'pebbles']
   */
  function words(string, pattern, guard) {
    if (guard && internal_isIterateeCall(string, pattern, guard)) {
      pattern = null;
    }
    string = internal_baseToString(string);
    return string.match(pattern || reWords) || [];
  }

  var string_words = words;

  function createCompounder(callback) {
    return function(string) {
      var index = -1,
          array = string_words(string_deburr(string)),
          length = array.length,
          result = '';

      while (++index < length) {
        result = callback(result, array[index], index);
      }
      return result;
    };
  }

  var internal_createCompounder = createCompounder;

  var camelCase = internal_createCompounder(function(result, word, index) {
    word = word.toLowerCase();
    return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
  });

  var string_camelCase = camelCase;

  function capitalize(string) {
    string = internal_baseToString(string);
    return string && (string.charAt(0).toUpperCase() + string.slice(1));
  }

  var string_capitalize = capitalize;

  var string_endsWith__nativeMin = Math.min;

  /**
   * Checks if `string` ends with the given target string.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to search.
   * @param {string} [target] The string to search for.
   * @param {number} [position=string.length] The position to search from.
   * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
   * @example
   *
   * _.endsWith('abc', 'c');
   * // => true
   *
   * _.endsWith('abc', 'b');
   * // => false
   *
   * _.endsWith('abc', 'b', 2);
   * // => true
   */
  function endsWith(string, target, position) {
    string = internal_baseToString(string);
    target = (target + '');

    var length = string.length;
    position = typeof position == 'undefined'
      ? length
      : string_endsWith__nativeMin(position < 0 ? 0 : (+position || 0), length);

    position -= target.length;
    return position >= 0 && string.indexOf(target, position) == position;
  }

  var string_endsWith = endsWith;

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
  };

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeHtmlChar(chr) {
    return htmlEscapes[chr];
  }

  var internal_escapeHtmlChar = escapeHtmlChar;

  var reUnescapedHtml = /[&<>"'`]/g,
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /**
   * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
   * their corresponding HTML entities.
   *
   * **Note:** No other characters are escaped. To escape additional characters
   * use a third-party library like [_he_](https://mths.be/he).
   *
   * Though the ">" character is escaped for symmetry, characters like
   * ">" and "/" don't require escaping in HTML and have no special meaning
   * unless they're part of a tag or unquoted attribute value.
   * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
   * (under "semi-related fun fact") for more details.
   *
   * Backticks are escaped because in Internet Explorer < 9, they can break out
   * of attribute values or HTML comments. See [#102](https://html5sec.org/#102),
   * [#108](https://html5sec.org/#108), and [#133](https://html5sec.org/#133) of
   * the [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
   *
   * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
   * to reduce XSS vectors.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to escape.
   * @returns {string} Returns the escaped string.
   * @example
   *
   * _.escape('fred, barney, & pebbles');
   * // => 'fred, barney, &amp; pebbles'
   */
  function string_escape__escape(string) {
    // Reset `lastIndex` because in IE < 9 `String#replace` does not.
    string = internal_baseToString(string);
    return (string && reHasUnescapedHtml.test(string))
      ? string.replace(reUnescapedHtml, internal_escapeHtmlChar)
      : string;
  }

  var string_escape = string_escape__escape;

  var kebabCase = internal_createCompounder(function(result, word, index) {
    return result + (index ? '-' : '') + word.toLowerCase();
  });

  var string_kebabCase = kebabCase;

  var string_repeat__floor = Math.floor;

  /* Native method references for those with the same name as other `lodash` methods. */
  var string_repeat__nativeIsFinite = internal_root.isFinite;

  /**
   * Repeats the given string `n` times.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to repeat.
   * @param {number} [n=0] The number of times to repeat the string.
   * @returns {string} Returns the repeated string.
   * @example
   *
   * _.repeat('*', 3);
   * // => '***'
   *
   * _.repeat('abc', 2);
   * // => 'abcabc'
   *
   * _.repeat('abc', 0);
   * // => ''
   */
  function repeat(string, n) {
    var result = '';
    string = internal_baseToString(string);
    n = +n;
    if (n < 1 || !string || !string_repeat__nativeIsFinite(n)) {
      return result;
    }
    // Leverage the exponentiation by squaring algorithm for a faster repeat.
    // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
    do {
      if (n % 2) {
        result += string;
      }
      n = string_repeat__floor(n / 2);
      string += string;
    } while (n);

    return result;
  }

  var string_repeat = repeat;

  var internal_createPadding__ceil = Math.ceil;

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_createPadding__nativeIsFinite = internal_root.isFinite;

  /**
   * Creates the padding required for `string` based on the given `length`.
   * The `chars` string is truncated if the number of characters exceeds `length`.
   *
   * @private
   * @param {string} string The string to create padding for.
   * @param {number} [length=0] The padding length.
   * @param {string} [chars=' '] The string used as padding.
   * @returns {string} Returns the pad for `string`.
   */
  function createPadding(string, length, chars) {
    var strLength = string.length;
    length = +length;

    if (strLength >= length || !internal_createPadding__nativeIsFinite(length)) {
      return '';
    }
    var padLength = length - strLength;
    chars = chars == null ? ' ' : (chars + '');
    return string_repeat(chars, internal_createPadding__ceil(padLength / chars.length)).slice(0, padLength);
  }

  var internal_createPadding = createPadding;

  var string_pad__ceil = Math.ceil,
      string_pad__floor = Math.floor;

  /* Native method references for those with the same name as other `lodash` methods. */
  var string_pad__nativeIsFinite = internal_root.isFinite;

  /**
   * Pads `string` on the left and right sides if it is shorter than `length`.
   * Padding characters are truncated if they can't be evenly divided by `length`.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to pad.
   * @param {number} [length=0] The padding length.
   * @param {string} [chars=' '] The string used as padding.
   * @returns {string} Returns the padded string.
   * @example
   *
   * _.pad('abc', 8);
   * // => '  abc   '
   *
   * _.pad('abc', 8, '_-');
   * // => '_-abc_-_'
   *
   * _.pad('abc', 3);
   * // => 'abc'
   */
  function pad(string, length, chars) {
    string = internal_baseToString(string);
    length = +length;

    var strLength = string.length;
    if (strLength >= length || !string_pad__nativeIsFinite(length)) {
      return string;
    }
    var mid = (length - strLength) / 2,
        leftLength = string_pad__floor(mid),
        rightLength = string_pad__ceil(mid);

    chars = internal_createPadding('', rightLength, chars);
    return chars.slice(0, leftLength) + string + chars;
  }

  var string_pad = pad;

  function createPadDir(fromRight) {
    return function(string, length, chars) {
      string = internal_baseToString(string);
      return string && ((fromRight ? string : '') + internal_createPadding(string, length, chars) + (fromRight ? '' : string));
    };
  }

  var internal_createPadDir = createPadDir;

  var padLeft = internal_createPadDir();

  var string_padLeft = padLeft;

  var padRight = internal_createPadDir(true);

  var string_padRight = padRight;

  /**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the first character not found in `chars`.
   */
  function charsLeftIndex(string, chars) {
    var index = -1,
        length = string.length;

    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }

  var internal_charsLeftIndex = charsLeftIndex;

  /**
   * Used by `_.trim` and `_.trimRight` to get the index of the last character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the last character not found in `chars`.
   */
  function charsRightIndex(string, chars) {
    var index = string.length;

    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }

  var internal_charsRightIndex = charsRightIndex;

  /**
   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
   * character code is whitespace.
   *
   * @private
   * @param {number} charCode The character code to inspect.
   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
   */
  function isSpace(charCode) {
    return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
      (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
  }

  var internal_isSpace = isSpace;

  function trimmedLeftIndex(string) {
    var index = -1,
        length = string.length;

    while (++index < length && internal_isSpace(string.charCodeAt(index))) {}
    return index;
  }

  var internal_trimmedLeftIndex = trimmedLeftIndex;

  function trimmedRightIndex(string) {
    var index = string.length;

    while (index-- && internal_isSpace(string.charCodeAt(index))) {}
    return index;
  }

  var internal_trimmedRightIndex = trimmedRightIndex;

  function trim(string, chars, guard) {
    var value = string;
    string = internal_baseToString(string);
    if (!string) {
      return string;
    }
    if (guard ? internal_isIterateeCall(value, chars, guard) : chars == null) {
      return string.slice(internal_trimmedLeftIndex(string), internal_trimmedRightIndex(string) + 1);
    }
    chars = (chars + '');
    return string.slice(internal_charsLeftIndex(string, chars), internal_charsRightIndex(string, chars) + 1);
  }

  var string_trim = trim;

  var reHexPrefix = /^0[xX]/;

  /** Used to detect and test for whitespace. */
  var whitespace = (
    // Basic whitespace characters.
    ' \t\x0b\f\xa0\ufeff' +

    // Line terminators.
    '\n\r\u2028\u2029' +

    // Unicode category "Zs" space separators.
    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
  );

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeParseInt = internal_root.parseInt;

  /**
   * Converts `string` to an integer of the specified radix. If `radix` is
   * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
   * in which case a `radix` of `16` is used.
   *
   * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
   * of `parseInt`.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} string The string to convert.
   * @param {number} [radix] The radix to interpret `value` by.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.parseInt('08');
   * // => 8
   *
   * _.map(['6', '08', '10'], _.parseInt);
   * // => [6, 8, 10]
   */
  function string_parseInt__parseInt(string, radix, guard) {
    if (guard && internal_isIterateeCall(string, radix, guard)) {
      radix = 0;
    }
    return nativeParseInt(string, radix);
  }
  // Fallback for environments with pre-ES5 implementations.
  if (nativeParseInt(whitespace + '08') != 8) {
    string_parseInt__parseInt = function(string, radix, guard) {
      // Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
      // Chrome fails to trim leading <BOM> whitespace characters.
      // See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
      if (guard ? internal_isIterateeCall(string, radix, guard) : radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      string = string_trim(string);
      return nativeParseInt(string, radix || (reHexPrefix.test(string) ? 16 : 10));
    };
  }

  var string_parseInt = string_parseInt__parseInt;

  var snakeCase = internal_createCompounder(function(result, word, index) {
    return result + (index ? '_' : '') + word.toLowerCase();
  });

  var string_snakeCase = snakeCase;

  var startCase = internal_createCompounder(function(result, word, index) {
    return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
  });

  var string_startCase = startCase;

  var string_startsWith__nativeMin = Math.min;

  /**
   * Checks if `string` starts with the given target string.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to search.
   * @param {string} [target] The string to search for.
   * @param {number} [position=0] The position to search from.
   * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
   * @example
   *
   * _.startsWith('abc', 'a');
   * // => true
   *
   * _.startsWith('abc', 'b');
   * // => false
   *
   * _.startsWith('abc', 'b', 1);
   * // => true
   */
  function startsWith(string, target, position) {
    string = internal_baseToString(string);
    position = position == null
      ? 0
      : string_startsWith__nativeMin(position < 0 ? 0 : (+position || 0), string.length);

    return string.lastIndexOf(target, position) == position;
  }

  var string_startsWith = startsWith;

  /** Used for native method references. */
  var internal_assignOwnDefaults__objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var internal_assignOwnDefaults__hasOwnProperty = internal_assignOwnDefaults__objectProto.hasOwnProperty;

  /**
   * Used by `_.template` to customize its `_.assign` use.
   *
   * **Note:** This method is like `assignDefaults` except that it ignores
   * inherited property values when checking if a property is `undefined`.
   *
   * @private
   * @param {*} objectValue The destination object property value.
   * @param {*} sourceValue The source object property value.
   * @param {string} key The key associated with the object and source values.
   * @param {Object} object The destination object.
   * @returns {*} Returns the value to assign to the destination object.
   */
  function assignOwnDefaults(objectValue, sourceValue, key, object) {
    return (typeof objectValue == 'undefined' || !internal_assignOwnDefaults__hasOwnProperty.call(object, key))
      ? sourceValue
      : objectValue;
  }

  var internal_assignOwnDefaults = assignOwnDefaults;

  var attempt = function_restParam(function(func, args) {
    try {
      return func.apply(undefined, args);
    } catch(e) {
      return lang_isError(e) ? e : new Error(e);
    }
  });

  var utility_attempt = attempt;

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /**
   * Used by `_.template` to escape characters for inclusion in compiled
   * string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  var internal_escapeStringChar = escapeStringChar;

  /** Used to match template delimiters. */
  var reInterpolate = /<%=([\s\S]+?)%>/g;

  var internal_reInterpolate = reInterpolate;

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g;

  var internal_reEscape = reEscape;

  /** Used to match template delimiters. */
  var reEvaluate = /<%([\s\S]+?)%>/g;

  var internal_reEvaluate = reEvaluate;

  var templateSettings = {

    /**
     * Used to detect `data` property values to be HTML-escaped.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'escape': internal_reEscape,

    /**
     * Used to detect code to be evaluated.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'evaluate': internal_reEvaluate,

    /**
     * Used to detect `data` property values to inject.
     *
     * @memberOf _.templateSettings
     * @type RegExp
     */
    'interpolate': internal_reInterpolate,

    /**
     * Used to reference the data object in the template text.
     *
     * @memberOf _.templateSettings
     * @type string
     */
    'variable': '',

    /**
     * Used to import variables into the compiled template.
     *
     * @memberOf _.templateSettings
     * @type Object
     */
    'imports': {

      /**
       * A reference to the `lodash` function.
       *
       * @memberOf _.templateSettings.imports
       * @type Function
       */
      '_': { 'escape': string_escape }
    }
  };

  var string_templateSettings = templateSettings;

  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /**
   * Used to match [ES template delimiters](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-template-literal-lexical-components).
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /**
   * Creates a compiled template function that can interpolate data properties
   * in "interpolate" delimiters, HTML-escape interpolated data properties in
   * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
   * properties may be accessed as free variables in the template. If a setting
   * object is provided it takes precedence over `_.templateSettings` values.
   *
   * **Note:** In the development build `_.template` utilizes
   * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
   * for easier debugging.
   *
   * For more information on precompiling templates see
   * [lodash's custom builds documentation](https://lodash.com/custom-builds).
   *
   * For more information on Chrome extension sandboxes see
   * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The template string.
   * @param {Object} [options] The options object.
   * @param {RegExp} [options.escape] The HTML "escape" delimiter.
   * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
   * @param {Object} [options.imports] An object to import into the template as free variables.
   * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
   * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
   * @param {string} [options.variable] The data object variable name.
   * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
   * @returns {Function} Returns the compiled template function.
   * @example
   *
   * // using the "interpolate" delimiter to create a compiled template
   * var compiled = _.template('hello <%= user %>!');
   * compiled({ 'user': 'fred' });
   * // => 'hello fred!'
   *
   * // using the HTML "escape" delimiter to escape data property values
   * var compiled = _.template('<b><%- value %></b>');
   * compiled({ 'value': '<script>' });
   * // => '<b>&lt;script&gt;</b>'
   *
   * // using the "evaluate" delimiter to execute JavaScript and generate HTML
   * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
   * compiled({ 'users': ['fred', 'barney'] });
   * // => '<li>fred</li><li>barney</li>'
   *
   * // using the internal `print` function in "evaluate" delimiters
   * var compiled = _.template('<% print("hello " + user); %>!');
   * compiled({ 'user': 'barney' });
   * // => 'hello barney!'
   *
   * // using the ES delimiter as an alternative to the default "interpolate" delimiter
   * var compiled = _.template('hello ${ user }!');
   * compiled({ 'user': 'pebbles' });
   * // => 'hello pebbles!'
   *
   * // using custom template delimiters
   * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
   * var compiled = _.template('hello {{ user }}!');
   * compiled({ 'user': 'mustache' });
   * // => 'hello mustache!'
   *
   * // using backslashes to treat delimiters as plain text
   * var compiled = _.template('<%= "\\<%- value %\\>" %>');
   * compiled({ 'value': 'ignored' });
   * // => '<%- value %>'
   *
   * // using the `imports` option to import `jQuery` as `jq`
   * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
   * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
   * compiled({ 'users': ['fred', 'barney'] });
   * // => '<li>fred</li><li>barney</li>'
   *
   * // using the `sourceURL` option to specify a custom sourceURL for the template
   * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
   * compiled(data);
   * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
   *
   * // using the `variable` option to ensure a with-statement isn't used in the compiled template
   * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
   * compiled.source;
   * // => function(data) {
   * //   var __t, __p = '';
   * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
   * //   return __p;
   * // }
   *
   * // using the `source` property to inline compiled templates for meaningful
   * // line numbers in error messages and a stack trace
   * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
   *   var JST = {\
   *     "main": ' + _.template(mainText).source + '\
   *   };\
   * ');
   */
  function template(string, options, otherOptions) {
    // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
    // and Laura Doktorova's doT.js (https://github.com/olado/doT).
    var settings = string_templateSettings.imports._.templateSettings || string_templateSettings;

    if (otherOptions && internal_isIterateeCall(string, options, otherOptions)) {
      options = otherOptions = null;
    }
    string = internal_baseToString(string);
    options = internal_baseAssign(internal_baseAssign({}, otherOptions || options), settings, internal_assignOwnDefaults);

    var imports = internal_baseAssign(internal_baseAssign({}, options.imports), settings.imports, internal_assignOwnDefaults),
        importsKeys = object_keys(imports),
        importsValues = internal_baseValues(imports, importsKeys);

    var isEscaping,
        isEvaluating,
        index = 0,
        interpolate = options.interpolate || reNoMatch,
        source = "__p += '";

    // Compile the regexp to match each delimiter.
    var reDelimiters = RegExp(
      (options.escape || reNoMatch).source + '|' +
      interpolate.source + '|' +
      (interpolate === internal_reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
      (options.evaluate || reNoMatch).source + '|$'
    , 'g');

    // Use a sourceURL for easier debugging.
    var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';

    string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
      interpolateValue || (interpolateValue = esTemplateValue);

      // Escape characters that can't be included in string literals.
      source += string.slice(index, offset).replace(reUnescapedString, internal_escapeStringChar);

      // Replace delimiters with snippets.
      if (escapeValue) {
        isEscaping = true;
        source += "' +\n__e(" + escapeValue + ") +\n'";
      }
      if (evaluateValue) {
        isEvaluating = true;
        source += "';\n" + evaluateValue + ";\n__p += '";
      }
      if (interpolateValue) {
        source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
      }
      index = offset + match.length;

      // The JS engine embedded in Adobe products requires returning the `match`
      // string in order to produce the correct `offset` value.
      return match;
    });

    source += "';\n";

    // If `variable` is not specified wrap a with-statement around the generated
    // code to add the data object to the top of the scope chain.
    var variable = options.variable;
    if (!variable) {
      source = 'with (obj) {\n' + source + '\n}\n';
    }
    // Cleanup code by stripping empty strings.
    source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
      .replace(reEmptyStringMiddle, '$1')
      .replace(reEmptyStringTrailing, '$1;');

    // Frame code as the function body.
    source = 'function(' + (variable || 'obj') + ') {\n' +
      (variable
        ? ''
        : 'obj || (obj = {});\n'
      ) +
      "var __t, __p = ''" +
      (isEscaping
         ? ', __e = _.escape'
         : ''
      ) +
      (isEvaluating
        ? ', __j = Array.prototype.join;\n' +
          "function print() { __p += __j.call(arguments, '') }\n"
        : ';\n'
      ) +
      source +
      'return __p\n}';

    var result = utility_attempt(function() {
      return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
    });

    // Provide the compiled function's source by its `toString` method or
    // the `source` property as a convenience for inlining compiled templates.
    result.source = source;
    if (lang_isError(result)) {
      throw result;
    }
    return result;
  }

  var string_template = template;

  function trimLeft(string, chars, guard) {
    var value = string;
    string = internal_baseToString(string);
    if (!string) {
      return string;
    }
    if (guard ? internal_isIterateeCall(value, chars, guard) : chars == null) {
      return string.slice(internal_trimmedLeftIndex(string));
    }
    return string.slice(internal_charsLeftIndex(string, (chars + '')));
  }

  var string_trimLeft = trimLeft;

  function trimRight(string, chars, guard) {
    var value = string;
    string = internal_baseToString(string);
    if (!string) {
      return string;
    }
    if (guard ? internal_isIterateeCall(value, chars, guard) : chars == null) {
      return string.slice(0, internal_trimmedRightIndex(string) + 1);
    }
    return string.slice(0, internal_charsRightIndex(string, (chars + '')) + 1);
  }

  var string_trimRight = trimRight;

  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to match `RegExp` flags from their coerced string values. */
  var string_trunc__reFlags = /\w*$/;

  /**
   * Truncates `string` if it is longer than the given maximum string length.
   * The last characters of the truncated string are replaced with the omission
   * string which defaults to "...".
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to truncate.
   * @param {Object|number} [options] The options object or maximum string length.
   * @param {number} [options.length=30] The maximum string length.
   * @param {string} [options.omission='...'] The string to indicate text is omitted.
   * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {string} Returns the truncated string.
   * @example
   *
   * _.trunc('hi-diddly-ho there, neighborino');
   * // => 'hi-diddly-ho there, neighbo...'
   *
   * _.trunc('hi-diddly-ho there, neighborino', 24);
   * // => 'hi-diddly-ho there, n...'
   *
   * _.trunc('hi-diddly-ho there, neighborino', {
   *   'length': 24,
   *   'separator': ' '
   * });
   * // => 'hi-diddly-ho there,...'
   *
   * _.trunc('hi-diddly-ho there, neighborino', {
   *   'length': 24,
   *   'separator': /,? +/
   * });
   * // => 'hi-diddly-ho there...'
   *
   * _.trunc('hi-diddly-ho there, neighborino', {
   *   'omission': ' [...]'
   * });
   * // => 'hi-diddly-ho there, neig [...]'
   */
  function trunc(string, options, guard) {
    if (guard && internal_isIterateeCall(string, options, guard)) {
      options = null;
    }
    var length = DEFAULT_TRUNC_LENGTH,
        omission = DEFAULT_TRUNC_OMISSION;

    if (options != null) {
      if (lang_isObject(options)) {
        var separator = 'separator' in options ? options.separator : separator;
        length = 'length' in options ? (+options.length || 0) : length;
        omission = 'omission' in options ? internal_baseToString(options.omission) : omission;
      } else {
        length = +options || 0;
      }
    }
    string = internal_baseToString(string);
    if (length >= string.length) {
      return string;
    }
    var end = length - omission.length;
    if (end < 1) {
      return omission;
    }
    var result = string.slice(0, end);
    if (separator == null) {
      return result + omission;
    }
    if (lang_isRegExp(separator)) {
      if (string.slice(end).search(separator)) {
        var match,
            newEnd,
            substring = string.slice(0, end);

        if (!separator.global) {
          separator = RegExp(separator.source, (string_trunc__reFlags.exec(separator) || '') + 'g');
        }
        separator.lastIndex = 0;
        while ((match = separator.exec(substring))) {
          newEnd = match.index;
        }
        result = result.slice(0, newEnd == null ? end : newEnd);
      }
    } else if (string.indexOf(separator, end) != end) {
      var index = result.lastIndexOf(separator);
      if (index > -1) {
        result = result.slice(0, index);
      }
    }
    return result + omission;
  }

  var string_trunc = trunc;

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#96;': '`'
  };

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  function unescapeHtmlChar(chr) {
    return htmlUnescapes[chr];
  }

  var internal_unescapeHtmlChar = unescapeHtmlChar;

  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source);

  /**
   * The inverse of `_.escape`; this method converts the HTML entities
   * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
   * corresponding characters.
   *
   * **Note:** No other HTML entities are unescaped. To unescape additional HTML
   * entities use a third-party library like [_he_](https://mths.be/he).
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to unescape.
   * @returns {string} Returns the unescaped string.
   * @example
   *
   * _.unescape('fred, barney, &amp; pebbles');
   * // => 'fred, barney, & pebbles'
   */
  function string_unescape__unescape(string) {
    string = internal_baseToString(string);
    return (string && reHasEscapedHtml.test(string))
      ? string.replace(reEscapedHtml, internal_unescapeHtmlChar)
      : string;
  }

  var string_unescape = string_unescape__unescape;

  var _string = {
    'camelCase': string_camelCase,
    'capitalize': string_capitalize,
    'deburr': string_deburr,
    'endsWith': string_endsWith,
    'escape': string_escape,
    'escapeRegExp': string_escapeRegExp,
    'kebabCase': string_kebabCase,
    'pad': string_pad,
    'padLeft': string_padLeft,
    'padRight': string_padRight,
    'parseInt': string_parseInt,
    'repeat': string_repeat,
    'snakeCase': string_snakeCase,
    'startCase': string_startCase,
    'startsWith': string_startsWith,
    'template': string_template,
    'templateSettings': string_templateSettings,
    'trim': string_trim,
    'trimLeft': string_trimLeft,
    'trimRight': string_trimRight,
    'trunc': string_trunc,
    'unescape': string_unescape,
    'words': string_words
  };

  function matches(source) {
    return internal_baseMatches(internal_baseClone(source, true));
  }

  var utility_matches = matches;

  function callback(func, thisArg, guard) {
    if (guard && internal_isIterateeCall(func, thisArg, guard)) {
      thisArg = null;
    }
    return internal_isObjectLike(func)
      ? utility_matches(func)
      : internal_baseCallback(func, thisArg);
  }

  var utility_callback = callback;

  var utility_iteratee = utility_callback;

  function matchesProperty(key, value) {
    return internal_baseMatchesProperty(key + '', internal_baseClone(value, true));
  }

  var utility_matchesProperty = matchesProperty;

  var _mixin__arrayProto = Array.prototype;

  /** Native method references. */
  var _mixin__push = _mixin__arrayProto.push;

  /**
   * Adds all own enumerable function properties of a source object to the
   * destination object. If `object` is a function then methods are added to
   * its prototype as well.
   *
   * **Note:** Use `_.runInContext` to create a pristine `lodash` function
   * for mixins to avoid conflicts caused by modifying the original.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Function|Object} [object=this] object The destination object.
   * @param {Object} source The object of functions to add.
   * @param {Object} [options] The options object.
   * @param {boolean} [options.chain=true] Specify whether the functions added
   *  are chainable.
   * @returns {Function|Object} Returns `object`.
   * @example
   *
   * function vowels(string) {
   *   return _.filter(string, function(v) {
   *     return /[aeiou]/i.test(v);
   *   });
   * }
   *
   * // use `_.runInContext` to avoid conflicts (esp. in Node.js)
   * var _ = require('lodash').runInContext();
   *
   * _.mixin({ 'vowels': vowels });
   * _.vowels('fred');
   * // => ['e']
   *
   * _('fred').vowels().value();
   * // => ['e']
   *
   * _.mixin({ 'vowels': vowels }, { 'chain': false });
   * _('fred').vowels();
   * // => ['e']
   */
  function _mixin__mixin(object, source, options) {
    var methodNames = internal_baseFunctions(source, object_keys(source));

    var chain = true,
        index = -1,
        isFunc = lang_isFunction(object),
        length = methodNames.length;

    if (options === false) {
      chain = false;
    } else if (lang_isObject(options) && 'chain' in options) {
      chain = options.chain;
    }
    while (++index < length) {
      var methodName = methodNames[index],
          func = source[methodName];

      object[methodName] = func;
      if (isFunc) {
        object.prototype[methodName] = (function(func) {
          return function() {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = internal_arrayCopy(this.__actions__);

              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
              result.__chain__ = chainAll;
              return result;
            }
            var args = [this.value()];
            _mixin__push.apply(args, arguments);
            return func.apply(object, args);
          };
        }(func));
      }
    }
    return object;
  }

  var _mixin = _mixin__mixin;

  function property(key) {
    return internal_baseProperty(key + '');
  }

  var utility_property = property;

  /**
   * The opposite of `_.property`; this method creates a function which returns
   * the property value of a given key on `object`.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Object} object The object to inspect.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var object = { 'a': 3, 'b': 1, 'c': 2 };
   *
   * _.map(['a', 'c'], _.propertyOf(object));
   * // => [3, 2]
   *
   * _.sortBy(['a', 'b', 'c'], _.propertyOf(object));
   * // => ['b', 'c', 'a']
   */
  function propertyOf(object) {
    return function(key) {
      return object == null ? undefined : object[key];
    };
  }

  var utility_propertyOf = propertyOf;

  var utility_range__ceil = Math.ceil;

  /* Native method references for those with the same name as other `lodash` methods. */
  var utility_range__nativeMax = Math.max;

  /**
   * Creates an array of numbers (positive and/or negative) progressing from
   * `start` up to, but not including, `end`. If `end` is not specified it is
   * set to `start` with `start` then set to `0`. If `start` is less than `end`
   * a zero-length range is created unless a negative `step` is specified.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {number} [start=0] The start of the range.
   * @param {number} end The end of the range.
   * @param {number} [step=1] The value to increment or decrement by.
   * @returns {Array} Returns the new array of numbers.
   * @example
   *
   * _.range(4);
   * // => [0, 1, 2, 3]
   *
   * _.range(1, 5);
   * // => [1, 2, 3, 4]
   *
   * _.range(0, 20, 5);
   * // => [0, 5, 10, 15]
   *
   * _.range(0, -4, -1);
   * // => [0, -1, -2, -3]
   *
   * _.range(1, 4, 0);
   * // => [1, 1, 1]
   *
   * _.range(0);
   * // => []
   */
  function range(start, end, step) {
    if (step && internal_isIterateeCall(start, end, step)) {
      end = step = null;
    }
    start = +start || 0;
    step = step == null ? 1 : (+step || 0);

    if (end == null) {
      end = start;
      start = 0;
    } else {
      end = +end || 0;
    }
    // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
    // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
    var index = -1,
        length = utility_range__nativeMax(utility_range__ceil((end - start) / (step || 1)), 0),
        result = Array(length);

    while (++index < length) {
      result[index] = start;
      start += step;
    }
    return result;
  }

  var utility_range = range;

  var utility_times__nativeIsFinite = internal_root.isFinite,
      utility_times__nativeMin = Math.min;

  /** Used as references for the maximum length and index of an array. */
  var utility_times__MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

  /**
   * Invokes the iteratee function `n` times, returning an array of the results
   * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
   * one argument; (index).
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {Array} Returns the array of results.
   * @example
   *
   * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
   * // => [3, 6, 4]
   *
   * _.times(3, function(n) {
   *   mage.castSpell(n);
   * });
   * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2` respectively
   *
   * _.times(3, function(n) {
   *   this.cast(n);
   * }, mage);
   * // => also invokes `mage.castSpell(n)` three times
   */
  function times(n, iteratee, thisArg) {
    n = +n;

    // Exit early to avoid a JSC JIT bug in Safari 8
    // where `Array(0)` is treated as `Array(1)`.
    if (n < 1 || !utility_times__nativeIsFinite(n)) {
      return [];
    }
    var index = -1,
        result = Array(utility_times__nativeMin(n, utility_times__MAX_ARRAY_LENGTH));

    iteratee = internal_bindCallback(iteratee, thisArg, 1);
    while (++index < n) {
      if (index < utility_times__MAX_ARRAY_LENGTH) {
        result[index] = iteratee(index);
      } else {
        iteratee(index);
      }
    }
    return result;
  }

  var utility_times = times;

  var idCounter = 0;

  /**
   * Generates a unique ID. If `prefix` is provided the ID is appended to it.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {string} [prefix] The value to prefix the ID with.
   * @returns {string} Returns the unique ID.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   *
   * _.uniqueId();
   * // => '105'
   */
  function uniqueId(prefix) {
    var id = ++idCounter;
    return internal_baseToString(prefix) + id;
  }

  var utility_uniqueId = uniqueId;

  var utility = {
    'attempt': utility_attempt,
    'callback': utility_callback,
    'constant': utility_constant,
    'identity': utility_identity,
    'iteratee': utility_iteratee,
    'matches': utility_matches,
    'matchesProperty': utility_matchesProperty,
    'mixin': _mixin,
    'noop': utility_noop,
    'property': utility_property,
    'propertyOf': utility_propertyOf,
    'range': utility_range,
    'times': utility_times,
    'uniqueId': utility_uniqueId
  };

  function lazyClone() {
    var actions = this.__actions__,
        iteratees = this.__iteratees__,
        views = this.__views__,
        result = new internal_LazyWrapper(this.__wrapped__);

    result.__actions__ = actions ? internal_arrayCopy(actions) : null;
    result.__dir__ = this.__dir__;
    result.__filtered__ = this.__filtered__;
    result.__iteratees__ = iteratees ? internal_arrayCopy(iteratees) : null;
    result.__takeCount__ = this.__takeCount__;
    result.__views__ = views ? internal_arrayCopy(views) : null;
    return result;
  }

  var internal_lazyClone = lazyClone;

  function lazyReverse() {
    if (this.__filtered__) {
      var result = new internal_LazyWrapper(this);
      result.__dir__ = -1;
      result.__filtered__ = true;
    } else {
      result = this.clone();
      result.__dir__ *= -1;
    }
    return result;
  }

  var internal_lazyReverse = lazyReverse;

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_getView__nativeMax = Math.max,
      internal_getView__nativeMin = Math.min;

  /**
   * Gets the view, applying any `transforms` to the `start` and `end` positions.
   *
   * @private
   * @param {number} start The start of the view.
   * @param {number} end The end of the view.
   * @param {Array} [transforms] The transformations to apply to the view.
   * @returns {Object} Returns an object containing the `start` and `end`
   *  positions of the view.
   */
  function getView(start, end, transforms) {
    var index = -1,
        length = transforms ? transforms.length : 0;

    while (++index < length) {
      var data = transforms[index],
          size = data.size;

      switch (data.type) {
        case 'drop':      start += size; break;
        case 'dropRight': end -= size; break;
        case 'take':      end = internal_getView__nativeMin(end, start + size); break;
        case 'takeRight': start = internal_getView__nativeMax(start, end - size); break;
      }
    }
    return { 'start': start, 'end': end };
  }

  var internal_getView = getView;

  var internal_lazyValue__LAZY_DROP_WHILE_FLAG = 0,
      LAZY_FILTER_FLAG = 1,
      internal_lazyValue__LAZY_MAP_FLAG = 2;

  /* Native method references for those with the same name as other `lodash` methods. */
  var internal_lazyValue__nativeMin = Math.min;

  /**
   * Extracts the unwrapped value from its lazy wrapper.
   *
   * @private
   * @name value
   * @memberOf LazyWrapper
   * @returns {*} Returns the unwrapped value.
   */
  function lazyValue() {
    var array = this.__wrapped__.value();
    if (!lang_isArray(array)) {
      return internal_baseWrapperValue(array, this.__actions__);
    }
    var dir = this.__dir__,
        isRight = dir < 0,
        view = internal_getView(0, array.length, this.__views__),
        start = view.start,
        end = view.end,
        length = end - start,
        index = isRight ? end : (start - 1),
        takeCount = internal_lazyValue__nativeMin(length, this.__takeCount__),
        iteratees = this.__iteratees__,
        iterLength = iteratees ? iteratees.length : 0,
        resIndex = 0,
        result = [];

    outer:
    while (length-- && resIndex < takeCount) {
      index += dir;

      var iterIndex = -1,
          value = array[index];

      while (++iterIndex < iterLength) {
        var data = iteratees[iterIndex],
            iteratee = data.iteratee,
            type = data.type;

        if (type == internal_lazyValue__LAZY_DROP_WHILE_FLAG) {
          if (data.done && (isRight ? (index > data.index) : (index < data.index))) {
            data.count = 0;
            data.done = false;
          }
          data.index = index;
          if (!data.done) {
            var limit = data.limit;
            if (!(data.done = limit > -1 ? (data.count++ >= limit) : !iteratee(value))) {
              continue outer;
            }
          }
        } else {
          var computed = iteratee(value);
          if (type == internal_lazyValue__LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
      }
      result[resIndex++] = value;
    }
    return result;
  }

  var internal_lazyValue = lazyValue;

  /**
   * @license
   * lodash 3.6.0 (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize modern exports="es" -o ./`
   * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
   * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
   * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   * Available under MIT license <https://lodash.com/license>
   */
  var VERSION = '3.6.0';

  /** Used to compose bitmasks for wrapper metadata. */
  var _lodash__BIND_KEY_FLAG = 2;

  /** Used to indicate the type of lazy iteratees. */
  var _lodash__LAZY_DROP_WHILE_FLAG = 0,
      _lodash__LAZY_MAP_FLAG = 2;

  /** Used for native method references. */
  var _lodash__arrayProto = Array.prototype,
      stringProto = String.prototype;

  /** Native method references. */
  var _lodash__floor = Math.floor,
      _lodash__push = _lodash__arrayProto.push;

  /* Native method references for those with the same name as other `lodash` methods. */
  var _lodash__nativeMax = Math.max,
      _lodash__nativeMin = Math.min;

  // wrap `_.mixin` so it works when provided only one argument
  var _lodash__mixin = (function(func) {
    return function(object, source, options) {
      if (options == null) {
        var isObj = lang_isObject(source),
            props = isObj && object_keys(source),
            methodNames = props && props.length && internal_baseFunctions(source, props);

        if (!(methodNames ? methodNames.length : isObj)) {
          options = source;
          source = object;
          object = this;
        }
      }
      return func(object, source, options);
    };
  }(_mixin));

  // Add functions that return wrapped values when chaining.
  chain_lodash.after = _function.after;
  chain_lodash.ary = _function.ary;
  chain_lodash.assign = _object.assign;
  chain_lodash.at = _collection.at;
  chain_lodash.before = _function.before;
  chain_lodash.bind = _function.bind;
  chain_lodash.bindAll = _function.bindAll;
  chain_lodash.bindKey = _function.bindKey;
  chain_lodash.callback = utility.callback;
  chain_lodash.chain = _chain.chain;
  chain_lodash.chunk = _array.chunk;
  chain_lodash.compact = _array.compact;
  chain_lodash.constant = utility.constant;
  chain_lodash.countBy = _collection.countBy;
  chain_lodash.create = _object.create;
  chain_lodash.curry = _function.curry;
  chain_lodash.curryRight = _function.curryRight;
  chain_lodash.debounce = _function.debounce;
  chain_lodash.defaults = _object.defaults;
  chain_lodash.defer = _function.defer;
  chain_lodash.delay = _function.delay;
  chain_lodash.difference = _array.difference;
  chain_lodash.drop = _array.drop;
  chain_lodash.dropRight = _array.dropRight;
  chain_lodash.dropRightWhile = _array.dropRightWhile;
  chain_lodash.dropWhile = _array.dropWhile;
  chain_lodash.fill = _array.fill;
  chain_lodash.filter = _collection.filter;
  chain_lodash.flatten = _array.flatten;
  chain_lodash.flattenDeep = _array.flattenDeep;
  chain_lodash.flow = _function.flow;
  chain_lodash.flowRight = _function.flowRight;
  chain_lodash.forEach = _collection.forEach;
  chain_lodash.forEachRight = _collection.forEachRight;
  chain_lodash.forIn = _object.forIn;
  chain_lodash.forInRight = _object.forInRight;
  chain_lodash.forOwn = _object.forOwn;
  chain_lodash.forOwnRight = _object.forOwnRight;
  chain_lodash.functions = _object.functions;
  chain_lodash.groupBy = _collection.groupBy;
  chain_lodash.indexBy = _collection.indexBy;
  chain_lodash.initial = _array.initial;
  chain_lodash.intersection = _array.intersection;
  chain_lodash.invert = _object.invert;
  chain_lodash.invoke = _collection.invoke;
  chain_lodash.keys = object_keys;
  chain_lodash.keysIn = _object.keysIn;
  chain_lodash.map = _collection.map;
  chain_lodash.mapValues = _object.mapValues;
  chain_lodash.matches = utility.matches;
  chain_lodash.matchesProperty = utility.matchesProperty;
  chain_lodash.memoize = _function.memoize;
  chain_lodash.merge = _object.merge;
  chain_lodash.mixin = _lodash__mixin;
  chain_lodash.negate = _function.negate;
  chain_lodash.omit = _object.omit;
  chain_lodash.once = _function.once;
  chain_lodash.pairs = _object.pairs;
  chain_lodash.partial = _function.partial;
  chain_lodash.partialRight = _function.partialRight;
  chain_lodash.partition = _collection.partition;
  chain_lodash.pick = _object.pick;
  chain_lodash.pluck = _collection.pluck;
  chain_lodash.property = utility.property;
  chain_lodash.propertyOf = utility.propertyOf;
  chain_lodash.pull = _array.pull;
  chain_lodash.pullAt = _array.pullAt;
  chain_lodash.range = utility.range;
  chain_lodash.rearg = _function.rearg;
  chain_lodash.reject = _collection.reject;
  chain_lodash.remove = _array.remove;
  chain_lodash.rest = _array.rest;
  chain_lodash.restParam = _function.restParam;
  chain_lodash.shuffle = _collection.shuffle;
  chain_lodash.slice = _array.slice;
  chain_lodash.sortBy = _collection.sortBy;
  chain_lodash.sortByAll = _collection.sortByAll;
  chain_lodash.sortByOrder = _collection.sortByOrder;
  chain_lodash.spread = _function.spread;
  chain_lodash.take = _array.take;
  chain_lodash.takeRight = _array.takeRight;
  chain_lodash.takeRightWhile = _array.takeRightWhile;
  chain_lodash.takeWhile = _array.takeWhile;
  chain_lodash.tap = _chain.tap;
  chain_lodash.throttle = _function.throttle;
  chain_lodash.thru = chain_thru;
  chain_lodash.times = utility.times;
  chain_lodash.toArray = lang.toArray;
  chain_lodash.toPlainObject = lang.toPlainObject;
  chain_lodash.transform = _object.transform;
  chain_lodash.union = _array.union;
  chain_lodash.uniq = _array.uniq;
  chain_lodash.unzip = _array.unzip;
  chain_lodash.values = _object.values;
  chain_lodash.valuesIn = _object.valuesIn;
  chain_lodash.where = _collection.where;
  chain_lodash.without = _array.without;
  chain_lodash.wrap = _function.wrap;
  chain_lodash.xor = _array.xor;
  chain_lodash.zip = _array.zip;
  chain_lodash.zipObject = _array.zipObject;

  // Add aliases.
  chain_lodash.backflow = _function.flowRight;
  chain_lodash.collect = _collection.map;
  chain_lodash.compose = _function.flowRight;
  chain_lodash.each = _collection.forEach;
  chain_lodash.eachRight = _collection.forEachRight;
  chain_lodash.extend = _object.assign;
  chain_lodash.iteratee = utility.callback;
  chain_lodash.methods = _object.functions;
  chain_lodash.object = _array.zipObject;
  chain_lodash.select = _collection.filter;
  chain_lodash.tail = _array.rest;
  chain_lodash.unique = _array.uniq;

  // Add functions to `lodash.prototype`.
  _lodash__mixin(chain_lodash, chain_lodash);

  // Add functions that return unwrapped values when chaining.
  chain_lodash.add = math.add;
  chain_lodash.attempt = utility.attempt;
  chain_lodash.camelCase = _string.camelCase;
  chain_lodash.capitalize = _string.capitalize;
  chain_lodash.clone = lang.clone;
  chain_lodash.cloneDeep = lang.cloneDeep;
  chain_lodash.deburr = _string.deburr;
  chain_lodash.endsWith = _string.endsWith;
  chain_lodash.escape = _string.escape;
  chain_lodash.escapeRegExp = _string.escapeRegExp;
  chain_lodash.every = _collection.every;
  chain_lodash.find = _collection.find;
  chain_lodash.findIndex = _array.findIndex;
  chain_lodash.findKey = _object.findKey;
  chain_lodash.findLast = _collection.findLast;
  chain_lodash.findLastIndex = _array.findLastIndex;
  chain_lodash.findLastKey = _object.findLastKey;
  chain_lodash.findWhere = _collection.findWhere;
  chain_lodash.first = _array.first;
  chain_lodash.has = _object.has;
  chain_lodash.identity = utility_identity;
  chain_lodash.includes = _collection.includes;
  chain_lodash.indexOf = _array.indexOf;
  chain_lodash.inRange = number.inRange;
  chain_lodash.isArguments = lang.isArguments;
  chain_lodash.isArray = lang_isArray;
  chain_lodash.isBoolean = lang.isBoolean;
  chain_lodash.isDate = lang.isDate;
  chain_lodash.isElement = lang.isElement;
  chain_lodash.isEmpty = lang.isEmpty;
  chain_lodash.isEqual = lang.isEqual;
  chain_lodash.isError = lang.isError;
  chain_lodash.isFinite = lang.isFinite;
  chain_lodash.isFunction = lang.isFunction;
  chain_lodash.isMatch = lang.isMatch;
  chain_lodash.isNaN = lang.isNaN;
  chain_lodash.isNative = lang.isNative;
  chain_lodash.isNull = lang.isNull;
  chain_lodash.isNumber = lang.isNumber;
  chain_lodash.isObject = lang_isObject;
  chain_lodash.isPlainObject = lang.isPlainObject;
  chain_lodash.isRegExp = lang.isRegExp;
  chain_lodash.isString = lang.isString;
  chain_lodash.isTypedArray = lang.isTypedArray;
  chain_lodash.isUndefined = lang.isUndefined;
  chain_lodash.kebabCase = _string.kebabCase;
  chain_lodash.last = array_last;
  chain_lodash.lastIndexOf = _array.lastIndexOf;
  chain_lodash.max = math.max;
  chain_lodash.min = math.min;
  chain_lodash.noop = utility.noop;
  chain_lodash.now = date.now;
  chain_lodash.pad = _string.pad;
  chain_lodash.padLeft = _string.padLeft;
  chain_lodash.padRight = _string.padRight;
  chain_lodash.parseInt = _string.parseInt;
  chain_lodash.random = number.random;
  chain_lodash.reduce = _collection.reduce;
  chain_lodash.reduceRight = _collection.reduceRight;
  chain_lodash.repeat = _string.repeat;
  chain_lodash.result = _object.result;
  chain_lodash.size = _collection.size;
  chain_lodash.snakeCase = _string.snakeCase;
  chain_lodash.some = _collection.some;
  chain_lodash.sortedIndex = _array.sortedIndex;
  chain_lodash.sortedLastIndex = _array.sortedLastIndex;
  chain_lodash.startCase = _string.startCase;
  chain_lodash.startsWith = _string.startsWith;
  chain_lodash.sum = math.sum;
  chain_lodash.template = _string.template;
  chain_lodash.trim = _string.trim;
  chain_lodash.trimLeft = _string.trimLeft;
  chain_lodash.trimRight = _string.trimRight;
  chain_lodash.trunc = _string.trunc;
  chain_lodash.unescape = _string.unescape;
  chain_lodash.uniqueId = utility.uniqueId;
  chain_lodash.words = _string.words;

  // Add aliases.
  chain_lodash.all = _collection.every;
  chain_lodash.any = _collection.some;
  chain_lodash.contains = _collection.includes;
  chain_lodash.detect = _collection.find;
  chain_lodash.foldl = _collection.reduce;
  chain_lodash.foldr = _collection.reduceRight;
  chain_lodash.head = _array.first;
  chain_lodash.include = _collection.includes;
  chain_lodash.inject = _collection.reduce;

  _lodash__mixin(chain_lodash, (function() {
    var source = {};
    internal_baseForOwn(chain_lodash, function(func, methodName) {
      if (!chain_lodash.prototype[methodName]) {
        source[methodName] = func;
      }
    });
    return source;
  }()), false);

  // Add functions capable of returning wrapped and unwrapped values when chaining.
  chain_lodash.sample = _collection.sample;

  chain_lodash.prototype.sample = function(n) {
    if (!this.__chain__ && n == null) {
      return _collection.sample(this.value());
    }
    return this.thru(function(value) {
      return _collection.sample(value, n);
    });
  };

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type string
   */
  chain_lodash.VERSION = VERSION;

  chain_lodash.support = _support;
  (chain_lodash.templateSettings = _string.templateSettings).imports._ = chain_lodash;

  // Assign default placeholders.
  internal_arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
    chain_lodash[methodName].placeholder = chain_lodash;
  });

  // Add `LazyWrapper` methods that accept an `iteratee` value.
  internal_arrayEach(['dropWhile', 'filter', 'map', 'takeWhile'], function(methodName, type) {
    var isFilter = type != _lodash__LAZY_MAP_FLAG,
        isDropWhile = type == _lodash__LAZY_DROP_WHILE_FLAG;

    internal_LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
      var filtered = this.__filtered__,
          result = (filtered && isDropWhile) ? new internal_LazyWrapper(this) : this.clone(),
          iteratees = result.__iteratees__ || (result.__iteratees__ = []);

      iteratees.push({
        'done': false,
        'count': 0,
        'index': 0,
        'iteratee': internal_baseCallback(iteratee, thisArg, 1),
        'limit': -1,
        'type': type
      });

      result.__filtered__ = filtered || isFilter;
      return result;
    };
  });

  // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
  internal_arrayEach(['drop', 'take'], function(methodName, index) {
    var whileName = methodName + 'While';

    internal_LazyWrapper.prototype[methodName] = function(n) {
      var filtered = this.__filtered__,
          result = (filtered && !index) ? this.dropWhile() : this.clone();

      n = n == null ? 1 : _lodash__nativeMax(_lodash__floor(n) || 0, 0);
      if (filtered) {
        if (index) {
          result.__takeCount__ = _lodash__nativeMin(result.__takeCount__, n);
        } else {
          array_last(result.__iteratees__).limit = n;
        }
      } else {
        var views = result.__views__ || (result.__views__ = []);
        views.push({ 'size': n, 'type': methodName + (result.__dir__ < 0 ? 'Right' : '') });
      }
      return result;
    };

    internal_LazyWrapper.prototype[methodName + 'Right'] = function(n) {
      return this.reverse()[methodName](n).reverse();
    };

    internal_LazyWrapper.prototype[methodName + 'RightWhile'] = function(predicate, thisArg) {
      return this.reverse()[whileName](predicate, thisArg).reverse();
    };
  });

  // Add `LazyWrapper` methods for `_.first` and `_.last`.
  internal_arrayEach(['first', 'last'], function(methodName, index) {
    var takeName = 'take' + (index ? 'Right' : '');

    internal_LazyWrapper.prototype[methodName] = function() {
      return this[takeName](1).value()[0];
    };
  });

  // Add `LazyWrapper` methods for `_.initial` and `_.rest`.
  internal_arrayEach(['initial', 'rest'], function(methodName, index) {
    var dropName = 'drop' + (index ? '' : 'Right');

    internal_LazyWrapper.prototype[methodName] = function() {
      return this[dropName](1);
    };
  });

  // Add `LazyWrapper` methods for `_.pluck` and `_.where`.
  internal_arrayEach(['pluck', 'where'], function(methodName, index) {
    var operationName = index ? 'filter' : 'map',
        createCallback = index ? internal_baseMatches : internal_baseProperty;

    internal_LazyWrapper.prototype[methodName] = function(value) {
      return this[operationName](createCallback(value));
    };
  });

  internal_LazyWrapper.prototype.compact = function() {
    return this.filter(utility_identity);
  };

  internal_LazyWrapper.prototype.reject = function(predicate, thisArg) {
    predicate = internal_baseCallback(predicate, thisArg, 1);
    return this.filter(function(value) {
      return !predicate(value);
    });
  };

  internal_LazyWrapper.prototype.slice = function(start, end) {
    start = start == null ? 0 : (+start || 0);
    var result = start < 0 ? this.takeRight(-start) : this.drop(start);

    if (typeof end != 'undefined') {
      end = (+end || 0);
      result = end < 0 ? result.dropRight(-end) : result.take(end - start);
    }
    return result;
  };

  internal_LazyWrapper.prototype.toArray = function() {
    return this.drop(0);
  };

  // Add `LazyWrapper` methods to `lodash.prototype`.
  internal_baseForOwn(internal_LazyWrapper.prototype, function(func, methodName) {
    var lodashFunc = chain_lodash[methodName];
    if (!lodashFunc) {
      return;
    }
    var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
        retUnwrapped = /^(?:first|last)$/.test(methodName);

    chain_lodash.prototype[methodName] = function() {
      var args = arguments,
          length = args.length,
          chainAll = this.__chain__,
          value = this.__wrapped__,
          isHybrid = !!this.__actions__.length,
          isLazy = value instanceof internal_LazyWrapper,
          iteratee = args[0],
          useLazy = isLazy || lang_isArray(value);

      if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
        // avoid lazy use if the iteratee has a `length` other than `1`
        isLazy = useLazy = false;
      }
      var onlyLazy = isLazy && !isHybrid;
      if (retUnwrapped && !chainAll) {
        return onlyLazy
          ? func.call(value)
          : lodashFunc.call(chain_lodash, this.value());
      }
      var interceptor = function(value) {
        var otherArgs = [value];
        _lodash__push.apply(otherArgs, args);
        return lodashFunc.apply(chain_lodash, otherArgs);
      };
      if (useLazy) {
        var wrapper = onlyLazy ? value : new internal_LazyWrapper(this),
            result = func.apply(wrapper, args);

        if (!retUnwrapped && (isHybrid || result.__actions__)) {
          var actions = result.__actions__ || (result.__actions__ = []);
          actions.push({ 'func': chain_thru, 'args': [interceptor], 'thisArg': chain_lodash });
        }
        return new internal_LodashWrapper(result, chainAll);
      }
      return this.thru(interceptor);
    };
  });

  // Add `Array` and `String` methods to `lodash.prototype`.
  internal_arrayEach(['concat', 'join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
    var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : _lodash__arrayProto)[methodName],
        chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
        retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);

    chain_lodash.prototype[methodName] = function() {
      var args = arguments;
      if (retUnwrapped && !this.__chain__) {
        return func.apply(this.value(), args);
      }
      return this[chainName](function(value) {
        return func.apply(value, args);
      });
    };
  });

  // Map minified function names to their real names.
  internal_baseForOwn(internal_LazyWrapper.prototype, function(func, methodName) {
    var lodashFunc = chain_lodash[methodName];
    if (lodashFunc) {
      var key = lodashFunc.name,
          names = internal_realNames[key] || (internal_realNames[key] = []);

      names.push({ 'name': methodName, 'func': lodashFunc });
    }
  });

  internal_realNames[internal_createHybridWrapper(null, _lodash__BIND_KEY_FLAG).name] = [{ 'name': 'wrapper', 'func': null }];

  // Add functions to the lazy wrapper.
  internal_LazyWrapper.prototype.clone = internal_lazyClone;
  internal_LazyWrapper.prototype.reverse = internal_lazyReverse;
  internal_LazyWrapper.prototype.value = internal_lazyValue;

  // Add chaining functions to the `lodash` wrapper.
  chain_lodash.prototype.chain = _chain.wrapperChain;
  chain_lodash.prototype.commit = _chain.commit;
  chain_lodash.prototype.plant = _chain.plant;
  chain_lodash.prototype.reverse = _chain.reverse;
  chain_lodash.prototype.toString = _chain.toString;
  chain_lodash.prototype.run = chain_lodash.prototype.toJSON = chain_lodash.prototype.valueOf = chain_lodash.prototype.value = _chain.value;

  // Add function aliases to the `lodash` wrapper.
  chain_lodash.prototype.collect = chain_lodash.prototype.map;
  chain_lodash.prototype.head = chain_lodash.prototype.first;
  chain_lodash.prototype.select = chain_lodash.prototype.filter;
  chain_lodash.prototype.tail = chain_lodash.prototype.rest;

  var _lodash = chain_lodash;

  return _lodash;

});