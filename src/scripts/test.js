import dotenv from 'dotenv'
import Mocha from 'mocha'
import glob from 'glob'
import Knex from 'knex'
import fs from 'fs'

if(fs.existsSync('.env.test')) dotenv.load({
  path: '.env.test'
})

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/db/migrations'
  },
  pool: {
    min: 1,
    max: 1
  },
  seeds: {
    directory: './src/db/fixtures'
  },
  useNullAsDefault: true
})

const test = async () => {

  const mocha = new Mocha()

  glob.sync('src/@(app|server)/**/*_test.js').map((test) => {
    mocha.addFile(test)
  })

  await knex.migrate.latest()

  await knex.seed.run()

  try {

    await new Promise((resolve, reject) => {
      mocha.run((err) => {
        if(err) reject(err)
        resolve()
      })
    })

  } catch(err) {
    console.log(err)
  }

  await knex.migrate.rollback()

}

test().then(process.exit)
