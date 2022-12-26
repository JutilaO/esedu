document.getElementById("panosYlosPainike").addEventListener("click", panosYlos)
document.getElementById("panosAlasPainike").addEventListener("click", panosAlas)
document.getElementById("pelaaPainike").addEventListener("click", pelaa)

document.getElementById("lukitse1").addEventListener("click", (event) => lukitus(1))
document.getElementById("lukitse2").addEventListener("click", (event) => lukitus(2))
document.getElementById("lukitse3").addEventListener("click", (event) => lukitus(3))
document.getElementById("lukitse4").addEventListener("click", (event) => lukitus(4))

//Estetään lukitus aloitussymbooleilla
document.getElementById("lukitse1").disabled = true
document.getElementById("lukitse2").disabled = true
document.getElementById("lukitse3").disabled = true
document.getElementById("lukitse4").disabled = true

//Symbolien tiedostolinkit
const symbolit = {
    apple: "./images/hedelmapeli/apple.png",
    cherry: "./images/hedelmapeli/cherry.png",
    melon: "./images/hedelmapeli/melon.png",
    pear: "./images/hedelmapeli/pear.png",
    seiska: "./images/hedelmapeli/seiska.png"
}

//Lista symbolien tiedostolinkeistä arvontaa varten
const symboliLista = [symbolit.seiska, symbolit.apple, symbolit.melon, symbolit.cherry, symbolit.pear]

var data = {
    saldo: 500,
    panos: 1
}

data.lukko1 = data.lukko2 = data.lukko3 = data.lukko4 = false
data.rulla1 = data.rulla2 = data.rulla3 = data.rulla4 = symbolit.seiska


//Lukitusnappien toiminto
function lukitus(rullanumero){
    avain = "lukko" + rullanumero
    nappi = "lukitse" + rullanumero
    if(data[avain] === false){
        data[avain] = true
        document.getElementById(nappi).innerHTML = "Lukittu"
    } else {
        data[avain] = false
        document.getElementById(nappi).innerHTML = "Lukitse"
    }
}

//Panoksen korottaminen
function panosYlos(event){
    event.preventDefault()
    if(data.panos < 10){
        data.panos += 1
    }
    document.getElementById("panosText").innerHTML = `${data.panos}e`
    estaLukitus() //Estetään lukitus panoksen korottamisen jälkeen
}

//Panoksen laskeminen
function panosAlas(event){
    event.preventDefault()
    if(data.panos > 1){
        data.panos -= 1
    }
    document.getElementById("panosText").innerHTML = `${data.panos}e`
    estaLukitus() //Estetään lukitus panoksen laskemisen jälkeen
}

//Lukituksen esto
function estaLukitus(){
    for(i = 0; i < 4; i++){
        avain = "lukitse" + (i + 1)
        lukkoNro = "lukko" + (i + 1)
        document.getElementById(avain).disabled = true
        document.getElementById(avain).innerHTML = "Lukitse"
        data[lukkoNro] = false
    }
}

//Lukituksen salliminen
function salliLukitus(){
    for(i = 0; i < 4; i++){
        avain = "lukitse" + (i + 1)
        document.getElementById(avain).disabled = false
        document.getElementById(avain).innerHTML = "Lukitse"
    }
}

//Pyöräytystoiminto
function pelaa(event){
    event.preventDefault()
    if(data.saldo >= data.panos){

        data.saldo -= data.panos

        if(data.lukko1 === false && data.lukko2 === false && data.lukko3 === false && data.lukko4 === false){
            arvonta()
            tulos = voitto()
            if(tulos === undefined){
                salliLukitus()
            }
        } else {
            arvonta()
            tulos = voitto()
            estaLukitus()
        }


        if(tulos === undefined){
            document.getElementById("voittoLuku").innerHTML = "----"
        } else {
            data.saldo += tulos
            document.getElementById("voittoLuku").innerHTML = tulos + "e"
        }

        document.getElementById("saldoText").innerHTML = `Saldo: ${data.saldo}e`
    }
}

//Arvontafunktio
function arvonta(){

    //Uusien symbolien arpominen
    let uudet = []
    for(i = 0; i < 4; i++){
        valinta = Math.floor(Math.random() * 5 + 0)
        uudet.push(symboliLista[valinta])
    }
    //Lukitsemattomien symbolien vaihto
    if(data.lukko1 === false){
        document.getElementById("rulla1").innerHTML = `<img src="${uudet[0]}">`
        data.rulla1 = uudet[0]
    }
    if(data.lukko2 === false){
        document.getElementById("rulla2").innerHTML = `<img src="${uudet[1]}">`
        data.rulla2 = uudet[1]
    }
    if(data.lukko3 === false){
        document.getElementById("rulla3").innerHTML = `<img src="${uudet[2]}">`
        data.rulla3 = uudet[2]
    }
    if(data.lukko4 === false){
        document.getElementById("rulla4").innerHTML = `<img src="${uudet[3]}">`
        data.rulla4 = uudet[3]
    }
}

function voitto(){

    //Seiskojen laskeminen
    seiskoja = 0
    for(i = 0; i < 4; i++){
        if(data["rulla"+ (i + 1)] === symbolit.seiska){
            seiskoja += 1
        }
    }
    if(seiskoja === 4){
        return data.panos * 10
    } else
    if(seiskoja === 3){
        return data.panos * 5
    } else
    for(i = 0; i < symboliLista.length; i++){ //Symbolien tarkistus, muut kuin seiska
        if(data.rulla1 === symboliLista[i] && data.rulla2 === symboliLista[i] && data.rulla3 === symboliLista[i] && data.rulla4 === symboliLista[i]){
            if(data.rulla1 === symbolit.apple) return data.panos * 6
            if(data.rulla1 === symbolit.melon) return data.panos * 5
            if(data.rulla1 === symbolit.pear) return data.panos * 4
            if(data.rulla1 === symbolit.cherry) return data.panos * 3
        }
    }
}
