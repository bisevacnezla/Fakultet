
function dajVanrednaZauzeca() {
    // console.log(getZauzeca().vandredna);
    return getZauzeca().vanredna;
}

function dajPeriodicnaZauzeca() {
    // console.log(getZauzeca());
    return getZauzeca().periodicna;
}



// OnClick kalnedar

function klikni() {


    let zauzeta = event.currentTarget.childNodes[1].classList.contains("zauzeta");
        if (zauzeta === false) {
        x = confirm("Da li zelite da rezervisite ovaj termin?");

        if (x === true) {
            let d = event.currentTarget.classList[1];
            let datum = event.currentTarget.id;
            let sem = datum.split(".")[1];
            let pocetak = $("#vrijeme1").val();
            let kraj = $("#vrijeme2").val();
            let naziv = $("#sala option:selected").text();
            let predavac = "Zeljko Juric";
            let period = $("#periodicnaCheck").is(':checked');

            let osoblje = $("#osoblje").val();
            let sala    = $("#sala").val();
            


            let dan = parseInt(d);
            dan--;

            semestar = (sem > 1 && sem < 8) ? "ljetni"  : "zimski";

            if (period) {
                var periodicna = {
                    dan,
                    semestar,
                    pocetak,
                    kraj,
                    naziv,
                    predavac,
                    osoblje,
                    sala
                    
                }

                //console.log(periodicna);
            }
            else {
                var vanredna = {
                    datum,
                    pocetak,
                    kraj,
                    naziv,
                    predavac,
                    osoblje,
                    sala
                    
                }

                //console.log(vanredna);
            }

            let rezervacija = periodicna || vanredna;

            let povrat = postZauzece(rezervacija);
           
            updateuj(povrat);
        }
        

    } else {
        alert("Sala je zauzeta");
        //console.log("Sala je zauzeta")
       
    }
}