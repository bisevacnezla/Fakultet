
function prethodniMjesec() {
    trenutniMjesec--;
    if (trenutniMjesec == 0) document.getElementById("prethodni").disabled = true;
    document.getElementById("sljedeci").disabled = false;
    updateuj();
}

function sljedeciMjesec() {
    trenutniMjesec++;
    if (trenutniMjesec == 11) document.getElementById("sljedeci").disabled = true;
    document.getElementById("prethodni").disabled = false;
    updateuj();
}

function updateuj() {

    periodicna = getZauzeca().periodicna ;
    vanredna = getZauzeca().vanredna;
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