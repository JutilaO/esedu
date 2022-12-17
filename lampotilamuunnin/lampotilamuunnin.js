
document.getElementById("muunna").addEventListener("click", muunto)

function muunto(event){
    event.preventDefault()
    muunnonSuunta = document.getElementById("muunto").value
    arvo = document.getElementById("asteet").value

    if(isNaN(arvo)) return tulos("Syötä lämpötila lukuna")
    if(arvo === "") return tulos("Syötä lämpötila")
    if(muunnonSuunta === "CF"){
        if(arvo < -273.15) return tulos('Syötetty lämpötila on pienempi kuin absoluuttinen nollapiste (-273,15 celius-astetta)')
        arvo = arvo * 1.8 + 32
    }
    if(muunnonSuunta === "FC"){
        if(arvo < -459.67) return tulos('Syötetty lämpötila on pienempi kuin absoluuttinen nollapiste (-459,67 fahrenheit-astetta)')
        arvo = (arvo-32) / 1.8
    }
    if(document.getElementById("yksi").checked === true) arvo = arvo.toFixed(1)
    if(document.getElementById("kaksi").checked === true) arvo = arvo.toFixed(2)
    if(document.getElementById("kolme").checked === true) arvo = arvo.toFixed(3)
    tulos(arvo)
}

function tulos(tulos){
    document.getElementById("tulos").innerHTML = tulos
}