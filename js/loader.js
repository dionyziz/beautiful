var canvas = document.getElementsByTagName( 'canvas' );
var ctx = canvas.getContext( '2d' );

wget( 'mobile-platforms.json', function( json ) {
    data = [];
    json = JSON.parse( json );
    nonSmart = json[ 'Non-smart' ];

    for ( key in nonSmart ) {
        var x = parseDate( key );
        var y = nonSmart[ key ].phoneShare;
        var xLabel = key;
        var yLabel = Math.round( 100 * nonSmart[ key ].phoneShare ) + '%';
        var dataPoint = {
            x: x,
            y: y,
            xLabel: xLabel,
            yLabel: yLabel
        };

        data.push( dataPoint );
    }
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
    data.sort( function( a, b ) {
        return a.x - b.x;
    } );
    draw( data );
} );
