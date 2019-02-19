import aws from './aws'

const iam = new aws.IAM()

const getRole = async (roleName) => {

  console.log(`Getting role ${roleName}`)

  const roles = await iam.listRoles().promise().then(result => result.Roles)

  return roles.find(role => role.RoleName === roleName)

}

export default getRole
