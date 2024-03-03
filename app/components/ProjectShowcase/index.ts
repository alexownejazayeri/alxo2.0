import GSAP from 'gsap'

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
  desktopImgUrl: string
  title: string
  url: string
  frontendTech: Array<string>
  backendTech: Array<string>

  projectMedia: HTMLElement | null
  projectNumber: HTMLElement | null
  projectTitle: HTMLElement | null
  projectDescription: HTMLElement | null
  projectUrls: NodeListOf<Element> | null
  projectCard?: Element
  mainProjectMediaIndex: number
  currentProjectIndex: any

  project1: HTMLElement
  project2: HTMLElement
  project3: HTMLElement
  project4: HTMLElement
  project5: HTMLElement
  project6: HTMLElement

  frontendTableRow: HTMLTableRowElement
  backendTableRow: HTMLTableRowElement

  constructor({
    description,
    github_url,
    number,
    desktopImgUrl,
    title,
    url,
    frontendTech,
    backendTech,
  }) {
    this.description = description
    this.github_url = github_url
    this.desktopImgUrl = desktopImgUrl
    this.number = number
    this.title = title
    this.url = url
    this.frontendTech = frontendTech
    this.backendTech = backendTech

    this.projectDescription = document.querySelector(
      '.home__project__overview--description'
    )
    this.projectNumber = document.querySelector('.home__projects__info--number')
    this.projectTitle = document.querySelector('.home__projects__info--title')
    this.projectUrls = document.querySelectorAll(
      '.home__project__overview__links--url--link'
    )

    this.project1 = document.getElementById('p1')!
    this.project2 = document.getElementById('p2')!
    this.project3 = document.getElementById('p3')!
    this.project4 = document.getElementById('p4')!
    this.project5 = document.getElementById('p5')!
    this.project6 = document.getElementById('p6')!

    this.frontendTableRow = document.getElementById(
      'frontend-row'
    )! as HTMLTableRowElement

    this.backendTableRow = document.getElementById(
      'backend-row'
    )! as HTMLTableRowElement

    this.render()
  }

  render(): void {
    if (
      this.projectDescription &&
      this.projectTitle &&
      this.projectNumber &&
      this.projectUrls
    ) {
      this.projectTitle.textContent = this.title
      this.projectDescription.textContent = this.description
      this.projectNumber.textContent = this.number
      this.projectUrls[0].textContent = this.url
      this.projectUrls[1].textContent = this.github_url

      this.frontendTableRow.innerHTML = ''
      this.backendTableRow.innerHTML = ''

      const tableHeaderFrontend = document.createElement('td')
      tableHeaderFrontend.textContent = 'Frontend'
      this.frontendTableRow.appendChild(tableHeaderFrontend)

      const tableHeaderBackend = document.createElement('td')
      tableHeaderBackend.textContent = 'Backend'
      this.backendTableRow.appendChild(tableHeaderBackend)

      for (const technology of this.frontendTech) {
        const tableData = document.createElement('td')
        tableData.textContent = technology
        tableData.className = 'badge'
        this.frontendTableRow.appendChild(tableData)
      }

      for (const technology of this.backendTech) {
        const tableData = document.createElement('td')
        tableData.textContent = technology
        tableData.className = 'badge'
        this.backendTableRow.appendChild(tableData)
      }
    }
  }

  update({
    selectedNumber,
    selectedTitle,
    selectedDescription,
    selectedUrl,
    selectedGithubUrl,
    selectedFrontendTech,
    selectedBackendTech,
    id: selectedProjectIndex,
  }) {
    if (
      this.projectDescription &&
      this.projectTitle &&
      this.projectNumber &&
      this.projectUrls
    ) {
      this.projectTitle.textContent = selectedTitle
      this.projectDescription.textContent = selectedDescription
      this.projectNumber.textContent = selectedNumber

      // Set link text and href
      this.projectUrls[0].textContent = selectedUrl
      this.projectUrls[0].setAttribute('href', selectedUrl)

      // Set github text and href
      const hasGithubUrl = selectedGithubUrl !== ''

      const gitHubLogo = document.querySelector(
        '.home__project__overview__links--github--icon'
      )!

      if (!hasGithubUrl) {
        gitHubLogo.setAttribute('display', 'none')
      } else {
        gitHubLogo.setAttribute('display', 'visible')
      }

      this.projectUrls[1].textContent = selectedGithubUrl
      this.projectUrls[1].setAttribute('href', selectedGithubUrl)

      this.frontendTech = selectedFrontendTech
      this.backendTech = selectedBackendTech

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

        this.render()

        GSAP.fromTo(
          '.home__projects__info--line',
          { x: -30, autoAlpha: 0, ease: 'expo.in' },
          { x: 0, autoAlpha: 1, duration: 0.5 }
        )

        GSAP.fromTo(
          '.home__projects__info--title',
          { autoAlpha: 0.5, ease: 'expo.in' },
          { autoAlpha: 1, duration: 0.5 }
        )

        GSAP.fromTo(
          '.home__project__overview--description',
          { autoAlpha: 0.3, ease: 'expo.in' },
          { autoAlpha: 1, duration: 0.8 }
        )

        GSAP.fromTo(
          '.home__project__overview__links--url',
          { autoAlpha: 0.3, ease: 'expo.in' },
          { autoAlpha: 1, delay: 0.1, duration: 0.5 }
        )

        GSAP.fromTo(
          '.home__project__overview__links--github',
          { autoAlpha: 0.3, ease: 'expo.in' },
          { autoAlpha: 1, delay: 0.15, duration: 0.25 }
        )

        GSAP.fromTo(
          '.badge',
          { rotationX: -100 },
          { rotationX: 0, duration: 0.6 }
        )
      }
    }
  }
}
