import './environment'
import path from 'path'
import compile from './compile'
import archive from './archive'
import getBucket from './get_bucket'
import createBucket from './create_bucket'
import getRole from './get_role'
import createRole from './create_role'
import getVPC from './get_VPC'
import getSecurityGroup from './get_security_group'
import createSecurityGroup from './create_security_group'
import getApiGateway from './get_api_gateway'
import createApiGateway  from './create_api_gateway'

import getFunction from './get_function'
import createFunction from './create_function'
import updateFunction from './update_function'

const publish = async () => {

  const name = 'collegetour'

  const bucketName = `functions.${process.env.AWS_BUCKET}`

  const file = path.join('tmp', 'lambda.zip')

  const roleName = `${name}-role`

  const vpcTenancy = 'default'

  const securityGroupName = `${name}-server`

  const gatewayName = `${name}-gateway`

  const functionName = `${name}-function`

  await compile()
  //
  // await archive()
  //
  // const role = await getRole(roleName) || await createRole(roleName)
  //
  // const vpc = await getVPC(vpcTenancy)
  //
  // const group = await getSecurityGroup(securityGroupName) || await createSecurityGroup(securityGroupName, vpc)
  //
  // const fn = await getFunction(functionName) || await createFunction(file, functionName, role, vpc, group)
  //
  // await updateFunction(file, functionName)
  //
  // await getApiGateway(gatewayName) || await createApiGateway(gatewayName, fn)

}

publish().then(process.exit)
