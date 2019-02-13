import Model from './model'
import Tour from './tour'
import User from './user'

const Traveler = new Model({

  tableName: 'travelers',

  rules: {},

  tour() {
    return this.belongsTo(Tour, 'tour_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }


})

export default Traveler
