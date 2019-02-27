import moment from 'moment'
import dotenv from 'dotenv'
import aws from 'aws-sdk'
import path from 'path'

dotenv.load({ path: path.join('.env') })

aws.config.constructor({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || ''
})

const cloudfront = new aws.CloudFront()

const getDistribution = async (name) => {

  console.log('Finding CloudFront distribution')

  const distributions = await cloudfront.listDistributions().promise()

  return distributions.DistributionList.Items.reduce((id, item) => {

    return id || (item.DefaultCacheBehavior.TargetOriginId === `S3-${name}` ? item : null)

  }, null)

}

const invalidateDistribution = async (distribution, name) => {

  console.log('Invalidating CloudFront distribution')

  await cloudfront.createInvalidation({
    DistributionId: distribution.Id,
    InvalidationBatch: {
      CallerReference: moment().format('x'),
      Paths: {
        Quantity: 1,
        Items: ['/index.html']
      }
    }
  }).promise()

}

const publish = async (name) => {

  const distribution = await getDistribution(name)

  await invalidateDistribution(distribution, name)

}

publish(process.env.AWS_BUCKET).then(() => process.exit())
