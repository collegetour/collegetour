import Model from './model'
import Asset from './asset'
import User from './user'
import Visit from './visit'

const Impression = new Model({

  tableName: 'impressions',

  rules: {},

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  },

  visit() {
    return this.belongsTo(Visit, 'visit_id')
  }


})

export default Impression
