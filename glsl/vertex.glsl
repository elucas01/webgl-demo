#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float; 
#else
    precision mediump float;
#endif

attribute vec4 coordinates;
uniform mat4 transform;

void main(void){
    gl_Position = coordinates * transform;
}