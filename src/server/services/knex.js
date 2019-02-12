import Knex from 'knex'
import path from 'path'
import fs from 'fs'

const _getConnection = () => {

  const knexpath = path.resolve('knexfile.js')

  if(fs.existsSync(knexpath)) return require(knexpath)[process.env.NODE_ENV].connection

  const { db_user, db_pass, db_host, db_name } = process.env

  return `postgres://${db_user}:${db_pass}@${db_host}:5432/${db_name}`

}

const knex = Knex({
  client: 'pg',
  connection: _getConnection()
})

export default knex
