const
  User = require('../models/User.js')

module.exports = {

  //we will be removing this later, using to test full crud w/ json data in postman
  index: (req,res) => {
    User.find({}, (err, usersFromDb) => {
      if(err) return console.log(err)
      //json data
      res.json(usersFromDb)
    })
  },

  show: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) return console.log(err)
      res.render('show', {user: user})
    })
  },

  new: (req, res) => {
    res.render('new')
  },

  create: (req, res) => {
    User.create(req.body, (err, user) => {
      if(err) return console.log(err)
      res.redirect('/users/' + user.id)
    })
  },

  edit: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) return console.log(err)
      res.render('edit', {user: user})
    })
  },

  update: (req, res) => {
    if(req.xhr){
      User.findById(req.params.id, (err, user) => {
        user.cuisinePreferences = req.body[0]
        user.genrePreferences = req.body[1]
        user.save(function(err, user){
          res.json(user)
        })
      })
    } else {
      User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if(err) return console.log(err)
        res.redirect('/users/' + user.id)
      })
    }

  },

  destroy: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if(err) return console.log(err)
      res.redirect('/')
    })
  },

  favorites: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) return console.log(err)
      res.render('favorites', {user: user})
    })
  }

  // login: (req, res) => {
  //   User.findById(req.params.id, (err, user) => {
  //     if(err) return console.log(err)
  //     res.render('login', {user: user})
  //   })
  // }
}
