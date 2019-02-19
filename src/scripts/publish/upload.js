import mime from 'mime-types'
import aws from './aws'
import fs from 'fs'

const s3 = new aws.S3()

const upload = async (file, bucket) => {

  console.log(`Uploading ${file} to S3 bucket ${bucket}`)

  const Body = fs.readFileSync(file)

  await s3.upload({
    ACL: 'public-read',
    Body,
    Bucket: bucket,
    ContentType: mime.lookup(file),
    Key: file
  }).promise()

}

export default upload
