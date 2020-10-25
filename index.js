const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.set('view engine','ejs');



const { Osoblje, Rezervacija, Sala, Termin } = require('./db');


app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pocetna.html'));
})




app.get('/rezervacije', (req, res) => {
var array  = [];
var array1 = [];


Termin.findAll({
  include: [{
    model: Rezervacija,
    required: true,
  }]
})
.then(termini => {
  termini.map((n) => {
      var obj1 = {};
      var obj2 = {};
    
      if (n.dan !== null) {
      obj1.dan = n.dan;
      obj1.semestar = n.semestar;
      obj1.pocetak = n.pocetak;
      obj1.kraj = n.kraj;
      obj1.naziv = n.rezervacija.salaId;
      array.push(obj1);

    } else {
      obj2.datum = n.datum;
      obj2.pocetak = n.pocetak;
      obj2.kraj = n.kraj;
      obj2.naziv = n.rezervacija.salaId;
      array1.push(obj2);
      
    }

  })

  res.send({"periodicna": array , "vanredna": array1})
})
.catch(console.error)


})

app.post('/rezervacije', (req, res) => {

    let rezervacija = req.body;

    var tRezervacija, tTermin;


    tTermin = Termin.build({
      redovni: false,
      dan: rezervacija.dan,
      datum: rezervacija.datum,
      semestar: rezervacija.semestar,
      pocetak: rezervacija.pocetak,
      kraj: rezervacija.kraj
    });
    tTermin.save()
      .then(function(){
        
        tRezervacija = Rezervacija.build({
          terminId: tTermin.id,
          osobljeId: rezervacija.osoblje,
          salaId: rezervacija.sala
        })
        tRezervacija.save()
          .then(function(){
            res.writeHead(303);
            res.end();
          })
      }) 

      //console.log("Zauzeta ", zauzetaSala)

});


app.get('/slike',(req, res) => {
  var img = Array();

	fs.readdir('./slike', function(err, files) {
		if (err) {
			console.log("Nema Foldera \n" + err);
			return;
		}

		files.forEach(function (file) {
			fs.readFile('./slike' + "/" + file, function(err, data) {
  			if (err) {
  				console.log("File se nije mogao ucitati. \n" + err);
  				throw err;
  			}
              img.push(data);
              if(img.length === 12) 
                    res.send(img);
          });
           
        });
       
    });
    
})


app.get('/osoblje', (req, res) => {

Osoblje.findAll().then(osoblje => res.json(osoblje))
  
})

app.get('/sale', (req, res) => {

  Sala.findAll().then(sale => res.json(sale))
})



app.get('/osobe', (req, res) => {

var date = new Date();
var day  = date.getDay();
var month = date.getMonth() + 1;


var OsobaSala = [];
var OsobaKancelarija = [];
var OsobePeriodicno = [];


    Osoblje.findAll({
        include: [{
            model: Rezervacija,
            include: [
                Termin, Sala
            ],
        }]
    })
    .then(osoblje => {

        osoblje.forEach(osobe => {

            osobe.rezervacijas.forEach(rezervacija => {
              
                

            if (rezervacija.termin.get().dan === null) {
             
              if (date.getDate() == rezervacija.termin.get().datum.substring(0,2) && 
                  (date.getMonth() + 1 == rezervacija.termin.get().datum.substring(3,4))) {
      
                  if (date.getHours() >= rezervacija.termin.get().pocetak.substring(0,2) &&
                      date.getHours() <= parseInt(rezervacija.termin.get().datum.split(".")[1]) {
                     
                      OsobaSala.push({ime_osobe: osobe.ime, prezime_osobe: osobe.prezime, ime_sale: rezervacija.sala.get().naziv });
                  }
              } else {
                OsobaKancelarija.push({ime_osobe: osobe.ime, prezime_osobe: osobe.prezime, kancelarija: 'Kancelarija' });
                  
              } 
            } else if (rezervacija.termin.get().dan) {
              if (date.getDay() == rezervacija.termin.get().dan) {
                OsobaSala.push({ime_osobe: osobe.ime, prezime_osobe: osobe.prezime, ime_sale: rezervacija.sala.get().naziv });
   
              } else {
                OsobaKancelarija.push({ime_osobe: osobe.ime, prezime_osobe: osobe.prezime, kancelarija: 'Kancelarija' });
              }
            }
            })
        
        })

       res.render('osobe', {data : OsobaSala, data1: OsobaKancelarija })
    })
})


app.listen(8080, () => console.log('Server listening on port 8080'));
