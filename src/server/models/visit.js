import Model from './model'
import College from './college'
import Tour from './tour'

const Visit = new Model({

  tableName: 'visits',

  rules: {},

  college() {
    return this.belongsTo(College, 'college_id')
  },

  tour() {
    return this.belongsTo(Tour, 'tour_id')
  }


})

export default Visit
