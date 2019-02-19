import aws from './aws'

const ec2 = new aws.EC2()

const getVPC = async (vpcName) => {

  console.log('Getting default VPC')

  const vpcs = await ec2.describeVpcs({}).promise().then(result => result.Vpcs)

  const vpc = vpcs.find(vpc => vpc.InstanceTenancy === vpcName)

  const subnets = await ec2.describeSubnets({
    Filters: [{
      Name: 'vpc-id',
      Values: [vpc.VpcId]
    },{
      Name: 'availability-zone',
      Values: ['us-east-1b','us-east-1c']
    }]
  }).promise().then(result => result.Subnets)

  vpc.subnets = subnets

  return vpc

}

export default getVPC
