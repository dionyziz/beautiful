var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );
var localData = false;
var W, H;
var PADDING_TOP = 10,
    PADDING_RIGHT = 150,
    PADDING_BOTTOM = 50,
    PADDING_LEFT = 100;

currentMode = 'all';
function onresize() {
    W = $( window ).width();
    H = $( window ).height() - 100;
    canvas.width = W;
    canvas.height = H;
    drawData( localData, currentMode );
    switch ( currentMode ) {
        case 'all':
            $( 'h1' ).text( 'Phone market share - Non-smart phones VS Smart phones' );
            $( 'a' ).text( 'Click for market breakdown' );
            break;
        case 'smart':
            $( 'h1' ).text( 'Smart phone market breakdown' );
            $( 'a' ).text( 'Click for smartphones VS non-smart phones' );
            break;
    }
}
$( window ).resize( onresize );
onresize();

var allColor = [ 65, 106, 225 ];
function drawData( json, which ) {
    ctx.clearRect( 0, 0, W, H );
    if ( json === false ) {
        return;
    }

    var left = PADDING_LEFT,
        top = PADDING_TOP,
        width = W - PADDING_LEFT - PADDING_RIGHT,
        height = H - PADDING_TOP - PADDING_BOTTOM;
    json = JSON.parse( json );
    var dataPoints;

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

            var grad = ctx.createLinearGradient( 0, 0, 0, height + top );
            var light = lightColor( allColor );
            grad.addColorStop( 0, 'rgb(' + allColor.join( ',' ) + ')' );
            grad.addColorStop( 1, 'rgb(' + light.join( ',' ) + ')' );
            var values = [];
            for ( var i = 0; i <= 100; i += 10 ) {
                values.push( i + '%' );
            }
            var xlabels = collectXLabels( dataPoints );
            for ( var key in dataPoints ) {
                dataPoints[ key ].y = 1 - dataPoints[ key ].y;
            }

            draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, grad );
            drawAxes( ctx, left, top, width, height, xlabels, values, {
                size: 12,
                color: 'transparent',
                fillColor: 'black',
                family: 'Trebuchet MS'
            }, 'rgba( 255, 255, 255, 0.5 )', 'black' );
            break;
            break;
        case 'smart':
            var minx = Infinity, miny = Infinity;
            var maxx = 0, maxy = 0;
            var dataPointsSets = [];
            var colors = { 'Symbian': [ 231, 191, 109 ], 'iOS iPhone': [ 211, 211, 212 ], 'BlackBerry': [ 44, 44, 44 ], 'Android': [ 151, 192, 62 ], 'Windows Mobile/Phone': [ 0, 165, 227 ], 'Bada': [ 4, 78, 92 ] };
            for ( var key in json ) {
                if ( key == 'Non-smart' ) {
                    continue;
                }
                
                dataPoints = json[ key ];
                var processed = process( dataPoints, 'smartphoneShare' );
                dataPointsSets.push( { color: colors[ key ], data: processed.dataPoints } );
                minx = Math.min( processed.minx, minx );
                maxx = Math.max( processed.maxx, maxx );
                miny = Math.min( processed.miny, miny );
                maxy = Math.max( processed.maxy, maxy );
            }
            console.log( dataPointsSets );
            drawMultiple( ctx, dataPointsSets, minx, maxx, miny, maxy, left, top, width, height );
            var values = [];
            for ( var i = 0; i <= 100; i += 10 ) {
                values.push( i + '%' );
            }
            var xlabels = collectXLabels( dataPointsSets[ 0 ].data );
            drawAxes( ctx, left, top, width, height, xlabels, values, {
                size: 12,
                color: 'transparent',
                fillColor: 'black',
                family: 'Trebuchet MS'
            }, 'rgba( 255, 255, 255, 0.5 )', 'black' );
            break;
        default:
            break;
    }
}

wget( 'mobile-platforms.json', function( json ) {
    localData = json;
    currentMode = 'all';
    drawData( localData, currentMode );
} );

var onSmart = false,
    executed = false;
canvas.onmousemove = function( e ) {
    if ( isPoint ) {
        onSmart = isPoint( e.clientX, e.clientY );
    }
    if ( !onSmart && executed ) {
        allColor[ 2 ] -= 25;
        onresize();
        executed = false;
    }
    if ( !executed && onSmart ) {
        console.log( 'Mouseover!' );
        allColor[ 2 ] += 25;
        onresize();
        executed = true;
    }
};
canvas.onmousedown = function() {
    if ( currentMode == 'smart' ) {
        currentMode = 'all';
    }
    else {
        currentMode = 'smart';
    }
    onresize();
};
$( 'a' ).click( function() {
    canvas.onmousedown();
    return false;
} );
