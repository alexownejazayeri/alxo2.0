import {
  Camera,
  OGLRenderingContext,
  Renderer,
  Transform,
} from 'ogl-typescript'

import Home from './Home'

export default class Canvas {
  camera: Camera
  gl: OGLRenderingContext
  home: Home
  projectId: number
  renderer: Renderer
  scene: Transform
  template: string

  constructor({ projectId, template }) {
    this.template = template

    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.addEventListener()

    this.onResize()
  }

  createHome() {
    this.home = new Home({
      camera: this.camera,
      gl: this.gl,
      projectId: this.projectId,
      renderer: this.renderer,
      scene: this.scene,
    })

    this.renderer.render({ scene: this.scene, camera: this.camera })
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: 2,
    })

    this.gl = this.renderer.gl
    document.body.appendChild(this.gl.canvas)
    this.gl.clearColor(1, 1, 1, 1)
  }

  createCamera() {
    this.camera = new Camera(this.gl, { fov: 35 })
    this.camera.position.z = 25
  }

  createScene() {
    this.scene = new Transform()
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight,
    })

    if (!this.home) {
      this.createHome()
    }

    if (this.home) {
      this.home.onResize()
    }
  }

  onTouchDown(event: MouseEvent | TouchEvent) {
    if (this.home) {
      this.home.onTouchDown(event)
    }
  }

  onTouchMove(event: MouseEvent | TouchEvent) {
    if (this.home) {
      this.home.onTouchMove(event)
    }
  }

  onTouchUp(event: MouseEvent | TouchEvent) {
    if (this.home) {
      this.home.onTouchUp(event)
    }
  }

  onWheel(event: any) {
    if (this.home) {
      this.home.onWheel(event)
    }
  }

  update() {
    this.home.update()

    this.renderer.render({
      camera: this.camera,
      scene: this.scene,
    })
  }

  addEventListener() {
    window.addEventListener('resize', this.onResize.bind(this))
  }
}
