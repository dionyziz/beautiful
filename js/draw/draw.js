function drawBackground( ctx, topx, topy, bottomx, bottomy, topColor, bottomColor, width, height, top, left ) {
    var grad = ctx.createLinearGradient( topx + left, topy + top, bottomx + left, bottomy + top );
    grad.addColorStop( 0, topColor );
    grad.addColorStop( 1, bottomColor );

    ctx.beginPath()
    ctx.fillStyle = grad;
    ctx.fillRect( left, top, width, height );
}
function drawMultiple( ctx, dataPointsSets, minx, maxx, miny, maxy, left, top, width, height ) {
    var colors = [
        [ 0, 255, 0 ],
        [ 255, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 255 ],
        [ 255, 255, 0 ],
        [ 255, 100, 100 ],
        [ 255, 100, 0 ]
    ];
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
                dataPoints[ key ].y += lowerDataPoints[ key ].y;
            }

        }

        draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, 'rgb(' + colors.pop().join( ',' ) + ')' );
    }
}

function draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, color ) {
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
