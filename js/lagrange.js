function lagrange( points ) {
    function l( j, x, points ) {
        var P = 1;
        var i = 0;
        for ( i = 0; i < points.length; ++i ) {
            if ( i != j ) {
                P *= ( x - points[ i ].x )/( points[ j ].x - points[ i ].x );
            }
        }
        return P;
    }
    return function( x ) {
        var S = 0;
        var i = 0;
        for ( i = 0; i < points.length; ++i ) {
            S += points[ i ].y * l( i, x, points );
        }
        return S;
    };
}
