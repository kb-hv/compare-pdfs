const express = require('express')
const router = require('./routes.js')

const app = express()

app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.listen(3000, () => {
  console.log('Server started');
  app.use(router)
  app.use((req, res) => {
    res.render('four04')
  })
})