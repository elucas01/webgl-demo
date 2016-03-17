/* global WebGL, WebGLUniform, WebGLAttribute*/
/* global Matrix3, Matrix4 */
/* global vec3 */

/* global makePerspective */

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
        //norm = new vec3(0.5-Math.random(), 0.5-Math.random(), 0.5-Math.random()).normalize();
        
        normalArr[i+0] = norm.x;
        normalArr[i+1] = norm.y;
        normalArr[i+2] = norm.z;
    }
    
    console.log(normalArr);
    normals.setValue(gfx.gl, gfx.program, normalArr);
}




function init(vertex, fragment){
    gfx.setup();
    
    gfx.addShader("vertex",   vertex);
    gfx.addShader("fragment", fragment);
    
    gfx.link();
    
    gfx.setVertices([
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
    
        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
    
        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
    
        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
    
        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
    
        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0]);
    gfx.setIndices([
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23    // left
    ]);
                    
    gfx.uniforms.push(transform);
    gfx.attributes.push(normals);
    calcNormals(gfx);
    
    loop();
}

function loop(){
    /*var mat = new Matrix4([ 1, 0, 0, 0,
                            0, 1, 0, 0,
                            0, 0, 1, 0,
                            0, 0, -1, 0]);*/
    var mat = makePerspective(45, canvas.height/canvas.width, 0.4, 14.0);
    mat = Matrix4.mul(mat, Matrix4.translation(0, 0, -10.0));
                            
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