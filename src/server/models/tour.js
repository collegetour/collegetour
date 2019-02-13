import Tourist from './tourist'
import Model from './model'
import Visit from './visit'

const Tour = new Model({

  tableName: 'tours',

  rules: {},

  tourists() {
    return this.hasMany(Tourist, 'user_id')
  },

  visits() {
    return this.hasMany(Visit, 'tour_id')
  }


})

export default Tour
