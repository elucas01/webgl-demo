#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float; 
#else
    precision mediump float;
#endif

attribute vec4 coordinates;
attribute vec3 normal;

uniform mat4 transform;

varying vec3 lighting;


void main(void){
    gl_Position = coordinates * transform;
    
    lighting = vec3(0.5 + abs(dot(normal, vec3(-0.57735))));
}