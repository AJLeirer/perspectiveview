/**
 * Creates an instance of PerspectiveView
 *
 * @class
 * @constructor
 */
function PerspectiveView() {
    'use strict';



    // --------------------------------------------------------------------------------------------- CONSTANTS



    /**
     * Outer scope for inner functions.
     *
     * @private
     * @alias SELF
     * @ignore
     * @memberof PerspectiveView
     * @type {PerspectiveView}
     */
    var SELF = this,



    /**
     * Toggle the development mode.
     * If DEV_MODE = true all parameters of all method will be validated and repeats logging outputs.
     *
     * @private
     * @alias DEV_MODE
     * @memberof PerspectiveView
     * @type {Boolean}
     */
    DEV_MODE = true,



    /**
     * Contains the settings for DEV_MODE
     *
     * @private
     * @alias DEV
     * @memberof PerspectiveView
     * @type {Object}
     * @property {Boolean} abortOnError - Script will abort if an error occurs
     */
    DEV = {
        abortOnError: false
    };



    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @ignore
     * @memberof PerspectiveView
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @ignore
     * @memberof PerspectiveView
     * @type {Object}
     */
    pub = {};



    // ---------------------------------------------------------------------------------------------- Defaults



    /**
     * Stores the default values for the properties.
     *
     * @private
     * @alias defaults
     * @memberof PerspectiveView
     * @type {Object}
     */
    priv.defaults = {
        canvas: {},
        context: {},
        map: [[0]],
        renderMode: 'flat',
        unit: {
            width:  32,
            height: 32,
            depth:  0.05
        },
        vanishingCell: {
            x: 0,
            y: 0
        },
        vanishingPoint: {
            x: 0,
            y: 0
        }
    };



    // ----------------------------------------------------------------------------------------------- Private



    /**
     * Stores the necessary HTML canvas element to set by user.
     *
     * @private
     * @alias canvas
     * @memberof PerspectiveView
     * @type {Object}
     */
    priv.canvas = {};



    /**
     * Stores the context of the HTML canvas element.
     * This property will be set per default as a 2d-context, when the canvas element will be set by user.
     *
     * @private
     * @alias context
     * @memberof PerspectiveView
     * @type {Object}
     */
    priv.context = {};



    /**
     * Stores the map or just a part of the users map.
     * A map is a 2d array containing number values. A zero marks a free/accessible unit/tile, a number higher than zero
     * is a blocked unit/tile and will rendered as a cuboid where the number declares the depth (size on virtual
     * z-axis).
     *
     * @private
     * @alias map
     * @memberof PerspectiveView
     * @type {Array}
     */
    priv.map = [];



    /**
     *
     * @type {string}
     */
    priv.renderMode = '';



    /**
     * Stores the size of an unit and the depth factor.
     *
     * @private
     * @alias unit
     * @memberof PerspectiveView
     * @type {Object}
     * @property {Number} width  - Width (size on x-axis) in px
     * @property {Number} height - Height (size on y-axis) in px
     * @property {Number} depth  - Depth (size on virtual z-axis) as factor
     */
    priv.unit = {
        width:  0,
        height: 0,
        depth:  0
    };



    /**
     * Stores the current cell in which the vanishing point is located.
     *
     * @private
     * @alias vanishingCell
     * @memberof PerspectiveView
     * @type {Object}
     * @property {Number} x - Cell on x-axis in units/tiles.
     * @property {Number} y - Cell on y-axis in units/tiles.
     */
    priv.vanishingCell = {
        x: 0,
        y: 0
    };



    /**
     * Stores the coordinate of the vanishing point needs to draw perspective objects.
     *
     * @private
     * @alias vanishingPoint
     * @memberof PerspectiveView
     * @type {Object}
     * @property {Number} x - Position on x-axis in px
     * @property {Number} y - Position on y-axis in px
     */
    priv.vanishingPoint = {
        x: 0,
        y: 0
    };



    // ------------------------------------------------------------------------------------------------ Public
    // -------------------------------------------------------------------------------------- Setter



    /**
     * Sets the con
     *
     * @public
     * @function
     * @alias setCanvas
     * @memberof PerspectiveView
     * @param {Object} canvas - HTML canvas element
     * @param {Object} canvas - HTML canvas element
     * @return {void}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // Get HTML canvas element
     * var myCanvas = document.getElementById('myCanvas');
     *
     * // Set myCanvas as new canvas
     * pv.setCanvas(myCanvas);
     */
    pub.setCanvas = function setCanvas(canvas) {
        if (DEV_MODE) {
            if (!SELF.isHtmlCanvasElement(canvas)) {
                console.error('Parameter <canvas> is not a valid HTML canvas element :: ', '{' , typeof canvas, '} :: ', canvas);
                if (DEV.abortOnError) { throw new Error('Script abort'); }
            }
        }

        priv.canvas = canvas;

        // Set the context as 2d per default
        pub.setContext(canvas.getContext("2d"));
    };



    /**
     * Sets te entire configuration or just one part.
     *
     * @public
     * @function
     * @ignore
     * @alias setConfig
     * @memberof PerspectiveView
     * @param {Object} configuration - Complete configuration object
     * @return {void}
     */
    pub.setConfig = function setConfig(configuration) {
        // todo
    };



    /**
     * Sets the HTML canvas element the map manipulations should be rendered to.
     * Automatically the context is set as 2d.
     *
     * @public
     * @function
     * @alias setContext
     * @memberof PerspectiveView
     * @param {Object} context - Context of the HTML canvas element
     * @return {void}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // Get HTML canvas element and its context
     * var myCanvas = document.getElementById('myCanvas');
     * var context  = myCanvas.getContext('2d');
     *
     * // Set context as new context
     * pv.setContext(context);
     */
    pub.setContext = function setContext(context) {
        if (DEV_MODE) {
            if (!SELF.isObject(context)) {
                console.error('Parameter <context> is not a valid context of an HTML canvas element :: ', '{' , typeof context, '} :: ', context);
                if (DEV.abortOnError) { throw new Error('Script abort'); }
            }
        }

        priv.context = context;
    };



    /**
     * Sets the map or just a part of the map.
     * A valid map must be a 2d array of numbers, where zero will not be rendered and all numbers greater than zero
     * will be rendered as a cuboid.
     *
     * @public
     * @function
     * @alias setMap
     * @memberof PerspectiveView
     * @param {Array} map
     * @return {void}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // Simple map 5 x 5 units/tiles
     * var map = [
     *     [1, 1, 1, 1, 1],
     *     [1, 0, 0, 0, 1],
     *     [1, 0, 1, 1, 1],
     *     [1, 0, 0, 0, 1],
     *     [1, 1, 1, 1, 1],
     * ];
     *
     * // Set map as new map
     * pv.setMap(map);
     */
    pub.setMap = function setMap(map) {
        if (DEV_MODE) {
            if (!SELF.isMap(map)) {
                console.error('Parameter <map> is not a valid map :: ', '{' , typeof map, '} :: ', map);
                if (DEV.abortOnError) { throw new Error('Script abort'); }
            }
        }

        priv.map = map;
    };



    /**
     * Sets the type/mode of rendering.
     * Value must be a string in lower cases. Valid modes: [flat]
     *
     * @public
     * @function
     * @alias setRenderMode
     * @memberof PerspectiveView
     * @param {String} mode
     * @return {void}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // Mode to be set as rendering mode. Should be written in lower cases!
     * var mode = 'flat';
     *
     * // Set mode as new render mode
     * pv.setRenderMode(mode);
     */
    pub.setRenderMode = function setRenderMode(mode) {
        if (DEV_MODE) {
            if (!SELF.isRenderMode(mode)) {
                console.error('Parameter <mode> is not a valid rendering mode :: ', '{' , typeof mode, '} :: ', mode);
                if (DEV.abortOnError) { throw new Error('Script abort'); }
            }
        }

        priv.renderMode = mode.toString().toLowerCase();
    };



    /**
     * Sets the size an unit. A unit is usually the size of a common tile.
     *
     * @public
     * @function
     * @alias setUnitSize
     * @memberof PerspectiveView
     * @param {Number} width  - Width (size on x-axis) of an unit/tile in px
     * @param {Number} height - Height (size on y-axis) of an unit/tile in px
     * @param {Number} depth  - Depth  (size on virtual z-axis) of an unit/tile as factor
     * @return {void}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // Sizes of a tile
     * var width  = 50;   // px
     * var height = 50;   // px
     * var depth  = 0.05; // as factor
     *
     * // Set width, height and depth as new unit sizes
     * pv.setUnitSize(width, height, depth);
     */
    pub.setUnitSize = function setUnitSize(width, height, depth) {
        if (DEV_MODE) {
            if (!SELF.isSize(width)) {
                console.error('Parameter <width> is not a valid width :: ', '{' , typeof width, '} :: ', width);
                if (DEV.abortOnError) { throw new Error('Script abort'); }
            }

            if (!SELF.isSize(height)) {
                console.error('Parameter <height> is not a valid height :: ', '{' , typeof width, '} :: ', height);
                if (DEV.abortOnError) { throw new Error('Script abort'); }
            }

            if (!SELF.isSize(depth)) {
                console.error('Parameter <depth> is not a valid depth :: ', '{' , typeof depth, '} :: ', depth);
                if (DEV.abortOnError) { throw new Error('Script abort'); }
            }
        }

        priv.unit.width  = Number(width);
        priv.unit.height = Number(height);
        priv.unit.depth  = Number(depth);
    };



    /**
     * Sets the vanishing cell to which refers to the perspective view for rendering in the right order.
     *
     * @public
     * @function
     * @alias setVanishingCell
     * @memberof PerspectiveView
     * @param {Object} cell
     * @param {Number} cell.x - Position on x-axis in units/tiles
     * @param {Number} cell.y - Position on y-axis in units/tiles
     * @return {void}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // Cell to be set as vanishing cell
     * var cell = {
     *     x: 4; // Position on x-axis in the grid
     *     y: 3; // Position on y-axis in the grid
     * };
     *
     * // Set cell as new vanishing cell
     * pv.setVanishingCell(cell);
     */
    pub.setVanishingCell = function setVanishingCell(cell) {
        if (DEV_MODE) {
            if (!SELF.isCell(cell)) {
                console.error('Parameter <unit> is not a valid cell :: ', '{' , typeof cell, '} :: ', cell);
                if (DEV.abortOnError) { throw new Error('Script abort'); }
            }
        }

        priv.vanishingCell.x = Number(cell.x);
        priv.vanishingCell.y = Number(cell.y);
    };



    /**
     * Sets the vanishing point to which refers to the perspective view, like architectural drawing.
     *
     * @public
     * @function
     * @alias setVanishingPoint
     * @memberof PerspectiveView
     * @param {Object} coordinate
     * @param {Number} coordinate.x - Coordinate on x-axis in px
     * @param {Number} coordinate.y - Coordinate on y-axis in px
     * @return {void}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // Coordinate to be set as vanishing point
     * var coordinate = {
     *     x: 225; // px
     *     y: 175; // px
     * };
     *
     * // Set coordinate as new vanishing point
     * pv.setVanishingPoint(coordinate);
     */
    pub.setVanishingPoint = function setVanishingPoint(coordinate) {
        if (DEV_MODE) {
            if (!SELF.isCoordinate(coordinate)) {
                console.error('Parameter <coordinate> is not a valid coordinate :: ', '{' , typeof coordinate, '} :: ', coordinate);
                if (DEV.abortOnError) { throw new Error('Script abort'); }
            }
        }

        coordinate.x = Number(coordinate.x);
        coordinate.y = Number(coordinate.y);

        priv.vanishingPoint.x = coordinate.x;
        priv.vanishingPoint.y = coordinate.y;

        pub.setVanishingCell(pub.getVanishingCell({
            x: coordinate.x,
            y: coordinate.y
        }));
    };



    // -------------------------------------------------------------------------------------- Getter



    /**
     * Returns the HTML canvas element.
     *
     * @public
     * @function
     * @alias getCanvas
     * @memberof PerspectiveView
     * @return {Object}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // [...]
     *
     * // Get canvas element
     * pv.getCanvas(); // Returns {} or the set <canvas> element
     */
    pub.getCanvas = function getCanvas() {
        return priv.canvas;
    };



    /**
     * Returns an object of the current configuration.
     *
     * @public
     * @function
     * @alias getConfig
     * @memberof PerspectiveView
     * @return {Object}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // [...]
     *
     * // Get config object
     * pv.getConfig(); // Returns {...}
     */
    pub.getConfig = function getConfig() {
        return {}; // todo
    };



    /**
     * Returns the context of the HTML canvas element.
     *
     * @public
     * @function
     * @alias getContext
     * @memberof PerspectiveView
     * @return {Object}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // [...]
     *
     * // Get context object
     * pv.getContext(); // Returns {} or the set context of the <canvas> element
     */
    pub.getContext = function getContext() {
        return priv.context;
    };



    /**
     * Returns the map array.
     *
     * @public
     * @function
     * @alias getMap
     * @memberof PerspectiveView
     * @return {Array}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // [...]
     *
     * // Get map array
     * pv.getMap(); // Returns [...]
     */
    pub.getMap = function getMap() {
        return priv.map;
    };



    /**
     * Returns the rendering mode as string.
     *
     * @public
     * @function
     * @alias getRenderMode
     * @memberof PerspectiveView
     * @return {String}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // [...]
     *
     * // Get render mode as string
     * pv.getRenderMode(); // Returns 'flat'
     */
    pub.getRenderMode = function getRenderMode() {
        return priv.renderMode;
    };



    /**
     * Returns the current vanishing cell of the given coordinate.
     *
     * @public
     * @function
     * @alias getVanishingCell
     * @memberof PerspectiveView
     * @param {Object} coordinate
     * @param {Number} coordinate.x - Coordinate on x-axis in px
     * @param {Number} coordinate.y - Coordinate on y-axis in px
     * @return {Object}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // Sizes of a tile
     * var width  = 50;   // px
     * var height = 50;   // px
     * var depth  = 0.05; // as factor
     *
     * pv.setUnitSize(width, height, depth);
     *
     * // Set coordinate to get vanishing cell from
     * var coordinate = {
     *     x: 225; // px
     *     y: 175; // px
     * };
     *
     * // Get vanishing cell of the given parameter coordinate
     * getVanishingCell(coordinate); // Returns { x: 4, y: 3 }
     */
    pub.getVanishingCell = function getVanishingCell(coordinate) {
        if (DEV_MODE) {
            if (!SELF.isCoordinate(coordinate)) {
                console.error('Parameter <coordinate> is not a valid coordinate :: ', '{' , typeof coordinate, '} :: ', coordinate);
                if (DEV.abortOnError) { throw new Error('Script abort'); }
            }
        }

        coordinate = coordinate || {};

        return {
            x: Math.floor(Number(coordinate.x) / priv.unit.width),
            y: Math.floor(Number(coordinate.y) / priv.unit.height)
        };
    };



    // ------------------------------------------------------------------------------------------------ Return



    return pub;
}

