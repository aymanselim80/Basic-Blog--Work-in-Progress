// Requirements...
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

// Connecting to our Local MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

//Using ejs for our different views
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))  //TO enable express to understand the posted body
app.use(methodOverride('_method')) // As we are using Delete & Put


//Our main route or Home page, shows all the stored articles
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })  // Listing the Articles from newest to oldest.
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter) // To use "/articles" before the other routes.

app.listen(5000)