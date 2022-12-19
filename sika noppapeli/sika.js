document.getElementById("lisaa").addEventListener("click", lisaa)
document.getElementById("poista").addEventListener("click", poista)
document.getElementById("aloita").addEventListener("click", aloita)
document.getElementById("lopeta").addEventListener("click", lopeta)

var pelaajat = []

function lisaa(event){
    event.preventDefault()
    let pelaaja = document.getElementById("nimi").value
    if(pelaaja === "") return
    nimet = pelaajat.map(value => value.nimi)
    if(nimet.includes(pelaaja)) return
    pelaajat.push({nimi: pelaaja, pisteet: 0, tuplat: 0, kierroksenPisteet: 0})
    nimet = pelaajat.map(value => value.nimi)
    document.getElementById("pelaajalista").innerHTML = "<b>Pelaajat:</b></br>" + nimet.join("</br>")
}

function poista(event){
    event.preventDefault()
    let pelaaja = document.getElementById("nimi").value
    if(pelaaja === "") return
    pelaajat = pelaajat.filter(value => value.nimi !== pelaaja)
    nimet = pelaajat.map(value => value.nimi)
    if(pelaajat.length <= 0){
        document.getElementById("pelaajalista").innerHTML = "<b>Pelaajat:</b></br>" + "Ei pelaajia"
    } else {
        document.getElementById("pelaajalista").innerHTML = "<b>Pelaajat:</b></br>" + nimet.join("</br>")
    }
    //Poistetun pelaajana poistaminen pistetaulukosta
    if(document.getElementById(pelaaja)){
        document.getElementById(pelaaja).remove()
        document.getElementById("r#"+pelaaja).remove()
    }
}

