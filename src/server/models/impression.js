import Model from './model'
import Asset from './asset'
import Visit from './visit'

const Impression = new Model({

  tableName: 'impressions',

  rules: {},

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  visit() {
    return this.belongsTo(Visit, 'visit_id')
  }


})

export default Impression
