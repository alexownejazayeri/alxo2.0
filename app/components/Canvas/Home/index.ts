import {
  Camera,
  Mesh,
  NormalProgram,
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

  constructor({ camera, gl, projectId, renderer, scene }) {
    this.camera = camera
    this.gl = gl
    this.projectId = projectId
    this.renderer = renderer
    this.scene = scene

    this.pause = false

    this.cursorPosition = {
      x: 0,
      y: 0,
    }

    this.mouse = new Vec3()

    this.createProgram()
    this.createGeometry()
    this.createMesh()
    this.createHighlight()
  }

  createGeometry() {
    this.objects = []
    const num = 6

    let offsetData = new Float32Array(num * 3)
    let idData = new Float32Array(num * 4)
    for (let i = 0; i < num; i++) {
      let offset: number[] = []

      switch (i) {
        case 0:
          offset = [0, 2.5, 0]
          break
        case 1:
          offset = [-1.25, 0.5, 0]
          break
        case 2:
          offset = [1.25, 0.5, 0]
          break
        case 3:
          offset = [-2.5, -1.5, 0]
          break
        case 4:
          offset = [0, -1.5, 0]
          break
        case 5:
          offset = [2.5, -1.5, 0]
          break
      }

      offsetData.set(offset, i * 3)

      let id = i + 1
      idData.set(
        [
          ((id >> 0) & 0xff) / 0xff,
          ((id >> 8) & 0xff) / 0xff,
          ((id >> 16) & 0xff) / 0xff,
          ((id >> 24) & 0xff) / 0xff,
        ],
        i * 4
      )

      this.objects.push({
        id,
        offset,
      })
    }

    this.geometry = new Sphere(this.gl, {
      radius: 1,
      widthSegments: 64,
      attributes: {
        offset: {
          instanced: 1,
          size: 3,
          data: offsetData,
        },
        // Add id data. This way we can recognize the instance later.
        id: { instanced: 1, size: 4, data: idData },
      },
    })
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })

    this.mesh.position = new Vec3(8, 0, 0)

    this.mesh.setParent(this.scene)
  }

  createMouse() {
    this.mouse = new Vec3()
  }

  createHighlight() {
    this.highlight = new Mesh(this.gl, {
      geometry: this.geometry,
      program: NormalProgram(this.gl),
    })

    this.highlight.setParent(this.scene)
    this.highlight.visible = false
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

  onTouchDown(event: MouseEvent | TouchEvent) {
    this.pause = true
  }

  onTouchMove(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent && !this.pause) {
      this.cursorPosition.x = event.x
      this.cursorPosition.y = event.y
    }

    this.mouse.set(
      (this.cursorPosition.x * this.gl.canvas.width) /
        this.gl.canvas.clientWidth,
      this.gl.canvas.height -
        (this.cursorPosition.y * this.gl.canvas.height) /
          this.gl.canvas.clientHeight -
        1
    )

    if (event instanceof MouseEvent && this.pause) {
      this.mesh.rotation.y +=
        this.cursorPosition.x > event.x
          ? -(Math.abs(this.cursorPosition.x - event.x) / 100000)
          : Math.abs(event.x - this.cursorPosition.x) / 100000
    }
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

    this.gl.readPixels(
      this.mouse.x,
      this.mouse.y,
      1,
      1,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      data
    )

    const id = data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24)

    if (id !== 0 && this.objects[id - 1]?.offset) {
      this.activeElementId = id
    } else {
      this.activeElementId = 0
    }

    this.mesh.program.uniforms.uTargetRender.value = 0

    if (!this.pause) {
      this.mesh.rotation.y += 0.005
      this.mesh.rotation.x += 0.005
      // this.mesh.rotation.z -= 0.001
    }

    if (this.pause && this.mesh.rotation.y > 0) {
      this.mesh.rotation.y -= 0.1
      this.mesh.rotation.x -= 0.1
    }
  }
}