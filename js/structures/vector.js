function vec3(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
}
vec3.prototype = {
    normalize: function(){
        var len = 1.0 / this.length();
        this.x *= len;
        this.y *= len;
        this.z *= len;
        
        return this;
    },
    length: function(){
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
};


/** Methods for multiple vectors **/
vec3.cross = function(a, b){
    return new vec3(a.y*b.z - a.z*b.y,
                    a.z*b.x - a.x*b.z,
                    a.x*b.y - a.y*b.x);
};
vec3.dot = function(a, b){
    return a.x * b.x + a.y * b.y + a.z * b.z;
};

vec3.sub = function(a, b){
    return new vec3(a.x - b.x, a.y - b.y, a.z - b.z);
};








