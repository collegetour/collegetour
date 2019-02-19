import aws from './aws'

const getApiGateway = async (name) => {

  var api = new aws.APIGateway()

  console.log(`Getting API Gateway ${name}`)

  const gateways = await api.getRestApis().promise().then(result => result.items)

  return gateways.find(gateway => gateway.name === name)

}

export default getApiGateway
