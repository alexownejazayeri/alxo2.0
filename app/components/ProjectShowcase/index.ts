const mediaStyles = [
  'home__projects__media--card1',
  'home__projects__media--card2',
  'home__projects__media--card3',
  'home__projects__media--card4',
  'home__projects__media--card5',
  'home__projects__media--card6',
]

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
  projectCard?: Element
  mainProjectMediaIndex: number
  currentProjectIndex: any

  project1: HTMLElement
  project2: HTMLElement
  project3: HTMLElement
  project4: HTMLElement
  project5: HTMLElement
  project6: HTMLElement

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

    this.projectNumber = document.querySelector('.home__projects__info--number')

    this.projectTitle = document.querySelector('.home__projects__info--title')

    this.projectUrl = document.querySelector(
      '.home__project__overview__links--url'
    )

    this.project1 = document.getElementById('p1')!
    this.project2 = document.getElementById('p2')!
    this.project3 = document.getElementById('p3')!
    this.project4 = document.getElementById('p4')!
    this.project5 = document.getElementById('p5')!
    this.project6 = document.getElementById('p6')!

    this.render()
  }

  render(): void {
    if (this.projectDescription && this.projectTitle && this.projectNumber) {
      this.projectTitle.textContent = this.title
      this.projectDescription.textContent = this.description
      this.projectNumber.textContent = this.number
    }
  }

  update({
    selectedNumber,
    selectedTitle,
    selectedDescription,
    id: selectedProjectIndex,
  }) {
    if (this.projectDescription && this.projectTitle && this.projectNumber) {
      this.projectTitle.textContent = selectedTitle
      this.projectDescription.textContent = selectedDescription
      this.projectNumber.textContent = selectedNumber

      if (
        this.currentProjectIndex === undefined ||
        this.currentProjectIndex !== selectedProjectIndex
      ) {
        this.currentProjectIndex = selectedProjectIndex

        this.project1.className = mediaStyles.at(0 - this.currentProjectIndex)!
        this.project2.className = mediaStyles.at(1 - this.currentProjectIndex)!
        this.project3.className = mediaStyles.at(2 - this.currentProjectIndex)!
        this.project4.className = mediaStyles.at(3 - this.currentProjectIndex)!
        this.project5.className = mediaStyles.at(4 - this.currentProjectIndex)!
        this.project6.className = mediaStyles.at(5 - this.currentProjectIndex)!
      }
    }
  }
}
