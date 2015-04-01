/**
 * Checks if the given value is a valid HTML canvas element.
 *
 * @memberof PerspectiveView
 * @function
 * @alias isHtmlCanvasElement
 * @param {*} value
 * @return {Boolean}
 */
PerspectiveView.prototype.isHtmlCanvasElement = function isHtmlCanvasElement(value) {
    return (this.isObject(value) && (typeof value.getContext === 'function'));
};



/**
 * Checks if the given value is a valid object.
 *
 * @function
 * @memberof PerspectiveView
 * @alias isObject
 * @param {*} value
 * @return {Boolean}
 */
PerspectiveView.prototype.isObject = function isObject(value) {
    return ((value) && (typeof value === 'object'));
};



/**
 * Checks if the given value is a number.
 * Value must be of type number.
 *
 * @function
 * @memberof PerspectiveView
 * @alias isNumber
 * @param {*} value
 * @return {Boolean}
 */
PerspectiveView.prototype.isNumber = function isNumber(value) {
    return (!isNaN(value) && (typeof value === 'number'));
};



/**
 * Checks if the given value is a valid size.
 * VValue must be of type number and must be greater or equal than zero.
 *
 * @function
 * @memberof PerspectiveView
 * @alias isSize
 * @param {*} value
 * @return {Boolean}
 */
PerspectiveView.prototype.isSize = function isSize(value) {
    return (this.isNumber(value) && (value >= 0));
};
