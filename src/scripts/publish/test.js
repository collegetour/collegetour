import aws from 'aws-sdk'
import dotenv from 'dotenv'
import path from 'path'

const getApiGateway = async (name) => {

  const api = new aws.APIGateway()

  const gateway = await api.getRestApi({
    restApiId: 'cnrbgt1lad'
  }).promise()

  console.log('gateway', gateway)

  const resources = await api.getResources({
    restApiId: gateway.id
  }).promise()

  console.log('resources', resources)
  //
  // const anyMethod = await api.getMethod({
  //   restApiId: gateway.id,
  //   resourceId: resources.items[0].id,
  //   httpMethod: 'ANY',
  //   requestParameters: {
  //     'method.request.path.proxy': true
  //   }
  // }).promise()
  //
  // console.log('anyMethod', anyMethod)

  const optionsIntegration = await api.getIntegration({
    restApiId: gateway.id,
    resourceId: resources.items[0].id,
    httpMethod: 'OPTIONS'
  }).promise()


  const anyIntegrationResponse = await api.getIntegrationResponse({
    restApiId: gateway.id,
    resourceId: resources.items[0].id,
    httpMethod: 'ANY',
    statusCode: '200'
  }).promise()

  console.log('anyIntegrationResponse', anyIntegrationResponse)

  // const response = await api.getMethodResponse({
  //   httpMethod: 'ANY',
  //   restApiId: gateway.id,
  //   resourceId: resources.items[0].id,
  //   statusCode: '200'
  // }).promise()
  //
  // console.log(response)

}

const env = path.join('.env.cce')

dotenv.load({ path: env })

aws.config.constructor({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || ''
})

getApiGateway().then(process.exit)
