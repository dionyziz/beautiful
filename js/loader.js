var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );
var localData = false;
var W, H;
var PADDING_TOP = 10,
    PADDING_RIGHT = 150,
    PADDING_BOTTOM = 50,
    PADDING_LEFT = 200;
var animating = false;
var graphAnimation = 0;

function playGraphAnimation() {
    graphAnimation += Math.cos( graphAnimation * Math.PI / 2.1 ) * 0.02;
    if ( graphAnimation > 1 ) {
        graphAnimation = 1;
    }
    else {
        setTimeout( playGraphAnimation, 20 );
    }
    onresize();
}

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

playGraphAnimation();

var allColor = [ 65, 106, 225 ];
isPoint = false;
function drawData( json, which ) {
    if ( animating ) {
        return;
    }
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
    var colors = { 'Symbian': [ 253, 200, 47 ], 'iOS iPhone': [ 211, 211, 212 ], 'BlackBerry': [ 44, 44, 44 ], 'Android': [ 151, 192, 62 ], 'Windows Mobile/Phone': [ 0, 165, 227 ], 'Bada': [ 4, 78, 92 ] };

    switch ( which ) { 
        case 'all':
            var nonSmart = json[ 'Non-smart' ];
            var processed = process( nonSmart, 'phoneShare' );

            dataPoints = processed.dataPoints;
            minx = processed.minx;
            maxx = processed.maxx;
            miny = processed.miny;
            maxy = processed.maxy;
            color = [ 249, 194, 145 ];
            light = lightColor( color );
            color = 'rgb( ' + color.join( ',' ) + ' )';
            light = 'rgb( ' + light.join( ',' ) + ' )';
            drawBackground( ctx, 0, 0, 0, height, color, light, width, height, top, left );

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

            drawLegend( ctx, colors, 'all' );
            draw( ctx, dataPoints, minx, maxx, miny, maxy, left, top, width, height, grad, graphAnimation );
            drawAxes( ctx, left, top, width, height, xlabels, values, {
                size: 12,
                color: 'transparent',
                fillColor: 'black',
                family: 'Trebuchet MS'
            }, {
                size: 12,
                color: 'transparent',
                fillColor: 'white',
                family: 'Trebuchet MS'
            }, 'rgba( 255, 255, 255, 0.5 )', 'black' );
            break;
        case 'smart':
            var minx = Infinity, miny = Infinity;
            var maxx = 0, maxy = 0;
            var dataPointsSets = [];
            for ( var key in json ) {
                if ( key == 'Non-smart' ) {
                    continue;
                }
                
                dataPoints = json[ key ];
                var processed = process( dataPoints, 'smartphoneShare' );
                dataPointsSets.push( { color: colors[ key ], data: processed.dataPoints } );
                drawLegend( ctx, colors, 'smart' );
                minx = Math.min( processed.minx, minx );
                maxx = Math.max( processed.maxx, maxx );
                miny = Math.min( processed.miny, miny );
                maxy = Math.max( processed.maxy, maxy );
            }
            drawMultiple( ctx, dataPointsSets, minx, maxx, miny, maxy, left, top, width, height, graphAnimation );
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
            }, {
                size: 12,
                color: 'transparent',
                fillColor: 'white',
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

canvas.onmousedown = function() {
    if ( currentMode == 'smart' ) {
        currentMode = 'all';
    }
    else {
        currentMode = 'smart';
    }
    animating = true;

    $( 'canvas' ).fadeOut( 300, function() {
        animating = false;
        onresize();
        animating = true;
        graphAnimation = 0;
        playGraphAnimation();
        $( 'canvas' ).fadeIn( 300, function() {
            animating = false;
            onresize();
        } );
    } );
};
$( 'a' ).click( function() {
    canvas.onmousedown();
    return false;
} );
