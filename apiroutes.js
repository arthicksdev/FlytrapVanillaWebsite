
const request = require("request");
const express = require('express');
var baseurl = "https://flyapi.io/api/v1"
var router = express.Router();
require('dotenv').config();
//console.log(require('dotenv').config())


router.get('/api/v1/news/:seo', function (req, res) {
    var seo = req.params.seo;

    GetToken().then(atoken => {

        console.log(atoken.access_token);

        var aurl = `${baseurl}/news/post/${seo}`;

        const options = {
            url: aurl,
            headers: {
                'access_token': atoken.access_token
            }
        };
        request.get(options, function (error, resp, body) {


            res.json(body);

        })


    }, err => {

        console.log(err);

    });




});

var GetToken = function () {
    var apikey = process.env.FLYAPIKEY;
    return new Promise(function (resolve, reject) {
        console.log(apikey);
        var url = `${baseurl}/token/access_token?apikey=${apikey}`;
        request.get(url, function (error, resp, body) {

            if (error) {
                // console.error(error);
                reject(error);
                return;
            }

            var token = JSON.parse(body);
            console.log(token);

            resolve(token);

        });

    });


}



module.exports = router;






