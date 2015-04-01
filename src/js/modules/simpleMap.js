/**
 * Provides a simple 2d array number map. The numbers represents the height of the tile.
 *
 * @class simpleMap
 * @param {Object} app - The main app
 */
;(function map(app) {
    'use strict';



    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @memberof simpleMap
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @memberof simpleMap
     * @type {Object}
     */
    pub = {};



    // ----------------------------------------------------------------------------------------------- Private



    /**
     * Stores the map.
     *
     * @private
     * @memberof simpleMap
     * @type {Array}
     */
    priv.map = [[0]];



    /**
     * Stores the fallback value for undefined areas in the map.
     *
     * @private
     * @memberof simpleMap
     * @type {Number}
     */
    priv.fallback = 0;



    /**
     * Amount of unit on x-axis in the map.
     *
     * @private
     * @memberof simpleMap
     * @type {Number}
     */
    priv.mapXamount = 1;



    /**
     * Amount of unit on y-axis in the map.
     *
     * @private
     * @memberof simpleMap
     * @type {Number}
     */
    priv.mapYamount = 1;



    /**
     * Stores the buffer sizes in every direction from a center position.
     *
     * @private
     * @memberof simpleMap
     * @type     {Object}
     * @property {Number} buffer.top    - Top direction
     * @property {Number} buffer.right  - Right direction
     * @property {Number} buffer.bottom - Bottom direction
     * @property {Number} buffer.left   - Left direction
     */
    priv.buffer = {
        top:    0,
        right:  0,
        bottom: 0,
        left:   0
    };



    // ------------------------------------------------------------------------------------------------ Public



    /**
     * Initialize this module.
     *
     * @public
     * @memberof simpleMap
     */
    pub.init = function init() {
        /** / // Realistic same heights test map
        pub.setMap([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);/**/
        /**/ // Realistic different heights test map
        pub.setMap([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1, 2, 1, 0, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 3, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 0],
            [0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 2, 2, 2, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 2, 0, 2, 0, 2, 3, 0, 3, 0, 0],
            [0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 1, 2, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 2, 3, 2, 1, 0, 1, 2, 0, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0],
            [0, 0, 3, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 3, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);/**/
        /** / // Height color test map
        pub.setMap([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 6, 4, 2, 0, 1, 0, 0, 1, 2, 0, 1, 0, 0],
            [0, 0, 1, 0, 4, 2, 1, 0, 2, 1, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 2, 1, 0, 0, 3, 2, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 4, 3, 2, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0, 5, 4, 3, 2, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 1, 2, 3, 0, 1, 0, 0],
            [0, 0, 1, 0, 4, 3, 2, 1, 0, 0, 2, 3, 4, 0, 1, 0, 0],
            [0, 0, 1, 0, 5, 4, 3, 2, 1, 0, 3, 4, 5, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);/**/
    };



    /**
     * Returns the complete map.
     *
     * @public
     * @memberof simpleMap
     * @return {Array}
     */
    pub.getMap = function getMap() {
        return priv.map;
    };



    /**
     * Returns a section of the map.
     *
     * @public
     * @memberof simpleMap
     * @param  {Number} x                 - Start x-position
     * @param  {Number} y                 - Start y-position
     * @param  {Number} amountX           - Amount of units on x-axis
     * @param  {Number} amountY           - Amount of units on y-axis
     * @param  {Object} optional          - Optional config divergent from defaults
     * @param  {Number} optional.fallback - Custom fallback value for undefined areas
     * @return {Array}
     */
    pub.getMapSection = function getMapSection(x, y, amountX, amountY, optional) {
        var opt      = optional   || {},
            fallback = opt.fallback === undefined ? priv.fallback : opt.fallback,
            map      = priv.map,
            mapMaxX  = priv.mapXamount,
            mapMaxY  = priv.mapYamount,
            result   = [],
            absX, absY, relX, relY;

        for (absY = y, relY = 0; absY <= y+amountY; absY++, relY++) {
            result[relY] = [];
            for (absX = x, relX = 0; absX <= x+amountX; absX++, relX++) {
                result[relY][relX] = [];
                if (absY < 0 || absX < 0 || absY >= mapMaxY || absX >= mapMaxX) {
                    result[relY][relX] = fallback;
                }
                else {
                    if (map[absY][absX] !== null && typeof map[absY][absX] === 'number') {
                        result[relY][relX] = map[absY][absX];
                    }
                    else {
                        result[relY][relX] = fallback;
                    }
                }
            }
        }

        return result;
    };



    /**
     * Returns a map section from a given center and sized by the buffer directions.
     *
     * @public
     * @memberof simpleMap
     * @param  {Number} x                      - Center x-position of the selection
     * @param  {Number} y                      - Center y-position of the selection
     * @param  {Object} optional               - Optional config divergent from defaults
     * @param  {Object} optional.buffer        - Custom buffer values for sizing the section
     * @param  {Number} optional.buffer.top    - Units in top direction from the center position
     * @param  {Number} optional.buffer.right  - Units in tight direction from the center position
     * @param  {Number} optional.buffer.bottom - Units in bottom direction from the center position
     * @param  {Number} optional.buffer.left   - Units in left direction from the center position
     * @return {Array}
     */
    pub.getMapAt = function getMapAt(x, y, optional) {
        var opt    = (typeof optional   === 'object') ? optional   : {},
            buf    = (typeof opt.buffer === 'object') ? opt.buffer : {},
            top    = (!isNaN(parseInt(buf.top)))      ? buf.top    : priv.buffer.top,
            right  = (!isNaN(parseInt(buf.right)))    ? buf.right  : priv.buffer.right,
            bottom = (!isNaN(parseInt(buf.bottom)))   ? buf.bottom : priv.buffer.bottom,
            left   = (!isNaN(parseInt(buf.left)))     ? buf.left   : priv.buffer.left;

        return pub.getMapSection(
            x - left,
            y - top,
            Math.abs(right)  + Math.abs(left),
            Math.abs(bottom) + Math.abs(top)
        );
    };



    /**
     * Sets a simple map.
     *
     * @public
     * @memberof simpleMap
     * @param  {Array}  map                  - Simple 2d array with numbers
     * @param  {Object} config               - One-time configuration like the single setters
     * @param  {Object} config.buffer        - Buffer values for sizing the requested section
     * @param  {Number} config.buffer.top    - Units in top direction from the center position
     * @param  {Number} config.buffer.right  - Units in tight direction from the center position
     * @param  {Number} config.buffer.bottom - Units in bottom direction from the center position
     * @param  {Number} config.buffer.left   - Units in left direction from the center position
     * @param  {Number} config.fallback      - Fallback value for undefined areas
     * @return {Object} simpleMap.pub
     */
    pub.setMap = function setMap(map, config) {
        var cfg      = (typeof config   === 'object') ? config      : {},
            buf      = (typeof cfg.buffer === 'object') ? cfg.buffer    : {},
            top      = (!isNaN(parseInt(buf.top)))      ? buf.top       : priv.buffer.top,
            right    = (!isNaN(parseInt(buf.right)))    ? buf.right     : priv.buffer.right,
            bottom   = (!isNaN(parseInt(buf.bottom)))   ? buf.bottom    : priv.buffer.bottom,
            left     = (!isNaN(parseInt(buf.left)))     ? buf.left      : priv.buffer.left,
            fallback = cfg.fallback === undefined       ? priv.fallback : cfg.fallback;

        priv.map        = map;
        priv.mapYamount = map.length;
        priv.mapXamount = map[0].length;
        priv.buffer     = {
          top:      top,
            right:  right,
            bottom: bottom,
            left:   left
        };
        priv.fallback   = fallback;

        return this;
    };



    /**
     * Sets the default buffer size for getting a section from a requested center position.
     *
     * @public
     * @memberof simpleMap
     * @param  {Number} top    - Buffer units in top direction
     * @param  {Number} right  - Buffer units in tight direction
     * @param  {Number} bottom - Buffer units in bottom direction
     * @param  {Number} left   - Buffer units in left direction
     * @return {Object} simpleMap.pub
     */
    pub.setBuffer = function setBuffer(top, right, bottom, left) {
        if (typeof top === 'number') {
            priv.buffer.top = Math.abs(top);
        }

        if (typeof right === 'number') {
            priv.buffer.right = Math.abs(right);
        }

        if (typeof bottom === 'number') {
            priv.buffer.bottom = Math.abs(bottom);
        }

        if (typeof left === 'number') {
            priv.buffer.left = Math.abs(left);
        }

        return this;
    };



    /**
     * Sets the default fallback value for undefined areas in the map.
     *
     * @public
     * @memberof simpleMap
     * @param  {Number} value - Fallback value
     * @return {Object} simpleMap.pub
     */
    pub.setFallback = function setFallback(value) {
        if (typeof value === 'number') {
            priv.buffer.value = value;
        }

        return this;
    };



    // ------------------------------------------------------------------------------------------------ Append



    app.appendModule({ simpleMap: pub });



})(window.dev_perspectiveview);
