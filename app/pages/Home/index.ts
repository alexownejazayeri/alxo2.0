import Page, { SitePage } from '../../classes/Page'
import ProjectShowcase from '../../components/ProjectShowcase'

const PROJECTS_MOCK = [
  {
    title: 'Koality',
    description:
      'Two-thirds of fourth graders in the U.S. struggle with literacy; this app uses speech recognition to help.',
    videoUrl: 'https://alxo-portfolio-assets.s3.amazonaws.com/sendskies.MOV',
    project_links: {
      url: 'https://www.example.com',
      github_url: 'https://www.github.com/my-example-project',
    },
    technologies: {
      frontend: ['javascript', 'typescript', 'react', 'next.js'],
      backend: ['node.js', 'ChatGPT'],
    },
  },
  {
    title: 'Tinfur',
    description:
      'Tinder-style swipe app for finding a forever home for pets using pet finding APIs.',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
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
      'This is an awesome description about stuff. This project, for example is an incredible project.',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
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
      'World clone for learning and practicing coding vocabulary and concepts built with React.',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
      'Ticketing product used by Outside Lands. Built core ticketing features using AWS AppSync and Next.js.',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
    title: 'Moon Water',
    description:
      'This is an awesome description about stuff. This project, for example is an incredible project.',
    videoUrl: 'https://alxo-portfolio-assets.s3.amazonaws.com/sendskies.MOV',
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

export default class Home extends Page implements SitePage {
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
      videoUrl: PROJECTS_MOCK[this.projectId]?.videoUrl,
      description: PROJECTS_MOCK[this.projectId]?.description,
      number: `0${this.projectId + 1}.`,
      url: PROJECTS_MOCK[this.projectId]?.project_links?.url,
      github_url: PROJECTS_MOCK[this.projectId]?.project_links?.github_url,
    })
  }

  createMedia() {
    PROJECTS_MOCK.map((project, i) => {
      const videoClips: NodeListOf<HTMLVideoElement> =
        document.querySelectorAll(`.project__card__video__clip`)

      if (videoClips && videoClips.length) {
        videoClips[i].src = PROJECTS_MOCK[i].videoUrl
        videoClips[i].load()
      }
    })
  }

  update(id: number) {
    if (this.projectShowcase) {
      this.projectShowcase.update({
        selectedTitle: PROJECTS_MOCK[id].title,
        selectedDescription: PROJECTS_MOCK[id].description,
        selectedNumber: `0${id + 1}.`,
        id,
      })
    }
  }
}
