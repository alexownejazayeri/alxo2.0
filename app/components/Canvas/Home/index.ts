import gsap from 'gsap'
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

const PROJECTS_MOCK = [
  {
    title: 'Koality',
    description:
      'Two-thirds of fourth graders in the U.S. struggle with literacy; this app uses speech recognition to help.',
    videoUrl: 'https://alxo-portfolio-assets.s3.amazonaws.com/sendskies.MOV',
    project_links: {
      url: 'https://www.example.com',
      github_url: 'https://www.github.com/my-example-project',
    },
    technologies: {
      frontend: ['javascript', 'typescript', 'react', 'next.js'],
      backend: ['node.js', 'ChatGPT'],
    },
  },
  {
    title: 'Tinfur',
    description:
      'Tinder-style swipe app for finding a forever home for pets using pet finding APIs.',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    project_links: {
      url: 'https://www.example.com',
      github_url: 'https://www.github.com/my-example-project',
    },
    technologies: {
      frontend: ['javascript', 'typescript', 'react'],
      backend: ['javascript', 'typescript', 'aws'],
    },
  },
  {
    title: 'OP-1 Kenobi',
    description:
      'This is an awesome description about stuff. This project, for example is an incredible project.',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    project_links: {
      url: 'https://www.example.com',
      github_url: 'https://www.github.com/my-example-project',
    },
    technologies: {
      frontend: ['javascript', 'typescript', 'react'],
      backend: ['javascript', 'typescript', 'aws'],
    },
  },
  {
    title: 'CODE-LE',
    description:
      'World clone for learning and practicing coding vocabulary and concepts built with React.',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    project_links: {
      url: 'https://www.example.com',
      github_url: 'https://www.github.com/my-example-project',
    },
    technologies: {
      frontend: ['javascript', 'typescript', 'react'],
      backend: ['javascript', 'typescript', 'aws'],
    },
  },
  {
    title: 'LiveOrder',
    description:
      'Ticketing product used by Outside Lands. Built core ticketing features using AWS AppSync and Next.js.',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    project_links: {
      url: 'https://www.example.com',
      github_url: 'https://www.github.com/my-example-project',
    },
    technologies: {
      frontend: ['javascript', 'typescript', 'react'],
      backend: ['javascript', 'typescript', 'aws'],
    },
  },
  {
    title: 'Moon Water',
    description:
      'This is an awesome description about stuff. This project, for example is an incredible project.',
    videoUrl: 'https://alxo-portfolio-assets.s3.amazonaws.com/sendskies.MOV',
    project_links: {
      url: 'https://www.example.com',
      github_url: 'https://www.github.com/my-example-project',
    },
    technologies: {
      frontend: ['javascript', 'typescript', 'react'],
      backend: ['javascript', 'typescript', 'aws'],
    },
  },
]

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
  scroller: { el: Element | null; rotation: number }
  progressBar: any
  slorbieblorbie: any
  mobileProgress: any
  fullStack: any
  title: any
  skills: any
  projectsWrapper: any
  currentPage: number

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

    this.mobileProgress = {
      total: window.innerHeight * 3.5 * 3, // TODO: magic #, move to constant
      completed: 0,
    }

    this.scroller = {
      el: document.querySelector('.home__mobile__scroll__indicator'),
      rotation: 0,
    }

    this.progressBar = document.querySelector(
      '.home__mobile__progress__indicator'
    )

    this.slorbieblorbie = document.querySelector(
      '.home__mobile__blob__container'
    )

    this.fullStack = document.querySelector(
      '.home__mobile__professional__info--full-stack'
    )

    this.title = document.querySelector(
      '.home__mobile__professional__info--title'
    )

    this.skills = document.querySelector(
      '.home__mobile__professional__info--skills'
    )

    this.projectsWrapper = document.querySelector(
      '.home__mobile__project__container'
    )

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

    if (event instanceof TouchEvent) {
      this.cursorPosition.x = event.touches[0].clientX
      this.cursorPosition.y = event.touches[0].clientY
    }
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

    if (event instanceof TouchEvent && this.scroller?.el) {
      const scrollDiff = this.cursorPosition.y - event.touches[0].clientY
      this.scroller.rotation += scrollDiff

      this.cursorPosition.x = event.touches[0].clientX
      this.cursorPosition.y = event.touches[0].clientY

      if (
        this.mobileProgress.completed >= 0 &&
        this.mobileProgress.completed + scrollDiff >= 0 &&
        this.mobileProgress.completed + scrollDiff < this.mobileProgress.total
      ) {
        this.mobileProgress.completed += scrollDiff
      } else if (this.mobileProgress.completed + scrollDiff < 0) {
        this.mobileProgress.completed = 0
      }
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

  onProjectSelect() {
    return this.projectId
  }

  updateProjectContent() {
    if (this.currentPage >= 1) {
      const projectTitleEl = document.querySelector(
        '.home__mobile__project__title'
      )!

      projectTitleEl.textContent = PROJECTS_MOCK[this.currentPage - 1].title

      const projectDescriptionEl = document.querySelector(
        '.home__mobile__project__overview--description'
      )!

      projectDescriptionEl.textContent =
        PROJECTS_MOCK[this.currentPage - 1].description

      const projectVideo: HTMLVideoElement = document.querySelector(
        '.home__mobile__project__video--content'
      )!

      if (projectVideo.src !== PROJECTS_MOCK[this.currentPage - 1].videoUrl) {
        projectVideo.src = PROJECTS_MOCK[this.currentPage - 1].videoUrl
        projectVideo.load()
      }

      const githubLink: HTMLAnchorElement = document.querySelector(
        '.home__mobile__projects__cta--code'
      )!

      githubLink.href =
        PROJECTS_MOCK[this.currentPage - 1].project_links.github_url

      const siteLink: HTMLAnchorElement = document.querySelector(
        '.home__mobile__projects__cta--link'
      )!

      siteLink.href = PROJECTS_MOCK[this.currentPage - 1].project_links.url
    }
  }

  handlePagination(percentScrolled) {
    const currentPage =
      percentScrolled >= 0 && percentScrolled < 14
        ? 0
        : percentScrolled >= 14 && percentScrolled < 28
        ? 1
        : percentScrolled >= 28 && percentScrolled < 42
        ? 2
        : percentScrolled >= 42 && percentScrolled < 56
        ? 3
        : percentScrolled >= 56 && percentScrolled < 70
        ? 4
        : percentScrolled >= 70 && percentScrolled < 84
        ? 5
        : 6

    if (
      this.currentPage !== undefined &&
      this.currentPage < currentPage &&
      currentPage > 0
    ) {
      const currentPageEl = document.querySelector(
        `.home__mobile__project__pagination--page${currentPage}`
      )
      const prevPageEl =
        currentPage > 1
          ? document.querySelector(
              `.home__mobile__project__pagination--page${currentPage - 1}`
            )
          : null

      currentPageEl?.classList.add('home__mobile__project__pagination--active')

      prevPageEl?.classList.remove('home__mobile__project__pagination--active')
      prevPageEl?.classList.add('home__mobile__project__pagination--viewed')
    }

    if (
      this.currentPage !== undefined &&
      this.currentPage > currentPage &&
      currentPage > 0
    ) {
      const currentPageEl = document.querySelector(
        `.home__mobile__project__pagination--page${currentPage}`
      )

      const nextPageEl =
        currentPage >= 1
          ? document.querySelector(
              `.home__mobile__project__pagination--page${currentPage + 1}`
            )
          : null

      currentPageEl?.classList.remove(
        'home__mobile__project__pagination--viewed'
      )
      currentPageEl?.classList.add('home__mobile__project__pagination--active')

      nextPageEl?.classList.remove('home__mobile__project__pagination--active')
      nextPageEl?.classList.remove('home__mobile__project__pagination--viewed')
    }

    this.currentPage = currentPage
    this.updateProjectContent()

    if (this.currentPage === 6 && percentScrolled >= 98) {
      const currentPageEl = document.querySelector(
        `.home__mobile__project__pagination--page${currentPage}`
      )

      currentPageEl?.classList.add('home__mobile__project__pagination--viewed')
    }

    return this.currentPage
  }

  update() {
    if (!this.mesh) return

    if (this.slorbieblorbie) {
      gsap.to(this.slorbieblorbie, {
        rotateZ: -this.scroller.rotation,
      })

      if (
        this.handlePagination(
          (this.mobileProgress.completed / this.mobileProgress.total) * 100
        ) === 0 ||
        this.handlePagination(
          (this.mobileProgress.completed / this.mobileProgress.total) * 100
        ) === 1
      ) {
        gsap.to(this.slorbieblorbie, {
          scale:
            1 +
            (((this.mobileProgress.completed / this.mobileProgress.total) *
              100) /
              14) *
              2.5,
          autoAlpha:
            1 -
            ((this.mobileProgress.completed / this.mobileProgress.total) *
              100) /
              14,
        })

        gsap.to(this.fullStack, {
          x:
            (((this.mobileProgress.completed / this.mobileProgress.total) *
              100) /
              14) *
            500,
        })

        gsap.to(this.title, {
          x:
            (((this.mobileProgress.completed / this.mobileProgress.total) *
              100) /
              14) *
            -500,
        })

        gsap.to(this.skills, {
          y:
            (((this.mobileProgress.completed / this.mobileProgress.total) *
              100) /
              14) *
            1000,
        })
      }

      gsap.to(this.projectsWrapper, {
        autoAlpha:
          ((this.mobileProgress.completed / this.mobileProgress.total) * 100) /
          14,
      })
    }

    if (this.scroller?.el) {
      gsap.to(this.scroller.el, {
        rotateZ: this.scroller.rotation,
      })
    }

    if (this.progressBar) {
      gsap.to(this.progressBar, {
        width: `${
          (this.mobileProgress.completed / this.mobileProgress.total) * 100
        }vw`,
      })
    }

    if (!this.pause) {
      this.scroller.rotation += 0.1
    }

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
      this.projectId = id
    } else {
      this.activeElementId = 0
    }

    this.mesh.program.uniforms.uTargetRender.value = 0

    const inMeshBoundary =
      this.mouse.x >= (window.innerWidth * 2) / 2 &&
      this.mouse.y >= (window.innerWidth * 2) / 7

    if (!inMeshBoundary) {
      this.mesh.rotation.y = Math.sin(this.ballRads.y) / 3
      this.mesh.rotation.x = Math.sin(-this.ballRads.x) / 3
      this.mesh.rotation.z = Math.sin(-this.ballRads.z) / 10
      this.ballRads.y += 0.008
      this.ballRads.x += 0.005
      this.ballRads.z += 0.002
    }

    if (inMeshBoundary) {
      Math.ceil(this.mesh.rotation.y) > 0
        ? (this.mesh.rotation.y -= 0.005)
        : Math.ceil(this.mesh.rotation.y) < 0
        ? (this.mesh.rotation.y += 0.005)
        : (this.mesh.rotation.y = 0)
      Math.ceil(this.mesh.rotation.x) > 0
        ? (this.mesh.rotation.x -= 0.005)
        : Math.ceil(this.mesh.rotation.x) < 0
        ? (this.mesh.rotation.x += 0.005)
        : (this.mesh.rotation.x = 0)
      Math.ceil(this.mesh.rotation.z) > 0
        ? (this.mesh.rotation.z -= 0.001)
        : Math.ceil(this.mesh.rotation.z) < 0
        ? (this.mesh.rotation.z += 0.001)
        : (this.mesh.rotation.z = 0)

      this.ballRads.y > 0 ? (this.ballRads.y = 0) : null
      this.ballRads.x > 0 ? (this.ballRads.x = 0) : null
      this.ballRads.z > 0 ? (this.ballRads.z = 0) : null
    }
  }
}
