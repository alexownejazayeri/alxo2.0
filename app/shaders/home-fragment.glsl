precision highp float;

// Re-use same program to render pick-texture
uniform bool uTargetRender;

varying vec2 vUv;
varying vec4 vId;
varying vec3 vNormal;

void main() {
    if (uTargetRender) {
        gl_FragColor = vId;
        return;
    }

    vec3 normal = normalize(vNormal);
    float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));
    gl_FragColor.rgb = vec3(0.0, 0.0, 0.0) + lighting * 0.25;
    gl_FragColor.a = 1.0;
}
