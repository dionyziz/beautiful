var WIDTH = 700,
    HEIGHT = 820;
var g = new Graph( 0, , miny, maxy, 100, 20, 600, 800 );

function f( x ) {
    return Math.sin( x );
}

for ( var x = 1; x < 12; ++x ) {
    g.transformX( x );
    g.transformY( f( x ) );
}
