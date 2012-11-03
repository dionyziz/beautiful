var Graph = function( minx, maxx, miny, maxy, left, top, width, height ) {
    this.minx = minx;
    this.maxx = maxx;

    this.miny = miny;
    this.maxy = maxy;

    this.left = left;
    this.top = top;

    this.width = width;
    this.height = height;
};

Graph.prototype.transformX = function( x ) {
    var padX = W / ( this.maxx - this.minx ),
        xx = padX * x;

    return xx + this.left;
};

Graph.prototype.transformY = function( y ) {
    var padY = H / ( this.maxy - this.miny ),
        yy = padY * y;
    
    return this.height - yy + this.top;
};
