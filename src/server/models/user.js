import Model from './model'
import Asset from './asset'
import Tourist from './tourist'

const User = new Model({

  tableName: 'users',

  rules: {
    first_name: 'required',
    last_name: 'required',
    email: ['required','email']
  },

  virtuals: {

    full_name: function() {
      return `${this.get('first_name')} ${this.get('last_name')}`
    },

    rfc822: function() {
      return `${this.get('full_name')} <${this.get('email')}>`
    },

    first_initial: function() {
      return this.get('first_name') ? this.get('first_name')[0].toLowerCase() : ''
    },

    initials: function() {
      return this.get('first_initial') + this.get('last_initial')
    },

    last_initial: function() {
      return this.get('last_name') ? this.get('last_name')[0].toLowerCase() : ''
    }

  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  tourists() {
    return this.hasMany(Tourist, 'user_id')
  }


})

export default User
