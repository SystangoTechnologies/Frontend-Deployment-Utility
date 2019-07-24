## Frontend-Deployment-Utility
Quick and easy way to deploy and host your frontend application using AWS S3. The utility demands minimum to zero knowledge of DevOps or AWS tools.

## Features
* Upload Files on S3 Bucket
* Created CloudFront Invalidations

## Upcoming Features

#### Automating infrastructure creation
* Bucket creation
* Configuring bucket to host a static website
* Creating CloudFront distribution
* Configuring SSL on CloudFront distribution

## Prerequisite
* Node v10.16.0 or later
* AWS IAM Credentails
* S3 Buckets
* CloudFront Distribution

## Environment Variables Configuration
To simulate environment variables
#### Config File *(use anyone)*
- config.js

####  System environment
- /etc/environment file

The environment variables are as follows -
```
AWS_ACCESS_KEY                            // AWS IAM access Key
AWS_SECRET_KEY                            // AWS IAM secret Key
AWS_REGION                                // AWS region
S3_BUCKET                                 // Bucket name
DISTRIBUTION_ID                           // CloudFront distribution Id
UPLOAD_TO_S3                              // Flag to upload the files on s3 (true or false)
UPDATE_CLOUDFRONT                         // Flag to update the CloudFront distribution [true or false]
EXCLUDE_ROOT_DIR                          // Upload the content of the folder or upload the folder (true or false)
EXCLUDE_DIRECTORY                         // Exclude directory in comma seprated string eg. '.git, npm_modules'
EXCLUDE_FILES                             // Exclude Files in comma seprated string eg. '.gitignore', '.DS_Store'


## Usage
* `node deploy.js` uploads the files and update the CloudFront distribution depending on the configuration

## Installation

Steps to run the script:
  1. git clone https://github.com/SystangoTechnologies/Koach-Typescript.git  // Clone the script
  2. cd Koach-Typescript                                                     // Go to the cloned repository
  2. Copy the files 'deploy.js config.js package.json' to your project_dir   // Copy the content in project dir 
  3. Go to your project_dir                                                  // project dir
  4. Run: npm install                                                        // install node modules
  5. Update config file                                                      // Setting config variables
  6. Run: node deploy.js                                                     // Deploys the code

## Contributors

[Anurag Vikram Singh](https://www.linkedin.com/in/anuragvikramsingh/)

## License
MIT.