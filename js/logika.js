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
// na manjim ekranima prilagodiSlova, mozda klasa Prilagodjavac za pozadinu, slike, slova
// deo sekunde su u igri, a nisu nacrtani, dodati varijablu nacrtani radi provere
// pozadina se crta prilagodjeno, a delove crta neprilagodjeno
// resenje: napraviti jedinstveno prilagodjavanje
// kad je presirok ekran, sece pozadinu po visini !
********************************************************************/

var slike = {
    pozadina: 'slike/skupstina2.png',
    likovi: {      // nazivi bitni, od njih pravi objekte!
        vulin: 'slike/vulin.png',
        toma: 'slike/toma.png',
        dacic: 'slike/dacic.png'
    },
    predmeti: {
        paradajz: "",
        jaje: "",
        krpa: ""
    }
}


/*************** LOGIKA IGRE ***************/

var ucitavac = new Ucitavac();                      // pravi karaktere
var vreme = new Vreme(30);          				// zadaje vreme igre
var scena = new Scena('platno', slike.pozadina);
var mish = new Mish();
var uvod = new Uvod(scena);

ucitavac.ucitajSlike(slike.likovi, uvod.pusti);
scena.platno.addEventListener('click', reagujNaKlik);


/*************** GLAVNE FUNKCIJE ***************/

function postaviScenu(){
    scena.praviProzore(ose_prozora);
    ucitavac.praviKaraktere(slike.likovi, scena, vreme);   	// pravi objekte od niza likova
    dacic.kuknjava = "Jaoj";						// dodaje jedinstvene poruke
    vulin.kuknjava = "To boli!";
    toma.kuknjava = "Evropa nema alternativu!";
	scena.animacija_igre = requestAnimationFrame(azuriraj); // krace igra
}


function azuriraj(){
    // ovo izvrsava na svaki frejm
    if(scena.igranje){
		dacic.igraj(30);
		vulin.igraj(20);
		toma.igraj(10);
        scena.crtajSve();
        scena.pisiPoruke(mish);
        scena.pisiPoene(vreme);
        scena.proveriKraj(vreme);

		// ovo izvrsava svake sekunde
        if(vreme.prethodna_sekunda != vreme.ovaSekunda()) {
            scena.brisiPoruke();
            scena.dodeliPozicije(scena.karakteri);
            vreme.preostalo--;
            vreme.prethodna_sekunda = vreme.ovaSekunda();
        }	// kraj svaki sekund
		
        scena.animacija_igre = requestAnimationFrame(azuriraj);
    }	// kraj svaki frejm
}


function reagujNaKlik(klik){
	mish.x = klik.clientX;   
	mish.y = klik.clientY;
	
	if(uvod.ide){
		uvod.ide = false;
		window.cancelAnimationFrame(uvod.animacija);
		postaviScenu();
		scena.igranje = true;
	}	// kraj ako ide

	if(scena.igranje){
		for(var i=0; i < scena.karakteri.length; i++){
			if(scena.karakteri[i].igranje) {
				mish.proveriPogodak(scena, scena.karakteri[i]);
			}
		}
	}	// kraj ako igranje
}   // kraj reagujNaKlik
