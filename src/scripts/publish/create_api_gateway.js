import aws from './aws'

const createRestAPI = async (name, fn) => {

  console.log(`Creating API Gateway ${name}`)

  var api = new aws.APIGateway()

  const restAPI = await api.createRestApi({
    name: name,
    description: name,
    apiKeySource: 'HEADER',
    endpointConfiguration: {
      types:['REGIONAL']
    }
  }).promise()

  const resources = await api.getResources({
    restApiId: restAPI.id
  }).promise().then(result => result.items)

  console.log('resources', resources)

  const resource = await api.createResource({
    restApiId: restAPI.id,
    parentId: resources[0].id,
    pathPart: '{proxy+}'
  }).promise()

  console.log('resource', resource)

  const anyMethod = await api.putMethod({
    restApiId: restAPI.id,
    resourceId: resource.id,
    httpMethod: 'ANY',
    authorizationType: 'NONE'
  }).promise()

  console.log('anyMethod', anyMethod)

  const anyMethodResponse = await api.putMethodResponse({
    restApiId: restAPI.id,
    resourceId: resource.id,
    httpMethod: 'ANY',
    statusCode: '200',
    responseParameters: {
      'method.response.header.Access-Control-Allow-Headers': false,
      'method.response.header.Access-Control-Allow-Methods': false,
      'method.response.header.Access-Control-Allow-Origin': false
    }
  }).promise()

  console.log('anyMethodResponse', anyMethodResponse)

  const anyIntegration = await api.putIntegration({
    type: 'AWS_PROXY',
    httpMethod: 'ANY',
    integrationHttpMethod: 'POST',
    uri: 'arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:927906310648:function:college-function/invocations',
    contentHandling: 'CONVERT_TO_TEXT',
    // requestParameters: {
    //   'integration.request.path.proxy': 'method.request.path.proxy'
    // },
    // cacheKeyParameters: [
    //   'method.request.path.proxy'
    // ],
    resourceId: resource.id,
    restApiId: restAPI.id
  }).promise()

  console.log('anyIntegration', anyIntegration)

  const anyIntegrationResponse = await api.putIntegrationResponse({
    restApiId: restAPI.id,
    resourceId: resource.id,
    httpMethod: 'ANY',
    statusCode: '200',
    responseTemplates: {
      'application/json': null
    }
  }).promise()

  console.log('anyIntegrationResponse', anyIntegrationResponse)

  const optionsMethod = await api.putMethod({
    authorizationType: 'NONE',
    httpMethod: 'OPTIONS',
    resourceId: resource.id,
    restApiId: restAPI.id,
    requestParameters: {
      'method.request.header.Authorization': false
    }
  }).promise()

  console.log('optionsMethod', optionsMethod)

  const optionsMethodResponse = await api.putMethodResponse({
    restApiId: restAPI.id,
    resourceId: resource.id,
    httpMethod: 'OPTIONS',
    statusCode: '200',
    responseParameters: {
      'method.response.header.Access-Control-Allow-Headers': false,
      'method.response.header.Access-Control-Allow-Methods': false,
      'method.response.header.Access-Control-Allow-Origin': false
    },
    responseModels: { 'application/json': 'Empty' }
  }).promise()

  console.log('optionsMethodResponse', optionsMethodResponse)

  const optionsIntegration = await api.putIntegration({
    type: 'MOCK',
    httpMethod: 'OPTIONS',
    integrationHttpMethod: 'POST',
    requestTemplates: {
      'application/json': '{"statusCode": 200}'
    },
    passthroughBehavior: 'WHEN_NO_MATCH',
    resourceId: resource.id,
    restApiId: restAPI.id
  }).promise()

  console.log('optionsIntegration', optionsIntegration)

  const optionsIntegrationResponse = await api.putIntegrationResponse({
    restApiId: restAPI.id,
    resourceId: resource.id,
    httpMethod: 'OPTIONS',
    statusCode: '200',
    responseParameters: {
      'method.response.header.Access-Control-Allow-Headers': '\'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token\'',
      'method.response.header.Access-Control-Allow-Methods': '\'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT\'',
      'method.response.header.Access-Control-Allow-Origin': '\'*\''
    },
    responseTemplates: {
      'application/json': null
    }
  }).promise()

  console.log('optionsIntegrationResponse', optionsIntegrationResponse)

  const deployment = await api.createDeployment({
    restApiId: restAPI.id,
    stageName: 'production'
  }).promise()

  console.log('deployment', deployment)

}

export default createRestAPI
