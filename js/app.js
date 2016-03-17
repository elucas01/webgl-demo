/* global WebGL, WebGLUniform, WebGLAttribute*/
/* global Matrix3, Matrix4 */
/* global vec3 */

/* global load */



var canvas = document.getElementById("demo-canvas");
var gfx = new WebGL(canvas);

var transform = new WebGLUniform("transform", "Matrix4fv");

var normals = new WebGLAttribute("normal", 3, "float");


function normal(a, b, c){
    return vec3.cross(vec3.sub(b, a), vec3.sub(c, a));
}


function calcNormals(gfx){
    var normalArr = [];
    
    for (var i = 0; i < gfx.indices.length-2; i+=3){
        var indexA = gfx.indices[i+0] * 3;
        var indexB = gfx.indices[i+1] * 3;
        var indexC = gfx.indices[i+2] * 3;
        
        
        var a = new vec3(gfx.vertices[indexA + 0],
                         gfx.vertices[indexA + 1],
                         gfx.vertices[indexA + 2]);
        var b = new vec3(gfx.vertices[indexB + 0],
                         gfx.vertices[indexB + 1],
                         gfx.vertices[indexB + 2]);
        var c = new vec3(gfx.vertices[indexC + 0],
                         gfx.vertices[indexC + 1],
                         gfx.vertices[indexC + 2]);
                         
        var norm = normal(a, b, c).normalize();
        
        normalArr[i+0] = norm.x;
        normalArr[i+1] = norm.y;
        normalArr[i+2] = norm.z;
    }
    
    normals.setValue(gfx.gl, gfx.program, normalArr);
}




function init(vertex, fragment){
    gfx.setup();
    
    gfx.addShader("vertex",   vertex);
    gfx.addShader("fragment", fragment);
    
    gfx.link();
    
    gfx.setVertices([+.5, +.5, +.5,
                     -.5, +.5, -.5,
                     -.5, -.5, +.5,
                     +.5, -.5, -.5]);
    gfx.setIndices([0, 1, 2,
                    0, 1, 3,
                    0, 2, 3,
                    1, 2, 3]);
                    
    gfx.uniforms.push(transform);
    gfx.attributes.push(normals);
    calcNormals(gfx);
    
    loop();
}

function loop(){
    var mat = new Matrix4([ 1, 0, 0, 0,
                            0, 1, 0, 0,
                            0, 0, 1, .3,
                            0, 0, 0, 1]);
                            
    var secs = Date.now()/1000;
    mat = Matrix4.mul(mat, Matrix3.rotation.yAxis(secs).toMatrix4());
    
    transform.setValue(mat.toFloatArray());
    
    
    gfx.update();
    gfx.draw();
    
    
    
    window.setTimeout(function(){
        window.requestAnimationFrame(loop);
    }, 1000/60);
}


//Entry point
window.addEventListener("load", function(){
    load("glsl/vertex.glsl", function(vertex){
        load("glsl/fragment.glsl", function(fragment){
            init(vertex, fragment);
        });
    });
});