const AWS = require('aws-sdk')
const fs = require("fs")
const path = require("path")
const mime = require('mime')
const config = require('./config')

// Ignore specific directories and files
const excludeDirectoryOrFiles = function(name, isDirectory) {
    let exclude = (isDirectory)? config.excludeDirectory.split() : config.excludeFiles.split()
    return (exclude.includes(name))? true : false
}

// Uploads the directory
const uploadDir = function(s3Path, bucketName) {

    let s3 = new AWS.S3({ signatureVersion: 'v4' })

    // Walk through the directory
    function walkSync(currentDirPath, callback) {
        // Get All files and dir
        fs.readdirSync(currentDirPath).forEach(function (name) {
            var filePath = path.join(currentDirPath, name)
            var stat = fs.statSync(filePath)
            if (stat.isFile() && !excludeDirectoryOrFiles(name, false)) {
                callback(filePath, stat)
            } else if (stat.isDirectory() && !excludeDirectoryOrFiles(name, true)) {
                walkSync(filePath, callback)                
            }
        })
    }

    // Upload File
    walkSync(s3Path, function(filePath, stat) {
        let fileName = filePath.split('\\')
        if(config.excludeRootDir){
            fileName.shift() // remove the root dir
        }
        fileName = fileName.join('/')
        let mimeType = mime.lookup(filePath)
        let params = {Bucket: bucketName, Key: fileName, Body: fs.readFileSync(filePath), ContentType: mimeType }
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('Successfully uploaded '+ fileName +' to ' + bucketName)
            }
        })

    })
}

// Invalidate CloudFront Distribution
const invalidateDistribution = function() {
    let cloudfront = new AWS.CloudFront()
    var params = {
        DistributionId: config.cloudfront.distributionId, // required
        InvalidationBatch: { // required
          CallerReference: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), // Random ID
          Paths: { // required
            Quantity: 1, // required
            Items: [ '/*' ]
          }
        }
      }

      cloudfront.createInvalidation(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      })
}

// To Deploy the code call deployCode with (uploadOnS3 = true/false, invalidateCloudFrontDistribution = true/false)
const deployCode = function(uploadOnS3, invalidateCloudFrontDistribution) {

    let response = {
        status: 400,
        message: 'Missing required fields'
    }

    if (config.IAM.accessKey || config.IAM.secretKey || config.IAM.region) {
        // Setting up the credentials
        AWS.config.update({
            accessKeyId: config.IAM.accessKey,
            secretAccessKey: config.IAM.secretKey,
            region: config.IAM.region
        })

        if (uploadOnS3){
            uploadDir(config.projectDirectory, config.s3.bucket)
        }

        if (invalidateCloudFrontDistribution){
            invalidateDistribution()
        }       
        
        response = {
            status: 200,
            message: 'Deployment started'
        }
    }
    
    return response  
}

deployCode(config.uploadtoS3, config.updateCloudfront)

module.exports = deployCode