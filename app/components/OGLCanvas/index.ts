import {
  Camera,
  OGLRenderingContext,
  Renderer,
  Transform,
} from 'ogl-typescript'

import { PageTemplate } from '../../types'

import Home from './Home'
import FourOhFour from './404'

export default class OGLCanvas {
  template: PageTemplate
  renderer: Renderer
  gl: OGLRenderingContext
  camera: Camera
  scene: Transform
  fourohfour: FourOhFour
  home: Home
  projectId: number

  constructor({ template }) {
    this.template = template

    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.addEventListener()

    this.onResize()
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: 2,
    })

    this.gl = this.renderer.gl
    document.body.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl, { fov: 35 })
    this.camera.position.z = 25
  }

  createScene() {
    this.scene = new Transform()
  }

  createHome() {
    this.home = new Home({
      camera: this.camera,
      gl: this.gl,
      renderer: this.renderer,
      scene: this.scene,
    })

    this.renderer.render({ scene: this.scene, camera: this.camera })
  }

  createFourOhFour() {
    this.fourohfour = new FourOhFour({
      camera: this.camera,
      gl: this.gl,
      renderer: this.renderer,
      scene: this.scene,
    })

    this.renderer.render({ scene: this.scene, camera: this.camera })
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight,
      fov: window.innerWidth <= 1368 ? 40 : 35,
    })

    if (!this.home && this.template === 'home') {
      this.createHome()
    }

    if (this.home) {
      this.home.onResize()
    }

    if (!this.fourohfour && this.template === 'fourohfour') {
      this.createFourOhFour()
    }

    if (this.fourohfour) {
      this.fourohfour.onResize()
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

  onProjectSelect() {
    if (this.home.onProjectSelect) {
      return this.home.onProjectSelect()
    }
    return 0
  }

  update() {
    if (this.home) {
      this.home.update()
    }

    if (this.fourohfour) {
      this.fourohfour.update()
    }

    this.renderer.render({
      camera: this.camera,
      scene: this.scene,
    })
  }

  addEventListener() {
    window.addEventListener('resize', this.onResize.bind(this))
  }
}
