/** Small scrappy matrix library **/

function Matrix4(){
    if (!(this instanceof Matrix4)) return new Matrix4(arguments);
    
    this.m = [];
    if (arguments.length == 16){
        this.m = Array.prototype.slice.call(arguments);
    } else if (arguments.length >= 1){
        var m = arguments[0];
        
        if (m instanceof Matrix3){
            this.m = m.toMatrix4();
        } else if (m instanceof Matrix2){
            this.m = m.toMatrix4();
        } else {
            this.m = Array.prototype.slice.call(m);
        }
    }
}
Matrix4.prototype = {
    inverse: function(){
        var m = this.m;
        var inv = [];
        inv[0] = m[5]  * m[10] * m[15] - 
                 m[5]  * m[11] * m[14] - 
                 m[9]  * m[6]  * m[15] + 
                 m[9]  * m[7]  * m[14] +
                 m[13] * m[6]  * m[11] - 
                 m[13] * m[7]  * m[10];
    
        inv[4] = -m[4]  * m[10] * m[15] + 
                  m[4]  * m[11] * m[14] + 
                  m[8]  * m[6]  * m[15] - 
                  m[8]  * m[7]  * m[14] - 
                  m[12] * m[6]  * m[11] + 
                  m[12] * m[7]  * m[10];
    
        inv[8] = m[4]  * m[9] * m[15] - 
                 m[4]  * m[11] * m[13] - 
                 m[8]  * m[5] * m[15] + 
                 m[8]  * m[7] * m[13] + 
                 m[12] * m[5] * m[11] - 
                 m[12] * m[7] * m[9];
    
        inv[12] = -m[4]  * m[9] * m[14] + 
                   m[4]  * m[10] * m[13] +
                   m[8]  * m[5] * m[14] - 
                   m[8]  * m[6] * m[13] - 
                   m[12] * m[5] * m[10] + 
                   m[12] * m[6] * m[9];
    
        inv[1] = -m[1]  * m[10] * m[15] + 
                  m[1]  * m[11] * m[14] + 
                  m[9]  * m[2] * m[15] - 
                  m[9]  * m[3] * m[14] - 
                  m[13] * m[2] * m[11] + 
                  m[13] * m[3] * m[10];
    
        inv[5] = m[0]  * m[10] * m[15] - 
                 m[0]  * m[11] * m[14] - 
                 m[8]  * m[2] * m[15] + 
                 m[8]  * m[3] * m[14] + 
                 m[12] * m[2] * m[11] - 
                 m[12] * m[3] * m[10];
    
        inv[9] = -m[0]  * m[9] * m[15] + 
                  m[0]  * m[11] * m[13] + 
                  m[8]  * m[1] * m[15] - 
                  m[8]  * m[3] * m[13] - 
                  m[12] * m[1] * m[11] + 
                  m[12] * m[3] * m[9];
    
        inv[13] = m[0]  * m[9] * m[14] - 
                  m[0]  * m[10] * m[13] - 
                  m[8]  * m[1] * m[14] + 
                  m[8]  * m[2] * m[13] + 
                  m[12] * m[1] * m[10] - 
                  m[12] * m[2] * m[9];
    
        inv[2] = m[1]  * m[6] * m[15] - 
                 m[1]  * m[7] * m[14] - 
                 m[5]  * m[2] * m[15] + 
                 m[5]  * m[3] * m[14] + 
                 m[13] * m[2] * m[7] - 
                 m[13] * m[3] * m[6];
    
        inv[6] = -m[0]  * m[6] * m[15] + 
                  m[0]  * m[7] * m[14] + 
                  m[4]  * m[2] * m[15] - 
                  m[4]  * m[3] * m[14] - 
                  m[12] * m[2] * m[7] + 
                  m[12] * m[3] * m[6];
    
        inv[10] = m[0]  * m[5] * m[15] - 
                  m[0]  * m[7] * m[13] - 
                  m[4]  * m[1] * m[15] + 
                  m[4]  * m[3] * m[13] + 
                  m[12] * m[1] * m[7] - 
                  m[12] * m[3] * m[5];
    
        inv[14] = -m[0]  * m[5] * m[14] + 
                   m[0]  * m[6] * m[13] + 
                   m[4]  * m[1] * m[14] - 
                   m[4]  * m[2] * m[13] - 
                   m[12] * m[1] * m[6] + 
                   m[12] * m[2] * m[5];
    
        inv[3] = -m[1] * m[6] * m[11] + 
                  m[1] * m[7] * m[10] + 
                  m[5] * m[2] * m[11] - 
                  m[5] * m[3] * m[10] - 
                  m[9] * m[2] * m[7] + 
                  m[9] * m[3] * m[6];
    
        inv[7] = m[0] * m[6] * m[11] - 
                 m[0] * m[7] * m[10] - 
                 m[4] * m[2] * m[11] + 
                 m[4] * m[3] * m[10] + 
                 m[8] * m[2] * m[7] - 
                 m[8] * m[3] * m[6];
    
        inv[11] = -m[0] * m[5] * m[11] + 
                   m[0] * m[7] * m[9] + 
                   m[4] * m[1] * m[11] - 
                   m[4] * m[3] * m[9] - 
                   m[8] * m[1] * m[7] + 
                   m[8] * m[3] * m[5];
    
        inv[15] = m[0] * m[5] * m[10] - 
                  m[0] * m[6] * m[9] - 
                  m[4] * m[1] * m[10] + 
                  m[4] * m[2] * m[9] + 
                  m[8] * m[1] * m[6] - 
                  m[8] * m[2] * m[5];
    
        var det = m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];
    
        if (det == 0)
            return false;
    
        det = 1.0 / det;
    
        for (var i = 0; i < 16; i++)
            this.m[i] = inv[i] * det;
        
        return true;
    },
    transpose: function(){
        var a = this.m;
        this.m = [
            a[0],  a[4], a[8],  a[12],
            a[1],  a[5], a[9],  a[13],
            a[2],  a[6], a[10], a[14],
            a[3],  a[7], a[11], a[15]
        ];
    },
    
    toMatrix3: function(){
        var m = this.m;
        return new Matrix3(m[0], m[1], m[2],
                           m[4], m[5], m[6],
                           m[8], m[9], m[10]);
    },
    
    toString: function(){
        return this.m.toString();
    },
    toFloatArray: function(){
        return new Float32Array(this.m);
    }
};

