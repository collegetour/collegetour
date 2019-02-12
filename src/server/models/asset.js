import Model from './model'
import Impression from './impression'
import College from './college'
import User from './user'

const Asset = new Model({

  tableName: 'assets',

  rules: {},

  virtuals: {

    url: function() {
      return `/images/${this.get('file_name')}`
    }

  },

  college() {
    return this.hasOne(College, 'logo_id')
  },

  impression() {
    return this.hasOne(Impression, 'asset_id')
  },

  user() {
    return this.hasOne(User, 'photo_id')
  }

})

export default Asset
