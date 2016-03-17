/* global WebGL, WebGLUniform */
/* global Matrix3, Matrix4 */
/* global vec3 */

/* global load */

function normal(a, b, c){
    return vec3.cross(vec3.sub(b, a), vec3.sub(c, a));
}


var canvas = document.getElementById("demo-canvas");
var gfx = new WebGL(canvas);

var transform = new WebGLUniform("transform", "Matrix4fv");


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