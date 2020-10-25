var trenutniMjesec = new this.Date().getMonth();

let Kalendar = (function() {
    // privatni
    /* Osnovne stvari */


    /* Upit sa html stranice */
    var sala;
    var periodicnaRezervacija; /* BOOL */
    var pocetak; /* vrijeme */
    var kraj; /* vrijeme */
    
    /* Nizovi zauzeca */
    var periodicnaZauzeca;
    var vanrednaZauzeca;

    function obojiZauzecaImpl(kalendarRef, mjesec, sala, pocetak, kraj) {

        var kockiceKalendara = kalendarRef.getElementsByClassName("broj");
        //console.log(kockiceKalendara.length);
            
        /**kalendarRef.children.
            /* Bojenje vanrednih zauzeca */
        try {
            for (let i = 0; i < this.vanrednaZauzeca.length; i++) {
                for (let j = 0; j < kockiceKalendara.length; j++) {
                   // console.log(kockiceKalendara[j].id);
                    if (kockiceKalendara[j].id == this.vanrednaZauzeca[i].datum && this.vanrednaZauzeca[i].naziv == sala && poklapanjeVremena(pocetak, kraj, this.vanrednaZauzeca[i].pocetak, this.vanrednaZauzeca[i].kraj)) {
                        kockiceKalendara[j].children[0].classList.add("zauzeta"); //setAttribute("class", "zauzeta");
                    }
                }
                //if (sala == this.vanrednaZauzeca[i].naziv && poklapanjeVremena(pocetak, kraj, this.vanrednaZauzeca[i].pocetak, this.vanrednaZauzeca[i].kraj))

            }
        } catch (e) {
            console.log(e);
        }
        /* Bojenje periodicnih zauzeca*/
        /* Ipsraviti document u kalendarRef */

        try {
            for (let i = 0; i < this.periodicnaZauzeca.length; i++) {
                if (this.periodicnaZauzeca[i].semestar == semestar(mjesec) && this.periodicnaZauzeca[i].naziv == sala && poklapanjeVremena(pocetak, kraj, this.periodicnaZauzeca[i].pocetak, this.periodicnaZauzeca[i].kraj)) {
                    for (let j = 0; j < kockiceKalendara.length; j++) {
                        if (provjeriJelPostojiKlasa(kockiceKalendara[j].classList, (this.periodicnaZauzeca[i].dan + 1).toString()))

                       // if (kockiceKalendara[j].children[0].classList.contains(this.periodicnaZauzeca[i].dan + 1))
                            kockiceKalendara[j].children[0].classList.add("zauzeta");
                        //    kockiceKalendara[j].children[0].classList.remove("slobodna");
                          
                    }
                    /*console.log(this.periodicnaZauzeca[i].semestar == semestar(mjesec), this.periodicnaZauzeca[i].naziv == sala, poklapanjeVremena(pocetak, kraj, this.periodicnaZauzeca[i].pocetak, this.periodicnaZauzeca[i].kraj))
                    if (this.periodicnaZauzeca[i].semestar == semestar(mjesec) && this.periodicnaZauzeca[i].naziv == sala && poklapanjeVremena(pocetak, kraj, this.periodicnaZauzeca[i].pocetak, this.periodicnaZauzeca[i].kraj)) {

                        var listaJednogDanaUKalendaru = document.getElementsByClassName((this.periodicnaZauzeca[i].dan + 1).toString());
                        for (let j = 0; j < listaJednogDanaUKalendaru.length; j++) {
                            listaJednogDanaUKalendaru[j].children[0].classList.add("zauzeta");
                            /*listaJednogDanaUKalendaru[j].children[0].setAttribute("class", "zauzeta");
                        }
                    }*/
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    function provjeriJelPostojiKlasa(klase, klasa) {


        if (klase != null) {
            for (let i = 0; i < klase.length; i++) {
                if (klase[i] == klasa) return true;
            }
        } else return false;

    }

    function semestar(mjesec) {
        if (mjesec == 9 || mjesec == 10 || mjesec == 11 || mjesec == 0) return "zimski";
        if (mjesec == 1 || mjesec == 2 || mjesec == 3 || mjesec == 4 || mjesec == 5) return "ljetni";
    }

    function poklapanjeVremena(pocetak1, kraj1, pocetak2, kraj2) {
        if (pocetak1 > kraj1) return false;

        if (pocetak1 <= pocetak2 && kraj1 >= kraj2) return true;
        else if (pocetak1 >= pocetak2 && pocetak1 <= kraj2) return true;
        else if (pocetak2 <= kraj1 && kraj2 >= kraj1) return true;
        else return false;
    }

    function ucitajPodatkeImpl(periodicna, vanredna) {
        this.periodicnaZauzeca = periodicna;
        this.vanrednaZauzeca = vanredna;
    }

    function iscrtajKalendarImpl(kalendarRef, mjesec) {
        /*kalendarRef = document.getElementById("tabela");*/
        kalendarRef.innerHTML = "";

        /* Dodavanje naziva mjeseca */
        var trNaziv = kreirajElement("tr", { "class": "novembar" });
        var thNaziv = kreirajElement("th", { "class": "novembar", "colspan": "7" });
        thNaziv.innerText = dajNazivMjeseca(mjesec);
        trNaziv.appendChild(thNaziv);
        kalendarRef.appendChild(trNaziv);

        /* Dodavanje naziva dana */
        var trDani = kreirajElement("tr", { "class": "prikazi1" });
        for (let i = 0; i < 7; i++) {
            var thDan = kreirajElement("th", { "class": "dan" });
            if (i == 0) thDan.innerText = "PON";
            if (i == 1) thDan.innerText = "UTO";
            if (i == 2) thDan.innerText = "SRI";
            if (i == 3) thDan.innerText = "ČET";
            if (i == 4) thDan.innerText = "PET";
            if (i == 5) thDan.innerText = "SUB";
            if (i == 6) thDan.innerText = "NED";
            trDani.appendChild(thDan);
        }
        kalendarRef.appendChild(trDani);

        /* Dodavanje prvog reda */
        var prviRed = kreirajElement("tr", { "class": "prikazi2" });
        let brojac = 0;
        for (brojac = 0; brojac < dajPrviDanUMjesecu(mjesec) - 1; brojac++) {
            var praznaCelija = kreirajElement("td");
            prviRed.appendChild(praznaCelija);
        }

        var brojacDana = 1;
        for (brojac; brojac < 7; brojac++) {
            var dan = kreirajElement("td", { "class": "broj " + (brojac + 1).toString(), "id": "0" + brojacDana.toString() + "." + (mjesec + 1).toString() + "." + "2019" , "onclick":"klikni()"});
            dan.innerText = brojacDana;

            var divDan = kreirajElement("div", { "class": "slobodna" });
            dan.appendChild(divDan);
            prviRed.appendChild(dan);
            brojacDana++;
        }
        kalendarRef.appendChild(prviRed);
        while (brojacDana <= dajBrojDanaUMjesecu(mjesec)) {
            var redSedmice = kreirajElement("tr", { "class": "sakrij" });
            for (let i = 0; i < 7; i++) {
                var id = "";
                if (brojacDana < 10) id += "0";
                id += brojacDana.toString() + "." + (mjesec + 1).toString() + "." + "2019";
                var dan = kreirajElement("td", { "class": "broj " + (i + 1).toString(), "id": id , "onclick":"klikni()"});

                dan.innerText = brojacDana;

                var divDan = kreirajElement("div", { "class": "slobodna" });
                dan.appendChild(divDan);
                redSedmice.appendChild(dan);
                brojacDana++;
                if (brojacDana > dajBrojDanaUMjesecu(mjesec)) break;
            }
            kalendarRef.appendChild(redSedmice);
        }

        /* <tr class="sakrij">
                <td class="broj">4
                    <div class="slobodna"></div>
                </td>
                <td class="broj">5
                    <div class="zauzeta"></div>
                </td>
                <td class="broj">6
                    <div class="slobodna"></div>
                </td>
                <td class="broj">7
                    <div class="slobodna"></div>
                </td>
                <td class="broj">8
                    <div class="slobodna"></div>
                </td>
                <td class="broj">9
                    <div class="slobodna"></div>
                </td>
                <td class="broj">10
                    <div class="slobodna"></div>
                </td>
            </tr>*/
    }

    function ucitajUpiteSaStranice() {
        this.sala = document.getElementById("sala").value;
        this.periodicnaRezervacija = document.getElementById("periodicnaCheck").checked;
        this.pocetak = document.getElementById("vrijeme1").value;
        this.kraj = document.getElementById("vrijeme2").value;
        this.osoblje = document.getElementById("osoblje").value;

    }

    function dajBrojDanaUMjesecu(mjesec) {
        if (mjesec == 0) return 31;
        if (mjesec == 1) return 28;
        if (mjesec == 2) return 31;
        if (mjesec == 3) return 30;
        if (mjesec == 4) return 31;
        if (mjesec == 5) return 30;
        if (mjesec == 6) return 31;
        if (mjesec == 7) return 31;
        if (mjesec == 8) return 30;
        if (mjesec == 9) return 31;
        if (mjesec == 10) return 30;
        if (mjesec == 11) return 31;
    }

    function dajPrviDanUMjesecu(mjesec) {
        var datum = new Date(2019, mjesec, 1);

        if (datum.getDay() == 0) return 7;
        else return datum.getDay();
    }

    function dajDanUMjesecu(dan) {
        if (dan == 0) return 7;
        else return dan;
    }

    function dajNazivMjeseca(mjesec) {
        if (mjesec == 0) return "Januar";
        if (mjesec == 1) return "Februar";
        if (mjesec == 2) return "Mart";
        if (mjesec == 3) return "April";
        if (mjesec == 4) return "Maj";
        if (mjesec == 5) return "Juni";
        if (mjesec == 6) return "Juli";
        if (mjesec == 7) return "August";
        if (mjesec == 8) return "Septembar";
        if (mjesec == 9) return "Oktobar";
        if (mjesec == 10) return "Novembar";
        if (mjesec == 11) return "Decembar";

    }

    function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    function kreirajElement(element, atributi) {
        let el = document.createElement(element);
        setAttributes(el, atributi);
        return el;
    }
    return {
        update: update,
        ucitajUpiteSaStranice: ucitajUpiteSaStranice,
        obojiZauzeca: obojiZauzecaImpl,
        ucitajPodatke: ucitajPodatkeImpl,
        iscrtajKalendar: iscrtajKalendarImpl
    }

    function update(sala, mjesec, pocetak, kraj) {
        if (sala != "" && pocetak != "" && kraj != "") {
            Kalendar.sala = sala;
            Kalendar.pocetak = pocetak;
            Kalendar.kraj = kraj;
            Kalendar.iscrtajKalendar(document.getElementById("tabela"), mjesec);
            Kalendar.obojiZauzeca(document.getElementById("tabela"), mjesec, sala, pocetak, kraj);
        }
    }
}());

window.onload = function() {
    if(document.getElementById("vrijeme1")!=null){
        document.getElementById("vrijeme1").value = "11:30";
        document.getElementById("vrijeme2").value = "15:30";
    
        var pocetak = document.getElementById("vrijeme1").value;
        var kraj = document.getElementById("vrijeme2").value;
        var sala = document.getElementById("sala").value;


    
        Kalendar.sala = document.getElementById("sala").value;
        Kalendar.periodicnaRezervacija = document.getElementById("periodicnaCheck").checked;
        Kalendar.pocetak = document.getElementById("vrijeme1").value;
        Kalendar.kraj = document.getElementById("vrijeme2").value;
    
        Kalendar.iscrtajKalendar(document.getElementById("tabela"), trenutniMjesec);
        Kalendar.ucitajPodatke(dajPeriodicnaZauzeca(), dajVanrednaZauzeca());
        Kalendar.obojiZauzeca(document.getElementById("tabela"), this.trenutniMjesec, sala, pocetak, kraj);
    }
    
}

function prethodniMjesec() {
    trenutniMjesec--;
    if (trenutniMjesec === 0) document.getElementById("prethodni").disabled = true;
    document.getElementById("sljedeci").disabled = false;
    updateuj();
}

function sljedeciMjesec() {
    trenutniMjesec++;
    if (trenutniMjesec === 11) document.getElementById("sljedeci").disabled = true;
    document.getElementById("prethodni").disabled = false;
    updateuj();
}

function updateuj(povrat = {}) {

    periodicna = povrat.periodicna ||  dajPeriodicnaZauzeca();
    vanredna =  povrat.vanredna || dajVanrednaZauzeca();
    //console.log("Proslijedjeno!",per, van);
    var pocetak = document.getElementById("vrijeme1").value;
    var kraj = document.getElementById("vrijeme2").value;
    var sala = document.getElementById("sala").value;
    

    Kalendar.sala = document.getElementById("sala").value;
    Kalendar.periodicnaRezervacija = document.getElementById("periodicnaCheck").checked;
    Kalendar.pocetak = document.getElementById("vrijeme1").value;
    Kalendar.kraj = document.getElementById("vrijeme2").value;
    

    Kalendar.iscrtajKalendar(document.getElementById("tabela"), trenutniMjesec);
    Kalendar.ucitajPodatke(periodicna, vanredna );
    Kalendar.obojiZauzeca(document.getElementById("tabela"), this.trenutniMjesec, sala, pocetak, kraj);
}