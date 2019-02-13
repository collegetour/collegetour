import knex from '../services/knex'

export const withTransaction = (handler) => async (req, res, next) => {

  return knex.transaction(async trx => {

    try {

      await handler(req, res, trx, next)

      await trx.commit()

    } catch(error) {

      await trx.rollback(error)

      if(process.env.NODE_ENV !== 'production') console.log(error)

    }

  })

}
