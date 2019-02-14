import knex from '../lib/knex'

export const t = (handler) => async (req, res, next) => {

  return knex.transaction(async trx => {

    try {

      await handler(req, res, trx, next)

      await trx.commit()

    } catch(error) {

      await trx.rollback(error)

      res.status(500).json({
        message: error.message
      })

    }

  }).catch(console.error)

}
