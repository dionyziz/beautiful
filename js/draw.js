function draw( ctx, dataPoints, miny, maxy, left, top, width, height ) {
    var minx = Infinity, maxx = -Infinity;

    for ( var dataPoint in dataPoints ) {
        if ( dataPoint.x < minx ) {
            minx = dataPoint.x;
        }
        if ( dataPoint.x > maxx ) {
            maxx = dataPoint.x;
        }
        if ( dataPoint.y < miny ) {
            miny = dataPoint.y;
        }
        if ( dataPoint.y > maxy ) {
            maxy = dataPoint.y;
        }
    }
    var g = new Graph( minx, maxx, miny, maxy, left, top, width, height );

    ctx.moveTo( g.transformX( minx ), miny );

    var x = dataPoint.x,
        y = dataPoint.y;

    x = g.transformX( x );
    y = g.transformY( y );

    ctx.moveTo( x, y );
    for ( var dataPoint in dataPoints ) {
        var x = dataPoint.x,
            y = dataPoint.y;

        x = g.transformX( x );
        y = g.transformY( y );
        ctx.lineTo( x, y );
    }

}
