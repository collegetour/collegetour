import knex from '../services/knex'

export const withTransaction = (handler) => async (req, res, next) => {

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
