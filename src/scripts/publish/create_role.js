import aws from './aws'

const iam = new aws.IAM()

const createRole= async (roleName) => {

  console.log(`Creating role ${roleName}`)

  const role = await iam.createRole({
    RoleName: roleName,
    AssumeRolePolicyDocument: JSON.stringify({
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Principal: {
          Service: 'lambda.amazonaws.com'
        },
        Action : 'sts:AssumeRole'
      }]
    })
  }).promise().then(role => role.Role)

  iam.attachRolePolicy({
    PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole',
    RoleName: role.RoleName
  }).promise()

  iam.putRolePolicy({
    PolicyDocument: JSON.stringify({
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Action: [
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:PutLogEvents'
        ],
        Resource: 'arn:aws:logs:*:*:*'
      }]
    }),
    PolicyName: 'log-writer',
    RoleName: role.RoleName
  }).promise()

  return role

}

export default createRole
