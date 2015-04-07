/**
 * Revealing module for rendering maps with a unitary height.
 *
 * @namespace render_unitary
 * @memberof PerspectiveView
 * @param {Object} window   - Global window object
 * @param {Object} document - Global document object
 * @param {Object} pv       - PerspectiveView with empty object fallback
 */
;(function render_unitary(win, doc, pv) {
    'use strict';

    // todo: Has to be simplified. It is currently a copy of render_specified!


    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @ignore
     * @memberof! PerspectiveView.render_unitary
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @ignore
     * @memberof! PerspectiveView.render_unitary
     * @type {Object}
     */
    pub = {};



    // ----------------------------------------------------------------------------------------------- Private


    /**
     * Stores the order of to rendered map items.
     *
     * @private
     * @memberof! PerspectiveView.render_unitary
     * @function
     * @alias getRenderOrder
     * @type {Array}
     */
    priv.renderOrder = [];



    /**
     * Returns an array of the ordered map items.
     *
     * @private
     * @memberof! PerspectiveView.render_unitary
     * @function
     * @alias getRenderOrder
     * @return {Array}
     */
    priv.getRenderOrder = function getRenderOrder() {
        var map           = pv.getMap(),
            vanishingCell = pv.getVanishingCell(),
            mapAmountX    = map[0].length,
            mapAmountY    = map.length,
            orderX        = [],
            orderY        = [],
            orderlist     = [],
            x, y;

        // Get reversed x render order
        for (x = vanishingCell.x; x < mapAmountX; x++) {
            orderX.push(x);
        }

        for (x = vanishingCell.x-1; x >= 0 ; x--) {
            orderX.push(x);
        }


        // Get reversed y render order
        for (y = vanishingCell.y; y < mapAmountY; y++) {
            orderY.push(y);
        }

        for (y = vanishingCell.y - 1; y >= 0 ; y--) {
            orderY.push(y);
        }


        // Merge the x and y render order
        for (y = 0; y < mapAmountY; y++) {
            for (x = 0; x < mapAmountX; x++) {
                orderlist.push({
                    x: orderX[x],
                    y: orderY[y]
                });
            }
        }

        return orderlist;
    };



    /**
     * Returns an array of paths of the six shapes of an cuboid at the given position.
     *
     * @private
     * @memberof! PerspectiveView.render_unitary
     * @function
     * @alias getCuboidPaths
     * @param {Object} position   - Position in the map
     * @param {Number} position.x - Absolute x position in the map in units
     * @param {Number} position.y - Absolute y position in the map in units
     * @param {Number} depth      - Amount of the depth units
     * @return {Object}
     */
    priv.getCuboidPaths = function getCuboidPaths(position, depth) {
        var vanishingPoint              = pv.getVanishingPoint(),
            unitSize                    = pv.getUnitSize(),
            depthFactor                 = pv.getDepth(),
            absoluteObjectBasePositionX = Number(position.x * unitSize.x),
            absoluteObjectBasePositionY = Number(position.y * unitSize.y),
            objectDepth                 = 1 * depthFactor,
            ground = {
                tlx: absoluteObjectBasePositionX,
                tly: absoluteObjectBasePositionY,
                trx: absoluteObjectBasePositionX + unitSize.x,
                try: absoluteObjectBasePositionY,
                brx: absoluteObjectBasePositionX + unitSize.x,
                bry: absoluteObjectBasePositionY + unitSize.y,
                blx: absoluteObjectBasePositionX,
                bly: absoluteObjectBasePositionY + unitSize.y
            },
            distance = {
                tlx: ground.tlx - vanishingPoint.x,
                tly: ground.tly - vanishingPoint.y,
                trx: ground.trx - vanishingPoint.x,
                try: ground.try - vanishingPoint.y,
                brx: ground.brx - vanishingPoint.x,
                bry: ground.bry - vanishingPoint.y,
                blx: ground.blx - vanishingPoint.x,
                bly: ground.bly - vanishingPoint.y
            },
            paths = {
                base:  [],
                roof:  [],
                north: [],
                east:  [],
                south: [],
                west:  []
            };

        // Compute paths
        paths.base = [
            {   x: ground.tlx,
                y: ground.tly },
            {   x: ground.trx,
                y: ground.try },
            {   x: ground.brx,
                y: ground.bry },
            {   x: ground.blx,
                y: ground.bly }
        ];
        paths.roof = [
            {   x: ground.tlx + (distance.tlx * (objectDepth)),
                y: ground.tly + (distance.tly * (objectDepth)) },
            {   x: ground.trx + (distance.trx * (objectDepth)),
                y: ground.try + (distance.try * (objectDepth)) },
            {   x: ground.brx + (distance.brx * (objectDepth)),
                y: ground.bry + (distance.bry * (objectDepth)) },
            {   x: ground.blx + (distance.blx * (objectDepth)),
                y: ground.bly + (distance.bly * (objectDepth)) }
        ];
        paths.north = [
            {   x: paths.base[0].x,
                y: paths.base[0].y },
            {   x: paths.base[1].x,
                y: paths.base[1].y },
            {   x: paths.roof[1].x,
                y: paths.roof[1].y },
            {   x: paths.roof[0].x,
                y: paths.roof[0].y }
        ];
        paths.east = [
            {   x: paths.base[1].x,
                y: paths.base[1].y },
            {   x: paths.base[2].x,
                y: paths.base[2].y },
            {   x: paths.roof[2].x,
                y: paths.roof[2].y },
            {   x: paths.roof[1].x,
                y: paths.roof[1].y }
        ];
        paths.south = [
            {   x: paths.base[2].x,
                y: paths.base[2].y },
            {   x: paths.base[3].x,
                y: paths.base[3].y },
            {   x: paths.roof[3].x,
                y: paths.roof[3].y },
            {   x: paths.roof[2].x,
                y: paths.roof[2].y }
        ];
        paths.west = [
            {   x: paths.base[3].x,
                y: paths.base[3].y },
            {   x: paths.base[0].x,
                y: paths.base[0].y },
            {   x: paths.roof[0].x,
                y: paths.roof[0].y },
            {   x: paths.roof[3].x,
                y: paths.roof[3].y }
        ];

        return paths;
    };



    /**
     * Draws a stroked, filled, closed and colored shape at the canvas.
     *
     * @private
     * @memberof! PerspectiveView.render_unitary
     * @function
     * @alias getCuboidPaths
     * @param {Array}  path  - List of XY-Coordinates
     * @param {String} color - Color of the drawn shape
     * @return {void}
     */
    priv.drawPath = function drawPath(path, color) {
        var context    = pv.getContext(),
            pathAmount = path.length;


        context.save();

        context.strokeStyle = color;
        context.fillStyle   = color;
        context.lineWidth   = 1;

        context.beginPath();
        context.moveTo(path[0].x, path[0].y);

        while(pathAmount--) {
            context.lineTo(path[pathAmount].x, path[pathAmount].y);
        }

        context.closePath();
        context.stroke();
        context.fill();

        context.restore();
    };



    /**
     * Draws a stroked, filled, closed and colored shape at the canvas.
     *
     * @private
     * @memberof! PerspectiveView.render_unitary
     * @function
     * @alias getCuboidPaths
     * @param {Object} configuration            - Configuration
     * @param {Object} configuration.position   - Position in the map
     * @param {Number} configuration.position.x - Absolute x position in the map in units
     * @param {Number} configuration.position.y - Absolute y position in the map in units
     * @param {Object} configuration.data       - Data from every map item
     * @param {Number} configuration.data.depth - Amount of depth units
     * @return {void}
     */
    priv.renderCuboid = function renderCuboid(configuration) {
        var config        = typeof configuration   === 'object'    ? configuration   : {},
            position      = typeof config.position === 'object'    ? config.position : {},
            data          = typeof config.data     === 'object'    ? config.data     : {},
            depth         = data.depth,
            vanishingCell = pv.getVanishingCell(),
            paths         = priv.getCuboidPaths(position, depth);

        if (depth > 0) {
            // Check if north shape has to be rendered
            if (position.y > vanishingCell.y) {
                priv.drawPath(paths.north, 'rgb(27,27,27)');
            }

            // Check if East shape has to be rendered
            if (position.x < vanishingCell.x) {
                priv.drawPath(paths.east, 'rgb(32,32,32)');
            }

            // Check if west shape has to be rendered
            if (vanishingCell.x < position.x) {
                priv.drawPath( paths.west, 'rgb(68,68,68)');
            }

            // Check if south shape has to be rendered
            if (vanishingCell.y > position.y) {
                priv.drawPath( paths.south, 'rgb(72,72,72)');
            }

            // Roof shape has to be rendered always
            priv.drawPath(paths.roof, 'rgb(50,50,50)');
        }
    };



    /**
     * Handles the rendering of the map
     *
     * @private
     * @memberof! PerspectiveView.render_unitary
     * @function
     * @alias renderMap
     * @return {void}
     */
    priv.renderMap = function renderMap() {
        var map        = pv.getMap(),
            order      = priv.renderOrder,
            itemAmount = order.length,
            context    = pv.getContext(),
            mapItemPosition,
            mapItemObject;

        context.save();
        while (itemAmount--) {
            mapItemPosition = order[itemAmount];
            mapItemObject   = map[mapItemPosition.y][mapItemPosition.x];

            if (mapItemObject === null || mapItemObject === 0) { continue; }

            priv.renderCuboid({
                position: {
                    x: mapItemPosition.x,
                    y: mapItemPosition.y
                },
                data: {
                    depth: mapItemObject
                }
            });
        }
        context.restore();
    };



    // ------------------------------------------------------------------------------------------------ Public



    /**
     * Initialize this module.
     *
     * @public
     * @memberof! PerspectiveView.render_unitary
     * @function
     * @alias init
     * @return {void}
     */
    pub.init = function init() {
        pub.updateRenderOrder();
    };



    /**
     * Public API render method
     *
     * @public
     * @memberof! PerspectiveView.render_unitary
     * @function
     * @alias render
     * @return {void}
     */
    pub.render = function render() {
        priv.renderMap();
    };



    /**
     * Updates the order of rendered items.
     *
     * @public
     * @memberof! PerspectiveView.render_unitary
     * @function
     * @alias updateRenderOrder
     * @return {void}
     */
    pub.updateRenderOrder = function updateRenderOrder() {
        priv.renderOrder = priv.getRenderOrder();
    };



    // ------------------------------------------------------------------------------------------------ Append



    pv.appendModule({render_unitary: pub});



})(window, document, window.PERSPECTIVEVIEW);
