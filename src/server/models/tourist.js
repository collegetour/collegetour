import Model from './model'
import Tour from './tour'
import User from './user'

const Tourist = new Model({

  tableName: 'tourists',

  rules: {},

  tour() {
    return this.belongsTo(Tour, 'tour_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }


})

export default Tourist
