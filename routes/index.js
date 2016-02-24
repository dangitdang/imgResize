var express = require('express');
var router = express.Router();
var request = require('request');
var utils = require('../utils/processIm.js')({
    bucketName: process.env.THUMBNAILS_BUCKET
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/:size', function(req, res, next) {
    var origURL = req.body.url;
    var match = utils.isValidSize(req.params.size);
    if (match != null) {
        var size = {
            width: match[1],
            height: match[2]
        };
        utils.thumbGen(origURL, size)
            .then(function(val) {
                res.json({'URL' : val.Location});
            }, function(err) {
                res.json({'err' : 'Error processing image'});
            });
    } else {
        res.json({'err' : 'Image size must be in format [width]x[height] e.g 100x100'})
    }
});

module.exports = router;