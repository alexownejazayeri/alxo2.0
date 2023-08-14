import Page from '../../classes/Page'
import ProjectShowcase from '../../components/ProjectShowcase'

const PROJECTS_MOCK = [
  {
    title: 'Koality',
    description:
      'Two-thirds of fourth graders in the U.S. struggle with literacy; this app uses speech recognition to help.',
    image_url: 'https://i.imgur.com/km2zOOc.png',
  },
  {
    title: 'Tinfur',
    description:
      'Tinder-style swipe app for finding a forever home for pets using pet finding APIs.',
    image_url: 'https://i.imgur.com/km2zOOc.png',
  },
  {
    title: 'OP-1 Simulator',
    description:
      "This is an awesome description about stuff. This project, for example is an incredible project that changes the world. It makes it a significantly better place. Hire me please, it's getting weird.",
    image_url: 'https://i.imgur.com/km2zOOc.png',
  },
  {
    title: 'CODE-LE',
    description:
      'World clone for learning and practicing coding vocabulary and concepts built with React.',
    image_url: 'https://i.imgur.com/km2zOOc.png',
  },
  {
    title: 'Project 5',
    description: 'Data visualizer using U.S. census data to .',
    image_url: 'https://i.imgur.com/km2zOOc.png',
  },
  {
    title: 'Project 6',
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

    this.projectId = projectId

    this.createProject()
  }

  createProject() {
    this.projectShowcase = new ProjectShowcase({
      title: PROJECTS_MOCK[this.projectId]?.title,
      imageUrl: PROJECTS_MOCK[this.projectId]?.image_url,
      description: PROJECTS_MOCK[this.projectId]?.description,
    })
  }

  update(id: number) {
    if (this.projectShowcase) {
      this.projectShowcase.update({
        selectedTitle: PROJECTS_MOCK[id].title,
        selectedDescription: PROJECTS_MOCK[id].description,
        selectedImageUrl: PROJECTS_MOCK[id].image_url,
      })
    }
  }
}
