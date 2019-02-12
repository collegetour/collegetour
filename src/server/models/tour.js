import Model from './model'
import Visit from './visit'

const Tour = new Model({

  tableName: 'tours',

  rules: {},

  visits() {
    return this.has_many(Visit, 'tour_id')
  }


})

export default Tour
