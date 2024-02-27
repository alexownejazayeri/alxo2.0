import NormalizeWheel from 'normalize-wheel'
import { PageTemplate, HTMLSemanticTagNameMap } from './types'

import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import FourOhFour from './pages/404'

import OGLCanvas from './components/OGLCanvas'
import Navigation from './components/Navigation'

class App {
  OGLCanvas: OGLCanvas
  navigation: Navigation
  pageContentElement: HTMLSemanticTagNameMap['main']
  template: PageTemplate
  pages: { [key: string]: About | Home }
  page: About | Home
  projectId: number

  constructor() {
    this.pageContentElement = document.querySelector('.content')!
    this.template = this.pageContentElement.getAttribute(
      'data-template'
    )! as PageTemplate
    this.projectId = 0

    this.renderOGLCanvas()
    this.createNavigation()
    this.createPages()
    this.addEventListeners()

    this.onResize()
    this.update()
  }

  renderOGLCanvas() {
    this.OGLCanvas = new OGLCanvas({
      template: this.template,
    })
  }

  createNavigation() {
    this.navigation = new Navigation()
  }

  createPages() {
    this.pages = {
      about: new About(),
      contact: new Contact(),
      home: new Home({
        projectId: 0,
      }),
      fourohfour: new FourOhFour(),
    }

    this.page = this.pages[this.template]
    this.page.create()
  }

  onResize() {
    requestAnimationFrame(() => this.OGLCanvas.onResize())
  }

  onTouchDown(event: MouseEvent | TouchEvent) {
    if (this.OGLCanvas && this.OGLCanvas.onTouchDown) {
      this.OGLCanvas.onTouchDown(event)
    }
  }

  onTouchMove(event: MouseEvent | TouchEvent) {
    if (this.OGLCanvas && this.OGLCanvas.onTouchMove) {
      this.OGLCanvas.onTouchMove(event)
    }
  }

  onTouchUp(event: MouseEvent | TouchEvent) {
    if (this.OGLCanvas && this.OGLCanvas.onTouchUp) {
      this.OGLCanvas.onTouchUp(event)
    }
  }

  onWheel(event) {
    const normalizedWheel = NormalizeWheel(event)

    if (this.OGLCanvas && this.OGLCanvas.onWheel) {
      this.OGLCanvas.onWheel(normalizedWheel)
    }

    if (this.page && this.page.onWheel) {
      this.page.onWheel(normalizedWheel)
    }
  }

  onProjectSelect(id: number) {
    this.projectId = id
  }

  addEventListeners() {
    window.addEventListener('mousewheel', this.onWheel.bind(this))

    window.addEventListener('mousedown', this.onTouchDown.bind(this))
    window.addEventListener('mousemove', this.onTouchMove.bind(this))
    window.addEventListener('mouseup', this.onTouchUp.bind(this))

    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onTouchUp.bind(this))
  }

  update() {
    if (this.OGLCanvas && this.OGLCanvas.update) {
      this.OGLCanvas.update()
    }

    if (this.OGLCanvas.home) {
      this.projectId = this.OGLCanvas.onProjectSelect()
    }

    if (this.page instanceof Home) {
      this.page.update(this.projectId - 1 || 0)
    }

    requestAnimationFrame(this.update.bind(this))
  }
}

new App()
