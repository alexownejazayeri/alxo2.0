const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const UAParser = require('ua-parser-js')

dotenv.config()

import { Application, Request } from 'express'

const app: Application = express()
const port = process.env.EXPRESS_PORT || 8160

const detectUserDevice = (request: Request) => {
  const ua = UAParser(request.headers['user-agent'])

  return {
    isDesktop: ua.device.type === undefined,
    isMobile: ua.device.type === 'mobile',
    isTablet: ua.device.type === 'tablet',
  }
}

app.use(express.static(path.join(__dirname, 'static')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  const userDevice = detectUserDevice(req)
  const HTMLTitleElementText = 'ALXO | Home'
  const HTMLMetaTagDescription =
    "Selected works from the projects I've had a hand in over my career."

  res.render('pages/home', {
    userDevice,
    HTMLTitleElementText,
    HTMLMetaTagDescription,
  })
})

app.get('/about', (req, res) => {
  const userDevice = detectUserDevice(req)
  const HTMLTitleElementText = 'ALXO | About'
  const HTMLMetaTagDescription =
    "I'm a big fan of dumplings 🥟 and spending time outside 🌲"

  res.render('pages/about', {
    userDevice,
    HTMLTitleElementText,
    HTMLMetaTagDescription,
  })
})

app.get('/contact', (req, res) => {
  const userDevice = detectUserDevice(req)
  const HTMLTitleElementText = 'ALXO | Contact Me'
  const HTMLMetaTagDescription = ''

  res.render('pages/contact', {
    userDevice,
    HTMLTitleElementText,
    HTMLMetaTagDescription,
  })
})

app.get('*', (req, res) => {
  const userDevice = detectUserDevice(req)
  const HTMLTitleElementText = 'ALXO | Page Not Found'
  const HTMLMetaTagDescription = ''

  res.render('pages/404', {
    userDevice,
    HTMLTitleElementText,
    HTMLMetaTagDescription,
  })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
