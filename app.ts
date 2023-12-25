const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const UAParser = require('ua-parser-js')

dotenv.config()

import { Application, Request } from 'express'

const app: Application = express()
const port = process.env.EXPRESS_PORT || 8160

const detectDevice = (request: Request) => {
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
  const device = detectDevice(req)
  const title = 'ALXO | Home'

  res.render('pages/home', { device, title })
})

app.get('/about', (req, res) => {
  const device = detectDevice(req)
  const title = 'ALXO | About'

  res.render('pages/about', { device, title })
})

app.get('/contact', (req, res) => {
  const device = detectDevice(req)
  const title = 'ALXO | Contact Me'

  res.render('pages/contact', { device, title })
})

app.get('*', (req, res) => {
  const device = detectDevice(req)
  const title = 'ALXO | Page Not Found'

  res.render('pages/404', { device, title })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
