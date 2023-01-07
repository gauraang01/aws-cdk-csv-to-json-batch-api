from aws_cdk import (
    aws_lambda as _lambda,
    aws_s3 as _s3,
    aws_s3_notifications,
    Duration,
    Stack
)

from constructs import Construct

class LambdaS3TriggerStack(Stack):

    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

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

       