Matrix4.add = function(a, b){
    a = a.m; b = b.m;
    return new Matrix4(
            a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3],
            a[4] + b[4], a[5] + b[5], a[6] + b[6], a[7] + b[7],
            a[8] + b[8], a[9] + b[9], a[10] + b[10], a[11] + b[11],
            a[12] + b[12], a[13] + b[13], a[14] + b[14], a[15] + b[15]
    );
};
Matrix4.sub = function(a, b){
    a = a.m; b = b.m;
    return new Matrix4(
            a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3],
            a[4] - b[4], a[5] - b[5], a[6] - b[6], a[7] - b[7],
            a[8] - b[8], a[9] - b[9], a[10] - b[10], a[11] - b[11],
            a[12] - b[12], a[13] - b[13], a[14] - b[14], a[15] - b[15]
    );
};
Matrix4.mul = function(a, b){
    a = a.m; 
    b = b.m;
    return new Matrix4(
            a[0]*b[0]  + a[1]*b[4]  + a[2]*b[8]  + a[3]*b[12],
            a[4]*b[0]  + a[5]*b[4]  + a[6]*b[8]  + a[7]*b[12],
            a[8]*b[0]  + a[9]*b[4]  + a[10]*b[8] + a[11]*b[12],
            a[12]*b[0] + a[13]*b[4] + a[14]*b[8] + a[15]*b[12],
            
            a[0]*b[1]  + a[1]*b[5]  + a[2]*b[9]  + a[3]*b[13],
            a[4]*b[1]  + a[5]*b[5]  + a[6]*b[9]  + a[7]*b[13],
            a[8]*b[1]  + a[9]*b[5]  + a[10]*b[9] + a[11]*b[13],
            a[12]*b[1] + a[13]*b[5] + a[14]*b[9] + a[15]*b[13],
            
            a[0]*b[2]  + a[1]*b[6]  + a[2]*b[10]  + a[3]*b[14],
            a[4]*b[2]  + a[5]*b[6]  + a[6]*b[10]  + a[7]*b[14],
            a[8]*b[2]  + a[9]*b[6]  + a[10]*b[10] + a[11]*b[14],
            a[12]*b[2] + a[13]*b[6] + a[14]*b[10] + a[15]*b[14],
            
            a[0]*b[3]  + a[1]*b[7]  + a[2]*b[11]  + a[3]*b[15],
            a[4]*b[3]  + a[5]*b[7]  + a[6]*b[11]  + a[7]*b[15],
            a[8]*b[3]  + a[9]*b[7]  + a[10]*b[11] + a[11]*b[15],
            a[12]*b[3] + a[13]*b[7] + a[14]*b[11] + a[15]*b[15]
    );
};

