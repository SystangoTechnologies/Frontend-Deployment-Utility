const config  = {
    IAM: {
        accessKey: process.env.AWS_ACCESS_KEY || '',    // AWS Access Key
        secretKey: process.env.AWS_SECRET_KEY || '',    // AWS Secret Key
        region: process.env.AWS_REGION || ''            // AWS Region Key
    },
    s3: {
        bucket: process.env.S3_BUCKET || ''             // Name of the Bucket
    },
    cloudfront: {
        distributionId: process.env.DISTRIBUTION_ID || '',     // AWS CloudFront distribution, if CloudFront distribution is used
    },
    uploadtoS3: process.env.UPLOAD_TO_S3 || true,              // Flag to Upload files to s3  [true or false]
    updateCloudfront: process.env.UPDATE_CLOUDFRONT || true,   // Flag to update data on cloudfront [true or false]
    projectDirectory:  process.env.PROJECT_DIRECTORY || './project-directory',  // Path of dir to upload on s3 bucket
    excludeRootDir: process.env.EXCLUDE_ROOT_DIR || true,      // Upload the content of the folder or upload the folder [true or false]
    excludeDirectory: process.env.EXCLUDE_DIRECTORY || '.git,node_modules',        // Directories to ignore
    excludeFiles: process.env.EXCLUDE_FILES ||'.gitignore,.DS_Store'               // File to ignore                 
}

module.exports = config;