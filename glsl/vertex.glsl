attribute vec4 coordinates;
uniform mat4 transform;

void main(){
    gl_Position = coordinates * transform;
}