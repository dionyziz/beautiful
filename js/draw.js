function drawMultiple( ctx, dataPointsSets, minx, maxx, miny, maxy, left, top, width, height ) {
    var colors = [ 'green', 'red', 'black', 'blue' ];
    var heightSum;
    dataPointsSets.reverse();
    var grad = ctx.createLinearGradient( 0, 0, 0, height + top );
    grad.addColorStop( 0, "#365a97" );
    grad.addColorStop( 1, "#6c78d5" );
    for ( var i = 0; i < dataPointsSets.length; ++i ) {
        var dataPoints = dataPointsSets[ i ];

        for ( var j = i + 1; j < dataPointsSets.length; ++j ) {
            var lowerDataPoints = dataPointsSets[ j ];
            for ( var key in lowerDataPoints ) {
                dataPoints[ key ] += lowerDataPoints[ key ];
            }

        }

        draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, grad );
    }
}

function draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, color ) {
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
    ctx.fillStyle = color;
    ctx.fill();
}
