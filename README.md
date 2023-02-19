# Project Title
Automated CSV to JSON Batch Processing and API Integration for AWS RDS using AWS CDK and Node.js/Express

# Project Description
This project is a solution for automating the processing of large CSV files into JSON batches and sending them to an API for further processing and storage in AWS RDS. The project is built using the AWS Cloud Development Kit (CDK) to provision and deploy all AWS resources, including S3, Lambda, API Gateway, and RDS. The API is developed using Node.js and Express, providing a scalable and customizable solution for handling batch data.

When a CSV file is uploaded to S3, it triggers a Lambda function that reads the file, divides it into JSON batches, and sends each batch to the API using HTTP POST requests. The API then processes the data and stores it in AWS RDS, providing a scalable and reliable database solution for handling large amounts of data.

Using AWS CDK, this project is easy to deploy, customize, and scale to meet the needs of any organization. The Node.js/Express API provides a flexible solution that can be adapted to various use cases, allowing for further customization and integration with other AWS services.

## Root directory description
* Infrastructure folder contains aws-cdk code to build IAM, rds database, s3, lamda function triggered by the csv upload to s3
* The store-json-rds contains node.js code for building the API


# Installation
  1. Clone the repository and navigate to the root directory of the project
  2. Install the dependencies for the AWS CDK and the Node.js application
  ```bash
  # Install AWS CDK dependencies
  cd infrastructure
  npm install

  # Install Node.js application dependencies
  cd ../store-json-rds
  npm install
  ```

    
  3. Deploy the AWS resources using the AWS CDK:
  ```bash
  # From the infrastructure directory
    cdk deploy
  ```
    
  4. Ensure that you have stup aws region, and other credentials
  5. Start the Node.js application:
  ```Bash
  # From the store-json-rds directory
    npm start
  ```
This will start the Node.js application, which listens for new CSV files uploaded to the S3 bucket. When a new file is detected, the application will process the file and send the data to the API Gateway, which will store the data in the RDS instance.

# Usage
Infrastructure folder contains aws-cdk code to build IAM, rds database, s3, lamda function triggered by the csv upload to s3

### 
WIthin the lambda folder it contains code to create a lambda function that will 
# API code
