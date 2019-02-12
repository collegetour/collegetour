import Model from './model'
import Asset from './asset'
import Tour from './tour'

const User = new Model({

  tableName: 'users',

  rules: {},

  virtuals: {

    full_name: function() {
      return `${this.get('first_name')} ${this.get('last_name')}`
    }

  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  tours() {
    return this.belongsToMany(Tour, 'tours_users')
  }


})

export default User
