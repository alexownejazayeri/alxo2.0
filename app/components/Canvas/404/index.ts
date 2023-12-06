import {
  Camera,
  Mesh,
  OGLRenderingContext,
  Program,
  Renderer,
  RenderTarget,
  Torus,
  Transform,
  Vec3,
} from 'ogl-typescript'

// @ts-ignore
import vertex from '../../../shaders/donut-vertex.glsl'
// @ts-ignore
import fragment from '../../../shaders/donut-fragment.glsl'

export default class {
  activeElementId: number
  camera: Camera
  geometry: Torus
  gl: OGLRenderingContext
  highlight: Mesh
  mesh: Mesh
  objects: {
    id: number
    offset: number[]
  }[]
  mouse: Vec3
  pause: boolean
  program: Program
  projectId: number
  renderer: Renderer
  scene: Transform
  target: RenderTarget

  constructor({ camera, gl, renderer, scene }) {
    this.camera = camera
    this.gl = gl
    this.renderer = renderer
    this.scene = scene

    this.createProgram()
    this.createGeometry()
    this.createMesh()
  }

  createGeometry() {
    this.geometry = new Torus(this.gl, {
      radius: 2,
      tube: 1,
      radialSegments: 24,
      tubularSegments: 48,
    })
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })

    this.mesh.setParent(this.scene)
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        uTargetRender: { value: 0 },
      },
    })
  }

  onTouchUp(event: MouseEvent | TouchEvent) {
    this.pause = false
  }

  onWheel(event: any) {
    this.mesh.rotation.y += event.pixelY / 1000
    this.mesh.rotation.y -= event.pixelX / 1000
  }

  onResize() {
    this.target = new RenderTarget(this.gl)
  }

  update() {
    if (!this.mesh) return

    console.log('this is updating...')

    this.mesh.program.uniforms.uTargetRender.value = 1

    this.renderer.render({
      scene: this.mesh,
      camera: this.camera,
      target: this.target,
    })

    this.mesh.rotation.x += 0.001
    this.mesh.rotation.y += 0.005
    this.mesh.rotation.z += 0.003

    this.mesh.program.uniforms.uTargetRender.value = 0
  }
}
