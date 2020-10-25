let assert = chai.assert;
describe('Kalendar', function () {
    //test1 - januar
    var tabela = document.createElement("table");
    tabela.setAttribute("id","tabela");
    document.getElementById("kalendar").appendChild(tabela);
    //document.getElementById("kalendar").appendChild(window.createElement("table"))
    it('mjesec sa 31 danom: ocekivan 31 dan', function () {
        let kalRef = document.getElementById("tabela");
        Kalendar.iscrtajKalendar(kalRef,0);
        let dani=kalRef.getElementsByClassName("broj");
        assert.equal(dani.length, 31, 'Broj dana treba biti 31');
    });

    it('mjesec sa 30 dana: ocekivano 30 dana', function () {
        let kalRef = document.getElementById("tabela");
        Kalendar.iscrtajKalendar(kalRef,5);
        let dani=kalRef.getElementsByClassName("broj");
        assert.equal(dani.length, 30, 'Broj dana treba biti 30');
    });
    /*Pozivanje iscrtajKalendar za trenutni mjesec: očekivano je da je 1. dan u petak*/
     it('ocekuje se da je 1.dan petak', function(){
        let kalRef = document.getElementById("tabela");
        Kalendar.iscrtajKalendar(kalRef,10);
        let tabela=document.getElementsByTagName('table')[0];
        let dani=0;
        for(var j=0; j<7; j++){
            if(tabela.rows[2].cells[j].innerHTML!="") break;
            dani++;
        }
        assert.equal(dani, 4, "Prvi dan je petak");
     });
    
    /*Pozivanje iscrtajKalendar za januar: očekivano je da brojevi dana idu od 1 do 31 počevši od utorka */
    it('ocekuje se da mjesec pocinje od utorka i brojevi dana idu od 1 do 31', function(){
        let kalRef = document.getElementById("tabela");
        Kalendar.iscrtajKalendar(kalRef,0);
        let tabela=document.getElementsByTagName('table')[0];
        let dani=0;
        for(var j=0; j<7; j++){
            if(tabela.rows[2].cells[j].innerHTML==="") dani++;
        }
        let danPrvi=tabela.rows[2].cells[dani].innerHTML!="";
        let danDrugi;
        for(var i=6; i<=7; i++){
            for(var j=0; j<7; j++){
                if(tabela.rows[i].cells[j].innerHTML!="")
                    danDrugi=tabela.rows[i].cells[j].innerHTML;
                
            }
        }
            assert.equal(dani, 1, "Prvi dan je utorak");
            assert.equal(danPrvi, 1, "Mjesec pocinje od 1");
            assert.equal(danDrugi, 31, "Mjesec zarsava sa 31");

        
     });
   /*Pozivanje iscrtajKalendar za trenutni mjesec: očekivano je da je 30. dan u subotu */
   it('ocekuje se da je 30.dan subota', function(){
    let kalRef = document.getElementById("tabela");
    Kalendar.iscrtajKalendar(kalRef,10);
    let tabela=document.getElementsByTagName('table')[0];
    let dani=0;
        for(var j=0; j<7; j++){
            if(tabela.rows[6].cells[j] != null){
                if(tabela.rows[6].cells[j].innerHTML!="") dani++;
            }
            
            else break;
        }
    assert.equal(dani, 6, "30.dan je subota");
 });
});
describe('Oboji kalendar', function () {
    /*Pozivanje obojiZauzeca gdje u zauzećima postoje duple vrijednosti za zauzeće istog termina:
o     čekivano je da se dan oboji bez obzira što postoje duple vrijednosti */
it('ocekuje se da se dan', function(){
    let kalRef=document.getElementById("tabela");
    let tabela=document.getElementsByTagName('table')[0];
    Kalendar.iscrtajKalendar(kalRef, 0);

    let niz = dajPeriodicnaZauzeca();
    Kalendar.ucitajPodatke(niz, niz);
    Kalendar.obojiZauzeca(kalRef, 10, "VA1", "10:00", "13:00");
    var obojeno=true;
    for(var j=2; j<7; j++){
        if(tabela.rows[j].cells[2]!=null){
            if(tabela.rows[j].cells[2].children.length!=0){
                if(tabela.rows[j].cells[2].children[0].classList.length<2) obojeno=false;
            }
            
        }
    }
    assert.equal(obojeno, true, 'dan se boji');
});

});