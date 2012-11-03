function drawAxes( ctx, left, top, width, height, labelsx, labelsy, fontx, fonty, gridColor, rectColor ) {
    var rowW = width / ( labelsx.length - 1 )
        lineH = height / ( labelsy.length - 1 ),
        textSize = 0,
        lineHeight = ctx.measureText( "M" );

    labelsy.pop();
    labelsy.unshift( '' );
    labelsy.reverse();

    var j = 0;
    for ( var i = 0; i <= width; i += rowW ) {
        if ( i != 0 ) {
            ctx.beginPath();
            ctx.strokeStyle = gridColor;
            ctx.moveTo( i + left, top );
            ctx.lineTo( i + left, height + top );
            ctx.stroke();
        }

        ctx.beginPath();
        textSize = ctx.measureText( labelsx[ j ] );
        ctx.font = fontx.size + "pt " + fontx.family;
        ctx.strokeStyle = fontx.color;
        ctx.fillStyle = fontx.fillColor;
        ctx.strokeText( labelsx[ j ], i + left - textSize.width / 2, height + top + 20 );
        ctx.fillText( labelsx[ j ], i + left - textSize.width / 2, height + top + 20 );

        ++j;
    }

    j = 0;
    for ( var i = 0; i < height; i += lineH ) {
        if ( i != 0 ) {
            ctx.beginPath();
            ctx.strokeStyle = gridColor;
            ctx.moveTo( left, i + top );
            ctx.lineTo( left + width, i + top );
            ctx.stroke();
        }

        textSize = ctx.measureText( labelsy[ j ] );
        ctx.beginPath();
        ctx.font = fonty.size + "pt " + fonty.family;
        ctx.strokeStyle = fonty.color;
        ctx.fillStyle = fonty.fillColor;
        ctx.strokeText( labelsy[ j ], left + width - textSize.width - 2, i + top + lineH - 3 );
        ctx.fillText( labelsy[ j ], left + width - textSize.width - 2, i + top + lineH - 3 );

        ++j;
    }

    ctx.beginPath();
    ctx.rect( left, top, width, height );
    ctx.lineWidth = 1;
    ctx.strokeStyle = rectColor;
    ctx.stroke();
}
