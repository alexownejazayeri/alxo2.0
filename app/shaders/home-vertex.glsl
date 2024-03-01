attribute vec2 uv;
attribute vec3 position;
attribute vec3 normal;

// Add instanced attributes just like any attribute
attribute vec3 offset;
attribute vec4 id;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;
varying vec3 vNormal;
varying vec4 vId;

void rotate2d(inout vec2 v, float a){
    mat2 m = mat2(cos(a), -sin(a), sin(a),  cos(a));
    v = m * v;
}

void main() {
    vUv = uv;
    vId = id;
    vNormal = normal;

    vec3 pos = position;

    pos += offset;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
