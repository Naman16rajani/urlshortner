const express = require('express');
const app = express();
const path = require('path');
const tinyUrl = require('tinyurl');
// const router = express.Router();

const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);




app.post('/', (req, res) => {
    // res.statusCode;
    var link = req.body.link;
    var shorturl;
    tinyUrl.shorten(link, (rese, reqe) => {
        // console.log(rese);
        shorturl = rese;
        // console.log("short=" + shorturl);
        res.sendFile(__dirname + "/views/result.html")
        res.render('result.html', {
            link: shorturl
        });
    });
})
app.post('/home', (req, res) => {
    res.redirect('/');
})
app.listen(process.env.PORT || port, () => {
    console.log(`3000 app listening on port port!`)
});