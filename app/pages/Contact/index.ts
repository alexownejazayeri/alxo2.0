import GSAP from 'gsap'

import Page from '../../classes/Page'

export default class Contact extends Page {
  hello?: Element
  handWave?: Element
  constructor() {
    super({
      selector: '.contact',
      elements: [],
      id: 'contact',
    })

    this.createContact()
  }

  createContact() {
    this.hello = document.querySelector('.contact__heading')?.children[2]
    this.handWave = document.querySelector('.handwave') || undefined

    if (this.hello) {
      GSAP.from(this.hello, {
        duration: 1,
        x: 500,
        autoAlpha: 0,
        textTransform: 'none',
      })
    }

    if (this.handWave) {
      GSAP.from(this.handWave, {
        duration: 0.5,
        rotationZ: 60,
        yoyo: true,
      })
    }
  }
}
