function drawBackground( ctx, topx, topy, bottomx, bottomy, topColor, bottomColor, width, height, top, left ) {
    var grad = ctx.createLinearGradient( topx + left, topy + top, bottomx + left, bottomy + top );
    grad.addColorStop( 0, topColor );
    grad.addColorStop( 1, bottomColor );

    ctx.beginPath()
    ctx.fillStyle = grad;
    ctx.fillRect( left, top, width, height );
}
function drawLegend( ctx, colors, " ) {
    var x = 5;
    console.log( colors );

    ctx.font = "10pt Arial";
    ctx.strokeStyle = "#000";

    if ( page == "smart" ) {
        ctx.beginPath();
        ctx.fillStyle = "rgb( " + colors.Android[ 0 ] + ", " + colors.Android[ 1 ] + ", " + colors.Android[ 2 ] + " )";
        ctx.fillRect( 5, 0 * 30 + 10, 20, 20 ); 
        ctx.strokeRect( 5, 0 * 30 + 10, 20, 20 ); 
        ctx.fillText( "Android", x + 30, 0 * 30 + 25 );

        ctx.beginPath();
        ctx.fillStyle = "rgb( " + colors.Bada[ 0 ] + ", " + colors.Bada[ 1 ] + ", " + colors.Android[ 2 ] + " )";
        ctx.fillRect( 5, 1 * 30 + 10, 20, 20 ); 
        ctx.strokeRect( 5, 1 * 30 + 10, 20, 20 ); 
        ctx.fillText( "Bada", x + 30, 1 * 30 + 25 );

        ctx.beginPath();
        ctx.fillStyle = "rgb( " + colors.BlackBerry[ 0 ] + ", " + colors.BlackBerry[ 1 ] + ", " + colors.BlackBerry[ 2 ] + " )";
        ctx.fillRect( 5, 2 * 30 + 10, 20, 20 ); 
        ctx.strokeRect( 5, 2 * 30 + 10, 20, 20 ); 
        ctx.fillText( "BlackBerry", x + 30, 2 * 30 + 25 );

        ctx.beginPath();
        ctx.fillStyle = "rgb( " + colors.Symbian[ 0 ] + ", " + colors.Symbian[ 1 ] + ", " + colors.Symbian[ 2 ] + " )";
        ctx.fillRect( 5, 3 * 30 + 10, 20, 20 ); 
        ctx.strokeRect( 5, 3 * 30 + 10, 20, 20 ); 
        ctx.fillText( "Symbian", x + 30, 3 * 30 + 25 );

        ctx.beginPath();
        ctx.fillStyle = "rgb( " + colors[ "Windows Mobile/Phone" ][ 0 ] + ", " + colors[ "Windows Mobile/Phone" ][ 1 ] + ", " + colors[ "Windows Mobile/Phone" ][ 2 ] + " )";
        ctx.fillRect( 5, 4 * 30 + 10, 20, 20 ); 
        ctx.strokeRect( 5, 4 * 30 + 10, 20, 20 ); 
        ctx.fillText( "Windows Mobile/Phone", x + 30, 4 * 30 + 25 );

        ctx.beginPath();
        ctx.fillStyle = "rgb( " + colors[ "iOS iPhone" ][ 0 ] + ", " + colors[ "iOS iPhone" ][ 1 ] + ", " + colors[ "iOS iPhone" ][ 2 ] + " )";
        ctx.fillRect( 5, 5 * 30 + 10, 20, 20 ); 
        ctx.strokeRect( 5, 5 * 30 + 10, 20, 20 ); 
        ctx.fillText( "iOS iPhone", x + 30, 5 * 30 + 25 );

        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.fillRect( 5, 6 * 30 + 10, 20, 20 ); 
        ctx.strokeRect( 5, 6 * 30 + 10, 20, 20 ); 
        ctx.fillStyle = "#000";
        ctx.fillText( "Other", x + 30, 6 * 30 + 25 );
    }
    else {

    }
}
function drawMultiple( ctx, dataPointsSets, minx, maxx, miny, maxy, left, top, width, height ) {
    dataPointsSets.reverse();
    for ( var i = 0; i < dataPointsSets.length; ++i ) {
        var grad = ctx.createLinearGradient( 0, 0, 0, height + top );
        var color = dataPointsSets[ i ].color;
        grad.addColorStop( 0, 'rgb(' + color.join( ',' ) + ')' );
        var light = lightColor( color );
        grad.addColorStop( 1, 'rgb(' + light.join( ',' ) + ')' );

        var dataPoints = dataPointsSets[ i ].data;

        for ( var j = i + 1; j < dataPointsSets.length; ++j ) {
            var lowerDataPoints = dataPointsSets[ j ].data;
            for ( var key in lowerDataPoints ) {
                dataPoints[ key ].y += lowerDataPoints[ key ].y;
            }

        }

        draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, grad );
    }
}

function draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, color, callback ) {
    var g = new Graph( minx, maxx, miny, maxy, left, top, width, height );

    ctx.beginPath();

    ctx.moveTo( g.transformX( minx ), g.transformY( miny ) );

    var x = dataPoints[ 0 ].x,
        y = dataPoints[ 0 ].y;

    x = g.transformX( x );
    y = g.transformY( y );

    ctx.lineTo( x, y );
    var polynomial = [];
    for ( var key in dataPoints ) {
        var dataPoint = dataPoints[ key ];
        polynomial.push( {
            x: dataPoint.x,
            y: dataPoint.y
        } );
    }
    // var f = lagrange( polynomial );

    for ( var i = 0; i < polynomial.length; ++i ) {
        var dataPoint = polynomial[ i ];
        var nextPoint = polynomial[ i + 1 ];
        var xp = g.transformX( dataPoint.x );
        var yp = g.transformY( dataPoint.y );

        ctx.lineTo( xp, yp );
    }
    ctx.lineTo( g.transformX( maxx ), g.transformY( miny ) );
    callback = function( x, y ) {
        return ctx.isPointInPath( x, y );
    };
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}
