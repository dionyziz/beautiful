var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );
var localData = false;
var W, H;
var PADDING_TOP = 10,
    PADDING_RIGHT = 10,
    PADDING_BOTTOM = 10,
    PADDING_LEFT = 100;

function onresize() {
    W = $( window ).width();
    H = $( window ).height();
    canvas.width = W;
    canvas.height = H;
    drawData( localData, 'smart' );
}
$( window ).resize( onresize );
onresize();

function drawData( json, which ) {
    if ( json === false ) {
        return;
    }

    var left = PADDING_LEFT,
        top = PADDING_TOP,
        width = W - PADDING_LEFT - PADDING_RIGHT,
        height = H - PADDING_TOP - PADDING_BOTTOM;
    var dataPoints = [];
    json = JSON.parse( json );

    switch ( which ) { 
        case 'all':
            var nonSmart = json[ 'Non-smart' ];

            for ( var key in nonSmart ) {
                var x = parseDate( key );
                var y = 1 - nonSmart[ key ].phoneShare;
                var xLabel = key;
                var yLabel = Math.round( 100 * nonSmart[ key ].phoneShare ) + '%';
                var dataPoint = {
                    x: x,
                    y: y,
                    xLabel: xLabel,
                    yLabel: yLabel
                };

                dataPoints.push( dataPoint );
            }
            var minx = Infinity, maxx = -Infinity, miny = 0, maxy = 1;

            for ( var key in dataPoints ) {
                var dataPoint = dataPoints[ key ];

                if ( dataPoint.x < minx ) {
                    minx = dataPoint.x;
                }
                if ( dataPoint.x > maxx ) {
                    maxx = dataPoint.x;
                }
            }
            dataPoints.sort( function( a, b ) {
                return a.x - b.x;
            } );
            draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height );
            break;
        case 'smart':
            drawMultiple( ctx, dataPointsSets, minx, maxx, miny, maxy, left, top, width, height );
            break;
        default:
    }
}

wget( 'mobile-platforms.json', function( json ) {
    localData = json;
    drawData( localData, 'smart' );
} );
