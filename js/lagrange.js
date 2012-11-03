function lagrange( points ) {
    function l( j, x, points ) {
        var P = 1;

        for ( var m = 0; m < points.length; ++m ) {
            if ( m != j ) {
                P *= ( x - points[ m ].x ) / ( points[ j ].x - points[ m ].x );
            }
        }
        return P;
    }
    return function( x ) {
        var S = 0;
        for ( var j = 0; j < points.length; ++j ) {
            S += points[ j ].y * l( j, x, points );
        }
        return S;
    };
}
