/**
 * Checks if the given value is a valid HTML canvas element.
 *
 * @function
 * @alias isHtmlCanvasElement
 * @param {*} value
 * @return {Boolean}
 */
function isHtmlCanvasElement(value) {
    return (isObject(value) && (typeof value.getContext === 'function'));
}



/**
 * Checks if the given value is a valid object.
 *
 * @function
 * @alias isObject
 * @param {*} value
 * @return {Boolean}
 */
function isObject(value) {
    return ((value) && (typeof value === 'object'));
}
