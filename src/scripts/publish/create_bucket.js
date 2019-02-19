import aws from './aws'

const s3 = new aws.S3()

const createBucket = async (bucket) => {

  console.log(`Creating S3 bucket ${bucket}`)

  await s3.createBucket({
    Bucket: bucket,
    ACL: 'public-read'
  }).promise()

}

export default createBucket
