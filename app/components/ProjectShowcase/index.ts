export default class ImageCard {
  description: string
  github_url: string
  number: string
  imageUrl: string
  title: string
  url: string

  projectMedia: HTMLElement | null
  projectNumber: HTMLElement | null
  projectTitle: HTMLElement | null
  projectDescription: HTMLElement | null
  projectUrl: HTMLElement | null

  constructor({ description, github_url, number, imageUrl, title, url }) {
    this.description = description
    this.github_url = github_url
    this.imageUrl = imageUrl
    this.number = number
    this.title = title
    this.url = url

    this.projectDescription = document.querySelector(
      '.home__project__overview--description'
    )
    this.projectMedia = document.querySelector('.home__projects__media--card1')
    this.projectNumber = document.querySelector('.home__projects__info--number')
    this.projectTitle = document.querySelector('.home__projects__info--title')
    this.projectUrl = document.querySelector(
      '.home__project__overview__links--url'
    )

    this.render()
  }

  render(): void {
    if (
      this.projectMedia &&
      this.projectDescription &&
      this.projectTitle &&
      this.projectNumber
    ) {
      this.projectTitle.innerHTML = this.title
      this.projectDescription.innerHTML = this.description
      this.projectNumber.innerHTML = this.number
    }
  }

  update({
    selectedNumber,
    selectedTitle,
    selectedImageUrl,
    selectedDescription,
  }) {
    if (
      this.projectMedia &&
      this.projectDescription &&
      this.projectTitle &&
      this.projectNumber
    ) {
      this.projectTitle.innerHTML = selectedTitle
      // this.projectMedia.style.backgroundImage = selectedImageUrl
      this.projectDescription.innerHTML = selectedDescription
      this.projectNumber.innerHTML = selectedNumber
    }
  }
}
