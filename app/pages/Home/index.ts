import Page, { SitePage } from '../../classes/Page'
import ProjectShowcase from '../../components/ProjectShowcase'
import PROJECTS from '../../data/projects'

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
      title: PROJECTS[this.projectId]?.title,
      videoUrl: PROJECTS[this.projectId]?.videoUrl,
      description: PROJECTS[this.projectId]?.description,
      number: `0${this.projectId + 1}.`,
      url: PROJECTS[this.projectId]?.project_links?.url,
      github_url: PROJECTS[this.projectId]?.project_links?.github_url,
      frontendTech: PROJECTS[this.projectId]?.technologies.frontend,
      backendTech: PROJECTS[this.projectId]?.technologies.backend,
    })
  }

  createMedia() {
    PROJECTS.map((_, i) => {
      const videoClips: NodeListOf<HTMLVideoElement> =
        document.querySelectorAll(`.project__card__video__clip`)

      if (videoClips && videoClips.length) {
        videoClips[i].src = PROJECTS[i].videoUrl
        videoClips[i].load()
      }
    })
  }

  update(id: number) {
    if (this.projectShowcase) {
      this.projectShowcase.update({
        selectedTitle: PROJECTS[id].title,
        selectedDescription: PROJECTS[id].description,
        selectedNumber: `0${id + 1}.`,
        selectedUrl: PROJECTS[id].project_links.url,
        selectedGithubUrl: PROJECTS[id].project_links.github_url,
        selectedFrontendTech: PROJECTS[id].technologies?.frontend,
        selectedBackendTech: PROJECTS[id].technologies?.backend,
        id,
      })
    }
  }
}
