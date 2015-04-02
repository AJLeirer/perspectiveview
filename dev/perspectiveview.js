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
            x: 16,
            y: 16
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



    /**
     * Constructor, will be called if a new instance of PerspectiveView has been initialized.
     * Sets the default values.
     *
     * @public
     * @function
     * @memberof PerspectiveView
     * @return {void}
     */
    priv.init = function init() {
        // Set default values
        pub.setMap(priv.defaults.map);
        pub.setUnitSize(priv.defaults.unit.width , priv.defaults.unit.height , priv.defaults.unit.depth);
        pub.setVanishingPoint(priv.defaults.vanishingPoint);
        pub.setVanishingCell(priv.defaults.vanishingCell);
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
     * var canvas = document.getElementById('myCanvas');
     *
     * // Set canvas as new canvas
     * pv.setCanvas(canvas);
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
     * @alias setConfig
     * @memberof PerspectiveView
     * @param {Object} configuration - Complete configuration object
     * @return {void}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // Set a valid config
     * pv.setConfig({
     *     canvas: document.getElementById('myCanvas'),
     *     map: [
     *         [1, 1, 1, 1, 1],
     *         [1, 0, 0, 0, 1],
     *         [1, 0, 1, 1, 1],
     *         [1, 0, 0, 0, 1],
     *         [1, 1, 1, 1, 1]
     *     ],
     *     renderMode: 'flat',
     *     unitSize: {
     *         width:  50,
     *         height: 50,
     *         depth:  0.05
     *     },
     *     vanishingPoint: {
     *         x: 225,
     *         y: 175
     *     }
     * });
     */
    pub.setConfig = function setConfig(configuration) {
        var config         = typeof configuration         === 'object' ? configuration         : {},
            unitSize       = typeof config.unitSize       === 'object' ? config.unitSize       : {},
            vanishingPoint = typeof config.vanishingPoint === 'object' ? config.vanishingPoint : {},
            vanishingCell  = typeof config.vanishingCell  === 'object' ? config.vanishingCell  : {};

        config = {
            canvas:     config.canvas     !== undefined ? config.canvas     : priv.canvas,
            context:    config.context    !== undefined ? config.context    : priv.context,
            map:        config.map        !== undefined ? config.map        : priv.map,
            renderMode: config.renderMode !== undefined ? config.renderMode : priv.renderMode,
            unitSize: {
                width:  unitSize.width  !== undefined ? unitSize.width  : priv.unit.width,
                height: unitSize.height !== undefined ? unitSize.height : priv.unit.height,
                depth:  unitSize.depth  !== undefined ? unitSize.depth  : priv.unit.depth
            },
            vanishingPoint: {
                x: vanishingPoint.x !== undefined ? vanishingPoint.x : priv.vanishingPoint.x,
                y: vanishingPoint.y !== undefined ? vanishingPoint.y : priv.vanishingPoint.y
            },
            vanishingCell: {
                x: vanishingCell.x !== undefined ? vanishingCell.x : priv.vanishingCell.x,
                y: vanishingCell.y !== undefined ? vanishingCell.y : priv.vanishingCell.y
            }
        };

        pub.setCanvas(config.canvas);
        pub.setContext(config.context);
        pub.setMap(config.map);
        pub.setUnitSize(config.unitSize.width, config.unitSize.height, config.unitSize.depth);
        pub.setVanishingPoint(config.vanishingPoint);
        pub.setVanishingCell(config.vanishingCell);
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
     *     [1, 1, 1, 1, 1]
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
                console.error('Parameter <cell> is not a valid cell :: ', '{' , typeof cell, '} :: ', cell);
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
     * // ...
     *
     * // Get canvas element
     * pv.getCanvas(); // Returns <canvas>
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
     * // ...
     *
     * // Get config object
     * pv.getConfig(); // Returns {
     *                 //     canvas:  <canvas>,
     *                 //     context: {...},
     *                 //     map:     [[1, 1, 1, 1, 1],
     *                 //               [1, 0, 0, 0, 1],
     *                 //               [1, 0, 1, 1, 1],
     *                 //               [1, 0, 0, 0, 1],
     *                 //               [1, 1, 1, 1, 1]],
     *                 //     renderMode: 'flat',
     *                 //     unitSize: {
     *                 //         width:  50,
     *                 //         height: 50,
     *                 //         depth:  0.05
     *                 //     },
     *                 //     vanishingPoint: {
     *                 //         x: 225,
     *                 //         y: 175
     *                 //     },
     *                 //     vanishingCell: {
     *                 //         x: 4,
     *                 //         y: 3
     *                 //     }
     *                 // }
     */
    pub.getConfig = function getConfig() {
        return {
            canvas:     priv.canvas,
            context:    priv.context,
            map:        priv.map,
            renderMode: priv.renderMode,
            unitSize: {
                width:  priv.unit.width,
                height: priv.unit.height,
                depth:  priv.unit.depth
            },
            vanishingPoint: {
                x: priv.vanishingPoint.x,
                y: priv.vanishingPoint.y
            },
            vanishingCell: {
                x: priv.vanishingCell.x,
                y: priv.vanishingCell.y
            }
        };
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
     * // ...
     *
     * // Get context object
     * pv.getContext(); // Returns context of <canvas>
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
     * // ...
     *
     * // Get map array
     * pv.getMap(); // Returns [[1, 1, 1, 1, 1],
     *              //          [1, 0, 0, 0, 1],
     *              //          [1, 0, 1, 1, 1],
     *              //          [1, 0, 0, 0, 1],
     *              //          [1, 1, 1, 1, 1]]
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
     * // ...
     *
     * // Get render mode
     * pv.getRenderMode(); // Returns 'flat'
     */
    pub.getRenderMode = function getRenderMode() {
        return priv.renderMode;
    };



    /**
     * Returns the size of a unit/tile.
     *
     * @public
     * @function
     * @alias getUnitSize
     * @memberof PerspectiveView
     * @return {{width: priv.unit.width, height: priv.unit.height, depth: priv.unit.depth}}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // ...
     *
     * // Get size object of a unit
     * pv.getUnitSize(); // Returns {width: 50, height: 50, depth: 0.05}
     */
    pub.getUnitSize = function getUnitSize() {
        return {
            width:  priv.unit.width,
            height: priv.unit.height,
            depth:  priv.unit.depth
        };
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

        return {
            x: Math.floor(Number(coordinate.x) / priv.unit.width),
            y: Math.floor(Number(coordinate.y) / priv.unit.height)
        };
    };



    /**
     * Returns the vanishing point.
     *
     * @public
     * @function
     * @alias getVanishingPoint
     * @memberof PerspectiveView
     * @return {{x: Number, y: Number}}
     *
     * @example
     * // Creates an instance of PerspectiveView
     * var pv = newPerspectiveView();
     *
     * // ...
     *
     * // Get vanishing point
     * getVanishingPoint(); // Returns { x: 225, y: 175 }
     */
    pub.getVanishingPoint = function getVanishingPoint() {
        return {
            x: priv.vanishingPoint.x,
            y: priv.vanishingPoint.y
        };
    };



    // -------------------------------------------------------------------------------------- Call constructor



    (function() { priv.init(); }());



    // ------------------------------------------------------------------------------------------------ Return



    return pub;



}
