function drawMultiple( ctx, dataPointsSets, minx, maxx, miny, maxy, left, top, width, height ) {
    for ( var key in dataPointsSets ) {
        var dataPoints = dataPointsSets[ key ];
        /* if ( ) {
        } */
        draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height );
    }
}

function draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height ) {
    var g = new Graph( minx, maxx, miny, maxy, left, top, width, height );

    ctx.moveTo( g.transformX( minx ), g.transformY( miny ) );

    var x = dataPoint.x,
        y = dataPoint.y;

    x = g.transformX( x );
    y = g.transformY( y );

    ctx.beginPath();
    ctx.moveTo( x, y );
    for ( var dataPoint in dataPoints ) {
        var x = dataPoint.x,
            y = dataPoint.y;

        x = g.transformX( x );
        y = g.transformY( y );
        ctx.lineTo( x, y );
    }
    ctx.lineTo( g.transformX( maxx ), g.transformY( miny ) );
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
}
