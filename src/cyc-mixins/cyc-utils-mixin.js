import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/**
 * Mixin with common utilities.
 * @polymer
 * @mixinFunction
 */
export const utilsMixin = dedupingMixin((superClass) => {
  return class extends superClass {
    /**
     * Fires an event.
     * @param {String} eventName
     * @param {String | Number | Object} detail
     * @param {Boolean} bubbles true
     */
    _emit(eventName, detail, bubbles = true) {
      this.dispatchEvent(new CustomEvent(eventName, {
        composed: true, bubbles, detail,
      }));
    }

    /**
     * Deep clone an object or array using JSON.parse and JSON.stringify.
     * @param {Array | Object} item Element to clone.
     * @return {Object} copied object.
     */
    _clone(item) {
      return JSON.parse(JSON.stringify(item));
    }

    /**
     * Returns the equality of two objects.
     * @param {Object} obj1
     * @param {Object} obj2
     * @return {Boolean} true if the compared objects are equal.
     */
    _deepEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    /**
     * Returns an array of empty items with the specified length.
     * @param {Number} number
     * @return {Array} array with the specified length.
     */
    _numberToArray(number) {
      return [...Array(number)];
    }

    /**
     * "Stolen" from lit-element.js
     * Returns a string of css class names formed by taking the properties
     * in the `classInfo` object and appending the property name to the string of
     * class names if the property value is truthy.
     * @param {Object} classInfo {'class-name': condition}
     * @return {String} resulting className
     */
    _classString(classInfo) {
      const result = [];

      for (const name in classInfo) {
        if (classInfo[name]) {
          result.push(name);
        }
      }

      return result.join(' ');
    }
  };
});
