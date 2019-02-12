import Model from './model'
import Asset from './asset'
import Tour from './tour'

const User = new Model({

  tableName: 'users',

  rules: {},

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  tours() {
    return this.belongsToMany(Tour, 'tours_users')
  }


})

export default User
