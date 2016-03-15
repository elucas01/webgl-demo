/* global WebGL, WebGLUniform */
/* global load */


var gfx = new WebGL();

function init(vertex, fragment){
    gfx.setup();
    
    gfx.addShader("vertex",   vertex);
    gfx.addShader("fragment", fragment);
    
    gfx.link();
    
    loop();
}

function loop(){
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