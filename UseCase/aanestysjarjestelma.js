document.getElementById("kirjaudu").addEventListener("click", kirjaudu)
document.getElementById("rekisteroidy").addEventListener("click", rekisteroidy)

var kayttajat = [
    {tunnus: "admin", salasana: "admin", yllapitaja: true},
    {tunnus: "kayttaja", salasana: "kayttaja"}
]

var aanestysNappiListener = false

var aanestykset = [
    {otsikko: "Esimerkki äänestys 1", tarkennus: "Tarpeettoman pitkä tarkennus tarpeellisen esimerkkitekstin pidentämiseksi", id: 1, puolesta: 5, vastaan: 10, aanestajat: []},
    {otsikko: "Esimerkki äänestys 2", tarkennus: "Tarpeettoman pitkä tarkennus", id: 2, puolesta: 35, vastaan: 1205, aanestajat: []},
    {otsikko: "Esimerkki äänestys 3", tarkennus: "Tarpeeton", id: 3, puolesta: 1, vastaan: 105, aanestajat: []}
]

function rekisteroidy(){
    tunnus = document.getElementById("kayttajatunnus").value
    salasana = document.getElementById("salasana").value
    virheet = document.getElementById("kirjautumisVirheet")
    virheet.innerHTML = ""
    if(!tunnus) return virheet.innerHTML = "Syötä tunnus"
    if(!salasana) return virheet.innerHTML = "Syötä salasana"
    for(i = 0; i < kayttajat.length; i++){
        if(kayttajat[i].tunnus === tunnus) return virheet.innerHTML = "Tunnus varattu"
    }
    kayttajat.push({
        tunnus: tunnus,
        salasana: salasana
    })
    virheet.innerHTML = "Tunnus luotu. Kirjaudu sisään."
}

function kirjaudu(){
    tunnus = document.getElementById("kayttajatunnus").value
    salasana = document.getElementById("salasana").value
    virheet = document.getElementById("kirjautumisVirheet")
    virheet.innerHTML = ""
    if(!tunnus) return virheet.innerHTML = "Syötä tunnus"
    if(!salasana) return virheet.innerHTML = "Syötä salasana"
    var kayttaja = kayttajat.filter(k => k.tunnus === tunnus)
    if(!kayttaja[0]) return virheet.innerHTML = "Käyttäjää ei löydy"
    var kayttaja = kayttaja[0]
    if(kayttaja.salasana !== salasana) return virheet.innerHTML = "Väärä salasana"
    if(kayttaja.yllapitaja && kayttaja.yllapitaja === true){
        document.getElementById("aanestyksenLuonti").style.display = "block"
        if(aanestysNappiListener === false) document.getElementById("luoAanestys").addEventListener("click", (event) => luoAanestys(kayttaja))
        aanestysNappiListener = true
    }
    naytaAanestykset(kayttaja)
    document.getElementById("kirjaudu").style.display = "none"
    document.getElementById("rekisteroidy").style.display = "none"
    ulos = document.getElementById("kirjauduUlos")
    ulos.style.display = "block"
    ulos.addEventListener("click", kirjauduUlos)
}

function kirjauduUlos(){
    document.getElementById("kirjaudu").style.display = "block"
    document.getElementById("rekisteroidy").style.display = "block"
    document.getElementById("aanestyksenLuonti").style.display = "none"
    for(i = 0; i < aanestykset.length; i++){
        div = document.getElementById(aanestykset[i].id)
        if(div) div.remove()
    }
    document.getElementById("kirjautumisKehotus").innerHTML = "Kirjaudu sisään nähdäksesi äänestykset"
    document.getElementById("kirjauduUlos").style.display = "none"
}


