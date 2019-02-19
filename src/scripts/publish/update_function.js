import path from 'path'
import aws from './aws'
import _ from 'lodash'
import fs from 'fs'

const lambda = new aws.Lambda()

const updateFunction = async (file, functionName) => {

  console.log('Configuring function')

  const env = fs.readFileSync(path.join('.env.production'), 'utf8')

  await lambda.updateFunctionConfiguration({
    FunctionName: functionName,
    Environment: {
      Variables: env.split('\n').reduce((variables, variable) => {
        if(variable.length === 0) return variables
        const [,key,value] = variable.match(/(.*)=(.*)/)
        if(_.includes(['AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY','AWS_REGION'], key)) return variables
        return {
          ...variables,
          [key]: value
        }
      }, {})
    }
  }).promise()

  await lambda.updateFunctionCode({
    FunctionName: functionName,
    ZipFile: fs.readFileSync(file)
  }).promise()


  await lambda.publishVersion({
    FunctionName: functionName
  }).promise()

}

export default updateFunction
