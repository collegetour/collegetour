import Knex from 'knex'
import path from 'path'
import fs from 'fs'

const _getConnection = () => {

  if(process.env.DATABASE_URL) return process.env.DATABASE_URL

  const knexpath = path.resolve('knexfile.js')

  if(fs.existsSync(knexpath)) return require(knexpath)[process.env.NODE_ENV].connection

}

const knex = Knex({
  client: 'pg',
  connection: _getConnection(),
  useNullAsDefault: true,
  pool: {
    min: 3,
    max: 5
  }
})

export default knex
