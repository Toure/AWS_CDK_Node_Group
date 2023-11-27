import * as cdk from 'aws-cdk-lib';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

class EksNodeGroupStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Replace these values with your own
    const existingClusterName = 'your-existing-cluster-name';
    const vpcId = 'your-vpc-id';

    // Import the existing VPC
    const vpc = ec2.Vpc.fromVpcAttributes(this, 'ExistingVPC', {
      vpcId: vpcId,
    });

    // Import the existing EKS cluster
    const cluster = eks.Cluster.fromClusterAttributes(this, 'ExistingCluster', {
      clusterName: existingClusterName,
      vpc,
    });

    // Create a node group for the existing cluster
    const nodegroup = cluster.addNodegroupCapacity('MyNodeGroup', {
      instanceType: new ec2.InstanceType('t3.medium'), // Choose the instance type you want
      minCapacity: 2,
      maxCapacity: 5,
      desiredCapacity: 2,
    });

    // Output the nodegroup name
    new cdk.CfnOutput(this, 'NodegroupNameOutput', {
      value: nodegroup.nodegroupName,
    });
  }
}
