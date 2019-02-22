import knex from '../lib/knex'

export const t = (handler) => async (req, res, next) => {

  return knex.transaction(async trx => {

    try {

      await handler(req, res, trx, next)

      await trx.commit()

    } catch(err) {

      await trx.rollback(err)

      if(err.errors) {

        return res.status(422).json({
          message: 'Unable to save record',
          errors: err.toJSON()
        })

      }

      res.status(500).json({
        message: err.message
      })

    }

  }).catch(() => {})//console.error)

}
