/**
 * @class PerspectiveView
 */
function PerspectiveView(config) {
    'use strict';



    // ------------------------------------------------------------------------------------------------- Scope



    /**
     * Stores the private scope.
     *
     * @private
     * @memberof PerspectiveView
     * @type {Object}
     */
    var priv = {},



    /**
     * Stores the public scope.
     *
     * @public
     * @memberof PerspectiveView
     * @type {Object}
     */
    pub = {},



    DEVELOP_MODE = true;



    // ----------------------------------------------------------------------------------------------- Private


    /**
     *
     * @private
     * @alias canvas
     * @memberof PerspectiveView
     * @type {Object}
     */
    priv.canvas = {};



    priv.context = {};



    priv.map = [[0]];



    priv.referencePoint = {
        x: 0,
        y: 0
    };



    priv.unit = {
        width:  0,
        height: 0
    };



    priv.depth =  0.1;



    priv.color = { r: 50, g: 50, b: 50 };



    priv.referenceGrid = {
        x: 0,
        y: 0
    };



    priv.renderOrder = [];



    priv.fallback = {
        depth: 0.1,
        unit: {
            width:  1,
            height: 1
        }
    };



    /**
     * Returns the order of objects to be rendered.
     * Every object of the map has to rendered in a special order. The most widely distant object must be rendered at
     * first. The closer an object is positioned at the reference point, the later it is rendered.
     *
     * @private
     * @alias getRenderOrder
     * @function
     * @memberof PerspectiveView
     * @return {Array}
     */
    priv.getRenderOrder = function getRenderOrder() {
        var yAmount = priv.map.length,
            xAmount = priv.map[0].length,
            x       = 0,
            y       = 0,
            rpx     = priv.referenceGrid.x,
            rpy     = priv.referenceGrid.y,
            orderX  = [],
            orderY  = [],
            order   = [];

        // Get reversed x render order
        for (x = rpx; x < xAmount; x++) {
            orderX.push(x);
        }

        for (x = rpx-1; x >= 0 ; x--) {
            orderX.push(x);
        }


        // Get reversed y render order
        for (y = rpy; y < yAmount; y++) {
            orderY.push(y);
        }

        for (y = rpy - 1; y >= 0 ; y--) {
            orderY.push(y);
        }

        // Merge the x and y render order
        for (y = 0; y < yAmount; y++) {
            for (x = 0; x < xAmount; x++) {
                order.push({
                    x: orderX[x],
                    y: orderY[y]
                });
            }
        }

        return order;
    };



    /**
     * Renders a simple cuboid at the given grid position with an optionally given depth / virtual height.
     *
     * @private
     * @memberof PerspectiveView
     * @param  {Number} x - Grid position on x axis
     * @param  {Number} y - Grid position on y axis
     * @param  {Number} d - Depths of the cuboid
     * @return {Object} PerspectiveView
     */
    priv.renderSimpleCuboid = function renderSimpleCuboid(x, y, d) {
        var cameraCenterX               = priv.referencePoint.x,
            cameraCenterY               = priv.referencePoint.y,
            referenceGridX              = priv.referenceGrid.x,
            referenceGridY              = priv.referenceGrid.y,
            objectWidth                 = Number(priv.unit.width),
            objectHeight                = Number(priv.unit.height),
            absoluteObjectBasePositionX = Number(x * objectWidth),
            absoluteObjectBasePositionY = Number(y * objectHeight),
            depth                       = priv.depth,
            objectDepth                 = d * depth,
            color                       = priv.color,

            ground = {
                tlx: absoluteObjectBasePositionX,
                tly: absoluteObjectBasePositionY,
                trx: absoluteObjectBasePositionX + objectWidth,
                try: absoluteObjectBasePositionY,
                brx: absoluteObjectBasePositionX + objectWidth,
                bry: absoluteObjectBasePositionY + objectHeight,
                blx: absoluteObjectBasePositionX,
                bly: absoluteObjectBasePositionY + objectHeight
            },
            distance = {
                tlx: ground.tlx - cameraCenterX,
                tly: ground.tly - cameraCenterY,
                trx: ground.trx - cameraCenterX,
                try: ground.try - cameraCenterY,
                brx: ground.brx - cameraCenterX,
                bry: ground.bry - cameraCenterY,
                blx: ground.blx - cameraCenterX,
                bly: ground.bly - cameraCenterY
            },
            paths = {
                base:  [],
                roof:  [],
                north: [],
                east:  [],
                south: [],
                west:  []
            };

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

        if (d > 0) {
            if (y > referenceGridY) {
                priv.drawSimplePath({
                    type: 'north',
                    path:  paths.north,
                    color: priv.getSimpleCuboidShapeColor(color, 'north')
                });
            }
            if (x < referenceGridX) {
                priv.drawSimplePath({
                    type: 'east',
                    path: paths.east,
                    color: priv.getSimpleCuboidShapeColor(color, 'east')
                });
            }

            if (referenceGridX < x) {
                priv.drawSimplePath({
                    type: 'west',
                    path: paths.west,
                    color: priv.getSimpleCuboidShapeColor(color, 'west')
                });
            }

            if (referenceGridY > y) {
                priv.drawSimplePath({
                    type: 'south',
                    path: paths.south,
                    color: priv.getSimpleCuboidShapeColor(color, 'south')
                });
            }

            priv.drawSimplePath({
                type: 'roof',
                path: paths.roof,
                color: priv.getSimpleCuboidShapeColor(color, 'roof', d)
            });
        }
        //console.log(priv.getSimpleCuboidShapeColor(color, 'roof', d));
    };



    /**
     * Returns an rgb color object.
     * To create a virtual illuminated object the 5 shapes of the object will colored in different gradations.
     *
     * @private
     * @memberof PerspectiveView
     * @param  {Object} color - rgb color object
     * @param  {String} type  - Type of the cuboid shape [north|east|south|west|roof]
     * @return {Object}
     */
    priv.getSimpleCuboidShapeColor = function getSimpleCuboidShapeColor(color, type, depth) {
        var factor = 2.25,
            r, g, b;

        switch (type) {
            case 'north':
                r =  Math.floor(color.r + (factor * -10));
                g =  Math.floor(color.g + (factor * -10));
                b =  Math.floor(color.b + (factor * -10));
                break;

            case 'east':
                r =  Math.floor(color.r + (factor * -8));
                g =  Math.floor(color.g + (factor * -8));
                b =  Math.floor(color.b + (factor * -8));
                break;

            case 'south':
                r =  Math.floor(color.r + (factor * 10));
                g =  Math.floor(color.g + (factor * 10));
                b =  Math.floor(color.b + (factor * 10));
                break;

            case 'west':
                r =  Math.floor(color.r + (factor * 8));
                g =  Math.floor(color.g + (factor * 8));
                b =  Math.floor(color.b + (factor * 8));
                break;

            case 'roof':
            default:
                r =  Math.floor(color.r + (factor * 2 * depth));
                g =  Math.floor(color.g + (factor * 2 * depth));
                b =  Math.floor(color.b + (factor * 2 * depth));
        }

        return {
            r: r,
            g: g,
            b: b
        };
    };



    /**
     * Draws a simple closed path, strokes and fills it.
     *
     * @private
     * @memberof PerspectiveView
     * @param  {Object} parameters       - Parameters
     * @param  {Array}  parameters.path  - List of xy-points
     * @param  {Object} parameters.color - Color of the filled shape
     * @return {Object} PerspectiveView
     */
    priv.drawSimplePath = function drawSimplePath(parameters) {
        var param      = parameters,
            path       = param.path,
            color      = param.color,
            pathAmount = path.length,
            i;



        priv.context.save();

        priv.context.strokeStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
        priv.context.fillStyle   = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
        priv.context.lineWidth   = 1;

        priv.context.beginPath();
        priv.context.moveTo(path[0].x, path[0].y);

        for (i = 1; i < pathAmount; i++) {
            priv.context.lineTo(path[i].x, path[i].y);
        }
        priv.context.closePath();
        priv.context.stroke();
        priv.context.fill();

        priv.context.restore();

        return this;
    };



    // ------------------------------------------------------------------------------------------------ Public



    /**
     * Initialize this module.
     *
     * @public
     * @memberof PerspectiveView
     * @param {Object} config - Optionally config parameters
     * @return {void}
     */
    pub.init = function init(config) {
        // @todo: set config
    };



    /**
     * Sets the entire or just parts of the config.
     *
     * @public
     * @memberof PerspectiveView
     * @param  {Object} configuration - Optionally config parameters
     * @return {Object} PerspectiveView
     */
    pub.setConfig = function setConfig(configuration) {
        var config         = configuration,
            canvas         = config.canvas,
            context        = config.context,
            unit           = config.unit,
            depth          = config.depth,
            referencePoint = config.referencePoint,
            map            = config.map;

        pub.setCanvas(canvas);
        //pub.setContext(context);
        pub.setUnitSize(unit.width, unit.height);
        pub.setDepth(depth);
        pub.setReferencePoint(referencePoint.x, referencePoint.y);
        pub.setMap(map);

        return this;
    };



    /**
     * Sets the HTML canvas element in which the perspective view should be rendered and sets automatically the context
     * to 2d.
     *
     * @public
     * @memberof PerspectiveView
     * @param  {Object} canvas - HTML canvas element.
     * @return {Object} PerspectiveView
     */
    pub.setCanvas = function(canvas) {
        // todo validation of canvas

        priv.canvas  = canvas;
        pub.setContext(canvas.getContext("2d"));

        return this;
    };



    /**
     * Sets the context of the canvas element.
     *
     * @public
     * @memberof PerspectiveView
     * @param  {Object} context - Context of the canvas
     * @return {Object} PerspectiveView
     */
    pub.setContext = function(context) {
        // todo validation of context

        priv.context  = context;

        return this;
    };



    /**
     * Sets the depth of the perspective view. The current distance between the reference point and a common edge of an
     * object will be multiplied with this depth to get the virtual height of an object to makes it look like a 3D
     * object. If the factor is too high, the view is distorted.
     *
     * @public
     * @memberof PerspectiveView
     * @param  {Number} depth - Factor of
     * @return {Object} PerspectiveView
     */
    pub.setDepth = function(depth) {
        /** <<DEVELOP_MODE_START>> */
        if (DEVELOP_MODE) {
            // todo: Check for set private property
            if (typeof depth !== 'number') {
                console.warn('depth is not a valid number! Fallback-Set to depth = ' + priv.fallback.depth);
                depth = priv.fallback.depth;
            }
        }
        /** <<DEVELOP_MODE_END>> */

        priv.depth = depth;

        return this;
    };



    /**
     * Sets the size an unit. A unit is usually the size of a common tile.
     *
     * @public
     * @memberof PerspectiveView
     * @param  {Number} width  - Width of an unit in px
     * @param  {Number} height - Height of an unit in px
     * @return {Object} PerspectiveView
     */
    pub.setUnitSize = function setUnitSize(width, height){
        if (DEVELOP_MODE) {
            // todo Check for set private property
            if (typeof width !== 'number') {
                console.warn('unit.width is not a valid number! Fallback-Set to unit.width = ' + priv.fallback.unit.width);
                width = priv.fallback.unit.width;
            }

            if (typeof height !== 'number') {
                console.warn('unit.height is not a valid number! Fallback-Set to unit.height = ' + priv.fallback.unit.height);
                height = priv.fallback.unit.height;
            }
        }

        priv.unit.width  = width;
        priv.unit.height = height;

        return this;
    };



    /**
     * Sets the reference point.
     * The reference point is usually the center position of the canvas or the current position of the player object.
     *
     * @public
     * @memberof PerspectiveView
     * @param  {Object}  -
     * @return {Object} PerspectiveView
     */
    pub.setReferencePoint = function setReferencePoint(x, y){
        var gridX, gridY;

        if (DEVELOP_MODE) {
            // todo Check for set private property
            if (typeof x !== 'number') {
                console.warn('referencePoint.x is not a valid number! Fallback-Set to referencePoint.x = 0');
                x = 1;
            }

            if (typeof y !== 'number') {
                console.warn('referencePoint.y is not a valid number! Fallback-Set to referencePoint.y = 1');
                y = 1;
            }
        }

        priv.referencePoint.x = x;
        priv.referencePoint.y = y;

        gridX = Math.floor(x / priv.unit.width);
        gridY = Math.floor(y / priv.unit.height);

        if ((gridX !== priv.referenceGrid.x) || (gridY !== priv.referenceGrid.y)) {
            priv.referenceGrid.x = gridX;
            priv.referenceGrid.y = gridY;
            priv.renderOrder     = priv.getRenderOrder(true);
        }

        return this;
    };


    // todo: New method setColor() width height-color-factor as param


    /**
     * Sets the map to be rendered and creates the render order.
     *
     * @public
     * @memberof PerspectiveView
     * @param  {Array}  map - Map
     * @return {Object} PerspectiveView
     */
    pub.setMap = function setMap(map){
        if (DEVELOP_MODE) {
            // todo Check for set private property
            if( Object.prototype.toString.call(map) !== '[object Array]' ) {
                console.warn('map is not a valid array! Fallback-Set to map = [[0]]');
            }
            else {
                if( Object.prototype.toString.call(map[0]) !== '[object Array]' ) {
                    console.warn('map is not a valid array! Fallback-Set to map = [[0]]');
                }
            }
        }

        priv.map         = map;
        priv.renderOrder = priv.getRenderOrder(true);

        return this;
    };



    /**
     * Renders the complete map.
     *
     * @public
     * @memberof PerspectiveView
     * @return {Object} PerspectiveView
     */
    pub.render = function render() {
        var mapItemCounter = priv.renderOrder.length,
            currentMapItemPosition, currentMapItem;

        while(mapItemCounter--) {
            currentMapItemPosition = priv.renderOrder[mapItemCounter];
            currentMapItem         = priv.map[currentMapItemPosition.y][currentMapItemPosition.x];

            // todo currentMapItem validation
            if (currentMapItem === null) { continue; }

            priv.renderSimpleCuboid(currentMapItemPosition.x, currentMapItemPosition.y, currentMapItem);
        }

        return this;
    };



    // ------------------------------------------------------------------------------------------------ Append



    pub.init(config);
    return pub;



}
