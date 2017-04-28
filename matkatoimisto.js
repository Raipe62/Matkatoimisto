var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient


// GIT **************************************

// var nodegit = require('nodegit'),
    // path = require('path');

// var url = "https://github.com/pazdera/scriptster.git",
    // local = "./scriptster",
    // cloneOpts = {};

// nodegit.Clone(url, local, cloneOpts).then(function (repo) {
    // console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
// }).catch(function (err) {
    // console.log(err);
// });


// var nodegit = require('nodegit');

// nodegit.Repository.open('./scriptster').then(function(repo) {
  // console.log("Using " + repo.path());
// }).catch(function (err) {
  // console.log(err);
// });




// GIT ends  *****************************************


var engines = require('consolidate');
// app.engine('handlebars', engines.handlebars);
app.engine('ejs', engines.ejs);

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
//app.set('view engine', '.ejs');
//app.set('view engine', 'views');


app.set('port', process.env.PORT || 3000);

app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('img'));
app.use(require('body-parser').urlencoded({ extended: true })); 

app.get('', function(req, res){

	res.render('home');
});

app.get('/home', function(req, res){

	res.render('home');

});

app.get('/venaja', function(req, res){
	res.render('venaja');

});

app.get('/lomake', function(req, res){

	res.render('lomake');

});

app.get('/viisumi', function(req, res){

	res.render('viisumi');

});

app.get('/kiitos', function(req, res){

	res.render('kiitos');

});

app.get('/kaava', function(req, res){

	res.render('index');

});



app.get('/uutiskirje', function(req, res){ 
res.render('uutiskirje', { csrf: 'CSRF token goes here' }); 
}); 

app.get('/viisumihakemus', function(req, res){ 
res.render('viisumihakemus', { csrf: 'CSRF token goes here' }); 
}); 


var db

MongoClient.connect('mongodb://Matkatoimisto:Ryhma13@ds159180.mlab.com:59180/matkatoimisto_13', (err, database) => {
  if (err) return console.log(err)
  db = database

})


 app.get('/lue_uusi', (req, res) => {
  db.collection('Uutiskirje').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index1.ejs
    res.render('index1.ejs', {Uutiskirje: result})
  })
})

app.get('/lue_viisumi', (req, res) => {
  db.collection('Viisumihakemus').find().toArray((err, result) => {
    if (err) return console.log(err)
   // renders index2.ejs
    res.render('index2.ejs', {Viisumihakemus: result})	
  })
})


app.post('/process', function(req, res){ 
  db.collection('Uutiskirje').save(req.body, (err, result) => {
    if (err) return console.log(err)
			
console.log('Form (from querystring): ' + req.query.form); 
console.log('CSRF token (from hidden form field): ' + req.body._csrf); 
console.log('Nimi: ' + req.body.name); 
console.log('Sähköposti: ' + req.body.email); 
res.redirect(303, 'kiitos'); 
	})
})


app.post('/process1', function(req, res){ 
  db.collection('Viisumihakemus').save(req.body, (err, result) => {
    if (err) return console.log(err)
console.log('Form (from querystring): ' + req.query.form); 
console.log('CSRF token (from hidden form field): ' + req.body._csrf); 
console.log('Sukunimi: ' + req.body.lastname); 
console.log('Etunimi: ' + req.body.firstnames); 
console.log('Henkilötunnus: ' + req.body.ht);
console.log('Kansalaisuus: ' + req.body.kansalaisuus);
console.log('Sähköposti: ' + req.body.email); 
console.log('Viisumihakemuksen tarkoitus:  ' + req.body.viesti);
res.redirect(303, 'viisumihakemus'); 
	})
})


app.use(function(req, res){

	res.type('text/html');
	res.status(404);
	res.send('<h1>Vihe 404 - Pyytämääsi resurssia ei löytynyt</h1>');

});
app.use(function(err, req, res, next){

	console.log(err.stack);
	res.type('text/html');
	res.status(500);
	res.send('<h1>Vihe 500 - Palvelinpuolen virhe</h1>');

});

app.listen(app.get('port'), function(){

	console.log('Web-palvelin käynnissä http://localhost: '+
	app.get('port') + '; Sammuta Ctrl-C -yhdistelmällä.')
});