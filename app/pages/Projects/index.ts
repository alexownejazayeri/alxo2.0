import Page from '../../classes/Page'

export default class Projects extends Page {
  constructor() {
    super({
      id: 'project',

      selector: '.project',
      elements: {},
    })

    this.createProjects()
  }

  createProjects() {
    console.log('creating projects')
  }
}