function naytaAanestykset(kayttaja){
    document.getElementById("kirjautumisKehotus").innerHTML = ""
    
    for(i = 0; i < aanestykset.length; i++){
        if(!document.getElementById(aanestykset[i].id)){
            target = document.getElementById("aanestykset")

            div = document.createElement("div")
            div.id = aanestykset[i].id

            nappi = document.createElement("button")
            nappi.className = "aanestysNapit"
            nappi.innerHTML = aanestykset[i].otsikko
            nappi.id = "nappi" + aanestykset[i].id

            puolestaNappi = document.createElement("button")
            puolestaNappi.className = "aanestysLaajaNapit"
            puolestaNappi.innerHTML = "Puolesta"
            puolestaNappi.id = "puolestaNappi" + aanestykset[i].id


            vastaanNappi = document.createElement("button")
            vastaanNappi.className = "aanestysLaajaNapit"
            vastaanNappi.innerHTML = "Vastaan"
            vastaanNappi.id = "vastaanNappi" + aanestykset[i].id

            pg = document.createElement("p")
            pg.innerHTML = "<h2>Tarkempi kuvaus:</h2>" + aanestykset[i].tarkennus + `<h2>Äänestystilanne:</h2>`
            divPuolesta = document.createElement("div")
            divVastaan = document.createElement("div")
            divPuolesta.id = "aanetPuolesta" + aanestykset[i].id
            divVastaan.id = "aanetVastaan" + aanestykset[i].id
            divPuolesta.innerHTML = "Puolesta: " + aanestykset[i].puolesta
            divVastaan.innerHTML = "Vastaan: " + aanestykset[i].vastaan
            pg.className = "aanestysLaaja"
            pg.id = "aanestysLaaja" + aanestykset[i].id
            pg.appendChild(divPuolesta)
            pg.appendChild(divVastaan)

            if(kayttaja.yllapitaja && kayttaja.yllapitaja === true){
                poistoNappi = document.createElement("button")
                poistoNappi.className = "aanestysLaajaNapit"
                poistoNappi.innerHTML = "Poista"
                poistoNappi.id = "poistoNappi" + aanestykset[i].id
                pg.appendChild(poistoNappi)
            }

            pg.appendChild(puolestaNappi)
            pg.appendChild(vastaanNappi)
            div.appendChild(nappi)
            div.appendChild(pg)
            target.appendChild(div)
            
            if(kayttaja.yllapitaja && kayttaja.yllapitaja === true) document.getElementById(poistoNappi.id).addEventListener("click", poistaAanestys)
            document.getElementById(vastaanNappi.id).addEventListener("click", (event) => aanesta(event, kayttaja))
            document.getElementById(puolestaNappi.id).addEventListener("click", (event) => aanesta(event, kayttaja))
            document.getElementById(nappi.id).addEventListener("click", aanestysLaajenna)

            if(aanestykset[i].aanestajat.includes(kayttaja.tunnus)){
                document.getElementById("puolestaNappi"+aanestykset[i].id).disabled = true
                document.getElementById("vastaanNappi"+aanestykset[i].id).disabled = true
            }
        }
    }
}

function aanestysLaajenna(event){
    id = event.srcElement.id.slice(5)
    pg = document.getElementById("aanestysLaaja" + id)
    if(pg.style.display === "none"){
        pg.style.display = "block"
    } else {
        pg.style.display = "none"
    }
}

function poistaAanestys(event){
    id = event.srcElement.id.slice(11)
    div = document.getElementById(id)
    div.remove()
    aanestykset = aanestykset.filter(a => a.id !== parseInt(id))
}

function aanesta(event, kayttaja){
    id = event.srcElement.id
    type = ""
    if(id.includes("puolesta")){
        id = event.srcElement.id.slice(13)
        aanestys = aanestykset.filter(a => a.id === parseInt(id))
        aanestys = aanestys[0]
        aanestys.aanestajat.push(kayttaja.tunnus)
        aanestys.puolesta += 1
        puolesta = document.getElementById("aanetPuolesta"+id)
        puolesta.innerHTML = "Puolesta: " + aanestys.puolesta
    } else {
        id = event.srcElement.id.slice(12)
        aanestys = aanestykset.filter(a => a.id === parseInt(id))
        aanestys = aanestys[0]
        aanestys.aanestajat.push(kayttaja.tunnus)
        aanestys.vastaan += 1
        vastaan = document.getElementById("aanetVastaan"+id)
        vastaan.innerHTML = "Vastaan: " + aanestys.vastaan
    }
    document.getElementById("puolestaNappi"+id).disabled = true
    document.getElementById("vastaanNappi"+id).disabled = true
}


function luoAanestys(kayttaja){
    otsikko = document.getElementById("otsikko").value
    tarkennus = document.getElementById("tarkennus").value
    virheet = document.getElementById("kirjautumisVirheet")
    if(otsikko === "") return virheet.innerHTML = "Syötä otsikko"
    if(tarkennus === "") return virheet.innerHTML = "Syötä tarkennus"
    korkeinID = 0
    for(i = 0; i < aanestykset.length; i++){
        if(aanestykset[i].id > korkeinID) korkeinID = aanestykset[i].id
    }
    aanestykset.push({
        otsikko: otsikko,
        tarkennus: tarkennus,
        id: korkeinID + 1,
        puolesta: 0,
        vastaan: 0,
        aanestajat: []
    })
    naytaAanestykset(kayttaja)
}