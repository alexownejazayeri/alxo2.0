import Page from '../../classes/Page'
import ProjectShowcase from '../../components/ProjectShowcase'

const PROJECTS_MOCK = [
  {
    title: 'Koality',
    description:
      'Project 1: Two-thirds of fourth graders in the U.S. struggle with literacy; this app uses speech recognition to help.',
    image_url: 'https://i.imgur.com/km2zOOc.png',
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
    title: 'Tinfur',
    description:
      'Project 2: Tinder-style swipe app for finding a forever home for pets using pet finding APIs.',
    image_url: 'https://i.imgur.com/km2zOOc.png',
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
      'Project 3: This is an awesome description about stuff. This project, for example is an incredible project.',
    image_url: 'https://i.imgur.com/km2zOOc.png',
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
      'Project 4: World clone for learning and practicing coding vocabulary and concepts built with React.',
    image_url: 'https://i.imgur.com/km2zOOc.png',
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
      "Project 5: Aloompa's ticketing product used by Outside Lands. Worked out an optimized data model for the backend and built both web and mobile views using Next.js",
    image_url: 'https://i.imgur.com/km2zOOc.png',
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
    title: 'Project 6',
    description:
      'Project 6: This is an awesome description about stuff. This project, for example is an incredible project.',
    image_url: 'https://i.imgur.com/km2zOOc.png',
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

    this.createShowcase()
    this.createMedia()
  }

  createShowcase() {
    this.projectShowcase = new ProjectShowcase({
      title: PROJECTS_MOCK[this.projectId]?.title,
      imageUrl: PROJECTS_MOCK[this.projectId]?.image_url,
      description: PROJECTS_MOCK[this.projectId]?.description,
      number: `0${this.projectId + 1}.`,
      url: PROJECTS_MOCK[this.projectId]?.project_links?.url,
      github_url: PROJECTS_MOCK[this.projectId]?.project_links?.github_url,
    })
  }

  createMedia() {
    PROJECTS_MOCK.map((project, i) => {
      const card: HTMLElement | null = document.querySelector(
        `.home__projects__media--card${i + 1}`
      )

      if (card && card.style) {
        card.style.backgroundImage = `url(${project.image_url})`
      }
    })
  }

  update(id: number) {
    if (this.projectShowcase) {
      this.projectShowcase.update({
        selectedTitle: PROJECTS_MOCK[id].title,
        selectedDescription: PROJECTS_MOCK[id].description,
        selectedImageUrl: PROJECTS_MOCK[id].image_url,
        selectedNumber: `0${id + 1}.`,
      })
    }
  }
}
