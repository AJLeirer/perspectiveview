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
        var map       = pv.getMap(),
            yAmount   = map.length,
            xAmount   = map[0].length,
            orderlist = [],
            x,y;

        // ...

        return orderlist;
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
            unitSize   = pv.getUnitSize(),
            mapItemPosition,
            mapItemObject;

        // ...
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
