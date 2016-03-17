function WebGLUniform(name, type){
    this.name = name;
    this.type = type;
    this.value;
}
WebGLUniform.prototype = {
    setValue: function(value){
        this.value = value;
    },
    
    update: function(gl, program){
        gl["uniform"+this.type](
            gl.getUniformLocation(program, this.name), 
            false, 
            this.value
        );
    }
};

function WebGLAttribute(name, components, type){
    this.name = name;
    this.value;
    this.buff;
    
    this.components = components;
    this.type = type;
    
    this.position;
}
WebGLAttribute.prototype = {
    setValue: function(gl, program, value){
        this.buff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buff);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(value), gl.STATIC_DRAW);
        
        gl.vertexAttribPointer(this.position, this.components, gl[this.type.toUpperCase()], false, 0, 0);
        
        this.position = gl.getAttribLocation(program, this.name);
    },
    
    update: function(gl, program){
        //gl.bindBuffer(gl.ARRAY_BUFFER, this.buff);
        //gl.vertexAttribPointer(this.position, 3, gl[this.type.toUpperCase()], false, 0, 0);
        //gl.vertexAttribPointer(this.position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.position);
    }
};

function WebGL(canvas){
    this.canvas = canvas;
    this.gl;
    this.program;
    
    this.uniforms = [];
    this.attributes = [];
    this.varyings = [];
    
    this.vertices;
    this.indices;
}
WebGL.prototype = {
    setup: function(settings){
        if (settings === undefined) settings={};
        
        settings = {
            alpha:                          settings.alpha                          || WebGL.alpha,
            depth:                          settings.depth                          || WebGL.depth,
            stencil:                        settings.stencil                        || WebGL.alpha,
            antialias:                      settings.antialias                      || WebGL.antialias,
            premultipliedAlpha:             settings.premultipliedAlpha             || WebGL.premultipliedAlpha,
            preserveDrawingBuffer:          settings.preserveDrawingBuffer          || WebGL.preserveDrawingBuffer,
            failIfMajorPerformanceCaveat:   settings.failIfMajorPerformanceCaveat   || WebGL.failIfMajorPerformanceCaveat
        };
        
        var gl = this.canvas.getContext('webgl',              settings) || 
                 this.canvas.getContext('experimental-webgl', settings);
        
        this.gl = gl;
        
        if (!gl){
            throw new Error("Failed to load WebGL context");
        }
        
        this.program = gl.createProgram();
    },
    link: function(){
        var gl = this.gl;
        
        gl.linkProgram(this.program);
        gl.useProgram(this.program);
        
        if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)){
            throw new Error("Program link error: " + gl.getProgramInfoLog(this.program));
        }
    },
    update: function(){
        this.updateUniforms();
        
        
        this.updateAttributes();
        
        var gl = this.gl;
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        var coord = gl.getAttribLocation(this.program, "coordinates");
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 
        gl.enableVertexAttribArray(coord);
        
        
        //this.updateVaryings();
    },
    draw: function(){
        var gl = this.gl;
        
        gl.clearColor(0.5, 0.5, 0.5, 1.0);
        gl.enable(gl.DEPTH_TEST); 
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    },
    
    addShader: function(type, code){
        var gl = this.gl;
        
        var shader;
        if (type === "fragment"){
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (type === "vertex"){
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            throw new Error("Invalid shader type");
        }
        
        
        gl.shaderSource(shader, code);
        
        //Vertex Shader error display
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
            throw new Error("Shader ("+type+") " + gl.getShaderInfoLog(shader));
        }
        
        gl.attachShader(this.program, shader);
    },
    setVertices: function(vertices){
        var gl = this.gl;
        this.vertices = vertices;
        
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    },
    setIndices: function(indices){
        var gl = this.gl;
        this.indices = indices;
        
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    },
    
    updateUniforms: function(){
        for (var i = 0, l = this.uniforms.length; i < l; i++){
            this.uniforms[i].update(this.gl, this.program);
        }  
    },
    updateAttributes: function(){
        for (var i = 0, l = this.attributes.length; i < l; i++){
            this.attributes[i].update(this.gl, this.program);
        }  
    },
    updateVaryings: function(){
        for (var i = 0, l = this.varyings.length; i < l; i++){
            
        }  
    }
};


/** Preferences **/
WebGL.alpha                         = false;
WebGL.depth                         = false;
WebGL.alpha                         = false;
WebGL.antialias                     = false;
WebGL.premultipliedAlpha            = false;
WebGL.preserveDrawingBuffer         =  true;
WebGL.failIfMajorPerformanceCaveat  =  true;








