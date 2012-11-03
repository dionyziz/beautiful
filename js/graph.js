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
    var padX = this.width / ( this.maxx - this.minx );
    var xx = padX * x;

    return xx + this.left;
};

Graph.prototype.transformY = function( y ) {
    var padY = this.height / ( this.maxy - this.miny );
    var yy = padY * y;
    
    return this.height - yy + this.top;
};