Matrix4.I = Matrix4.identity = new Matrix4(1, 0, 0, 0,
                                           0, 1, 0, 0,
                                           0, 0, 1, 0,
                                           0, 0, 0, 1);


function Matrix3(){
    if (arguments.length === 9){
        this.m = Array.prototype.slice.call(arguments);
    } else if (arguments.length >= 1){
        var m = arguments[0];
        if (m instanceof Matrix4){
            this.m = m.toMatrix3();
        } else if (m instanceof Matrix2){
            this.m = m.toMatrix3();
        }
    }
}
Matrix3.prototype = {
    inverse: function(){
        var det =    m[0] * (m[4] * m[8] - m[5] * m[7]) -
                     m[3] * (m[1] * m[8] - m[7] * m[2]) +
                     m[6] * (m[1] * m[5] - m[4] * m[2]);
        
        if (det == 0) return false;
        var invdet = 1 / det;
        
        var m = this.m;
        this.m[0] = (m[4] * m[8] - m[5] * m[7]) * invdet;
        this.m[3] = (m[6] * m[5] - m[3] * m[8]) * invdet;
        this.m[6] = (m[3] * m[7] - m[6] * m[4]) * invdet;
        this.m[1] = (m[7] * m[2] - m[1] * m[8]) * invdet;
        this.m[4] = (m[0] * m[8] - m[6] * m[2]) * invdet;
        this.m[7] = (m[1] * m[6] - m[0] * m[7]) * invdet;
        this.m[2] = (m[1] * m[5] - m[2] * m[4]) * invdet;
        this.m[5] = (m[2] * m[3] - m[0] * m[5]) * invdet;
        this.m[8] = (m[0] * m[4] - m[1] * m[3]) * invdet;
        
        return true;
    },
    transpose: function(){
        var a = this.m;
        this.m = [
            a[0], a[3], a[6],
            a[1], a[4], a[7],
            a[2], a[5], a[8],
        ];
    },
    
    toMatrix4: function(){
        var m = this.m;
        //console.log(tm[0]);
        return new Matrix4(
            m[0], m[1], m[2], 0,
            m[3], m[4], m[5], 0,
            m[6], m[7], m[8], 0,
            0,    0,    0,    1
        );
    },
    
    toFloatArray: function(){
        return new Float32Array(this.m);
    }
};

Matrix3.add = function(a, b){
    a = a.m; b = b.m;
    return new Matrix3(
            a[0] + b[0], a[1] + b[1], a[2] + b[2], 
            a[3] + b[3], a[4] + b[4], a[5] + b[5], 
            a[6] + b[6], a[7] + b[7], a[8] + b[8]
    );
};
Matrix3.sub = function(a, b){
    a = a.m; b = b.m;
    return new Matrix3(
            a[0] - b[0], a[1] - b[1], a[2] - b[2], 
            a[3] - b[3], a[4] - b[4], a[5] - b[5], 
            a[6] - b[6], a[7] - b[7], a[8] - b[8]
    );
};
Matrix3.mul = function(a, b){
    a = a.m; b = b.m;
    throw new Error("mat3 mul not implemented");
};

Matrix3.I = Matrix3.identity = new Matrix3(1, 0, 0,
                                           0, 1, 0,
                                           0, 0, 1);

Matrix3.rotation = {
    xAxis: function(theta){
        var sin = Math.sin(theta), 
            cos = Math.cos(theta);
        return new Matrix3(1, 0,   0,
                           0, cos, -sin,
                           0, sin, cos);
    },
    yAxis: function(theta){
        var sin = Math.sin(theta), 
            cos = Math.cos(theta);
        return new Matrix3(cos,  0, sin,
                           0,    1, 0,
                           -sin, 0, cos);
    },
    zAxis: function(theta){
        var sin = Math.sin(theta), 
            cos = Math.cos(theta);
        return new Matrix3(cos, -sin, 0,
                           sin, cos,  0,
                           0,   0,    1);
    }
};


function Matrix2(){
    
}

Matrix2.I = Matrix2.identity = new Matrix2(1, 0,
                                           0, 1);





