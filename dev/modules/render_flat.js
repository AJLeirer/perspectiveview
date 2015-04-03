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
                orderlist.push(map[y][x]);
            }
        }

        return orderlist;
    };


    // ------------------------------------------------------------------------------------------------ Public



    // ------------------------------------------------------------------------------------------------ Append



    pv.appendModule({render_flat: pub});



})(window, document, window.PERSPECTIVEVIEW);
