from aws_cdk import (
    aws_lambda as _lambda,
    aws_rds as rds,
    aws_s3 as _s3,
    aws_s3_notifications,
    aws_ec2 as ec2,
    Duration,
    Stack
)

from constructs import Construct

class LambdaS3TriggerRDSStack(Stack):

    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # Retrieve the default VPC for the account
        vpc = ec2.Vpc.from_lookup(self, "MyVPC", is_default=True)
        
        sg = ec2.SecurityGroup(self, 'mydb-sg',
            vpc=vpc,
            allow_all_outbound=True,
        )

        # Allow inbound traffic on ports 3306, 80, and 443
        sg.add_ingress_rule(ec2.Peer.any_ipv4(), ec2.Port.tcp(3306))
        sg.add_ingress_rule(ec2.Peer.any_ipv4(), ec2.Port.tcp(80))
        sg.add_ingress_rule(ec2.Peer.any_ipv4(), ec2.Port.tcp(443))

        # Create an Amazon RDS for MySQL database
        db = rds.DatabaseInstance(
            self, "mydb",
            engine=rds.DatabaseInstanceEngine.MYSQL,
            instance_type=ec2.InstanceType.of(
                instance_class=ec2.InstanceClass.T3,
                instance_size=ec2.InstanceSize.MICRO
            ),
            vpc = vpc, 
             vpc_subnets=ec2.SubnetSelection(
                subnet_type=ec2.SubnetType.PUBLIC,
            ),
            security_groups=[sg],
            database_name='mydb'
        )


        # create s3 bucket
        s3 = _s3.Bucket(self, "s3bucket")

        # create lambda function
        function = _lambda.Function(self, "lambda_function",
                                    runtime=_lambda.Runtime.PYTHON_3_7,
                                    handler="lambda-handler.main",
                                    code=_lambda.Code.from_asset("./lambda"),
                                    timeout=Duration.minutes(10))
        
        # grant read permission to lambda
        s3.grant_read(function)

        # create s3 notification for lambda function
        # assign notification for the s3 event type (ex: OBJECT_CREATED)
        s3.add_event_notification(
            _s3.EventType.OBJECT_CREATED, 
            aws_s3_notifications.LambdaDestination(function), 
            _s3.NotificationKeyFilter(suffix=".csv")
        )

       