import {
  Camera,
  Mesh,
  OGLRenderingContext,
  Program,
  Renderer,
  RenderTarget,
  Sphere,
  Transform,
  Vec3,
} from 'ogl-typescript'

// @ts-ignore
import vertex from '../../../shaders/test-vertex.glsl'
// @ts-ignore
import fragment from '../../../shaders/test-fragment.glsl'

export default class {
  activeElementId: number
  ballRads: { x: number; y: number; z: number }
  camera: Camera
  cursorPosition: { x: number; y: number }
  geometry: Sphere
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

    this.pause = false

    this.cursorPosition = {
      x: 0,
      y: 0,
    }

    this.mouse = new Vec3()

    this.ballRads = {
      y: 0,
      x: 0,
      z: 0,
    }

    this.createProgram()
    this.createGeometry()
    this.createMesh()
  }

  createGeometry() {
    this.geometry = new Sphere(this.gl, {
      radius: 1,
      widthSegments: 64,
    })
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })

    this.mesh.position = new Vec3(0, 0, 0)

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

    const data = new Uint8Array(4)

    this.mesh.program.uniforms.uTargetRender.value = 1

    this.renderer.render({
      scene: this.mesh,
      camera: this.camera,
      target: this.target,
    })

    this.mesh.program.uniforms.uTargetRender.value = 0
  }
}
