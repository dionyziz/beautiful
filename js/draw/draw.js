function drawBackground( ctx, topx, topy, bottomx, bottomy, topColor, bottomColor, width, height, top, left ) {
    var grad = ctx.createLinearGradient( topx + left, topy + top, bottomx + left, bottomy + top );
    grad.addColorStop( 0, topColor );
    grad.addColorStop( 1, bottomColor );

    ctx.beginPath()
    ctx.fillStyle = grad;
    ctx.fillRect( left, top, width, height );
}
function drawLegend( ctx, colors, page, top ) {
    var x = 5;
    var padding = 5;

    ctx.font = "10pt Arial";
    ctx.strokeStyle = "#000";


    if ( page == "smart" ) {
        var devices = [ "Android", "Bada", "BlackBerry", "Symbian", "Windows Mobile/Phone", "iOS iPhone" ];

        ctx.fillStyle = "#555";
        ctx.fillRect( padding + 4, top, 180, ( devices.length + 1 ) * 30 + top );

        for ( var i = 0; i < devices.length; ++i ) {
            ctx.beginPath();
            ctx.fillStyle = "rgb( " + colors[ devices[ i ] ][ 0 ] + ", " + colors[ devices[ i ] ][ 1 ] + ", " + colors[ devices[ i ] ][ 2 ] + " )";
            ctx.fillRect( padding + 9, top + i * 30 + 10, 20, 20 ); 
            ctx.strokeRect( padding + 9, top + i * 30 + 10, 20, 20 ); 
            ctx.fillStyle = "#fff";
            ctx.fillText( devices[ i ], padding + x + 34, top + i * 30 + 25 );
        }
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.fillRect( padding + 9, top + 6 * 30 + 10, 20, 20 ); 
        ctx.strokeRect( padding + 9, top + 6 * 30 + 10, 20, 20 ); 
        ctx.fillStyle = "#fff";
        ctx.fillText( "Other", padding + x + 34, top + 6 * 30 + 25 );
    }
    else {
        var categories = [ 'Non-smart phones', 'Smartphones' ];
        var colors = [ '#f48c2f', '#193585' ];

        ctx.fillStyle = "#555";
        ctx.fillRect( padding + 4, top, 180, ( categories.length ) * 30 + top );
        
        for ( var i = 0; i < categories.length; ++i ) {
            ctx.beginPath();
            ctx.fillStyle = colors[ i ];
            ctx.fillRect( padding + 9, top + i * 30 + 10, 20, 20 ); 
            ctx.strokeRect( padding + 9, top + i * 30 + 10, 20, 20 ); 
            ctx.fillStyle = "#fff";
            ctx.fillText( categories[ i ], padding + x + 34, top + i * 30 + 25 );
        }
    }
}
function drawMultiple( ctx, dataPointsSets, minx, maxx, miny, maxy, left, top, width, height, animatepercentage ) {
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

        draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, grad, animatepercentage );
    }
}

function draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, color, animatepercentage ) {
    var g = new Graph( minx, maxx, miny, maxy, left, top, width, height );

    if ( typeof animatepercentage == 'undefined' ) {
        animatepercentage = 1;
    }

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
            y: dataPoint.y * animatepercentage
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
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}
