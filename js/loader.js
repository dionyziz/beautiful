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
    json = JSON.parse( json );

    switch ( which ) { 
        case 'all':
            var nonSmart = json[ 'Non-smart' ];
            var processed = process( nonSmart, 'phoneShare' );

            dataPoints = processed.dataPoints;
            minx = processed.minx;
            maxx = processed.maxx;
            miny = processed.miny;
            maxy = processed.maxy;
            drawBackground( ctx, 0, 0, 0, height, "#f48b2d", "#fff",  width, height, top, left );
            draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height );
            break;
        case 'smart':
            var minx = miny = Infinity;
            var maxx = maxy = 0;
            dataPointsSets = [];
            for ( var key in json ) {
                if ( key == 'Non-smart' ) {
                    continue;
                }
                
                dataPoints = json[ key ];
                processed = process( dataPoints, 'smartphoneShare' );
                dataPointsSets.push( processed.dataPoints );
                minx = Math.min( processed.minx, minx );
                maxx = Math.max( processed.maxx, maxx );
                miny = Math.min( processed.miny, miny );
                maxy = Math.max( processed.maxy, maxy );
            }
            drawMultiple( ctx, dataPointsSets, minx, maxx, miny, maxy, left, top, width, height );
            break;
        default:
            break;
    }
}

wget( 'mobile-platforms.json', function( json ) {
    localData = json;
    drawData( localData, 'smart' );
} );
