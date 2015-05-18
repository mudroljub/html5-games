/*****************************************************************
    IDEJE:
// da ne izlaze uvek, nego da malo sacekaju
// da menjaju sliku na pogodak
// da nasumicno ispustaju parole
// lokalni i globalni hajskor
// grafiti na skupstini vucicu pederu
// paradajz pogadja
// uvodna animacija uvecavanje skupstina

    PROBLEMI:
// klikom detektuje karaktera i kad nije nacrtan. dodati uslov if nacrtan. 
// pozadina se crta prilagodjeno, a delove crta neprilagodjeno
// resenje: napraviti jedinstveno prilagodjavanje
// kad je presirok ekran, sece pozadinu po visini !
// na manjim ekranima prilagoditi slova (uvod i kraj)
********************************************************************/

"use strict";
window.$ = function(selector) {
    return document.querySelector(selector);
};
window.$$ = function(selector) {
    return document.querySelectorAll(selector);
};


/*************** VARIJABLE ***************/

// nazivi su bitni, od njih pravi objekte
var likovi_za_ucitavanje = { 
    vulin: 'slike/vulin.png',
    toma: 'slike/toma.png',
    dacic: 'slike/dacic.png'
}

/******************************************************************
- broj kojim se deli visina pozadine da dobijes gornju osu prozora
- broj kojim se deli visina pozadine da dobijes donju osu prozora
- broj kojim se deli sirina pozadine da dobijes prvi red prozora
- broj kojim se deli sirina pozadine da dobijes drugi red prozora
- broj kojim se deli sirina pozadine da dobijes trecí red prozora
*******************************************************************/
var faktori_za_pozicije_prozora = [4, 1.53, 5.9, 2.2, 1.35];
// pomocna varijabla

var prethodna_sekunda = 0;

/*************** POZIVI ***************/

var scena = new Scena('platno', 'slike/skupstina2.png');
scena.ucitajSlike(likovi_za_ucitavanje, scena.pustiUvod);


/*************** SLUSACI ***************/

$("#platno").addEventListener('click', scena.reagujNaKlik);


/*************** FUNKCIJE ***************/

function postaviScenu(){
	scena.vreme_igre = 30;			// podešava dužinu igre
    scena.izracunajPozicije(faktori_za_pozicije_prozora);
    scena.praviLikove(likovi_za_ucitavanje);   	// pravi objekte od niza likova
    dacic.poruka = "Jaoj";			// dodaje jedinstvene poruke
    vulin.poruka = "To boli!";
    toma.poruka = "Evropa nema alternativu!";
	scena.animacija_igre = requestAnimationFrame(azuriraj); // krace igra
}


function azuriraj(){
    // ovo izvrsava na svaki frejm
    if(scena.igranje){
		dacic.igraj(30);
		vulin.igraj(20);
		toma.igraj(10);
        scena.crtajSlike();
        scena.pisiPoruke();
        scena.pisiPoene();
        scena.proveriKraj();

		// ovo izvrsava svake sekunde
        if(prethodna_sekunda != new Date().getSeconds()) {
            scena.prestaniPoruke();
            scena.dodeliPozicije(scena.likovi);
            scena.vreme_igre--;
            prethodna_sekunda = new Date().getSeconds();
        }	// kraj svaki sekund
		
        scena.animacija_igre = requestAnimationFrame(azuriraj);
    }	// kraj svaki frejm
}
