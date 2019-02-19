import aws from './aws'

const ec2 = new aws.EC2()

const getSecurityGroup = async (name) => {

  console.log(`Getting security group ${name}`)

  const groups = await ec2.describeSecurityGroups().promise().then(result => result.SecurityGroups)

  return groups.find(group => group.GroupName === name)

}

export default getSecurityGroup
