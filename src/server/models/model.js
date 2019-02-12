import bookshelf from '../services/bookshelf'
import Checkit from  'checkit'
import _ from 'lodash'

class Model {

  constructor(options) {

    return bookshelf.Model.extend({

      hasTimestamps: options.hasTimestamps !== false,

      tableName: '',

      rules: {},

      virtuals: {},

      initialize: function(attrs, opts) {

        this.on('saving', this.validateSave)

      },

      validateSave: function(model, attrs, saveOptions) {

        if(saveOptions.skipValidation) return true

        return new Checkit(this.rules).run(this.attributes, { tableName: this.tableName })

      },

      ...options

    })

  }

}

export default Model
