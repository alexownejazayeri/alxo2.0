import {
  Mesh,
  OGLRenderingContext,
  Program,
  Sphere,
  Transform,
} from 'ogl-typescript'

// @ts-ignore
import vertex from '../../../shaders/test-vertex.glsl'
// @ts-ignore
import fragment from '../../../shaders/test-fragment.glsl'

export default class {
  cursorPosition: { x: number; y: number }
  geometry: Sphere
  gl: OGLRenderingContext
  mesh: Mesh
  pause: boolean
  program: Program
  scene: Transform

  constructor({ gl, scene }) {
    this.gl = gl
    this.scene = scene

    this.pause = false

    this.cursorPosition = {
      x: 0,
      y: 0,
    }

    this.createProgram()
    this.createGeometry()
    this.createMesh()
  }

  createGeometry() {
    let objects: { id: number; offset: number[]; random: number[] }[] = []
    const num = 169

    let offsetData = new Float32Array(num * 3)
    let randomData = new Float32Array(num * 3)
    let idData = new Float32Array(num * 4)
    for (let i = 0; i < num; i++) {
      const offset = [
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      ]
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

      const random = [Math.random(), Math.random(), Math.random()]
      randomData.set(random, i * 3)

      objects.push({ id, offset, random })
    }
    this.geometry = new Sphere(this.gl, {
      radius: 0.05,
      widthSegments: 16,
      heightSegments: 16,
      attributes: {
        offset: { instanced: 1, size: 3, data: offsetData },
        random: { instanced: 1, size: 3, data: randomData },
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

    this.mesh.setParent(this.scene)
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
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

    if (event instanceof MouseEvent && this.pause) {
      this.mesh.rotation.y +=
        this.cursorPosition.x > event.x
          ? -(Math.abs(this.cursorPosition.x - event.x) / 100000)
          : Math.abs(event.x - this.cursorPosition.x) / 100000

      this.mesh.rotation.x +=
        this.cursorPosition.y > event.y
          ? -(Math.abs(this.cursorPosition.y - event.y) / 100000)
          : Math.abs(this.cursorPosition.y - event.y) / 100000
    }
  }

  onTouchUp(event: MouseEvent | TouchEvent) {
    this.pause = false
  }

  onWheel(event: any) {
    this.mesh.rotation.x += event.pixelY / 1000
    this.mesh.rotation.y += event.pixelX / 1000
  }

  update() {
    if (!this.pause) {
      this.mesh.rotation.x -= 0.001
      this.mesh.rotation.y += 0.001
    }
  }
}
