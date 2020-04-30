const express = require("express");
const routes = require("./routes.js");
const apiroutes = require("./apiroutes.js");
const port = 3000;
var app = express();




/*Route Configurations Begin */
app.use(express.static('public'));
app.use('/', routes);
app.use('/', apiroutes);

var fs = require('fs') // this engine requires the fs module
app.engine('fly', function (filePath, options, callback) { // define the template engine
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(err)
        // this is an extremely simple template engine
        var rendered = content.toString()
            .replace('#title#', '<title>' + options.title + '</title>')
            .replace('#title1#', options.title)
            .replace('#title2#', options.title)
            .replace('#headline#', '' + options.title + '')
            .replace('#content#', '<div>' + options.content + '</div>')
            .replace('#short_desc#', '' + options.short_desc + '')
            .replace('#desc1#', '' + options.short_desc + '')
            .replace('#desc2#', '' + options.short_desc + '')
            .replace('#contact#', '' + options.contact_name + '')
            .replace('#contactphone#', '' + options.contact_phone + '')
            .replace('#contactemail#', '' + options.contact_email + '')
            .replace('#tagline#', '' + options.short_desc + '')
            .replace('#featured_image#', '' + options.featured_image + '')
            .replace('#hero_image#', '' + options.featured_image + '')
        return callback(null, rendered)
    })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'fly') // register the template engine





/*
// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use((req, res) => {
	res.send('Hello there !');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

*/




/*Route Configurstions END*/
app.listen(port, () => {

    console.log(`service running on ${port}...`);

});