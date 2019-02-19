import path from 'path'
import aws from './aws'
import _ from 'lodash'
import fs from 'fs'

const lambda = new aws.Lambda()

const createFunction = async (file, functionName, role, vpc, security_group) => {

  console.log(`Creating lambda function ${functionName}`)

  const env = fs.readFileSync(path.join('.env.production'), 'utf8')

  return await lambda.createFunction({
    Code: {
      ZipFile: fs.readFileSync(file)
    },
    FunctionName: functionName,
    Handler: 'lambda.handler',
    Publish: true,
    Role: role.Arn,
    Runtime: 'nodejs8.10',
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
    },
    VpcConfig: {
      SecurityGroupIds: [security_group.GroupId],
      SubnetIds: vpc.subnets.map(subnet => subnet.SubnetId)
    },
    Version: '$LATEST' 
  }).promise()

}

export default createFunction
