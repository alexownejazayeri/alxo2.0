import Page from '../../classes/Page'

export default class Contact extends Page {
  constructor() {
    super({
      selector: '.contact',
      elements: [],
      id: 'contact',
    })

    this.createContact()
  }

  createContact() {
    console.log('create contact!')
  }
}
