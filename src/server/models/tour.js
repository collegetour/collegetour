import Traveler from './traveler'
import Model from './model'
import Visit from './visit'

const Tour = new Model({

  tableName: 'tours',

  rules: {},

  travelers() {
    return this.hasMany(Traveler, 'user_id')
  },

  visits() {
    return this.hasMany(Visit, 'tour_id')
  }


})

export default Tour
