import GSAP from 'gsap'

import Page from '../../classes/Page'

export default class Contact extends Page {
  hello: any
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

    GSAP.from(this.hello, {
      duration: 1,
      x: 500,
      opacity: 0,
      textTransform: 'none',
    })
  }
}
