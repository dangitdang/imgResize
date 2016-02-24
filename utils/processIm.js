var request = require('request');
var gm = require('gm').subClass({
    imageMagick: true
});
var fs = require('fs');
var Q = require('q');
var aws = require('aws-sdk');

module.exports = function(opts) {
    var s3 = new aws.S3();

    return {
        thumbGen: function(imgUrl, size) {
            // return a promise
            var deferred = Q.defer();
            var imgName = imgUrl.substr(imgUrl.lastIndexOf('/') + 1);
            imgName = imgName.replace(/\.[^/.]+$/, "");
            imgName += '.jpg';
            gm(request(imgUrl)).setFormat('jpg')
                .resize(size.width, size.height + '^')
                .gravity('Center')
                .extent(size.width, size.height)
                .stream(function(err, stdout, stderr) {
                    if (err){
                        console.log(err);
                        return deferred.reject(err);
                    }
                    var data = {
                        Bucket: opts.bucketName,
                        Key: size.width+size.height+imgName,
                        Body: stdout,
                        ContentType: 'image/jpg'
                    }
                    s3.upload(data, function(err,res){
                        if (err){
                            console.log(err);
                            return deferred.reject(err)
                        }
                        deferred.resolve(res);
                    });
                });
            return deferred.promise;
        },
        isValidSize: function(size) {
            var regex = new RegExp(/^(\d+)x(\d+)/);
            var match = regex.exec(size);
            return match
        }
    }
}