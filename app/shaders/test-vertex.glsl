attribute vec2 uv;
attribute vec3 position;
attribute vec3 normal;

// Add instanced attributes just like any attribute
attribute vec3 offset;
attribute vec3 random;
attribute vec4 id;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;

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

    // copy position so that we can modify the instances
    vec3 pos = position;

    // scale first
    // pos *= 0.9 + random.y;

    // rotate around y axis
    rotate2d(pos.xz, random.x * 4.2 + 4.0 * uTime * (random.y - 0.5));

    pos += offset;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
