export default class ImageCard {
  title: string
  imageUrl: string
  description: string

  projectMedia: HTMLElement | null
  projectTitle: HTMLElement | null
  projectDescription: HTMLElement | null

  constructor({ title, imageUrl, description }) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description

    this.projectMedia = document.querySelector('.home__media')
    this.projectTitle = document.querySelector('.home__title')
    this.projectDescription = document.querySelector('.home__description')

    this.render()
  }

  render(): void {
    if (this.projectMedia && this.projectDescription && this.projectTitle) {
      this.projectMedia.style.backgroundImage = `url(${this.imageUrl})`
      this.projectTitle.innerHTML = this.title
      this.projectDescription.innerHTML = this.description
    }

    // this.title ? (this.title.innerHTML = title) : null
    // this.media
    //   ? (media.innerHTML = PROJECTS_MOCK[projectIndex].image_url)
    //   : null
    // this.description
    //   ? (description.style.backgroundImage = `url${PROJECTS_MOCK[projectIndex].description}`)
    //   : null
  }
}
