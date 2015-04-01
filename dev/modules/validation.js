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
