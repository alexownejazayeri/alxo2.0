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

    this.projectMedia = document.querySelector('.home__projects__media')
    this.projectTitle = document.querySelector('.home__projects__info--title')
    this.projectDescription = document.querySelector(
      '.home__project__overview--description'
    )

    this.render()
  }

  render(): void {
    if (this.projectMedia && this.projectDescription && this.projectTitle) {
      this.projectMedia.style.backgroundImage = `url(${this.imageUrl})`
      this.projectTitle.innerHTML = this.title
      this.projectDescription.innerHTML = this.description
    }
  }

  update({ selectedTitle, selectedImageUrl, selectedDescription }) {
    console.log('updating project showcase')
    if (this.projectMedia && this.projectDescription && this.projectTitle) {
      console.log('hitting the if-check')
      this.projectTitle.innerHTML = selectedTitle
      this.projectMedia.style.backgroundImage = selectedImageUrl
      this.projectDescription.innerHTML = selectedDescription
    }
  }
}
