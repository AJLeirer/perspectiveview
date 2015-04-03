/**
 * Revealing module for rendering flat maps.
 *
 * @namespace render_flat
 * @memberof PerspectiveView
 * @param {Object} window   - Global window object
 * @param {Object} document - Global document object
 * @param {Object} pv       - PerspectiveView with empty object fallback
 */
;(function render_flat(win, doc, pv) {
    'use strict';



    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @ignore
     * @memberof! PerspectiveView.render_flat
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @ignore
     * @memberof! PerspectiveView.render_flat
     * @type {Object}
     */
    pub = {};



    // ----------------------------------------------------------------------------------------------- Private


    /**
     * Stores the order of to rendered map items.
     *
     * @private
     * @memberof! PerspectiveView.render_flat
     * @function
     * @alias getRenderOrder
     * @type {Array}
     */
    priv.renderOrder = [];



    /**
     * Returns an array of the ordered map items.
     *
     * @private
     * @memberof! PerspectiveView.render_flat
     * @function
     * @alias getRenderOrder
     * @return {Array}
     */
    priv.getRenderOrder = function getRenderOrder(map) {
        var y         = map.length,
            x         = map[0].length,
            orderlist = [];

        // The map will be rendered in reversed order, so the orderlist has also to be determent in reversed order
        while (y--) {
            while (x--) {
                orderlist.push({ x: x, y: y });
            }
        }

        return orderlist;
    };



    /**
     * Handles the rendering of the map
     *
     * @private
     * @memberof! PerspectiveView.render_flat
     * @function
     * @alias renderMap
     * @return {void}
     */
    priv.renderMap = function renderMap(map) {
        var order      = priv.renderOrder,
            itemAmount = order.length,
            context    = pv.getContext(),
            unitSize   = pv.getUnitSize(),
            width      = unitSize.width,
            height     = unitSize.height,
            mapItemPosition,
            mapItemObject;

        context.save();
        while (itemAmount--) {
            mapItemPosition = order[itemAmount];
            mapItemObject   = map[mapItemPosition.y][mapItemPosition.x];

            if (mapItemObject > 0) {
                context.fillStyle = 'rgb(50,50,50)';
            }
            else {
                context.fillStyle = 'rgb(255,255,255)';
            }

            priv.context.fillRect(
                (mapItemPosition.x * width),
                (mapItemPosition.y * height),
                width,
                height
            );
            priv.context.fill();
        }
        context.restore();
    };



    // ------------------------------------------------------------------------------------------------ Public



    // ------------------------------------------------------------------------------------------------ Append



    pv.appendModule({render_flat: pub});



})(window, document, window.PERSPECTIVEVIEW);
