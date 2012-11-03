function process( obj, shareType ) {
    var dataPoints = [];
    for ( var key in obj ) {
        var x = parseDate( key );
        var y = obj[ key ][ shareType ];
        var xLabel = key;
        var yLabel = Math.round( 100 * obj[ key ][ shareType ] ) + '%';
        var dataPoint = {
            x: x,
            y: y,
            xLabel: xLabel.split( ' ' )[ 1 ],
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

    return {
        dataPoints: dataPoints,
        minx: minx,
        maxx: maxx,
        miny: miny,
        maxy: maxy
    };
}

function collectXLabels( dataPoints ) {
    return dataPoints.map( function( dataPoint ) {
        return dataPoint.xLabel;
    } );
}
