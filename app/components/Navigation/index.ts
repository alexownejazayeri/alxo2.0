import GSAP from 'gsap'

export class Navigation {
  container: HTMLElement | null
  element: string
  elements: any
  hamburger: HTMLElement | null
  isExpanded: boolean
  topNav: HTMLElement | null
  constructor() {
    this.element = '.topnav'
    this.elements = {
      container: '.topnav__container',
      hamburger: '.topnav__link',
    }

    this.topNav = document.querySelector(this.element)
    this.container = document.querySelector(this.elements.container)
    this.hamburger = document.querySelector(this.elements.hamburger)

    this.isExpanded = false
    this.addEventListener()
  }

  onDropdown() {
    if (!this.isExpanded) {
      GSAP.to(this.element, {
        ease: 'expo.out',
        duration: 1,
        y: window.innerHeight - (this.topNav?.offsetHeight || 0),
      })

      GSAP.to(this.container, {
        duration: 0.5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      })

      GSAP.to('.topnav__link__icon--line1', {
        duration: 0.5,
        rotationZ: 45,
        translateY: -7.4,
        transformOrigin: '50% 50%',
      })

      GSAP.to('.topnav__link__icon--line2', {
        duration: 0.5,
        autoAlpha: 0,
      })

      GSAP.to('.topnav__link__icon--line3', {
        duration: 0.5,
        rotationZ: -45,
        translateY: 7.2,
        transformOrigin: '50% 50%',
      })

      GSAP.to('.navigation', {
        duration: 1,
        autoAlpha: 1,
      })
    } else {
      GSAP.to('.navigation', {
        duration: 0.2,
        autoAlpha: 0,
      })

      GSAP.to(this.element, {
        duration: 0.5,
        y: 0,
      })

      if (window.innerWidth > 800) {
        GSAP.to(this.container, {
          duration: 0.5,
          borderBottomLeftRadius: '1.3rem',
          borderBottomRightRadius: '1.3rem',
        })
      }

      GSAP.to('.topnav__link__icon--line1', {
        duration: 0.5,
        rotationZ: 0,
        translateY: 0,
        transformOrigin: '50% 50%',
      })

      GSAP.to('.topnav__link__icon--line2', {
        duration: 0.5,
        autoAlpha: 1,
      })

      GSAP.to('.topnav__link__icon--line3', {
        duration: 0.5,
        rotationZ: 0,
        translateY: 0,
        transformOrigin: '50% 50%',
      })
    }

    this.isExpanded = !this.isExpanded
  }

  onEnter() {
    if (!this.isExpanded) {
      GSAP.to('.topnav__link__icon--line2', {
        duration: 0.5,
        autoAlpha: 0,
      })

      GSAP.fromTo(
        '.topnav__link__icon',
        {
          rotation: 0,
        },
        {
          duration: 0.5,
          delay: 0.2,
          rotation: 180,
        }
      )
    }

    if (this.isExpanded) {
      GSAP.fromTo(
        '.topnav__link__icon',
        {
          rotation: 0,
        },
        {
          duration: 0.5,
          delay: 0.2,
          rotation: 180,
        }
      )
    }
  }

  onLeave() {
    if (!this.isExpanded) {
      GSAP.to('.topnav__link__icon--line2', {
        duration: 0.5,
        autoAlpha: 1,
      })

      GSAP.fromTo(
        '.topnav__link__icon',
        {
          rotation: 180,
        },
        {
          duration: 1,
          rotation: 360,
        }
      )
    }

    if (this.isExpanded) {
      GSAP.fromTo(
        '.topnav__link__icon',
        {
          rotation: 180,
        },
        {
          duration: 1,
          rotation: 0,
        }
      )
    }
  }

  addEventListener() {
    const hamburgerButton = document.querySelector(this.elements.hamburger)

    hamburgerButton.onclick = this.onDropdown.bind(this)
    hamburgerButton.onmouseenter = this.onEnter.bind(this)
    hamburgerButton.onmouseleave = this.onLeave.bind(this)
  }
}
