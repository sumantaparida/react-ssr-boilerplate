const User = require('../../db/models/User')
const isEmpty = require('lodash/isEmpty')

function verifyUniqueUsername (newUsername) {
  let error = {}
  return User.findOne({ username: newUsername })
    .exec()
    .then(user => {
      if (user.username === newUsername) {
        error.newUsername = 'This username is taken'
      }
      return {
        error,
        isUnique: isEmpty(error)
      }
    })
    .catch(err => {
      console.error('verifyUniqueUsername: failed to lookup username', err)
    })
}

module.exports = {verifyUniqueUsername}
