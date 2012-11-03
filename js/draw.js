function drawMultiple( ctx, dataPointsSets, minx, maxx, miny, maxy, left, top, width, height ) {
    for ( var key in dataPointsSets ) {
        var dataPoints = dataPointsSets[ key ];
        /* if ( ) {
        } */
        draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height );
    }
}

function draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height ) {
    console.log( dataPoints.length );

    var g = new Graph( minx, maxx, miny, maxy, left, top, width, height );

    ctx.beginPath();

    ctx.moveTo( g.transformX( minx ), g.transformY( miny ) );

    var x = dataPoints[ 0 ].x,
        y = dataPoints[ 0 ].y;

    x = g.transformX( x );
    y = g.transformY( y );

    ctx.lineTo( x, y );
    for ( var key in dataPoints ) {
        var dataPoint = dataPoints[ key ];
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
