import Page from '../../classes/Page'

export default class Project extends Page {
  constructor() {
    super({
      id: 'project',

      selector: '.project',
      elements: {},
    })

    this.createProject()
  }

  createProject() {}
}
