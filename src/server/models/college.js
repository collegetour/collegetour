import Model from './model'
import Asset from './asset'
import Visit from './visit'

const College = new Model({

  tableName: 'colleges',

  rules: {},

  logo() {
    return this.belongsTo(Asset, 'logo_id')
  },

  visit() {
    return this.belongsTo(Visit, 'college_id')
  }


})

export default College
