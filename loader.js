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
    data.sort( function( a, b ) {
        return a.x - b.x;
    } );
    graph( data );
} );
