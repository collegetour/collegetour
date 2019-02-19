import aws from './aws'

const lambda = new aws.Lambda()

const getFunction = async (functionName) => {

  console.log(`Getting lambda function ${functionName}`)

  const functions = await lambda.listFunctions().promise().then(result => result.Functions)

  return functions.find(fn => fn.FunctionName === functionName)

}

export default getFunction
