import aws from './aws'

const s3 = new aws.S3()

const getBucket = async (name) => {

  console.log(`Getting S3 bucket ${name}`)

  const buckets = await s3.listBuckets().promise().then(result => result.Buckets)

  return buckets.find(bucket => bucket.Name === name)

}

export default getBucket
