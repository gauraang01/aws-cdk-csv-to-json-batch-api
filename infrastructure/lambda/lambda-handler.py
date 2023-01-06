import base64
import csv
import json
import requests
import boto3

def main(event, context):
    try:
        # Get the S3 bucket and key from the event
        bucket = event['Records'][0]['s3']['bucket']['name']
        key = event['Records'][0]['s3']['object']['key']

        # Download the CSV file from S3
        s3 = boto3.resource('s3')
        obj = s3.Object(bucket, key)
        csv_string = obj.get()['Body'].read().decode('utf-8')

        # Convert the CSV string into a list of dictionaries
        reader = csv.DictReader(csv_string.splitlines())
        records = list(reader)

        API_URL = 'https://store-json-rds.onrender.com/api/data'

        # Send the records to the API in batches of 100
        for i in range(0, len(records), 100):
            batch = records[i:i+100]
            auth_string = '{}:{}'.format('gauraang', 'sharma')
            auth_string = base64.b64encode(auth_string.encode('utf-8')).decode('utf-8')
            headers = {'Authorization': 'Basic {}'.format(auth_string)}
            response = requests.post(API_URL, json=batch, headers=headers)
            if response.status_code != 200:
                raise Exception('API returned status code {}'.format(response.status_code))
            else:
                print("Data Added successfully")
    except Exception as e:
        # Log the error message
        print(e)
        # Raise the exception to fail the function execution
        raise e
