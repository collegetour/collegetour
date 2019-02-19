import knex from '../server/lib/knex'
import mime from 'mime-types'
import dotenv from 'dotenv'
import aws from 'aws-sdk'
import path from 'path'
import fs from 'fs'

const env = process.env.NODE_ENV === 'production' ? '.env.production' : '.env'

dotenv.load({
  path: path.join(env)
})

aws.config.constructor({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || ''
})

const s3 = new aws.S3()

const assets = async () => {

  const assets = await knex('assets')

  await Promise.mapSeries(assets, async asset => {

    const file = path.join('src','public','assets',asset.id.toString(),asset.file_name)

    if(!fs.existsSync(file)) return

    console.log(file)

    const Body = fs.readFileSync(file)

    console.log(`uploading ${asset.file_name}`)

    console.log()

    await s3.upload({
      ACL: 'public-read',
      Body,
      Bucket: process.env.AWS_ASSET_BUCKET,
      ContentType: mime.lookup(asset.file_name),
      Key: path.join('assets',asset.id.toString(),asset.file_name)
    }).promise()




  })

  console.log(assets)


}



assets().then(() => process.exit())
