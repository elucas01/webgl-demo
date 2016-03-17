#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float; 
#else
    precision mediump float;
#endif

varying vec3 lighting;

void main(void){
    vec3 color = vec3(1.0, 0.5, 0.0);
    
    color *= abs(lighting);
    
    gl_FragColor = vec4(color, 1.0);
}