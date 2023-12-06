const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

import { Application } from 'express'

dotenv.config()

const app: Application = express()
const port = process.env.EXPRESS_PORT || 8160

app.use(express.static(path.join(__dirname, 'static')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('pages/home', {})
})

app.get('/about', (req, res) => {
  res.render('pages/about', {})
})

app.get('/contact', (req, res) => {
  res.render('pages/contact', {})
})

app.get('*', (req, res) => {
  res.render('pages/404', {})
})

// TODO(alex): come back to projects
// app.get('/projects', (req, res) => {
//   console.log('rendering projects...')

//   res.render('pages/projects', {})
// })

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
