const request = require("request");
const express = require('express');
var baseurl = "https://flyapi.io/api/v1"
var router = express.Router();
require('dotenv').config();



router.get('/news', function (req, res) {
    res.sendFile(__dirname + '/public/news.html');
});


router.get('/about', function (req, res) {

    GetToken().then(atoken => {



        console.log(atoken.access_token);

        var aurl = `${baseurl}/listings/id?listing_key=${ process.env.FLYAPPID}`;

        const options = {
            url: aurl,
            headers: {
                'access_token': atoken.access_token
            }
        };
        request.get(options, function (error, resp, body) {

            var l = JSON.parse(body);
         
            res.render('about', {
                title: l.title, content: l.description,
                short_desc: l.short_desc,
                featured_image: `https://www.flytrapgo.com/listingmedia/${l.RowKey}?filename=${l.featured_image}`
            })


        })


    });
 

  //  res.sendFile(__dirname + '/public/about.html');
});
router.get('/contact', function (req, res) {

    GetToken().then(atoken => {



        console.log(atoken.access_token);

        var aurl = `${baseurl}/listings/id?listing_key=${ process.env.FLYAPPID}`;

        const options = {
            url: aurl,
            headers: {
                'access_token': atoken.access_token
            }
        };
        request.get(options, function (error, resp, body) {

            var l = JSON.parse(body);
            console.log(l);
         
            res.render('contact', {
                title: l.title, content: l.description,
                short_desc: l.short_desc,
                contact_name: l.contact_name,
                contact_email:l.contact_email,
                contact_phone: l.contact_number,
                featured_image: `https://www.flytrapgo.com/listingmedia/${l.RowKey}?filename=${l.featured_image}`
            })


        })


    });
 

  //  res.sendFile(__dirname + '/public/about.html');
});
router.get('/services', function (req, res) {
    res.sendFile(__dirname + '/public/services.html');
});

router.get('/industries', function (req, res) {
    res.sendFile(__dirname + '/public/industries.html');
});
router.get('/post/:seo', function (req, res) {
    var seo = req.params.seo;
    console.log(seo);

    //Get Post information from API

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

            var newsitem = JSON.parse(body);
            console.log(newsitem);
            console.log(newsitem.title);
            console.log(newsitem.short_desc);
            console.log(newsitem.featured_iamge);
            res.render('post', {
                title: newsitem.title, content: newsitem.content,
                short_desc: newsitem.short_desc,
                featured_image: `https://www.flytrapgo.com/listingmedia/${newsitem.listing_id}?filename=${newsitem.featured_image}`
            })


        })


    }, err => {

        console.log(err);

    });





})








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