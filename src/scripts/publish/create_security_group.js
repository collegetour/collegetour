import aws from './aws'

const ec2 = new aws.EC2()

const createSecurityGroup = async (groupName, vpc) => {

  console.log(`Creating security group ${groupName}`)

  const group = await ec2.createSecurityGroup({
    Description: groupName,
    GroupName: groupName,
    VpcId: vpc.VpcId
  }).promise()

  await ec2.authorizeSecurityGroupIngress({
    GroupId: group.GroupId,
    IpPermissions: [{
      FromPort: 80,
      IpProtocol: 'tcp',
      IpRanges: [{
        CidrIp: '0.0.0.0/0',
        Description: 'everyone'
      }],
      ToPort: 80
    }]
  }).promise()

  return group

}

export default createSecurityGroup
