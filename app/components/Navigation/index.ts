import GSAP from 'gsap'
import { HTMLSemanticTagNameMap } from '../../types'

export default class Navigation {
  static selector = '.topnav'
  static elements = {
    container: '.topnav__container',
    hamburgerButton: '.topnav__link',
  }

  isExpanded: boolean
  topNavElement: HTMLSemanticTagNameMap['nav']
  containerElement: HTMLDivElement
  hamburgerButtonElement: HTMLButtonElement

  constructor() {
    this.isExpanded = false

    this.topNavElement = document.querySelector(Navigation.selector)!
    this.containerElement = document.querySelector(
      Navigation.elements.container
    )!
    this.hamburgerButtonElement = document.querySelector(
      Navigation.elements.hamburgerButton
    )!

    this.addEventListeners()
  }

  onDropdown() {
    if (!this.isExpanded) {
      GSAP.to(Navigation.selector, {
        ease: 'expo.out',
        duration: 1,
        y: window.innerHeight - (this.topNavElement?.offsetHeight || 0),
      })

      GSAP.to(this.containerElement, {
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

      GSAP.to(Navigation.selector, {
        duration: 0.5,
        y: 0,
      })

      if (window.innerWidth > 800) {
        GSAP.to(this.containerElement, {
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

  addEventListeners() {
    this.hamburgerButtonElement.onclick = this.onDropdown.bind(this)
    this.hamburgerButtonElement.onmouseenter = this.onEnter.bind(this)
    this.hamburgerButtonElement.onmouseleave = this.onLeave.bind(this)
  }
}
