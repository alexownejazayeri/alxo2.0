import Page from '../../classes/Page'
import ProjectShowcase from '../../components/ProjectShowcase'

const PROJECTS_MOCK = [
  {
    title: 'Koality',
    description:
      "This is an awesome description about stuff. This project, for example is an incredible project that changes the world. It makes it a significantly better place. Hire me please, it's getting weird.",
    image_url: 'https://i.imgur.com/km2zOOc.png',
  },
  {
    title: 'Tinfur',
    description:
      "This is an awesome description about stuff. This project, for example is an incredible project that changes the world. It makes it a significantly better place. Hire me please, it's getting weird.",
    image_url: 'https://i.imgur.com/km2zOOc.png',
  },
  {
    title: 'OP-1 Simulator',
    description:
      "This is an awesome description about stuff. This project, for example is an incredible project that changes the world. It makes it a significantly better place. Hire me please, it's getting weird.",
    image_url: 'https://i.imgur.com/km2zOOc.png',
  },
  {
    title: 'Data viz stuff?',
    description:
      "This is an awesome description about stuff. This project, for example is an incredible project that changes the world. It makes it a significantly better place. Hire me please, it's getting weird.",
    image_url: 'https://i.imgur.com/km2zOOc.png',
  },
]

export default class Home extends Page {
  projectId: number
  projectShowcase: ProjectShowcase | null

  constructor({ projectId }) {
    super({
      id: 'home',

      selector: '.home',
      elements: {},
    })

    this.createProject()
  }

  createProject() {
    this.projectShowcase = new ProjectShowcase({
      title: PROJECTS_MOCK[0]?.title,
      imageUrl: PROJECTS_MOCK[0]?.image_url,
      description: PROJECTS_MOCK[0]?.description,
    })
  }
}
