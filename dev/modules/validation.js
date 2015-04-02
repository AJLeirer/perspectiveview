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



/**
 * Checks if the given value is a valid coordinate.
 * Value must be of type object including properties x and y of type number and they must be greater or equal than zero.
 *
 * @function
 * @memberof PerspectiveView
 * @alias isCoordinate
 * @param {*} value
 * @return {Boolean}
 */
PerspectiveView.prototype.isCoordinate = function isCoordinate(value) {
    return ((this.isObject(value)) &&
            (this.isNumber(value.x)) &&
            (this.isNumber(value.y)));
};



/**
 * Checks if the given value is a valid cell.
 * Value must be of type object including properties x and y of type number and they must be greater or equal than zero.
 *
 * @function
 * @memberof PerspectiveView
 * @alias isCell
 * @param {*} value
 * @return {Boolean}
 */
PerspectiveView.prototype.isCell = function isCell(value) {
    return ((this.isObject(value)) &&
    (this.isNumber(value.x)) &&
    (this.isNumber(value.x)));
};



/**
 * Checks if the given value is undefined.
 *
 * @function
 * @memberof PerspectiveView
 * @alias isNotSet
 * @param {*} value
 * @return {Boolean}
 */
PerspectiveView.prototype.isNotSet = function isNotSet(value) {
    return (!(value));
};




/**
 * Checks if the given value is an array
 *
 * @function
 * @memberof PerspectiveView
 * @alias isArray
 * @param {*} value
 * @return {Boolean}
 */
PerspectiveView.prototype.isArray = function isArray(value) {
    return ((typeof value === 'object'));
};




/**
 * Checks if the given value is a valid map.
 *
 * @function
 * @memberof PerspectiveView
 * @alias isMap
 * @param {*} value
 * @return {Boolean}
 */
PerspectiveView.prototype.isMap = function isMap(value) {
    return (this.isArray(value) && value.length > 0 && this.isArray(value[0]) && value[0].length > 0);
};