function aloita(event){
    event.preventDefault()

    //Pistemäärän validointi
    var pistemaara = parseInt(document.getElementById("pistemaara").value)
    if(isNaN(pistemaara)){
        return document.getElementById("pistemaaraVirhe").innerHTML = "Pistemäärän täytyy olla luku"
    } else if(!pistemaara){
        return document.getElementById("pistemaaraVirhe").innerHTML = "Syötä pistemäärä"
    } else {
        document.getElementById("pistemaaraVirhe").innerHTML = ""
    }
    
    //Pelaajien määrän validointi
    if(pelaajat.length < 2){
        return document.getElementById("pelaajatVirhe").innerHTML = "Syötä vähintään 2 pelaajaa"
    } else {
        document.getElementById("pelaajatVirhe").innerHTML = ""
    }

    //Estä asetusten vaihto
    document.getElementById("lisaa").disabled = true
    document.getElementById("poista").disabled = true
    document.getElementById("aloita").disabled = true
    document.getElementById("nopat").disabled = true
    document.getElementById("pistemaara").disabled = true
    document.getElementById("nimi").disabled = true

    //Salli heittonappulan käyttö
    document.getElementById("heita").disabled = false

    //Lisää pelaajat pistetaulukkoon
    for(i = 0; i < pelaajat.length; i++){
        if(!document.getElementById(pelaajat[i].nimi)){
            let taulukko = document.getElementById("taulukko")
            rivi = taulukko.insertRow(taulukko.length)
            taulukkoNimi = rivi.insertCell(0)
            taulukkoPisteet = rivi.insertCell(1)
            taulukkoPisteet.id = pelaajat[i].nimi
            rivi.id = `r#${pelaajat[i].nimi}`
            taulukkoNimi.innerHTML = pelaajat[i].nimi
            taulukkoPisteet.innerHTML = pelaajat[i].pisteet
        }
    }

    //Aloitetaan peli

    //Pelinappuloiden eventListenerien poisto
    function recreateNode(el, withChildren) {
        if (withChildren) {
          el.parentNode.replaceChild(el.cloneNode(true), el);
        }
        else {
          var newEl = el.cloneNode(false);
          while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
          el.parentNode.replaceChild(newEl, el);
        }
    }
    recreateNode(document.getElementById("heita"))
    recreateNode(document.getElementById("lopetaHeitto"))

    let pelaajaNumero = 0

    function vuoronPelaaja(numero){
        return pelaaja = pelaajat[numero]
    }

    document.getElementById("pelaajaNimi").innerHTML = vuoronPelaaja(pelaajaNumero).nimi
    document.getElementById("heita").addEventListener("click", heitto)
    document.getElementById("lopetaHeitto").addEventListener("click", (event) => heitonLopetus(pelaaja))

    //Noppa
    function noppa(){
        return Math.floor(Math.random() * (7 - 1) + 1)
    }

    function heitto(){
        var noppa1 = noppa()
        var noppa2 = noppa()
        document.getElementById("lopetaHeitto").disabled = false //Sallitaan vuoron lopetus ensimmäisen heiton jälkeen
        //Yhden nopan peli
        if(document.getElementById("nopat").value === "yksiNoppa"){
            document.getElementById("tulos").innerHTML = noppa1
            if(noppa1 === 1){
                vuoronVaihto(pelaaja) //Heitto oli numero 1, vuoron vaihto ja kierroksen pisteiden nollaus
            } else {
                //Heitto ei ollut numero yksi, lisätään pisteitä
                pelaaja.kierroksenPisteet += noppa1
                console.log(pelaaja)
                pisteidenTarkistus(pelaaja)
                document.getElementById("pelaajaNimi").innerHTML = pelaaja.nimi
                document.getElementById("pisteet").innerHTML = "Pisteet: " + pelaaja.kierroksenPisteet
            }

        //Kahden nopan peli
        } else {
            document.getElementById("tulos").innerHTML = `${noppa1} + ${noppa2}`
            if(noppa1 === 1 && noppa2 === 1){
                pelaaja.tuplat += 1
                if(pelaaja.tuplat === 3){ //Kolme tuplaa peräkkäin, vuoron vaihto
                    vuoronVaihto(pelaaja)
                } else { //Tupla ykköset
                    pelaaja.kierroksenPisteet += 25
                    pisteidenTarkistus(pelaaja)
                }
            } else {
                if(noppa1 === noppa2){ //Tuplat
                    pelaaja.tuplat += 1
                    if(pelaaja.tuplat === 3){ //Kolme tuplaa peräkkäin, vuoron vaihto
                        vuoronVaihto(pelaaja)
                    } else { //Tuplat, ei ykkösiä
                        pelaaja.kierroksenPisteet += ((noppa1 + noppa2) * 2)
                        pisteidenTarkistus(pelaaja)
                    }
                } else {
                    if(noppa1 === 1 || noppa2 === 1){ //Yksi ykkönen, vuoron vaihto
                        vuoronVaihto(pelaaja)
                    } else { //Ei ykkösiä, ei tuplia
                        pelaaja.tuplat = 0
                        pelaaja.kierroksenPisteet += noppa1 + noppa2
                        pisteidenTarkistus(pelaaja)
                    }
                }
            }
            document.getElementById("pelaajaNimi").innerHTML = pelaaja.nimi
            document.getElementById("pisteet").innerHTML = "Pisteet: " + pelaaja.kierroksenPisteet

        }
    }

    //Voiton tarkistus
    function pisteidenTarkistus(pelaaja){
        pisteetYhteensä = pelaaja.pisteet + pelaaja.kierroksenPisteet
        if(pisteetYhteensä >= pistemaara){
            document.getElementById("voittaja").innerHTML = `Voittaja: </br> ${pelaaja.nimi}`
            document.getElementById(pelaaja.nimi).innerHTML = pisteetYhteensä
            document.getElementById("heita").disabled = true
            document.getElementById("lopetaHeitto").disabled = true
        }
    }

    //Heiton lopetus ja vuoron vaihto
    function heitonLopetus(pelaaja){
        pelaaja.pisteet += pelaaja.kierroksenPisteet
        document.getElementById(pelaaja.nimi).innerHTML = pelaaja.pisteet
        vuoronVaihto(pelaaja)
    }

    //Vuoron vaihto
    function vuoronVaihto(pelaaja){
        pelaaja.kierroksenPisteet = 0
        pelaaja.tuplat = 0

        //Seuraavan pelaajan valinta
        if(!pelaajat[pelaajaNumero+1]){
            pelaajaNumero = 0
            pelaaja = vuoronPelaaja(pelaajaNumero)
        } else {
            pelaajaNumero += 1
            pelaaja = vuoronPelaaja(pelaajaNumero)
        }

        document.getElementById("pelaajaNimi").innerHTML = "Vaihto: " + pelaaja.nimi
        document.getElementById("pisteet").innerHTML = "Pisteet: " + pelaaja.kierroksenPisteet
        document.getElementById("lopetaHeitto").disabled = true
    }
    

}

function lopeta(event){
    event.preventDefault()

    //Asetusten vaihdon salliminen ja pelinappuloiden esto
    document.getElementById("lisaa").disabled = false
    document.getElementById("poista").disabled = false
    document.getElementById("aloita").disabled = false
    document.getElementById("nopat").disabled = false
    document.getElementById("pistemaara").disabled = false
    document.getElementById("nimi").disabled = false
    document.getElementById("heita").disabled = true
    document.getElementById("lopetaHeitto").disabled = true
    document.getElementById("pelaajaNimi").innerHTML = "Pelaaja"
    document.getElementById("pisteet").innerHTML = "Pisteet: "
    document.getElementById("tulos").innerHTML = "Tulos"
    document.getElementById("voittaja").innerHTML = ""

    //Pisteiden, kierroksen pisteiden ja tuplien määrän nollaus
    for(i = 0; i < pelaajat.length; i++){
        pelaajat[i].pisteet = 0
        pelaajat[i].kierroksenPisteet = 0
        pelaajat[i].tuplat = 0
        document.getElementById(pelaajat[i].nimi).innerHTML = "0"
    }
}